"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { LEAD_STAGES } from "@/lib/leads/types";
import {
  updateLeadStage,
  addLeadNote,
  getLeadById,
  recordLeadValuation,
} from "@/lib/leads/provider";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import { canChangeLeadStage, canRecordValuation } from "@/lib/leads/controls";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";

export type LeadAdminState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const stageUpdateSchema = z.object({
  id: z.string().min(1),
  stage: z.enum(LEAD_STAGES),
  note: z.string().trim().optional().default(""),
  accessConfirmed: z.string().optional(),
});

/**
 * Changes a lead's stage and, optionally, adds a note in the same
 * action. Requires "manage_leads" — an Enquiry Viewer can see leads but
 * not change them, matching least-privilege.
 */
export async function updateLeadStageAction(
  _prevState: LeadAdminState,
  formData: FormData,
): Promise<LeadAdminState> {
  const role = await getCurrentRole();
  if (!hasPermission(role, "manage_leads")) {
    return {
      status: "error",
      message: "Your current role cannot manage leads.",
    };
  }

  const parsed = stageUpdateSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid submission.",
    };
  }

  const { id, stage, note, accessConfirmed } = parsed.data;
  const existing = getLeadById(id);
  if (!existing) return { status: "error", message: "Lead not found." };
  const decision = canChangeLeadStage(
    role,
    existing,
    stage,
    accessConfirmed === "on",
  );
  if (!decision.allowed) {
    recordAuditEvent({
      actor: role,
      action: "denied",
      propertyId: id,
      details: `Lead stage -> ${stage}: ${decision.reason}`,
    });
    return { status: "error", message: decision.reason };
  }
  if (
    existing.category === "viewing_request" &&
    stage === "appointment_booked"
  ) {
    addLeadNote(id, "Access confirmed with the occupier by staff.", role);
  }
  const lead = updateLeadStage(id, stage, role);
  if (!lead) return { status: "error", message: "Lead not found." };

  if (note) {
    addLeadNote(id, note, role);
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin/audit");
  return { status: "success", message: "Lead updated." };
}

const valuationSchema = z.object({
  id: z.string().min(1),
  figure: z.coerce.number().positive("Enter the figure in pounds."),
  basis: z.string().min(1, "Choose what kind of valuation this is."),
  valuerReference: z.string().trim().optional(),
});

/**
 * Records a valuation figure on a valuation enquiry. Only a Manager or
 * Administrator may do this, an automated estimate can never be
 * recorded, and formal/regulated valuations need the valuer's reference.
 * The figure is internal: no public page ever shows it.
 */
export async function recordValuationAction(
  _prevState: LeadAdminState,
  formData: FormData,
): Promise<LeadAdminState> {
  const role = await getCurrentRole();
  const parsed = valuationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid submission.",
    };
  }
  const { id, figure, basis, valuerReference } = parsed.data;
  const lead = getLeadById(id);
  if (!lead) return { status: "error", message: "Lead not found." };
  const decision = canRecordValuation(role, lead, basis, valuerReference);
  if (!decision.allowed) {
    recordAuditEvent({
      actor: role,
      action: "denied",
      propertyId: id,
      details: `Valuation not recorded: ${decision.reason}`,
    });
    return { status: "error", message: decision.reason };
  }
  recordLeadValuation(id, {
    figure,
    basis: basis as
      "initial_appraisal" | "formal_valuation" | "regulated_valuation",
    confirmedBy: role,
    confirmedAt: new Date().toISOString(),
    valuerReference: valuerReference || undefined,
  });
  revalidatePath("/admin/audit");
  return { status: "success", message: "Valuation recorded and confirmed." };
}
