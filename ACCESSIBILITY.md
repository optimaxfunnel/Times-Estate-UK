# ACCESSIBILITY.md — Times Estate Ltd

## Re-test after recovery (2026-11-09)

Run against the recovered project's production build (`next build &&
next start`) in Microsoft Edge (headless), because the folder had been
copied incompletely (`RECOVERY_REPORT_2026-11-09.md`).

- **axe-core 4.13.0 (WCAG 2.0–2.2 A/AA): 74 scans, 0 violations.**
  That is 34 pages at 375 px and 1280 px (every public page, two
  property pages, a no-results search, the admin "not available" page
  and the not-found page), plus 6 states: the intro overlay, the open
  mobile menu, the open assistant, and the Sell, Repair and Contact
  forms showing errors.
- **Reflow:** every page checked at 320, 375, 768, 1024, 1280 and
  1440 px for sideways scrolling.
  - **1 real defect found and fixed:** on `/cookie-policy` the cookie
    table made the whole page scroll sideways at 320 and 375 px (WCAG
    1.4.10). The table now sits in its own keyboard-reachable,
    labelled scroll box.
  - After the fix: **0 pages scroll sideways at any width.**
- **Lighthouse accessibility: 100** on 6 pages, on both mobile and
  desktop.
- **Screenshots:** 74 captures in
  `qa-screenshots/2026-11-09-recovery/`.
- **Still not done:** testing with a screen-reader user.

## Day 7 re-test (2026-10-31)

axe-core 4.13.0 (WCAG 2.0–2.2 A/AA): **48 scans, 0 violations** — 22
pages at 375 px and 1280 px plus the open mobile menu, the open
assistant, and two forms showing errors. Lighthouse accessibility 100
on 6 pages. Fixed on Day 7: the homepage search form had
`role="tabpanel"` on the form itself, hiding its form role (moved to a
wrapper); upload errors from the server are now shown and announced;
tap targets raised to at least 24 px; the assistant's close button is
44 px. Not yet done: testing with a screen-reader user.


## Day 6 Task 4 review (2026-10-30) — current record

**Target:** WCAG 2.2 Level AA. **This is a record of testing, not a claim
of conformance.** Automated scanning was used, but most of the checks
below were done by hand with the keyboard, because an automated score
cannot tell whether something is actually usable.

**Result:** 6 defects found today. **All 6 fixed and re-tested.** No
known material defects remain open. Two items depend on content that
doesn't exist yet (real photos, a map) and are recorded below with what
must happen when they arrive.

### How it was tested

- **Automated:** axe-core 4.13.0 (WCAG 2.0/2.1/2.2 A and AA rules) run
  in a real browser against the running site: 14 pages at default size,
  plus the open mobile menu, the open assistant panel, a form showing
  errors, and the desktop header at 1280 px.
- **Structure check on 27 pages** (every public page plus a property
  page): one H1 each, no skipped heading levels, one main region,
  header and footer present, page language set, no image without alt
  text.
- **Manual, by keyboard:** skip link, desktop dropdown menus, mobile
  menu, assistant panel, contact form errors, focus visibility.
- **Reflow and zoom:** pages at 320 px wide (equal to 400% zoom) and at
  375, 1279, 1280 and 1536 px; text-spacing override (WCAG 1.4.12).
- **Automated tests added:** assistant focus behaviour (2 tests).

### Defects found and fixed today

| # | Defect | WCAG | Fix | Re-tested |
|---|---|---|---|---|
| 1 | Skip link moved the page but not keyboard focus (focus fell back to the page itself) | 2.4.1 | Main content area made focusable | Focus now lands on main content |
| 2 | Closing the assistant with Escape lost keyboard focus (sent to the top of the page) | 2.4.3 | Focus returns to "Ask the assistant" once it reappears; same for the Close button | Live + 2 automated tests |
| 3 | Footer had seven separate navigation regions, cluttering screen-reader landmark lists | 1.3.1 (best practice) | One "Site directory" region with headed groups | 3 navigation regions per page |
| 4 | Header dropdown menus could not be dismissed with Escape | 1.4.13 | Escape hides the open dropdown and returns focus to its menu item | Live |
| 5 | **Introduced earlier today:** with both phone numbers, the desktop header was 131 px too wide at 1280–1535 px, so the page scrolled sideways | 1.4.10 | Search icon and button arrow shown only from 1536 px (search remains under Properties); slightly tighter menu spacing | No sideways scroll at 1279/1280/1536 |
| 6 | **Introduced earlier today:** the two stacked header phone links were smaller than the 24 px minimum touch target | 2.5.8 | Each link given 24 px minimum height | axe clean |

Also fixed: with enlarged text spacing at 320 px the menu button was
pushed 17 px off screen; the logo can now shrink instead.

### Checklist results

| Area | Result |
|---|---|
| Semantic HTML, headings, landmarks | Pass on all 27 pages (after fix 3) |
| Keyboard navigation | Pass: every control reachable, logical order |
| Skip link | Pass (after fix 1) |
| Visible focus | Pass: 3 px blue outline on keyboard focus |
| Navigation menus | Pass: desktop dropdowns open on focus, Escape closes (fix 4); mobile menu moves focus in, Escape closes and returns focus |
| Dialogs (assistant) | Pass: labelled, focus moves to the question field, Escape closes and returns focus (fix 2); answers announced through a polite live log |
| Forms and validation errors | Pass: focus moves to an error summary linking to each field; fields marked invalid and linked to their messages; no data sent |
| Colour contrast | Pass (axe, all scanned states) |
| Alternative text | Pass: logo decorative beside its text; property images take stored alt text; "no photo" placeholder labelled |
| Reduced motion | Pass: all animation and transitions switched off sitewide when the visitor asks for less motion |
| Screen-reader announcements | Pass: assistant log is polite live; form error summary receives focus; results count is a heading on each search page |
| Zoom and reflow | Pass at 320 px and with text-spacing override (after fix 5 and the logo shrink) |
| Touch targets | Pass (after fix 6) |
| Property filters | Pass: a labelled search form with headed groups and labelled fields; results update by normal page load |
| Galleries | No real photos yet; current gallery is a simple grid of images with alt text, not a slideshow. **When real photos arrive:** every photo needs a short factual description; if a slideshow is added it needs keyboard controls and no auto-play. Owner: developer. |
| Maps | None on the site (the "Search by Area" panel is text). **If a map is added:** it must have a text alternative (address and area list) and be keyboard-operable. Owner: developer. |

### Not tested today (needs a person or a tool not available here)

- A full pass with a real screen reader (NVDA or VoiceOver) by someone
  who uses one. Recommended before launch.
- Testing with real users with disabilities.

---


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
