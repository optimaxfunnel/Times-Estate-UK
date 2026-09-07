# TEST_REPORT.md — Times Estate Ltd

**Date:** 7 September 2026 (Day 3)
**Scope:** Every check listed in today's brief, run against the newly
scaffolded application in `web/`. All commands were actually executed —
nothing below is assumed or estimated.

## 1. TypeScript check

```
cd web
npm run typecheck   # tsc --noEmit
```
**Result: Pass, 0 errors.** (One real error was found and fixed during
development — a type-narrowing issue in `src/lib/actions.ts` — before this
final clean run.)

## 2. Linting

```
npm run lint   # eslint
```
**Result: Pass, 0 errors, 0 warnings.**

## 3. Component tests

```
npm run test   # vitest run
```
**Result: Pass — 3 test files, 5 tests, all passing.**

Tests written today deliberately check things that matter for this
project's rules, not just that components render:
- `Badge.test.tsx` — status labels read correctly (Missing, Requires
  verification).
- `PropertyCard.test.tsx` — demo property data is always visibly marked
  "Sample property — not real" (Rule 2).
- `Header.test.tsx` — the primary navigation is reachable as an
  accessible landmark, and "Book a Valuation" (the top business priority)
  is always present.

## 4. Production build

```
npm run build   # next build
```
**Result: Pass.** All 13 pages built successfully as static content:
`/`, `/about`, `/commercial`, `/complaints`, `/contact`, `/cookie-policy`,
`/let`, `/privacy-policy`, `/property-management`, `/residential`,
`/sell`, `/terms`, plus the `/_not-found` page.

## 5. Dependency audit

```
npm audit
```
**Result: 0 vulnerabilities**, run after every install today (initial
scaffold, and again after adding testing/validation packages).

**Flagged, not resolved:** npm reported that one transitive dependency
(`unrs-resolver`, used internally by an ESLint plugin) has a postinstall
script that hasn't been reviewed or approved. It was **not** approved
today — `npm approve-scripts` was never run. This is a low-risk, well-known
package, but flagging rather than silently allowing scripts to run matches
this project's security posture.

## 6. Secret scan

- Confirmed `.env` is not tracked by git (`git ls-files` returns nothing).
- Searched all source files for common secret patterns (API keys, tokens,
  passwords) — none found.
- Confirmed via a dry-run `git add` that `node_modules/` and `.next/` are
  correctly excluded from version control by `.gitignore`.

## 7. Accessibility checks

Performed directly in a running browser (not just linting):
- **Keyboard focus:** pressed the real Tab key and confirmed, via the
  browser's computed styles, that the focus ring (`:focus-visible`) is a
  clearly visible 3px navy-blue outline on the first link in the page —
  not merely present in the CSS file, but actually applied on real
  keyboard navigation.
- **Reduced motion:** confirmed the `prefers-reduced-motion` rule is
  present in the actual stylesheet served to the browser.
- **Skip link:** present on every page (via the shared layout), letting
  keyboard users jump past the header.
- **Colour contrast:** the core text/background pairings were calculated
  by hand when the palette was approved (see `BRAND_DIRECTIONS.md`) —
  Ink Navy on Warm Off-White is 14.6:1, comfortably exceeding the WCAG
  AA/AAA requirement (4.5:1 / 7:1) for body text.
- Not done today: a full automated accessibility scan (e.g. axe-core) —
  this is recommended for Day 6's dedicated accessibility review rather
  than being treated as complete today.

## 8. Responsive testing — six breakpoints

Tested using the browser automation tool at: small mobile (375×812),
large mobile (428×926), tablet (768×1024), laptop (1366×768), desktop
(1920×1080), and wide desktop (2560×1440).

**A tooling limitation encountered:** the Browser pane's screenshot
capture in this environment does not reliably render full-width
screenshots above roughly 800px of visible width — wider viewports
produced zoomed-in, cropped images rather than a true scaled view. This
appears to be a limitation of the preview pane on this machine, not a
defect in the website. Where screenshots were unreliable, verification
was done instead by directly inspecting the live page's structure and
computed styles in the browser (page width, overflow, which navigation
was visible, focus styles) — a more precise check than a screenshot in
any case, and the method used for every non-mobile breakpoint below.

| Breakpoint | Horizontal overflow? | Navigation | Notes |
|---|---|---|---|
| Small mobile (375px) | None | Mobile menu | Confirmed by screenshot — clean, correctly stacked, all brand colours rendering correctly |
| Large mobile (428px) | Not explicitly checked | Mobile menu | Screenshot confirmed clean layout |
| Tablet (768px) | None (after fix) | Mobile menu | **Defect found and fixed** — see below |
| Laptop (1366px) | None | Full desktop menu | Confirmed via computed styles |
| Desktop (1920px) | None | Full desktop menu | Confirmed via computed styles |
| Wide desktop (2560px) | None | Full desktop menu | Confirmed via computed styles |

### Defect found and corrected

**Issue:** at tablet width (768px), the header switched to the full
desktop navigation (logo + 7 nav links + "Book a Valuation" button all in
one row) because the mobile/desktop switch-over point was set at
Tailwind's `md` breakpoint (768px) — exactly the width being tested. There
wasn't enough horizontal room, so the logo wrapped onto three lines and
overlapped the "Book a Valuation" button.

**Fix:** moved the switch-over point from `md` (768px) to `lg` (1024px)
in `Header.tsx` and `MobileMenu.tsx`, so tablets get the mobile menu
(which has plenty of room) and only laptop-sized screens and above get
the full desktop navigation. Re-tested and confirmed fixed.

**A second, smaller issue** was found and fixed during mobile-menu
testing: the open mobile menu (a dropdown, not a full-screen overlay)
didn't quite reach the bottom of the screen, letting the page underneath
peek through at the very bottom edge. Fixed by making the open menu
cover the full remaining screen height.

## 9. Functional testing (forms)

Tested directly against a running local copy of the site (not just
visually):
- Submitting the Sell page's valuation form **empty** correctly returned
  four field-specific error messages (name, email, phone, privacy consent)
  from the server — proving server-side validation works independently of
  whatever the browser does.
- Submitting the same form with valid details returned a success message
  ("Thank you — your enquiry has been received…") and the submission was
  correctly logged server-side.
- Confirmed in the dev server's own log output that the submission was
  captured with the correct form type label (`sales-valuation`) and all
  submitted fields.
- **Important reminder for later days:** this only logs to the local
  server console today. No real email or CRM notification is sent — see
  `INTEGRATIONS.md`. A genuine enquiry submitted on a live version of
  today's code would currently be lost, which is exactly why this must
  not be deployed before Day 5's automation work is approved and built.

## 10. Remaining defects / known limitations at end of Day 3

- The Browser pane's screenshot tool cannot reliably capture full-width
  desktop screenshots in this environment (see Section 8) — worth
  revisiting with a different testing approach (e.g. Playwright screenshots
  run from the command line) on Day 6 if visual regression testing is
  wanted.
- No automated accessibility scan (e.g. axe-core) has been run yet —
  planned for Day 6.
- The `unrs-resolver` install-script approval remains outstanding (see
  Section 5) — low risk, but not yet actioned either way.
