// Add-property form (2026-11-24): the details section follows the chosen
// category, and price wording follows sale or let.
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("@/lib/property/create-action", () => ({
  createPropertyAction: async () => ({ status: "idle" }),
}));

import { AddPropertyForm } from "@/components/admin/AddPropertyForm";

describe("AddPropertyForm", () => {
  it("shows home details for residential and commercial details for commercial", () => {
    render(<AddPropertyForm />);
    expect(screen.getByLabelText("Bedrooms")).toBeInTheDocument();
    expect(screen.queryByLabelText("Floor area (sq ft)")).toBeNull();

    fireEvent.change(screen.getByLabelText("Category"), { target: { value: "commercial" } });
    expect(screen.getByLabelText("Floor area (sq ft)")).toBeInTheDocument();
    expect(screen.queryByLabelText("Bedrooms")).toBeNull();
  });

  it("offers rent wording when the property is to let", () => {
    render(<AddPropertyForm />);
    expect(screen.getByLabelText("Price (£)")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("For sale or to let"), { target: { value: "letting" } });
    expect(screen.getByLabelText("Rent (£)")).toBeInTheDocument();
    const shownAs = screen.getByLabelText("Shown as") as HTMLSelectElement;
    expect([...shownAs.options].map((o) => o.value)).toContain("per_calendar_month");
  });

  it("explains that drafts are private", () => {
    render(<AddPropertyForm />);
    expect(screen.getByText(/Drafts are never shown on the website/)).toBeInTheDocument();
  });
});
