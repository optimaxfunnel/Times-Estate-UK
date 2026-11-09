// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { describe, expect, it } from "vitest";
import {
  describeProperty,
  formatPriceLabel,
  formatPriceParts,
  summariseBedsAndBaths,
  summariseFloorArea,
} from "@/lib/property/format";
import { computeFacets } from "@/lib/property/facets";
import { demoProperties } from "@/data/demo-properties";
import { toPublicProperty, type PublicProperty } from "@/lib/property/types";

const base = toPublicProperty(demoProperties[0]);
const withPrice = (price: number | undefined, priceQualifier: PublicProperty["priceQualifier"]) =>
  ({ ...base, price, priceQualifier }) as PublicProperty;

describe("price display", () => {
  it("puts sales qualifiers before the amount and rental ones after", () => {
    expect(formatPriceLabel(withPrice(650000, "guide_price"))).toBe("Guide Price £650,000");
    expect(formatPriceLabel(withPrice(1850, "per_calendar_month"))).toBe("£1,850 pcm");
    expect(formatPriceLabel(withPrice(24000, "per_annum"))).toBe("£24,000 per annum");
  });

  it("shows POA rather than inventing a figure", () => {
    expect(formatPriceLabel(withPrice(undefined, "guide_price"))).toBe("POA");
    expect(formatPriceLabel(withPrice(500000, "poa"))).toBe("POA");
    expect(formatPriceParts(withPrice(undefined, "guide_price"))).toEqual({
      amount: "POA",
      qualifier: null,
      qualifierAfter: false,
    });
  });

  it("splits price parts for cards", () => {
    expect(formatPriceParts(withPrice(1850, "per_calendar_month"))).toEqual({
      amount: "£1,850",
      qualifier: "pcm",
      qualifierAfter: true,
    });
    expect(formatPriceParts(withPrice(300000, "fixed_price")).qualifier).toBeNull();
  });
});

describe("property summaries", () => {
  it("describes residential and commercial properties", () => {
    expect(describeProperty(base)).toBe("3 bed terraced house");
    expect(summariseBedsAndBaths(base)).toBe("3 bed · 1 bath");
    expect(summariseFloorArea(base)).toBeNull();
    const shop = {
      ...base,
      residential: undefined,
      commercial: { commercialUse: "retail", floorAreaSqFt: 1100 },
    } as PublicProperty;
    expect(describeProperty(shop)).toBe("Retail — 1,100 sq ft");
    expect(summariseFloorArea(shop)).toBe("1,100 sq ft");
    expect(summariseBedsAndBaths(shop)).toBeNull();
  });
});

describe("filter counts", () => {
  it("counts each option, most common first", () => {
    const facets = computeFacets(demoProperties);
    const total = facets.propertyTypes.reduce((n, o) => n + o.count, 0);
    expect(total).toBe(demoProperties.filter((p) => p.residential).length);
    const counts = facets.propertyTypes.map((o) => o.count);
    expect(counts).toEqual([...counts].sort((a, b) => b - a));
  });

  it("returns empty lists for no properties", () => {
    expect(computeFacets([]).propertyTypes).toEqual([]);
  });
});
