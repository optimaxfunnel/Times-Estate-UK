import { z } from "zod";

/**
 * Shared enquiry form schema used by Sell, Let, Property Management and
 * Contact forms (see /USER_JOURNEYS.md, journeys 1–3 and general contact).
 * Server-side validation runs here regardless of client-side validation,
 * per Day 3 Task 2's "server-side validation" requirement.
 */
export const enquirySchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name."),
    email: z.string().trim().email("Please enter a valid email address."),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number.")
      .max(20, "Please enter a valid phone number."),
    propertyAddress: z.string().trim().optional().default(""),
    message: z.string().trim().optional().default(""),
    privacyConsent: z.string().optional(),
  })
  .refine((data) => data.privacyConsent === "on", {
    message: "You must confirm you have read the Privacy Policy to continue.",
    path: ["privacyConsent"],
  });

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof enquirySchema>, string>>;
};
