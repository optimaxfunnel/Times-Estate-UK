# MARKET_RESEARCH.md — Times Estate Ltd

**Research date:** 7 September 2026
**Purpose:** Understand how premium London estate agencies present themselves
online, so Times Estate Ltd's website can be genuinely distinctive rather
than a copy of an existing template. Nothing below is used as source
material for our own wording, images or code — it is analysis only, used to
identify patterns to avoid and gaps to exploit.

## Businesses reviewed

No "websites I like" examples have been supplied by the owner yet (see the
open items in `BUSINESS_REQUIREMENTS.md`), so this list was chosen
independently as a reasonable cross-section of premium London agencies with
a mix of residential-only, residential-plus-commercial, and heritage-brand
positioning. It should be revisited once the owner supplies their own
reference sites or names direct local competitors.

| Business | Site reviewed | Notes on selection |
|---|---|---|
| Knight Frank | https://www.knightfrank.co.uk/ | Global prime agency, strong residential + commercial split |
| Winkworth | https://www.winkworth.co.uk/ | Franchise network, heritage positioning, London-focused |
| Dexters | https://www.dexters.co.uk/ | Large London-only agency, high branch density |
| Foxtons | https://www.foxtons.co.uk/ | Well-known London brand, tech-forward positioning |
| Chestertons | https://www.chestertons.com/ | International prime agency, 1805 heritage |
| Hamptons | https://www.hamptons.co.uk/ | Heritage brand (1869), strong compliance/trust display |

Two further sites (Savills, Marsh & Parsons) blocked automated access
(HTTP 403) at the time of research and were not reviewed. This should be
noted as a gap, not treated as if they were reviewed.

## Useful observations

**Navigation and structure**
- Every site separates transaction type at the top level: Buy / Sell / Rent
  / Let, with Commercial (where offered) as its own top-level item rather
  than buried in a submenu.
- Landlord and vendor journeys are given equal weight to buyer/tenant
  journeys in the main navigation — not treated as an afterthought.
- Several sites duplicate navigation in the footer, organised by audience
  (e.g. "Sellers", "Landlords", "About", "Contact") rather than by page
  type — this seems to help visitors self-select quickly.

**Search and discovery**
- Search patterns range from simple (Dexters: a plain Buy/Rent toggle,
  favouring curated collections like "Prime Central London" or "River
  Views" over granular filters) to elaborate (Foxtons: map view, travel
  time, school and tube proximity).
- A simple toggle is not a weakness — it can read as confident and
  uncluttered rather than under-built, provided curated collections are
  genuine and not filler.

**Trust signals**
- Heritage/longevity claims are common and prominent (Chestertons "Founded
  in 1805", Hamptons "since 1869", Winkworth "189 years of heritage",
  Knight Frank "130 years").
- Regulatory badges are displayed clearly in the footer where present
  (Hamptons: Property Ombudsman, ARLA Propertymark Client Money Protection,
  NAEA Propertymark — all as visible logos, not just text).
- Genuine review platforms (Trustpilot, Google Reviews with star ratings)
  are used rather than unattributed quotes.
- Scale claims (office counts, "more sales agreed than any other agent",
  reviewer counts) are used heavily by the larger networks — this is not
  something Times Estate Ltd can or should imitate without genuine,
  evidenced figures.

**Landlord/vendor conversion**
- "Book a free valuation" is the single most consistent primary
  call-to-action across every site reviewed, usually appearing at least
  twice on the homepage.
- Dexters uses an inline date/time booking modal for valuation
  appointments rather than a plain enquiry form — this reduces steps for
  the visitor.
- Property-alert sign-up ("be the first to hear about new and off-market
  properties") is a common secondary conversion path for buyers/tenants.

**Commercial property presentation**
- Where a firm serves both residential and commercial (Knight Frank,
  Chestertons), commercial is a clearly separate top-level section with
  its own tone (more sober, less lifestyle-driven imagery) rather than a
  residential template with different labels.

**Mobile and accessibility (surface-level only — no full audit performed)**
- Responsive image handling (multiple resolution variants) and structured,
  repeated navigation were observed across all sites, suggesting general
  mobile-readiness.
- None of the pages reviewed showed clear evidence of ARIA labelling or
  other accessibility features beyond semantic HTML structure. This is a
  genuine opportunity, not a confirmed weakness — a proper accessibility
  audit of a live competitor site would require dedicated testing tools,
  which was outside the scope of this desk research.

## Weaknesses to avoid

1. **Generic scale-boasting.** Several sites lean heavily on numbers
   (offices, reviews, "leading agency" claims). Times Estate Ltd must not
   copy this pattern with invented or unverifiable figures — Rule 1
   forbids fabricated statistics. Any genuine figure used must be sourced
   and recorded in `CONTENT_VERIFICATION_REGISTER.md` first.
2. **Duplicated, sprawling navigation.** Some mega-menus (Hamptons,
   Foxtons) branch very deep, which can overwhelm a smaller agency's real
   content. A smaller, well-organised sitemap will look more confident,
   not less complete (see `SITEMAP.md`).
3. **Commercial treated as an afterthought.** On agencies where commercial
   is a smaller part of the business, it can read as a residential site
   with a "Commercial" label bolted on. Times Estate Ltd's commercial
   sales/lettings/management should have a distinct, purpose-built section.
4. **Unlabelled "aspirational" stock imagery.** Prime-market sites lean on
   generic luxury lifestyle photography. Without genuine Times Estate Ltd
   photography (currently Missing per `CONTENT_REQUIRED.md`), any
   placeholder imagery must be clearly labelled as demo/sample per Rule 2
   — never presented as if it were real Times Estate Ltd property or staff
   photography.
5. **Heritage/longevity claims used as decoration.** These are only
   trustworthy when true and evidenced. Times Estate Ltd's actual
   incorporation date (19 May 2015, per Companies House) is a genuine,
   confirmed fact and should be used honestly rather than replaced with a
   vaguer or inflated claim.

## Original opportunities for Times Estate Ltd

1. **Genuine regulatory transparency as a trust feature**, not just a
   footer badge — a dedicated, clearly written "how we protect you" page
   covering Client Money Protection and redress scheme membership once
   verified, going further than the single-logo treatment seen elsewhere.
2. **A calmer, less crowded property search** in the Dexters style
   (curated, confident, uncluttered) rather than an attempt to out-feature
   Foxtons' filter density — appropriate for a smaller, quality-focused
   agency and cheaper to build and maintain well.
3. **A genuinely equal commercial section**, purpose-designed rather than
   a residential template re-skinned, reflecting that commercial
   sales/lettings/management is a confirmed core service, not a sideline.
4. **A visibly honest "demo content" convention during build** (Rule 2)
   turned into a small positive signal once live — e.g. a plainly stated
   "every property and figure on this site is real" line once the site is
   fully populated with confirmed content, which few competitors can
   credibly claim given their reliance on stock imagery and unverifiable
   statistics.
5. **A single, well-designed repair-reporting and managed-tenant journey.**
   None of the sites reviewed foreground repair reporting for existing
   managed tenants — most bury it in a portal login. A simple, prominent,
   well-built repair-reporting flow could be a genuine differentiator for
   the property management side of the business.

## Sources

- [Knight Frank](https://www.knightfrank.co.uk/)
- [Winkworth](https://www.winkworth.co.uk/)
- [Dexters](https://www.dexters.co.uk/)
- [Foxtons](https://www.foxtons.co.uk/)
- [Chestertons](https://www.chestertons.com/)
- [Hamptons](https://www.hamptons.co.uk/)

*(Savills and Marsh & Parsons could not be accessed for this research —
HTTP 403 responses were returned. If competitor awareness of these two is
important, they should be reviewed manually.)*
