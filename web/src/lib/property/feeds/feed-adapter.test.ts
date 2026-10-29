import { describe, expect, it } from "vitest";
import {
  FEED_ADAPTERS,
  FeedNotConfiguredError,
  importListings,
  type FeedAdapter,
} from "@/lib/property/feeds/feed-adapter";

/** A fake, in-memory adapter — no network, no real provider. */
function fakeAdapter(
  records: Record<string, unknown>[],
): FeedAdapter<Record<string, unknown>> {
  return {
    id: "fake",
    name: "Test feed",
    isConfigured: () => true,
    fetchListings: async () => records,
    toProperty: (raw) => raw as never,
  };
}

const valid = {
  id: "A1",
  privateAddress: "1 Test Road, London SW17 0AA",
  displayAddress: "Test Road, London",
  postcode: "SW17 0AA",
  listingType: "sale",
  category: "residential",
  price: 400000,
  priceQualifier: "guide_price",
  status: "available",
  summary: "A test record from a fake feed.",
  description: "A test record used only to check the import boundary.",
  features: [],
  residential: { propertyType: "flat", bedrooms: 2, bathrooms: 1 },
};

describe("CRM feed boundary", () => {
  it("has no provider connected — every named adapter refuses to run", async () => {
    expect(FEED_ADAPTERS.map((a) => a.id)).toEqual([
      "reapit",
      "alto",
      "dezrez",
      "jupix",
      "street",
      "sme",
    ]);
    for (const adapter of FEED_ADAPTERS) {
      expect(adapter.isConfigured()).toBe(false);
      await expect(importListings(adapter)).rejects.toBeInstanceOf(
        FeedNotConfiguredError,
      );
    }
  });

  it("never publishes an import automatically and never marks it demo or verified", async () => {
    const report = await importListings(fakeAdapter([valid]));
    expect(report.accepted).toHaveLength(1);
    const p = report.accepted[0];
    expect(p.status).toBe("awaiting_approval");
    expect(p.isDemo).toBe(false);
    expect(p.verification).toBe("unverified");
    expect(p.id).toBe("fake-A1");
  });

  it("rejects invalid records with reasons instead of half-importing them", async () => {
    const report = await importListings(
      fakeAdapter([
        valid,
        { ...valid, id: "B2", summary: "short", residential: undefined },
      ]),
    );
    expect(report.accepted).toHaveLength(1);
    expect(report.rejected[0].id).toBe("B2");
    expect(report.rejected[0].reasons.join(" ")).toMatch(
      /summary|residential/i,
    );
  });
});
