# Times Estate Ltd — Website Project

A bespoke, premium website build for Times Estate Ltd, a London estate
agency. This file is the starting point for anyone opening this
repository for the first time — the business owner, a developer taking
over the project, or a reviewer.

## Start here

- **If you are the business owner:** read `PROJECT_PLAN.md` for what's
  been built and what's still needed from you, then the end-of-day
  report for Day 7 (given separately) for the current, plain-English
  state of the project.
- **If you are a developer:** read `TECHNICAL_ARCHITECTURE.md`, then
  `web/README.md` for how to run the application locally.
- **If you are reviewing for launch readiness:** start with
  `TEST_REPORT.md` (the latest test results, including any unresolved
  defects) and `DEPLOYMENT.md` (what's needed before deployment can be
  approved).

## What this project is

Scope: residential sales, lettings and property management; commercial
sales, lettings and property management; valuation requests; viewing
requests; repair reporting; property enquiries; a controlled AI
assistant; lead-management automation. See `BUSINESS_REQUIREMENTS.md`
for the confirmed scope and facts, and `CLAUDE.md` for the permanent
rules this project operates under (no invented facts, no deployment
without explicit written approval, and more).

## Project status

Days 1–7 of a 7-day build are complete. **Nothing has been deployed.**
See `PROJECT_PLAN.md` for the full day-by-day record, and
`TEST_REPORT.md` for the current, dated test results — including one
unresolved critical defect that must be fixed before any deployment.

## Repository structure

| Path | What it is |
|---|---|
| `web/` | The Next.js application itself. |
| Everything else at the repository root | Project-control documentation — planning, content verification, design, security, accessibility, SEO, and operational documents. See the table below. |

## Documentation map

| Document | Purpose |
|---|---|
| `CLAUDE.md` | Permanent project rules and current status — read this first. |
| `PROJECT_PLAN.md` | Day-by-day plan, what's done, what's next. |
| `BUSINESS_REQUIREMENTS.md` | Confirmed scope, services and business facts, each with a verification status. |
| `CONTENT_REQUIRED.md` | Checklist of content still needed from the owner. |
| `CONTENT_VERIFICATION_REGISTER.md` | Master log of every fact/content item and its status. |
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
| `REGULATORY_READINESS.md` | UK legal/regulatory topics reviewed — not a compliance claim. |
| `TEST_REPORT.md` | The latest full test run and its results — **read before any deployment decision.** |
| `DEPLOYMENT.md` | Deployment checklist, environment variables, rollback procedure — prepared, not executed. |
| `OPERATIONS_MANUAL.md` | Day-to-day guide for staff using the finished site. |
| `.env.example` | Placeholder environment-variable names — never real secrets. |

## The permanent rules

This project is governed by eight permanent rules in `CLAUDE.md`,
most importantly: **nothing is deployed to a public or production
environment until the business owner states exactly "I approve
production deployment."** No other form of approval counts.

## Current top blocker

As of the Day 7 test report, a critical defect exists where certain
form submissions can make the entire server unresponsive to every
visitor. **This must be resolved before deployment can be considered,**
regardless of any other item's readiness. See `TEST_REPORT.md` §5.
