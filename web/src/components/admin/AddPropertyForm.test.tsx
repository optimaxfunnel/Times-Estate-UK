// Add-property form (2026-11-24): the details section follows the chosen
// category, and price wording follows sale or let.
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("@/lib/property/create-action", () => ({
  createPropertyAction: async () => ({ status: "idle" }),
  updatePropertyDetailsAction: async () => ({ status: "idle" }),
}));

import { AddPropertyForm } from "@/components/admin/AddPropertyForm";
import { demoProperties } from "@/data/demo-properties";

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

  it("in edit mode, starts from the property's current values", () => {
    const office = demoProperties.find((p) => p.id === "demo-com-let-2")!;
    render(<AddPropertyForm property={office} />);
    expect((screen.getByLabelText("Category") as HTMLSelectElement).value).toBe("commercial");
    expect((screen.getByLabelText("Floor area (sq ft)") as HTMLInputElement).value).toBe("1100");
    expect((screen.getByLabelText(/Address shown on the website/) as HTMLInputElement).value).toBe(office.displayAddress);
    expect(screen.queryByLabelText("Short summary")).toBeNull(); // edited in the form above
    expect(screen.getByRole("button", { name: "Save details" })).toBeInTheDocument();
  });
});
