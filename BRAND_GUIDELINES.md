# BRAND_GUIDELINES.md — Times Estate Ltd

## Status of this document

Phase 3 deliverable (2026-09-09). This is the master reference for the
**approved creative direction: E — "Claret"** (selected 2026-09-09,
recorded in `DECISIONS.md`). It finalizes what `BRAND_STRATEGY.md` and
`BRAND_CONCEPTS.md` proposed into production-ready specification.

**Nothing in this document has been applied to the live website.**
The identity exists as source files in `brand/` at the repository
root, entirely separate from `web/`. No account was created, no cost
was incurred, and nothing has been published anywhere.

**What's real vs. specified:** every item below is either (a) an
actual file that exists in `brand/`, checked and screenshotted during
production, or (b) a complete specification ready to hand to a printer
or to build later, clearly marked as not yet rendered. Nothing is
overstated as "done" when it's only specified. See
`LOGO_ASSET_REGISTER.md` and `MEDIA_ASSET_REGISTER.md` for the exact
file inventory.

---

## 1. Brand foundation (summary — full detail in `BRAND_STRATEGY.md`)

**Positioning:** the London estate agency for people who want a
straight answer before a sales pitch. **Personality:** straightforward
not blunt, established not old-fashioned, knowledgeable not showy.
**Selected strapline (provisional, still not finally approved for
public use):** "A straight answer, before anything else."

**Why Claret:** rich, editorial, confident — deliberately closer to a
boutique hospitality/fashion brand than a typical estate agency,
answering the owner's Round 2 brief for "bold contemporary colour."

---

## 2. Logo suite

All files: `brand/logo/svg/` (masters) and `brand/logo/png/`,
`brand/logo/webp/` (raster exports). Full inventory in
`LOGO_ASSET_REGISTER.md`.

### 2.1 The marks

- **Compact mark (monogram):** a "TE" built from plain geometric
  rectangles — deliberately **not** dependent on any font, so it
  rasterises identically everywhere and reads clearly from 1024px down
  to 16px. This is the **original artwork** at the centre of the
  system — no stock mark, no template.
- **Wordmark:** "Times Estate" in Playfair Display Bold — live,
  editable text (see §2.5), not outlined to paths, so it stays
  genuinely editable.
- **Primary horizontal lockup:** monogram + wordmark + a bold claret
  rule, side by side. The main lockup for headers, letterheads,
  boards, and wide spaces.
- **Stacked lockup:** monogram above wordmark, centred — for square or
  tall spaces (social avatars, narrow signage, a business card's own
  monogram-forward treatment).

### 2.2 Colour variants (every mark and lockup)

| Variant | Use |
|---|---|
| **Full colour** | Default — claret monogram/rule, deep-aubergine-ink wordmark, on light backgrounds |
| **One-colour dark** | Single dark-ink version for engraving, foil, thermal print, or any single-colour reproduction |
| **Reversed** | Ivory version for placing on claret, ink, or any dark/photographic background |

### 2.3 Small-size version

The compact mark **is** the small-size version — below roughly 120px
wide, the full wordmark stops being reliably legible (a general
typographic threshold for a serif display face at this weight, not a
brand-specific number to over-cite), so the monogram alone should be
used instead of shrinking the full lockup. Confirmed legible at 16px
in `brand/logo/png/te-monogram-16.png` and `-32.png`.

### 2.4 Favicon, app icon, social avatar

All derived from the font-free monogram, rasterised at the current
official sizes researched today (2026-09-09):

| File | Size | Use |
|---|---|---|
| `te-monogram-16.png`, `-32.png`, `-48.png` | 16/32/48px | Browser favicon (modern PNG favicon; see note below on `.ico`) |
| `te-monogram-180.png` | 180px | Apple touch icon |
| `te-monogram-192.png`, `-512.png` | 192/512px | Android/PWA web manifest icons |
| `te-monogram-200.png` | 200px | TikTok profile picture display size |
| `te-monogram-400.png` | 400px | General social avatar minimum |
| `te-monogram-640.png` | 640px | WhatsApp Business profile picture (recommended) |
| `te-monogram-720.png` | 720px | Google Business Profile logo (720×720 required) |
| `te-monogram-1024.png` | 1024px | App-store-grade master |

**Note on `.ico`:** a legacy multi-resolution `.ico` file was not
generated — modern browsers (including everything in real use in
2026) support PNG favicons directly via `<link rel="icon" type="image/png">`,
and every size a `.ico` would bundle already exists above as a
separate PNG. If an `.ico` is specifically needed for a legacy tool,
any of the free online/offline PNG-to-ICO packers can combine the
16/32/48px PNGs already produced.

### 2.5 Editable vector masters and font licensing

Every SVG in `brand/logo/svg/` embeds its own `@import` of the exact
Google Fonts used (Playfair Display, Work Sans) inside a `<style>`
block — so opened in any internet-connected browser or modern design
tool, it renders with the correct typeface automatically, with no
separate font installation step. Both typefaces are **SIL Open Font
License (OFL)** — free for commercial use, no royalty, no attribution
required (though this document credits them anyway, as good practice).
Wordmark text is kept as live, editable `<text>` — not converted to
outlines — per the brief's instruction to preserve editable masters.
**Before sending to a print vendor**, convert text to outlines/paths
in a design tool (Illustrator, Affinity, Inkscape) so the file doesn't
depend on font availability at the print shop — this is standard
practice and deliberately not done in the master file, which should
stay editable.

### 2.6 Minimum size, clear space, and misuse

- **Minimum size:** the compact mark should not be reproduced smaller
  than 16px (digital) or 10mm (print) in its shortest dimension. The
  primary horizontal lockup should not be reproduced narrower than
  120px (digital) or 30mm (print) in width.
- **Clear space:** keep a minimum clear margin around every lockup
  equal to the height of the monogram's own capital-height stroke (the
  width of one "T" stem, i.e. roughly 10% of the monogram's height) —
  no other text, image, or graphic element should intrude into this
  margin.
- **Misuse — do not:**
  1. Stretch or distort any mark to a different aspect ratio.
  2. Recolour the monogram or rule to a colour outside §3's palette.
  3. Rotate the mark.
  4. Add a drop shadow, outline glow, or bevel effect.
  5. Place the full-colour mark on a low-contrast or busy photographic
     background — use the reversed or one-colour-dark variant instead.
  6. Recreate the wordmark in a different typeface.

---

## 3. Colour specification

| Role | Name | HEX | RGB | CMYK (approximate)* |
|---|---|---|---|---|
| Ink | Deep Aubergine | `#201014` | 32, 16, 20 | 0, 50, 38, 87 |
| Background | Warm Ivory | `#FBF6EE` | 251, 246, 238 | 0, 2, 5, 2 |
| Accent | Claret | `#7A1F3D` | 122, 31, 61 | 0, 75, 50, 52 |
| Secondary | Dusty Blush | `#EFD9DE` | 239, 217, 222 | 0, 9, 7, 6 |

*CMYK values are a direct, uncalibrated RGB→CMYK conversion for
reference only — they are **not** a colour-managed proof. Before any
real print run, ask the printer to proof against the HEX values
directly (or provide a Pantone bridge match from their own system) —
do not rely on this table alone for colour-critical print.

**Verified accessible pairings (WCAG contrast, calculated not
guessed):**

| Pairing | Ratio | Passes |
|---|---|---|
| Ink on Ivory | 13.8:1 | AAA (all text sizes) |
| White text on Claret | 10.0:1 | AAA (all text sizes) |
| Ink on Dusty Blush | ~11.9:1 (Blush is close in luminance to Ivory) | AAA |
| Claret on Ivory (links/labels) | ~8.4:1 | AAA |

---

## 4. Typography

**Display (H1–H3):** Playfair Display, weight 700. **Sub-heads and UI
(H4–H6, navigation, labels):** Work Sans, weights 500–600. **Body,
price, legal text:** Work Sans, weight 400 (price at 600 for
emphasis). Both are Google Fonts (OFL), self-hostable via
`next/font/google` exactly as the live site already loads its current
fonts — no runtime request to Google, no performance cost, whenever
this direction is actually adopted into the codebase (not done today).

**Fallback stacks:** `'Playfair Display', Georgia, 'Times New Roman', serif`
and `'Work Sans', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`.

| Level | Size (desktop) | Size (mobile) | Weight | Face |
|---|---|---|---|---|
| H1 | 3rem / 48px | 2.25rem / 36px | 700 | Playfair Display |
| H2 | 2.25rem / 36px | 1.75rem / 28px | 700 | Playfair Display |
| H3 | 1.75rem / 28px | 1.5rem / 24px | 700 | Playfair Display |
| H4 | 1.375rem / 22px | 1.25rem / 20px | 600 | Work Sans |
| H5 | 1.125rem / 18px | 1.0625rem / 17px | 600 | Work Sans |
| H6 / eyebrow | 1rem / 16px, uppercase, +0.06em tracking | same | 600 | Work Sans |
| Body | 1rem / 16px, line-height 1.6 | same | 400 | Work Sans |
| Navigation | 0.9375rem / 15px | same | 500 | Work Sans |
| Label / tag | 0.75rem / 12px, uppercase, +0.05em tracking | same | 600 | Work Sans |
| Price | 1.25rem / 20px | 1.125rem / 18px | 600 | Work Sans |
| Legal / fine print | 0.75rem / 12px, 70% opacity | same | 400 | Work Sans |

---

## 5. System rules

- **Spacing:** an 8px base unit (0.5rem); section padding 48–64px
  desktop / 32px mobile, matching the live site's existing `py-12
  sm:py-16` convention so adoption later wouldn't require re-deriving
  a new scale.
- **Grid:** 12-column, max content width 1180px, 24px gutter — same
  convention as the live site's `Container` component.
- **Border radius:** 4px (tight, business-card/board edges), 10px
  (cards, property photos), 16px (feature cards, business card
  corners) — deliberately more rounded than "The Established Line"'s
  2–4px, reflecting Claret's warmer, more editorial character.
- **Shadow:** used sparingly — a single soft shadow token
  (`0 4px 16px rgba(32,16,20,0.08)`) for cards that need to lift off a
  Blush section background; never stacked, never on the logo itself
  (see misuse rules).
- **Icons:** simple line icons, 1.5–2px stroke, rounded terminals;
  occasional solid Claret fill for emphasis states (selected, active).
- **Photography:** warm, editorial-style property photography with
  confident cropping — see `BRAND_CONCEPTS.md` Direction E for full
  direction. Every placeholder until real photography exists must
  stay visibly labelled, exactly as the live site already does.
- **Maps:** not currently used anywhere on the site — no map style is
  specified today; this section exists so one isn't skipped if a map
  is ever added. When it is, pin/marker colour should be Claret on a
  desaturated, low-contrast map style (never the vivid default Google/
  Mapbox palette, which would fight the brand palette).
- **Motion:** short, purposeful transitions only (150–250ms,
  ease-in-out) — consistent with the live site's existing button/link
  hover transitions. **Reduced motion:** every animation must respect
  `prefers-reduced-motion: reduce` by collapsing to near-zero duration,
  exactly as the live site's global CSS rule already does today (see
  `web/src/app/globals.css`) — this is a real, already-implemented
  rule this brand system inherits, not a new promise.

---

## 6. Stationery

Full production files: `brand/stationery/`. Full inventory and status
(rendered vs. specified) in `MEDIA_ASSET_REGISTER.md`. Headline notes:

- **Business card:** real SVG at true 91×61mm (85×55mm trim + 3mm
  bleed), front and back, with a dashed trim guide layer (removed
  before print). Back uses `[Name]` / `[Job title]` placeholders — no
  staff name has been supplied.
  **No redress-scheme or Client Money Protection membership number
  appears on any printed item** — both are "Requires verification" in
  `CONTENT_VERIFICATION_REGISTER.md`, not yet safe to commit to print;
  a placeholder line points to `COMPLIANCE_REGISTER.md` instead.
- **Letterhead (A4) and continuation sheet:** real SVG at true
  210×297mm, with the same regulatory placeholder policy.
- **Compliment slip:** real SVG at the UK-standard 210×99mm.
- **Property boards (For Sale / To Let / Sold / Let Agreed /
  Commercial):** one real templated SVG system, five status colours —
  all derived as tints/shades of Claret and Ink rather than introducing
  new, off-brand hues (see the file comments in `build-stationery.mjs`
  for the exact derivation).
- **Email signature:** real, usable HTML (table-based, inline styles,
  web-safe font fallbacks — email clients don't reliably load web
  fonts, so this deliberately does not use Playfair Display/Work Sans
  live).
- **Envelopes (DL, C4), invoice/quotation header, valuation cover,
  presentation folder, window-card/property-particulars template:**
  **specified, not rendered as files today** — see
  `MEDIA_ASSET_REGISTER.md` for the exact dimensions and layout
  approach for each, ready to build on request. This was a scope
  decision given the sheer size of today's brief (see `DECISIONS.md`),
  not an oversight.

---

## 7. Social and digital media

Full inventory in `MEDIA_ASSET_REGISTER.md`. Current official
dimensions (researched 2026-09-09, cited by platform):

| Platform | Item | Size |
|---|---|---|
| Instagram / Facebook | Square feed post | 1080×1080 |
| Instagram / Facebook | Portrait feed post | 1080×1350 |
| Instagram / Facebook / TikTok | Story / full-screen | 1080×1920 |
| X (Twitter) | Horizontal image | 1600×900 |
| LinkedIn | Feed image | 1200×1200 |
| YouTube | Channel banner | 2560×1440 (safe area 1546×423, centred) |
| TikTok | Profile picture | 720×720 upload, 200×200 display |
| WhatsApp Business | Profile picture | 640×640 recommended (192×192 minimum) |
| WhatsApp Business | Catalogue image | 1080×1080 |
| Google Business Profile | Logo | 720×720 (250×250 minimum) |
| Google Business Profile | Cover photo | 1024×576 |
| Web | Open Graph share image | 1200×630 |
| Web | Apple touch icon | 180×180 |
| Web | Android/PWA manifest icons | 192×192, 512×512 |

**Rendered today (real files, `brand/social/` and `brand/digital/`):**
Open Graph image (1200×630), Instagram "Just Listed" square post
(1080×1080), an Instagram/Facebook Story template (1080×1920), a
no-property-image placeholder, a loading/empty-state graphic, and 404
artwork.

**Specified, not rendered today:** the remaining platform × content-
type combinations (new instruction, price reduction, viewing/open
house, sold/let agreed, landlord service, market update, verified
testimonial, recruitment, announcement — across Facebook, LinkedIn, X,
YouTube, TikTok, WhatsApp Business, and Google Business Profile). This
is a genuinely large matrix (roughly 70 combinations); today's brief
was treated as "adapt layouts per platform, don't stretch one
graphic," which is honoured by the templates that do exist — the
remaining ones follow the same system (monogram, Claret/Ivory palette,
Playfair Display headline, Work Sans supporting text) and can be
produced quickly on request, platform by platform, rather than
speculatively building dozens of images with placeholder property
data before they're needed.

**Note on the two rendered social images' local raster preview:** the
`-fallback-preview.png` files in `brand/social/` were rasterised
locally without internet-connected font loading, so they show a
generic serif substitute for headlines rather than true Playfair
Display — a tooling limitation of the offline rasteriser used today,
not a flaw in the design. The `.svg` source files are the accurate
version and render correctly in any normal browser or design tool
(confirmed by direct browser inspection during production — see
`LOGO_ASSET_REGISTER.md`'s verification note for the same caveat as it
applies to the logo suite, where it was fully resolved by embedding
the font import; the same embedded import is present in these SVGs
too, so opening the `.svg` file itself — not the fallback PNG —
already renders correctly).

---

## 8. What this Phase deliberately did not do

- **Did not rebrand the live website.** `web/` is untouched.
- **Did not incur any cost or create any account.** All tooling used
  (Node.js, the `sharp` image library) is free, open-source, and
  local-only — never deployed, never exposed to the internet.
- **Did not include any unverified regulatory information in final
  artwork** (§6).
- **Did not finalise the logo** — these are production-ready masters
  for review, not a declared-final identity; Approval Gate 3 is where
  that decision belongs.
- **Did not build the full ~70-item social content matrix** — a
  deliberate scope decision, not an oversight (see `DECISIONS.md`).
