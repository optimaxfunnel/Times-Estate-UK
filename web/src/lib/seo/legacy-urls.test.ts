// Old WordPress addresses (SEO_REDIRECT_PLAN.md §2; owner approval
// 2026-11-24): 301s to live pages, 410s for the rest, and never a clash
// with a page the new site actually has.
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { isGoneLegacyPath, LEGACY_REDIRECTS, legacyResponseFor } from "@/lib/seo/legacy-urls";

const appDir = path.join(__dirname, "..", "..", "app");
const pageExists = (route: string) =>
  fs.existsSync(path.join(appDir, ...route.split("/").filter(Boolean), "page.tsx"));

describe("legacy URL map", () => {
  it("every redirect lands on a page that exists, in one hop", () => {
    for (const { to } of LEGACY_REDIRECTS) {
      expect(pageExists(to), to).toBe(true);
      expect(LEGACY_REDIRECTS.some((r) => r.from === to)).toBe(false);
    }
  });

  it("answers each old address with one 301, with or without the slash, dropping old query strings", () => {
    for (const { from, to } of LEGACY_REDIRECTS) {
      for (const p of [from, `${from}/`]) {
        expect(legacyResponseFor(p, "?status=for-rent"), p).toEqual({ kind: "redirect", status: 301, location: to });
      }
    }
    expect(legacyResponseFor("/wp-sitemap.xml")).toEqual({ kind: "redirect", status: 301, location: "/sitemap.xml" });
    expect(legacyResponseFor("/wp-sitemap-posts-property-1.xml")).toEqual({ kind: "redirect", status: 301, location: "/sitemap.xml" });
    expect(legacyResponseFor("/blog/")).toEqual({ kind: "gone" });
  });

  it("leaves new pages alone, and tidies a trailing slash in one step keeping the query", () => {
    expect(legacyResponseFor("/")).toBeNull();
    expect(legacyResponseFor("/contact")).toBeNull();
    expect(legacyResponseFor("/rent", "?bedrooms=2")).toBeNull();
    expect(legacyResponseFor("/rent/", "?bedrooms=2")).toEqual({ kind: "redirect", status: 308, location: "/rent?bedrooms=2" });
  });

  it("marks the old dead-end pages as gone", () => {
    for (const p of [
      "/blog/",
      "/blog/page/2/",
      "/partner-agencies/",
      "/properties-2/",
      "/create-a-listing/",
      "/my-account/",
      "/invoices/",
      "/profile/",
      "/compare/",
      "/insight/",
      "/author/admin-timesestates/",
      "/property_type/flat/",
      "/property_area/tooting/",
      "/category/news/",
      "/tag/london/",
      "/2022/01/25/planning-permission/",
      "/wp-admin/",
      "/wp-login.php",
      "/wp-content/uploads/2022/01/photo.jpg",
      "/wp-json/wp/v2/users",
      "/xmlrpc.php",
    ]) {
      expect(isGoneLegacyPath(p), p).toBe(true);
    }
  });

  it("never marks a page of the new site as gone", () => {
    const routes: string[] = [];
    const walk = (dir: string, route: string) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.isDirectory() && !e.name.startsWith("(") && !e.name.startsWith("[") && !e.name.startsWith("_")) {
          walk(path.join(dir, e.name), `${route}/${e.name}`);
        } else if (e.name === "page.tsx") routes.push(route || "/");
      }
    };
    walk(appDir, "");
    expect(routes.length).toBeGreaterThan(20);
    for (const r of routes) expect(isGoneLegacyPath(r), r).toBe(false);
    expect(isGoneLegacyPath("/property/demo-res-sale-1")).toBe(false);
  });
});
