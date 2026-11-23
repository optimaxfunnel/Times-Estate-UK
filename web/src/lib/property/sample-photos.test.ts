// Stock photos for sample listings (2026-11-23): they appear only on
// demonstration records that have no photos of their own — never on a
// real listing, and never in place of a listing's own photos.
import { describe, expect, it, vi } from "vitest";

vi.mock("@/data/sample-photos", () => ({
  SAMPLE_PHOTOS: {
    "demo-res-sale-1": [
      {
        url: "/sample-photos/test.webp",
        alt: "Sample living room",
        credit: { author: "A Photographer", licence: "CC0", sourceUrl: "https://example.org/photo" },
      },
    ],
  },
}));

import { toPublicProperty } from "@/lib/property/types";
import { demoProperties } from "@/data/demo-properties";

const demo = demoProperties.find((p) => p.id === "demo-res-sale-1")!;

describe("sample photos", () => {
  it("are shown on a sample listing with no photos", () => {
    expect(toPublicProperty(demo).media.images[0].url).toBe("/sample-photos/test.webp");
  });

  it("are never shown on a real listing", () => {
    expect(toPublicProperty({ ...demo, isDemo: false }).media.images).toEqual([]);
  });

  it("never replace a listing's own photos", () => {
    const own = { url: "/own.webp", alt: "Own photo" };
    const p = { ...demo, media: { ...demo.media, images: [own] } };
    expect(toPublicProperty(p).media.images).toEqual([own]);
  });

  it("do not change the stored record", () => {
    toPublicProperty(demo);
    expect(demo.media.images).toEqual([]);
  });
});
