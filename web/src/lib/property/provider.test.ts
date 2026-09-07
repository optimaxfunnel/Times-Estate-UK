import { describe, expect, it } from "vitest";
import { propertyProvider } from "@/lib/property/provider";

describe("propertyProvider.list — public visibility", () => {
  it("never returns Draft or Sold properties by default (public search)", async () => {
    const result = await propertyProvider.list({
      filter: { category: "residential", listingType: "sale" },
    });
    const statuses = result.items.map((p) => p.status);
    expect(statuses).not.toContain("draft");
    expect(statuses).not.toContain("sold");
    // Both fixtures for this filter (available + under_offer) should be present.
    expect(result.total).toBe(2);
  });

  it("includes Draft and Sold properties when explicitly requested for admin use", async () => {
    const result = await propertyProvider.list({
      filter: { category: "residential", listingType: "sale" },
      includeNonPublicStatuses: true,
    });
    const statuses = result.items.map((p) => p.status);
    expect(statuses).toContain("draft");
    expect(statuses).toContain("sold");
    expect(result.total).toBe(4);
  });
});

describe("propertyProvider.list — filtering", () => {
  it("filters residential lettings separately from residential sales", async () => {
    const lettings = await propertyProvider.list({
      filter: { category: "residential", listingType: "letting" },
    });
    expect(lettings.items.every((p) => p.listingType === "letting")).toBe(true);
    expect(lettings.total).toBe(2);
  });

  it("filters commercial properties by commercial use", async () => {
    const offices = await propertyProvider.list({
      filter: {
        category: "commercial",
        listingType: "letting",
        commercialUse: "office",
      },
    });
    expect(
      offices.items.every((p) => p.commercial?.commercialUse === "office"),
    ).toBe(true);
    expect(offices.total).toBe(1);
  });

  it("returns an empty result set for a price range that matches nothing", async () => {
    const result = await propertyProvider.list({
      filter: {
        category: "residential",
        listingType: "sale",
        minPrice: 50_000_000,
      },
    });
    expect(result.total).toBe(0);
    expect(result.items).toHaveLength(0);
    expect(result.totalPages).toBe(1);
  });

  it("matches location against display address and postcode", async () => {
    const result = await propertyProvider.list({
      filter: {
        category: "residential",
        listingType: "sale",
        location: "sw17",
      },
    });
    expect(result.total).toBeGreaterThan(0);
  });
});

describe("propertyProvider.list — pagination", () => {
  it("paginates results according to the requested page size", async () => {
    const result = await propertyProvider.list({
      filter: { category: "commercial" },
      includeNonPublicStatuses: true,
      pageSize: 2,
      page: 1,
    });
    expect(result.items.length).toBeLessThanOrEqual(2);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBeGreaterThanOrEqual(1);
  });
});
