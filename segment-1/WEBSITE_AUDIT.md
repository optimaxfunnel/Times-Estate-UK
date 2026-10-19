# WEBSITE_AUDIT.md — Times Estate Ltd (Segment 1, 2026-10-19)

Scope: (1) the **repository** `C:\Users\moves\Desktop\Times Estate Ltd`
(git remote `https://github.com/mmmalik1954/Times-Estate-Ltd.git`),
inspected by copying every tracked file into an isolated container; (2)
the **local build** produced from that copy (`npm ci`, `next build`,
`next start`), crawled at 1440 px and 390 px; (3) the **live site**
`https://www.timesestates.co.uk`, inspected page by page through
server-side fetches (browser-level crawling of the live site was
blocked by this environment's network policy — see §6 for what that
means). Nothing in production, in the repository, or in DNS was
changed.

## 1. Repository and stack

| Item | Finding |
|---|---|
| Framework | Next.js **16.3.4** (App Router, Turbopack), React 19.2.8, TypeScript 5.9.3 (strict) |
| Package manager | npm (lockfile v3, 350 packages installed by `npm ci`) |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss`; design tokens in `web/src/app/globals.css` (`--color-ink #141414`, `--color-accent #A8551A`, `--color-accent-vivid #D9772E`, warning/danger/success tokens); fonts Inter (body) and Merriweather (headings) |
| Validation / tests | Zod 4.5.4; Vitest 5.0.0 + Testing Library, 13 test files, **69 tests** |
| Routes | 33 compiled routes: 27 public pages, 6 admin pages, `robots.txt`, `sitemap.xml`, two icon routes (full list in `EXISTING_URL_REGISTER.md` §B) |
| Components | 46 components (`layout/`, `home/`, `forms/`, `property/`, `ui/`, `admin/`, `ai/`, `seo/`, `social/`) |
| Data / content source | **No database and no CMS.** Properties: `web/src/data/demo-properties.ts` (9 fabricated records, flagged `isDemo`). Leads, audit log and property edits live in in-memory arrays behind provider interfaces (`lib/property/provider.ts`, `lib/leads/provider.ts`) and are lost on restart |
| Forms | One server-action pipeline (`lib/leads/actions.ts`): honeypot → per-category rate limit → sanitise → Zod validation → in-memory lead → **notification logged, never sent** (no email provider). Repair form adds a size/type-checked file upload held in memory |
| Auth | `lib/auth/session.ts`: a plain cookie `dev_mock_role` selects one of five roles; no password, no signing. Labelled development-only in code |
| AI assistant | `lib/ai/demo-provider.ts`: rule-based, no external model, refusal rules for regulated advice |
| Integrations | None. `.env.example` lists 20 placeholder variables; no key or URL is set anywhere |
| Hosting / deployment | None configured. No CI workflow, no Dockerfile, no `vercel.json`; `DEPLOYMENT.md` is a plan only |
| Security headers | `next.config.ts`: CSP `default-src 'self'` (+ `unsafe-inline` for scripts/styles, `unsafe-eval` in dev only), `X-Frame-Options DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS preload |
| Git | 20 commits on `main`, HEAD `c00eee8` (2026-09-11 "Second rebrand…"); `origin/main` at the same commit — **nothing unpushed**; working tree matches the index for every tracked `web/` and root file compared (brand build scripts not compared). `.claude/launch.json` (dev-server config) is git-ignored. Secrets: none found in tracked files |
| Documentation | 42 project-control Markdown files at the root (Day 1–7 and Phases 1–7); `README.md` maps them |

## 2. Checks run (exact results)

| Check | Command | Result |
|---|---|---|
| Install | `npm ci` (Node 22.22.0, npm 10.9.4) | OK, 350 packages |
| Type check (cold) | `npm run typecheck` (`tsc --noEmit`) | **1 error** — `src/app/layout.tsx(40,50): TS2304 Cannot find name 'LayoutProps'` because `next-env.d.ts`/generated types do not exist before a build (the file is git-ignored). **Passes (0 errors)** after `next build` |
| Lint | `npm run lint` | Pass, 0 problems |
| Format | `npm run format` | Pass |
| Unit tests | `npm run test` | **69 passed / 69**, 13 files, 5.8 s |
| Dependency audit | `npm audit` | **9 vulnerabilities: 1 critical, 8 high** (details §4) |
| Production audit | `npm audit --omit=dev` | next (critical), sharp (high), source-map-js (high) remain |
| Outdated | `npm outdated` | next 16.3.4 → 16.4.2; react 19.2.8 → 19.3.1; zod 4.5.4 → 4.6.7; others minor |
| Build | `next build` | **Pass**, compiled 6.7 s, 33 routes, 0 errors/warnings |
| Serve + crawl | `next start`, Playwright, 32 routes × 2 viewports | All 200 (404 for the deliberate miss); 0 broken internal links of 43; first-load 520–1,038 ms server-side |
| Form hang reproduction | Playwright real click on `/let` ×2, `/report-a-repair` ×1, viewing form on a demo property ×1 | **Not reproduced**: two leads created (`lead-1-mvek8ypj`, `lead-2-mvek9abr`), server answered probes in 2–5 ms, process CPU time stayed at 0:06 after all submissions (details in `QA_REPORT.md` §3) |
| Code search | `next/og`, `ImageResponse`, `next/image`, `use cache`, `draftMode` | **None used** — relevant to the Next.js advisories in §4 |

## 3. What works (and should be preserved)

- A clean, small, typed codebase with a sensible provider abstraction
  for properties and leads, so a database or CRM can be substituted
  without rewriting pages.
- Honest content discipline: every unverified fact carries a visible
  badge; demo properties are labelled on the card, on the page, and in
  metadata (`noindex`); no invented statistics, testimonials or team.
- A complete lettings/sales journey skeleton: search with filters, cards,
  detail pages, favourites, alerts, valuation/appraisal, viewing,
  callback, registration, repair reporting with emergency guidance.
- Accessibility basics: skip link, landmarks, labelled controls, no
  images without `alt`, reduced-motion handling and a persistent pause
  on the slideshow, 24 px targets (Phase 6 fixes still present).
- SEO basics: per-page titles/descriptions, canonical on 22 of 27 public
  pages, sitemap/robots, `RealEstateAgent` JSON-LD with `legalName`.
- Security posture for a static-ish site: strict CSP, no third-party
  scripts, honeypot + rate limiting on every form, sanitisation.

## 4. What is broken, risky or incomplete

**Critical**
1. **Next.js 16.3.4 carries a critical advisory set** (GHSA-vcvr-r3jv-pc5j RCE in `next/og` ImageResponse; cache poisoning of SSG/ISR in self-hosted apps GHSA-4jqv-mc3x-m676 and GHSA-mcj8-r9mp-w47p; SSRF in image optimisation GHSA-cjq9-62q9-8jv4; draft-mode and metadata-route disclosures). The codebase does not use `next/og`, `next/image`, `use cache` or draft mode, which removes the RCE and SSRF paths, but the cache-poisoning advisories apply to any self-hosted deployment. **Fix: upgrade to ≥ 16.3.8 (or 16.4.2) before any deployment** — a one-line, approval-required change.
2. **Admin authentication is a mock** (any visitor can set the `dev_mock_role` cookie to `admin`). Must not be deployed. Unchanged since Day 4.
3. **No persistence**: every lead and every admin edit disappears on restart. Unchanged since Day 4; now a hosting-architecture constraint (`DEPLOYMENT.md` §1).

**Major**
4. The **documented server-hang defect** (TEST_REPORT §5, QA_REPORT Phase 6) **did not reproduce** in four real-click submissions on a Linux container under Node 22. All prior reproductions were on the owner's Windows machine under Node 24. This points towards an environment-specific cause (Windows file-watcher, antivirus, or the Node 24/Turbopack combination) rather than application code, and justifies a profiler run on the owner's machine before any stack change — but it is **not closed**.
5. **The live logo in the repository is a generic placeholder**, not the supplied artwork (see `BRAND_SOURCE_AUDIT.md` §1). Header, footer and favicon all need replacing in the brand segment.
6. **Admin pages overflow horizontally at 390 px** (`/admin`, `/admin/properties`) and **two admin pages have no H1** (`/admin/audit`, `/admin/leads`).
7. **Five public routes lack a canonical URL and reuse the site-default description** (`/residential`, `/report-a-repair`, `/callback`, `/register`, `/property-alerts`); `/favourites` has no page title.
8. **No `og:image` anywhere**; shared links render without a preview.
9. `sharp` < 0.35.5 and `source-map-js` advisories in production dependencies; `brace-expansion`/`braces` in dev tooling (`npm audit fix` resolves three without breaking changes; `braces` needs `eslint-config-next` 16.4.x).
10. **No end-to-end test suite**; the only automated coverage is unit-level.

**Minor**
11. Cold `typecheck` fails until a build has generated types — a CI pitfall, not a code defect.
12. `/cookie-policy` table overflows at 390 px; raw `/sitemap.xml` overflow is cosmetic.
13. `public/` still contains the create-next-app sample SVGs (`next.svg`, `vercel.svg`, `globe.svg`, `file.svg`, `window.svg`).
14. Historical "Times Estates" logo SVGs remain in `public/brand/` (kept deliberately under Rule 3; harmless but confusing).
15. Node version drift: owner's PC runs Node 24, container ran Node 22; `package.json` sets no `engines` field.

## 5. Live site — page-by-page findings

Platform: **WordPress** with the commercial **Houzez** real-estate theme
(service cards still link to `demo18.houzez.co`), **Slider Revolution
6.5.9** (meta generator), built by "A Designer Website Agency" (footer
credit). HTTPS on all asset URLs. Default WP sitemap exposed, including
`wp-sitemap-users-1.xml` with author slugs `admin-timesestates` and
`timesestates`.

| Page | Desktop/mobile | Findings |
|---|---|---|
| Home | fetched (no browser render possible) | "Take a sneak peak at our brand new website. It is still undergoing a makeover so please bare with us." banner (two spelling errors); Guaranteed Rent, Fully Vetted Tenants, "Risk Free" claims; 3 named testimonials; 2 "hand picked" listings from 2022; "Browse Areas: Camberwell, Tooting"; latest post dated 25 Jan 2022 |
| Properties | fetched | 2 listings, both "New Listing", both "5 years ago"; full Houzez filter set including labels "Sold", "Let agreed" that no listing uses |
| Listing TE1915 (Camberwell) | fetched | Updated 29 Jan 2022; EPC data present; council tax, deposit, tenure, availability absent; Yelp API placeholder; enquiry mailto `someone@example.com`; viewing slots labelled "10:15 pm"; typos "dinning", "tennant" |
| Listing Fishponds Road | fetched | As above plus 3 floor plans and Matterport tour; bed/bath counts conflict with "3 bedroom property" |
| Contact us | fetched | Empty `tel:` link; "Wether" typo; GDPR checkbox without a privacy link; no company number/redress/CMP |
| Agents | fetched | One agent, "CEO & Founder", personal email published |
| Privacy policy | fetched | Wrong entity name; EEA statement conflicts with GA use; cookie link `#` |
| Terms of service | fetched | Names sister company Builders Terminal; no complaints/redress route; T&C links elsewhere point to `#` |
| Create a listing / My account / Invoices / Profile / Compare | fetched or listed | Open public registration and front-end listing submission — spam, abuse and reputational risk; invoices feature exposed |
| Blog post | fetched | Placeholder "sdfsdf", duplicated sections |
| Partner agencies / Insight / Properties-2 | listed | Theme template pages; duplicate content |

Security notes (live): Slider Revolution 6.5.9 dates from 2021–22 and
the 6.5.x series has several published advisories — the exact exposure
depends on patch level and could not be tested from here; open
registration on a Houzez site is a known spam vector; WordPress core and
plugin versions are not visible without authenticated access. **Owner
action:** ask the hosting agency for the WordPress, theme and plugin
versions and the last update date, or plan the retirement of the site at
migration.

SEO notes (live): titles exist; the home title is "Times Estates –
Estate Agent based in the heart of Tooting that offers guaranteed
rent"; 14 of 17 pages are theme template pages with no unique value;
only two listings and one post have ever been published; `lastmod` dates
show no content change since January 2022 except the legal pages
(Nov–Dec 2024). The domain's search equity is small but real (local
"Tooting estate agent" intent), which the redirect plan in
`EXISTING_URL_REGISTER.md` §C protects.

## 6. Limits of this audit

- Live-site HTTP headers, TLS configuration, Core Web Vitals, Lighthouse
  and axe scans, screenshot comparison and the exact script inventory
  could not be captured from this environment (outbound browser traffic
  to the domain was refused by the proxy). These are listed as open
  checks in `QA_REPORT.md` and can be run from the owner's machine via
  Remote Control or by the hosting agency.
- No form on the live site was submitted; no account was created.
- The local build was tested in Chromium only.

## 7. Recommended architecture options and indicative costs

The brief asks for options and costs; these are estimates for the
owner's decision, not quotations, and every paid item needs Rule 4
approval.

| Option | What it is | Fit for Times Estate Ltd | Indicative monthly cost (ex VAT) | Risk |
|---|---|---|---|---|
| **A. Keep the current Next.js build, add persistence and real auth, host on a managed platform** (Vercel/Netlify Pro or a UK VPS with a process manager) + managed Postgres (Neon/Supabase) + transactional email (Resend/Postmark) + Auth.js | Continues the tested codebase; properties entered through the built admin | Strong — preserves 7 days of work and the honesty rules | £0–£20 hosting at launch traffic; £0–£20 database; £0–£15 email; domain/DNS existing. Call it **£10–£60/month** | Owner must enter listings manually unless a feed is added later |
| **B. Option A + property feed from a CRM/portal** (e.g. Reapit, Alto, Jupix, Street, or a Rightmove/Zoopla data feed if the agency lists there) | Listings sync automatically | Best long-term for a growing portfolio | CRM £40–£150+/month depending on vendor; feed integration is development time | Depends on Q6; integration work is the largest unknown |
| **C. Headless CMS for marketing content** (Sanity/Payload/Strapi free tiers) on top of A or B | Owner edits pages, area guides and insights without code | Useful once area guides and articles are confirmed | £0–£15/month | Adds a system to learn |
| **D. Stay on WordPress/Houzez, repair and rebrand** | Lowest change | Poor fit for the quality target; template feel, plugin security debt, duplicate pages | Hosting ~£10–£30 + agency fees | Does not reach the commission standard |

**Recommendation: Option A now, designed so that B (feed) and C (CMS)
plug into the existing provider interfaces later.** One-off development
effort is the main cost; recurring cost at launch is small.

## 8. Reference-site patterns worth borrowing (not copying)

Observed on Zoopla, Rightmove and Foxtons in earlier research
(`MARKET_RESEARCH.md`) and re-checked against the supplied mock-up:
search-first homepage with Buy/Rent/Commercial tabs; price and bedroom
filters with sensible steps; cards showing price, type, beds/baths,
area and a status badge; map/list toggle; area guides with transport,
schools and price context; a landlord journey that states fees and
management levels plainly; a valuation journey that books a visit
rather than promising an instant figure (the local build already takes
the honest version of this). No brand element, wording, icon, layout
file or code from those sites is to be reused.
