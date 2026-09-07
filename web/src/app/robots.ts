import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * `/admin` is disallowed here as defence-in-depth for search-engine
 * crawlers — it is NOT a security control. The admin area's real
 * protection is (and must remain) server-side role checks; today those
 * sit behind a development-only mock login (see /ADMIN_AND_CMS.md),
 * which is itself a hard blocker to any public deployment regardless of
 * this file. `/favourites` is excluded because it's a visitor-specific
 * list with nothing generic worth indexing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/favourites"],
    },
    sitemap: `${env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
