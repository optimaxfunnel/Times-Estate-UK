import fs from "node:fs/promises";
import path from "node:path";
import {
  createSupabaseServer,
  isSupabaseAuthConfigured,
} from "@/lib/auth/supabase";

/**
 * Where property photos are kept (owner approval 2026-11-24: Supabase
 * Storage).
 *
 *  - Supabase configured → the "property-photos" bucket
 *    (scripts/setup-photo-storage.mjs). Files are written with the
 *    signed-in staff member's own session, so Supabase's rules check
 *    two-step verification and role again on its side.
 *  - Otherwise (development and tests) → the git-ignored folder
 *    `web/.data/uploads/`.
 *
 * Visitors never fetch from Supabase directly: the website serves every
 * photo from its own `/media/…` address (app/media/[...key]/route.ts), so
 * the strict Content-Security-Policy stays "images from this site only".
 */
export const PHOTO_BUCKET = "property-photos";

/** Keys look like "<propertyId>/<random>-1200.webp" (or -640, or -plan for floor plans) — nothing else is allowed. */
const KEY_PATTERN = /^[a-z0-9-]{3,60}\/[a-f0-9-]{36}-(640|1200|plan)\.webp$/;

export function isValidPhotoKey(key: string): boolean {
  return KEY_PATTERN.test(key);
}

export function mediaUrl(key: string): string {
  return `/media/${key}`;
}

/** The storage key behind a "/media/…" address, or null if it isn't one. */
export function keyFromMediaUrl(url: string): string | null {
  const key = url.startsWith("/media/") ? url.slice("/media/".length) : "";
  return isValidPhotoKey(key) ? key : null;
}

function localDir(): string {
  return (
    process.env.LOCAL_UPLOAD_DIR ??
    path.join(/*turbopackIgnore: true*/ process.cwd(), ".data", "uploads")
  );
}

function supabaseConfigured(): boolean {
  return isSupabaseAuthConfigured();
}

export async function storePhoto(key: string, body: Buffer): Promise<void> {
  if (!isValidPhotoKey(key)) throw new Error("Invalid photo key");
  if (supabaseConfigured()) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.storage
      .from(PHOTO_BUCKET)
      .upload(key, body, { contentType: "image/webp", upsert: false, cacheControl: "31536000" });
    if (error) throw new Error(`Photo upload refused: ${error.message}`);
    return;
  }
  const file = path.join(/*turbopackIgnore: true*/ localDir(), key);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, body);
}

export async function deletePhotos(keys: string[]): Promise<void> {
  const valid = keys.filter(isValidPhotoKey);
  if (valid.length === 0) return;
  if (supabaseConfigured()) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.storage.from(PHOTO_BUCKET).remove(valid);
    if (error) throw new Error(`Photo removal refused: ${error.message}`);
    return;
  }
  await Promise.all(
    valid.map((k) => fs.rm(path.join(/*turbopackIgnore: true*/ localDir(), k), { force: true })),
  );
}

/** Reads a photo for the /media route; null when it does not exist. */
export async function readPhoto(key: string): Promise<Buffer | null> {
  if (!isValidPhotoKey(key)) return null;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseConfigured() && supabaseUrl) {
    const res = await fetch(
      `${supabaseUrl}/storage/v1/object/public/${PHOTO_BUCKET}/${key}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  }
  try {
    return await fs.readFile(path.join(/*turbopackIgnore: true*/ localDir(), key));
  } catch {
    return null;
  }
}
