import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState, ErrorState } from "@/components/ui/StatusPanel";
import { LoadingRegion, PropertyCardSkeleton } from "@/components/ui/Skeleton";

describe("state components", () => {
  it("error state is announced and always offers a phone fallback", () => {
    render(<ErrorState />);
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    expect(screen.getByRole("link", { name: "0208 672 8080" })).toHaveAttribute(
      "href",
      "tel:+442086728080",
    );
  });

  it("empty state shows its title and actions", () => {
    render(
      <EmptyState
        title="No properties match"
        actions={<button>Clear</button>}
      />,
    );
    expect(screen.getByText("No properties match")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear" })).toBeInTheDocument();
  });

  it("loading region announces once and hides the skeleton shapes", () => {
    const { container } = render(
      <LoadingRegion>
        <PropertyCardSkeleton />
      </LoadingRegion>,
    );
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
    expect(
      container.querySelectorAll('[aria-hidden="true"]').length,
    ).toBeGreaterThan(0);
  });
});
