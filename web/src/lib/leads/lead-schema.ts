import { z } from "zod";
import type { LeadCategory } from "@/lib/leads/types";

/**
 * Shared contact-detail validation used by every lead form. Category-
 * specific fields are validated separately (see actions.ts) since they
 * vary too much (a viewing request's preferred dates vs. a repair
 * report's urgency) for one fixed schema — but every field that reaches
 * a Lead record passes through sanitisation regardless (see
 * /lib/security/sanitize.ts).
 */
export const baseContactSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name."),
    email: z.string().trim().email("Please enter a valid email address."),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number.")
      .max(20, "Please enter a valid phone number."),
    privacyConsent: z.string().optional(),
  })
  .refine((data) => data.privacyConsent === "on", {
    message: "You must confirm you have read the Privacy Policy to continue.",
    path: ["privacyConsent"],
  });

export type LeadFormState = {
  status: "idle" | "success" | "error" | "rate_limited";
  message?: string;
  reference?: string;
  fieldErrors?: Record<string, string>;
};

export const LEAD_CONFIRMATION_COPY: Partial<Record<LeadCategory, string>> = {
  sales_valuation:
    "A member of our sales team will contact you to arrange your initial market appraisal.",
  rental_valuation:
    "A member of our lettings team will contact you to arrange your rental appraisal.",
  commercial_sales_valuation:
    "A member of our commercial team will contact you to arrange your appraisal.",
  commercial_rental_valuation:
    "A member of our commercial team will contact you to discuss your requirement.",
  management_enquiry: "A member of our property management team will be in touch.",
  buyer_registration: "We'll let you know when a matching property becomes available.",
  tenant_registration: "We'll let you know when a matching property becomes available.",
  commercial_enquiry: "A member of our commercial team will be in touch.",
  viewing_request:
    "We've received your request — a member of the team will confirm the exact time with you. This viewing is not yet confirmed.",
  repair_report: "Your repair has been logged. A member of the property management team will triage it.",
  callback_request: "We'll call you back at the time you've requested.",
  general_enquiry: "A member of the Times Estate Ltd team will be in touch.",
};
