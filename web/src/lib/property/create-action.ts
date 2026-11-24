"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { propertyProvider } from "@/lib/property/provider";
import { opt, parsePropertyForm, readTourUrl } from "@/lib/property/property-form";
import { requireRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import { canEditContent } from "@/lib/property/workflow";
import type { Property } from "@/lib/property/types";

export type CreatePropertyState = {
  status: "idle" | "success" | "error";
  message?: string;
};


/**
 * Adds a new, real property as a **Draft** (E9). It never appears on the
 * public site until it goes through the existing approval workflow: an
 * editor submits it for approval, and a Manager or Administrator
 * publishes it (workflow.ts). New records are never demonstration data
 * (isDemo false) and start "unverified".
 *
 * Photos are added on the next screen (photo-actions.ts), once the draft
 * exists.
 */
export async function createPropertyAction(
  _prev: CreatePropertyState,
  fd: FormData,
): Promise<CreatePropertyState> {
  const role = await requireRole();
  if (!hasPermission(role, "create_property")) {
    await recordAuditEvent({
      actor: role,
      action: "denied",
      propertyId: "-",
      details: "Create property refused: role lacks permission",
    });
    return { status: "error", message: "Your current role cannot add properties." };
  }

  const id = `prop-${Date.now().toString(36)}-${randomUUID().slice(0, 6)}`;
  const parsed = parsePropertyForm(fd, {
    id,
    status: "draft",
    summary: opt(fd, "summary") ?? "",
    description: opt(fd, "description") ?? "",
  });
  if (!parsed.ok) return { status: "error", message: parsed.message };
  const tour = readTourUrl(fd);
  if (!tour.ok) return { status: "error", message: tour.message };

  const now = new Date().toISOString();
  const property: Property = {
    ...parsed.data,
    status: "draft",
    isDemo: false,
    media: { images: [], floorPlans: [], virtualTourUrl: tour.url },
    createdAt: now,
    updatedAt: now,
  };
  await propertyProvider.create(property, role);
  revalidatePath("/admin/properties");
  revalidatePath("/admin/audit");
  redirect(`/admin/properties/${property.id}?created=1`);
}

export type UpdateDetailsState = CreatePropertyState;

/**
 * Edits a property's details (address, price, rooms, features, tour
 * link). Same rules as editing its text (workflow.ts canEditContent): an
 * editor may change drafts; once a listing is live only a Manager or
 * Administrator may. Status, summary, description, photos and anything
 * the form doesn't show are left as they were.
 */
export async function updatePropertyDetailsAction(
  _prev: UpdateDetailsState,
  fd: FormData,
): Promise<UpdateDetailsState> {
  const role = await requireRole();
  const id = String(fd.get("id") ?? "");
  const existing = await propertyProvider.getById(id);
  if (!existing) return { status: "error", message: "Property not found." };
  const decision = canEditContent(role, existing.status);
  if (!decision.allowed) {
    await recordAuditEvent({ actor: role, action: "denied", propertyId: id, details: `Details: ${decision.reason}` });
    return { status: "error", message: decision.reason };
  }

  const parsed = parsePropertyForm(
    fd,
    { id, status: existing.status, summary: existing.summary, description: existing.description },
    existing,
  );
  if (!parsed.ok) return { status: "error", message: parsed.message };
  const tour = readTourUrl(fd);
  if (!tour.ok) return { status: "error", message: tour.message };

  await propertyProvider.update(
    id,
    { ...parsed.data, media: { ...existing.media, virtualTourUrl: tour.url } },
    role,
  );
  revalidatePath("/admin/properties");
  revalidatePath("/admin/audit");
  revalidatePath(`/property/${id}`);
  return { status: "success", message: "Details saved." };
}
