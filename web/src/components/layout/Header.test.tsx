import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout/Header";

describe("Header", () => {
  it("exposes an accessible primary navigation landmark", () => {
    render(<Header />);
    expect(
      screen.getByRole("navigation", { name: "Primary" }),
    ).toBeInTheDocument();
  });

  it("always shows the top business-priority call to action", () => {
    render(<Header />);
    expect(
      screen.getAllByRole("link", { name: /get a valuation/i }).length,
    ).toBeGreaterThan(0);
  });

  it("groups the navigation and keeps every grouped route reachable as a link", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const label of [
      "Properties",
      "Landlords",
      "Tenants",
      "Services",
      "About",
      "Contact",
    ]) {
      expect(
        screen.getAllByRole("link", { name: label }).length,
      ).toBeGreaterThan(0);
    }
    expect(nav.querySelector('a[href="/report-a-repair"]')).not.toBeNull();
    expect(nav.querySelector('a[href="/commercial/to-let"]')).not.toBeNull();
  });

  it("shows the brand as live text beside the emblem, not baked into an image", () => {
    render(<Header />);
    expect(screen.getAllByText(/estate ltd/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/london property experts/i).length,
    ).toBeGreaterThan(0);
  });
});
