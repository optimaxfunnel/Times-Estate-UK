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
export function sanitiseFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-120);
  return base || "unnamed_file";
}
