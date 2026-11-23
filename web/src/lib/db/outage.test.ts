// Database outage (2026-11-23): with the database unreachable — e.g. the
// Supabase project paused — public pages and forms must fail politely,
// never with a blank "Something went wrong" page.
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.70" }),
}));
vi.mock("@/lib/db/client", async (importOriginal) => {
  const real = await importOriginal<typeof import("@/lib/db/client")>();
  return {
    ...real,
    getDb: () =>
      Promise.reject(
        Object.assign(new Error("getaddrinfo ENOTFOUND db.example"), {
          code: "ENOTFOUND",
        }),
      ),
  };
});

import { tryDb, SAVE_FAILED_MESSAGE } from "@/lib/db/safe";
import { submitLeadForm } from "@/lib/leads/actions";
import { submitRepairReport } from "@/lib/leads/repair-actions";
import { getFavouriteProperties } from "@/lib/property/actions";
import { ListingExplorer } from "@/components/property/ListingExplorer";
import PropertyDetailPage, {
  generateMetadata,
} from "@/app/property/[id]/page";
import { __resetRateLimitForTests } from "@/lib/security/rate-limit";

const idle = { status: "idle" as const };
let errorSpy: ReturnType<typeof vi.spyOn>;

function form(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) fd.set(k, v);
  return fd;
}

beforeEach(() => {
  __resetRateLimitForTests();
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => errorSpy.mockRestore());

describe("when the database is unreachable", () => {
  it("tryDb reports failure and logs only a short generic line", async () => {
    const r = await tryDb("test", () => Promise.reject(new Error("secret query text")));
    expect(r).toEqual({ ok: false });
    const logged = errorSpy.mock.calls.flat().join(" ");
    expect(logged).toContain("database unavailable");
    expect(logged).not.toContain("secret query text");
  });

  it("the listing explorer shows a polite 'temporarily unavailable' panel", async () => {
    render(await ListingExplorer({ basePath: "/", params: {}, alertHref: "/property-alerts" }));
    expect(screen.getByText("Listings are temporarily unavailable")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "0208 672 8080" })).toHaveAttribute("href", "tel:+442086728080");
  });

  it("a property page says 'temporarily unavailable', not 'not found'", async () => {
    const params = Promise.resolve({ id: "demo-1" });
    render(await PropertyDetailPage({ params }));
    expect(screen.getByText("This property is temporarily unavailable")).toBeInTheDocument();
    const meta = await generateMetadata({ params });
    expect(meta.title).toBe("Property temporarily unavailable");
  });

  it("an enquiry form returns a clear error and does not claim success", async () => {
    const r = await submitLeadForm(
      idle,
      form({
        fullName: "Test Person",
        email: "test@example.com",
        phone: "020 7946 0000",
        privacyConsent: "on",
        leadCategory: "sales_valuation",
        sourcePage: "/sell",
        propertyAddress: "1 Test Road, SW17",
      }),
    );
    expect(r).toEqual({ status: "error", message: SAVE_FAILED_MESSAGE });
  });

  it("a repair report returns a clear error and does not claim success", async () => {
    const r = await submitRepairReport(
      idle,
      form({
        fullName: "Test Tenant",
        email: "tenant@example.com",
        phone: "07700 900000",
        propertyAddress: "Flat 1, 1 Test Road, SW17",
        issueCategory: "plumbing_leak",
        description: "Water dripping from the kitchen ceiling.",
        urgency: "urgent",
        privacyConsent: "on",
        contractorShareConsent: "on",
      }),
    );
    expect(r).toEqual({ status: "error", message: SAVE_FAILED_MESSAGE });
  });

  it("favourites report 'unavailable' rather than 'nothing saved'", async () => {
    expect(await getFavouriteProperties(["demo-1"])).toBeNull();
  });
});
