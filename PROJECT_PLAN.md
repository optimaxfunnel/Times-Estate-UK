# PROJECT_PLAN.md — Times Estate Ltd Website

## Purpose

This is the working plan for the bespoke Times Estate Ltd website build.
It records the day-by-day scope agreed with the business owner, what has
actually been completed, and what is proposed next. Nothing below Day 1 has
been started — days 2–7 are a proposed sequence for the owner to review and
adjust, not a commitment already in motion.

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

### Day 5 — Automated workflows

- Valuation requests, viewing requests, repair reporting, property
  enquiries, and lead-management automation — built against confirmed
  requirements, with any third-party integration (CRM, property feed,
  email, AI provider) requiring explicit approval before connection.

### Day 6 — Quality assurance

- Security review, accessibility review (WCAG 2.2 AA target), responsive
  testing across breakpoints, functional testing of every form and
  workflow, performance testing, cross-browser checks.
- Findings logged and fixed before any deployment recommendation.

### Day 7 — Review and launch readiness

- Full walkthrough with the owner.
- Final content verification against `CONTENT_VERIFICATION_REGISTER.md` —
  nothing with a status other than Confirmed goes live.
- Deployment is only carried out once the owner states exactly:
  **"I approve production deployment."**

## Immediate next steps (Day 5 starting position)

1. The property data model, admin/approval workflow, and full search and
   listing experience all exist and are tested (`web/`) — Day 5's
   automated workflows (valuation/viewing/repair/enquiry notifications)
   can build on this directly.
2. Decisions needed from the owner before Day 5 can go further:
   - An email/notification provider (see `INTEGRATIONS.md`) — every
     enquiry form today validates and logs locally but sends nothing.
   - Whether a CRM/agency software or property-portal agreement already
     exists (see `INTEGRATIONS.md`'s CRM section, added Day 4) — this
     determines whether Day 5 connects a real `PropertyProvider` or
     continues with the admin area's manual entry.
   - A real authentication provider **must** be chosen before the admin
     area (`/admin`) can ever be deployed anywhere public — see
     `ADMIN_AND_CMS.md`.
3. Owner still needs to supply the still-Missing items listed under "Day
   1 completeness check" above — particularly contact details (phone,
   email, opening hours) and geographic coverage.
4. Day 5 begins with automated workflows, once the email/notification
   provider is approved.

## Open technical notes for later days

- **Resolved on Day 3:** Node.js 24 LTS is now installed on the owner's
  computer (via `winget`, with the owner's explicit approval), and this
  session has full command-line access to run `git`, `node`, `npm` etc.
  directly. The earlier blocker recorded here on Days 1–2 no longer
  applies.
- The chosen stack (Next.js, React, TypeScript, Tailwind CSS, Zod) is
  recorded and reasoned through in `TECHNICAL_ARCHITECTURE.md`. Database,
  CMS, email and hosting remain undecided — see `INTEGRATIONS.md`.
