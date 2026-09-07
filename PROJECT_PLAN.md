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

### Day 3 — Brand confirmation and technical foundation (proposed)

- Owner approves or amends: business priorities, sitemap, user journeys,
  brand direction, and navigation structure (see Day 2 end-of-day
  approval request).
- Confirm technology stack (proposed: Next.js + TypeScript front end, a
  headless CMS for editable content, a managed Postgres database) —
  subject to the owner's approval of any paid tier.
- Scaffold the application skeleton only after the above is agreed —
  still no real content, since most required content remains Missing.

### Day 4 — Core page build (residential + commercial)

- Build confirmed page templates: home, service landing pages, property
  search and listing pages, about, contact.
- Use only confirmed or clearly labelled demo content.

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

## Immediate next steps (Day 3 starting position)

1. Business priorities, sitemap, user journeys and Brand Direction 1 are
   approved as a working baseline (2026-09-07) — Day 3 may proceed on
   this basis.
2. Owner still needs to supply the still-Missing items listed under "Day
   1 completeness check" above — particularly contact details (phone,
   email, opening hours), which are needed before several approved
   journeys can go live, and brand assets (logo, colours, photography) if
   the owner would rather use real assets than Direction 1's proposed
   palette/typography.
3. Day 3 begins with technology-stack confirmation and scaffolding.

## Open technical notes for later days

- This session currently has file read/write access to the project folder
  on the owner's computer, but no command-line access to that machine
  (no way to run `git`, `node`, `npm` etc. there remotely). Repository
  initialisation and dependency installation will need either a short
  set of commands run by the owner, or a session with that capability
  enabled. See the Day 1 end-of-day report for details.
- Proposed stack (Next.js/TypeScript, headless CMS, Postgres) is a
  recommendation for Day 2 discussion, not a decision — alternatives can
  be considered based on the owner's hosting preferences and budget.
