# BRAND_CONCEPTS.md — Times Estate Ltd

## Status of this document

Phase 2 deliverable (2026-09-08). **Nothing here is final.** Every
logo mark is an explicitly low-fidelity sketch, not a finished logo;
no direction has been applied to the live website; every colour pair
below has been calculated (not guessed) against the WCAG contrast
formula. A visual comparison prototype (palettes, type, logo sketches,
mini UI/business-card/social-post mockups for all three directions on
one page) is published separately — see the message accompanying this
report for the link.

These are three **new** directions, distinct from the three already
explored in `BRAND_DIRECTIONS.md` (Day 2) — including "The Established
Line," which is already the live design system
(`DESIGN_SYSTEM.md`). This gives the owner genuinely fresh options to
compare against what's already built, not a repeat of Day 2.

All three avoid: copied competitor branding, roof/key/skyline motifs,
Big Ben imitation, generic black-and-gold luxury, excessive decoration,
and unlicensed assets. Every typeface proposed is available on Google
Fonts under the SIL Open Font License (free for commercial use, no
royalty) and can be self-hosted via `next/font/google` exactly as the
current site already does — no runtime request to Google, no
performance cost from an external font host.

---

## Direction A — "The Long View"

**Strategic idea:** Depth and quiet confidence. The name plays on
"taking the long view" — considered advice over a quick sale — and on
Times Estate Ltd's own decade of real incorporation history. Deep
petrol replaces navy as the anchor colour (a deliberate nod to a
petrol-toned palette the owner asked to explore earlier in this
project), paired with warm stone and a single restrained brass line —
never a brass *fill*, which is what tips a palette into "gold luxury"
cliché.

**Logo concept sketch:** A wordmark in a warm serif, sitting on a thin
horizontal rule with a single small circle where the rule meets the
"T" — read either as a fixed point on a horizon or a full stop that
means what it says. Monogram alternative: "TE" set tightly, the
crossbar of the "T" extended into that same horizon rule. Both are
sketches only — see the visual prototype.

**Palette (calculated, not guessed):**

| Role | Colour | Hex | Contrast |
|---|---|---|---|
| Ink | Deep Ink Green | `#16302C` | 12.6:1 on background (AAA) |
| Background | Warm Stone | `#F6F2E9` | — |
| Accent (buttons/links) | Deep Petrol | `#0B4A46` | 10.1:1 white text (AAA) |
| Secondary (line/dividers only) | Warm Brass | `#A9784A` | Not used for text — decorative rule/border only |

**Three type combinations:**

1. **Fraunces** (display) + **Public Sans** (body) — Fraunces' warmth
   and slight quirk at large sizes gives real character without
   reading as old-fashioned; Public Sans is neutral and highly legible.
2. **Source Serif 4** (display) + **Inter** (body) — the closest to
   continuity with the current live site's type choices, for the most
   evolutionary reading of this direction.
3. **Newsreader** (display) + **Work Sans** (body) — a genuinely
   editorial, newspaper-adjacent serif, leaning into the "Times" name
   more directly than the other two.

All three: OFL-licensed, free, self-hostable via `next/font/google`.

**Photography and image direction:** Real property and (with consent)
staff photography only, natural light, minimal cropping. Warm-toned
colour grading (never full black-and-white, never heavy filters) to
sit comfortably against the warm stone background. Until real
photography exists, placeholders stay clearly labelled, as today.

**Icon and graphic language:** Thin single-weight line icons (1.5px),
rounded terminals, no fill — echoing the logo's single rule-line
motif. A short horizontal rule (the same one from the logo) used as a
recurring section divider throughout the site, replacing card borders
in places for a quieter, more editorial feel.

**Website UI character:** Rectangular corners (2px radius), hairline
borders instead of shadows, generous line-height, the brass rule used
sparingly as a divider — never as a background fill.

**Business card / social post style:** Card: warm stone background,
deep ink wordmark, a single brass rule under the name/title, contact
details set small and quiet. Social post: warm stone background,
petrol accent block for the category label ("For Sale" / "Just
Let"), serif headline for the address, plenty of margin.

**Strengths:** Distinctive without being loud; the petrol tone is a
genuine departure from the navy already in use while staying in the
same "trustworthy, established" register; ages well.

**Risks:** Petrol and deep ink together could read slightly sombre for
a bright residential family audience if not balanced with warm
photography once it exists.

**Suitability:** Strong for both residential and commercial — the
"considered, not rushed" idea applies equally to a first-time buyer
and a commercial landlord.

**Suggested strapline pairing:** "Advice first. Everything else
follows." or "A straight answer, before anything else."

---

## Direction B — "Meridian"

**Strategic idea:** Precision and place. A cooler, more contemporary
identity built around the idea of a fixed reference point — a nod to
London's own Greenwich Meridian, treated entirely abstractly (a line
and a point, never a map or a literal landmark). Positions Times
Estate Ltd as exact and dependable rather than warm and traditional —
the most modern of the three directions.

**Logo concept sketch:** A wordmark in a geometric sans, paired with a
mark of one vertical line crossing one horizontal line at a single
point — a coordinate cross, entirely abstract. Monogram alternative:
"TE" with the crossbar of the "T" and the vertical of the "E" aligned
to form that same cross. Sketches only — see the visual prototype.

**Palette (calculated, not guessed):**

| Role | Colour | Hex | Contrast |
|---|---|---|---|
| Ink | Cool Charcoal-Blue | `#1B2733` | 15.2:1 on white (AAA) |
| Background | White | `#FFFFFF` | — |
| Accent (buttons/links) | Steel Blue | `#2E5C6E` | 7.3:1 white text (AAA) |
| Secondary (fine line only) | Warm Brass Line | `#B08D57` | Not used for text — a single fine rule motif, never a fill |

**Three type combinations:**

1. **Space Grotesk** (display) + **Inter** (body) — geometric,
   technical, confident without being cold.
2. **Manrope** (display) + **IBM Plex Sans** (body) — slightly
   warmer geometric pairing; IBM Plex Sans' engineering heritage
   reinforces the "precision" idea.
3. **Archivo** (display, semi-condensed) + **Public Sans** (body) —
   a wider, more assertive display face for a bolder reading of this
   direction.

Optional utility face: **IBM Plex Mono** for prices, reference
numbers, and postcodes only — a small, deliberate nod to precision in
data, not used for running text.

All three: OFL-licensed, free, self-hostable via `next/font/google`.

**Photography and image direction:** High-contrast, clean-lined
property photography — verticals kept genuinely vertical, minimal
staging in shot. Cooler colour grading than Direction A. Same
placeholder-labelling rule until real photography exists.

**Icon and graphic language:** Precise geometric icons built on a
strict grid, sharp corners, no fill except the accent colour for
active/selected states. The coordinate-cross motif reappears as a
small graphic marker on maps or location references (once genuine
geographic coverage is confirmed — see `SITEMAP.md` open question 4).

**Website UI character:** Sharp corners (0px radius), no shadows, a
strict grid layout, generous negative space, the brass line used only
as a 1px rule under section headings.

**Business card / social post style:** Card: white background, the
coordinate-cross mark top-left, wordmark right-aligned, a single
brass rule separating name from contact details. Social post: white
background, bold Space Grotesk headline, a thin brass rule as the only
decoration, address set in the mono utility face.

**Strengths:** The most distinctive and contemporary of the three;
genuinely different in feel from every competitor reviewed in
`MARKET_RESEARCH.md` and from the current live design; cheap to
maintain visually (relies on type and grid, not heavy imagery).

**Risks:** Highest risk of feeling impersonal for a family-home
audience if the copywriting isn't kept warm; depends on precise
execution — a rushed build could look unfinished rather than
deliberate (the same risk `BRAND_DIRECTIONS.md` flagged for Day 2's
"Quiet Modern" direction, which this shares some character with, but
departs from via the warm brass line and blue-toned rather than
neutral-charcoal palette).

**Suitability:** Best suited to commercial occupiers/investors and
design-conscious buyers/tenants; would need warm copywriting and real
photography to work equally well for residential vendors.

**Suggested strapline pairing:** "London property, plainly put." or
"Estate agency, without the overselling."

---

## Direction C — "The Folio"

**Strategic idea:** Warmth and record-keeping, made approachable. "A
folio" is a page in a ledger or a bound set of documents — playing
gently on "Times" (a record, a publication) without literally
depicting a newspaper or a document icon. The warmest and most
approachable of the three directions, aimed squarely at reducing the
"faceless agency" barrier `BUSINESS_PRIORITIES_AND_AUDIENCES.md`
identifies for buyers and tenants.

**Logo concept sketch:** A wordmark in a warm slab or book serif, with
a small mark made of two overlapping simple rounded rectangles offset
like a folded card or a turned page corner — entirely abstract, no
literal folder/document icon. Monogram alternative: "TE" inside a
single rounded-corner tab shape. Sketches only — see the visual
prototype.

**Palette (calculated, not guessed):**

| Role | Colour | Hex | Contrast |
|---|---|---|---|
| Ink | Warm Dark Brown-Charcoal | `#2B2420` | 13.1:1 on background (AAA) |
| Background | Warm Putty | `#F3EDE4` | — |
| Accent — large text/tags/borders | Soft Clay | `#C1683F` | 3.95:1 white text (AA for large text/UI components only, not small body text) |
| Accent — buttons (darker working shade) | Clay (button) | `#A85530` | 5.2:1 white text (AA, safe for normal-size button text) |
| Secondary | Putty Grey | `#D9CFC0` | Cards, section backgrounds |

**Note on the accent:** softer and dustier than the terracotta already
explored in `BRAND_DIRECTIONS.md` Direction 3 (`#B1522E`) — a
genuinely different hue relationship, not a re-use. As with that
direction, the lighter clay tone must stay on large text/tags/borders
only; the darker button shade is for normal-size button text.

**Three type combinations:**

1. **Lora** (display) + **Nunito Sans** (body) — a book-like serif
   with a soft, rounded, friendly body face.
2. **Bitter** (display, slab serif) + **Karla** (body) — the slab
   serif leans further into the "bound folio" idea; Karla keeps body
   text light and approachable.
3. **Frank Ruhl Libre** (display) + **Mulish** (body) — a more
   literary serif for a slightly more grown-up reading of this
   direction.

All three: OFL-licensed, free, self-hostable via `next/font/google`.

**Photography and image direction:** Warm, natural, slightly
documentary-style photography — real properties and, once confirmed,
real local area detail. Warmer colour grading than either other
direction. Same placeholder-labelling rule until real photography
exists.

**Icon and graphic language:** Rounded-line icons (2px stroke, fully
rounded corners and terminals), occasional single-colour fill in Soft
Clay for emphasis. The folded-corner motif from the logo reappears as
a small tag/label shape on property status badges.

**Website UI character:** Rounded corners (8–10px), soft card shadows
used sparingly, occasional full-width colour-block sections in Putty
Grey to break up long pages — closest in spirit to Day 2's Direction 3
but with a distinct palette and the folio graphic language replacing
that direction's plain colour-block approach.

**Business card / social post style:** Card: putty background, the
folded-tab mark beside the wordmark, clay accent used only for the
job-title label. Social post: putty background, a folded-tab shape
containing the property status ("Just Listed"), warm slab-serif
headline for the address.

**Strengths:** Most approachable and human of the three; best answers
the "faceless agency" barrier directly; distinct from Day 2's
terracotta direction while keeping its warmth.

**Risks:** Warm/approachable palettes are a common convention among
independent agencies — of the three, this is the least visually
distinctive against competitors, and depends on genuinely good local
photography to avoid feeling generic (the same risk `BRAND_DIRECTIONS.md`
flagged for Direction 3).

**Suitability:** Strongest for residential buyers, tenants, and
existing managed tenants; would need deliberate, confident copywriting
to avoid feeling less serious to commercial audiences than Directions
A or B.

**Suggested strapline pairing:** "Properly looked after, properly
explained."

---

## Recommendation (not a decision)

**Recommended direction: A — "The Long View."**

Reasoning: it best answers the core positioning in `BRAND_STRATEGY.md`
(considered advice, not a quick sale) while carrying the lowest
execution risk of the three — its accessibility margins are the
widest, and it sits close enough to the already-approved "Established
Line" that any real content, photography, or component work already
built for the live site would transfer with only colour and type
changes, not a structural rebuild. Direction B is the most
distinctive but carries the highest risk of feeling cold without very
disciplined copywriting; Direction C is the warmest but the least
differentiated from common independent-agency convention.

**This is a recommendation only.** The owner may select any one
direction, reject all three, or combine elements (e.g. Direction A's
palette with Direction B's graphic precision) — see Approval Gate 2 in
the accompanying report.
