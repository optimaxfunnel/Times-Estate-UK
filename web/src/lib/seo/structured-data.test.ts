import { describe, expect, it } from "vitest";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  propertyJsonLd,
} from "@/lib/seo/structured-data";
import { propertyProvider } from "@/lib/property/provider";
import { toPublicProperty } from "@/lib/property/types";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("structured data stays honest", () => {
  const org = organizationJsonLd();

  it("is valid schema.org JSON for a real estate agent", () => {
    const parsed = JSON.parse(JSON.stringify(org));
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("RealEstateAgent");
    expect(parsed.name).toBe("Times Estate Ltd");
    expect(parsed.address.postalCode).toBe("SW17 7TJ");
    expect(parsed.address.addressCountry).toBe("GB");
  });

  it("never claims reviews, ratings, awards or opening hours", () => {
    const text = JSON.stringify(org);
    for (const key of [
      "aggregateRating",
      "review",
      "award",
      "openingHours",
      "foundingDate",
      "numberOfEmployees",
    ]) {
      expect(text).not.toContain(key);
    }
  });

  it("emits no listing markup for demonstration properties", async () => {
    const { items } = await propertyProvider.list({ pageSize: 1000 });
    const properties = items.map(toPublicProperty);
    expect(properties.length).toBeGreaterThan(0);
    for (const p of properties) expect(propertyJsonLd(p)).toBeNull();
  });

  it("builds breadcrumbs in order with absolute URLs", () => {
    const b = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Fees", path: "/fees" },
    ]);
    expect(b.itemListElement[1]).toMatchObject({ position: 2, name: "Fees" });
    expect(b.itemListElement[1].item).toMatch(/^https?:\/\/.+\/fees$/);
  });
});

describe("indexing controls", () => {
  it("keeps admin, favourites and demo properties out of the sitemap", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => /\/admin|\/favourites|\/property\//.test(u))).toBe(
      false,
    );
    expect(urls.some((u) => u.endsWith("/company-information"))).toBe(true);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("blocks admin and favourites in robots.txt and points to the sitemap", () => {
    const r = robots();
    const rule = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rule.disallow).toEqual(
      expect.arrayContaining(["/admin", "/favourites"]),
    );
    expect(r.sitemap).toMatch(/sitemap\.xml$/);
  });
});
