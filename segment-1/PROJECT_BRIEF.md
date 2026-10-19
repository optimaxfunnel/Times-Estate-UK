# PROJECT_BRIEF.md — Times Estate Ltd (Segment 1 edition, 2026-10-19)

This brief restates the commission as given on 2026-10-19 and records
what Segment 1 established. It supersedes the Phase 1 brief of
2026-09-08 (`/PROJECT_BRIEF.md` at the repository root, which remains in
place) for strategic direction; `BUSINESS_REQUIREMENTS.md` and
`CONTENT_VERIFICATION_REGISTER.md` remain the fact registers.

## The commission

| | |
|---|---|
| Client | Times Estate Ltd, company 09597081, registered office 145 Upper Tooting Road, London SW17 7TJ (Confirmed, Companies House 2026-10-19) |
| Decision-maker | Mohammad Muzaffar Malik, director |
| Existing web presence | `https://www.timesestates.co.uk` — WordPress/Houzez site built by a third-party agency, content last changed January 2022 (legal pages late 2024) |
| Existing build | `web/` in this repository — Next.js 16 application, 33 routes, no database, no integrations, not deployed |
| Market | London and surrounding suburbs; the live site names Tooting, Mitcham, Streatham, Balham, Colliers Wood, Wimbledon, Clapham and nearby — coverage to be confirmed |
| Services (subject to verification) | Residential and commercial sales, lettings and property management; a "guaranteed rent" scheme appears on the live site and needs review; construction/renovation is a related business kept to a mention |
| Quality target | Strategy, design and engineering at the standard of a £50,000 professional commission — an internal yardstick, never published |
| Reference standards | Zoopla, Rightmove, Foxtons for search, valuation, filtering, cards, area guides and landlord journeys only; no brand, wording, layout, code, icon, image or trade dress reuse |
| Controlling brand assets | `logo times estates.jpeg` and `front page times estatess.jpeg`, preserved unchanged; analysed in `BRAND_SOURCE_AUDIT.md` |
| Colour family (measured) | Ivory #FEFEFE, ink #131619, copper #984E15, bronze #E1903F, warm gold #F8AE58, with the mock-up's action orange #FA641F; accessible companions #D34605, #AD641B, #B16207, #C4651B |
| Visual character to retain | Wordmark, London skyline/landmark theme, clock/time concept, editorial serif personality, "London Property Experts" positioning (claim under review) |

## Governing constraints

The eight permanent rules in the repository's `CLAUDE.md` apply
throughout: no invented facts; demo content labelled; preserve
owner-created work; approval before paid services, integrations,
credentials, publishing or destructive operations; owner controls
pricing, legal wording and compliance positions; no deployment without
the exact phrase "I approve production deployment"; checks before any
deployment recommendation; documentation readable by a non-technical
owner. Segment 1 added: no redesign, no new packages, no paid services,
no production changes, no DNS change, no deploy.

## Segments (proposed, for the owner to confirm)

1. **Audit and compliance baseline** — this document set. *Gate 1.*
2. **Facts, identity and architecture decisions** — answers to the first
   seven questions; logo ownership resolved; faithful vector redraw of
   the supplied mark approved or commissioned; design tokens approved;
   Next.js upgrade and persistence/auth/email providers chosen (each a
   Rule 4 approval). *Gate 2.*
3. **Design system and homepage** — tokens, typography, components, the
   homepage direction from the mock-up with real content only. *Gate 3.*
4. **Journeys** — search, listing, valuation, landlord, tenant, repair,
   commercial; material-information enforcement in the admin workflow;
   legal pages in solicitor-reviewed form. *Gate 4.*
5. **Data and integrations** — property feed/CRM, email routing,
   analytics with consent, maps if approved. *Gate 5.*
6. **QA, accessibility, performance, security** — on a production build
   and on the owner's machine (hang defect). *Gate 6.*
7. **Launch readiness** — redirects from the 20 live URLs, DNS plan,
   hosting, monitoring, rollback; executed only on the approval phrase.
   *Final gate.*

## What Segment 1 found, in one paragraph

The repository is a sound, honest foundation with one critical
dependency advisory to patch and three structural gaps (persistence,
authentication, email) that were already known. The live site is an
unmaintained template with stale listings, unverifiable claims, missing
statutory disclosures and a privacy notice that names the wrong company;
it should be replaced, with every indexed URL redirected. The supplied
logo is a phone screenshot of a raster image and cannot be used as-is;
its colours have been measured and an accessible token set proposed.
Regulatory status is mostly unverified rather than known-bad: the
company facts are confirmed, redress and CMP memberships are quoted but
not confirmed with the schemes, and nothing yet evidences AML
supervision, deposit protection, ICO registration, fees or asset
licences.
