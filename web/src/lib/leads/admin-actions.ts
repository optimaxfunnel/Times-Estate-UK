"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { LEAD_STAGES } from "@/lib/leads/types";
import { updateLeadStage, addLeadNote } from "@/lib/leads/provider";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";

export type LeadAdminState = { status: "idle" | "success" | "error"; message?: string };

const stageUpdateSchema = z.object({
  id: z.string().min(1),
  stage: z.enum(LEAD_STAGES),
  note: z.string().trim().optional().default(""),
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
    return { status: "error", message: "Your current role cannot manage leads." };
  }

  const parsed = stageUpdateSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid submission." };
  }

  const { id, stage, note } = parsed.data;
  const lead = updateLeadStage(id, stage, role);
  if (!lead) return { status: "error", message: "Lead not found." };

  if (note) {
    addLeadNote(id, note, role);
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin/audit");
  return { status: "success", message: "Lead updated." };
}
