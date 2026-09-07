import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PropertyCard } from "@/components/ui/PropertyCard";
import type { PublicProperty } from "@/lib/property/types";

const sampleProperty: PublicProperty = {
  id: "test-property-1",
  displayAddress: "Sample Street, London",
  postcode: "SW17",
  listingType: "sale",
  category: "residential",
  price: 500000,
  priceQualifier: "guide_price",
  status: "available",
  summary: "A sample property for testing.",
  description: "A sample property for testing.",
  features: [],
  media: { images: [], floorPlans: [] },
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  verification: "unverified",
  isDemo: true,
  residential: { propertyType: "flat", bedrooms: 3, bathrooms: 1 },
};

describe("PropertyCard", () => {
  it("always visibly marks demo data as sample, per Rule 2", () => {
    render(<PropertyCard property={sampleProperty} />);
    expect(screen.getByText(/sample property/i)).toBeInTheDocument();
    expect(screen.getByText("Sample Street, London")).toBeInTheDocument();
  });

  it("shows the current marketing status as a visible badge", () => {
    render(<PropertyCard property={{ ...sampleProperty, status: "under_offer" }} />);
    expect(screen.getByText("Under offer")).toBeInTheDocument();
  });

  it("links through to the property's detail page", () => {
    render(<PropertyCard property={sampleProperty} />);
    const links = screen.getAllByRole("link", { name: /sample street|view details/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/property/test-property-1");
  });
});
