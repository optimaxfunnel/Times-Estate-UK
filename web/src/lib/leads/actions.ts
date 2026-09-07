"use server";

import { z } from "zod";
import {
  baseContactSchema,
  LEAD_CONFIRMATION_COPY,
  type LeadFormState,
} from "@/lib/leads/lead-schema";
import { createLead } from "@/lib/leads/provider";
import type { LeadCategory } from "@/lib/leads/types";
import {
  isHoneypotTriggered,
  HONEYPOT_FIELD_NAME,
} from "@/lib/security/honeypot";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitiseFields } from "@/lib/security/sanitize";

type BaseFieldKey = keyof z.infer<typeof baseContactSchema>;

/**
 * Handles every lead form on the site (valuations, registrations,
 * enquiries, viewing requests, callback requests, repair reports).
 *
 * Order of checks matters for both security and honesty:
 * 1. Honeypot — silently "succeed" without creating a lead or logging
 *    a notification, so an automated submitter gets no signal.
 * 2. Rate limit — a real, visible error asking the (human) visitor to
 *    wait, scoped per form so filling in one form doesn't block another.
 * 3. Sanitise every text field.
 * 4. Validate contact details.
 * 5. Validate the category-specific required fields (presence only —
 *    each form component enforces its own more specific client-side
 *    rules, e.g. date-in-the-future for viewing requests).
 * 6. Create the lead (which itself logs the not-yet-connected
 *    notification attempt — see /lib/leads/notify.ts).
 */
export async function submitLeadForm(
  category: LeadCategory,
  sourcePage: string,
  requiredExtraFields: string[],
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  if (isHoneypotTriggered(formData)) {
    return {
      status: "success",
      message:
        LEAD_CONFIRMATION_COPY[category] ??
        "Thank you — we've received your submission.",
    };
  }

  const rateLimit = await checkRateLimit(`lead:${category}`);
  if (!rateLimit.allowed) {
    return {
      status: "rate_limited",
      message: `You've submitted this form several times recently. Please wait ${rateLimit.retryAfterSeconds} seconds and try again, or contact us directly.`,
    };
  }

  // React injects hidden `$ACTION_*` fields into the FormData of a form
  // bound to a server action (progressive-enhancement encoding of the
  // bound arguments) — these are not real form input and must never be
  // stored as lead data, so they're excluded before anything else runs.
  const raw = Object.fromEntries(
    Array.from(formData.entries()).filter(
      ([key, value]) => typeof value === "string" && !key.startsWith("$ACTION"),
    ),
  );
  delete raw[HONEYPOT_FIELD_NAME];
  const sanitised = sanitiseFields(raw as Record<string, string>);

  const contactResult = baseContactSchema.safeParse(sanitised);
  const fieldErrors: Record<string, string> = {};
  if (!contactResult.success) {
    for (const issue of contactResult.error.issues) {
      const key = issue.path[0] as BaseFieldKey | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
  }

  for (const field of requiredExtraFields) {
    const value = sanitised[field];
    if (!value || value.trim().length === 0) {
      fieldErrors[field] = "This field is required.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  const { fullName, email, phone } = sanitised;
  const propertyReference = sanitised.propertyReference || undefined;
  const detail =
    sanitised.message || sanitised.description || sanitised.requirement || "";

  const extra: Record<string, string> = {};
  for (const [key, value] of Object.entries(sanitised)) {
    if (
      ![
        "fullName",
        "email",
        "phone",
        "privacyConsent",
        "message",
        "description",
        "requirement",
        "propertyReference",
      ].includes(key)
    ) {
      extra[key] = value;
    }
  }

  const lead = createLead({
    category,
    sourcePage,
    propertyReference,
    contactName: fullName,
    contactEmail: email,
    contactPhone: phone,
    detail,
    extra: Object.keys(extra).length > 0 ? extra : undefined,
    consentGiven: true,
  });

  return {
    status: "success",
    reference: lead.id,
    message:
      LEAD_CONFIRMATION_COPY[category] ??
      "Thank you — we've received your submission.",
  };
}
