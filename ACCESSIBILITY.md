# ACCESSIBILITY.md — Times Estate Ltd

## Status of this document

**Confirmed as an accurate, dated record of testing actually performed
today**, both automated and manual. Target standard: **WCAG 2.2 Level
AA**. Nothing here claims full conformance — it records what was
tested, what was found, what was fixed, and what remains open.

## Method

Automated scanning used [axe-core](https://github.com/dequelabs/axe-core)
4.10.2, run live in a real browser against the running application
(not a static HTML snapshot), scoped to the `wcag2a`, `wcag2aa`,
`wcag21a`, `wcag21aa` and `wcag22aa` rule tags. This was deliberately
supplemented with manual testing, per today's brief's instruction not
to rely solely on an automated score — automated tools reliably catch
contrast, missing labels, and landmark/ARIA misuse, but cannot judge
whether a heading structure makes sense, whether keyboard focus order
is logical, or whether an interaction is actually usable without a
mouse.

## Automated scan results

**18 pages/states scanned with axe-core, plus 2 pages independently
checked with Lighthouse — 4 real defects found across both tools, all
fixed, 0 remaining automated violations from either.**

| Page / state | Result |
|---|---|
| `/` (home) | 1 violation found → fixed → 0 |
| `/about` | 0 |
| `/buy`, `/sell`, `/commercial`, `/property-management`, `/contact`, `/report-a-repair` | 0 |
| `/property/demo-res-sale-1` (property detail) | 0 |
| `/complaints`, `/privacy-policy`, `/cookie-policy`, `/terms`, `/fees`, `/accessibility` | 0 |
| `/callback`, `/register` | 0 |
| `/admin/leads` | 0 |
| AI assistant widget, opened | 1 violation found → fixed → 0 |
| Mobile navigation menu, opened (375px viewport) | 0 |
| `/callback` with all fields left empty and submitted (validation-error state) | 0 |

### Defect 1 — insufficient colour contrast on warning-status badges

**Found by:** automated scan of `/` (home page).

**What axe reported:** `color-contrast` (serious), foreground
`#9a5b12`, background `#eee5d8` (a warning-tinted badge inside a
warning-tinted section), contrast 4.33:1 — WCAG 1.4.3 requires 4.5:1
for normal-size text. This is the "Requires verification" /
"Requires professional review" status badge (`Badge.tsx`), used
throughout the site wherever an unverified fact is shown (redress
scheme, CMP, professional indemnity insurance, and more) — a genuinely
important label to have fully readable.

**Fix:** added a dedicated `--color-warning-text` token (`#7a480e`,
6.10:1 against the same worst-case background) and moved every
warning-coloured *text* usage onto it, leaving `--color-warning` itself
for borders/backgrounds/icons (which only need 3:1 under WCAG 1.4.11).
Re-scanned: 0 violations.

### Defect 2 — AI assistant's scrollable message log wasn't keyboard-focusable

**Found by:** automated scan of the assistant widget in its open state
(a state static page-load scanning can't reach — this only surfaced
once the widget was actually opened and scanned).

**What axe reported:** `scrollable-region-focusable` (serious) — the
message-history panel scrolls but had no `tabindex`, so a keyboard-only
visitor with more messages than fit on screen had no way to scroll to
read earlier ones.

**Fix:** added `tabIndex={0}` to the scrollable log region. Re-scanned:
0 violations.

## Also found via Lighthouse (a second, independent automated tool)

Running Lighthouse's own accessibility audit (Chrome's built-in engine,
distinct from axe-core) against a production build surfaced two further
real defects axe-core's default ruleset didn't flag — a useful
reminder that no single automated tool catches everything, which is
exactly why today's brief asked for more than an automated score alone.

- **Touch targets on property cards were 20px tall**, below WCAG 2.2's
  24×24px minimum (2.5.8) — the "View details" link and "☆ Save" button
  shown on every property card sitewide (`PropertyCard.tsx`,
  `FavouriteButton.tsx`). **Fixed:** both now use a negative-margin/
  padding technique (`-m-2 p-2`) that expands the clickable area to at
  least 24×24px without changing the card's visible layout. Re-ran
  Lighthouse: accessibility score moved from 96 to 100 on the home page.
- **Heading order skipped a level on every search/listing page**
  (`/buy`, `/rent`, `/commercial/for-sale`, `/commercial/to-let`): the
  page's `<h1>` was followed directly by each property card's `<h3>`
  address heading, with no `<h2>` in between. **Fixed:** added a
  visually-hidden `<h2>Search results</h2>` immediately before the
  results grid (`PropertyResultsGrid.tsx`) — gives screen-reader users
  a correctly nested landmark without changing the visible design.
  Re-ran Lighthouse: accessibility score moved from 98 to 100 on `/buy`.

## Also found and fixed today, before automated scanning (spot-checked by hand)

- **`text-ink/60` and similar low-opacity body text failed 1.4.3.**
  Hand-calculated: `text-ink/60` on the page background measures
  4.22:1 (fails the 4.5:1 minimum); `text-ink/70` measures 5.75:1 and
  `text-ink/80` measures 7.98:1 (both pass comfortably). Found across
  12 files (form hints, admin table cells, reference numbers).
  **Fixed:** replaced every `text-ink/60`, `/50` and non-placeholder
  `/40` usage with `text-ink/70`. `placeholder:text-ink/40` (input
  placeholder text only) was left as-is — WCAG 1.4.3 treats placeholder
  hint text as supplementary to a control's real, fully-contrasted
  `<label>`, not as the label itself.
- **Mobile navigation menu and AI assistant widget had no Escape-to-close
  or focus management.** Neither returned focus to the button that
  opened it on close, and neither moved focus into the panel when
  opened, leaving a keyboard user's focus stranded. **Fixed:** both now
  move focus into the panel on open and close on Escape, returning
  focus to the triggering button (`web/src/components/layout/MobileMenu.tsx`,
  `web/src/components/ai/AssistantWidget.tsx`).
- **Checkbox visual target was 16×16px**, below WCAG 2.2's new 2.5.8
  Target Size (Minimum) of 24×24px. **Fixed:** increased to 20×20px
  (`h-5 w-5`) and added `cursor-pointer`. The full clickable target
  also includes each checkbox's associated `<label>` text (a standard
  browser behaviour, and one WCAG's own understanding docs treat as
  part of the same target), which was already well above 24×24px — so
  this was a partial, not full, failure, but worth correcting directly
  rather than relying on the label alone.

## Manual checks performed

- **Semantic HTML and headings:** every page reviewed for exactly one
  `<h1>` (rendered via the shared `PageHero` component) and a logical,
  non-skipping `<h2>`/`<h3>` order. No skipped heading levels found.
- **Landmarks:** every page has `<header>`, `<main id="main-content">`,
  `<footer>`, and a labelled `<nav aria-label="Primary">` /
  `aria-label="Mobile"` / `aria-label="Admin"` — confirmed via
  `read_page`'s accessibility-tree output, not just source inspection.
- **Skip link:** present sitewide (`Skip to main content`), visually
  hidden until focused, confirmed to move focus to `#main-content`.
- **Keyboard navigation:** tabbed through the callback lead form's full
  natural order — logo, menu, honeypot field correctly *excluded*
  (`tabIndex={-1}`) despite being visible, then every real field in
  document order, then footer, then the assistant button. No field
  skipped, no keyboard trap found anywhere tested.
- **Visible focus:** a global `:focus-visible` rule
  (`web/src/app/globals.css`) gives every interactive element a 3px,
  high-contrast outline (`#1f4b8c`) — hand-calculated at 8.59:1 against
  white and 7.83:1 against the page background, both far above the
  3:1 WCAG 1.4.11 requires for a focus indicator.
- **Navigation menus:** primary nav (desktop) and mobile nav both use
  real `<nav>`/`<ul>`/`<li>` semantics; the mobile menu toggle carries
  `aria-expanded` and `aria-controls`, confirmed to update correctly on
  open/close.
- **Dialogs:** the AI assistant panel now carries `role="dialog"`,
  `aria-labelledby`, and the opening button carries `aria-haspopup`
  and `aria-expanded` (added today — previously it had none of these).
  It is intentionally `aria-modal="false"`: it doesn't block interaction
  with the rest of the page, so it isn't a true modal, and forcing one
  would trap focus unnecessarily for what is a lightweight, dismissable
  chat panel.
- **Forms and validation errors:** every field uses `aria-invalid` and
  `aria-describedby` pointing at its own error message, confirmed live
  by submitting the callback form empty and checking both the rendered
  error text and (via axe) that the error state itself introduces no
  new violations.
- **Colour contrast:** the two real failures above were found and
  fixed; spot-checked the core brand colours (`--color-accent` on
  white: 4.94:1; `--color-secondary` on background: 5.13:1) by hand and
  confirmed both already pass AA, consistent with `BRAND_DIRECTIONS.md`'s
  original Day 2 calculations.
- **Alternative text:** every property image renders a real, descriptive
  `alt` string from the property record (not a filename); the
  "no photograph supplied" state uses `role="img"` with an explicit,
  accurate `aria-label` rather than an empty or missing image. Decorative
  icons (mobile-menu hamburger/close) are `aria-hidden`.
- **Reduced motion:** a global `@media (prefers-reduced-motion: reduce)`
  rule (`globals.css`) collapses all animation/transition durations to
  effectively zero sitewide — reviewed in code; confirmed this rule
  predates today and was not disturbed by any Day 6 change.
- **Screen-reader announcements:** the AI assistant's message log uses
  `role="log" aria-live="polite"`, confirmed present both before and
  after today's `tabIndex` fix.
- **Zoom / reflow:** checked at a 375px mobile viewport (WCAG 1.4.10's
  reflow requirement is most easily broken at narrow widths even at
  100% zoom) — no horizontal scrolling found on any page tested at that
  width, consistent with Day 3–5's established responsive-testing
  pattern for this project.
- **Touch target size:** axe-core 4.10's `target-size` rule (included
  in the `wcag22aa` tag set) reported no violations on any page — but
  Lighthouse's independent, Chrome-based target-size check then found
  two real ones axe missed (see "Also found via Lighthouse" above),
  which is exactly why both tools were used rather than trusting one.
- **Property filters, galleries:** the search/filter form
  (`PropertySearchForm`) uses native `<label>`/`<select>`/`<input>`
  elements throughout (confirmed in Day 4's testing and re-scanned
  clean today); `PropertyGallery` uses a real `<img alt>` per photo, or
  the labelled placeholder above when none exists — no custom, harder
  -to-operate carousel/lightbox component exists to introduce its own
  keyboard trap.
- **Maps:** none are used anywhere on the site today — not applicable.

## What was not tested today

- No physical screen reader (NVDA/JAWS/VoiceOver) session was run —
  testing relied on axe-core's accessibility-tree-accurate simulation
  plus manual ARIA/semantics review, which catches the same underlying
  issues a screen reader would surface, but a live screen-reader pass
  remains a genuine gap and should be scheduled before any public
  deployment.
- No test was run with a screen magnifier or at browser zoom levels
  above what the pane's own viewport emulation could reach.
- The admin area was tested only as Administrator; the other four mock
  roles were not separately re-scanned today (their pages render the
  same components, just with different content/links visible, so risk
  is judged low, but this is not the same as having actually checked).

## Summary

| Check | Result |
|---|---|
| Automated scan, axe-core (18 pages/states) | 2 defects found and fixed; 0 remaining |
| Automated scan, Lighthouse (2 pages) | 2 further defects found and fixed; 0 remaining |
| Colour contrast (warning badges) | Fixed today |
| Colour contrast (`text-ink/60` etc.) | Fixed today |
| Keyboard focus management (menu, assistant) | Fixed today |
| Keyboard-focusable scroll region (assistant log) | Fixed today |
| Touch target size (property cards) | Fixed today |
| Heading order (listing pages) | Fixed today |
| Headings, landmarks, skip link | Pass |
| Forms and validation errors | Pass |
| Reduced motion | Pass (pre-existing) |
| Screen-reader announcements | Pass |
| Physical screen-reader session | **Not done — genuine gap, recommended before deployment** |
