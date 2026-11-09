"use server";

import { z } from "zod";
import {
  baseContactSchema,
  LEAD_CONFIRMATION_COPY,
  type LeadFormState,
} from "@/lib/leads/lead-schema";
import { createLead } from "@/lib/leads/provider";
import {
  CATEGORY_FIELD,
  SOURCE_PAGE_FIELD,
  REQUIRED_FIELDS_BY_CATEGORY,
  parseLeadCategory,
  parseSourcePage,
} from "@/lib/leads/form-config";
import {
  isHoneypotTriggered,
  HONEYPOT_FIELD_NAME,
} from "@/lib/security/honeypot";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitiseFields } from "@/lib/security/sanitize";
import { isTodayOrLater } from "@/lib/leads/controls";
import { propertyProvider } from "@/lib/property/provider";

type BaseFieldKey = keyof z.infer<typeof baseContactSchema>;

/**
 * Handles every lead form on the site (valuations, registrations,
 * enquiries, viewing requests, callback requests, repair reports).
 *
 * The action is deliberately not bound to per-form arguments — see
 * /lib/leads/form-config.ts for why (server-hang defect). The category
 * and source page arrive as plain hidden fields and are checked against
 * a server-side list; the required fields come from that list too.
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
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const category = parseLeadCategory(formData.get(CATEGORY_FIELD));
  if (!category) {
    return {
      status: "error",
      message:
        "Sorry, this form could not be sent. Please refresh the page and try again, or contact us directly.",
    };
  }
  const sourcePage = parseSourcePage(formData.get(SOURCE_PAGE_FIELD));
  const requiredExtraFields = REQUIRED_FIELDS_BY_CATEGORY[category] ?? [];

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

  // React injects hidden `$ACTION_*` fields into a server-action form's
  // FormData for no-JavaScript submissions — not real form input, so they
  // are never stored as lead data. Nor are the two routing fields.
  const raw = Object.fromEntries(
    Array.from(formData.entries()).filter(
      ([key, value]) => typeof value === "string" && !key.startsWith("$ACTION"),
    ),
  );
  delete raw[HONEYPOT_FIELD_NAME];
  delete raw[CATEGORY_FIELD];
  delete raw[SOURCE_PAGE_FIELD];
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

  if (category === "viewing_request") {
    for (const key of ["preferredDate1", "preferredDate2"]) {
      const v = sanitised[key];
      if (v && !isTodayOrLater(v)) {
        fieldErrors[key] = "Please choose a date from today onwards.";
      }
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

  // Viewing requests: find who is responsible for the property, so the
  // notification goes to the assigned staff member (or the branch).
  if (category === "viewing_request" && propertyReference) {
    const propertyId = propertyReference.split(" — ")[0];
    const property = await propertyProvider.getById(propertyId);
    extra.assignedStaff = property?.assignedStaffMemberId ?? "unassigned";
  }

  const lead = await createLead({
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
