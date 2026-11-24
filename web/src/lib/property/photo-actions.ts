"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { propertyProvider } from "@/lib/property/provider";
import { requireRole } from "@/lib/auth/session";
import { hasPermission } from "@/lib/auth/roles";
import { recordAuditEvent } from "@/lib/auth/audit-log";
import { canEditContent } from "@/lib/property/workflow";
import {
  deletePhotos,
  keyFromMediaUrl,
  mediaUrl,
  storePhoto,
} from "@/lib/property/photo-storage";
import type { Property, PropertyImage } from "@/lib/property/types";

export type PhotoActionState = { status: "idle" | "success" | "error"; message?: string };

const MAX_PHOTOS = 20;
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // per photo, before resizing
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

/** Who may change this property's photos: same rule as editing its text. */
async function authorise(
  id: string,
): Promise<{ ok: true; role: string; property: Property } | { ok: false; message: string }> {
  const role = await requireRole();
  if (!hasPermission(role, "edit_property")) {
    return { ok: false, message: "Your current role cannot change property photos." };
  }
  const property = await propertyProvider.getById(id);
  if (!property) return { ok: false, message: "Property not found." };
  const decision = canEditContent(role, property.status);
  if (!decision.allowed) {
    await recordAuditEvent({ actor: role, action: "denied", propertyId: id, details: `Photos: ${decision.reason}` });
    return { ok: false, message: decision.reason };
  }
  return { ok: true, role, property };
}

/**
 * Resizes one upload to the two sizes the site uses (1200 px for property
 * pages, 640 px for cards), 4:3, as WebP. Turning the picture the right
 * way up first, then re-encoding, also strips hidden camera data such as
 * GPS location — never published.
 */
async function toWebp(input: Buffer): Promise<{ large: Buffer; small: Buffer }> {
  const { default: sharp } = await import("sharp");
  const base = sharp(input, { failOn: "error", limitInputPixels: 80_000_000 }).rotate();
  const [large, small] = await Promise.all([
    base.clone().resize(1200, 900, { fit: "cover" }).webp({ quality: 82 }).toBuffer(),
    base.clone().resize(640, 480, { fit: "cover" }).webp({ quality: 78 }).toBuffer(),
  ]);
  return { large, small };
}

export async function uploadPropertyPhotosAction(
  _prev: PhotoActionState,
  formData: FormData,
): Promise<PhotoActionState> {
  const id = String(formData.get("id") ?? "");
  const auth = await authorise(id);
  if (!auth.ok) return { status: "error", message: auth.message };

  const alt = String(formData.get("alt") ?? "").trim();
  if (alt.length < 5 || alt.length > 150) {
    return {
      status: "error",
      message: "Describe the photo in 5–150 characters, e.g. “Kitchen with garden view”. This is read aloud to blind visitors.",
    };
  }
  const files = formData
    .getAll("photos")
    .filter((f): f is File => typeof f === "object" && f !== null && "arrayBuffer" in f && (f as File).size > 0);
  if (files.length === 0) return { status: "error", message: "Choose at least one photo." };

  const existing = auth.property.media.images;
  if (existing.length + files.length > MAX_PHOTOS) {
    return { status: "error", message: `A property can have up to ${MAX_PHOTOS} photos.` };
  }
  for (const f of files) {
    if (!ACCEPTED.includes(f.type)) {
      return { status: "error", message: `“${f.name}” is not a JPEG, PNG or WebP photo.` };
    }
    if (f.size > MAX_UPLOAD_BYTES) {
      return { status: "error", message: `“${f.name}” is larger than 10 MB.` };
    }
  }

  const added: PropertyImage[] = [];
  const written: string[] = [];
  try {
    for (const f of files) {
      const { large, small } = await toWebp(Buffer.from(await f.arrayBuffer()));
      const name = randomUUID();
      const largeKey = `${id}/${name}-1200.webp`;
      const smallKey = `${id}/${name}-640.webp`;
      await storePhoto(largeKey, large);
      written.push(largeKey);
      await storePhoto(smallKey, small);
      written.push(smallKey);
      added.push({ url: mediaUrl(largeKey), thumbnailUrl: mediaUrl(smallKey), alt });
    }
  } catch (error) {
    // Leave nothing half-saved.
    await deletePhotos(written).catch(() => {});
    const unreadable = error instanceof Error && /unsupported|corrupt|Input/i.test(error.message);
    return {
      status: "error",
      message: unreadable
        ? "One of the files could not be read as a photo. Nothing was saved."
        : "The photos could not be saved just now. Nothing was saved — please try again.",
    };
  }

  await propertyProvider.update(
    id,
    { media: { ...auth.property.media, images: [...existing, ...added] } },
    auth.role,
  );
  await recordAuditEvent({
    actor: auth.role,
    action: "update",
    propertyId: id,
    details: `${added.length} photo(s) added`,
  });
  revalidatePath("/admin/audit");
  revalidatePath(`/property/${id}`);
  return { status: "success", message: `${added.length} photo${added.length === 1 ? "" : "s"} added.` };
}

export async function removePropertyPhotoAction(
  _prev: PhotoActionState,
  formData: FormData,
): Promise<PhotoActionState> {
  const id = String(formData.get("id") ?? "");
  const url = String(formData.get("url") ?? "");
  const auth = await authorise(id);
  if (!auth.ok) return { status: "error", message: auth.message };

  const image = auth.property.media.images.find((i) => i.url === url);
  if (!image) return { status: "error", message: "That photo is no longer on this property." };

  await propertyProvider.update(
    id,
    { media: { ...auth.property.media, images: auth.property.media.images.filter((i) => i !== image) } },
    auth.role,
  );
  const keys = [image.url, image.thumbnailUrl ?? ""].map(keyFromMediaUrl).filter((k): k is string => !!k);
  await deletePhotos(keys).catch(() => {
    // The listing no longer shows it; a leftover file is harmless and is
    // recorded so it can be tidied up.
  });
  await recordAuditEvent({ actor: auth.role, action: "update", propertyId: id, details: "1 photo removed" });
  revalidatePath("/admin/audit");
  revalidatePath(`/property/${id}`);
  return { status: "success", message: "Photo removed." };
}

export async function makeMainPhotoAction(
  _prev: PhotoActionState,
  formData: FormData,
): Promise<PhotoActionState> {
  const id = String(formData.get("id") ?? "");
  const url = String(formData.get("url") ?? "");
  const auth = await authorise(id);
  if (!auth.ok) return { status: "error", message: auth.message };

  const images = auth.property.media.images;
  const image = images.find((i) => i.url === url);
  if (!image) return { status: "error", message: "That photo is no longer on this property." };
  await propertyProvider.update(
    id,
    { media: { ...auth.property.media, images: [image, ...images.filter((i) => i !== image)] } },
    auth.role,
  );
  revalidatePath(`/property/${id}`);
  return { status: "success", message: "Main photo changed." };
}
