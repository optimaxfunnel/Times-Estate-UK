"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { propertyProvider } from "@/lib/property/provider";
import { propertySchema } from "@/lib/property/schema";
import { requireRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import type { Property } from "@/lib/property/types";

export type CreatePropertyState = {
  status: "idle" | "error";
  message?: string;
};

/** A form value, or undefined when the field was left blank. */
function opt(fd: FormData, name: string): string | undefined {
  const v = fd.get(name);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : undefined;
}

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

  const category = opt(fd, "category");
  const candidate = {
    id: `prop-${Date.now().toString(36)}-${randomUUID().slice(0, 6)}`,
    privateAddress: opt(fd, "privateAddress") ?? "",
    displayAddress: opt(fd, "displayAddress") ?? "",
    postcode: (opt(fd, "postcode") ?? "").toUpperCase(),
    listingType: opt(fd, "listingType"),
    category,
    price: opt(fd, "price")?.replace(/[£,\s]/g, ""),
    priceQualifier: opt(fd, "priceQualifier"),
    status: "draft",
    summary: opt(fd, "summary") ?? "",
    description: opt(fd, "description") ?? "",
    features: (opt(fd, "features") ?? "")
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)
      .slice(0, 20),
    verification: "unverified",
    residential:
      category === "residential"
        ? {
            propertyType: opt(fd, "propertyType"),
            bedrooms: opt(fd, "bedrooms"),
            bathrooms: opt(fd, "bathrooms"),
            receptionRooms: opt(fd, "receptionRooms"),
            tenure: opt(fd, "tenure"),
            councilTaxBand: opt(fd, "councilTaxBand"),
            epcRating: opt(fd, "epcRating"),
            furnishing: opt(fd, "furnishing"),
          }
        : undefined,
    commercial:
      category === "commercial"
        ? {
            commercialUse: opt(fd, "commercialUse"),
            floorAreaSqFt: opt(fd, "floorAreaSqFt"),
            tenure: opt(fd, "commercialTenure"),
          }
        : undefined,
  };

  const parsed = propertySchema.safeParse(candidate);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      status: "error",
      message: issue
        ? `${issue.path.length ? `${issue.path.join(" › ")}: ` : ""}${issue.message}`
        : "Check the form.",
    };
  }

  const now = new Date().toISOString();
  const property: Property = {
    ...(parsed.data as unknown as Property),
    status: "draft",
    isDemo: false,
    media: { images: [], floorPlans: [] },
    createdAt: now,
    updatedAt: now,
  };
  await propertyProvider.create(property, role);
  revalidatePath("/admin/properties");
  revalidatePath("/admin/audit");
  redirect(`/admin/properties/${property.id}?created=1`);
}
