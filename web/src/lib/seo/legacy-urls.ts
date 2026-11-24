/**
 * Addresses from the old WordPress website (www.timesestates.co.uk),
 * row by row from SEO_REDIRECT_PLAN.md §2 — owner approval 2026-11-24
 * ("Yes, build redirects").
 *
 *  - LEGACY_REDIRECTS: 301 (permanent) to the nearest new page, so old
 *    Google results and bookmarks keep working.
 *  - isGoneLegacyPath(): 410 ("gone for good") for pages with nothing
 *    worth keeping, so search engines drop them quickly.
 *  - legacyResponseFor(): what src/proxy.ts answers for any address,
 *    with or without a trailing slash, always in one step.
 *
 * Owner decisions recorded in DECISIONS.md (2026-11-24):
 *  - the two 2022 listings (Q6) → 301 to /rent (easy to change to 410);
 *  - /blog → 410 until /insights has a real article (plan row 9);
 *  - no /property_area exceptions: no area guide is approved yet.
 */
export const LEGACY_REDIRECTS: ReadonlyArray<{ from: string; to: string; row: number }> = [
  { from: "/contact-us", to: "/contact", row: 2 },
  { from: "/properties", to: "/rent", row: 3 },
  { from: "/property/ground-floor-one-bedroom-self-contained-flat-camberwell", to: "/rent", row: 4 },
  { from: "/property/fishponds-road-tooting-sw17", to: "/rent", row: 5 },
  { from: "/terms-of-service", to: "/terms", row: 7 },
  { from: "/agents", to: "/about", row: 10 },
  { from: "/search-results", to: "/buy", row: 12 },
];

/** Row 24: the old WordPress sitemaps point search engines at the new one. */
const OLD_SITEMAP = /^\/wp-sitemap[^/]*\.xml$/;

const GONE_EXACT = new Set([
  "/blog", // row 9 (until /insights has a real article)
  "/partner-agencies", // 11
  "/properties-2", // 13
  "/create-a-listing", // 14
  "/my-account", // 15
  "/invoices", // 16
  "/profile", // 17
  "/compare", // 18
  "/insight", // 20
  "/wp-login.php",
  "/xmlrpc.php",
]);

const GONE_PREFIXES = [
  "/author/", // 21
  // 22: WordPress taxonomy archives
  "/property_type/",
  "/property_status/",
  "/property_feature/",
  "/property_label/",
  "/property_country/",
  "/property_city/",
  "/property_area/",
  "/category/",
  "/tag/",
  // WordPress system paths bots keep probing
  "/wp-admin",
  "/wp-content/",
  "/wp-includes/",
  "/wp-json",
];

/** Row 8 and any other dated post, e.g. /2022/01/25/planning-permission/. */
const DATED_POST = /^\/20\d{2}\/\d{2}\//;

export function isGoneLegacyPath(pathname: string): boolean {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  // An old page and anything beneath it, e.g. /blog/page/2/.
  for (const g of GONE_EXACT) if (p === g || p.startsWith(`${g}/`)) return true;
  if (DATED_POST.test(`${p}/`)) return true;
  return GONE_PREFIXES.some((prefix) => `${p}/`.startsWith(prefix) || p === prefix.replace(/\/$/, ""));
}

export type LegacyResponse =
  | { kind: "redirect"; status: 301 | 308; location: string }
  | { kind: "gone" }
  | null;

/**
 * One answer per address. Old pages drop their query string (WordPress
 * search parameters mean nothing here); any other address that ends in
 * "/" gets the usual permanent redirect to the version without, keeping
 * its query.
 */
export function legacyResponseFor(pathname: string, search = ""): LegacyResponse {
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const mapped = LEGACY_REDIRECTS.find((r) => r.from === p);
  if (mapped) return { kind: "redirect", status: 301, location: mapped.to };
  if (OLD_SITEMAP.test(p)) return { kind: "redirect", status: 301, location: "/sitemap.xml" };
  if (isGoneLegacyPath(p)) return { kind: "gone" };
  if (p !== pathname) return { kind: "redirect", status: 308, location: p + search };
  return null;
}
