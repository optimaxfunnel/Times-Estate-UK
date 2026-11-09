// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
// Guards CLAUDE.md Rules 1 and 2: no invented facts, demo content always labelled.
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/lib/site-config";
import { getEnabledSocialProfiles } from "@/lib/social-config";
import { contentGaps } from "@/lib/content-gaps";
import { demoProperties } from "@/data/demo-properties";
import { VALUATION_TERMS } from "@/lib/valuation-terms";

describe("business facts (Rule 1)", () => {
  it("marks only Companies House facts as confirmed", () => {
    const confirmed = Object.entries(siteConfig)
      .filter(([, f]) => (f as { status: string }).status === "confirmed")
      .map(([k]) => k)
      .sort();
    expect(confirmed).toEqual(["companiesHouseNumber", "displayName", "legalName", "registeredOffice"]);
  });

  it("keeps the verified Companies House details exact", () => {
    expect(siteConfig.legalName.value).toBe("Times Estate Ltd");
    expect(siteConfig.companiesHouseNumber.value).toBe("09597081");
    expect(siteConfig.registeredOffice.value).toBe("145 Upper Tooting Road, London, SW17 7TJ");
  });

  it("never shows memberships as confirmed until verified", () => {
    expect(siteConfig.redressScheme.status).toBe("requires-verification");
    expect(siteConfig.clientMoneyProtection.status).toBe("requires-verification");
    expect(siteConfig.professionalIndemnityInsurance.status).toBe("requires-verification");
  });

  it("does not invent opening hours", () => {
    expect(siteConfig.openingHours).toEqual({ value: null, status: "missing" });
  });

  it("shows no social profile until a real link is supplied", () => {
    expect(getEnabledSocialProfiles()).toEqual([]);
  });
});

describe("demonstration data (Rule 2)", () => {
  // One sample (demo-com-let-1) is deliberately "verified" so staff screens
  // can show both states; it is still labelled demo everywhere.
  it("marks every sample property as demo and generically addressed", () => {
    expect(demoProperties.length).toBeGreaterThan(0);
    for (const p of demoProperties) {
      expect(p.isDemo).toBe(true);
      expect(p.id).toMatch(/^demo-/);
      expect(`${p.displayAddress} ${p.privateAddress}`).toMatch(/Sample|Example|Placeholder|Demonstration|Draft|Archive/i);
    }
  });

  it("gives every sample property a unique id", () => {
    const ids = demoProperties.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("staff content-status list", () => {
  it("lists the known launch blockers", () => {
    const blockers = contentGaps.filter((g) => g.blocksLaunch).map((g) => g.item).join(" | ");
    for (const must of [/permitted payments/, /letting and management fees/, /Redress/, /Client Money/, /Privacy policy/i])
      expect(blockers).toMatch(must);
  });

  it("uses only the list's own status labels", () => {
    const allowed = ["Placeholder", "Requires legal or professional review", "Supplied by the business owner"];
    for (const g of contentGaps) expect(allowed).toContain(g.status);
  });
});

describe("valuation wording", () => {
  it("defines the four kinds of valuation the site distinguishes", () => {
    expect(Object.keys(VALUATION_TERMS).sort()).toEqual(
      ["automated_estimate", "formal_valuation", "initial_appraisal", "regulated_valuation"],
    );
  });
});
