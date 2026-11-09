# Times Estate Ltd — Website Project

A bespoke property website for **Times Estate Ltd**, an estate and
letting agency at Upper Tooting Road, London SW17: residential and
commercial sales, lettings and management, valuation and viewing
requests, repair reporting, property alerts, a controlled AI assistant
and a staff area for enquiries and listings.

**Status at 31 October 2026: built, tested and documented — not
deployed.** Nothing is live, no paid service has been bought, no DNS has
been changed and no customer data exists. Deployment needs the owner to
write exactly: **"I approve production deployment."**

## Start here (owner)

| If you want to… | Read |
|---|---|
| Know what's finished and what isn't | `REQUIREMENT_TRACEABILITY.md` (89 requirements, each with evidence) |
| Know what blocks launch | "What blocks launch" below, then `FINAL_LAUNCH_APPROVAL.md` |
| Use the staff area | `OPERATIONS_MANUAL.md` |
| See what was tested | `TEST_REPORT.md` (newest at the top) |
| Supply missing facts | `CONTENT_REQUIRED.md`, `CONTENT_VERIFICATION_REGISTER.md` |
| Know the rules every contributor follows | `CLAUDE.md` |

## Start here (developer)

```bash
cd web
npm install
npm run dev          # http://localhost:3000
npx vitest run       # 266 tests (2026-11-09; see TEST_REPORT.md)
npx next build       # production build
```

Then read `TECHNICAL_ARCHITECTURE.md`, `TECHNICAL_HANDOVER.md`,
`SECURITY.md` and `DEPLOYMENT.md`. Settings are listed in `.env.example`
(placeholders only — never commit real values).

**Key code patterns:** every outside service sits behind a small
"provider" interface with a safe demonstration version (properties,
leads, AI, file storage, property feed), so a real service can be
plugged in later without rewriting pages. Server actions must **never**
bind arguments (`action.bind(...)`) — that caused the critical
server-hang fixed on Day 7; a test enforces it.

## What blocks launch

1. ~~Next.js security update~~ — **done 2026-11-09** (owner approved;
   now 16.4.5, website dependencies have 0 known vulnerabilities).
2. ~~A database~~ — **connected 2026-11-09** (Supabase, project in Ireland).
   Still to do: confirm the Pro plan and DPA, and test a backup restore
   (`DEPLOYMENT.md` §11).
3. **Real staff sign-in with two-step verification** — the current
   sign-in is for testing only and switches off on the live site.
4. **Fees** — tenant and landlord fees and VAT position must be
   published.
5. **Verification** of the Property Redress Scheme and Client Money
   Protect memberships.
6. **Solicitor / compliance review** of legal pages, complaints
   timescales and emergency wording.

## Repository layout

| Path | What it is |
|---|---|
| `web/` | The website (Next.js 16, React 19, TypeScript, Tailwind) |
| `*.md` (root) | Project documents — see the map in `CLAUDE.md` |
| `brand/` | Logo and brand files |
| `segment-1/` | October audit set (live-site URLs, compliance register) |
| `qa-screenshots/` | Test screenshots (kept on the owner's PC, not in git) |

## The permanent rules (summary — full text in `CLAUDE.md`)

No invented facts · demonstration content always labelled · owner's
work never overwritten · approval before paid services, integrations,
credentials, publishing or anything destructive · legal and pricing
decisions stay with the owner · no deployment without the exact
approval phrase · all checks recorded before recommending deployment ·
documents readable by a non-technical owner.
