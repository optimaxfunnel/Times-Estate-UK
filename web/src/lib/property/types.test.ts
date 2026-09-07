import { describe, expect, it } from "vitest";
import {
  toPublicProperty,
  toPublicCommercialDetails,
  type Property,
} from "@/lib/property/types";

const baseProperty: Property = {
  id: "p1",
  privateAddress: "1 Real Address, London, SW17 0AA",
  internalNotes: "Vendor is motivated, will accept low offers — never public.",
  assignedStaffMemberId: "staff-1",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  verification: "unverified",
  displayAddress: "Sample Street, London",
  postcode: "SW17",
  listingType: "sale",
  category: "residential",
  price: 500000,
  priceQualifier: "guide_price",
  status: "available",
  summary: "A sample property.",
  description: "A sample property.",
  features: [],
  media: { images: [], floorPlans: [] },
  isDemo: true,
  residential: { propertyType: "flat", bedrooms: 2, bathrooms: 1 },
};

describe("toPublicProperty", () => {
  it("never includes the private address, internal notes, or assigned staff member", () => {
    const publicProperty = toPublicProperty(baseProperty);
    expect(publicProperty).not.toHaveProperty("privateAddress");
    expect(publicProperty).not.toHaveProperty("internalNotes");
    expect(publicProperty).not.toHaveProperty("assignedStaffMemberId");
    // Sanity check: the private fields genuinely existed on the source object.
    expect(baseProperty.privateAddress).toBeTruthy();
  });

  it("keeps every field that is meant to be public", () => {
    const publicProperty = toPublicProperty(baseProperty);
    expect(publicProperty.displayAddress).toBe("Sample Street, London");
    expect(publicProperty.price).toBe(500000);
    expect(publicProperty.residential?.bedrooms).toBe(2);
  });
});

describe("toPublicCommercialDetails", () => {
  it("strips an unverified investment yield before public display", () => {
    const result = toPublicCommercialDetails({
      commercialUse: "office",
      floorAreaSqFt: 1000,
      investmentYieldPercent: { value: 7.5, verified: false },
    });
    expect(result?.investmentYieldPercent).toBeUndefined();
  });

  it("keeps a verified investment yield", () => {
    const result = toPublicCommercialDetails({
      commercialUse: "office",
      floorAreaSqFt: 1000,
      investmentYieldPercent: { value: 7.5, verified: true },
    });
    expect(result?.investmentYieldPercent?.value).toBe(7.5);
  });

  it("passes through undefined commercial details unchanged", () => {
    expect(toPublicCommercialDetails(undefined)).toBeUndefined();
  });
});
