// Written 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md);
// adjusted to the original schema.ts restored from git (commit 5284b25).
import { describe, expect, it } from "vitest";
import { propertySchema } from "@/lib/property/schema";
import { demoProperties } from "@/data/demo-properties";
import {
  FEED_ADAPTERS,
  FeedNotConfiguredError,
  importListings,
  type FeedAdapter,
} from "@/lib/property/feeds/feed-adapter";

// The schema needs a full postcode; sample listings store only the public
// outward code ("SW17"), so tests supply a full one. (Finding, 2026-11-09:
// sample data would not pass this schema as-is; it is never imported, so
// recorded rather than changed.)
const base = { ...demoProperties[0], postcode: "SW17 9AA" };

describe("property validation", () => {
  it("accepts a complete residential record", () => {
    const r = propertySchema.safeParse(base);
    if (!r.success) throw new Error(r.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  });

  it("needs residential details for a residential property", () => {
    const { residential: _r, ...rest } = base;
    const r = propertySchema.safeParse(rest);
    expect(r.success).toBe(false);
    if (!r.success) expect(r.error.issues.map((i) => i.message)).toContain(
      "Residential details are required for a residential property.",
    );
  });

  it("needs commercial details for a commercial property", () => {
    const r = propertySchema.safeParse({ ...base, category: "commercial", residential: undefined });
    expect(r.success).toBe(false);
  });

  it("rejects a status that does not exist and a too-short postcode", () => {
    expect(propertySchema.safeParse({ ...base, status: "live" }).success).toBe(false);
    expect(propertySchema.safeParse({ ...base, postcode: "SW1" }).success).toBe(false);
  });
});

describe("property feed boundary", () => {
  it("has every named CRM switched off", () => {
    expect(FEED_ADAPTERS.map((a) => a.id)).toEqual(["reapit", "alto", "dezrez", "jupix", "street", "sme"]);
    for (const a of FEED_ADAPTERS) expect(a.isConfigured()).toBe(false);
  });

  it("refuses to import from an unconfigured feed", async () => {
    await expect(importListings(FEED_ADAPTERS[0])).rejects.toBeInstanceOf(FeedNotConfiguredError);
  });

  it("imports valid records as unpublished, unverified and not demo; rejects invalid ones", async () => {
    const good = { ...base, id: "123", status: "available" as const, verification: "verified" as const, isDemo: true };
    const fake: FeedAdapter = {
      id: "test",
      name: "Test CRM",
      isConfigured: () => true,
      fetchListings: async () => [good, { id: "bad", summary: "x" }, "boom"],
      toProperty: (raw) => {
        if (raw === "boom") throw new Error("unreadable");
        return raw as never;
      },
    };
    const report = await importListings(fake, new Date("2026-11-09T00:00:00Z"));
    expect(report.accepted).toHaveLength(1);
    expect(report.accepted[0]).toMatchObject({
      id: "test-123",
      status: "awaiting_approval",
      verification: "unverified",
      isDemo: false,
      updatedAt: "2026-11-09T00:00:00.000Z",
    });
    expect(report.rejected.map((r) => r.id)).toEqual(["bad", "unknown"]);
  });
});
