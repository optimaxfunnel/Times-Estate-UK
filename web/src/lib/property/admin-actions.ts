"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { propertyProvider } from "@/lib/property/provider";
import { PROPERTY_STATUSES, type PropertyStatus } from "@/lib/property/types";
import {
  endSession,
  isDevSignInEnabled,
  requireRole,
  startDevSession,
} from "@/lib/auth/session";
import { ROLES, type Role } from "@/lib/auth/roles";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import { canChangeStatus, canEditContent } from "@/lib/property/workflow";

const editSchema = z.object({
  id: z.string().min(1),
  summary: z.string().trim().min(10, "Summary must be at least 10 characters."),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters."),
  status: z.enum(PROPERTY_STATUSES),
});

export type EditPropertyState = {
  status: "idle" | "success" | "error";
  message?: string;
};

/**
 * Edits a property. Authorisation is decided server-side by the pure
 * rules in workflow.ts (never by what the form happens to show): an
 * editor may draft and submit for approval; only Managers and
 * Administrators may publish, change a live listing, withdraw or
 * archive. Refusals are written to the audit log as "denied".
 */
export async function updatePropertyAction(
  _prevState: EditPropertyState,
  formData: FormData,
): Promise<EditPropertyState> {
  const role = await requireRole();

  const parsed = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid submission.",
    };
  }
  const { id, summary, description, status } = parsed.data;

  const existing = await propertyProvider.getById(id);
  if (!existing) return { status: "error", message: "Property not found." };

  const contentChanged =
    summary !== existing.summary || description !== existing.description;
  const checks = [
    canChangeStatus(role, existing.status, status as PropertyStatus),
    ...(contentChanged ? [canEditContent(role, existing.status)] : []),
  ];
  const refused = checks.find((d) => !d.allowed);
  if (refused && !refused.allowed) {
    await recordAuditEvent({
      actor: role,
      action: "denied",
      propertyId: id,
      details: `${existing.status} -> ${status}: ${refused.reason}`,
    });
    revalidatePath("/admin/audit");
    return { status: "error", message: refused.reason };
  }

  await propertyProvider.update(
    id,
    { summary, description, status: status as PropertyStatus },
    role,
  );
  // Not revalidating this action's own page — useActionState refreshes
  // it, and re-revalidating it caused a stuck loading state (TEST_REPORT.md, Day 4).
  revalidatePath("/admin/properties");
  revalidatePath("/admin/audit");
  return { status: "success", message: "Property updated." };
}

/** Development-only sign-in: chooses a role to test with. Disabled in production. */
export async function devSignInAction(formData: FormData): Promise<void> {
  const value = formData.get("role");
  if (
    isDevSignInEnabled() &&
    typeof value === "string" &&
    (ROLES as readonly string[]).includes(value)
  ) {
    await startDevSession(value as Role);
    redirect("/admin/properties");
  }
  redirect("/admin/sign-in");
}

export async function signOutAction(): Promise<void> {
  await endSession();
  redirect("/admin/sign-in");
}
