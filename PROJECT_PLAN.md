# PROJECT_PLAN.md — Times Estate Ltd Website

> **Restored 9 November 2026 from the project's git history** (commit
> `5284b25`, 30 October 2026). This file was missing from the folder on
> this computer. Any changes made to it between 31 October and
> 2 November could not be recovered, so Day 7 updates may be absent.
> Anything dated 9 November was added after the restore. See
> `RECOVERY_REPORT_2026-11-09.md`.


## Purpose

This is the working plan for the bespoke Times Estate Ltd website build.
It records the day-by-day scope agreed with the business owner, what has
actually been completed, and what is proposed next. Nothing below Day 1 has
been started — days 2–7 are a proposed sequence for the owner to review and
adjust, not a commitment already in motion.

## Current position (2026-10-29)

**Build stage complete for pages that need no database or external
service. Day 4 (property data, CMS, listings) has not started.**

- Architecture confirmed (`TECHNICAL_ARCHITECTURE.md`, `INTEGRATIONS.md`):
  Next.js / React / strict TypeScript / Tailwind kept; no services connected.
- Design system implemented and documented (`DESIGN_SYSTEM.md`).
- Pages built: Home, About, Why Choose Us, Residential, Commercial,
  Property Management, Landlords, Buyers & Tenants, Areas We Cover,
  Contact, plus legal pages marked "Draft — requires legal review".
- Tested at six widths with production build; results in `TEST_REPORT.md`.

**Decisions needed before Day 4:** see the end-of-day report in
`CHANGELOG.md` (2026-10-29).

## Day 5 position (2026-10-29)

**Day 5 complete; Day 6 not started.** Secure forms with confirmation
page; valuation and viewing controls; lead workflow with assignment,
priority, follow-up and escalation flags; repair reporting with checked
uploads and storage rules; controlled AI assistant (demonstration only)
with injection resistance and draft-only outbound; privacy data map.
128/128 tests. No live communications, no customer data.

## Day 4 position (2026-10-29)

**Day 4 complete; Day 5 not started.** Property data model, secure
admin structure (development sign-in only), listings and detail pages,
search with saved searches, and a CRM feed boundary with no provider
connected. 94/94 tests. See `TEST_REPORT.md` and `CHANGELOG.md`.

## Governing rules

This plan operates under the permanent rules in `CLAUDE.md`, in particular:
no invented business facts, no deployment without the exact approval
phrase, and no paid services or integrations without explicit permission.

## Day-by-day plan

### Day 1 — Project inspection, business discovery and master plan (TODAY)

**Status: Complete.**

- Inspected the working environment (cloud workspace and the connected
  `Times Estate Ltd` folder on the owner's computer).
- Audited available skills, agents, MCP connectors and development tools
  against what a premium property website needs, without installing
  anything.
- Created the project-control documents (this file and its companions).
- Asked the first round of business-discovery questions.
- No pages designed, no application scaffolded, no code written.

### Day 2 — Research, positioning, brand, sitemap and user journeys

**Status: Complete. Owner approved business priorities, sitemap, user
journeys and Brand Direction 1 ("The Established Line") on 2026-09-07 as
a working baseline for Day 3 onward — all still changeable at any time,
not fixed permanently.**

- Reviewed Day 1 answers received so far (company identity, compliance
  documents) and identified what is still outstanding (see "Day 1
  completeness check" below) before proceeding.
- Researched six premium London estate agency websites for navigation,
  search, trust-signal and commercial-presentation patterns — recorded in
  `MARKET_RESEARCH.md`, with weaknesses to avoid and original
  opportunities identified (never copying wording, layout or imagery).
- Proposed a ranked set of business priorities and ten audience profiles
  in `BUSINESS_PRIORITIES_AND_AUDIENCES.md`, built only from the twelve
  confirmed service areas — explicitly marked as a proposal requiring
  approval, not a decision.
- Produced three original, independently designed brand directions in
  `BRAND_DIRECTIONS.md`, each with an accessible (WCAG-checked) colour
  palette, typography and photography approach, and a recommendation.
- Produced a proposed sitemap and navigation structure in `SITEMAP.md`,
  built only from confirmed services, with pages deliberately excluded
  (e.g. guides/FAQs, blog, developments) where no genuine content or
  confirmation exists yet.
- Designed nine complete user journeys in `USER_JOURNEYS.md` (valuations,
  searches, viewings, alerts, repairs, callbacks), every one of them
  ending in human review/approval rather than an automated commitment.
- Did not scaffold the application, choose a final technology stack, or
  write any code — out of scope for today by design.

*Note: the original Day 2 description mentioned confirming the technology
stack and scaffolding. That has been moved later (see Day 3 note below)
because brand direction and sitemap approval should come first — building
a technical skeleton before the information architecture is agreed would
risk rework.*

### Day 1 completeness check (performed at the start of Day 2)

Day 1 was marked "Complete" in the sense that its four tasks were carried
out, but several of the business-discovery answers it requested were not
actually supplied before Day 2 began. This does not block Day 2's research
and planning work, but it does block later days:

- **Still Missing:** trading name, VAT number, public phone number(s),
  public email address(es), opening hours, existing domain name, current
  hosting provider, professional body membership, AML supervision
  registration, fee/charges transparency information, ICO registration
  number, logo, brand colours, typography preference, property
  photography, staff photography, live property listings, genuine
  testimonials, example websites the owner likes.
- **Confirmed since Day 1:** legal company name, Companies House number,
  and registered office address (all verified against the Companies
  House public register).
- **Requires verification (documents supplied, not yet independently
  confirmed):** Client Money Protection scheme membership, Property
  Redress Scheme membership, professional indemnity insurance (only the
  generic policy wording was supplied — the schedule showing Times
  Estate Ltd's specific policy detail is still needed).
- **Services:** still recorded as "Supplied by owner (to reconfirm in
  detail)" rather than fully confirmed in scope/geography.

### Day 3 — Technical foundation, design system and core website

**Status: Complete.**

- Found and reported a real blocker before starting: Node.js was not
  installed on this computer. With the owner's explicit approval, Node.js
  24 LTS was installed via `winget` (an official, free installer) — the
  first thing actually installed on the owner's machine this project.
- Chose and recorded the technology stack in `TECHNICAL_ARCHITECTURE.md`
  (Next.js 16, React 19, TypeScript strict mode, Tailwind CSS 4, Zod for
  server-side validation), all versions checked against the live npm
  registry rather than assumed.
- Compared options for every external service category (database, CMS,
  auth, search, email, storage, analytics, hosting, monitoring) in
  `INTEGRATIONS.md` — none connected, all pending owner approval.
- Scaffolded the Next.js application into `web/` (kept separate from
  planning documents at the repository root), with strict TypeScript, no
  secrets, environment-variable validation, and a clean directory
  structure.
- Built and documented the approved Brand Direction 1 design system in
  `DESIGN_SYSTEM.md` and in code — colours, typography, buttons, forms,
  navigation, property cards, status badges, and a dedicated
  "Placeholder Notice" component that enforces Rule 2 directly on the
  page, not just in project documents.
- Built eleven core public pages (Home, About, Residential, Commercial,
  Sell, Let, Property Management, Contact, and three legal placeholders)
  — every unverified fact visibly labelled with its real status.
- Deliberately did not build Buy/Rent property search (needs a property
  database — Day 4) or a dedicated "Areas We Cover" page (geographic
  coverage still unconfirmed — see Rule 1).
- Tested all six required breakpoints, found and fixed two real
  responsive defects (a tablet-width navigation overlap, and a mobile
  menu not fully covering the page beneath it) — see `TEST_REPORT.md`.
- Ran and recorded every required check (TypeScript, lint, tests,
  production build, dependency audit, secret scan) in `TEST_REPORT.md` —
  all passed; one low-risk dependency install-script was flagged but not
  approved.
- Did not connect any external service, deploy anything, or begin Day 4.

### Day 4 — Property data, CMS, listings and search

**Status: Complete.**

- Checked the baseline before changing anything: typecheck, lint, tests
  and production build all passed on Day 3's code before today's work
  began.
- Built one structured property data model (`DATA_MODEL.md` and
  `web/src/lib/property/types.ts`) covering residential and commercial,
  sales and lettings, with every field marked mandatory/optional,
  public/private and verified/unverified. Private fields (full address,
  internal notes, assigned staff member) are a different TypeScript type
  from public fields, so they cannot leak through a rendering mistake —
  verified live in the browser, not just by unit test.
- Built a five-role permission model (`ADMIN_AND_CMS.md`) — Administrator,
  Manager, Property Editor, Content Editor, Enquiry Viewer — enforced
  server-side, with a Draft → Awaiting approval → Available workflow and
  an audit log. **The login system is an explicitly-labelled,
  development-only mock, not real authentication** — this is a hard
  blocker for any future deployment, not an oversight.
- Built search and listing pages for all four categories (residential
  for sale, residential to let, commercial for sale, commercial to let)
  plus a shared property detail page, favourites, and property alerts —
  all backed by fabricated, unmistakably-labelled demonstration data
  (nine sample properties covering every status, including Draft and
  Sold, to prove the visibility rules actually work).
- Determined that **no CRM or property-portal agreement is confirmed** —
  built a clean adapter interface (`PropertyProvider`) so a real one can
  be connected later by writing one new class, without changing any
  page. Documented six real UK providers and what each would require in
  `INTEGRATIONS.md`, without scraping or contacting any of them.
- Found and fixed one real bug (an admin page that could get stuck on
  "Loading…" after saving) and investigated a second, confirming it is a
  development-server-only quirk absent from a production build — full
  detail in `TEST_REPORT.md`.
- Ran every required check (TypeScript, lint, 24 unit/component tests,
  production build, dependency audit, secret scan) plus live functional
  testing of permission boundaries, public/private separation, and
  approval-state visibility — all recorded in `TEST_REPORT.md`.
- Did not connect a live CRM or portal, did not import any customer
  data, and did not begin Day 5.

### Day 5 — Forms, lead management, repair reporting, AI and automation

**Status: Complete.**

- Checked the baseline before changing anything: typecheck, lint, tests
  and production build all passed on Day 4's code before today's work
  began.
- Replaced the single `EnquiryForm` with a generic, reusable `LeadForm`
  covering all twelve lead categories (sales/rental/commercial
  valuations, management enquiries, buyer/tenant registration,
  commercial enquiries, viewing requests, repair reports, callback
  requests, general enquiries), each protected by a honeypot field, a
  per-form rate limit (5 submissions/minute), server-side sanitisation,
  and mandatory, timestamped Privacy Policy consent.
- Built a valuation-terminology vocabulary
  (`web/src/lib/valuation-terms.ts`) distinguishing an initial market
  appraisal, an automated estimate, a formal valuation and a regulated
  valuation, and used it everywhere a page offers a "valuation" — **no
  page ever states a valuation figure**, and every page makes clear a
  formal valuation requires confirmation by an authorised person.
- Built a viewing-request flow that explicitly states a request does
  not confirm a viewing, and never automatically confirms access to an
  occupied property, per the brief's explicit instruction.
- Built a bespoke repair-reporting page (`/report-a-repair`) with
  genuine, verifiable UK emergency-safety information shown before the
  form (999, the National Gas Emergency Service, the national
  power-cut number), dual consent (privacy + contractor-sharing), and
  file-upload validation that **never stores file bytes** — only
  sanitised filename/size/type metadata — because no storage provider
  is approved.
- Built an internal lead-management system: a `Lead` data model, an
  in-memory store, a staff-facing `/admin/leads` list and detail view
  with a nine-stage lifecycle, notes, and assignment, gated by a new
  `manage_leads` permission (Manager/Administrator only; Enquiry Viewer
  keeps read-only access). Documented every category's workflow,
  including what would need approval before any real external
  communication is sent, in the new `AUTOMATION_WORKFLOWS.md`.
- Built a provider-neutral AI-assistant foundation
  (`web/src/lib/ai/provider.ts`) with a rule-based demonstration
  implementation — no external AI service connected, no paid account,
  no API key. Its full behavioural contract (hard refusals, retrieval
  only from approved content, mandatory source citation, human review
  before any external communication) is documented in the new
  `AI_SAFETY_RULES.md` and enforced structurally: because it is
  rule-based rather than a real language model, prompt-injection
  resistance was proven both by unit test and live in the browser.
- Mapped exactly what personal data is collected, where it lives, who
  can access it, and what must change before it holds real customer
  data in the new `PRIVACY_DATA_MAP.md` — no compliance claim is made;
  every gap is flagged for professional review.
- Found and fixed two real bugs: a same-millisecond lead-ordering flaw
  in `listLeads()`, and React's internal `$ACTION_*` form-encoding
  fields leaking into stored lead records. Full detail in
  `TEST_REPORT.md`.
- Ran every required check (TypeScript, lint, 64 unit/component tests,
  production build, dependency audit, secret scan) plus extensive live
  functional testing — role-based access to leads across all five
  roles, the notification-failure path, the lead status-change flow,
  file-upload rejection, mobile viewport, keyboard navigation, and live
  AI refusal/prompt-injection behaviour — all recorded in
  `TEST_REPORT.md`.
- Did not activate any real outbound email or SMS, did not connect any
  AI provider account, did not connect any customer data, and did not
  begin Day 6.

### Day 6 — Content, SEO, compliance readiness, accessibility, performance and security

**Status: Complete.**

- Checked the baseline before changing anything: typecheck, lint, tests
  and production build all passed on Day 5's code before today's work
  began.
- **Content:** reviewed every page's content against CLAUDE.md Rule 1;
  no new business facts were fabricated. Added a "Regulatory
  information" section to `/about` (redress scheme, CMP, PII, each with
  its real verification status). Recorded every material statement
  site-wide in `CONTENT_VERIFICATION_REGISTER.md` using today's
  requested vocabulary (Verified / Supplied by the business owner /
  Placeholder / Requires legal or professional review / Demonstration
  content), with an explicit mapping to CLAUDE.md's existing five-label
  system rather than silently replacing it.
- **SEO:** built `SEO_PLAN.md` (search-intent map, keyword map,
  structured-data policy, and an explicit decision not to build area
  pages until geographic coverage is confirmed). Added `metadataBase`,
  Open Graph defaults, per-page descriptions and canonical URLs, a
  dynamic `/sitemap.xml` and `/robots.txt`, and schema.org JSON-LD
  (`RealEstateAgent` sitewide, `BreadcrumbList` and conditional
  `RealEstateListing` on property pages — the latter deliberately
  returns nothing for every property today, since all are demo data).
  Demo property pages and `/admin/*` are marked `noindex`.
- **Regulatory readiness:** researched current UK requirements (ICO
  cookies/PECR guidance, NTSELAT material information, the Tenant Fees
  Act 2019, the DMCC Act 2024's fake-review ban, EPC advertising rules)
  and recorded findings topic-by-topic in the new `REGULATORY_READINESS.md`
  — **no compliance claim is made anywhere.** Drafted real (not
  placeholder) text for the Privacy Notice, Cookie Notice, Terms of
  Website Use, and Complaints Handling Procedure, each carrying a new
  `DraftLegalNotice` banner stating it awaits solicitor review. Built a
  new `/fees` page describing the legal fee-transparency framework with
  real amounts marked Missing, and a new `/accessibility` statement.
- **Accessibility:** built `ACCESSIBILITY.md` against a WCAG 2.2 AA
  target. Automated testing with axe-core across 18 pages/states plus
  an independent Lighthouse pass found and fixed 4 real defects (a
  colour-contrast failure on warning badges, a non-keyboard-focusable
  scrollable region, touch targets below 24×24px on property cards, and
  a skipped heading level on every search-results page); manual
  hand-calculation found and fixed a further widespread contrast defect
  (`text-ink/60` and similar, across 12 files) and added keyboard
  focus-management (Escape-to-close, focus return) to the mobile menu
  and AI assistant widget. Every affected page now scores 100/100 on
  the relevant automated accessibility check.
- **Performance:** measured with Lighthouse against both the dev server
  (informational) and a real production build. Production: 95/100
  performance, 100/100 best practices, 312 KiB total page weight, 0
  cumulative layout shift — recorded in full, including the one
  accepted minor render-blocking-CSS finding, in `TEST_REPORT.md`. No
  accessibility or functionality was traded away for these scores.
- **Security:** built `SECURITY.md`. Added security headers (CSP,
  X-Frame-Options, HSTS, and more) to `next.config.ts` — previously
  none existed — and live-verified the CSP actually blocks an external
  script. Reviewed and re-confirmed server-side validation,
  sanitisation, rate limiting, and role-based access control; searched
  the whole codebase for redirect calls and confirmed no open-redirect
  vector exists; ran a fresh `npm audit` (0 vulnerabilities) and secret
  scan (clean). The mock authentication system remains the top
  pre-deployment blocker, restated rather than solved today.
- Ran every required check (TypeScript, lint, 64 unit/component tests,
  production build, dependency audit, secret scan, accessibility scans,
  a full internal link check, and responsive checks at 4 breakpoints)
  — all recorded in `TEST_REPORT.md`.
- Did not deploy anything, did not claim legal compliance anywhere, and
  did not begin Day 7.

### Day 7 — Final quality assurance, documentation, handover and deployment preparation

**Status: Complete.**

- Checked the baseline before changing anything: typecheck, lint, tests
  and production build all passed on Day 6's code before today's work
  began.
- Built a full requirement-traceability audit against
  `BUSINESS_REQUIREMENTS.md`, `SITEMAP.md`, `USER_JOURNEYS.md`,
  `DESIGN_SYSTEM.md`, `DATA_MODEL.md`, `AUTOMATION_WORKFLOWS.md`,
  `AI_SAFETY_RULES.md`, `ACCESSIBILITY.md`, `SEO_PLAN.md`,
  `SECURITY.md` and `PRIVACY_DATA_MAP.md`, recorded in full in
  `TEST_REPORT.md` §1, using only the six statuses required today.
- Live-tested residential and commercial search/filters, a full lead
  submission (validation error → correction → success), CMS property
  editing with audit logging, the Property-Editor-cannot-publish RBAC
  boundary, and the AI assistant's refusal/escalation behaviour.
- **Found and fixed a major, previously-undetected layout defect**
  affecting seven pages (`/sell`, `/let`, `/property-management`,
  `/report-a-repair`, `/register`, `/contact`, `/property/[id]`): their
  intended two-column desktop layouts were silently collapsing to a
  single narrow column because layout classes were applied to the
  wrong wrapper in the shared `Section` component. Fixed by using the
  component's existing `containerClassName` prop; re-verified live and
  re-confirmed the full check suite passes.
- **Found and fixed** a Day 6 regression where the new Content-Security
  -Policy silently broke `next dev` entirely (React's development build
  needs `eval()`, which the policy hadn't allowed) — made the policy
  dev/production-aware with no change to the production policy itself.
- **Found, and extensively investigated, an unresolved CRITICAL
  defect:** certain lead-form submissions cause the server (confirmed
  in both dev and a real production build) to become completely
  unresponsive to every visitor, requiring a manual restart. Ruled out
  the Day 6 security headers, production-specific behaviour, and every
  line of this project's own lead-submission code as the cause through
  direct, methodical testing — the cause is not yet confirmed, but is
  suspected to be a Next.js 16.3.4/Turbopack framework issue given
  `TECHNICAL_ARCHITECTURE.md`'s existing version-risk flag. Full detail
  in `TEST_REPORT.md` §5. **This is an absolute launch blocker.**
- Ran a full cross-device visual review at six breakpoints (360–1920px)
  across the home page, search/listing pages, the property detail
  page, and key forms — the layout defect above was found this way.
- Ran the complete final technical test suite (formatting, TypeScript,
  lint, unit/component tests, production build, dependency audit,
  secret scan, link check) and recorded what could and could not be
  run (no automated end-to-end or API test suite exists in this
  project) — all in `TEST_REPORT.md` §6, with nothing hidden.
- Completed documentation: new `README.md` (repository root and
  `web/`), `DEPLOYMENT.md`, and `OPERATIONS_MANUAL.md`; reviewed and
  corrected `CLAUDE.md`'s project-status section (which had not been
  updated since Day 4).
- Prepared (but did not execute) the full deployment checklist,
  environment-variable list, hosting/domain/DNS instructions, database
  migration/backup/restoration procedures, monitoring configuration,
  rollback procedure, and post-deployment verification steps — all in
  `DEPLOYMENT.md`.
- Did not deploy anything, did not create any account or cloud
  resource, did not alter DNS, and did not claim the site is legally
  compliant or fully complete anywhere.

## Immediate next steps

1. **Fix and re-test the critical defect in `TEST_REPORT.md` §5 before
   anything else.** No other item on this list matters until the site
   can reliably stay online.
2. Every drafted legal/regulatory page (`/privacy-policy`,
   `/cookie-policy`, `/terms`, `/complaints`, `/fees`) needs a qualified
   UK solicitor's review before it can be relied upon — see
   `REGULATORY_READINESS.md`.
3. Decisions still needed from the owner before any of this work can go
   live for real visitors:
   - An email/notification provider, with approved recipient addresses,
     reply-to addresses, wording, and retention rule.
   - Whether a CRM/agency software or property-portal agreement already
     exists.
   - A real authentication provider **must** be chosen before the admin
     area can ever be deployed anywhere public — see `ADMIN_AND_CMS.md`
     and `SECURITY.md`.
   - Whether a real AI provider is wanted at all for the assistant —
     the current rule-based assistant needs none of this.
   - A real, persistent, access-controlled database, before any real
     personal data is accepted.
   - A real domain name — `SEO_PLAN.md` and `NEXT_PUBLIC_SITE_URL`
     currently default to `localhost`.
   - Actual fee amounts, a complaints response timescale, and
     geographic coverage — each currently a visible Placeholder.
4. Owner still needs to supply the still-Missing items listed under "Day
   1 completeness check" above — particularly contact details (phone,
   email, opening hours).
5. Once the critical defect is fixed and every applicable item above is
   resolved or explicitly accepted, deployment remains gated on the
   owner stating exactly, and only then: **"I approve production
   deployment."**

## Open technical notes for later days

- **Resolved on Day 3:** Node.js 24 LTS is now installed on the owner's
  computer (via `winget`, with the owner's explicit approval), and this
  session has full command-line access to run `git`, `node`, `npm` etc.
  directly. The earlier blocker recorded here on Days 1–2 no longer
  applies.
- The chosen stack (Next.js, React, TypeScript, Tailwind CSS, Zod) is
  recorded and reasoned through in `TECHNICAL_ARCHITECTURE.md`. Database,
  CMS, email and hosting remain undecided — see `INTEGRATIONS.md`.
