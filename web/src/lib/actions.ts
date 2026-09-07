"use server";

import { z } from "zod";
import { enquirySchema, type EnquiryFormState } from "@/lib/enquiry-schema";

type EnquiryFieldKey = keyof z.infer<typeof enquirySchema>;

/**
 * Handles Sell / Let / Property Management / Contact enquiry submissions.
 *
 * IMPORTANT — Day 3 scope: this validates the submission server-side and
 * logs it, but does NOT send a real email or create a CRM record. No
 * third-party email/CRM integration has been approved yet (CLAUDE.md
 * Rule 4). Wiring this to a real notification channel is Day 5 work and
 * requires the owner's explicit approval of whichever service is chosen
 * (see /INTEGRATIONS.md).
 */
export async function submitEnquiry(
  formType: string,
  _prevState: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const raw = Object.fromEntries(formData.entries());
  const result = enquirySchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Partial<Record<EnquiryFieldKey, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as EnquiryFieldKey | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", fieldErrors };
  }

  // Day 3: no live integration. Logged server-side only, for local
  // development visibility. Replace with a real, approved notification
  // channel on Day 5 — never silently drop a genuine enquiry in production.
  console.log(`[enquiry:${formType}]`, result.data);

  return {
    status: "success",
    message:
      "Thank you — your enquiry has been received. A member of the Times Estate Ltd team will be in touch.",
  };
}
