import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PropertyCard } from "@/components/ui/PropertyCard";

describe("PropertyCard", () => {
  it("always visibly marks demo data as sample, per Rule 2", () => {
    render(
      <PropertyCard
        address="Sample Street, London"
        priceLabel="£000,000"
        bedrooms={3}
        bathrooms={1}
        transactionType="For Sale"
        isDemo
      />,
    );
    expect(screen.getByText(/sample property/i)).toBeInTheDocument();
    expect(screen.getByText("Sample Street, London")).toBeInTheDocument();
  });
});
