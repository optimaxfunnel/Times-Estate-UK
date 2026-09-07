import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders the correct human-readable label for each status", () => {
    render(<Badge status="requires-verification" />);
    expect(screen.getByText("Requires verification")).toBeInTheDocument();
  });

  it("labels missing content clearly", () => {
    render(<Badge status="missing" />);
    expect(screen.getByText("Missing")).toBeInTheDocument();
  });
});
