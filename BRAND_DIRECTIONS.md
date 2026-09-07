# BRAND_DIRECTIONS.md — Times Estate Ltd

## Status of this document

Three **original, independently created** visual directions were proposed.
**The owner approved Direction 1 ("The Established Line") on 2026-09-07
as a working baseline for Day 3 onward — still changeable at any time**,
particularly once real brand assets (logo, colours, photography — all
currently Missing per `BUSINESS_REQUIREMENTS.md`) are supplied. No
competitor's wording, layout, colours, or imagery from `MARKET_RESEARCH.md`
has been copied — that document was used only to identify *what to
avoid*.

Colour pairs below have been checked against the WCAG 2.2 contrast formula
and the ratio is stated for each — this is a genuine calculation, not a
guess, but should be re-verified with a contrast-checking tool once real
brand colours are chosen.

---

## Direction 1 — "The Established Line"

**Core concept:** A calm, confident, slightly traditional identity built
around ink navy and warm off-white, with a single restrained bronze accent.
Reads as a long-established, trustworthy firm without resorting to gold or
faux-luxury effects.

**Intended impression:** Steady, professional, quietly prestigious —
"an agent you'd trust with your family's biggest asset."

**Target audiences:** Residential vendors, landlords, commercial landlords
— anyone making a high-value, trust-sensitive decision.

**Colour palette**
| Role | Colour | Hex | Use |
|---|---|---|---|
| Primary text/ink | Ink Navy | `#12213C` | Body text, headings |
| Background | Warm Off-White | `#F7F4EE` | Page background |
| Accent (sparing use) | Muted Bronze | `#8C6A3F` | Buttons, links, dividers |
| Secondary | Slate Sage | `#5B6B63` | Supporting UI, icons |

- Ink Navy on Warm Off-White: **contrast ratio 14.6:1** (passes WCAG AAA
  for all text sizes).
- White text (`#FFFFFF`) on Muted Bronze button background: **contrast
  ratio 4.9:1** (passes WCAG AA for normal text; comfortably passes for
  large text/UI components).

**Typography proposal:** A traditional, well-spaced serif for headings
(e.g. a Georgia/Source Serif-style face) paired with a clean, highly
legible sans-serif for body text and forms (e.g. Inter or system-ui
equivalent). Generous line height; no condensed or decorative fonts.

**Photographic approach:** Real Times Estate Ltd property and (with
consent) staff photography only, shot naturally lit and unfiltered.
Until real photography is supplied, any placeholder image must carry a
visible "Sample image — not a Times Estate Ltd property" label.

**Interface approach:** Rectangular or very slightly rounded corners
(2–4px), thin hairline borders instead of drop shadows, generous
whitespace, minimal iconography.

**Sample homepage composition:**
1. Header: logo left, simple nav (Sell / Let / Buy / Rent / Commercial /
   Contact) right, phone number visible.
2. Hero: one real property photo (or clearly labelled placeholder),
   short honest headline, single primary CTA ("Book a Valuation").
3. Three-way service split: Residential / Commercial / Property
   Management, each a plain text-led card, no stock icons.
4. Genuine regulatory trust strip (CMP, redress scheme — once Confirmed).
5. Short "why Times Estate Ltd" section using only confirmed facts (e.g.
   incorporation history), not invented claims.
6. Footer with full navigation, contact details, regulatory information.

**Advantages:** Timeless, low risk of looking dated in 2–3 years, easy to
keep accessible, works well for a trust-led sales message.

**Disadvantages:** Could feel slightly conservative to a younger buyer/
tenant audience if not balanced with confident typography and photography.

**Accessibility considerations:** All core text pairings exceed AA;
bronze accent must not be used for small body text, only buttons/large UI
elements, to stay within its 4.9:1 ratio safely.

**Implementation risk:** Low — standard layout patterns, no unusual
interaction design required.

---

## Direction 2 — "Quiet Modern"

**Core concept:** A stripped-back, editorial, almost architectural
identity — closer to a design studio or modern publication than a
traditional agency. Deep charcoal and a single deep green accent, lots of
white space, strong typographic hierarchy instead of decoration.

**Intended impression:** Modern, precise, uncluttered — "this agency pays
attention to detail."

**Target audiences:** Buyers and tenants (particularly younger, design-
conscious professionals), commercial occupiers.

**Colour palette**
| Role | Colour | Hex | Use |
|---|---|---|---|
| Primary text | Charcoal | `#202124` | Body text, headings |
| Background | Pure/Near White | `#FFFFFF` | Page background |
| Accent | Deep Green | `#1F4B43` | Buttons, links, active states |
| Supporting background | Pale Grey | `#F5F5F4` | Section dividers, cards |

- Charcoal on White: **contrast ratio 16.1:1** (passes WCAG AAA).
- White text on Deep Green button background: **contrast ratio 9.8:1**
  (passes WCAG AAA for normal text).

**Typography proposal:** A single well-made grotesque sans-serif used at
multiple weights (e.g. Inter or similar) for both headings and body —
hierarchy created through size, weight and spacing rather than mixing
typefaces.

**Photographic approach:** Full-bleed, high-contrast property photography
with consistent, minimal cropping — treated like an editorial spread
rather than a brochure. Same placeholder-labelling rule applies until real
photography exists.

**Interface approach:** Sharp corners (0px radius), no shadows, thin
1px rules to separate sections, deliberate asymmetric grid layouts.

**Sample homepage composition:**
1. Header: wordmark only (no icon), nav reduced to essential items,
   right-aligned "Valuation" button.
2. Hero: large single-column headline with a smaller supporting image,
   not a full-width photo banner — text-led rather than image-led.
3. A horizontal, scrollable strip of confirmed service areas (Sales /
   Lettings / Management / Commercial) as plain labelled blocks.
4. A single, confident trust statement (genuine, confirmed facts only)
   rather than a badge wall.
5. Property search entry point presented as a simple, large input field
   rather than a complex filter panel.
6. Minimal footer: contact, navigation, regulatory information only.

**Advantages:** Distinctive against every competitor reviewed (none used
this level of restraint); cheap to maintain visually since it relies on
typography, not heavy imagery; ages well.

**Disadvantages:** Higher risk of feeling "cold" or impersonal for a
family-home sales audience unless copywriting is warm; depends heavily on
getting typography and spacing exactly right — a design that is easy to
execute poorly.

**Accessibility considerations:** Very high contrast throughout is a
genuine accessibility strength; care needed to keep touch targets large
enough on mobile given the minimal, thin-line aesthetic.

**Implementation risk:** Medium — the "quiet" effect depends on precise
execution (spacing, type scale); a rushed build could look unfinished
rather than deliberate.

---

## Direction 3 — "Warm Contemporary Local Expert"

**Core concept:** A warmer, more approachable identity than Directions 1
or 2 — dark green-grey ink, warm paper-white background, and a confident
terracotta accent. Positions Times Estate Ltd as knowledgeable and rooted
in its local area rather than corporate or austere.

**Intended impression:** Knowledgeable, approachable, human — "local
experts who know the area, not a faceless national chain."

**Target audiences:** Buyers, tenants, existing managed tenants, and
first-time landlords who may find Directions 1 or 2 slightly impersonal.

**Colour palette**
| Role | Colour | Hex | Use |
|---|---|---|---|
| Primary text | Deep Ink Green | `#1C2A24` | Body text, headings |
| Background | Warm Paper White | `#FAF7F2` | Page background |
| Accent | Terracotta | `#B1522E` | Buttons, highlights, tags |
| Secondary | Soft Clay | `#E4D9CC` | Cards, section backgrounds |

- Deep Ink Green on Warm Paper White: **contrast ratio 14.0:1** (passes
  WCAG AAA).
- White text on Terracotta button background: **contrast ratio 5.1:1**
  (passes WCAG AA for normal text).

**Typography proposal:** A humanist sans-serif with slightly rounded
letterforms for headings (approachable but still professional), paired
with a neutral, highly legible sans-serif for body text — avoiding a
serif to keep the tone modern rather than heritage-formal.

**Photographic approach:** Warm-toned, natural photography of real
properties and local area detail (street scenes, local landmarks) once
supplied — reinforcing "local expert" positioning honestly rather than
through invented claims of area coverage.

**Interface approach:** Moderately rounded corners (8–10px), soft card
shadows used sparingly, occasional full-width colour-block sections using
Soft Clay to break up the page.

**Sample homepage composition:**
1. Header: logo, nav, and a visible phone number with local dialling code
   once confirmed.
2. Hero: warm, real local imagery with a friendly, plain-English headline
   and two CTAs (e.g. "Book a Valuation" and "Search Properties").
3. A "local expertise" section naming only the actual confirmed area(s)
   of coverage — no invented neighbourhood lists.
4. Service cards for the confirmed twelve service areas, grouped by
   Residential / Commercial / Management.
5. Genuine trust strip (CMP, redress scheme) presented warmly rather than
   as a cold badge wall — short plain-English explanation of what each
   means for the visitor.
6. Footer with full navigation and regulatory detail.

**Advantages:** Most approachable of the three directions; well suited to
a family-facing residential audience; warm palette differentiates from
the navy/charcoal look used by several competitors reviewed.

**Disadvantages:** Terracotta/warm palettes are a fairly common "local
independent agency" convention — slightly less distinctive than Direction
2; risk of feeling generic if the accent colour or rounded-corner style is
overused.

**Accessibility considerations:** Both core pairings pass AA/AAA; the
terracotta accent must be reserved for buttons and short text (headings,
tags) rather than long-form body copy, to stay comfortably within its
5.1:1 ratio.

**Implementation risk:** Low-to-medium — straightforward to build, but
depends on genuinely good local photography to avoid feeling generic.

---

## Recommendation

**Recommended direction: Direction 1 — "The Established Line."**

Reasoning: it best matches the permanent objective ("distinctive premium
… professional, prestigious, established, calm, modern") while carrying
the lowest implementation risk and the strongest accessibility margins.
It is also the most flexible base to warm up later (borrowing photography
warmth from Direction 3) if the owner feels it reads too formal once real
content is in place.

**This is a recommendation only — it is not a decision.** The owner should
choose freely between all three, request changes to any of them, or ask
for a fourth option once real brand assets (logo, existing colours) are
supplied.
