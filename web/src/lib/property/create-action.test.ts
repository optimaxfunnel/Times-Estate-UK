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

import { createPropertyAction, updatePropertyDetailsAction } from "@/lib/property/create-action";
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

  it("edits details, keeps fields the form doesn't show, and keeps text, status and photos", async () => {
    await create(flat);
    const id = redirectedTo.match(/\/admin\/properties\/([^?]+)/)![1];
    // Fields the form doesn't show, and a photo, set elsewhere.
    const before = (await propertyProvider.getById(id))!;
    await propertyProvider.update(
      id,
      {
        coordinates: { lat: 51.43, lng: -0.17 },
        media: { ...before.media, images: [{ url: "/media/x.webp", alt: "Photo" }] },
      },
      "test",
    );
    const r = await updatePropertyDetailsAction(
      { status: "idle" },
      form({
        ...flat,
        id,
        price: "2,100",
        bedrooms: "3",
        deposit: "£2,250",
        availableFrom: "2027-01-01",
        serviceCharge: "1,200",
        virtualTourUrl: "https://example.com/tour",
      }),
    );
    expect(r).toEqual({ status: "success", message: "Details saved." });
    const p = (await propertyProvider.getById(id))!;
    expect(p.price).toBe(2100);
    expect(p.residential?.bedrooms).toBe(3);
    expect(p.residential?.deposit).toBe(2250);
    expect(p.residential?.availableFrom).toBe("2027-01-01");
    expect(p.residential?.serviceCharge).toBe(1200);
    expect(p.coordinates).toEqual({ lat: 51.43, lng: -0.17 }); // not on the form: kept
    expect(p.media.images).toHaveLength(1);
    expect(p.media.virtualTourUrl).toBe("https://example.com/tour");
    expect([p.status, p.summary, p.isDemo]).toEqual(["draft", flat.summary, false]);
  });

  it("rejects a tour link that isn't https", async () => {
    await create(flat);
    const id = redirectedTo.match(/\/admin\/properties\/([^?]+)/)![1];
    const r = await updatePropertyDetailsAction({ status: "idle" }, form({ ...flat, id, virtualTourUrl: "javascript:alert(1)" }));
    expect(r.status).toBe("error");
  });

  it("an editor cannot change a live listing's details; a manager can", async () => {
    await create(flat);
    const id = redirectedTo.match(/\/admin\/properties\/([^?]+)/)![1];
    await propertyProvider.update(id, { status: "available" }, "test");
    expect((await updatePropertyDetailsAction({ status: "idle" }, form({ ...flat, id, price: "1" }))).status).toBe("error");
    role = "manager";
    expect((await updatePropertyDetailsAction({ status: "idle" }, form({ ...flat, id, price: "2000" }))).status).toBe("success");
    expect((await propertyProvider.getById(id))!.price).toBe(2000);
  });

  it("saves commercial lease and rates details", async () => {
    await create({
      ...flat,
      category: "commercial",
      listingType: "letting",
      priceQualifier: "per_annum",
      commercialUse: "retail",
      floorAreaSqFt: "850",
      useClass: "E",
      businessRatesPayable: "£9,500",
      vatPosition: "vat_applicable",
      energyRating: "B",
      leaseTermsSummary: "New 10-year FRI lease.",
    });
    const id = redirectedTo.match(/\/admin\/properties\/([^?]+)/)![1];
    const c = (await propertyProvider.getById(id))!.commercial!;
    expect([c.useClass, c.businessRatesPayable, c.vatPosition, c.energyRating, c.leaseTermsSummary]).toEqual([
      "E",
      9500,
      "vat_applicable",
      "B",
      "New 10-year FRI lease.",
    ]);
  });
});
