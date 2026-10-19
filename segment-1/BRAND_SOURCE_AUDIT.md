# BRAND_SOURCE_AUDIT.md — Times Estate Ltd

**Segment 1 deliverable · prepared 2026-10-19 · status: for Approval Gate 1.**
Both supplied originals are preserved unchanged. Nothing in this document
redraws, traces or modifies the logo.

## 1. Files inspected

| # | File (as supplied) | Format | Pixel size | Colour mode | DPI / ICC / EXIF | SHA-256 (first 16) | Project copy |
|---|---|---|---|---|---|---|---|
| A | `logo times estates.jpeg` | JPEG | 1206 × 877 | RGB | none / none / none | `14e653e32626432a` | `/mnt/project-files/uploads/hearth/09aeffc1-…` (byte-identical, 105,231 B) |
| B | `front page times estatess.jpeg` | JPEG | 1290 × 792 | RGB | none / none / none | `560944f87b413c3d` | `/mnt/project-files/uploads/hearth/c3b26575-…` (byte-identical, 182,569 B) |

An earlier copy of the same logo already exists in the repository as
`brand/logo-supplied/times-estate-ltd-master-trimmed.png` (1194 × 872,
PNG, 1,010,256 B, dated 2026-09-30) together with
`icon-overlap-evidence.png`, which documents the same iOS "share" icon
overlap described in §3. The repository's current live logo
(`brand/logo-skyline/`, `web/public/brand/times-estate-ltd-*.svg`) is a
**generic SVG recreation** made on 2026-09-11 from a screenshot, not a
trace of file A — it shows a plain multi-building silhouette without the
clock, Big Ben, St Paul's or the London Eye. It therefore does not match
the controlling artwork and will need replacing in a later segment.

## 2. What the artwork shows

**File A — logo.** A landscape lock-up on a white rounded-rectangle
canvas. Top: a copper-ringed clock face (hour marks only, no numerals;
hands at roughly 10:10) whose face is a dark-charcoal-to-gold gradient
sky behind a London skyline silhouette — Palace of Westminster and Big
Ben (left), modern towers, St Paul's dome, a second clock tower, two
pitched-roof houses with lit windows, the London Eye (right). A copper
"swoosh" ground line closes the composition. Below: the wordmark
"TIMES ESTATE LTD" — "TIMES" in near-black, "ESTATE LTD" in a copper
gradient — then a thin copper rule and the tagline "LONDON PROPERTY
EXPERTS" in a wide-tracked geometric sans.

**File B — homepage mock-up.** A desktop web page concept using the same
lock-up in the header, a hero over a photographic London street with a
Buy / Rent / Commercial search panel, a six-item service strip (Sales,
Lettings, Management, Commercial, Construction), a filter sidebar, eight
property cards, a map panel, a valuation band, a testimonial, and a
footer with contact details and social icons. It is the direction for
the homepage layout, **not** a source of facts: the "672 Properties
Found", named London areas, listing prices, "Sarah M, Clapham"
testimonial and the five-star rating are illustrative and must not be
reproduced as content (see `CONTENT_REGISTER.md`).

## 3. Asset-quality limitations (why file A is not yet web- or print-ready)

1. **Raster only, low resolution.** 1206 px wide ≈ 10.2 cm at 300 dpi.
   Usable on screen at up to roughly 600 CSS px (2× density) before
   softening; not usable for print beyond business-card size, and not
   usable at all for boards, vehicle livery or large-format signage.
2. **JPEG compression artefacts** are visible around the thin clock
   marks, the tagline letterforms and the swoosh edges.
3. **No transparency.** The white rounded-rectangle canvas is baked in,
   so the mark cannot sit on a dark header, photo or coloured background
   without a visible white tile.
4. **Foreign object in the artwork.** An iOS "share" icon (white circle
   with an upward arrow) sits over the bottom-right of the canvas, cutting
   into the "D" of "LTD" and the end of the tagline. This confirms the
   file is a phone screenshot of the artwork, not an export of it.
5. **Rounded corners and uneven margins** are part of the screenshot,
   not a design decision; the left margin (~60 px) and right margin
   (~90 px) differ.
6. **No vector master, no font files, no layered source.** Nothing can be
   recoloured, rescaled or separated (icon vs wordmark) without a redraw.
7. **Gradient-heavy mark.** The clock face and skyline rely on continuous
   gradients and dozens of tiny details (window lights, Eye spokes) that
   will not survive reduction to favicon (16–48 px) or a one-colour print.
8. **Internal inconsistencies** to be settled before any redraw: the
   skyline has two clock towers; the clock has no numerals or minute
   hand distinction; the swoosh overlaps the base of the London Eye. These
   are characteristic of generated artwork; ownership and licensing must
   be confirmed (Question 1 in the end report) before it is adopted as a
   registered or publicly asserted trade mark.

**Verdict on item 7 of the brief:** file A is **not suitable** as the
production web logo (no transparency, too low resolution for 2×/3×
displays at header size, iOS icon contamination) and **not suitable**
for print. It is suitable **only** as the controlling visual reference
for a faithful vector redraw in a later, approved segment.

## 4. Colour samples (measured)

Method: Python/Pillow, median of all pixels in each rectangle after a
saturation/lightness filter to isolate the intended colour from
anti-aliasing. Coordinates are pixel boxes (x0, y0, x1, y1) on the
original files. p10/p90 are the darkest/lightest tenth to show the
gradient range. Full raw output: `samples.json` (scratch), reproduced
here.

| ID | Where sampled | Box | Pixels | Median HEX | RGB | Range p10–p90 |
|---|---|---|---|---|---|---|
| L1 | Logo canvas white | 560,20–640,50 | 2,400 | **#FEFEFE** | 254,254,254 | flat |
| L2 | "TIMES" wordmark ink | 80,645–450,745 (lum<90) | 14,319 | **#131619** | 19,22,25 | #0F0E13–#1D1D1F |
| L3 | "ESTATE LTD" copper | 480,645–1020,745 (sat>0.5) | 18,316 | **#984E15** | 152,78,21 | #803901–#B1683D |
| L4 | Tagline charcoal | 190,775–1000,805 (lum<110) | 4,980 | **#1D1D20** | 29,29,32 | #0E0E0E–#505153 |
| L5 | Tagline copper rule | 70,787–165,797 (sat>0.4) | 293 | **#9A5230** | 154,82,48 | #8D4E2F–#A25737 |
| L6 | Clock ring (bright) | 540,78–650,100 (sat>0.5) | 1,585 | **#F8AE58** | 248,174,88 | #EE9B3F–#FFB466 |
| L7 | Clock face dark sky | 420,180–480,230 | 3,000 | **#17181A** | 23,24,26 | #131416–#1D1D1F |
| L8 | Skyline glow gold | 560,380–640,430 (sat>0.3) | 3,984 | **#FCC67B** | 252,198,123 | #F7B466–#FCD698 |
| L9 | Clock hands bronze | 480,240–560,300 (sat>0.5) | 1,301 | **#E1903F** | 225,144,63 | #684D32–#FAAD5B |
| L10 | Swoosh ivory highlight | 200,540–1000,600 | 5,755 | **#F8E2C8** | 248,226,200 | #F1D4B4–#FFF0DB |
| F1 | Mock-up "Get a Valuation" button | 940,4–1040,26 | 2,038 | **#FA641F** | 250,100,31 | #FD5A17–#FF843E |
| F2 | Mock-up "Search" button | 962,112–1022,134 | 1,237 | #FB621B | 251,98,27 | #F85E18–#DA7942 |
| F3 | Mock-up "Buy" tab | 680,80–745,98 | 1,130 | #FB611A | 251,97,26 | #FE5D15–#FC6520 |
| F5 | Mock-up valuation band | 330,690–360,720 | 900 | **#1A1A1A** | 26,26,26 | flat |
| F6 | Mock-up page background | 5,300–40,600 | 10,500 | **#F8F8F8** | 248,248,248 | flat |
| F8 | Mock-up "TO LET" badge | 452,327–500,338 (lum<80) | 417 | #0C0809 | 12,8,9 | #040000–#2C2C2E |
| F9 | Mock-up price text | 262,408–330,422 (lum<100) | 179 | #2D2D31 | 45,45,49 | #17181A–#525451 |
| F10 | Mock-up header-logo "ESTATE" | 235,5–345,22 (sat>0.5) | 323 | #A05D3C | 160,93,60 | #8D4424–#BF744C |

**Reading the samples.** The logo's own copper (L3, L5, F10) is a deep
**burnt copper** (#984E15 → #A05D3C). The mock-up's interface orange
(F1–F3, ≈#FA641F) is a much brighter, redder **UI orange** that does not
appear anywhere in the logo. Both are "copper-orange" in the brief's
sense; the design tokens below keep the logo's copper as the brand
colour and treat the mock-up orange as a secondary "action" colour whose
contrast problem is recorded rather than hidden.

## 5. WCAG 2.2 contrast results and accessible companions

Contrast ratios computed with the WCAG relative-luminance formula. AA
requires 4.5:1 for normal text, 3:1 for large text (≥24 px or ≥19 px
bold) and for UI component boundaries.

| Source colour | On white #FFFFFF | On ink #131619 | White text on it | AA verdict |
|---|---|---|---|---|
| Ink #131619 | 18.16 | — | 18.16 | Pass everywhere |
| Charcoal #1D1D20 | 16.82 | 1.08 | 16.82 | Pass as text on light |
| Copper #984E15 (L3) | **6.11** | 2.97 | **6.11** | **Passes as text and as a button fill on white**; fails as text on ink |
| Copper rule #9A5230 (L5) | 5.80 | 3.13 | 5.80 | Pass on white; large-text only on ink |
| Bronze #E1903F (L9) | 2.54 | **7.14** | 2.54 | Fails on white; passes as text on ink |
| Warm gold #F8AE58 (L6) | 1.88 | **9.67** | 1.88 | Decorative or on-ink only |
| Gold glow #FCC67B (L8) | 1.56 | 11.68 | 1.56 | Decorative or on-ink only |
| Ivory #F8E2C8 (L10) | 1.26 | 14.44 | 1.26 | Background tint only (ink text on it: 14.44) |
| Mock-up orange #FA641F (F1) | **3.04** | 5.97 | **3.04** | **Fails** as a white-text button on white pages (the mock-up uses it exactly that way); passes for large text and for ink text on it (5.97) |
| Mock-up charcoal #1A1A1A | 17.40 | 1.04 | 17.40 | Pass |
| Page grey #F8F8F8 | 1.06 | 17.10 | — | Background only |

**Nearest accessible companions** (same hue and saturation, lightness
reduced in 0.2 % steps until the target ratio is met; the source colour
is preserved for decorative and large-format use):

| Source | Use that fails | Companion | Ratio achieved | Note |
|---|---|---|---|---|
| Mock-up orange #FA641F | white text on button, 3.04:1 | **#D34605** | 4.52:1 on white | Keep #FA641F for non-text fills, badges with ink text, and large headings; use #D34605 for small white-on-orange text and for orange links on white |
| Bronze #E1903F | text/links on white, 2.54:1 | **#AD641B** | 4.55:1 on white | Keep #E1903F for use on dark panels (7.14:1) |
| Warm gold #F8AE58 | text on white, 1.88:1 | **#B16207** | 4.55:1 on white | Keep #F8AE58 for the clock ring, rules on dark, and highlights |
| Copper #984E15 | text on ink, 2.97:1 | **#C4651B** | 4.52:1 on ink | For copper text or links placed on the dark footer/header |

The existing site tokens (`web/src/app/globals.css`) use `--color-accent
#A8551A` (5.28:1 on white) and `--color-accent-vivid #D9772E` (5.73:1 on
ink). Both sit inside the measured copper family but neither is a
sampled value; the proposed token set below replaces them with measured
colours and keeps the names so the Phase 6 contrast fixes carry over.

## 6. Proposed design tokens (for Approval Gate 1 — not yet applied)

| Token | Value | Source | Intended use |
|---|---|---|---|
| `--te-ivory` | #FEFEFE | L1 | Page background (logo canvas white) |
| `--te-ivory-warm` | #F8E2C8 | L10 | Warm tint panels (ink text only) |
| `--te-surface-grey` | #F8F8F8 | F6 | Alternate section background |
| `--te-ink` | #131619 | L2 | Body text, dark header/footer fill |
| `--te-charcoal` | #1D1D20 | L4 | Secondary text, dark panels (#1A1A1A in mock-up is equivalent) |
| `--te-copper` | #984E15 | L3 | **Primary brand accent**: buttons on light, links, eyebrows. AA as-is |
| `--te-copper-rule` | #9A5230 | L5 | Dividers, underline rules |
| `--te-copper-on-dark` | #C4651B | companion | Copper text on ink |
| `--te-bronze` | #E1903F | L9 | Accents on dark panels, icons on ink |
| `--te-bronze-text` | #AD641B | companion | Bronze used as text on light |
| `--te-gold` | #F8AE58 | L6 | Decorative: rules, clock motif, highlights on dark |
| `--te-gold-text` | #B16207 | companion | Gold used as text on light |
| `--te-gold-glow` | #FCC67B | L8 | Gradient end for hero/skyline treatments only |
| `--te-action` | #FA641F | F1 | Mock-up orange: large CTAs with **ink** text, badges, non-text fills |
| `--te-action-text` | #D34605 | companion | Small white-on-orange text, orange links |

Rule recorded for the design system: **a measured brand colour is never
silently replaced**; where a companion tone is used for text the
decorative original stays available under its own token and the pairing
is listed in `BRAND_GUIDELINES.md` when that document is revised.

## 7. Typography characteristics (observed, not identified)

- **Wordmark** "TIMES ESTATE LTD": a high-contrast transitional/Didone-
  style serif in capitals with slightly condensed proportions, bracketed
  serifs, a tall "T" crossbar and tapered "S" terminals — the "editorial
  serif" personality the brief asks to retain. It is not Merriweather
  (the current site heading font), which is a low-contrast slab serif.
  The exact typeface is unknown; candidates with the right character and
  open licences include Playfair Display, Libre Caslon Display and
  Bodoni Moda. Identification is a Segment 2 task.
- **Tagline** "LONDON PROPERTY EXPERTS": a geometric sans in capitals
  with very wide letter-spacing (≈0.3 em), light weight — Montserrat,
  Poppins or Josefin Sans territory.
- **Mock-up headlines** ("Browse London Properties", "Get Your Free
  Property Valuation"): a display serif similar to the wordmark family
  (Playfair-like), regular weight, tight leading.
- **Mock-up UI and body**: a neutral grotesque (Inter/Helvetica-like) at
  12–14 px; eyebrow labels in wide-tracked small caps; the handwritten
  "Building Brighter Tomorrows" is a script accent for one hero graphic
  only and should not become a system font.
- Nothing above may be stated as the licensed font until the originals
  or the designer confirms it (`COMPLIANCE_REGISTER.md`, row 23).

## 8. Logo variations the project will need (specification only)

1. Primary lock-up, full colour, transparent background (web header on
   ivory).
2. Primary lock-up, reversed for dark backgrounds (white wordmark,
   copper/gold mark kept) — the dark footer in the mock-up needs this.
3. Horizontal lock-up: mark left, two-line wordmark right (narrow headers,
   email signature).
4. Icon-only mark: clock-and-skyline without wordmark, simplified
   (remove window lights and Eye spokes) for 512/192/180/48/32/16 px.
5. One-colour black and one-colour white versions for print, boards,
   stamps and embroidery.
6. Open Graph / social share image 1200 × 630 (currently absent from the
   site).
7. Favicon set and `manifest` icons, derived from item 4.

Minimum sizes, clear-space and misuse rules will be set in the
redrawing segment; none of the above is to be produced before the
ownership question is answered and a redraw is approved.

## 9. Rules for faithful use (effective now)

- Use file A only as a reference image in design work; do not place it
  on the website or in print in its current state.
- Preserve the five-colour family exactly as measured (§4); the
  interface may add neutral greys but no new hue.
- Keep the clock/time concept, the London landmark skyline, the two-tone
  wordmark (ink "TIMES", copper "ESTATE LTD") and the "LONDON PROPERTY
  EXPERTS" tagline. The tagline is a positioning claim and is subject to
  the claim review in `COMPLIANCE_REGISTER.md` (row 20).
- Do not stretch, recolour, outline, add drop-shadows, or set the
  wordmark in a different typeface while the identity is being matched.
- The mock-up's layout can be followed; its content cannot.
