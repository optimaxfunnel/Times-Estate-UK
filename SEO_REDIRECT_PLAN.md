# SEO_REDIRECT_PLAN.md — Times Estate Ltd

**Segment 2 deliverable (2026-10-20) — a plan, nothing executed.** No
DNS record, redirect rule, sitemap entry or page has been changed by
this document. It builds on `SEO_PLAN.md` (Day 6, still accurate for
what the code does today) and on `segment-1/EXISTING_URL_REGISTER.md`
(the live WordPress site's 25 indexed URLs). Every target URL below is
in the Segment 2 sitemap (`SITEMAP.md`); anything marked *proposed*
does not exist yet.

The plan has one aim: **keep the small, real search equity the live
domain has** ("Tooting estate agent"-type local intent, per Segment 1)
while never earning new equity with invented content. No area page,
review, statistic or keyword target below exists unless the fact
behind it is Confirmed.

---

## 1. Canonical host — a decision for the owner, with a recommendation

| Option | For | Against |
|---|---|---|
| **`https://www.timesestates.co.uk` (recommended)** | It is what Google has indexed for years (every live URL in the register is `www`); fewest redirect hops for existing links and bookmarks; the owner's business card prints `www.timesestates.co.uk` | — |
| `https://timesestates.co.uk` (bare) | Shorter; was `DEPLOYMENT.md` §5's preference before the live site was audited | Every indexed URL would take one extra hop (`www` → bare → new path) until re-crawled |

Whichever is chosen, the other host 301s to it at the host/DNS level
(one rule, not application code), and `NEXT_PUBLIC_SITE_URL` is set to
the canonical host so every canonical tag, sitemap entry and JSON-LD
`url` agrees. **Recorded as a Gate 2 point for the owner only if they
object to `www`; otherwise `www` is assumed from Segment 3 onward.**

---

## 2. Redirect map — every live URL, decided row by row

Source statuses from `segment-1/EXISTING_URL_REGISTER.md` §A. "301" =
permanent redirect to the successor; "410" = gone (tells search engines
to drop the URL, faster than a 404). WordPress URLs end in a trailing
slash; the rule must match both `…/path/` and `…/path`.

| # | Live URL | Action | Target in the new sitemap | Why |
|---|---|---|---|---|
| 1 | `/` | keep | `/` | Same URL |
| 2 | `/contact-us/` | **301** | `/contact` | Direct successor |
| 3 | `/properties/` | **301** | `/rent` | Both live listings are lettings; `/rent` is the nearest successor. (`/buy` would land a rental searcher on sales) |
| 4 | `/property/ground-floor-one-bedroom-self-contained-flat-camberwell/` | **301 or 410 — owner decides (Q6)** | `/rent` (301) if withdrawn; the new `/property/[id]` if genuinely still available and re-listed with full material information | A 2022 listing must not survive as-is (DMCC Act material-information gaps, "New Listing" label) |
| 5 | `/property/fishponds-road-tooting-sw17/` | **301 or 410 — owner decides (Q6)** | as row 4 | as row 4 |
| 6 | `/privacy-policy/` | **301** | `/privacy-policy` | Successor is the solicitor-reviewed notice |
| 7 | `/terms-of-service/` | **301** | `/terms` | Successor |
| 8 | `/2022/01/25/planning-permission/` | **410** (or 301 to `/insights/[slug]` only if the article is genuinely rewritten with a named author) | — | Placeholder text and duplicated paragraphs; no equity worth keeping |
| 9 | `/blog/` | **301** | `/insights` once at least one real article exists; **410** until then | Never 301 to an empty section |
| 10 | `/agents/` | **301** | `/about` | Team information moves to About (only confirmed, consenting people) |
| 11 | `/partner-agencies/` | **410** | — | Theme template; no partner agencies exist |
| 12 | `/search-results/` | **301** | `/buy` | Nearest search successor (query strings dropped — Houzez parameters have no equivalent) |
| 13 | `/properties-2/` | **410** | — | Duplicate of row 3 |
| 14 | `/create-a-listing/` | **410** | — | Public listing submission is not carried over |
| 15 | `/my-account/` | **410** | — | No visitor accounts (SITEMAP §20) |
| 16 | `/invoices/` | **410** | — | Unused payments feature |
| 17 | `/profile/` | **410** | — | — |
| 18 | `/compare/` | **410** | — | — |
| 19 | `/favourites/` | **301** | `/favourites` | Direct successor (browser-local saved list) |
| 20 | `/insight/` | **410** | — | Theme template page |
| 21 | `/author/admin-timesestates/`, `/author/timesestates/` | **410** | — | Removes the user-enumeration exposure |
| 22 | Taxonomy archives (`/property_type/…`, `/property_status/…`, `/property_feature/…`, `/property_label/…`, `/property_country/…`, `/property_city/…`, `/property_area/…`, `/category/…`, `/tag/…`) | **410** pattern rules | — | Thin archive pages. **Exception:** `/property_area/<area>/` → 301 to `/areas/<area>` *only* for an area that has a real, approved guide at launch; otherwise 410 |
| 23 | `/robots.txt` | replace | `/robots.txt` (Next.js) | — |
| 24 | `/wp-sitemap.xml`, `/wp-sitemap-*.xml` | **301** | `/sitemap.xml` | Keeps Search Console's registered sitemap resolving |
| 25 | `http://timesestates.co.uk`, `http://www.…` | **301** | canonical `https://www.…` | Host-level |
| — | `/wp-admin/`, `/wp-login.php`, `/wp-content/…`, `/wp-json/…`, `/xmlrpc.php` | **410** | — | Not in the register (unindexed) but constantly probed by bots once a WordPress site existed; a 410 is cheaper than serving the 404 page |

**Image URLs** (`/wp-content/uploads/…` for the two listings' photos
and floor plans): 410, unless the owner confirms rights and the images
are re-hosted under the new listing — then 301 to the new image path is
unnecessary (image equity is negligible); just re-use the files.

### 2.1 Where the rules live

- Host-level (DNS/CDN): the `http`→`https` and bare↔`www` rules only.
- Application-level (`web/next.config.ts` `redirects()`): every row
  above, so the map is version-controlled, testable and travels with
  the code to any host. Next.js supports `permanent: true` (308) — use
  `statusCode: 301` explicitly for these, since some older clients and
  SEO tools treat 308 inconsistently. 410s need a tiny route handler
  (Next.js has no built-in "gone"); one handler covering the pattern
  list is enough.
- Trailing slashes: add each rule with and without the slash, or set
  the rule's `source` with an optional `/?` suffix.

### 2.2 Testing before the DNS change

Run the whole map against the production build on the owner's machine
(a script: fetch each source URL, assert status and `Location`), then
again against the staging host, then within an hour of go-live against
the real domain. Record results in `QA_REPORT.md`. Zero redirect
chains longer than one hop; zero loops.

---

## 3. Search intent and page mapping (by audience)

Terms are the ones the business can genuinely answer today. Area terms
are **candidates only** until coverage is Confirmed; the live site's
own area list (Tooting, Mitcham, Streatham, Balham, Colliers Wood,
Wimbledon, Clapham and the search taxonomy's Battersea, Camberwell,
Clapham Junction, Earlsfield, Furzedown, Nine Elms, Putney, Southfields,
Tooting Bec, Tooting Broadway) is the starting list for the owner to
confirm or cut — not a claim of coverage.

| Audience | Intent (searcher's words) | Page | Primary term | Supporting terms | Gate |
|---|---|---|---|---|---|
| Vendors | "house valuation Tooting", "sell my flat SW17", "estate agents Tooting" | `/sell` | estate agent Tooting (candidate) | free valuation, market appraisal, sell your home London | Area term needs Confirmed coverage |
| Landlords | "letting agents Tooting", "let my property", "property management fees London" | `/let`, `/property-management` | letting agent Tooting (candidate) | rental valuation, full management, let only | Fees page must carry real figures before targeting "fees" |
| Buyers | "flats for sale Tooting", "houses for sale SW17" | `/buy`, `/areas/[area]` | property for sale [area] | 2 bed flat for sale, freehold house | Needs real listings — never target with demo data (demo pages stay `noindex`) |
| Tenants | "flats to rent Tooting", "rooms to rent SW17", "letting agents near me" | `/rent`, `/tenants` | property to rent [area] | tenant fees, deposit, how renting works | Renters' Rights Act wording review (COMPLIANCE row 7) |
| Commercial clients | "commercial property to let Tooting", "shop to let SW17", "office to rent South London" | `/commercial`, `/commercial/to-let`, `/commercial/for-sale` | commercial property London | retail unit to let, office to let, commercial lettings agent | Sector coverage still unconfirmed — no sector landing pages until then |
| Investors | "buy to let Tooting", "property investment South London" | `/investors` | buy-to-let London (process only) | property management for investors, yields *(never stated)* | Process content only; no return figures (AI_SAFETY_RULES / Rule 1) |
| Managed clients | "report a repair Times Estates", "Times Estates contact" | `/report-a-repair`, `/contact` | Times Estate Ltd repair | emergency repair, out of hours | Emergency process still Missing |
| Everyone | "Times Estates Tooting", "Times Estate Ltd reviews", "timesestates" | `/`, `/about`, `/how-we-protect-you` | Times Estate Ltd | Times Estates, estate agent Upper Tooting Road | Brand terms: the one area where the site should rank immediately |

**Deliberately not targeted:** "guaranteed rent" (live site's current
title term — pending factual and legal review, COMPLIANCE row 22 and
Q4; if the scheme is confirmed and reviewed, a page and the term come
back together), "best/leading/top estate agent" (unsupportable),
"instant valuation" (the site never gives a figure).

---

## 4. On-page rules (carry forward from `SEO_PLAN.md`, plus Segment 2 additions)

1. One `<h1>` per page, the page's primary term in plain English — not
   a keyword string. Titles follow `<Page> | Times Estate Ltd`.
2. Canonical on **every** public route — fixes the five Segment 1
   found without one (`/residential`, `/report-a-repair`, `/callback`,
   `/register`, `/property-alerts`), and `/favourites` gets a title.
3. Search pages canonicalise to their base path (already done); the
   map view (`?view=map`) is the same page and must not get its own
   canonical.
4. Listing pages: `noindex` while demo; real listings indexable with
   `RealEstateListing` JSON-LD (already conditional on `!isDemo`), a
   fixed rent figure for lettings (Renters' Rights Act), EPC rating
   present, and the material-information fields complete before the
   admin workflow allows "publish".
5. Area guide pages: indexable **only** when the guide carries real,
   sourced content; the template with empty sections never ships.
6. Insights: author line and last-reviewed date on every article.
7. Images: descriptive `alt`; the real photographs' licence recorded in
   `MEDIA_ASSET_REGISTER.md` before upload (COMPLIANCE row 23).
8. `og:image`: a 1200×630 share image built from the emblem on ivory
   with the live-text wordmark — a Segment 3 asset, closing the gap
   every audit since Day 6 has listed.
9. Structured data: keep `RealEstateAgent` minimal until phone/email
   are Confirmed; add `telephone` only then; `sameAs` only for real
   social profiles (already gated).

---

## 5. Sitemap and robots after migration

- `/sitemap.xml` lists every indexable page in `SITEMAP.md` §2; adds
  `/areas/[area]` and `/insights/[slug]` entries only as real content
  is published; adds real listings only (`!isDemo`).
- `/robots.txt`: allow all; disallow `/admin`, `/favourites`; point to
  the sitemap. (Unchanged from today.)
- Submit the new sitemap in Google Search Console and Bing Webmaster
  Tools on launch day; the owner needs to own the Search Console
  property for the domain (part of Q7's "who controls the domain").

---

## 6. Launch-week checklist (SEO only — the full launch list is `LAUNCH_CHECKLIST.md`)

1. Canonical host decided; `NEXT_PUBLIC_SITE_URL` set.
2. Redirect map tested on staging (§2.2) — 0 chains, 0 loops.
3. Every public page has a canonical and a unique description.
4. `og:image` live; shared-link preview checked on one platform.
5. Search Console: new sitemap submitted; old `wp-sitemap.xml` 301s.
6. Day 1, day 7, day 30: crawl-error report reviewed; any live URL
   returning 404 (rather than 301/410) gets a rule added.
7. Rich Results Test and schema validator run against the live domain
   (impossible on localhost — open since Day 6).

---

## 7. What this plan does not do

- No keyword targets for areas, sectors, fees or reviews until the
  underlying facts are Confirmed.
- No link-building, directory submissions or paid search — out of
  scope and each would be a Rule 4 decision.
- No change to the live WordPress site itself; its retirement is a
  launch-day action under the final approval phrase, not before.
