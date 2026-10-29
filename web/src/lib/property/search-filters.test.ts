import { describe, expect, it } from "vitest";
import { propertyProvider } from "@/lib/property/provider";
import { buildListParams } from "@/lib/property/search-params";

const run = async (
  query: Record<string, string | string[]>,
  category?: "residential" | "commercial",
  listingType?: "sale" | "letting",
) =>
  propertyProvider.list(
    buildListParams(query, category, listingType, { pageSize: 100 }),
  );

describe("search filters (shareable URL parameters)", () => {
  it("filters lettings by furnishing", async () => {
    const r = await run({ furnishing: "furnished" }, "residential", "letting");
    expect(
      r.items.every((p) => p.residential?.furnishing === "furnished"),
    ).toBe(true);
    expect(r.total).toBeGreaterThan(0);
  });

  it("filters lettings by availability date", async () => {
    const r = await run(
      { availableBy: "2026-09-30" },
      "residential",
      "letting",
    );
    expect(
      r.items.every(
        (p) =>
          !p.residential?.availableFrom ||
          p.residential.availableFrom <= "2026-09-30",
      ),
    ).toBe(true);
  });

  it("filters commercial by a floor-area range", async () => {
    const r = await run(
      { minFloorAreaSqFt: "900", maxFloorAreaSqFt: "1200" },
      "commercial",
      "letting",
    );
    expect(r.total).toBeGreaterThan(0);
    for (const p of r.items) {
      expect(p.commercial!.floorAreaSqFt).toBeGreaterThanOrEqual(900);
      expect(p.commercial!.floorAreaSqFt).toBeLessThanOrEqual(1200);
    }
  });

  it("filters by tenure and ignores values that are not real tenures", async () => {
    const r = await run({ tenure: ["freehold", "not-a-tenure"] });
    expect(r.items.length).toBeGreaterThan(0);
    for (const p of r.items) {
      expect(p.residential?.tenure ?? p.commercial?.tenure).toBe("freehold");
    }
  });

  it("never returns a non-public property, whatever the URL asks for", async () => {
    const r = await run({ status: ["draft", "sold", "archived"] });
    expect(
      r.items.every((p) =>
        ["available", "under_offer", "sold_stc", "let_agreed"].includes(
          p.status,
        ),
      ),
    ).toBe(true);
  });
});
