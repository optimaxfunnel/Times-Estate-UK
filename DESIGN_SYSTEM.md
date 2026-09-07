# DESIGN_SYSTEM.md — Times Estate Ltd

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
