import { describe, expect, it } from "vitest";
import {
  matchesFileSignature,
  sanitiseFilename,
  validateFile,
} from "@/lib/security/file-upload";
import {
  attachmentStore,
  canOpenAttachment,
  retentionDeleteAfter,
} from "@/lib/security/attachment-store";
import { checkRefusal } from "@/lib/ai/refusals";

const bytes = (...b: number[]) =>
  new Uint8Array([...b, ...new Array(16).fill(0)]);

describe("repair uploads", () => {
  it("accepts real JPEG, PNG and PDF headers and rejects a disguised file", () => {
    expect(matchesFileSignature(bytes(0xff, 0xd8, 0xff), "image/jpeg")).toBe(
      true,
    );
    expect(
      matchesFileSignature(
        bytes(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a),
        "image/png",
      ),
    ).toBe(true);
    expect(
      matchesFileSignature(
        bytes(0x25, 0x50, 0x44, 0x46, 0x2d),
        "application/pdf",
      ),
    ).toBe(true);
    // A Windows program ("MZ") renamed to photo.jpg
    expect(matchesFileSignature(bytes(0x4d, 0x5a), "image/jpeg")).toBe(false);
  });

  it("limits type and size and cleans file names", () => {
    expect(
      validateFile({
        name: "a.exe",
        size: 10,
        type: "application/x-msdownload",
      }).valid,
    ).toBe(false);
    expect(
      validateFile({
        name: "big.jpg",
        size: 9 * 1024 * 1024,
        type: "image/jpeg",
      }).valid,
    ).toBe(false);
    expect(sanitiseFilename("../../etc/pass wd<script>.jpg")).not.toMatch(
      /[/<> ]/,
    );
  });

  it("keeps nothing until storage is approved, and only opens clean files for managers", async () => {
    expect(attachmentStore.isConfigured()).toBe(false);
    await expect(
      attachmentStore.put("lead-1", new File(["x"], "x.jpg"), "x.jpg"),
    ).rejects.toThrow();
    expect(canOpenAttachment("manager", { scanStatus: "clean" }).allowed).toBe(
      true,
    );
    expect(
      canOpenAttachment("manager", { scanStatus: "pending_scan" }).allowed,
    ).toBe(false);
    expect(
      canOpenAttachment("enquiry_viewer", { scanStatus: "clean" }).allowed,
    ).toBe(false);
  });

  it("plans deletion 12 months after a repair is closed", () => {
    expect(
      retentionDeleteAfter(new Date("2026-01-15")).toISOString().slice(0, 7),
    ).toBe("2027-01");
  });
});

describe("the assistant does not classify emergencies", () => {
  it("refuses to say whether something is an emergency or safe", () => {
    expect(
      checkRefusal("Is this an emergency? water is coming through the ceiling"),
    ).not.toBeNull();
    expect(checkRefusal("is it safe to stay tonight")).not.toBeNull();
  });
});
