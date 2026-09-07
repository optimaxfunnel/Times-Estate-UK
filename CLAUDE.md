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
- See `PROJECT_PLAN.md` for the day-by-day plan and current position.

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
| `SITEMAP.md` | Proposed information architecture and navigation (Day 2). |
| `USER_JOURNEYS.md` | Designed user journeys for every confirmed workflow (Day 2). |
| `.gitignore` | Files excluded from version control. |
| `.env.example` | Placeholder names for environment variables — never real secrets. |
| `TECHNICAL_ARCHITECTURE.md` | Chosen technology stack and reasoning (Day 3). |
| `INTEGRATIONS.md` | Comparison of external service options — none connected yet (Day 3). |
| `DESIGN_SYSTEM.md` | Approved design tokens and components (Day 3). |
| `TEST_REPORT.md` | Record of every check run against the application and its results (Day 3). |
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
