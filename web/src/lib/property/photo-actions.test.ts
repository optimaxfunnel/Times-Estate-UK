// Property photo upload (owner approval 2026-11-24: Supabase Storage).
// Tests use the local folder store, never the live bucket.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import sharp from "sharp";
import type { Role } from "@/lib/auth/roles";

const uploadDir = fs.mkdtempSync(path.join(os.tmpdir(), "te-photos-"));
process.env.LOCAL_UPLOAD_DIR = uploadDir;

let role: Role = "property_editor";
vi.mock("@/lib/auth/session", () => ({ requireRole: async () => role }));
vi.mock("next/cache", () => ({ revalidatePath: () => {} }));

import {
  makeMainPhotoAction,
  removePropertyPhotoAction,
  uploadPropertyPhotosAction,
} from "@/lib/property/photo-actions";
import { propertyProvider } from "@/lib/property/provider";
import { readPhoto, keyFromMediaUrl } from "@/lib/property/photo-storage";
import { __truncateAllForTests } from "@/lib/db/client";
import type { Property } from "@/lib/property/types";

const idle = { status: "idle" as const };

/** A 1600×1200 JPEG carrying a camera make and GPS position. */
async function cameraJpeg(): Promise<File> {
  const buf = await sharp({ create: { width: 1600, height: 1200, channels: 3, background: "#7a8c99" } })
    .jpeg()
    .withExif({ IFD0: { Make: "TestCam" }, IFD3: { GPSLatitudeRef: "N", GPSLatitude: "51/1 25/1 0/1" } })
    .toBuffer();
  return new File([new Uint8Array(buf)], "living-room.jpg", { type: "image/jpeg" });
}

function form(fields: Record<string, string | File | File[]>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) {
    for (const item of Array.isArray(v) ? v : [v]) fd.append(k, item);
  }
  return fd;
}

async function draft(): Promise<Property> {
  const now = new Date().toISOString();
  const p: Property = {
    id: "prop-test-photos",
    privateAddress: "1 Test Road, London SW17 0AA",
    createdAt: now,
    updatedAt: now,
    verification: "unverified",
    displayAddress: "Test Road, Tooting",
    postcode: "SW17 0AA",
    listingType: "sale",
    category: "residential",
    price: 500000,
    priceQualifier: "guide_price",
    status: "draft",
    summary: "A test property for photos.",
    description: "A test property used to check photo uploads work.",
    features: [],
    media: { images: [], floorPlans: [] },
    isDemo: false,
    residential: { propertyType: "flat", bedrooms: 2, bathrooms: 1 },
  };
  return propertyProvider.create(p, "test");
}

beforeEach(async () => {
  await __truncateAllForTests();
  role = "property_editor";
});
afterAll(() => fs.rmSync(uploadDir, { recursive: true, force: true }));

describe("property photos", () => {
  it("uploads, resizes to two 4:3 WebP sizes and strips camera data", async () => {
    const p = await draft();
    const original = await cameraJpeg();
    // The test photo really does carry camera data before upload.
    expect((await sharp(Buffer.from(await original.arrayBuffer())).metadata()).exif).toBeDefined();
    const r = await uploadPropertyPhotosAction(
      idle,
      form({ id: p.id, alt: "Living room with bay window", photos: [original] }),
    );
    expect(r).toEqual({ status: "success", message: "1 photo added." });

    const image = (await propertyProvider.getById(p.id))!.media.images[0];
    expect(image.alt).toBe("Living room with bay window");
    expect(image.url).toMatch(/^\/media\/prop-test-photos\/[a-f0-9-]{36}-1200\.webp$/);

    const large = await sharp((await readPhoto(keyFromMediaUrl(image.url)!))!).metadata();
    const small = await sharp((await readPhoto(keyFromMediaUrl(image.thumbnailUrl!)!))!).metadata();
    expect([large.format, large.width, large.height]).toEqual(["webp", 1200, 900]);
    expect([small.width, small.height]).toEqual([640, 480]);
    expect(large.exif).toBeUndefined();
  });

  it("requires a description and a real photo", async () => {
    const p = await draft();
    expect((await uploadPropertyPhotosAction(idle, form({ id: p.id, alt: "", photos: [await cameraJpeg()] }))).status).toBe("error");
    const fake = new File([new Uint8Array([1, 2, 3])], "x.jpg", { type: "image/jpeg" });
    const r = await uploadPropertyPhotosAction(idle, form({ id: p.id, alt: "Kitchen photo", photos: [fake] }));
    expect(r.status).toBe("error");
    const pdf = new File([new Uint8Array([1])], "x.pdf", { type: "application/pdf" });
    expect((await uploadPropertyPhotosAction(idle, form({ id: p.id, alt: "Kitchen photo", photos: [pdf] }))).status).toBe("error");
    expect((await propertyProvider.getById(p.id))!.media.images).toHaveLength(0);
  });

  it("makes a photo the main one and removes a photo and its files", async () => {
    const p = await draft();
    await uploadPropertyPhotosAction(idle, form({ id: p.id, alt: "First photo", photos: [await cameraJpeg()] }));
    await uploadPropertyPhotosAction(idle, form({ id: p.id, alt: "Second photo", photos: [await cameraJpeg()] }));
    let images = (await propertyProvider.getById(p.id))!.media.images;

    await makeMainPhotoAction(idle, form({ id: p.id, url: images[1].url }));
    images = (await propertyProvider.getById(p.id))!.media.images;
    expect(images.map((i) => i.alt)).toEqual(["Second photo", "First photo"]);

    const gone = images[0];
    expect((await removePropertyPhotoAction(idle, form({ id: p.id, url: gone.url }))).status).toBe("success");
    expect((await propertyProvider.getById(p.id))!.media.images.map((i) => i.alt)).toEqual(["First photo"]);
    expect(await readPhoto(keyFromMediaUrl(gone.url)!)).toBeNull();
  });

  it("follows the approval rules: an editor cannot change a live listing's photos", async () => {
    const p = await draft();
    await propertyProvider.update(p.id, { status: "available" }, "test");
    const r = await uploadPropertyPhotosAction(idle, form({ id: p.id, alt: "Garden photo", photos: [await cameraJpeg()] }));
    expect(r.status).toBe("error");
    role = "manager";
    expect((await uploadPropertyPhotosAction(idle, form({ id: p.id, alt: "Garden photo", photos: [await cameraJpeg()] }))).status).toBe("success");
  });

  it("refuses roles that cannot edit properties", async () => {
    const p = await draft();
    for (const r of ["content_editor", "enquiry_viewer"] as Role[]) {
      role = r;
      expect((await uploadPropertyPhotosAction(idle, form({ id: p.id, alt: "Garden photo", photos: [await cameraJpeg()] }))).status).toBe("error");
    }
  });

  it("keeps a floor plan whole (scaled, never cropped) and separate from photos", async () => {
    const p = await draft();
    const tall = await sharp({ create: { width: 1000, height: 3000, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .png()
      .toBuffer();
    const plan = new File([new Uint8Array(tall)], "plan.png", { type: "image/png" });
    const r = await uploadPropertyPhotosAction(
      idle,
      form({ id: p.id, kind: "floorplan", alt: "Ground and first floor plan", photos: [plan] }),
    );
    expect(r).toEqual({ status: "success", message: "1 floor plan added." });
    const saved = (await propertyProvider.getById(p.id))!.media;
    expect(saved.images).toHaveLength(0);
    expect(saved.floorPlans[0].url).toMatch(/-plan\.webp$/);
    const meta = await sharp((await readPhoto(keyFromMediaUrl(saved.floorPlans[0].url)!))!).metadata();
    expect([meta.width, meta.height]).toEqual([533, 1600]); // same 1:3 shape
    // Transparent areas become white, so plans stay readable.
    const { data } = await sharp((await readPhoto(keyFromMediaUrl(saved.floorPlans[0].url)!))!).raw().toBuffer({ resolveWithObject: true });
    expect([data[0], data[1], data[2]]).toEqual([255, 255, 255]);

    expect((await removePropertyPhotoAction(idle, form({ id: p.id, url: saved.floorPlans[0].url }))).status).toBe("success");
    expect((await propertyProvider.getById(p.id))!.media.floorPlans).toHaveLength(0);
  });

  it("the media address only serves well-formed photo names", async () => {
    expect(await readPhoto("../../.env")).toBeNull();
    expect(keyFromMediaUrl("/media/../secret")).toBeNull();
  });
});
