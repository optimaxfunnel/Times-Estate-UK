# DESIGN_APPLICATION_OPTIONS.md — Times Estate Ltd

**Segment 2 deliverable (2026-10-20), at Approval Gate 2.** Three ways
of applying the **same** supplied identity — the owner's clock-and-
skyline emblem, the "TIMES ESTATE LTD / LONDON PROPERTY EXPERTS"
wordmark, and the measured ivory / ink / copper / bronze / warm-gold
system from `segment-1/BRAND_SOURCE_AUDIT.md` — to the website. None
of the three is a rebrand; they differ in typography, density, and
what leads the page. Nothing here is built; the inspectable style
tiles are on the Design canvas linked from the Gate 2 report
(https://claude.ai/artifact/VhgnWsDATqa2CjLNHUcR8L).

**One option is recommended below. The choice is the owner's.**

---

## 1. What is fixed in all three options

| Element | Fixed value | Source |
|---|---|---|
| Emblem | The supplied clock-and-skyline artwork, as installed 2026-10-20 (`LOGO_ASSET_REGISTER.md`) | Owner |
| Wordmark | "TIMES ESTATE LTD" — "TIMES" ink, "ESTATE LTD" copper — above "LONDON PROPERTY EXPERTS" tracked. Set in **Playfair Display** in every option (the closest open-licence match to the artwork's transitional serif, per Segment 1 §7); today's Merriweather is replaced the moment any option is approved | Segment 1 |
| Colour tokens | Ivory `#FEFEFE` · ivory-warm `#F8E2C8` · surface grey `#F8F8F8` · ink `#131619` · charcoal `#1D1D20` · **copper `#984E15`** (primary: buttons, links, eyebrows — 6.11:1 on white) · copper rule `#9A5230` · copper-on-dark `#C4651B` · bronze `#E1903F` (on dark only; text companion `#AD641B`) · warm gold `#F8AE58` (decorative/on dark; text companion `#B16207`) · gold glow `#FCC67B` (gradient end only) · action orange `#FA641F` (non-text fills and ink-text badges only; white-text companion `#D34605`) · warm greys for borders/secondary text (`#E5E1DB`, `#6B6259`, both from the current build) | Segment 1 §6 |
| Contrast rule | No measured colour is silently replaced; where a colour fails AA for text its companion is used and the pairing is listed | Segment 1 |
| Content rules | No photography until supplied (illustration placeholders, labelled); no reviews, statistics, areas, team or fees until Confirmed; every unsupplied fact shows its status | `CLAUDE.md` Rules 1–2 |
| Accessibility | WCAG 2.2 AA; 44 px targets; visible focus; reduced-motion respected | Phase 6 baseline |
| The current build | The 2026-10-20 homepage (header with grouped dropdowns, dark hero + quick search, service strip, filter-sidebar explorer, valuation band, light footer) is the **starting point for every option**, not a fourth option | `DECISIONS.md` 2026-10-20 |

---

## 2. The three options at a glance

| | **A — Heritage London** | **B — Modern Property Platform** | **C — Boutique London Agency** |
|---|---|---|---|
| In one line | The logo's editorial serif and landmark character carried through the whole site | Search-first, dense, fast — the brand carried by the lockup, copper actions and serif titles | Service-led and trust-forward — statement, two clear paths, proof, then search |
| What leads the homepage | A serif headline over the skyline, then search | The search panel | A statement and two choices (sell/let · buy/rent), then proof |
| Density | Low–medium (3 cards per row) | High (4 cards per row from 1400 px) | Low (2–3 cards, generous space) |
| Headline face | Playfair Display, everywhere | Playfair Display for H1/section titles only | Cormorant Garamond (large sizes only) |
| Body / UI face | Source Serif 4 (long-form) + Inter (UI) | Inter | Inter |
| Dark surfaces | Hero, valuation band, footer | Hero, valuation band; footer light grey | Valuation band and footer only; hero is ivory-warm |
| Distance from today's build | Medium — type, ornament, lower density, editorial templates | **Small** — type and token alignment, chips, map/list, polish | Large — new homepage composition and several content-dependent panels |
| Content it needs that does not exist yet | Area/insight copy to look its best | Nothing beyond what every option needs | Trust proof (team, verified reviews, fees) — all MISSING today |
| Indicative Segment 3 effort | 3–4 days | **1–2 days** | 4–5 days plus content |

---

## 3. Option A — Heritage London

**Idea.** Take the logo seriously as an editorial object: a masthead
header, a serif voice, hairline copper rules, warm ivory panels, and
the clock/landmark motif used sparingly as structure (a dial marker
for process steps, the skyline silhouette as a horizon on dark bands).
Reads as established and London-rooted; relies on good copy.

| Component | Desktop | Mobile |
|---|---|---|
| Header | Ivory, 84 px. Lockup (emblem 52 px). Nav in Inter 500 14 px with a 2 px copper underline on the active item; a 1 px copper-rule hairline under the whole header. Right: search icon, "Get a Valuation" copper button (white text), phone with "Call us today" | 64 px: lockup (emblem 36 px), phone icon, menu. Drawer on ivory-warm; group titles in Playfair 20 px; links Inter 16 px |
| Search hero | Ink. Gold-glow radial from bottom-right, skyline silhouette along the base. Eyebrow "LONDON PROPERTY EXPERTS" with copper rule. H1 Playfair 60/1.05 white. Search card on ivory: tabs as serif text with copper underline (no pills), hairline inputs, copper Search button | Stacked; H1 36 px; card full width; selects in two columns |
| Property card | Ivory, 1 px warm border, no shadow, 4:3 image. Listing type as a small-caps copper tag on an ivory pill; price Playfair 22 px; description and address Inter; hairline-topped stat row; status chip in warning gold (`#8A6008`, existing) | Single column, same card |
| Service card | Row of five on ivory-warm, hairline dividers; copper line icon; Playfair 18 px title; tracked Inter tags with copper dots | 2-up grid, Construction tile spanning |
| Valuation CTA | Ink band, skyline horizon; Playfair 36 white; short gold rule; three points with gold-ringed check icons; copper button; reviews slot with its MISSING status | Stacked |
| Footer | Ink. Lockup reversed (white "TIMES", bronze `#E1903F` "ESTATE LTD"); columns Inter 13 px; headings in copper-on-dark `#C4651B`; legal line white/60 | Stacked columns |
| Typography | H1 Playfair 700 60/36 · H2 Playfair 700 36/28 · H3 Playfair 700 24 · long-form Source Serif 4 18/1.6 · UI Inter 14–16 · eyebrow Inter 600 11 px, 0.3 em tracking, uppercase · prices Playfair 700 | Scale ratio 1.25 |

**Strengths.** Closest to the character of the artwork; distinctive
against portal-style competitors; ages well. **Risks.** Serif body on
dense listing pages slows scanning; needs editorial content (area
guides, insights) that is not written yet; slightly more build time.

---

## 4. Option B — Modern Property Platform

**Idea.** The owner's reference homepage, applied faithfully and
finished: search leads, cards are dense and scannable, actions are
copper, the serif appears where the brand speaks (H1, section titles,
the wordmark) and nowhere it would slow a listing page down. Everything
on screen earns its place; the brand identity is carried by the
lockup, the colour system and the serif titles.

| Component | Desktop | Mobile |
|---|---|---|
| Header | White, 72 px. Lockup (emblem 48 px). Nav Inter 500 14 px with dropdowns (as built). Search icon, copper "Get a Valuation", phone block | 64 px: lockup (emblem 36 px), phone icon, menu; grouped drawer (as built) |
| Search hero | Ink band, ~420 px tall, gold-glow + skyline. Eyebrow + H1 Playfair 44 white + one line. Search panel white: pill tabs (copper active), keyword + Search, four selects, then a row of **quick-filter chips** drawn from real facets (e.g. "2+ beds", "Garden") — never a chip for a facet with no listings | Stacked; H1 32; chips scroll horizontally |
| Property card | White, 1 px border, shadow on hover, 4:3 image. Copper filled ribbon (white text), heart; price Inter 700 20 px tabular; description; address; icon stat row; status chip | Single column; list view optional |
| Service card | Compact five-column strip on white with dividers (as built), Inter titles in Playfair? — no: Playfair 16 px titles, Inter tags | 2-up / 3-up |
| Valuation CTA | Ink band: Playfair 32 headline, three points, copper button; reviews slot with MISSING status | Stacked |
| Footer | Surface grey `#F8F8F8`: lockup, nav row, contacts, socials (hidden until supplied); link columns; regulatory + company line | Stacked |
| Typography | H1 Playfair 700 44/32 · H2 Playfair 700 28/24 · everything else Inter 400/500/600 14–16 · prices Inter 700 tabular · eyebrow Inter 600 11 px tracked | Scale ratio 1.2 |

**Strengths.** Matches the reference the owner chose; **is largely
what already runs** (Segment 3 becomes alignment and polish: Playfair
headings and wordmark, measured tokens, chips, map/list toggle, OG
image); best for buyers/tenants and for a site whose main content
today is listings; cheapest and lowest-risk. **Risks.** The most
"platform-like" of the three — the heritage feel of the logo lives in
the lockup and titles rather than the whole page; if the owner wants
more of the artwork's character, see the combination in §6.

---

## 5. Option C — Boutique London Agency

**Idea.** Lead with the service and the people, not the search box: a
light, warm opening statement with two clear routes ("I'm selling or
letting" → valuation; "I'm looking" → search), a visible "How we
protect you" panel high on the page, larger cards with more room, and
services presented as full-width rows with real explanation. The
elegant display serif and ivory-warm fields make it feel personal and
high-trust.

| Component | Desktop | Mobile |
|---|---|---|
| Header | Ivory, 88 px, no hard rule. Lockup (emblem 56 px). Nav Inter 500 14 px, wide spacing. Right: phone number large ("Speak to us"), "Book a Valuation" as a copper **outline** button that fills on hover | 64 px: lockup (emblem 36 px), "Call" pill, menu |
| Search hero | **Ivory-warm**, light. Emblem large as the hero's art (right), H1 Cormorant 64/1.0 ink, one-line intro, two large buttons (copper filled / ink outline). Beneath, a compact one-row search bar (Buy/Rent toggle, location, Search) | Stacked; emblem above headline; H1 40 |
| Property card | Ivory, no border, hairline bottom rule; 3:2 image; price Cormorant 28; small-caps copper tags; generous padding; 3 per row | Single column |
| Service card | Full-width alternating rows (ivory / ivory-warm): copper icon, Cormorant 32 title, two-line description, "Find out more →" copper link | Stacked rows |
| Valuation CTA | Ivory-warm panel with ink text, copper button, phone number large, and a **three-step "What happens next"** (a real sequence, so numbering is honest: request → visit → written appraisal) | Stacked |
| Footer | Ink with a thin gold top rule; lockup reversed; columns; copper-on-dark headings | Stacked |
| Typography | H1 Cormorant Garamond 600 64/40 (never below 28 px — it is too fine for small text) · H2 Cormorant 600 40/32 · body/UI Inter 400/500/600 16–17 · prices Cormorant 600 · eyebrow Inter 600 11 px tracked · wordmark stays Playfair | Scale ratio 1.333 |

**Strengths.** Highest-trust presentation for vendors and landlords
(the top-ranked business priority); most distinctive from portals;
room for the brand's warmth. **Risks.** Every "trust" surface it
foregrounds is **MISSING** today — no team, no verifiable reviews, no
fees, regulatory memberships unverified — so at launch it would show
its status badges where C most needs proof; search is demoted, which
costs buyers/tenants a click; most build effort and the most copy.

---

## 6. Recommendation (not a decision)

**Recommended: Option B — Modern Property Platform.** Three reasons,
in order of weight:

1. **It is the owner's own reference, finished.** The 2026-10-20 build
   already follows that layout; B turns it into a complete system
   (type, tokens, chips, map/list, share image) in one short segment.
2. **It fits the content the business can publish today.** B needs
   listings, facts and badges — all of which exist. A needs editorial
   copy and C needs trust proof, neither of which exists yet; both
   would ship with more visible "MISSING" labels than B.
3. **It serves the conversion order in `BUSINESS_PRIORITIES_AND_AUDIENCES.md`.**
   Valuation stays the persistent header action on every page; search
   serves buyers and tenants immediately; the landlord and investor
   pages carry the service content without demoting search.

**If the owner wants more of the artwork's heritage character without
giving up B's structure, the combination to specify is "B with A's
typography"**: Playfair Display for every heading (not only H1), serif
pull-quotes on About / How-we-protect-you / area pages, and A's
hairline-rule treatment on light panels — the same density and
components as B otherwise. That is a clearly specified combination
this document can build from.

**Choose A, B, C, or a specified combination at Approval Gate 2.**
Whatever is chosen also fixes: Playfair Display as the wordmark face,
the measured colour tokens replacing the Phase 6 approximations in
`globals.css` (same hues; the two current values `#A8551A`/`#D9772E`
sit inside the measured family), and the share image.

---

## 7. What every option leaves alone

The lead pipeline, admin area, data model, search parameters, forms,
accessibility patterns, security headers and the honesty conventions
(status badges, demo labels) — the identity is applied to the surface
only. Nothing is deployed or connected by choosing an option.
