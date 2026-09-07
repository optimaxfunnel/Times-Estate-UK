# SITEMAP.md — Times Estate Ltd

## Status of this document

**Approved by the owner (2026-09-07) as a working baseline for Day 3
onward — still changeable at any time.** This information architecture was
built only from confirmed services in `BUSINESS_REQUIREMENTS.md`. Pages
are included because a confirmed service or a genuinely necessary
legal/regulatory requirement needs them — not to make the site look
larger. Several candidate pages considered in the Day 2 brief have been
deliberately left out or marked conditional, with the reason stated.

Geographic coverage is not yet confirmed beyond the registered office
(145 Upper Tooting Road, London SW17). No specific neighbourhood or area
names are used anywhere below — pages reference "areas served by Times
Estate Ltd" generically until this is confirmed.

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

## Open questions for the owner

1. Does the navigation order (Sell / Let / Buy / Rent / Commercial /
   Property Management / About / Contact) match how the business actually
   wants to present itself, or should residential/commercial be split
   more sharply (e.g. a top-level Residential/Commercial toggle instead)?
2. Should Property Management have its own top-level navigation item (as
   drafted) or sit only under Let/Commercial?
3. Confirm whether a Developments/New Homes page is needed.
4. Confirm geographic coverage so pages can state it honestly instead of
   generically.
