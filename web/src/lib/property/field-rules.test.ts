import { describe, expect, it } from "vitest";
import { demoProperties } from "@/data/demo-properties";
import {
  toPublicCommercialDetails,
  toPublicProperty,
} from "@/lib/property/types";
import {
  COMMERCIAL_FIELD_RULES,
  PRIVATE_FIELDS,
  RESIDENTIAL_FIELD_RULES,
} from "@/lib/property/field-rules";

// Private fields the public shape still carries for internal reasons
// (ids for links, dates for sorting, verification for admin-only UI) —
// never rendered as text on a public page.
const PRIVATE_BUT_CARRIED = ["id", "createdAt", "updatedAt", "verification"];

describe("property field rules", () => {
  it("strips every private-only field before a property reaches a public page", () => {
    const strict = PRIVATE_FIELDS.filter(
      (f) => !PRIVATE_BUT_CARRIED.includes(f),
    );
    expect(strict).toEqual(
      expect.arrayContaining([
        "privateAddress",
        "internalNotes",
        "assignedStaffMemberId",
      ]),
    );
    for (const property of demoProperties) {
      const pub = toPublicProperty(property) as Record<string, unknown>;
      for (const field of strict) expect(pub).not.toHaveProperty(field);
    }
  });

  it("covers every field the brief lists for residential and commercial", () => {
    for (const f of [
      "tenure",
      "councilTaxBand",
      "epcRating",
      "deposit",
      "furnishing",
      "availableFrom",
      "leaseLengthYears",
      "serviceCharge",
      "groundRent",
      "chainStatus",
    ]) {
      expect(RESIDENTIAL_FIELD_RULES).toHaveProperty(f);
    }
    for (const f of [
      "commercialUse",
      "floorAreaSqFt",
      "units",
      "rentPerAnnum",
      "businessRatesPayable",
      "vatPosition",
      "leaseTermsSummary",
      "useClass",
      "energyRating",
      "possessionDate",
      "investmentYieldPercent",
    ]) {
      expect(COMMERCIAL_FIELD_RULES).toHaveProperty(f);
    }
  });

  it("never publishes an unverified investment yield", () => {
    const shown = toPublicCommercialDetails({
      commercialUse: "office",
      floorAreaSqFt: 1000,
      investmentYieldPercent: { value: 7.5, verified: false },
    });
    expect(shown).not.toHaveProperty("investmentYieldPercent");
  });

  it("keeps a verified investment yield", () => {
    const shown = toPublicCommercialDetails({
      commercialUse: "office",
      floorAreaSqFt: 1000,
      investmentYieldPercent: { value: 7.5, verified: true },
    });
    expect(shown?.investmentYieldPercent?.value).toBe(7.5);
  });
});
