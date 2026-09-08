# WEBSITE_AUDIT.md — Times Estate Ltd

## Status of this document

Phase 1 audit, run today (2026-09-08) against the local development
build at `http://localhost:3000`. This consolidates and cross-checks
existing detailed records (`TECHNICAL_ARCHITECTURE.md`, `DATA_MODEL.md`,
`ACCESSIBILITY.md`, `SEO_PLAN.md`, `SECURITY.md`, `TEST_REPORT.md`)
rather than repeating them — each section below links to the source of
truth for full detail and states only what's new or worth restating.

## 1. Stack and structure (inspected today)

- **Framework:** Next.js 16.3.4 (App Router, Turbopack), React 19.2.8,
  TypeScript (strict). **Package manager:** npm.
- **Styling:** Tailwind CSS 4 (CSS-based `@theme`, no `tailwind.config.js`).
- **Validation:** Zod 4.5.x. **Testing:** Vitest 5 + React Testing
  Library, 12 test files, 64 tests.
- **Dependencies:** 4 production (`next`, `react`, `react-dom`, `zod`),
  12 dev — a genuinely small, low-risk dependency footprint. `npm audit`:
  0 vulnerabilities (re-run today).
- **Routes:** 29 page routes plus `sitemap.xml`/`robots.txt`/
  `not-found` (confirmed by directory listing today) across public
  marketing/service pages, property search/detail, forms, and a
  5-role admin area. Full route list in `TEST_REPORT.md`'s Day 7 build
  output.
- **Data:** no database — every property, lead and audit-log record is
  an in-memory array (`DATA_MODEL.md`), explicitly documented as
  temporary. Property/lead data access goes through an adapter
  interface (`PropertyProvider`, similar pattern for leads) so a real
  backend can be substituted without touching page code.
- **Integrations:** none connected — no CRM, portal feed, email
  provider, AI provider, analytics, or payment processor
  (`INTEGRATIONS.md` compares options for each, none chosen yet).
- **Deployment configuration:** none exists — no hosting account, no
  CI/CD, no domain pointed anywhere. `DEPLOYMENT.md` (Day 7) prepares,
  but does not execute, a full deployment checklist.
- **Assets:** no logo, brand imagery, or real property photography
  exists yet — every image slot renders a clearly labelled "Photograph
  not yet supplied" placeholder rather than a stock or invented image.

## 2. Safe checks run today

| Check | Result |
|---|---|
| `npm run typecheck` | Pass, 0 errors |
| `npm run lint` | Pass, 0 errors/warnings |
| `npm run format` (Prettier check) | Pass |
| `npm run test` | Pass — 64/64 |
| `npm audit` | 0 vulnerabilities |
| Local preview (`next dev` on port 3000) | Started successfully; home, search and property-detail pages screenshotted and confirmed rendering correctly at desktop and mobile widths |

No build/deploy/production check was run today beyond what's already
recorded in `TEST_REPORT.md` (Day 7) — today's brief asked for safe
existing checks, not a fresh full production-build pass.

## 3. What's working

- **Information architecture and navigation:** the approved 8-item
  primary nav (`SITEMAP.md`) renders correctly at every breakpoint,
  with a working mobile menu (keyboard-accessible, confirmed Day 6).
- **Property search:** residential and commercial search, with
  price/bedroom/use-type filters and sort, correctly narrows results
  and shows a genuine empty state — re-verified live today.
- **Property detail pages:** now correctly two-column at desktop
  (fixed Day 7 — see §4), with public/private field separation
  enforced at the type level so a private field cannot leak through a
  rendering mistake (`DATA_MODEL.md`).
- **Forms and lead management:** every enquiry category (valuation,
  viewing, registration, repair, callback, general) shares one
  validated, sanitised, rate-limited, honeypot-protected pipeline; an
  internal admin lead list with stage/assignment/notes and an audit
  trail exists and was live-tested (Day 5, re-verified Day 7).
- **Role-based access control:** five roles, enforced server-side, not
  just hidden in the UI — a Property Editor is genuinely blocked from
  publishing a property, confirmed live.
- **Accessibility:** a genuine, dated WCAG 2.2 AA testing programme
  (`ACCESSIBILITY.md`) found and fixed 8 real defects across Days 6–7,
  not just an unverified claim.
- **SEO fundamentals:** sitemap, robots.txt, canonical URLs, Open
  Graph, and schema.org structured data all implemented, with demo
  property data deliberately excluded from indexing (`SEO_PLAN.md`).
- **Security headers and RBAC:** a Content-Security-Policy and other
  headers exist (`SECURITY.md`), and no secret has ever been committed
  (confirmed by a fresh scan today).

## 4. What's incomplete, broken, or risky

**Critical — launch-blocking:**
- **An unresolved defect can hang the entire server** on certain form
  submissions (`TEST_REPORT.md` §5, Day 7). Not reproduced again today
  (no form was submitted during today's audit to avoid destabilising
  the environment), but nothing has changed in the relevant code since
  it was found, so it must be assumed still present until fixed and
  re-tested.
- **Authentication is a development-only mock** — no password, no real
  session security. Must not be deployed publicly as-is
  (`ADMIN_AND_CMS.md`, `SECURITY.md`).

**Major:**
- A real two-column desktop layout defect affecting 7 pages was found
  and fixed on Day 7 (`TEST_REPORT.md` §3) — confirmed today via fresh
  screenshots that the fix holds.
- No automated end-to-end or API test suite exists — all functional
  testing to date has been manual/live-browser (`TEST_REPORT.md` §2/§6).
- No real, persistent database — every record is lost on server
  restart (`DATA_MODEL.md`, `PRIVACY_DATA_MAP.md`).

**Minor / content gaps, not defects:**
- Public email address, opening hours, and a confirmed VAT
  number/trading name remain Missing (`BUSINESS_REQUIREMENTS.md`).
- Legal pages (privacy, cookies, terms, complaints, fees) are drafted
  but not yet solicitor-reviewed (`REGULATORY_READINESS.md`).
- The header does not yet show a phone number, even though one is now
  supplied — `SITEMAP.md` originally planned for this "once confirmed";
  deliberately not added today to avoid a header layout change during
  an audit-only phase (see `DECISIONS.md`).

## 5. What's reusable / should be retained

Everything in §3 — this is a substantial, tested, well-structured
foundation, not a prototype to discard. In particular, the adapter-
interface pattern (property/lead data access), the RBAC model, the
shared `LeadForm` pipeline, and the design-token system in
`DESIGN_SYSTEM.md` are all sound architectural decisions worth building
on rather than replacing.

## 6. Competitor pattern comparison (reference only, not copied)

`MARKET_RESEARCH.md` (Day 2) already researched six premium London
agency sites, including patterns consistent with Zoopla/Rightmove/
Foxtons' approach to search-first usability. Reviewed again today
against the current build:

| Pattern | Zoopla/Rightmove/Foxtons approach (observed generally) | Times Estate Ltd today | Recommendation |
|---|---|---|---|
| Search entry point | Prominent, often homepage-dominant search bar | Search lives on dedicated `/buy`/`/rent` pages, linked from nav and hero CTAs | Reasonable for a smaller agency's site; a homepage quick-search widget is a low-risk future enhancement, not required |
| Filters | Extensive (radius, school catchment, "added since") | Price, bedrooms, type, use-class, sort — a solid core set | Add radius/area filtering once geographic coverage is confirmed (`SITEMAP.md` open question) |
| Valuation journey | Often a multi-step "instant estimate" flow implying an automated figure | Explicitly never gives a figure — routes to a human-arranged initial market appraisal (`valuation-terms.ts`) | **Retain this distinction deliberately** — it's more honest than the portal pattern, not a gap to close |
| Area content | Dedicated area/neighbourhood guide pages | None built — deliberately, pending confirmed geographic coverage | Correct call per `SEO_PLAN.md`; do not build until areas are confirmed |
| Landlord lead generation | Dedicated, prominent landlord funnel | `/let` and `/property-management` both exist with clear CTAs | On par in structure; lacks the trust content (case studies, portfolio size) portals show, which cannot be added without genuine figures |

**Recommendation:** the current approach is intentionally more
conservative than a portal in exactly the places where a portal's
pattern would require either invented content (statistics, area
guides not yet confirmed) or a misleading automated valuation figure.
This is the right trade-off for an owner-operated agency's own site
and should not be "fixed" to look more like a portal.

## 7. Maintainability

Codebase is small, typed, tested, and documented (see the full
document map in `README.md`). The main maintainability risk is the
critical defect in §4 and the very recent Next.js/Turbopack version in
use, already flagged in `TECHNICAL_ARCHITECTURE.md` as a risk before
this defect was ever found.
