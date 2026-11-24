// Checks every old WordPress address against a running copy of the site
// (SEO_REDIRECT_PLAN.md §2.2): the right status, the right destination,
// one hop only. Run against the production build, then staging, then the
// real domain within an hour of go-live.
//
//   node scripts/check-legacy-urls.mjs http://localhost:3100
//
// The expected results below are written out separately from the site's
// own map on purpose, so a mistake in one shows up as a failure.
const base = (process.argv[2] ?? "http://localhost:3100").replace(/\/$/, "");

const EXPECT = [
  // [old address, status, destination path or null]
  ["/", 200, null],
  ["/contact-us/", 301, "/contact"],
  ["/contact-us", 301, "/contact"],
  ["/properties/", 301, "/rent"],
  ["/property/ground-floor-one-bedroom-self-contained-flat-camberwell/", 301, "/rent"],
  ["/property/fishponds-road-tooting-sw17/", 301, "/rent"],
  ["/privacy-policy/", 308, "/privacy-policy"],
  ["/terms-of-service/", 301, "/terms"],
  ["/2022/01/25/planning-permission/", 410, null],
  ["/blog/", 410, null],
  ["/agents/", 301, "/about"],
  ["/partner-agencies/", 410, null],
  ["/search-results/", 301, "/buy"],
  ["/search-results/?status=for-rent&type=flat", 301, "/buy"],
  ["/properties-2/", 410, null],
  ["/create-a-listing/", 410, null],
  ["/my-account/", 410, null],
  ["/invoices/", 410, null],
  ["/profile/", 410, null],
  ["/compare/", 410, null],
  ["/favourites/", 308, "/favourites"],
  ["/insight/", 410, null],
  ["/author/admin-timesestates/", 410, null],
  ["/author/timesestates/", 410, null],
  ["/property_type/flat/", 410, null],
  ["/property_status/for-rent/", 410, null],
  ["/property_area/tooting/", 410, null],
  ["/property_city/london/", 410, null],
  ["/category/uncategorized/", 410, null],
  ["/tag/london/", 410, null],
  ["/wp-sitemap.xml", 301, "/sitemap.xml"],
  ["/wp-sitemap-posts-property-1.xml", 301, "/sitemap.xml"],
  ["/wp-admin/", 410, null],
  ["/wp-login.php", 410, null],
  ["/wp-content/uploads/2022/01/photo.jpg", 410, null],
  ["/wp-json/wp/v2/users", 410, null],
  ["/xmlrpc.php", 410, null],
  // New pages must still work normally.
  ["/contact", 200, null],
  ["/rent", 200, null],
  ["/sitemap.xml", 200, null],
];

let failures = 0;
for (const [path, status, dest] of EXPECT) {
  const res = await fetch(base + path, { redirect: "manual" });
  const loc = res.headers.get("location");
  const locPath = loc ? new URL(loc, base).pathname + new URL(loc, base).search : null;
  let ok = res.status === status && (dest === null ? !loc : locPath === dest);
  let note = "";
  // One hop only: the destination itself must answer 200.
  if (ok && dest) {
    const next = await fetch(base + dest, { redirect: "manual" });
    if (next.status !== 200) {
      ok = false;
      note = ` (destination answered ${next.status}: a chain)`;
    }
  }
  if (!ok) failures++;
  console.log(`${ok ? "ok  " : "FAIL"} ${res.status} ${path}${loc ? ` -> ${locPath}` : ""}${ok ? "" : ` (expected ${status}${dest ? ` -> ${dest}` : ""})`}${note}`);
}
console.log(`\n${EXPECT.length - failures}/${EXPECT.length} passed.`);
process.exitCode = failures ? 1 : 0;
