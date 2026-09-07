import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * Every genuinely public, indexable page on the site. Deliberately
 * excludes: `/admin/*` (staff-only, also disallowed in robots.ts and
 * noindexed per-page), `/favourites` (a personal, visitor-specific list
 * with no content of its own to index), and `/property/[id]` (today,
 * every property is fabricated demonstration data — see /DATA_MODEL.md —
 * so none of them should be indexed as a real listing; once a real
 * property exists, its detail page should be added here explicitly, not
 * generated in bulk from demo data).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL;
  const now = new Date();

  const routes = [
    "/",
    "/about",
    "/contact",
    "/sell",
    "/let",
    "/buy",
    "/rent",
    "/commercial",
    "/commercial/for-sale",
    "/commercial/to-let",
    "/property-management",
    "/report-a-repair",
    "/callback",
    "/register",
    "/property-alerts",
    "/residential",
    "/privacy-policy",
    "/cookie-policy",
    "/terms",
    "/complaints",
    "/fees",
    "/accessibility",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}
