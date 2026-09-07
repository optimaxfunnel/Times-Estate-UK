# CHANGELOG.md — Times Estate Ltd Website Project

All notable changes to this project are recorded here, most recent first.
This is a project log, not a marketing document — it should stay accurate
and plain.

## 2026-09-07 — Day 3: Technical foundation, design system and core website

**Blocker found and resolved**
- Node.js was not installed on this computer (flagged since Day 1, never
  resolved). With the owner's explicit approval, installed Node.js 24 LTS
  via `winget`.

**Added**
- `TECHNICAL_ARCHITECTURE.md` — the chosen technology stack (Next.js 16,
  React 19, TypeScript strict mode, Tailwind CSS 4, Zod), with current
  versions verified against the npm registry.
- `INTEGRATIONS.md` — a comparison of options for database, CMS, auth,
  search, email, file storage, analytics, hosting and monitoring. Nothing
  connected; every option needs the owner's approval.
- `DESIGN_SYSTEM.md` — the implemented Brand Direction 1 design system:
  colours, typography, components, and accessibility features.
- `TEST_REPORT.md` — every check run today (TypeScript, lint, tests,
  build, audit, secret scan, responsive testing, accessibility, form
  functional testing) with commands and real results.
- `web/` — the scaffolded Next.js application: eleven core public pages
  (Home, About, Residential, Commercial, Sell, Let, Property Management,
  Contact, and three legal placeholders), a shared design system, and a
  server-validated enquiry form used across Sell/Let/Commercial/Property
  Management/Contact.

**Changed**
- `CONTENT_REQUIRED.md` — corrected three items (legal name, Companies
  House number, registered office) that were still marked "Missing" despite
  being Confirmed since Day 1; updated regulatory items to "Requires
  verification" to match `CONTENT_VERIFICATION_REGISTER.md`.
- `PROJECT_PLAN.md` — Day 3 marked complete; the long-standing "no
  command-line access" technical note removed now that it no longer
  applies.

**Findings (defects found and fixed today)**
- Tablet-width (768px) navigation overlapped the logo and CTA button —
  the mobile/desktop switch-over point was moved from 768px to 1024px.
- The open mobile menu didn't fully cover the page beneath it at its
  bottom edge — fixed to cover the full remaining screen height.
- One transitive dependency (`unrs-resolver`) has an unreviewed
  postinstall script — flagged, not approved or run.

**Not done today (by design — out of scope for Day 3)**
- No property database, CMS, email/CRM integration, authentication, or
  hosting connected.
- No production deployment.
- No automated accessibility scan (axe-core) — planned for Day 6.

**Open items carried to Day 4**
- Owner to choose an email/notification provider (blocks every enquiry
  journey from actually reaching staff — see `INTEGRATIONS.md`).
- Owner to confirm whether a property feed/CRM exists for Buy/Rent search.
- All Missing items from earlier days (contact details, fees, brand
  assets, geographic coverage) remain outstanding.

## 2026-09-07 — Day 2: Research, positioning, brand, sitemap and user journeys

**Added**
- `MARKET_RESEARCH.md` — analysis of six premium London estate agency
  websites (Knight Frank, Winkworth, Dexters, Foxtons, Chestertons,
  Hamptons), with observations, weaknesses to avoid, and original
  opportunities for Times Estate Ltd.
- `BUSINESS_PRIORITIES_AND_AUDIENCES.md` — a proposed ranked list of
  business priorities and ten audience profiles, built only from the
  twelve confirmed service areas.
- `BRAND_DIRECTIONS.md` — three original brand directions ("The
  Established Line", "Quiet Modern", "Warm Contemporary Local Expert"),
  each with a WCAG-checked accessible colour palette, typography and
  photography approach, and a recommendation.
- `SITEMAP.md` — a proposed information architecture and navigation
  structure, with pages deliberately excluded where no genuine content or
  confirmation exists (e.g. guides/FAQs, blog, developments).
- `USER_JOURNEYS.md` — nine complete user journeys (sales/rental
  valuation, management enquiry, residential/commercial search, viewing
  request, property alerts, repair report, callback request), each ending
  in human review rather than an automated commitment.

**Findings**
- Confirmed the Git repository and working tree were clean and Day 1's
  commits intact before starting today's work.
- Identified that several Day 1 business-discovery answers were never
  actually supplied (contact details, VAT number, trading name,
  professional body membership, AML registration, fee information, all
  brand assets, live property data, testimonials) — recorded in
  `PROJECT_PLAN.md` under "Day 1 completeness check" rather than assumed
  complete.
- Two competitor sites (Savills, Marsh & Parsons) could not be accessed
  for research (HTTP 403) and were excluded rather than guessed at.

**Not done today (by design — out of scope for Day 2)**
- No technology stack chosen, no application scaffolded, no code written.
- No brand direction, sitemap, or user journey treated as approved —
  all await the owner's explicit sign-off.

**Approval**
- Owner approved business priorities, sitemap, user journeys, and Brand
  Direction 1 ("The Established Line") as a working baseline for Day 3
  onward — recorded as approved-but-changeable, not permanently fixed, in
  each affected document.

**Open items carried to Day 3**
- All Missing items listed in `PROJECT_PLAN.md`'s Day 1 completeness
  check remain outstanding.

## 2026-09-06 — Day 1: Project inspection, business discovery and master plan

**Added**
- Initial project-control documents: `CLAUDE.md`, `PROJECT_PLAN.md`,
  `BUSINESS_REQUIREMENTS.md`, `CONTENT_REQUIRED.md`,
  `CONTENT_VERIFICATION_REGISTER.md`, `CHANGELOG.md` (this file),
  `.gitignore`, `.env.example`.
- Recorded the eight permanent project rules in `CLAUDE.md`.
- Recorded the confirmed project scope (12 service areas) in
  `BUSINESS_REQUIREMENTS.md`, all business facts marked Missing pending
  owner input.

**Findings**
- The `Times Estate Ltd` project folder was empty prior to today — no
  existing code, configuration, or content to preserve.
- No local development tooling (Git repository, Node.js project) yet
  exists on this machine for the project; none was found to back up.

**Not done today (by design — out of scope for Day 1)**
- No pages designed, no application scaffolded, no dependencies installed,
  no accounts connected, nothing deployed.

**Open items carried to Day 2**
- Five grouped business-discovery questions asked; awaiting owner answers.
- Git repository initialisation and Node.js/package-manager version checks
  are pending — this session currently has file access to the project
  folder but not command-line access to the owner's machine.
