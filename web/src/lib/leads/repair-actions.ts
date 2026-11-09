"use server";

import { z } from "zod";
import { type LeadFormState } from "@/lib/leads/lead-schema";
import { createLead } from "@/lib/leads/provider";
import {
  isHoneypotTriggered,
  HONEYPOT_FIELD_NAME,
} from "@/lib/security/honeypot";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitiseFields, sanitiseText } from "@/lib/security/sanitize";
import {
  validateFile,
  sanitiseFilename,
  matchesFileSignature,
  MAX_FILES,
  totalSizeError,
} from "@/lib/security/file-upload";
import {
  REPAIR_ISSUE_CATEGORIES,
  REPAIR_URGENCY_OPTIONS,
} from "@/lib/repair-terms";

const repairSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name."),
    email: z.string().trim().email("Please enter a valid email address."),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number.")
      .max(20, "Please enter a valid phone number."),
    propertyAddress: z
      .string()
      .trim()
      .min(5, "Please enter the property address."),
    issueCategory: z.enum(
      REPAIR_ISSUE_CATEGORIES.map((c) => c.value) as [string, ...string[]],
      {
        message: "Please select an issue category.",
      },
    ),
    description: z
      .string()
      .trim()
      .min(10, "Please describe the issue (at least 10 characters)."),
    urgency: z.enum(
      REPAIR_URGENCY_OPTIONS.map((u) => u.value) as [string, ...string[]],
      {
        message: "Please select an urgency level.",
      },
    ),
    accessInformation: z.string().trim().optional().default(""),
    tenancyReference: z.string().trim().max(40).optional().default(""),
    privacyConsent: z.string().optional(),
    contractorShareConsent: z.string().optional(),
  })
  .refine((data) => data.privacyConsent === "on", {
    message: "You must confirm you have read the Privacy Policy to continue.",
    path: ["privacyConsent"],
  })
  .refine((data) => data.contractorShareConsent === "on", {
    message:
      "You must agree to share these details with a contractor to continue.",
    path: ["contractorShareConsent"],
  });

export async function submitRepairReport(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  if (isHoneypotTriggered(formData)) {
    return {
      status: "success",
      message: "Thank you — your report has been received.",
    };
  }

  const rateLimit = await checkRateLimit("lead:repair_report");
  if (!rateLimit.allowed) {
    return {
      status: "rate_limited",
      message: `You've submitted this form several times recently. Please wait ${rateLimit.retryAfterSeconds} seconds and try again.`,
    };
  }

  const raw = Object.fromEntries(
    Array.from(formData.entries()).filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;
  delete raw[HONEYPOT_FIELD_NAME];
  const sanitised = sanitiseFields(raw);

  const result = repairSchema.safeParse(sanitised);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as string | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors };
  }

  // Files: validated and their metadata kept, but no file storage
  // provider is approved yet — bytes are never written anywhere. See
  // /lib/security/file-upload.ts and /INTEGRATIONS.md.
  const photoFiles = formData
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);
  if (photoFiles.length > MAX_FILES) {
    return {
      status: "error",
      fieldErrors: { photos: `Please attach no more than ${MAX_FILES} files.` },
    };
  }
  const tooLarge = totalSizeError(photoFiles);
  if (tooLarge) {
    return { status: "error", fieldErrors: { photos: tooLarge } };
  }
  const fileNotes: string[] = [];
  for (const file of photoFiles) {
    const validation = validateFile(file);
    const safeName = sanitiseFilename(file.name);
    if (!validation.valid) {
      return { status: "error", fieldErrors: { photos: validation.reason! } };
    }
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    if (!matchesFileSignature(head, file.type)) {
      return {
        status: "error",
        fieldErrors: {
          photos: `${safeName} does not look like a real ${file.type.split("/")[1].toUpperCase()} file. Please attach the original photo or PDF.`,
        },
      };
    }
    fileNotes.push(
      `${safeName} (${Math.round(file.size / 1024)}KB, ${file.type}) — checked; awaiting storage and malware scan (no storage provider approved, so not kept)`,
    );
  }

  const {
    fullName,
    email,
    phone,
    propertyAddress,
    issueCategory,
    description,
    urgency,
    accessInformation,
    tenancyReference,
  } = result.data;

  const lead = await createLead({
    category: "repair_report",
    sourcePage: "/report-a-repair",
    propertyReference: propertyAddress,
    contactName: fullName,
    contactEmail: email,
    contactPhone: phone,
    detail: sanitiseText(description),
    extra: {
      issueCategory,
      urgency,
      accessInformation: sanitiseText(accessInformation),
      tenancyReference: sanitiseText(tenancyReference) || "not given",
      attachments: fileNotes.length > 0 ? fileNotes.join("; ") : "none",
    },
    consentGiven: true,
    priority: urgency as "routine" | "urgent" | "emergency",
  });

  return {
    status: "success",
    reference: lead.id,
    message:
      urgency === "emergency"
        ? "Your report has been logged as an emergency. If you are in immediate danger, please also call the relevant number shown above — do not wait for a response here."
        : "Your repair has been logged. A member of the property management team will triage it.",
  };
}
