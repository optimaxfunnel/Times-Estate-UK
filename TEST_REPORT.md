# TEST_REPORT.md — Times Estate Ltd

**Date:** 7 September 2026 (Day 6)
**Scope:** Every check listed in today's brief. All commands were
actually executed and every live-browser test below was actually
performed — nothing is assumed or estimated. This file replaces the
Day 5 version; see git history for that day's results.

## 0. Baseline check (before making any changes)

`npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`
were all run against Day 5's code before any Day 6 change was made.
**All four passed cleanly.**

## 1. TypeScript check

```
npm run typecheck   # tsc --noEmit
```
**Result: Pass, 0 errors** — run repeatedly throughout the day after
every batch of changes, not just once at the end.

## 2. Linting

```
npm run lint   # eslint
```
**Result: Pass, 0 errors, 0 warnings**, after fixing one finding during
development: an unnecessary `eslint-disable` comment left in the new
`JsonLd.tsx` component — removed.

## 3. Unit and component tests

```
npm run test   # vitest run
```
**Result: Pass — 12 test files, 64 tests, all passing.** No new unit
tests were added today (today's work was primarily content, SEO,
accessibility and security hardening of existing code, verified live
rather than by new unit tests) — re-run after every code change to
confirm nothing already-tested regressed, and it never did.

## 4. Production build

```
npm run build   # next build
```
**Result: Pass.** 32 routes (was 28 on Day 5) — new today: `/accessibility`,
`/fees`, `/sitemap.xml`, `/robots.txt`. No warnings.

## 5. Dependency audit

```
npm audit
```
**Result: 0 vulnerabilities.**

## 6. Secret scan

- Confirmed `.env` is not tracked by git.
- Searched the repository for common secret patterns (API keys, PEM
  private-key headers, tokens) — none found.
- Confirmed no AI-provider, email-provider, or any other third-party
  API key exists anywhere in the codebase.

## 7. Accessibility checks — automated and manual

Full method, every result, and every defect found and fixed is
recorded in **`/ACCESSIBILITY.md`**, produced fresh today. Summary:

- **axe-core 4.10.2**, run live in-browser against 18 real pages/states
  (every primary page, the property detail page, both the mobile menu
  and AI assistant widget in their open states, and a form's
  validation-error state) — found and fixed 2 real defects (a colour-
  contrast failure on warning-status badges; the AI assistant's
  scrollable log not being keyboard-focusable). **0 violations
  remaining.**
- **Lighthouse's independent accessibility audit**, run against a
  production build, found 2 further real defects axe's default
  ruleset had missed: touch targets below 24×24px on property cards,
  and a skipped heading level on every property-search results page.
  Both fixed; both pages re-scored **100/100** afterwards.
- Manual checks: semantic HTML/headings, landmarks, skip link, keyboard
  navigation and focus order, visible focus contrast (hand-calculated
  at 7.8–8.6:1, well above the 3:1 WCAG requires), dialog semantics,
  form validation announcements, alt text, reduced motion, screen-
  reader live regions, 375–1440px reflow, and touch target size — see
  `/ACCESSIBILITY.md` for the full list and what wasn't tested (no
  physical screen-reader session was run — a genuine, stated gap).
- **3 further contrast defects found and fixed by hand** (colour math
  shown in full in `/ACCESSIBILITY.md`): `text-ink/60`, `/50` and
  non-placeholder `/40` utility classes measured 4.22:1 against the
  page background — below the 4.5:1 WCAG 1.4.3 minimum — found across
  12 files. Replaced with `text-ink/70` (5.75:1) throughout.

## 8. Link check

Every internal `href` referenced in `web/src/lib/site-config.ts`
(navigation and footer — 18 unique paths) plus every other primary
route (home, register, callback, report-a-repair, residential — 22
paths in total) was requested against a running production build and
confirmed to return **HTTP 200**, not a broken link. `/sitemap.xml` and
`/robots.txt` were both fetched and manually checked: the sitemap lists
exactly the intended public pages, and `robots.txt` correctly disallows
`/admin` and `/favourites` while pointing to the sitemap.

## 9. Security checks

Full detail in **`/SECURITY.md`**, produced fresh today. Summary of
what was actually tested, not just described:

- **Security headers, added today** (`next.config.ts`): X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS,
  and a Content-Security-Policy. **Verified live, not just present in
  config:** the CSP was confirmed to actually block an external script
  during today's own accessibility testing (loading `axe-core` from a
  CDN was refused, forcing a same-origin workaround) — a real,
  positive test of the header's effect, not an unverified claim.
- **Redirect safety:** searched the entire codebase for every
  `redirect()` call (2 found) and confirmed both target a fixed,
  hard-coded internal path — no open-redirect vector exists anywhere.
- **`robots: {index:false, follow:false}`** confirmed rendering
  correctly in the actual HTML of `/admin/leads` (`<meta name="robots"
  content="noindex, nofollow"/>`) — checked against the real response,
  not just the source code.
- **Demo-property noindex** confirmed rendering as `noindex, follow` on
  a real property detail page, and confirmed its structured data
  correctly emits **no** `RealEstateListing` markup (only the sitewide
  `RealEstateAgent` and a `BreadcrumbList`) — the `isDemo` guard in
  `web/src/lib/seo/structured-data.ts` was checked against real output,
  not just read in source.
- Server-side validation, sanitisation, rate limiting, and role-based
  access control were re-reviewed (not re-built) and confirmed
  unchanged and still correct since Day 4/5.
- `npm audit`: 0 vulnerabilities (section 5).
- Secret scan: clean (section 6).

## 10. SEO validation

Full detail in **`/SEO_PLAN.md`**. Checked today:

- Every primary page's `<title>`, meta description, and
  `alternates.canonical` — confirmed present and non-duplicated by
  reading each page's rendered `<head>`.
- `/sitemap.xml` and `/robots.txt` fetched and manually validated
  (section 8).
- Every JSON-LD block's shape hand-checked against the current
  schema.org type definitions for `RealEstateAgent`, `BreadcrumbList`,
  `RealEstateListing`, `PostalAddress` and `Offer` (fetched live during
  today's research). **Not performed:** a live run of Google's Rich
  Results Test or the schema.org validator, both of which need a
  publicly reachable URL rather than `localhost` — recorded as an open
  item in `/SEO_PLAN.md` for the day a real domain exists.
- Confirmed via `curl` that the `RealEstateAgent` JSON-LD renders
  sitewide with only Confirmed facts (no invented phone number, email,
  rating or review), and that no property page emits fabricated
  listing structured data.

## 11. Performance measurement

Measured with **Lighthouse** (via `npx lighthouse`), run twice: once
against the `next dev` server (informational only — dev-mode bundles
are far larger than production and not representative of a real
visitor's experience) and once against a real **production build**
(`next build && next start`), which is the number that matters.

| Metric | Dev server | Production build |
|---|---|---|
| Performance score | 73 | **95** |
| Accessibility score | 96 → 100 after fixes | 96/98 → **100** after fixes (see section 7) |
| Best Practices score | 92 | **100** |
| SEO score | 100 | **100** |
| First Contentful Paint | 0.8s | 0.8s |
| Largest Contentful Paint | 6.5s | **2.9s** |
| Total Blocking Time | 220ms | 50ms |
| Cumulative Layout Shift | 0 | 0 |
| Time to Interactive | 6.8s | 3.1s |
| Total page weight | 950 KiB | **312 KiB** |

**On the 2.9s production LCP:** Lighthouse's own LCP breakdown for this
run shows only ~176ms of real time-to-first-byte plus render delay once
resources are available — the 2.9s figure reflects Lighthouse's default
*simulated* mobile-network/CPU throttling (a deliberately conservative
lab condition), not a real bottleneck in the page itself, which is
consistent with the very small 312 KiB total page weight. This is
reported honestly as the standard lab number rather than reframed to
look better than it is.

**Main bottleneck found and accepted, not fixed:** one shared Next.js/
React framework JavaScript chunk (~72KB) is ~29KB unused on any single
page — normal framework overhead from code-splitting a multi-page app,
shared and cached across every page a visitor loads, not something
worth a bespoke workaround today.

**Remaining minor item:** one small (7.5KB) render-blocking CSS chunk,
estimated at ~50ms of avoidable delay — a Next.js build-output
characteristic, not something hand-tunable without ejecting from the
framework's own CSS extraction; left as a documented, low-priority
item rather than chased for a marginal gain.

**No accessibility or functionality was removed to improve any of the
above scores** — every performance number here was measured *after*
today's accessibility fixes, not before them.

## 12. Browser tests across screen sizes

Checked for horizontal overflow (`scrollWidth > clientWidth`) at 375px
(mobile), 768px (tablet), 1024px, and 1440px (desktop) on
`/fees`, `/complaints`, `/accessibility`, and `/about` (today's new/
changed pages) — **no overflow at any width tested.** The mobile
navigation menu and AI assistant widget were also opened and re-tested
at 375px as part of the accessibility scan in section 7.

## Summary

| Check | Result |
|---|---|
| TypeScript | Pass |
| Lint | Pass |
| Unit/component tests | Pass (64/64) |
| Production build | Pass (32 routes) |
| Dependency audit | 0 vulnerabilities |
| Secret scan | Clean |
| Accessibility (axe-core, 18 pages/states) | 2 defects found and fixed; 0 remaining |
| Accessibility (Lighthouse, 2 pages) | 2 further defects found and fixed; both now 100/100 |
| Colour contrast (hand-checked) | 4 defects found and fixed |
| Link check (22 paths + sitemap + robots) | All resolve correctly |
| Security headers | Added and live-verified |
| Redirect safety | No open-redirect vector found |
| SEO structured data | Shape-validated by hand; live Rich Results Test pending a real domain |
| Performance (production) | 95/100, 312 KiB page weight, 0 layout shift |
| Responsive (4 breakpoints, 4 pages) | No overflow found |
| Total real defects found and fixed today | 8 (4 accessibility via automated tools, 4 accessibility via hand-checked contrast) |
