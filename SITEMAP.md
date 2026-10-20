# SITEMAP.md — Times Estate Ltd

# Segment 2 — Proposed sitemap and navigation (2026-10-20, at Approval Gate 2)

**Status.** A proposal for the owner's approval. It keeps every route
that exists in the build today (nothing is removed), adds the pages
the Segment 2 brief asks for, and leaves out one the brief makes
conditional. The Phase 4 sitemap below (2026-09-09) remains the
detailed page-by-page specification where this section does not
change it — in particular §5 (map/list results), §6 (property card),
§7 (property detail), §19 (mobile) and §20 (save/share/alerts).

## S2.1 The sitemap

Legend: **exists** = built today · *proposed* = not built · (gated) =
page template allowed, content only when the fact behind it is
Confirmed.

```
/                                   Home                                   exists
├── Properties
│   ├── /buy                        Residential for sale — list / ?view=map   exists (map view proposed)
│   ├── /rent                       Residential to rent — list / map          exists
│   ├── /commercial                 Commercial hub                            exists
│   │   ├── /commercial/for-sale    Commercial for sale — list / map          exists
│   │   └── /commercial/to-let      Commercial to let — list / map            exists
│   ├── /property/[id]              Property detail (all categories)          exists
│   ├── /property-alerts            Property alerts                           exists
│   ├── /favourites                 Saved properties                          exists
│   └── /register                   Register your requirements                exists
├── Sell
│   └── /sell                       Sell + sales valuation form               exists
├── Let
│   ├── /let                        Let + landlord services + rental valuation  exists
│   └── /property-management        Residential & commercial management       exists
│       (Guaranteed Rent — NOT included: conditional on factual verification
│        and legal review; see S2.4)
├── People
│   ├── /buyers                     Buyers guide (how buying works)           proposed
│   ├── /tenants                    Tenants guide (renting, fees, deposit)    proposed
│   └── /investors                  Investors (process, management; no returns)  proposed
├── /report-a-repair                Repair report + emergency guidance        exists
├── /areas                          Area guides index                         proposed (gated)
│   └── /areas/[area]               One guide per confirmed area              proposed (gated)
├── About
│   ├── /about                      Company, regulatory, team (when supplied), construction mention   exists
│   ├── /how-we-protect-you         Redress · CMP (certificate) · deposit scheme · PI insurance · complaints   proposed
│   ├── /insights                   Insights index                            proposed (gated)
│   │   └── /insights/[slug]        Article                                   proposed (gated)
│   └── /contact                    Contact + callback                        exists (/callback exists)
└── Legal & disclosures (footer)
    ├── /complaints                 Complaints handling procedure             exists (draft)
    ├── /fees                       Fees (landlord, vendor, commercial)       exists (figures MISSING)
    ├── /tenant-fees                Tenant fees (permitted payments)          proposed (Phase 4 §18)
    ├── /privacy-policy  /cookie-policy  /terms  /accessibility               exist (drafts; accessibility published)
    └── Company disclosures          footer line on every page: legal name, number, registered office   exists

/residential                         Existing hub — kept, out of navigation; a 301 candidate to /buy once Area Guides exist
/admin/*                             Staff only — unchanged, not deployable until real auth
```

**Map/list results:** the Phase 4 §5 specification stands — `?view=map`
on each of the four search pages, filters shared between views, pins at
approximate coordinates only, full-screen map on mobile. Until a map
provider is approved (Rule 4), the "Search by Area" panel built on
2026-10-20 is the honest stand-in.

## S2.2 Navigation

**Desktop header** (as built 2026-10-20 to the owner's reference,
contents now settled):

| Item | Dropdown |
|---|---|
| Home | — |
| Properties | Property for sale · Property to rent · Commercial for sale · Commercial to let · Map search *(when live)* · Property alerts · Saved properties |
| Landlords | Let your property · Rental valuation · Property management · Commercial lettings · How we protect you *(proposed)* |
| Tenants | Property to rent · Tenants guide *(proposed)* · Report a repair · Tenant fees *(proposed)* · Property alerts |
| Services | Sell your home · Let your property · Property management · Commercial · Buyers *(proposed)* · Investors *(proposed)* |
| About | About us · How we protect you *(proposed)* · Area guides *(only when ≥1 real guide)* · Insights *(only when ≥1 real article)* · Complaints |
| Contact | — |
| Utility (right) | Search icon → `/buy` · **Get a Valuation** → `/sell` · phone with "Call us today" |

Rule carried forward: a proposed page joins its dropdown only when it
exists with real content — a dropdown never links to an empty template.

**Mobile:** the same groups in the drawer (built), with "Get a
Valuation" and the phone number always visible under the list.

**Footer:** row 1 lockup · top-level links · phone/mobile/email ·
social (hidden until supplied); row 2 columns by audience — Sellers ·
Landlords · Buyers & Tenants · Commercial · Company · Legal ·
Regulatory (with status badges); row 3 company disclosures and the
Construction mention.

## S2.3 Page purposes and primary calls to action

| Page | Purpose | Primary CTA (→ lead category) | Secondary |
|---|---|---|---|
| `/` | Orient; get searchers into results; route sellers/landlords to a valuation | Search (hero) | Get a Valuation (header, band); Report a repair (footer) |
| `/buy`, `/rent`, `/commercial/*` | Find and shortlist | Book a viewing (per card → detail → `viewing_request`) | Save; Create a property alert; register |
| `/property/[id]` | Decide to view | Book a Viewing (`viewing_request`) | Request a callback; Save; Share |
| `/sell` | Convert a vendor | Book a Valuation (`sales_valuation`) | Call; How we protect you |
| `/let` | Convert a landlord | Request a Rental Valuation (`rental_valuation`) | Management enquiry; fees; How we protect you |
| `/property-management` | Convert a landlord to management; serve managed clients | Request a Management Appraisal (`management_enquiry`) | Report a repair; commercial management |
| `/commercial` | Give commercial equal standing | Enquire (`commercial_enquiry`) | Commercial appraisals; search commercial |
| `/buyers` *(proposed)* | Explain buying; reassure | Search for sale | Property alerts; register (`buyer_registration`) |
| `/tenants` *(proposed)* | Explain renting, fees, deposit, repairs | Search to rent | Register (`tenant_registration`); Report a repair |
| `/investors` *(proposed)* | Explain the service for owners of let property — process only | Enquire (`commercial_enquiry` or `management_enquiry`) | Request a rental valuation |
| `/report-a-repair` | Log a repair fast; show emergency route | Submit a repair report (`repair_report`) | Call (emergency) |
| `/areas/[area]` *(gated)* | Local context → listings | Search in this area | Valuation in this area |
| `/about` | Due diligence | Contact the team (`general_enquiry`) | How we protect you; Complaints |
| `/how-we-protect-you` *(proposed)* | Show regulatory protection with real status | Get a Valuation | Complaints; Fees |
| `/insights/[slug]` *(gated)* | Genuine guidance | Related service page | Alerts |
| `/contact` | Reach a person | Send message (`general_enquiry`); call | Request a callback (`callback_request`) |
| Legal pages | Statutory | — | Contact |

## S2.4 Pages considered and not included

| Page | Decision | Reason |
|---|---|---|
| Guaranteed Rent | **Not included** | The brief allows it only if factually verified and legally reviewed. Today it is neither: the scheme's existence and terms are unconfirmed (Segment 1 Q4) and a rent guarantee is a financial promise requiring professional review (`COMPLIANCE_REGISTER.md` row 22). The route (`/guaranteed-rent`) is reserved, not built |
| Construction | Not included (standing decision) | Mention only — footer line and About, phone number |
| Developments / New Homes | Not included | Still unconfirmed as a service |
| Visitor accounts | Not included | Favourites and alerts work without one (Phase 4 §20) |
| Careers | Not included | No confirmed need |

---

# Historical — Phase 4 (2026-09-09), the detailed page specification

## Status of this document (Phase 4)

**Phase 4 deliverable (2026-09-09) — the final information
architecture, wireframe spec, and user-journey map, at Approval Gate
4.** This supersedes the Day 2/3 working baseline (kept below as
"Historical — Day 2/3 baseline" for the record, not deleted) with a
structure that reflects everything decided since: the real "Times
Estates" brand (`BRAND_GUIDELINES.md`), the four-tab homepage search
and rotating hero, a dedicated map/list results spec, and new pages
(Buyers/Tenants/Investors hub, Area Guides, Insights, a dedicated
Tenant Fees page) the owner asked for in the Phase 4 brief.

**Construction/renovation services — resolved, per the owner's answer
to this phase's gating question (2026-09-09):** *mention only, not
built.* No Construction page, nav item, or journey exists anywhere in
this document. A single factual line noting the business also offers
Construction services, with its own phone number, appears on `/about`
and in the footer's small print only — see §14 below. Nothing else
references it.

**Nothing in this document is implemented.** These are wireframes —
structural, inspectable, and specified in enough detail to build from
— not the final polished website. See the companion wireframe
artifact (link given in the Phase 4 report) for the visual layer.

**Geographic coverage is still not confirmed** beyond the registered
office (145 Upper Tooting Road) and the trading address on the current
business card (127 Upper Tooting Road) — both London SW17. No specific
neighbourhood names are used anywhere below; Area Guides (§12) is
specified as a template with zero real guides written, exactly as
`SEO_PLAN.md` already recommended, until areas are confirmed.

---

## 1. Navigation

**Primary desktop navigation (left to right):** Buy · Rent · Sell ·
Let · Commercial · Property Management · Areas · About · Contact.

Changed from the Day 2/3 order (Sell · Let · Buy · Rent · ...): buyer/
tenant search now leads, matching the four-tab search becoming the
homepage's dominant element and the Phase 4 brief's own page order.
This is a **recommendation, not yet approved** — flagged explicitly at
Approval Gate 4 below, since `SITEMAP.md`'s Day 2/3 version raised the
same open question and it was never answered.

**Header, every breakpoint:** the "Times Estates" logo (left,
`BRAND_GUIDELINES.md`), primary nav (desktop) or menu icon (mobile),
phone number (`0208 672 8080`, click-to-call on mobile), and a
"Book a Valuation" button — always visible, never hidden behind the
mobile menu, matching the Day 2/3 priority-action rule.

**Footer navigation**, grouped by audience:

| Group | Links |
|---|---|
| Buyers | Property for sale, Saved properties, Property alerts, Area guides |
| Tenants | Property to rent, Report a repair, Tenant fees |
| Sellers | Sell your home, Sales valuation |
| Landlords | Let your property, Property management, Rental valuation |
| Commercial | For sale, To let, Commercial management |
| Company | About, Insights, Contact, Careers *(mailbox only — see `EMAIL_AND_FORM_ROUTING.md`; no careers page exists, matching the Day 2/3 decision not to build one without a confirmed need)* |
| Legal | Privacy Policy, Cookie Policy, Terms of Website Use, Complaints Handling Procedure, Tenant Fees, Accessibility Statement |

**Footer small print, bottom band:** legal name, company number,
registered office, redress scheme/CMP badges (once Confirmed), and
the one-line Construction mention (§14).

---

## 2. Homepage (`/`)

**Purpose:** Orient every audience in one screen, get residential and
commercial searchers straight into results, and route sellers/
landlords toward a valuation.

**Structure, top to bottom:**

1. **Hero — rotating slideshow + four-tab search.** Full-width,
   auto-rotating image/video banner, structured like Foxtons.co.uk's
   homepage banner **in layout only** — never its colours, branding,
   or code. 4–6 slides, 6-second auto-rotate, manual prev/next arrows
   and dot indicators, pauses on hover/focus and **stops rotating
   entirely** under `prefers-reduced-motion: reduce` (showing the
   first slide static) rather than merely slowing down. Every slide is
   a clearly labelled placeholder image ("Sample image — not a real
   Times Estates property") until real photography is supplied — Rule
   2. A four-tab search panel (**Buy · Rent · Commercial Sale ·
   Commercial Rent**) sits just below the banner, overlapping its
   bottom edge by roughly one-third of the panel's height on desktop
   (full-width, non-overlapping stacked below on mobile — see §17).
   Each tab holds: a location/postcode text field, a price range
   select, a bedrooms select (residential tabs only) or a
   use-class select (commercial tabs only), and a "Search" button
   that submits to the matching results page (§5) with the tab's
   listing-type/category pre-set.
2. **Trust strip.** Confirmed facts only: Companies House-registered
   since 2015, redress scheme/CMP badges (shown with their real
   status — "Requires verification" until cleared, never presented as
   Confirmed early), "no invented valuation figures" as a genuine
   differentiator (`BRAND_STRATEGY.md` §2).
3. **Service overview.** Three or four cards: Residential, Commercial,
   Property Management, (Buyers/Tenants/Investors as a fourth if
   distinct enough not to duplicate the search tabs above) — each
   linking to its hub page.
4. **Featured properties.** A row of property cards (§6), pulling from
   whichever demo/real listings exist, each visibly labelled "Sample
   property — not real" while data is fabricated (unchanged rule).
5. **Sell/Let split CTA band.** Two side-by-side panels — "Thinking of
   selling?" → Book a Valuation, "Thinking of letting?" → Request a
   Rental Valuation — the two highest-intent conversions after search.
6. **Area expertise.** A short, honest statement of coverage (generic
   until confirmed, §12) linking to `/areas` once real guides exist;
   omitted entirely, not shown empty, until at least one area guide is
   real.
7. **Guides/insights teaser.** Two or three Insights article cards
   (§13) once real articles exist; the whole section is omitted, not
   shown empty, until then — same principle as area expertise.
8. **Footer** (§1).

**Principal CTA:** the four-tab search itself. **Supporting CTAs:**
Book a Valuation, Request a Rental Valuation, Ask the Assistant
(existing widget, unchanged).

**Draft copy (UK English, confirmed facts only):**

> **H1 (over/near the hero, not baked into the slideshow images so it
> stays screen-reader accessible and independent of which slide is
> showing):** "Straightforward property advice, from a London agency
> that says what it means."
> **Sub-head:** "Search homes and commercial property to buy or rent,
> or get a straight answer on selling, letting or managing yours."

Flagged for evidence: none of the above states a statistic, an award,
or a number of properties — deliberately, per `CONTENT_REGISTER.md`'s
prohibited-to-invent list.

---

## 3. Buy — Residential For Sale (`/buy`)

Already built and functioning (`WEBSITE_AUDIT.md` §3) with location,
price, bedrooms, property-type filters and sort. Phase 4 changes: add
a map/list toggle (§5), align the results grid and property card to
the new brand tokens, and add the "Register for Alerts" CTA more
prominently when a search returns few/no matches (already exists,
confirmed working — keep as-is).

- **Purpose:** let buyers search current for-sale listings.
- **Audience:** buyers, investors.
- **Principal CTA:** Book a Viewing (per result) / Register for
  Alerts (empty or narrow result set).
- **Supporting CTA:** Save property, Share property, switch to Rent.
- **Data required:** none to search (anonymous); a viewing request
  collects name, email, phone, preferred times, consent to be
  contacted (existing `LeadForm` pipeline, unchanged).
- **Success:** confirmation screen + email placeholder ("we'll be in
  touch — no email is actually sent yet, no provider is connected,"
  unchanged from today's honest state). **Failure:** inline validation
  errors; a genuine server error shows a plain "something went wrong,
  try again or call us" message with the phone number, never a raw
  error.

## 4. Rent — Residential To Let (`/rent`)

Same structure and journey as Buy, category `residential`/`letting`.
Additional field on the search: move-in date. Property card shows
`pcm` price and furnishing status when supplied.

## 4a. Commercial For Sale (`/commercial/for-sale`) and Commercial To Let (`/commercial/to-let`)

Same pattern as Buy/Rent, category `commercial`. Filters swap bedrooms
for **use class** (office/retail/industrial/other — only shown once
sector coverage is confirmed, per the existing open question) and add
a **floor area** range filter (`DATA_MODEL.md`'s commercial fields).
Property card shows floor area and rent-per-annum or price instead of
bedrooms. These two pages already exist in the live build
(`WEBSITE_AUDIT.md` §4 "Day 4 note") — Phase 4 aligns them to the same
map/list and card spec as residential rather than introducing a
different pattern for commercial.

## 5. Map/List Property Results (shared spec — Buy, Rent, Commercial For Sale, Commercial To Let)

**New in Phase 4** — not built today; a full specification for all
four search pages to share one behaviour.

- **View toggle:** "List" (default) / "Map" buttons, top-right of the
  results header, state kept in the URL (`?view=map`) so a shared link
  reopens the same view.
- **List view:** the existing card grid (§6), paginated (or
  infinite-scroll — **flagged as an open implementation choice**, not
  decided here) with the sort control (Newest, Price low–high, Price
  high–low, Bedrooms — residential only) already built, unchanged.
- **Map view:** a single map (provider not yet chosen —
  `INTEGRATIONS.md` should compare options; this is a paid/third-party
  service requiring Rule 4 approval before connecting anything) with
  one pin per result at its **approximate** coordinates only
  (`DATA_MODEL.md`'s existing privacy rule — never the precise
  address), Copper Orange pins (`BRAND_GUIDELINES.md` §E), clicking a
  pin opens a compact card preview, "search this area as I move the
  map" toggle (default off, so results don't silently change).
- **Filters panel:** persists identically between List and Map (not
  duplicated or reset on toggle) — price, bedrooms/use-class, property
  type, location/postcode, plus the map-only "search this area"
  toggle.
- **Loading state:** skeleton cards (list) or a centred spinner over a
  muted map tile (map) — never a blank white screen.
- **Empty state:** existing honest empty-state copy
  ("No properties currently match your search" + Register for Alerts
  CTA), unchanged, shown in both views.
- **Error state:** if the property provider fails, show "We couldn't
  load properties right now — try again, or call us on 0208 672 8080,"
  never a stack trace or blank page. Map failures (tile provider
  unreachable) fall back to List view automatically with a small
  inline notice, rather than showing a broken map.
- **Mobile:** List/Map toggle becomes two large tap targets under the
  filters bar; Map view opens full-screen with a "Show list" floating
  button rather than a split-screen layout, which doesn't have room on
  a phone.

## 6. Property Card (shared component)

Fields shown, in order: primary image (or "Photograph not yet
supplied" placeholder), status badge if not plain "Available" (Under
Offer / Sold STC / Let Agreed — `DATA_MODEL.md`'s status list), price
+ qualifier, display address (postcode district only, never the full
address — existing privacy rule), bedrooms/bathrooms or floor area,
property type, save (heart icon, top-right of image), a "Sample
property" badge whenever `isDemo: true`. Clicking anywhere on the card
except Save navigates to the detail page.

## 7. Property Detail (`/property/[id]`)

Already built, two-column at desktop (Day 7 fix, re-verified Phase 1).
Phase 4 changes: re-skin to the new brand tokens; no structural
change. Confirmed information shown, grouped:

- **Gallery** (images, floor plan, brochure, video/tour if supplied).
- **Headline block:** price + qualifier, display address, status
  badge, save/share buttons.
- **Key facts:** bedrooms/bathrooms/reception rooms or floor area/use
  class, property type, tenure (if supplied).
- **Description:** full description as supplied.
- **Material information:** the existing Part A/B fields
  (`DATA_MODEL.md`), with the material-information disclaimer already
  live, unchanged — `COMPLIANCE_REGISTER.md`'s "requires legal review"
  status stays as-is.
- **Map:** approximate location only (same privacy rule as §5).
- **CTA block:** Book a Viewing (primary), Request a Callback, Save,
  Share (copy link + native share sheet on mobile; no social-network-
  specific share buttons unless the owner wants social accounts
  connected — a Rule 4 decision, not assumed).
- **"Similar properties"** strip at the foot — same category/price
  band, reusing the property card.

## 8. Sell — Residential Sales & Valuation (`/sell`)

Existing page, structure unchanged, re-skinned to the new brand. Fee
information stays "ask us for a fee quote" until Confirmed
(`CONTENT_REGISTER.md`). Journey: **Book a Valuation** → form (name,
property address, phone, email, preferred contact time, consent
checkbox: *"I'd like Times Estates to contact me about my property. I
can withdraw consent at any time — see our Privacy Policy."*) →
success screen ("A member of our team will be in touch to arrange a
visit — this does not confirm a valuation figure," matching the
existing honest wording) → failure: inline validation, or the generic
server-error message from §5.

## 9. Let — Residential Lettings & Rental Valuation (`/let`)

Same pattern as Sell, journey renamed **Request a Rental Valuation**.
Includes the existing letting-vs-management explanation and CMP/
redress trust content, both still "Requires verification" (unchanged
status).

## 10. Property Management — Residential & Commercial (`/property-management`)

Existing page, two audiences on one page (landlords → Request a
Management Appraisal; existing tenants → Report a Repair), unchanged
structure. Phase 4 adds a commercial-management cross-link since
Commercial (§11) now folds its management page into this one rather
than keeping `/commercial/management` as a separate near-duplicate —
**flagged as a proposed consolidation, not yet built**, since the
existing `/commercial/management` route already exists per the Day 4
note in the historical section below.

## 11. Commercial hub (`/commercial`)

Existing page. Three sub-sections (sales, lettings, management),
sector coverage still withheld pending confirmation (unchanged rule).
Principal CTA: Enquire about Commercial Sales/Lettings/Management,
routing into the same `LeadForm` pipeline with category pre-set.

## 12. Buyers, Tenants & Investors hub (`/buyers-tenants-investors`)

**New page, Phase 4.** Purpose: a single informational hub for people
who aren't ready to search yet — "how buying works," "how renting
works," "investing in London property" (general process information
only, never investment advice — `AI_SAFETY_RULES.md`'s existing
refusal pattern extends here: this page states process, not returns
or advice). Principal CTA: jump to Buy/Rent search. Supporting CTA:
Register for Alerts, Ask the Assistant. No form of its own.

## 13. Area Guides (`/areas`, `/areas/[slug]`)

**New page, Phase 4 — specified as a template, zero real guides
written**, exactly as `SEO_PLAN.md` already recommended and the Day
2/3 sitemap correctly excluded until now. The index page
(`/areas`) is **omitted from primary navigation entirely** until at
least one real, fact-checked guide exists — an empty "Areas" section
would look worse than not having the page. Per-area template (once
areas are confirmed): overview, transport links, local amenities
(only genuinely verifiable, sourced facts — never invented "vibrant
local scene" filler), current listings in that area (reusing the
property card grid filtered by area). **Every fact on a future area
guide needs a source** — this template does not pre-populate any
placeholder claims, only the section headings.

## 14. About (`/about`)

Existing page, confirmed company facts only (unchanged). **New in
Phase 4, per the owner's answer to this phase's gating question:** one
factual line, "Times Estates also offers Construction and renovation
services (tiling, flooring, plastering, extensions, kitchen and
bathroom remodelling) under a separate line — call 0208 6738 555 for
Construction enquiries." Sourced from the owner's own business card
(`CONTENT_VERIFICATION_REGISTER.md` item 15, updated below). No link,
no dedicated section, no nav item — a mention, not a service page, per
the owner's explicit instruction.

## 15. Insights (`/insights`, `/insights/[slug]`)

**New page, Phase 4 — specified as a template, zero real articles
written.** Purpose: genuine market/process content (e.g. "What
happens after you accept an offer") that supports SEO and buyer/
seller confidence without inventing statistics. **Omitted from
primary navigation until at least one real article exists**, same
principle as Area Guides. Every article requires an author line
("Times Estates") and a last-reviewed date — no anonymous, undated
claims.

## 16. Contact (`/contact`)

Existing page, now Confirmed-complete for phone/email/trading address
(this session's earlier work) — only opening hours remains Missing.
Re-skin to new brand tokens; structure unchanged (address, phone,
email, form).

## 17. Report a Repair (`/report-a-repair`)

Existing page, unchanged structure. Emergency/out-of-hours process
remains Missing (`WEBSITE_AUDIT.md` §4) — this page cannot be
described as complete until the owner supplies that process.

## 18. Legal and regulatory pages

Privacy Policy, Cookie Policy, Terms of Website Use, Complaints
Handling Procedure — existing, drafted, unchanged, still "Requires
professional review." **New in Phase 4: a dedicated Tenant Fees page**
(`/tenant-fees`), split out from the existing combined `/fees` page so
it can be linked directly from tenancy-related journeys and the
footer's Legal group by its own name, per the Tenant Fees Act 2019
convention of a clearly, separately signposted fees page — real
figures remain Missing until supplied; the page structure (permitted
payments vs. prohibited payments, per the Act) can be built now, the
numbers cannot.

## 19. Mobile behaviour (applies across every page above)

- Header collapses to logo + menu icon + phone (click-to-call) +
  "Book a Valuation" button, unchanged from the existing pattern.
- The homepage hero slideshow and search tabs **stack rather than
  overlap** on mobile (<640px) — the search panel sits directly below
  the slideshow as a full-width block, not overlapping it, since an
  overlapping panel on a narrow viewport would clip both the last
  slide content and the panel's own fields.
- Map view (§5) opens full-screen on mobile rather than split-screen.
- Every form keeps large (44px minimum) tap targets and native mobile
  keyboard types (`type="tel"`, `type="email"`) — already the existing
  pattern (`ACCESSIBILITY.md`), carried forward, not new.

## 20. Save, share, alerts, accounts

- **Save (favourites):** browser-local only, unchanged from the
  existing `/favourites` page — no account required, no server-side
  storage (nothing to secure or lose).
- **Share:** copy-link + native share sheet on supporting devices;
  no social-network-specific buttons without an explicit decision to
  connect social accounts (Rule 4).
- **Alerts:** existing `/property-alerts` registration (email +
  search criteria), unchanged — still no email provider connected, so
  a submitted alert is stored but **not yet actually emailed to
  anyone** until `EMAIL_AND_FORM_ROUTING.md`'s plan is acted on and
  approved (Rule 4).
- **Accounts (login/registration for buyers/tenants):** **not
  proposed in this phase.** Favourites and alerts already work without
  an account; adding one would mean real authentication, password
  storage, and data-protection obligations this project isn't ready
  to take on (the existing admin area's mock auth is explicitly not
  production-grade — `SECURITY.md`). Flagged as a possible future
  phase, not assumed here.

---

## 21. User journeys (purpose, CTA, form, data, consent, outcome)

| Journey | Entry point(s) | Primary CTA | Form fields | Consent wording | Success | Failure |
|---|---|---|---|---|---|---|
| Search for sale/rent | Homepage hero tabs, header nav, footer | Search | Location, price range, bedrooms/use-class | None (no personal data) | Results list/map | Empty-state + Register for Alerts |
| Book a viewing | Property detail | Book a Viewing | Name, email, phone, preferred times | "I'd like Times Estates to contact me about this property." | Confirmation screen, no email sent yet (honest state) | Inline validation / generic server-error message |
| Sales valuation | Home, `/sell` | Book a Valuation | Name, address, phone, email, contact time | "I'd like Times Estates to contact me about my property. I can withdraw consent at any time — see our Privacy Policy." | "A member of our team will be in touch — this does not confirm a valuation figure" | Same as above |
| Rental valuation | Home, `/let` | Request a Rental Valuation | Same as sales, plus current tenancy status | Same wording, "about my property" → "about letting my property" | Same pattern | Same |
| Landlord management enquiry | `/property-management`, `/commercial` | Request a Management Appraisal | Name, property address, phone, email | Same consent pattern | Same | Same |
| Report a repair | `/property-management`, `/report-a-repair`, footer | Submit a Repair Report | Name, property address, phone, issue description, urgency | "I consent to Times Estates contacting me about this repair." | "We've received your report — a member of the team will respond" (no promised timescale — still Missing) | Inline validation / generic error |
| Register for alerts | Search results empty state, property detail, footer | Register for Alerts | Email, search criteria | "I'd like to receive property alerts matching my search by email. I can unsubscribe at any time." | "You're registered — alerts are stored, not yet emailed (no provider connected)" **flagged as a known current limitation, not hidden** | Inline validation |
| General enquiry | `/contact` | Send Message | Name, email, message | Implicit by submitting a contact form (standard, no separate checkbox needed per current legal-page drafts — flag for solicitor review alongside the rest of `/privacy-policy`) | "Thanks — we'll be in touch" | Inline validation / generic error |
| Commercial enquiry | `/commercial` and its sub-pages | Enquire | Name, company (optional), phone, email, requirement summary | Same consent pattern as valuation | Same pattern | Same |

Every row above reuses the existing `LeadForm` pipeline
(`AUTOMATION_WORKFLOWS.md`) — Phase 4 does not propose a new form
system, only new entry points into the one that already exists,
tested, and rate-limited.

---

## 22. Copy direction and flagged claims

**Voice:** unchanged from `BRAND_STRATEGY.md` §3 — straightforward not
blunt, established not old-fashioned, knowledgeable not showy. Every
draft line in this document was checked against that table before
being written.

**Every claim used above and its evidence status:**

| Claim | Status |
|---|---|
| "Companies House-registered since 2015" | Confirmed |
| Redress scheme / CMP badges | Requires verification — shown with that status, never as Confirmed |
| "No invented valuation figures" | Confirmed — a genuine, verifiable structural fact about how the site works (`valuation-terms.ts`) |
| Any area-specific claim | Not written anywhere — Area Guides ship with zero real content until confirmed |
| Any statistic, award, testimonial, staff bio | Not written anywhere — unchanged prohibition |

No new fact was invented to fill a wireframe placeholder — every
placeholder above is explicitly labelled as such in the spec, not
quietly filled with invented-sounding but fictional copy.

---

## Pages considered but not included (Phase 4 review)

| Considered page | Decision | Reason |
|---|---|---|
| Dedicated Construction/renovation page | **Not included** | Owner's explicit answer to this phase's gating question: mention only (`about`/footer), not a page |
| Accounts / login for buyers & tenants | Not included | Favourites/alerts already work without one; adds real auth/data-protection obligations not yet scoped |
| Developments/New Homes | Not included | Still not confirmed as a distinct service (unchanged from Day 2/3) |
| Careers page | Not included | A `careers@` mailbox exists in the email plan (`EMAIL_AND_FORM_ROUTING.md`) for when needed, but no confirmed hiring need exists for a page today |
| Blog (as distinct from Insights) | Folded into Insights | One content section, not two overlapping ones |

---

# Historical — Day 2/3 baseline (approved 2026-09-07, superseded by the above)

*(Kept verbatim below for the record. Where Phase 4 above changes a
page's nav position, URL, or content, the entry below reflects what
was true at the time it was approved, not today's state.)*

## Navigation summary

**Primary desktop navigation (left to right):**
Sell · Let · Buy · Rent · Commercial · Property Management · About · Contact

**Priority action, always visible (header, both desktop and mobile):**
"Book a Valuation" (primary button) + phone number (once confirmed)

**Mobile navigation:** Same structure collapsed into a single menu icon;
"Book a Valuation" stays visible as a fixed button rather than being
hidden inside the menu, since it is the top business priority.

**Footer navigation:** Full sitemap grouped by audience (Sellers /
Landlords / Buyers & Tenants / Commercial / Company / Legal), plus
regulatory badges once Confirmed.

## Page-by-page architecture

### 1. Home
- **Purpose:** Orient every audience quickly; route to the right section.
- **Audience:** All.
- **Principal CTA:** Book a Valuation.
- **Supporting content:** Service overview (Residential / Commercial /
  Management), genuine trust strip, property search entry point.
- **Verification requirements:** No invented statistics or claims; only
  confirmed facts and (once supplied) real photography.
- **Proposed URL:** `/`
- **Parent navigation:** N/A (root)

### 2. Sell (Residential sales)
- **Purpose:** Convert vendors into valuation requests.
- **Audience:** Residential vendors.
- **Principal CTA:** Book a Valuation (sales).
- **Supporting content:** How the sales process works, fee approach (once
  Confirmed), what to expect after requesting a valuation.
- **Verification requirements:** Fee information Missing — page must not
  state a fee until Confirmed; use "ask us for a fee quote" wording until
  then.
- **Proposed URL:** `/sell`
- **Parent navigation:** Sell

### 3. Let (Residential lettings)
- **Purpose:** Convert landlords into rental appraisal requests.
- **Audience:** Residential landlords, overseas landlords.
- **Principal CTA:** Request a Rental Valuation.
- **Supporting content:** Letting vs. full management explanation,
  compliance overview, CMP/redress trust content.
- **Verification requirements:** Fees Missing; CMP/redress status
  currently Requires verification — do not present as Confirmed yet.
- **Proposed URL:** `/let`
- **Parent navigation:** Let

### 4. Residential Property Management
- **Purpose:** Explain full management service and support existing
  managed landlords/tenants.
- **Audience:** Residential landlords, overseas landlords, existing
  managed tenants.
- **Principal CTA:** Request a Management Appraisal (landlords) / Report
  a Repair (tenants) — two clear CTAs for two different audiences on one
  page.
- **Supporting content:** What management includes, repair-reporting
  process, out-of-hours/emergency process (Missing — needed before this
  section can be complete).
- **Verification requirements:** Emergency contact process Missing.
- **Proposed URL:** `/property-management`
- **Parent navigation:** Let (sub-item) and Property Management (primary
  nav item)

### 5. Buy (Property search — for sale)
- **Purpose:** Let buyers search current for-sale listings.
- **Audience:** Buyers, property investors.
- **Principal CTA:** Book a Viewing / Register for Alerts.
- **Supporting content:** Search/filter, property detail pages.
- **Verification requirements:** Live listings Missing — this section
  cannot go live with real data until a property feed/CRM exists; must
  use clearly labelled demo listings during build (Rule 2), never
  presented as real availability.
- **Proposed URL:** `/buy`
- **Parent navigation:** Buy

### 6. Rent (Property search — to let)
- **Purpose:** Let tenants search current rental listings.
- **Audience:** Tenants.
- **Principal CTA:** Book a Viewing / Register for Alerts.
- **Supporting content:** Same pattern as Buy.
- **Verification requirements:** Same as Buy — Missing live data.
- **Proposed URL:** `/rent`
- **Parent navigation:** Rent

### 7. Commercial (hub page)
- **Purpose:** Give commercial sales/lettings/management equal standing
  to residential, per Rule and the market-research finding that commercial
  should not read as a residential template.
- **Audience:** Commercial landlords, commercial occupiers, property
  investors.
- **Principal CTA:** Enquire about Commercial Sales/Lettings/Management.
- **Supporting content:** Three clear sub-sections (sales, lettings,
  management), sector coverage (once confirmed).
- **Verification requirements:** Sector coverage not yet confirmed —
  page must not list specific sectors (retail, office, industrial, etc.)
  until confirmed by the owner.
- **Proposed URL:** `/commercial`
- **Parent navigation:** Commercial

### 8. Commercial Sales
- **Purpose:** Detail commercial sales service.
- **Audience:** Commercial landlords, investors.
- **Principal CTA:** Request a Commercial Sales Appraisal.
- **Proposed URL:** `/commercial/sales`
- **Parent navigation:** Commercial

### 9. Commercial Lettings
- **Purpose:** Detail commercial lettings service.
- **Audience:** Commercial landlords, occupiers.
- **Principal CTA:** Request a Commercial Lettings Appraisal.
- **Proposed URL:** `/commercial/lettings`
- **Parent navigation:** Commercial

### 10. Commercial Property Management
- **Purpose:** Detail commercial management service.
- **Audience:** Commercial landlords, investors.
- **Principal CTA:** Request a Commercial Management Appraisal.
- **Proposed URL:** `/commercial/management`
- **Parent navigation:** Commercial

### 11. Property Alerts (registration)
- **Purpose:** Capture buyer/tenant interest even with no current match.
- **Audience:** Buyers, tenants.
- **Principal CTA:** Register for Alerts.
- **Proposed URL:** `/property-alerts`
- **Parent navigation:** Buy and Rent (shared sub-item)

### 12. Report a Repair
- **Purpose:** Give managed tenants a prominent, simple repair-reporting
  route — identified in `MARKET_RESEARCH.md` as an underused
  differentiator.
- **Audience:** Existing managed tenants.
- **Principal CTA:** Submit a Repair Report.
- **Supporting content:** What happens next, expected response time,
  emergency/out-of-hours process (Missing).
- **Verification requirements:** Emergency process Missing — page cannot
  be complete without it.
- **Proposed URL:** `/report-a-repair`
- **Parent navigation:** Property Management (also linked prominently in
  the footer, not buried)

### 13. About
- **Purpose:** Company identity and confirmed regulatory information.
- **Audience:** All, particularly vendors/landlords doing due diligence.
- **Principal CTA:** Contact the Team.
- **Supporting content:** Confirmed company facts only (legal name,
  Companies House number, incorporation date), genuine regulatory
  credentials once Confirmed. No invented history, staff bios, or awards.
- **Verification requirements:** Staff bios/photography Missing — page
  must not imply a team roster that hasn't been supplied.
- **Proposed URL:** `/about`
- **Parent navigation:** About

### 14. Contact
- **Purpose:** Direct contact for all audiences.
- **Audience:** All.
- **Principal CTA:** Contact form / phone / email.
- **Supporting content:** Phone, email, address, opening hours — all
  currently Missing and required before this page can be complete.
- **Verification requirements:** Phone, email, opening hours Missing.
- **Proposed URL:** `/contact`
- **Parent navigation:** Contact

### 15. Legal and regulatory pages
- **Purpose:** Statutory/legal requirements.
- **Audience:** All (compliance-driven, not conversion-driven).
- **Pages:** Privacy Policy (`/privacy-policy`), Cookie Policy
  (`/cookie-policy`), Terms of Website Use (`/terms`), Complaints
  Handling Procedure (`/complaints`).
- **Verification requirements:** All four are Missing and flagged
  "Requires professional review" in `CONTENT_REQUIRED.md` — none may be
  drafted by the AI team as if final; a solicitor must review before use.
- **Parent navigation:** Footer only (not primary nav).

## Pages considered but not included (and why)

| Considered page | Decision | Reason |
|---|---|---|
| Guides and FAQs | Not included yet | No confirmed content exists to populate it; adding an empty guides section would inflate the site without substance. Can be added later once genuine guide content is written and verified. |
| Separate "Valuation Requests" hub page | Not included as a standalone page | Valuation requests are handled contextually within Sell/Let/Commercial pages, which is a simpler journey (see `USER_JOURNEYS.md`) than routing through a generic hub first. |
| Dedicated "Developments/New Homes" page | Not included | Not confirmed as a distinct Times Estate Ltd service (see note in `BUSINESS_PRIORITIES_AND_AUDIENCES.md`) — would need explicit confirmation first. |
| Careers page | Not included | Not requested and not part of the twelve confirmed service areas. |
| Blog/news | Not included | No content strategy or confirmed authorship exists yet; an empty or infrequently updated blog can undermine trust rather than build it. |

## Day 4 note (7 September 2026)

Built today, matching this approved sitemap: `/buy`, `/rent` (property
search, previously deferred pending a data source — see `DATA_MODEL.md`
for what backs them today), `/property-alerts` (was previously only a
planned page), and property detail pages at `/property/[id]`.

The primary navigation now matches this document's originally approved
order exactly (Sell · Let · Buy · Rent · Commercial · Property Management
· About · Contact) — Day 3 had substituted a "Residential" hub page for
Buy/Rent since search didn't exist yet; that substitution has been
removed now that Buy/Rent are real. The Residential hub page
(`/residential`) still exists for cross-linking but is no longer in the
primary navigation, so the approved 8-item structure isn't exceeded.

**Two pages were added beyond this document's original scope**, both
reasonable, low-risk additions rather than approved decisions:
- `/commercial/for-sale` and `/commercial/to-let` — search/listing pages
  for commercial property, distinct from the `/commercial/sales`,
  `/commercial/lettings`, `/commercial/management` *service description*
  pages this document originally proposed (which remain unbuilt — the
  `/commercial` hub still covers that content directly for now).
- `/favourites` — a browser-local "saved properties" page, a natural
  companion to search that wasn't explicitly in the original page list.

## Open questions for the owner

1. Does the navigation order (Sell / Let / Buy / Rent / Commercial /
   Property Management / About / Contact) match how the business actually
   wants to present itself, or should residential/commercial be split
   more sharply (e.g. a top-level Residential/Commercial toggle instead)?
   **Phase 4 proposes an answer above (§1): Buy-first order — still
   needs explicit approval, not assumed.**
2. Should Property Management have its own top-level navigation item (as
   drafted) or sit only under Let/Commercial? **Unresolved — Phase 4
   keeps it as a top-level item, pending an answer.**
3. Confirm whether a Developments/New Homes page is needed. **Still
   unresolved.**
4. Confirm geographic coverage so pages can state it honestly instead of
   generically. **Still unresolved — blocks Area Guides (§13 above)
   from having any real content.**
