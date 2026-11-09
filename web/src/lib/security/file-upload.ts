/**
 * File-upload validation rules for repair-report photos/documents.
 *
 * IMPORTANT — what this does NOT do yet: no file storage provider has
 * been approved (see /INTEGRATIONS.md), so uploaded files are validated
 * here but their actual bytes are never written anywhere — only
 * sanitised filename/size/type metadata is kept on the lead record.
 * Before real file storage is connected, that implementation must add:
 * - private, access-controlled storage (not a public bucket/URL)
 * - a malware-scanning step before a file is ever opened by staff
 * - a defined retention/deletion period
 * all of which are planned here, not built, per today's brief.
 */

export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/heic",
  "application/pdf",
] as const;

export const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
export const MAX_FILES = 5;
/**
 * All files in one report together. Must stay just under the Server
 * Action body limit in next.config.ts (21mb) — above that the framework
 * rejects the whole submission before this code can explain why.
 */
export const MAX_TOTAL_BYTES = 20 * 1024 * 1024; // 20MB

/** A plain-English error if the files are too large together, else null. */
export function totalSizeError(files: { size: number }[]): string | null {
  const total = files.reduce((sum, f) => sum + f.size, 0);
  return total > MAX_TOTAL_BYTES
    ? "Your files are larger than 20MB together. Please attach fewer or smaller photos."
    : null;
}

export interface FileValidationResult {
  valid: boolean;
  reason?: string;
}

export function validateFile(file: {
  name: string;
  size: number;
  type: string;
}): FileValidationResult {
  if (file.size === 0) return { valid: false, reason: "File is empty." };
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { valid: false, reason: `${file.name} is larger than 8MB.` };
  }
  if (
    !ALLOWED_FILE_TYPES.includes(
      file.type as (typeof ALLOWED_FILE_TYPES)[number],
    )
  ) {
    return {
      valid: false,
      reason: `${file.name} is not a supported file type (JPEG, PNG, HEIC or PDF only).`,
    };
  }
  return { valid: true };
}

/** Removes anything that isn't a safe filename character before the name is ever stored or shown to staff. */
/**
 * Checks the first bytes of a file against the type it claims to be.
 * A browser's "type" comes from the file's name and can be faked, so a
 * renamed program pretending to be a photo is rejected here.
 * HEIC files carry "ftyp" at byte 4 followed by a heic/heix/mif1 brand.
 */
export function matchesFileSignature(
  bytes: Uint8Array,
  claimedType: string,
): boolean {
  const starts = (sig: number[], offset = 0) =>
    sig.every((b, i) => bytes[offset + i] === b);
  switch (claimedType) {
    case "image/jpeg":
      return starts([0xff, 0xd8, 0xff]);
    case "image/png":
      return starts([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    case "application/pdf":
      return starts([0x25, 0x50, 0x44, 0x46, 0x2d]); // %PDF-
    case "image/heic": {
      if (!starts([0x66, 0x74, 0x79, 0x70], 4)) return false; // "ftyp"
      const brand = String.fromCharCode(...bytes.slice(8, 12));
      return ["heic", "heix", "hevc", "mif1", "msf1"].includes(brand);
    }
    default:
      return false;
  }
}

export function sanitiseFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
  return base || "unnamed_file";
}
