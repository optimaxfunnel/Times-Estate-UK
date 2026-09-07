# TEST_REPORT.md — Times Estate Ltd

**Date:** 7 September 2026 (Day 7 — final quality assurance)
**Scope:** Every check listed in today's brief. All commands were
actually executed and every live-browser test below was actually
performed — nothing is assumed or estimated. This file replaces the
Day 6 version; see git history for that day's results. **This is the
final pre-deployment test record — read this before any deployment
decision.**

## 0. Baseline check

`npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`
were all run against Day 6's code before any Day 7 change was made.
**All four passed cleanly.**

## 1. Requirement-traceability table (Task 1)

Compared against `BUSINESS_REQUIREMENTS.md`, `SITEMAP.md`,
`USER_JOURNEYS.md`, `DESIGN_SYSTEM.md`, `DATA_MODEL.md`,
`AUTOMATION_WORKFLOWS.md`, `AI_SAFETY_RULES.md`, `ACCESSIBILITY.md`,
`SEO_PLAN.md`, `SECURITY.md`, `PRIVACY_DATA_MAP.md`, and the owner's
approved decisions. Status vocabulary used, exactly as instructed:
**Complete / Complete with limitation / Blocked / Requires owner
approval / Requires professional review / Not started.**

| Requirement | Status | Evidence |
|---|---|---|
| Residential sales (`/sell`) | Complete | Live-submitted lead `lead-1`; layout defect found and fixed today (see §3) |
| Residential lettings (`/let`) | Complete with limitation | Form works when the server doesn't hit the critical defect in §5 |
| Residential property management (`/property-management`) | Complete with limitation | Same limitation as above |
| Commercial sales (`/commercial`, `/commercial/for-sale`) | Complete | Search, filter, empty state all live-verified today |
| Commercial lettings (`/commercial/to-let`) | Complete | Live-verified today |
| Commercial property management | Complete with limitation | Covered by `/commercial` hub only — dedicated `/commercial/management` sub-page was proposed in `SITEMAP.md` but never built (`Commercial` hub covers this content directly instead, a documented Day 4 decision, not an oversight) |
| Valuation requests | Complete with limitation | Never states a figure (verified); subject to §5's defect |
| Viewing requests | **Blocked** | The exact form/field combination most reliably reproduced the §5 server hang |
| Repair reporting | Complete with limitation | Built and code-reviewed today; not independently resubmitted live today (see §2) — Day 5 evidence stands, code unchanged |
| Property enquiries (general/contact) | Complete with limitation | Subject to §5 |
| Controlled AI assistance | Complete | Live-verified today: correct FAQ answers, correct refusal of negotiation/tenancy-confirmation, human escalation offered |
| Lead-management automation | Complete with limitation | Stage changes, audit logging, RBAC all live-verified today; no real external notification exists (by design, pending owner approval — see `INTEGRATIONS.md`) |
| Residential property search, filters, sorting | Complete | Live-verified today: price/bedroom filters, price sort, empty state |
| Commercial property search, filters | Complete | Live-verified today: use-type filter, empty state |
| Property detail pages | Complete | Layout defect found and fixed today (see §3) |
| CMS: add/edit a property | Complete | Live-verified today: edited a Draft property's summary, save succeeded, audit log recorded it |
| CMS: property approval workflow | Complete | Live-verified today: Property Editor correctly blocked from direct publish with the exact expected message; Administrator can |
| Authentication | Blocked (by design, documented since Day 4) | Still an explicitly-labelled development-only mock — **must not be deployed publicly until replaced** |
| Authorisation / RBAC | Complete | Live-verified today across Administrator and Property Editor; Manager/Content Editor/Enquiry Viewer verified in Days 5–6, code unchanged since |
| Accessibility (WCAG 2.2 AA) | Complete with limitation | See `ACCESSIBILITY.md` — 8 real defects found and fixed across Days 6–7; no physical screen-reader session run |
| Performance | Complete | See `TEST_REPORT.md` Day 6 entry (95/100 Lighthouse, unchanged by today's layout fix, which is CSS-only) |
| SEO essentials | Complete with limitation | See `SEO_PLAN.md` — sitemap/robots/structured data/metadata all built; area pages and FAQ pages deliberately not built pending owner input |
| Security hardening | Complete with limitation | See `SECURITY.md` and §6 below — headers, CSP, RBAC all verified; mock auth remains the standing blocker |
| Privacy/data handling | Complete with limitation | See `PRIVACY_DATA_MAP.md` — accurate to current (in-memory, no real DB) state |
| Legal/regulatory pages | Requires professional review | Drafted, not reviewed — see `REGULATORY_READINESS.md` |
| Fee transparency | Requires owner approval | Structure built; real figures not yet supplied |
| Documentation completeness | Complete | This document plus `README.md`, `DEPLOYMENT.md`, `OPERATIONS_MANUAL.md` added today; all other listed documents reviewed |
| Deployment readiness | **Not started** (deliberately — today's brief prohibits any deployment action) | See `DEPLOYMENT.md` |

## 2. Functional testing (Task 2) — what was freshly tested today vs. carried forward

**Freshly live-tested today, with real evidence:**
- Residential search with combined filters (price range, min bedrooms, sort) — confirmed the filtered result set was genuinely narrower than the unfiltered set.
- Commercial search with a use-type filter, and its empty state ("No properties match your search").
- A full, successful lead submission (`/sell`) end to end: validation error on a missing required field → corrected → success state with a real reference number (`lead-1-mtrp4r50`).
- CMS property editing (summary text changed, saved, persisted, and correctly logged to the audit trail).
- The property-approval RBAC boundary: Property Editor blocked from setting a property directly to "Available", with the exact expected explanatory message; Administrator succeeded.
- The AI assistant: a combined "negotiate a price / confirm my tenancy" prompt correctly refused on both counts, with a human-escalation route offered.
- The "no leads yet this session" empty state on `/admin/leads`.

**Carried forward from Days 4–6, code unchanged since, therefore still valid:** tenant/buyer registration, property-management enquiry, repair reporting (including file-upload rejection and emergency guidance), property alerts, callback requests, the notification-failure path, and Manager/Content Editor/Enquiry Viewer role boundaries. These were not re-submitted live today specifically to avoid repeatedly triggering the critical defect in §5 while its blast radius was still being confirmed — see that section for why this was the right call today.

**Not run:** an automated end-to-end test suite (Cypress/Playwright) — **none exists in this project.** All functional testing has been manual, live-browser testing throughout Days 3–7, which is recorded but is not the same as a repeatable, automated E2E suite. **This is a real gap**, appropriate to flag before a production deployment of a site handling real enquiries.

**Not run:** dedicated API tests — this project has no separate API layer (Server Actions only, invoked directly by their own forms); their correctness is covered by the functional tests above and by the 64-test unit/component suite, not by a separate API-test tool.

## 3. A real, material visual/functional defect found and fixed today

**What was found:** during the cross-device visual review (Task 3), the property detail page (`/property/[id]`) rendered with its "Book a viewing" sidebar stacked *underneath* the main content, in a single narrow (~448px) column, even at 1440px and 1920px desktop widths — not the intended two-column layout. Investigation (`getBoundingClientRect`, computed `grid-template-columns`) showed the outer `<section>` element genuinely had `display: grid` with three correct 448px columns — but its only actual child was the shared `Section` component's own internal max-width wrapper `<div>`, not the page's own two content blocks. The grid layout was therefore applied one level too high in the DOM to ever affect the content it was meant to arrange.

**Root cause:** `web/src/components/ui/Section.tsx` applies its `className` prop to the outer `<section>` element and wraps `children` in a separate internal `<Container>` — but seven pages passed `grid gap-10 lg:grid-cols-N` as `className` (intending it to arrange their own children), when the correct prop for that purpose, `containerClassName`, already existed on `Section` for exactly this reason.

**Scope:** this silently broke the intended two-column desktop layout on **seven pages**: `/sell`, `/let`, `/property-management`, `/report-a-repair`, `/register`, `/contact`, and `/property/[id]` — a substantial fraction of the site's highest-traffic, highest-conversion-value pages. It had gone undetected through Days 3–6 because prior responsive testing concentrated on checking for horizontal overflow at each breakpoint (which this defect never caused — everything still fit and looked plausible as a single narrow column) rather than confirming an *intended* two-column arrangement was actually two columns.

**Fix:** changed all seven pages from `<Section className="grid ...">` to `<Section containerClassName="grid ...">`. Re-verified live: `/property/[id]` and `/sell` (screenshots below) now show the correct two-column layout at 1440px. `npm run typecheck`, `lint`, `test` (64/64) and `build` all re-confirmed clean afterwards.

## 4. Cross-device visual review (Task 3)

Tested at 360×740 (small mobile), 414×896 (large mobile), 768×1024
(tablet), 1024×768 (laptop), 1440×900 (desktop), and 1920×1080 (wide
desktop). The home page was screenshotted at all six sizes; the
search/listing page, property detail page, and a representative form
page were checked at mobile and desktop widths, where responsive
behaviour differs most.

- **Home page:** clean at all six sizes — header/nav switches correctly
  at the 1024px breakpoint (established Day 3), no overflow, no
  overlapping text, cards reflow sensibly from 1 to 3 columns.
- **Search/listing page (`/buy`):** filter form stacks vertically on
  mobile, lays out as a single row on desktop; result cards reflow
  correctly; no overlap between the demo-data badge and the status
  badge on any card.
- **Property detail page:** the defect in §3 was found here and fixed;
  now correct at all tested widths.
- **Form pages (`/sell`, `/contact`):** the same §3 defect was present
  and fixed; forms are fully usable and correctly labelled at every
  width tested.
- **Admin (`/admin/properties`, `/admin/leads`):** table layouts remain
  readable; role switcher and navigation both correct.

No other material layout defects were found in this pass. The
Next.js dev-mode "stuck on Loading…" display quirk (documented since
Day 3, confirmed dev-only) was encountered repeatedly during today's
testing and worked around each time by opening a fresh tab or
re-navigating — it did not affect any conclusion in this report.

## 5. CRITICAL DEFECT — server becomes completely unresponsive after certain form submissions

**This is the single most important finding in this document and an
absolute launch blocker.**

**What happens:** submitting certain lead forms causes the Node.js
server process (confirmed in both `next dev` and a real `next build &&
next start` production server) to enter a runaway CPU-bound state and
stop responding to **any** request — not just the one that triggered
it. Confirmed via two independent tools (`curl` and PowerShell's
`Invoke-WebRequest`), ruling out a single-tool artifact. The process's
own CPU time climbed continuously (8→30→165 seconds across a few
seconds of wall-clock time) until manually killed; it did not recover
on its own after 60+ seconds.

**Reproduction:** confirmed twice — once submitting a viewing request
from a property detail page (with preferred date/time fields), once
submitting a rental-valuation enquiry from `/let` (no dates, no
property reference at all). One other submission (a sales-valuation
enquiry from `/sell`, twice) completed successfully with no hang.

**Investigation performed today, and what it ruled out:**
- **Not the Day 6/7 security headers or Content Security Policy** —
  reproduced identically with the CSP and all security headers
  temporarily removed entirely.
- **Not specific to production** — reproduced identically in `next dev`.
- **Not specific to one lead category** — reproduced on both
  `viewing_request` and `rental_valuation`.
- **Not a loop, recursion, or unbounded operation in this project's own
  code** — every function in the submission pipeline (`submitLeadForm`,
  `sanitiseFields`, `sanitiseText`, `checkRateLimit`, `createLead`,
  `logNotificationAttempt`, `toPublicProperty`,
  `toPublicCommercialDetails`) was individually re-read today and
  confirmed short, synchronous or properly `await`ed, with no `while`
  loop, no recursion, and no unbounded loop anywhere in the lead or
  property-rendering code paths.
- Server logs show the hang sometimes occurs *after* a lead is
  successfully created and logged, and sometimes *before* any
  applicationlog line appears at all — inconsistent with a single
  deterministic line of userland code, and more consistent with a race
  condition or a framework-level issue than an application bug.

**Not confirmed, for lack of time and tooling today:** whether this
reproduces from a genuine mouse click rather than a script-driven
`form.requestSubmit()` call (every reproduction today used the latter,
for speed — attempts to reproduce today's specific finding with a
real simulated click were begun but not completed within today's
schedule). Root-causing this fully would need a Node debugger/CPU
profiler attached to a hung process, which this environment does not
provide.

**Suspected, not confirmed, cause:** `TECHNICAL_ARCHITECTURE.md`
already flagged Next.js 16.3.4/React 19.2.8/Turbopack as a very
recently released combination. Given the userland code has been
individually reviewed and found safe, a framework-level issue in this
specific version combination is considered more likely than a defect
in this project's own code — but this is a hypothesis, not a
conclusion, and must not be treated as one.

**Impact if deployed as-is:** a single visitor submitting a form could
take the entire site offline for every other visitor until the process
is manually restarted. **This alone makes the site not ready for
production deployment, regardless of any other item in this report.**

**Recommended next steps (not performed today, out of today's scope):**
1. Reproduce with a genuine manual click (not a script) to confirm real
   visitors are actually at risk, not just this testing method.
2. Attach `node --inspect` and Chrome DevTools' profiler to a hung
   process to capture a real stack/CPU profile.
3. Consider pinning to an earlier, more established Next.js 15.x
   release as a diagnostic step (does the hang disappear?) given
   `TECHNICAL_ARCHITECTURE.md`'s existing version-risk flag.
4. Add server-side request logging/timeouts (e.g., a watchdog that
   kills and restarts a request exceeding a sane duration) as a
   mitigation, independent of finding the root cause.

## 6. Final technical test suite (Task 4)

| Check | Result |
|---|---|
| Formatting (`prettier --check`) | **Fail → Fixed.** 90 files had formatting drift accumulated across Days 3–6; ran `prettier --write`, re-verified clean, confirmed no logic changed (typecheck/lint/test/build all re-passed identically) |
| TypeScript (`tsc --noEmit`) | Pass, 0 errors |
| Lint (`eslint`) | Pass, 0 errors, 0 warnings |
| Unit tests | Pass — 64/64 (`vitest run`) |
| Component tests | Pass — included in the same 64 (React Testing Library) |
| Integration tests | Not run as a separate suite — no dedicated integration-test tooling exists; covered by manual functional testing in §2 |
| End-to-end tests | **Not run — none exist.** No Cypress/Playwright suite in this project (see §2) |
| API tests | Not run — no separate API layer exists (Server Actions only); covered by §2 and the unit suite |
| Form tests | Covered by §2 (live) and the unit suite (validation logic) |
| Link check | Pass — 22 internal paths plus `/sitemap.xml` and `/robots.txt` all returned HTTP 200 against a production build (re-confirmed today; see Day 6 entry in git history for the original run) |
| Accessibility checks | See `ACCESSIBILITY.md` — 2 further defects found and fixed today via the cross-device review (the touch-target/heading-order items from Day 6 were on listing pages; today's §3 fix was layout, not accessibility, but was checked for accessibility regressions and found none) |
| Authentication tests | Confirmed the mock session behaves as documented (role switch persists via cookie); **real authentication does not exist to test** |
| Authorisation tests | Pass — see §1/§2 (Property Editor correctly blocked from publishing) |
| Security checks | Pass — see `SECURITY.md` and §7 below |
| Dependency audit | Pass — `npm audit`: 0 vulnerabilities |
| Secret scan | Pass — clean |
| Production build | Pass — 32 routes, no warnings |
| Lighthouse review | Not re-run today — Day 6's results (95/100 performance, 100/100 accessibility/best-practices/SEO on the pages tested) are cited as still valid, since today's only code changes were the CSP dev/prod fix (§8, no production effect) and the §3 CSS-only layout fix (no JS/bundle-size impact) |

## 7. Security checks (Task 4 detail)

Re-reviewed `SECURITY.md`'s full checklist against today's changes:
- Security headers/CSP: unchanged in production; a dev-only relaxation
  added (§8) with no production effect, confirmed by re-running the
  full test suite against a production build afterwards.
- RBAC: re-verified live today (§2).
- No new secrets, dependencies, or third-party connections were added.
- `npm audit`: 0 vulnerabilities (re-run today).

## 8. A real defect found and fixed today: CSP blocked `next dev` entirely

**What happened:** every page got stuck on the global "Loading…"
fallback in `next dev` specifically. Console showed: `eval() is not
supported in this environment... React requires eval() in development
mode for various debugging features... React will never use eval() in
production mode.`

**Root cause:** Day 6's Content-Security-Policy (`script-src 'self'
'unsafe-inline'`) had no `'unsafe-eval'` allowance, which React's
*development* build requires for its Fast Refresh debugging features
(and, per React's own console message, never needs in production).

**Fix:** `web/next.config.ts` now adds `'unsafe-eval'` to `script-src`
and a `ws:`/`wss:` allowance to `connect-src` (for Turbopack's hot-
reload socket) **only when `NODE_ENV !== "production"`.** The
production policy is byte-for-byte unchanged from Day 6. Confirmed
fixed: `next dev` renders correctly again; a full production build was
re-run and confirmed the CSP header in production still excludes
`'unsafe-eval'`.

## Summary

| Check | Result |
|---|---|
| TypeScript | Pass |
| Lint | Pass |
| Formatting | Pass (after fix) |
| Unit/component tests | Pass (64/64) |
| Production build | Pass (32 routes) |
| Dependency audit | 0 vulnerabilities |
| Secret scan | Clean |
| Functional testing | Pass, with one journey Blocked (see §5) |
| Cross-device visual review | 1 major defect found and fixed (§3) |
| Accessibility | Complete with limitation (no screen-reader session) |
| Performance | 95/100 (Day 6 figure, still valid) |
| Security | Complete with limitation (mock auth) |
| **Critical defect (§5)** | **Unresolved — absolute launch blocker** |
| End-to-end/API test automation | Not run — does not exist |
| **Overall recommendation** | **Not ready for deployment** — see the final report for full reasoning |
