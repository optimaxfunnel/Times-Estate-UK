# Times Estate Ltd — Website Project

A bespoke, premium website build for Times Estate Ltd, a London estate
agency. This file is the starting point for anyone opening this
repository for the first time — the business owner, a developer taking
over the project, or a reviewer.

## Start here

**As of 2026-09-08, six documents are the primary, current-state
reference — read these first:** `PROJECT_BRIEF.md` (what this project
is), `WEBSITE_AUDIT.md` (what's built, working, broken), `CONTENT_REGISTER.md`
(what's confirmed/missing), `COMPLIANCE_REGISTER.md` (regulatory
status), `DECISIONS.md` (why things were decided this way), and
`QA_REPORT.md` (latest QA snapshot).

- **If you are the business owner:** read `PROJECT_BRIEF.md` and
  `QA_REPORT.md`.
- **If you are a developer:** read `WEBSITE_AUDIT.md`, then
  `web/README.md` for how to run the application locally.
- **If you are reviewing for launch readiness:** start with
  `QA_REPORT.md` — it points to `TEST_REPORT.md` for full historical
  detail, including the unresolved critical defect.

The detailed Day 1–7 documents these six summarise
(`BUSINESS_REQUIREMENTS.md`, `CONTENT_VERIFICATION_REGISTER.md`,
`CONTENT_REQUIRED.md`, `REGULATORY_READINESS.md`, `TEST_REPORT.md`)
remain in the repository as historical background — still linked from
application code and other documents — but are no longer the first
place to look.

## What this project is

Scope: residential sales, lettings and property management; commercial
sales, lettings and property management; valuation requests; viewing
requests; repair reporting; property enquiries; a controlled AI
assistant; lead-management automation. See `PROJECT_BRIEF.md` for the
confirmed scope and facts, and `CLAUDE.md` for the permanent rules this
project operates under (no invented facts, no deployment without
explicit written approval, and more).

## Project status

Days 1–7 of a 7-day build, plus a Phase 1 audit pass, are complete.
**Nothing has been deployed.** See `PROJECT_PLAN.md` for the full
day-by-day record, and `QA_REPORT.md` for the current, dated test
results — including one unresolved critical defect that must be fixed
before any deployment.

## Repository structure

| Path | What it is |
|---|---|
| `web/` | The Next.js application itself. |
| Everything else at the repository root | Project-control documentation — planning, content verification, design, security, accessibility, SEO, and operational documents. See the table below. |

## Documentation map

| Document | Purpose |
|---|---|
| `CLAUDE.md` | Permanent project rules and current status — read this first. |
| ★ `PROJECT_BRIEF.md` | **PRIMARY.** Current strategic brief — company, contact facts, scope. |
| ★ `WEBSITE_AUDIT.md` | **PRIMARY.** Current audit — what's built, working, broken, reusable. |
| ★ `CONTENT_REGISTER.md` | **PRIMARY.** Current content classification (confirmed/missing/placeholder). |
| ★ `COMPLIANCE_REGISTER.md` | **PRIMARY.** Current regulatory register. |
| ★ `DECISIONS.md` | **PRIMARY.** Ongoing log of project judgement calls and why. |
| ★ `QA_REPORT.md` | **PRIMARY.** Current QA snapshot — **read before any deployment decision.** |
| `PROJECT_PLAN.md` | Day-by-day plan, what's done, what's next. |
| `BUSINESS_REQUIREMENTS.md` | Detailed historical fact register, superseded by `PROJECT_BRIEF.md`/`CONTENT_REGISTER.md` for current status. |
| `CONTENT_REQUIRED.md` | Detailed historical content checklist, superseded by `CONTENT_REGISTER.md`. |
| `CONTENT_VERIFICATION_REGISTER.md` | Detailed historical fact log (dated, sourced), superseded by `CONTENT_REGISTER.md` for current status. |
| `CHANGELOG.md` | Dated record of what changed and why. |
| `SITEMAP.md`, `USER_JOURNEYS.md` | Approved information architecture and user journeys. |
| `DESIGN_SYSTEM.md` | Colours, type, components. |
| `TECHNICAL_ARCHITECTURE.md` | Technology stack and reasoning. |
| `DATA_MODEL.md` | The property data model. |
| `ADMIN_AND_CMS.md` | Roles, permissions, and the (mock, not-yet-real) admin login. |
| `AUTOMATION_WORKFLOWS.md` | Per-category lead workflow and what needs approval before external communication. |
| `AI_SAFETY_RULES.md` | The AI assistant's behavioural contract. |
| `INTEGRATIONS.md` | Comparison of external services — none connected. |
| `SEO_PLAN.md` | Search-engine optimisation implementation and policy. |
| `ACCESSIBILITY.md` | WCAG 2.2 AA testing record. |
| `SECURITY.md` | Security review and hardening record. |
| `PRIVACY_DATA_MAP.md` | What personal data is collected and where it lives. |
| `REGULATORY_READINESS.md` | Detailed historical regulatory reasoning, superseded by `COMPLIANCE_REGISTER.md` for current status. |
| `TEST_REPORT.md` | Detailed historical test record, superseded by `QA_REPORT.md` for current status. |
| `DEPLOYMENT.md` | Deployment checklist, environment variables, rollback procedure — prepared, not executed. |
| `OPERATIONS_MANUAL.md` | Day-to-day guide for staff using the finished site. |
| `.env.example` | Placeholder environment-variable names — never real secrets. |

## The permanent rules

This project is governed by eight permanent rules in `CLAUDE.md`,
most importantly: **nothing is deployed to a public or production
environment until the business owner states exactly "I approve
production deployment."** No other form of approval counts.

## Current top blocker

A critical defect exists where certain form submissions can make the
entire server unresponsive to every visitor. **This must be resolved
before deployment can be considered,** regardless of any other item's
readiness. See `QA_REPORT.md`, or `TEST_REPORT.md` §5 for full detail.
