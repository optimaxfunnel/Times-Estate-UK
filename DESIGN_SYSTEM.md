# DESIGN_SYSTEM.md — Times Estate Ltd

**Current as of 2026-10-29.** Describes what is **built and running**
in `web/`, not a proposal. Colours are the approved, unchanged scheme
(you asked on 2026-10-20 for no colour-scheme change); the only
addition is one warm-grey border shade, needed so form fields are
visible enough for accessibility. If an option is chosen at Approval
Gate 2 (A, B, C or a mix), this document is updated to match — today
it reflects the built site, which is closest to Option B.

Where things live: tokens in `web/src/app/globals.css`; components in
`web/src/components/`. Contrast is checked by `npm run check:contrast`
(fails the build check if any pairing drops below WCAG AA).

## 1. Colour tokens

| Token | Hex | Use | Contrast (checked) |
|---|---|---|---|
| `ink` | `#141414` | Text, dark bands (hero, valuation band) | 18.4:1 on white |
| `background` / `surface` | `#FFFFFF` | Page and cards | — |
| `accent` (copper) | `#A8551A` | Buttons, links, active states on light | 5.28:1 as text and behind white text |
| `accent-dark` | `#8A4515` | Button hover/pressed | 7.14:1 behind white text |
| `accent-vivid` | `#D9772E` | On dark surfaces only; non-text accents | 5.81:1 on ink — **fails on white, never used there for text** |
| `accent-tint` | `#FBEBDD` | Soft panels, hover backgrounds | copper text 4.53:1, grey text 5.13:1 on it |
| `secondary` (warm grey) | `#6B6259` | Supporting text, icons, counts | 5.97:1 on white |
| `border` | `#E5E1DB` | Dividers, card edges (decorative only) | 1.3:1 — not for form fields |
| `border-strong` *(new)* | `#8C8279` | Form-field and empty-state borders | 3.76:1 (needs 3:1) |
| `warning` / `warning-text` | `#8A6008` / `#7A5A08` | Status badges / warning text | 5.59:1 / 6.38:1 |
| `success` | `#2F6B4F` | Success messages | 6.29:1 |
| `danger` | `#A3311F` | Errors | 6.96:1 |
| `focus-ring` | `#1F4B8C` | Focus outline | 8.59:1 on white; white halo 18.4:1 on dark |

## 2. Typography

- **Headings and wordmark:** Merriweather 700/900 (`font-heading`).
- **Body, UI, forms:** Inter (`font-sans`).
- **Scale (Tailwind):** H1 `text-4xl`→`text-6xl` hero, `text-3xl`/`4xl`
  page titles; H2 `text-2xl`/`3xl`; H3 `text-lg`; body `text-base`
  (16px); small `text-sm` (14px); minimum `text-xs` (12px) — labels in
  uppercase get `tracking` 0.2–0.35em. Headings use `text-balance`.
- Prices and counts use plain numerals; one `<h1>` per page.
- *Pending Gate 2/3:* the wordmark face (Playfair Display proposed) and
  the measured Segment 1 palette — not applied until approved.

## 3. Spacing, grid, breakpoints

- **Spacing:** Tailwind 4px scale. Rhythm used: 4/8/12/16 inside
  components, 24/32 between groups, 48–64 between page sections
  (`Section`: `py-12 sm:py-16`). Groups use `gap`, not margins.
- **Containers:** `Container` default `max-w-6xl` (reading pages),
  `size="wide"` `max-w-[88rem]` (header, footer, listings). Side
  padding 16 / 24 / 32px.
- **Grid:** listings 1 → 2 (`sm`) → 3 (`xl`) → 4 columns (1400px+);
  explorer `sidebar 14rem · results · area panel 15rem` at `xl`,
  sidebar collapses behind a "Filter Results" toggle below `lg`.
- **Breakpoints (Tailwind defaults):** `sm` 640 · `md` 768 · `lg`
  1024 · `xl` 1280 · `2xl` 1536. Header switches to the mobile menu
  below `xl`. Every page works at 360px with no sideways scroll.
- **Radius:** `rounded-sm` 8px (buttons, fields, cards); `rounded-full`
  for pills, heart and pagination. **Shadow:** `shadow-sm` on cards,
  `shadow-md` on hover, `shadow-lg/xl` only on menus and the hero
  search card.

## 4. Components (built)

| Component | File | Accessibility notes |
|---|---|---|
| Buttons (`primary`, `secondary`, `ghost`, `inverted`) | `ui/Button.tsx`, `ui/ButtonLink.tsx` | Real `<button>`/`<a>`; ≥44px tall; disabled state shown with reduced opacity + not-allowed cursor |
| Text link | `ui/TextLink.tsx` *(new)* | Always underlined (colour never the only cue); external links announce "opens in a new tab" |
| Form controls | `forms/Field.tsx`, `forms/FileUploadField.tsx` | Visible `<label>` per field; errors linked with `aria-describedby` + `aria-invalid`; borders now `border-strong` (3.76:1); placeholders in `secondary` (5.97:1) |
| Filters | `property/FilterSidebar.tsx`, `SortSelect.tsx` | Plain GET form (works without JavaScript); native `<details>` groups (keyboard + expanded state for free) |
| Alerts | `ui/Alert.tsx` | `role="alert"` for danger, `status` otherwise |
| Badges | `ui/Badge.tsx` (content status), card ribbons | Text labels, never colour alone |
| Property card | `ui/PropertyCard.tsx` | One named link per card (image link hidden from screen readers to avoid duplicates); 44px heart button with `aria-pressed`; "Sample property — not real" on demo data |
| Navigation | `layout/Header.tsx`, `layout/MobileMenu.tsx` | CSS dropdowns open on hover **and** keyboard focus; mobile menu: Escape closes and returns focus |
| Pagination | `property/Pagination.tsx` | `aria-current="page"`; 40px targets; labelled prev/next |
| Footer | `layout/Footer.tsx` | Labelled `nav` landmarks; regulatory status badges |
| Content sections | `ui/Section.tsx`, `ui/Container.tsx`, `layout/PageHero.tsx`, `home/*` | Landmarks + logical heading order |
| Loading state | `ui/Skeleton.tsx` *(new)*, `app/loading.tsx` | Card-shaped skeletons (no layout jump); announced once via `role="status"`; shapes hidden from screen readers |
| Empty state | `ui/StatusPanel.tsx` `EmptyState` *(new)* — used by the listing explorer | Says what happened and what to do next |
| Error state | `ui/StatusPanel.tsx` `ErrorState` *(new)*, `app/error.tsx`, `app/global-error.tsx` | `role="alert"`; never shows technical detail; always gives the phone number |

## 5. Focus indicators

Every interactive element gets a 3px blue outline (2px offset) **plus a
white halo**, so the ring is visible on white, on the copper tint, and
on the dark hero/valuation bands. Confirmed live with real keyboard
Tab presses on 2026-10-29 (`:focus-visible` → `solid 3px #1F4B8C` +
`0 0 0 2px #FFF`). Skip link is the first Tab stop.

## 6. Motion

- Durations: `--duration-fast` 150ms, `--duration-base` 200ms; easing
  `--ease-standard`. Used for colour/opacity transitions, dropdown
  fade, chevron rotation, card shadow on hover, skeleton pulse.
- **Nothing moves on its own** (no carousels, no autoplay, no parallax).
- **Reduced motion:** a global rule cuts every animation and transition
  to near-zero under `prefers-reduced-motion: reduce`; the skeleton
  pulse is additionally `motion-safe:` only.

## 7. Checks run (2026-10-29)

| Check | Result |
|---|---|
| `npm run check:contrast` — 18 token pairings | **All pass** (lowest: copper on tint 4.53:1) |
| Keyboard: Tab order, focus-visible ring, unnamed controls | 34 focusable elements on the homepage, **0 without an accessible name**; ring confirmed live |
| Unit tests | **69/69** (3 new for loading/empty/error states) |
| Typecheck / lint / format | Pass |

**Fixed while building:** form-field borders were 1.3:1 (fails WCAG
1.4.11) → 3.76:1; placeholders were 40–45% ink (≈3:1) → `secondary`
5.97:1; the focus ring was low-contrast on dark bands → white halo
added.

---

# Historical — Day 3 design system (2026-09-07, "The Established Line", superseded)


## What this document is

A record of the visual building blocks now implemented in the website
(`web/`), based on the approved Brand Direction 1, "The Established Line"
(see `BRAND_DIRECTIONS.md`). Every colour, font and component listed here
already exists in the code — this isn't a proposal, it's a description of
what's actually built.

## Colours

| Name | Hex | Used for |
|---|---|---|
| Ink Navy | `#12213C` | Body text, headings |
| Warm Off-White | `#F7F4EE` | Page background |
| White (surface) | `#FFFFFF` | Cards, header, footer |
| Muted Bronze | `#8C6A3F` | Buttons, links, accents |
| Slate Sage | `#5B6B63` | Supporting text, section backgrounds |
| Success green / Warning amber / Danger red | — | Form and status feedback only |

All text/background pairings were checked for contrast when the palette
was approved (see `BRAND_DIRECTIONS.md`) and re-confirmed today by testing
real keyboard focus and rendered pages in the browser.

## Typography

- **Headings:** Source Serif 4 (a traditional, well-spaced serif),
  matching the "traditional serif for headings" brief in Brand Direction 1.
- **Body text and forms:** Inter (a clean, highly legible sans-serif).
- Both are loaded as optimised web fonts (no external font-service account
  needed beyond the font files themselves).

## Components built today

| Component | What it's for |
|---|---|
| Button / ButtonLink | Every clickable action, in three styles (primary/bronze, secondary/outlined, ghost/text link) |
| Container / Section | Consistent page width and spacing throughout |
| Header / Mobile Menu / Footer | Site-wide navigation, present on every page |
| Property Card | How a property listing will look once real listings exist — every one currently shown is marked "Sample property — not real" |
| Badge | A small coloured label showing a fact's status (Confirmed / Missing / Requires verification, etc.) |
| Placeholder Notice | A clearly bordered, labelled box wrapping any content that isn't final yet — this is how Rule 2 (label demonstration material) is enforced directly on the page, not just in project documents |
| Alert | Success/error/info messages, e.g. after submitting a form |
| Form fields | Text input, text area, checkbox — each with a visible label and, if something's wrong, a clear error message right next to the field |
| Loading / error / "page not found" states | What a visitor sees if a page is loading, something breaks, or they follow a broken link |

## Accessibility built in from the start

- **Keyboard focus:** every interactive element shows a clear, high-
  contrast blue focus outline when reached by keyboard (Tab key) — tested
  directly in the browser today, not assumed.
- **Skip link:** pressing Tab once on any page lets a keyboard user jump
  straight to the main content, skipping repeated navigation.
- **Reduced motion:** anyone with "reduce motion" turned on in their
  device settings gets instant state changes instead of animations —
  confirmed present in the delivered stylesheet today.
- **Labelled placeholders:** nothing unfinished is ever shown without a
  visible label explaining what it is and why it's not final.

## Spacing, grid and breakpoints

- A single consistent page width (max 1152px) with responsive side
  padding, used on every page via the `Container` component.
- Six screen sizes were tested today (see `TEST_REPORT.md`): small mobile,
  large mobile, tablet, laptop, desktop, and wide desktop.
- The navigation switches from a mobile menu to the full desktop menu at
  1024px — this was adjusted today after testing found the original,
  narrower switch-over point caused the menu to overlap the logo on
  tablet-sized screens.

## What's intentionally not built yet

- Property search filters, map views, and real listings (need a property
  data source — Day 4).
- Any animation beyond simple hover/colour transitions — the brief asks
  for "restrained" animation, and there's nothing to animate yet on
  content-only pages.
- A dark mode — not requested, and not part of Brand Direction 1.

## Technical appendix

- Tokens are defined as CSS custom properties in `web/src/app/globals.css`
  under `@theme inline`, which is how Tailwind CSS v4 is configured (no
  separate `tailwind.config.js` file in this version).
- Every component lives under `web/src/components/`, split into `ui/`
  (generic), `layout/` (site structure) and `forms/` (form-specific).
- `PlaceholderNotice` and `Badge` both read their status from the
  `ContentStatus` type in `web/src/lib/site-config.ts`, which is the single
  place business facts and their verification status are defined — kept
  deliberately in sync with `CONTENT_VERIFICATION_REGISTER.md`.
