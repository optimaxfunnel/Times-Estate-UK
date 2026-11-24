"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { eraseLead, findLeadsByEmail } from "@/lib/leads/provider";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { LEAD_CATEGORY_LABELS, type Lead } from "@/lib/leads/types";

/**
 * Data requests (UK GDPR): a person may ask for a copy of the data held
 * about them (subject access) or for it to be erased. Staff with
 * "handle_data_requests" (Administrator, Manager) find every enquiry from
 * one email address, download a copy, and erase records one at a time.
 *
 * The email address travels only in the form body — never in a page
 * address — and the audit log records the request reference, not the
 * person's details. See OPERATIONS_MANUAL.md for the procedure.
 */

export type LeadSummary = {
  id: string;
  createdAt: string;
  category: string;
  stage: string;
};

export type DataRequestState = {
  status: "idle" | "success" | "error";
  message?: string;
  reference?: string;
  email?: string;
  leads?: LeadSummary[];
  /** The full records, as JSON, for the "Download a copy" button. */
  exportJson?: string;
};

const REFERENCE = z
  .string()
  .trim()
  .regex(
    /^[A-Za-z0-9 ._/-]{3,40}$/,
    "Enter the request reference (3–40 letters, numbers, dashes or slashes) — not the person's name.",
  );

const findSchema = z.object({
  email: z.string().trim().email("Enter the email address the person used."),
  reference: REFERENCE,
});

function summarise(lead: Lead): LeadSummary {
  return {
    id: lead.id,
    createdAt: lead.createdAt,
    category: LEAD_CATEGORY_LABELS[lead.category] ?? lead.category,
    stage: lead.stage,
  };
}

/** The copy given to the person: everything held about them. */
function exportFor(email: string, reference: string, leads: Lead[]): string {
  return JSON.stringify(
    {
      about: "Personal data held by Times Estate Ltd's website enquiry system",
      emailSearched: email,
      requestReference: reference,
      exportedAt: new Date().toISOString(),
      records: leads,
    },
    null,
    2,
  );
}

async function denied(role: string, what: string): Promise<DataRequestState> {
  await recordAuditEvent({
    actor: role,
    action: "denied",
    propertyId: "-",
    details: `Data request (${what}) refused: role lacks permission`,
  });
  return { status: "error", message: "Your current role cannot handle data requests." };
}

export async function findDataRequestAction(
  _prev: DataRequestState,
  formData: FormData,
): Promise<DataRequestState> {
  const role = await getCurrentRole();
  if (!hasPermission(role, "handle_data_requests")) return denied(role, "search");

  const parsed = findSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Check the form." };
  }
  const { email, reference } = parsed.data;
  const leads = await findLeadsByEmail(email);
  await recordAuditEvent({
    actor: role,
    action: "update",
    propertyId: "-",
    details: `Data request ${reference}: searched, ${leads.length} record(s) found`,
  });
  return {
    status: "success",
    reference,
    email,
    leads: leads.map(summarise),
    exportJson: exportFor(email, reference, leads),
    message:
      leads.length === 0
        ? "No enquiries were found for that email address."
        : `${leads.length} enquir${leads.length === 1 ? "y" : "ies"} found.`,
  };
}

const eraseSchema = z.object({
  id: z.string().min(1),
  email: z.string().trim().email(),
  reference: REFERENCE,
  confirm: z.literal("on", {
    message: "Tick the box to confirm the record may be erased.",
  }),
});

export async function eraseLeadAction(
  _prev: DataRequestState,
  formData: FormData,
): Promise<DataRequestState> {
  const role = await getCurrentRole();
  if (!hasPermission(role, "handle_data_requests")) return denied(role, "erase");

  const parsed = eraseSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Check the form." };
  }
  const { id, email, reference } = parsed.data;

  // Only erase a record that really belongs to the email being handled,
  // so a tampered form cannot erase someone else's enquiry.
  const owned = await findLeadsByEmail(email);
  if (!owned.some((l) => l.id === id)) {
    return { status: "error", message: "That enquiry does not belong to this email address." };
  }
  await eraseLead(id, role, reference);
  const remaining = owned.filter((l) => l.id !== id);

  revalidatePath("/admin/leads");
  revalidatePath("/admin/audit");
  return {
    status: "success",
    reference,
    email,
    leads: remaining.map(summarise),
    exportJson: exportFor(email, reference, remaining),
    message: `Enquiry ${id} has been permanently erased.`,
  };
}

/** One entry point for the data-request screen (its forms send "intent"). */
export async function dataRequestAction(
  prev: DataRequestState,
  formData: FormData,
): Promise<DataRequestState> {
  return formData.get("intent") === "erase"
    ? eraseLeadAction(prev, formData)
    : findDataRequestAction(prev, formData);
}
