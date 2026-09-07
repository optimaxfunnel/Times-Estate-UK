"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { propertyProvider } from "@/lib/property/provider";
import { PROPERTY_STATUSES, type PropertyStatus } from "@/lib/property/types";
import { getCurrentRole } from "@/lib/auth/session";
import { hasPermission, ROLES, type Role } from "@/lib/auth/roles";

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
 * Demonstrates the approval boundary required by today's brief: a
 * Property Editor may move a property to "awaiting_approval", but only a
 * Manager/Administrator may publish it further (to "available" or any
 * other publicly-visible status). Every change is written to the audit
 * log by the provider itself.
 */
export async function updatePropertyAction(
  _prevState: EditPropertyState,
  formData: FormData,
): Promise<EditPropertyState> {
  const role = await getCurrentRole();
  if (!hasPermission(role, "edit_property")) {
    return {
      status: "error",
      message: "Your current role does not have permission to edit properties.",
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = editSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid submission.",
    };
  }

  const { id, summary, description, status } = parsed.data;

  const isPublishingChange =
    status !== "draft" && status !== "awaiting_approval";
  if (isPublishingChange && !hasPermission(role, "approve_property")) {
    return {
      status: "error",
      message:
        "Only a Manager or Administrator may approve a property to this status. Submit it for approval instead.",
    };
  }

  await propertyProvider.update(
    id,
    { summary, description, status: status as PropertyStatus },
    role,
  );
  // Deliberately NOT revalidating this action's own invoking page
  // (`/admin/properties/${id}`) here: useActionState already refreshes
  // the calling page with the action's returned state. Re-revalidating
  // the same path from inside its own action caused the page to get
  // stuck showing the global loading fallback indefinitely after save
  // (a real defect found during Day 4 testing — see TEST_REPORT.md).
  revalidatePath("/admin/properties");
  revalidatePath("/admin/audit");

  return { status: "success", message: "Property updated." };
}

export async function setMockRoleAction(formData: FormData): Promise<void> {
  const value = formData.get("role");
  if (
    typeof value === "string" &&
    (ROLES as readonly string[]).includes(value)
  ) {
    const { setMockRole } = await import("@/lib/auth/session");
    await setMockRole(value as Role);
  }
  revalidatePath("/admin", "layout");
  redirect("/admin/properties");
}
