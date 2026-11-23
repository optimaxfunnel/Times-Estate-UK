// Every sample photo must exist, be credited, carry a "Sample photo"
// alt text, and belong to a demonstration listing (Rules 1–2).
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SAMPLE_PHOTOS } from "@/data/sample-photos";
import { demoProperties } from "@/data/demo-properties";
import { PUBLICLY_VISIBLE_STATUSES } from "@/lib/property/types";

const publicDir = path.join(__dirname, "..", "..", "public");

describe("sample listing photos", () => {
  it("cover every public sample listing", () => {
    const publicDemos = demoProperties.filter((p) =>
      PUBLICLY_VISIBLE_STATUSES.includes(p.status),
    );
    for (const p of publicDemos) expect(SAMPLE_PHOTOS[p.id]?.length).toBeGreaterThan(0);
  });

  it("are only for demonstration listings", () => {
    const demoIds = new Set(demoProperties.filter((p) => p.isDemo).map((p) => p.id));
    for (const id of Object.keys(SAMPLE_PHOTOS)) expect(demoIds.has(id)).toBe(true);
  });

  it("exist on disk, are labelled and credited", () => {
    for (const image of Object.values(SAMPLE_PHOTOS).flat()) {
      for (const url of [image.url, image.thumbnailUrl!]) {
        expect(fs.existsSync(path.join(publicDir, url))).toBe(true);
      }
      expect(image.alt).toMatch(/^Sample photo: /);
      expect(image.credit?.author).toBeTruthy();
      expect(image.credit?.sourceUrl).toMatch(/^https:\/\/unsplash\.com\/photos\//);
    }
  });
});
