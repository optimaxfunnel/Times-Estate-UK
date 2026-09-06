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

### Day 2 — Information architecture and technical foundation (proposed)

- Review answers to Day 1's business-discovery questions.
- Confirm sitemap and information architecture covering all confirmed
  services (residential/commercial sales, lettings, property management;
  valuations; viewings; repairs; enquiries; AI assistance; lead automation).
- Confirm technology stack (proposed: Next.js + TypeScript front end,
  a headless CMS for editable content, a managed Postgres database) —
  subject to the owner's approval of any paid tier.
- Scaffold the application skeleton only after the above is agreed —
  still no visual design at this stage.

### Day 3 — Visual design direction

- Produce brand-aligned design concepts (once logo/colours/photography
  are supplied or a placeholder brand direction is agreed as clearly
  labelled demo material).
- Confirm design direction with the owner before building real pages.

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

## Immediate next steps (Day 2 starting position)

1. Owner answers the Day 1 business-discovery questions (see chat).
2. Owner supplies or confirms availability of: logo, brand colours,
   photography, property records, and example websites they like.
3. Once received, Day 2 begins with sitemap/IA and technology-stack
   confirmation — not before.

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
