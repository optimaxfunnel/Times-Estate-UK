import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { contentGaps } from "@/lib/content-gaps";

afterEach(() => vi.unstubAllEnvs());

describe("PlaceholderNotice", () => {
  it("shows the internal note outside production", () => {
    vi.stubEnv("NODE_ENV", "development");
    render(
      <PlaceholderNotice status="missing">Fees not supplied</PlaceholderNotice>,
    );
    expect(screen.getByText("Fees not supplied")).toBeInTheDocument();
    expect(screen.getByText(/hidden from the public site/)).toBeInTheDocument();
  });

  it("hides the internal note from the public in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    const { container } = render(
      <PlaceholderNotice status="missing">Fees not supplied</PlaceholderNotice>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("shows only the plain public line in production when one is given", () => {
    vi.stubEnv("NODE_ENV", "production");
    render(
      <PlaceholderNotice status="missing" publicText="Ask us for a quote.">
        Fees not supplied
      </PlaceholderNotice>,
    );
    expect(screen.getByText("Ask us for a quote.")).toBeInTheDocument();
    expect(screen.queryByText("Fees not supplied")).toBeNull();
  });

  it("can be shown on a staging build for owner review", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SHOW_CONTENT_NOTES", "true");
    render(
      <PlaceholderNotice status="missing">Fees not supplied</PlaceholderNotice>,
    );
    expect(screen.getByText("Fees not supplied")).toBeInTheDocument();
  });
});

describe("content gaps list", () => {
  it("flags the legally required fee information as a launch blocker", () => {
    const fees = contentGaps.find((g) => g.item.startsWith("Tenant permitted"));
    expect(fees?.blocksLaunch).toBe(true);
  });
});
