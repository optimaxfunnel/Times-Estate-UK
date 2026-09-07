"use client";

import { useId, useState } from "react";
import { ALLOWED_FILE_TYPES, MAX_FILES, MAX_FILE_SIZE_BYTES, validateFile } from "@/lib/security/file-upload";

export function FileUploadField({ name, label }: { name: string; label: string }) {
  const id = useId();
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    const nextErrors: string[] = [];
    const valid: File[] = [];

    if (selected.length > MAX_FILES) {
      nextErrors.push(`Please select up to ${MAX_FILES} files.`);
    }

    for (const file of selected.slice(0, MAX_FILES)) {
      const result = validateFile(file);
      if (result.valid) {
        valid.push(file);
      } else if (result.reason) {
        nextErrors.push(result.reason);
      }
    }

    setFiles(valid);
    setErrors(nextErrors);
  }

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        multiple
        accept={ALLOWED_FILE_TYPES.join(",")}
        onChange={handleChange}
        aria-describedby={`${id}-hint`}
        className="block w-full text-sm text-ink file:mr-3 file:rounded-sm file:border file:border-border file:bg-surface file:px-3 file:py-1.5 file:text-sm"
      />
      <p id={`${id}-hint`} className="text-xs text-ink/70">
        JPEG, PNG, HEIC or PDF, up to {MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB each, up to {MAX_FILES}{" "}
        files. Files are validated on submission but not yet stored anywhere — see /INTEGRATIONS.md.
      </p>
      {errors.length > 0 && (
        <ul className="text-sm text-danger">
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      {files.length > 0 && (
        <ul className="text-sm text-ink/70">
          {files.map((file) => (
            <li key={file.name}>
              {file.name} ({Math.round(file.size / 1024)}KB)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
