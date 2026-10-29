import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import {
  EpcPanel,
  PropertyDocuments,
} from "@/components/property/PropertyExtras";
import { propertyProvider } from "@/lib/property/provider";
import { propertySchema } from "@/lib/property/schema";
import { demoProperties } from "@/data/demo-properties";
import { toPublicProperty } from "@/lib/property/types";

describe("property detail building blocks", () => {
  it("shows an accessible fallback when no photograph exists", () => {
    render(<PropertyGallery images={[]} />);
    expect(
      screen.getByRole("img", { name: /no photograph has been supplied/i }),
    ).toBeInTheDocument();
  });

  it("marks missing floor plan, brochure and tour as not yet supplied", () => {
    render(<PropertyDocuments media={{ images: [], floorPlans: [] }} />);
    expect(screen.getAllByText("Not yet supplied")).toHaveLength(3);
  });

  it("says plainly when no EPC is recorded, and shows it when it is", () => {
    const base = toPublicProperty(demoProperties[0]);
    const { rerender } = render(
      <EpcPanel
        property={{
          ...base,
          residential: { ...base.residential!, epcRating: undefined },
        }}
      />,
    );
    expect(screen.getByText(/EPC not yet recorded/i)).toBeInTheDocument();
    rerender(
      <EpcPanel
        property={{
          ...base,
          residential: { ...base.residential!, epcRating: "C" },
        }}
      />,
    );
    expect(screen.getByText("C")).toBeInTheDocument();
  });
});

describe("property creation, editing and invalid input", () => {
  it("creates and edits a property, recording the change", async () => {
    const created = await propertyProvider.create(
      { ...demoProperties[0], id: "test-create-1", status: "draft" },
      "property_editor",
    );
    expect((await propertyProvider.getById("test-create-1"))?.status).toBe(
      "draft",
    );
    const updated = await propertyProvider.update(
      created.id,
      { summary: "An edited summary for testing." },
      "property_editor",
    );
    expect(updated.summary).toBe("An edited summary for testing.");
    // A new draft never appears in public search.
    const pub = await propertyProvider.list({ pageSize: 100 });
    expect(pub.items.some((p) => p.id === "test-create-1")).toBe(false);
  });

  it("rejects invalid input with readable messages", () => {
    const result = propertySchema.safeParse({
      id: "x",
      privateAddress: "1",
      displayAddress: "",
      postcode: "",
      listingType: "sale",
      category: "residential",
      priceQualifier: "guide_price",
      status: "draft",
      summary: "short",
      description: "too short",
    });
    expect(result.success).toBe(false);
    const messages = result.success
      ? []
      : result.error.issues.map((i) => i.message);
    expect(messages).toEqual(
      expect.arrayContaining([
        "Enter the full private address.",
        "Summary must be at least 10 characters.",
      ]),
    );
  });
});
