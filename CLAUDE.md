# CLAUDE.md — Times Estate Ltd Website Project

This file is the permanent rulebook for anyone (human or AI) working on this
project. It must be read before any design, content or coding work begins,
and it takes precedence over any single instruction that conflicts with it.

## What this project is

A bespoke, premium, highly automated property website for Times Estate Ltd,
a London estate agency. Scope includes: residential sales; residential
lettings; residential property management; commercial sales; commercial
lettings; commercial property management; valuation requests; viewing
requests; repair reporting; property enquiries; controlled AI assistance;
lead-management automation.

**Internal quality benchmark:** the visual quality, functionality, security
and attention to detail expected of a professionally commissioned website
costing approximately £50,000. This figure is an internal yardstick only —
it must never appear anywhere on the public website or in any customer-facing
material.

## Project status

- **Day 1 of 7 (investigation and planning) — complete**, though several
  business-discovery answers remain outstanding (see `PROJECT_PLAN.md`).
- **Day 2 of 7 (research, positioning, brand, sitemap, user journeys) —
  complete.** Business priorities, sitemap, user journeys and Brand
  Direction 1 ("The Established Line") approved as a working baseline.
- **Day 3 of 7 (technical foundation, design system, core website) —
  complete.** The Next.js application is scaffolded in `web/`, the
  approved design system is implemented, and eleven core public pages are
  built and tested. No external services connected, nothing deployed.
- **Day 4 of 7 (property data, CMS, listings and search) — complete.**
  A structured property data model, a five-role admin/approval workflow
  (development-only mock login — see `ADMIN_AND_CMS.md`), and full
  search/listing/detail pages exist, all running on fabricated
  demonstration data. No CRM/portal confirmed or connected; no real
  authentication yet — the admin area must not be deployed publicly
  until one is chosen and built.
- **Day 5 of 7 (forms, lead management, repair reporting, AI and
  automation) — complete.** Every enquiry form, an internal
  lead-management system, repair reporting, and a rule-based
  (non-AI-provider-connected) assistant all exist and are tested. No
  real outbound email or AI provider connected.
- **Day 6 of 7 (content, SEO, compliance readiness, accessibility,
  performance and security) — complete.** SEO infrastructure, drafted
  (not solicitor-reviewed) legal pages, a WCAG 2.2 AA accessibility
  pass, security headers, and performance measurement all completed.
- **Day 7 of 7 (final quality assurance, documentation and deployment
  preparation) — complete.** A full requirement-traceability audit, a
  major two-column-layout defect found and fixed across seven pages,
  documentation completed (`README.md`, `DEPLOYMENT.md`,
  `OPERATIONS_MANUAL.md`), and deployment/rollback procedures prepared
  (not executed). **One critical, unresolved defect remains** — see
  `TEST_REPORT.md` §5 — which alone makes the site not ready for
  deployment regardless of any other item's status.
- **Phase 1 (2026-09-08, audit and discovery) — complete.** A fresh
  audit of the existing 7-day build; new phone numbers and a domain
  recorded as Supplied by owner; six primary documents created
  (`PROJECT_BRIEF.md` and others — see the table below).
- **Phase 2 (2026-09-08, brand strategy and creative directions) —
  complete.** Audiences, positioning, tone of voice, and two rounds of
  creative directions explored; **Direction E, "Claret," selected**
  (`DECISIONS.md`).
- **Phase 3 (2026-09-09, final logo, brand identity and media pack) —
  complete, then corrected.** The Direction E ("Claret") identity built
  today was **superseded the same day**: the owner provided photographs
  of their actual, existing business cards and overrode Claret in
  favour of the real "Times Estates" brand (black background, orange/
  copper accent, an existing wordmark). The real logo now runs on the
  live site's header and favicon; `BRAND_GUIDELINES.md` and
  `LOGO_ASSET_REGISTER.md` document the real identity as current, with
  the Claret material kept below, marked historical. See `DECISIONS.md`.
- **Phase 4 (2026-09-09, UX/IA, wireframes, content and email plan) —
  complete, at Approval Gate 4.** Final information architecture,
  responsive wireframes (published as an inspectable artifact, not
  built into `web/`), full user-journey mapping, draft copy, and a
  proposed email/DNS plan — see `SITEMAP.md` and
  `EMAIL_AND_FORM_ROUTING.md`. The owner's answer to this phase's
  gating question keeps Construction/renovation services off the site
  as a dedicated section (mention only). Nothing implemented, nothing
  published, no cost incurred.
- **Phase 5 (2026-09-09, premium website implementation) — complete.**
  The real brand identity (logo, colours, fonts) was applied to the
  live site's design tokens — cascading automatically to every
  existing page — plus a new homepage hero (rotating slideshow,
  four-tab quick search), a rebuilt footer, and a header phone number.
  Every existing route continues to run on the same, unchanged
  underlying stack, data model, and lead pipeline. Nothing deployed,
  nothing connected. **Superseded 2026-09-11** — see the note below.
  See `DECISIONS.md`.
- **2026-09-11 — second rebrand (not a numbered phase).** The owner
  deliberately replaced the Phase 5 "Times Estates" identity with a
  new "Times Estate Ltd" skyline mark from a reference screenshot they
  supplied — explicitly "a deliberate new direction, not a correction
  of a mistake." Logo, favicon, and the heading typeface (now
  Merriweather) were updated site-wide via the same design-token
  cascade; colours were deliberately left unchanged to avoid re-
  risking the Phase 6 contrast fix. The customer-facing display name
  also reverted to the full "Times Estate Ltd" to match the new logo
  text exactly — flagged as a judgement call, easy to reverse if
  wrong. See `DECISIONS.md` (2026-09-11, "second rebrand") for the
  full account, including three other things the reference screenshot
  showed that were **not** actioned (Construction as a full service,
  invented testimonials/listings, live social/map features) because
  they weren't part of this specific instruction and conflict with
  standing decisions.
- **2026-10-20 — front end rebuilt to the owner's reference homepage;
  owner-supplied logo installed (not a numbered phase).** The owner
  supplied their own clock-and-skyline logo and instructed the front
  end be built to match the reference homepage, colour scheme
  unchanged. The emblem is live in the header, footer and favicon; the
  wordmark is rendered as live text because the supplied file is a
  viewer screenshot with a share button baked over the "D" of "LTD" (a
  clean export is still awaited). Header with grouped dropdown
  navigation, dark hero with quick search, service strip, a shared
  filter-sidebar listing explorer on the homepage and all four search
  pages, valuation band and light footer were built; four deliberate
  departures from the reference (illustration instead of photography,
  Construction as a phone-line mention, real demo counts and a labelled
  empty reviews slot instead of invented content, an honest "Search by
  Area" panel instead of a map) are recorded in `DECISIONS.md`
  (2026-10-20). Not a production QA pass — see the `QA_REPORT.md`
  addendum; **the site remains not ready for deployment.**
- **Segment 1 (2026-10-19, audit and compliance baseline) — complete,
  approved by the owner 2026-10-20.** Produced by a separate session in
  `segment-1/` (brand source audit with measured colours, live
  WordPress site audit, existing-URL register, 24-row compliance
  register, skills/tools register, QA, end report with seven open
  questions). Branch `segment-1-audit`.
- **Segment 2 (2026-10-20, strategy, design-application options,
  sitemap, journeys, SEO/redirects) — complete, at Approval Gate 2.**
  Audiences and claims review in `BRAND_STRATEGY.md`; three options on
  the same identity (A Heritage London · B Modern Property Platform ·
  C Boutique London Agency) in `DESIGN_APPLICATION_OPTIONS.md` with
  inspectable style tiles on a Design canvas; proposed sitemap and
  navigation in `SITEMAP.md`; critical journeys in `USER_JOURNEYS.md`;
  `SEO_REDIRECT_PLAN.md` (new). Guaranteed Rent excluded pending
  verification and legal review. **Waiting for the owner to choose A,
  B, C or a specified combination.** Nothing built, nothing deployed.
- **Phase 6 (2026-09-09, testing, performance, accessibility, SEO and
  compliance) — complete, at Approval Gate 6.** A full QA pass against
  a real production build (`next build && next start`, not the dev
  server) found and fixed three real defects introduced by Phase 5's
  rebrand (a site-wide colour-contrast failure, a touch-target-size
  defect, and a layout-shift defect), and **confirmed the Day 7
  critical server-hang defect is still present** — now additionally
  confirmed to reproduce via a genuine click, closing an open question
  Day 7 had left unresolved. See `QA_REPORT.md` (current, full record)
  and `LAUNCH_CHECKLIST.md` (short version) — **the site is not ready
  for deployment; the server-hang defect alone blocks it.**
- **Phase 7 (2026-09-09, launch, email configuration and handover) —
  prepared, not executed, at the Final Launch Approval gate.** Every
  launch-adjacent plan (hosting/costs, DNS, SSL/redirects, analytics/
  consent, the final form-to-mailbox routing matrix, MX/SPF/DKIM/
  DMARC, MFA/leaver procedures, monitoring, backup/disaster-recovery,
  a brand-asset master-file index, and a technical handover document)
  was written up without publishing anything, per this phase's own
  instruction. **Recommendation: do not approve launch yet** — see
  `FINAL_LAUNCH_APPROVAL.md`. The server-hang defect remains unresolved,
  and Phase 7 additionally surfaced that the site has no persistent
  database, which is both a data-loss risk on every restart and a
  hosting-architecture constraint (see `DEPLOYMENT.md` §1). No hosting
  account, DNS change, mailbox, or paid service has been created.
- **Second 7-day build, Days 3–7 (to 2026-10-31) — complete,
  not deployed.** Architecture, design system, core pages, property
  data and admin with approval workflow, listings and search, forms,
  lead workflow, repair reporting, controlled AI assistant, privacy
  map, SEO, regulatory-readiness material, accessibility, performance
  and security hardening. Day 7 audit (`REQUIREMENT_TRACEABILITY.md`,
  89 requirements), full functional testing — which **found and fixed
  the critical server-hang defect** (a bound server action looping
  forever on no-JavaScript form posts) — cross-device visual review and
  the final 18-check test suite (all pass except the Next.js 16.3.4
  dependency audit, awaiting the owner's "approve the Next.js upgrade").
  (**Update 2026-11-09:** the owner approved the upgrade; Next.js is now
  16.4.5, and website dependencies have 0 known vulnerabilities.)
  **Launch is still blocked** by: ~~the Next.js update~~ (done), no database, no
  real staff sign-in with two-step verification, unpublished fees,
  unverified redress/CMP memberships, and outstanding solicitor review.
  Staff guide: `OPERATIONS_MANUAL.md` (rewritten Day 7).
- **2026-11-09 — recovery of an incomplete copy (not a numbered
  phase).** The folder on this computer (`D:\Muzaffar UK\Times Estate
  Ltd`) was a partial copy: 21 documents, about 90 code files, the
  settings files and much of `node_modules` were missing, and `.git`
  is damaged. 79 original code files were recovered from the old
  build's source maps; 6 modules and the settings files were rebuilt;
  the 21 documents were rebuilt. Every rebuilt file is marked
  **RECONSTRUCTED**. Type-check, lint and the production build pass.
  The lost tests were then rewritten (new, not the originals): **241
  pass in 32 files** (157 on 31 Oct). Full QA then re-run on the production
  build: axe 74 scans / 0 violations; no sideways scrolling at 6
  widths after fixing the `/cookie-policy` table on phones;
  Lighthouse 100 on desktop, 97–100 for returning mobile visitors,
  87–93 on a first mobile visit (the owner's intro video). See the
  `QA_REPORT.md` addendum. Still not ready for deployment.
  **Later the same day the git history was repaired** (branch
  `recovery-2026-11-09`, from commit `5284b25` of 30 Oct; the 16
  commits after it are lost). 71 missing files and the originals of
  the rebuilt documents and modules were restored from it, so most
  "RECONSTRUCTED" material has been replaced by originals. 266 tests
  pass. See the "Final position" section of the recovery report. Nothing committed
  (git damaged) or deployed. See `RECOVERY_REPORT_2026-11-09.md`.
- See `PROJECT_PLAN.md` for the Day 1–7 build record, `TEST_REPORT.md`
  for its test results, and `DECISIONS.md` for everything decided
  since.

## The eight permanent project rules

1. **Do not invent business facts.** Never fabricate statistics, properties,
   testimonials, staff members, memberships, awards, offices or regulatory
   credentials. If a fact is not confirmed by the business owner or a
   verifiable source, it does not go on the website.
2. **Label demonstration material clearly.** Any placeholder, sample or
   illustrative content (e.g. a mock property listing used to test the
   search UI) must be visibly and unambiguously marked as demo/sample data,
   both in the code (comments, clear naming) and, where it could ever be
   seen by a visitor, on the page itself.
3. **Preserve user-created work.** Never overwrite, rename, move or delete
   existing files, folders or content created by the business owner without
   explicit permission. When in doubt, copy rather than replace.
4. **Obtain approval before:** paid services or subscriptions, third-party
   integrations, requesting or using live credentials, publishing anything
   publicly, or any destructive operation (deleting data, force-pushing,
   dropping databases, etc.).
5. **Keep high-risk business decisions under human control.** Pricing,
   regulatory claims, legal wording, financial commitments and anything
   with compliance implications are decided by the business owner (or their
   professional advisers), not by the AI team.
6. **No deployment without explicit written approval.** Nothing is deployed
   to a public or production environment until the business owner states
   exactly: **"I approve production deployment."** No paraphrase counts.
7. **Complete checks before recommending deployment.** Before any
   deployment recommendation, security, accessibility, responsive,
   functional and visual checks must all have been completed and their
   results recorded.
8. **Keep documentation understandable to a non-technical business owner.**
   Every control document should be readable by someone with no coding
   background. Technical detail belongs in code comments or a clearly
   separated technical appendix, not in the main body of planning documents.

## Status labels used throughout this project

Every business fact, piece of content or requirement recorded in this
project is tagged with one of the following, and only these:

- **Confirmed** — verified as accurate and approved for use.
- **Supplied by owner** — given directly by Mohammad Muzaffar Malik / Times
  Estate Ltd, not yet independently verified.
- **Missing** — required but not yet provided.
- **Requires verification** — provided, but needs an independent check
  (e.g. against Companies House, a redress scheme register, or a regulator)
  before it can be marked Confirmed.
- **Requires professional review** — needs sign-off from a qualified
  professional (e.g. a solicitor for legal wording, an accountant for
  financial claims) before use.

No content with a status other than **Confirmed** goes live.

## Document map

**As of 2026-09-08, the six Phase 1 documents below (`PROJECT_BRIEF.md`,
`WEBSITE_AUDIT.md`, `CONTENT_REGISTER.md`, `COMPLIANCE_REGISTER.md`,
`DECISIONS.md`, `QA_REPORT.md`) are the primary, current-state
documents — read these first, and they are what's kept up to date
going forward.** The detailed Day 1–7 documents they summarise
(`BUSINESS_REQUIREMENTS.md`, `CONTENT_VERIFICATION_REGISTER.md`,
`CONTENT_REQUIRED.md`, `REGULATORY_READINESS.md`, `TEST_REPORT.md`)
remain in the repository, unmoved and unedited, as detailed historical
background — still linked from application code and other documents,
but no longer the first place to look for current status.

| Document | Purpose |
|---|---|
| `CLAUDE.md` | This file — permanent rules and project status. |
| `PROJECT_PLAN.md` | Day-by-day plan, current position, next steps. |
| `BUSINESS_REQUIREMENTS.md` | Confirmed scope, services and business facts. |
| `CONTENT_REQUIRED.md` | Checklist of every piece of content still needed. |
| `CONTENT_VERIFICATION_REGISTER.md` | Master log of every fact/content item and its status. |
| `CHANGELOG.md` | Dated record of what changed and why. |
| `MARKET_RESEARCH.md` | Competitor/market research and observations (Day 2). |
| `BUSINESS_PRIORITIES_AND_AUDIENCES.md` | Proposed business priorities and audience profiles (Day 2). |
| `BRAND_DIRECTIONS.md` | Three proposed visual brand directions (Day 2). |
| `USER_JOURNEYS.md` | Designed user journeys for every confirmed workflow (Day 2) — extended per-page in `SITEMAP.md` §21 (Phase 4). |
| `.gitignore` | Files excluded from version control. |
| `.env.example` | Placeholder names for environment variables — never real secrets. |
| `TECHNICAL_ARCHITECTURE.md` | Chosen technology stack and reasoning (Day 3). |
| `INTEGRATIONS.md` | Comparison of external service options — none connected yet (Day 3). |
| `DESIGN_SYSTEM.md` | Approved design tokens and components (Day 3). |
| `TEST_REPORT.md` | Record of every check run against the application and its results (updated each day). |
| `DATA_MODEL.md` | The property data model — fields, mandatory/optional, public/private, verified/unverified (Day 4). |
| `ADMIN_AND_CMS.md` | Roles, permissions, approval workflow, and the development-only mock login (Day 4). |
| `AUTOMATION_WORKFLOWS.md` | Per-category lead workflow: trigger, validation, consent, internal action, and what still needs owner approval before any external communication is sent (Day 5). |
| `AI_SAFETY_RULES.md` | The AI assistant's behavioural contract — what it must and must never do, and why prompt-injection resistance is structural today (Day 5). |
| `PRIVACY_DATA_MAP.md` | What personal data is collected, where it lives, who can access it, and what must change before it holds real customer data (Day 5). |
| `README.md` | Repository front door — what this project is and where to find everything (Day 7). |
| ★ `DEPLOYMENT.md` | **PRIMARY (Phase 7).** Hosting/cost comparison, environment variables, DNS/SSL/redirect plan, analytics/consent options, monitoring, backup/disaster-recovery, rollback — prepared, not executed. |
| `OPERATIONS_MANUAL.md` | Plain-English guide for staff using the finished site day to day (Day 7). |
| ★ `TECHNICAL_HANDOVER.md` | **PRIMARY (Phase 7).** Technical "start here" for a developer taking over: architecture patterns, known issues, pre/post-launch test plan, brand-asset master-file index. |
| ★ `FINAL_LAUNCH_APPROVAL.md` | **PRIMARY (Phase 7).** The consolidated launch-approval request — exact actions, costs, risks, rollback, and the current recommendation not to approve yet. |
| ★ `PROJECT_BRIEF.md` | **PRIMARY.** Current strategic brief — company, contact facts, quality objective, competitive-reference policy. |
| ★ `WEBSITE_AUDIT.md` | **PRIMARY.** Current stack/route/dependency inspection, working/broken/reusable findings, competitor pattern comparison. |
| ★ `CONTENT_REGISTER.md` | **PRIMARY.** Current content classification: CONFIRMED / MISSING / PLACEHOLDER / PROHIBITED TO INVENT. |
| ★ `COMPLIANCE_REGISTER.md` | **PRIMARY.** Current regulatory register — deeper historical reasoning remains in `REGULATORY_READINESS.md`. |
| ★ `DECISIONS.md` | **PRIMARY.** Ongoing log of project-management/technical judgement calls and why — updated as new decisions are made. |
| ★ `QA_REPORT.md` | **PRIMARY.** Current QA snapshot — deeper historical test detail remains in `TEST_REPORT.md`. |
| ★ `BRAND_STRATEGY.md` | **PRIMARY (Phase 2).** Audiences, positioning, tone of voice, messaging hierarchy, provisional straplines. |
| ★ `BRAND_CONCEPTS.md` | **PRIMARY (Phase 2).** Three new creative directions — palette, type, logo sketches, strengths/risks. None applied to the live site; a visual comparison prototype is published separately. |
| ★ `BRAND_GUIDELINES.md` | **PRIMARY.** The current identity system (real "Times Estates" brand, from 2026-09-09): logo rules, colour/type specification, spacing/grid/motion rules. The Claret system it replaced is kept below in the same file, marked historical. |
| ★ `LOGO_ASSET_REGISTER.md` | **PRIMARY.** File-by-file inventory of the current logo suite in `brand/logo-real/` (Claret suite kept below, marked historical). |
| ★ `MEDIA_ASSET_REGISTER.md` | **PRIMARY (Phase 3, Claret-era).** File-by-file inventory of stationery/social/digital assets in `brand/`, marked Rendered or Specified — superseded pending a real-brand asset pack. |
| ★ `SITEMAP.md` | **PRIMARY (Phase 4).** Final information architecture, wireframe spec, and user-journey map. The Day 2/3 baseline is kept below in the same file, marked historical. |
| ★ `EMAIL_AND_FORM_ROUTING.md` | **PRIMARY (Phase 4).** Proposed mailbox/alias plan and email authentication (SPF/DKIM/DMARC) setup — a specification, nothing connected. |
| ★ `QA_REPORT.md` | **PRIMARY (Phase 6).** Current, full QA record against a real production build — testing, performance, accessibility, SEO, security. Read before any deployment decision. |
| ★ `LAUNCH_CHECKLIST.md` | **PRIMARY (Phase 6).** Concise, plain-English go/no-go checklist. |
| `brand/` | Source and export files for the identity system (Phase 3) — SVG masters, PNG/WebP exports, stationery, social/digital assets. Separate from `web/`; not applied to the live site. |
| `SEO_PLAN.md` | Search-intent map, keyword map, technical SEO implementation and what's deliberately not done yet (area pages, FAQ pages) and why (Day 6). |
| ★ `DESIGN_APPLICATION_OPTIONS.md` | **PRIMARY (Segment 2).** Options A/B/C for applying the supplied identity, component by component, with a recommendation — the owner's choice at Gate 2. |
| ★ `SEO_REDIRECT_PLAN.md` | **PRIMARY (Segment 2).** Canonical host, the row-by-row 301/410 map for every live `timesestates.co.uk` URL, intent-to-page mapping, on-page rules, launch-week SEO checklist — a plan, nothing executed. |
| `segment-1/` | Segment 1 (2026-10-19) audit set from a separate session: `BRAND_SOURCE_AUDIT.md` (measured colours, logo limitations), `EXISTING_URL_REGISTER.md` (live site URLs), a 24-row `COMPLIANCE_REGISTER.md`, `SKILLS_AND_TOOLS_REGISTER.md`, `SEGMENT_1_END_REPORT.md` (seven open questions). Read alongside the root documents. |
| ★ `REQUIREMENT_TRACEABILITY.md` | **PRIMARY (Day 7, 2026-10-30).** Every requirement from the control documents and owner decisions, with where it is built, the test evidence, its status and the next action. The best single answer to "what is finished?". |
| `REGULATORY_READINESS.md` | UK legal/regulatory topics reviewed today, each with a status — never a claim of compliance (Day 6). |
| `ACCESSIBILITY.md` | Dated WCAG 2.2 AA testing record — automated and manual, defects found and fixed (Day 6). |
| `SECURITY.md` | Security controls reviewed and hardened today, and what still must happen before real deployment (Day 6). |
| `web/` | The Next.js application itself. **Note:** `web/CLAUDE.md` and `web/AGENTS.md` inside this folder are auto-generated by the Next.js tooling itself (framework-version guidance for coding agents) — they are **not** part of this project's rulebook. This file, at the repository root, is the only authoritative CLAUDE.md. |

## Working conventions

- This repository lives at `Desktop/Times Estate Ltd` on the business
  owner's computer. Treat it as the single source of truth.
- **Standing instruction (given 2026-09-07):** at the end of each day's
  work, after the end-of-day report has been given, commit all changes
  and push them to GitHub automatically, without waiting to be asked
  again. This applies only to committing/pushing project-control and
  content files in this repository — it does not authorise paid
  services, third-party integrations, production deployment, or any
  other action still requiring explicit approval under Rule 4.
- Real credentials, API keys and secrets must never be committed. Only
  `.env.example` (placeholders) is tracked; the real `.env` file is
  git-ignored.
- Any assumption made in the absence of confirmed information must be
  written down as an assumption, not presented as fact.
