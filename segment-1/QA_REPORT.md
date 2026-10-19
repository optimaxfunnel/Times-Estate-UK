# QA_REPORT.md — Times Estate Ltd (Segment 1, 2026-10-19)

Record of every check run during Segment 1 and its exact result. This
segment made **no code changes**, so nothing here is a regression test;
it is a baseline for Segment 2. Environment: isolated Linux container,
Node 22.22.0, npm 10.9.4, Playwright 1.56.1 with Chromium 1194, Python 3
with Pillow. The repository was copied file-by-file from the owner's PC
(291 tracked paths; every `web/` and root file compared against the git
index by hash — all identical).

## 1. Repository checks

| # | Check | Command / method | Result |
|---|---|---|---|
| 1 | Git state | read `.git/HEAD`, `refs`, `logs/HEAD`, `COMMIT_EDITMSG`, `config` | `main` at `c00eee826b09835fb65a6af7714df1bbd38a6c29`; `origin/main` identical; 20 commits; remote `github.com/mmmalik1954/Times-Estate-Ltd.git` |
| 2 | Working tree vs index | `git hash-object` on every staged `web/` and root file | 0 modified |
| 3 | Secrets scan | search tracked files for key-shaped strings, `.env` presence | `.env` absent; only `.env.example` with empty placeholders |
| 4 | Install | `npm ci --no-audit --no-fund` | OK, 350 packages, no postinstall warnings |
| 5 | Type check, cold | `npm run typecheck` | **FAIL** — 1 error, `TS2304 Cannot find name 'LayoutProps'` in `src/app/layout.tsx:40` (generated `next-env.d.ts` missing before first build) |
| 6 | Type check, after build | `npx tsc --noEmit` | **PASS**, 0 errors |
| 7 | Lint | `npm run lint` | PASS, 0 errors, 0 warnings |
| 8 | Format | `npm run format` | PASS ("All matched files use Prettier code style!") |
| 9 | Unit tests | `npm run test` | **PASS 69/69**, 13 files, 5.83 s |
| 10 | Build | `next build` | PASS — compiled 6.7 s, TypeScript 4.3 s, 33 routes, 0 warnings |
| 11 | Audit, all | `npm audit` | **9 vulnerabilities (8 high, 1 critical)**: next 16.0.0–16.3.7 (critical: GHSA-vcvr-r3jv-pc5j, GHSA-3w37-wq28-93x7, GHSA-4jqv-mc3x-m676, GHSA-39w2-rjm5-chcv, GHSA-f87g-xv8r-7p7x, GHSA-mcj8-r9mp-w47p, GHSA-cjq9-62q9-8jv4); sharp <0.35.5 (high, GHSA-wq5f-xc86-pv6w); source-map-js 1.0.0–1.2.1 (high); brace-expansion (high, ×2 paths); braces via eslint-config-next (high) |
| 12 | Audit, production only | `npm audit --omit=dev` | next (critical), sharp (high), source-map-js (high) |
| 13 | Feature use vs advisories | grep `next/og`, `ImageResponse`, `next/image`, `use cache`, `draftMode` in `web/src` | none found |
| 14 | Outdated | `npm outdated` | next → 16.4.2, react/react-dom → 19.3.1, zod → 4.6.7, eslint → 10.13, typescript → 7.0.2 (major), vitest → 5.0.5 |

## 2. Local production build — crawl (Playwright, Chromium)

Server: `next start -p 3000`. 32 routes requested at 1440×900 and
390×844; full-page screenshots saved (64 files) to
`/mnt/project-files/segment-1/screenshots/`.

| # | Check | Result |
|---|---|---|
| 15 | HTTP status | 31 × 200, `/does-not-exist` → 404 (custom page) |
| 16 | Server response time (navigation to `networkidle`) | 517–1,038 ms desktop (first hit 1,038 ms on `/`), 549–713 ms mobile |
| 17 | Internal links | 47 distinct hrefs; 43 internal all 200; 4 non-HTTP (`#main-content`, `tel:` ×2, `mailto:` ×1); **0 broken** |
| 18 | `<title>` present and unique | 30/32 pages titled; `/favourites` falls back to the site default; `/robots.txt`/`/sitemap.xml` n/a |
| 19 | Exactly one H1 | 28 pages yes; `/admin/audit` and `/admin/leads` **no H1** |
| 20 | Canonical link | present on 22 public pages; **absent** on `/residential`, `/report-a-repair`, `/callback`, `/register`, `/property-alerts`, `/favourites` |
| 21 | Meta description | unique on 22; site default reused on the five pages above and `/favourites` |
| 22 | `og:image` | absent on every page |
| 23 | `meta robots` | `noindex, nofollow` on all 6 admin pages; `noindex, follow` on demo property pages; `noindex` on 404 |
| 24 | Images without `alt` | 0 |
| 25 | Form controls without a label | 0 |
| 26 | Horizontal overflow at 390 px | **3 routes**: `/admin`, `/admin/properties`, `/cookie-policy` (plus raw `/sitemap.xml`) |
| 27 | Console errors | 0 on all pages except the 404 probe (1: the 404 fetch) |
| 28 | Security headers served | CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS present on `/about` (spot check) |

## 3. Form submission and the documented server-hang defect

Previous reports (`TEST_REPORT.md` §5, Day 7; `QA_REPORT.md` Phase 6)
recorded a CPU-bound hang after certain submissions on the owner's PC
(Windows, Node 24, Turbopack dev and `next start`).

| # | Submission | Method | Result |
|---|---|---|---|
| 29 | `/let` rental appraisal | Playwright, fields filled, real `click()` on submit | Lead `lead-1-mvek8ypj` logged by the server ("NOT SENT (no email provider approved)"); 3 probes to `/about` in 2–3 ms each; process CPU time unchanged |
| 30 | `/let` again | same | Lead `lead-2-mvek9abr` logged; probe 5 ms |
| 31 | Viewing request on `/property/demo-res-let-1` | same script | No lead logged (the generic filler did not satisfy the form's date/time validation — the page re-rendered with field errors); server responsive, probe 2 ms |
| 32 | `/report-a-repair` | same | No lead logged (validation, file field skipped); server responsive, probe 3 ms |
| 33 | Process health after all four | `ps` CPU time | 0:06 total; no growth |

**Conclusion:** not reproduced in this environment. The defect remains
open and must be re-tested on the owner's machine with a CPU profile
attached (`node --cpu-prof`) before it is attributed to the framework
version. The upgrade recommended in `WEBSITE_AUDIT.md` §4 should be
tested against it.

## 4. Brand file checks

| # | Check | Result |
|---|---|---|
| 34 | File integrity | Both uploads byte-identical to the project copies (SHA-256 `14e653e3…`, `560944f8…`) |
| 35 | Dimensions / metadata | 1206×877 and 1290×792, JPEG, RGB, no EXIF, no ICC, no DPI |
| 36 | Colour sampling | 19 regions sampled; results in `BRAND_SOURCE_AUDIT.md` §4 |
| 37 | Contrast | 13 source colours × 3 backgrounds computed; 4 companions derived (§5 there) |
| 38 | Foreign artefact | iOS share icon confirmed at bottom-right of the logo file |

## 5. Live site checks (server-side fetch only)

| # | Check | Result |
|---|---|---|
| 39 | Home, contact, properties, 2 listings, agents, privacy, terms, create-a-listing, blog post | All fetched and summarised (`EXISTING_URL_REGISTER.md`, `CONTENT_REGISTER.md`) |
| 40 | `robots.txt` | Disallow `/wp-admin/`, sitemap at `/wp-sitemap.xml` |
| 41 | Sitemaps | 15 sub-sitemaps; 17 pages, 1 post, 2 properties, 2 users, 9 taxonomies |
| 42 | `sitemap_index.xml` | fetch error (does not exist — default WP sitemap in use) |
| 43 | Direct HTTP (curl/Playwright) to the domain | **Blocked by network policy (403 CONNECT)** — headers, TLS, Lighthouse, screenshots not captured |
| 44 | Bare domain `timesestates.co.uk` | DNS not resolvable from the container (policy), untested |

## 6. External register checks

| # | Check | Result |
|---|---|---|
| 45 | Companies House 09597081 | TIMES ESTATE LTD, Active, incorporated 19 May 2015, SIC 68320, registered office 145 Upper Tooting Road SW17 7TJ, accounts to 31 May 2025 filed, confirmation statement 15 Apr 2026 filed; directors M. M. Malik and A. Naheed (both appointed 15 Apr 2025) |
| 46 | Property Redress member search for PRS030616 | No public search found on propertyredress.co.uk (the old theprs.co.uk address redirects there) — **unverified** |
| 47 | Client Money Protect member search for CMP013294 | Members page offers no search — **unverified** |
| 48 | Legal commencement dates | Renters' Rights Act 1 May 2026 provisions (Shelter Legal); DUAA staged commencement (Kennedys); NTSELAT material-information guidance withdrawn, DMCC Act in force 6 Apr 2025 (Propertymark); CMP reg. 4 website-publication duty (legislation.gov.uk) |

## 7. Not run this segment (and why)

Lighthouse/axe (not installed; Phase 6 figures are historical),
cross-browser (Chromium only), 200 % zoom, live-site performance and
header checks (network policy), accessibility of the live site, load
testing, any destructive or write operation against production.

## 8. Open defects carried into Segment 2

See `WEBSITE_AUDIT.md` §4 items 1–15. Nothing was fixed in Segment 1 by
design.
