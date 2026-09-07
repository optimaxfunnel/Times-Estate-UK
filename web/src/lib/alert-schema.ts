import { z } from "zod";

/** Property-alert registration — see /USER_JOURNEYS.md, journey 7. */
export const alertSchema = z
  .object({
    email: z.string().trim().email("Please enter a valid email address."),
    location: z.string().trim().optional().default(""),
    minPrice: z.string().trim().optional().default(""),
    maxPrice: z.string().trim().optional().default(""),
    listingType: z.string().trim().optional().default(""),
    category: z.string().trim().optional().default(""),
    marketingConsent: z.string().optional(),
  })
  .refine((data) => data.marketingConsent === "on", {
    message: "You must agree to receive alert emails to continue.",
    path: ["marketingConsent"],
  });

export type AlertFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof alertSchema>, string>>;
};
