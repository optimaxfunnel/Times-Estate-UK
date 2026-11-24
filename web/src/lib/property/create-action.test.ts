// Add a property (E9, 2026-11-24): new listings start as private drafts,
// are never demonstration data, and need create_property.
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Role } from "@/lib/auth/roles";

let role: Role = "property_editor";
let redirectedTo = "";
vi.mock("@/lib/auth/session", () => ({ requireRole: async () => role }));
vi.mock("next/cache", () => ({ revalidatePath: () => {} }));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    redirectedTo = url;
    throw new Error("NEXT_REDIRECT");
  },
}));

import { createPropertyAction } from "@/lib/property/create-action";
import { propertyProvider } from "@/lib/property/provider";
import { __truncateAllForTests } from "@/lib/db/client";

const idle = { status: "idle" as const };
const form = (f: Record<string, string>) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(f)) fd.set(k, v);
  return fd;
};
const flat = {
  category: "residential",
  listingType: "letting",
  privateAddress: "Flat 2, 10 Real Road, London SW17 0AA",
  displayAddress: "Real Road, Tooting",
  postcode: "sw17 0aa",
  price: "£1,950",
  priceQualifier: "per_calendar_month",
  propertyType: "flat",
  bedrooms: "2",
  bathrooms: "1",
  furnishing: "unfurnished",
  summary: "A two-bedroom flat close to the station.",
  description: "A second-floor flat with two double bedrooms and a modern kitchen.",
  features: "Close to station\n\nGas central heating\n",
};

async function create(fields: Record<string, string>) {
  redirectedTo = "";
  try {
    return await createPropertyAction(idle, form(fields));
  } catch (e) {
    if ((e as Error).message !== "NEXT_REDIRECT") throw e;
    return { status: "redirected" as const };
  }
}

beforeEach(async () => {
  await __truncateAllForTests();
  role = "property_editor";
});

describe("add a property", () => {
  it("saves a private draft and opens it for editing", async () => {
    expect((await create(flat)).status).toBe("redirected");
    const id = redirectedTo.match(/\/admin\/properties\/([^?]+)/)![1];
    const p = (await propertyProvider.getById(id))!;
    expect(p.status).toBe("draft");
    expect(p.isDemo).toBe(false);
    expect(p.verification).toBe("unverified");
    expect(p.price).toBe(1950);
    expect(p.postcode).toBe("SW17 0AA");
    expect(p.features).toEqual(["Close to station", "Gas central heating"]);
    expect(p.residential?.bedrooms).toBe(2);
    expect(p.commercial).toBeUndefined();
  });

  it("never shows the draft on the public site", async () => {
    await create(flat);
    const pub = await propertyProvider.list({ pageSize: 1000 });
    expect(pub.items.some((p) => p.displayAddress === "Real Road, Tooting")).toBe(false);
  });

  it("saves a commercial property with its own details only", async () => {
    await create({
      ...flat,
      category: "commercial",
      listingType: "sale",
      priceQualifier: "offers_in_excess_of",
      commercialUse: "office",
      floorAreaSqFt: "1200",
    });
    const id = redirectedTo.match(/\/admin\/properties\/([^?]+)/)![1];
    const p = (await propertyProvider.getById(id))!;
    expect(p.commercial?.floorAreaSqFt).toBe(1200);
    expect(p.residential).toBeUndefined();
  });

  it("explains what is missing", async () => {
    const r = await create({ ...flat, summary: "Short" });
    expect(r.status).toBe("error");
    expect((r as { message: string }).message).toMatch(/at least 10 characters/);
  });

  it("refuses roles that cannot add properties", async () => {
    for (const r of ["content_editor", "enquiry_viewer"] as Role[]) {
      role = r;
      expect((await create(flat)).status).toBe("error");
    }
  });
});
