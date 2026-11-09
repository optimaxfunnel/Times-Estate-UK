// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { describe, expect, it } from "vitest";
import {
  buildListParams,
  readSort,
  readView,
  summariseSearch,
  toUrlSearchParams,
} from "@/lib/property/search-params";

describe("reading a search from the address bar", () => {
  it("scopes a dedicated page and reads the basic filters", () => {
    const p = buildListParams(
      { location: "SW17", minPrice: "200000", maxPrice: "700000", minBedrooms: "2" },
      "residential",
      "sale",
    );
    expect(p.filter!).toMatchObject({
      category: "residential",
      listingType: "sale",
      location: "SW17",
      minPrice: 200000,
      maxPrice: 700000,
      minBedrooms: 2,
    });
    expect(p.page).toBe(1);
  });

  it("ignores values that are not on the allowed lists", () => {
    const p = buildListParams({
      propertyType: ["flat", "castle"],
      tenure: ["freehold", "rented-forever"],
      commercialUse: ["office", "spaceport"],
      furnishing: "furnished",
      bedrooms: ["1", "3", "-1", "2.5", "99"],
    });
    expect(p.filter!.propertyTypes).toEqual(["flat"]);
    expect(p.filter!.tenures).toEqual(["freehold"]);
    expect(p.filter!.commercialUses).toEqual(["office"]);
    expect(p.filter!.furnishings).toEqual(["furnished"]);
    expect(p.filter!.bedrooms).toEqual([1, 3]);
  });

  it("can never be used to reveal drafts or withdrawn listings", () => {
    const p = buildListParams({ status: ["draft", "awaiting_approval", "withdrawn", "archived", "available"] });
    expect(p.filter!.statuses).toEqual(["available"]);
  });

  it("ignores numbers and dates that are not numbers or dates", () => {
    const p = buildListParams({ minPrice: "lots", availableBy: "next week" });
    expect(p.filter!.minPrice).toBeUndefined();
    expect(p.filter!.availableBy).toBeUndefined();
    expect(buildListParams({ availableBy: "2027-03-01" }).filter!.availableBy).toBe("2027-03-01");
  });

  it("falls back to safe defaults for sort and view", () => {
    expect(readSort({ sort: "price_asc" })).toBe("price_asc");
    expect(readSort({ sort: "drop table" })).toBe("newest");
    expect(readView({ view: "list" })).toBe("list");
    expect(readView({ view: "other" })).toBe("grid");
  });

  it("drops the page number when building pagination links", () => {
    const usp = toUrlSearchParams({ location: "SW17", page: "3", bedrooms: ["1", "2"] });
    expect(usp.toString()).toBe("location=SW17&bedrooms=1&bedrooms=2");
  });

  it("summarises the search in plain English", () => {
    expect(summariseSearch({})).toBe("no specific filters");
    expect(summariseSearch({ location: "Tooting", maxPrice: "500000", minBedrooms: "2" })).toBe(
      'in "Tooting", priced up to £500000, 2+ bedrooms',
    );
    expect(summariseSearch({ minPrice: "200000", maxPrice: "500000" })).toBe(
      "priced from £200000 up to £500000",
    );
    expect(summariseSearch({ minPrice: "200000" })).toBe("priced from £200000");
  });
});
