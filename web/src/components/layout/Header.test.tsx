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
      screen.getAllByRole("link", { name: /book a valuation/i }).length,
    ).toBeGreaterThan(0);
  });
});
