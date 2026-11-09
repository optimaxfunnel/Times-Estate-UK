"use server";

import { z } from "zod";
import { alertSchema, type AlertFormState } from "@/lib/alert-schema";
import {
  isHoneypotTriggered,
  HONEYPOT_FIELD_NAME,
} from "@/lib/security/honeypot";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitiseFields } from "@/lib/security/sanitize";

type AlertFieldKey = keyof z.infer<typeof alertSchema>;

/**
 * Property-alert registration (see /USER_JOURNEYS.md, journey 7). As with
 * every lead form (see /lib/leads/actions.ts), this validates, sanitises
 * and rate-limits, but does NOT send a real email — no provider is
 * approved yet (CLAUDE.md Rule 4, /INTEGRATIONS.md).
 */
export async function submitPropertyAlert(
  _prevState: AlertFormState,
  formData: FormData,
): Promise<AlertFormState> {
  if (isHoneypotTriggered(formData)) {
    return {
      status: "success",
      message:
        "Thank you — we'll email you when a matching property becomes available.",
    };
  }

  const rateLimit = await checkRateLimit("property-alert");
  if (!rateLimit.allowed) {
    return {
      status: "error",
      message: `You've submitted this form several times recently. Please wait ${rateLimit.retryAfterSeconds} seconds and try again.`,
    };
  }

  const raw = Object.fromEntries(formData.entries());
  delete raw[HONEYPOT_FIELD_NAME];
  const sanitised = sanitiseFields(raw as Record<string, string>);
  const result = alertSchema.safeParse(sanitised);

  if (!result.success) {
    const fieldErrors: Partial<Record<AlertFieldKey, string>> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as AlertFieldKey | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", fieldErrors };
  }

  // Never log the visitor's email address (re-applied 2026-11-09; the
  // post-30-October fix was lost with the incomplete copy).
  const { email: _email, ...criteria } = result.data;
  console.log("[property-alert] NOT SENT (no email provider approved):", criteria);

  return {
    status: "success",
    message:
      "Thank you — we'll email you when a matching property becomes available.",
  };
}
