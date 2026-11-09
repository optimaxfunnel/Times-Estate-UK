# REGULATORY_READINESS.md — Times Estate Ltd

> **Restored 9 November 2026 from the project's git history** (commit
> `5284b25`, 30 October 2026). This file was missing from the folder on
> this computer. Any changes made to it between 31 October and
> 2 November could not be recovered, so Day 7 updates may be absent.
> Anything dated 9 November was added after the restore. See
> `RECOVERY_REPORT_2026-11-09.md`.


## Day 6 Task 3 update (2026-10-30) — readiness for professional review

**Read this first.** This section prepares the website **for review by a
qualified UK solicitor or compliance professional**. It is **not** a
statement that Times Estate Ltd complies with any law. Having a privacy
page, a fees page or a complaints page does not by itself make the
business compliant; what matters is that the wording is accurate and the
business actually works that way. Every row below marked **Solicitor**
or **Compliance** must be signed off by that person before launch.

Research for this update used current secondary summaries of official
guidance (listed at the end). **The reviewer should check each point
against the official source, as rules have changed recently.**

| Topic | What the website now has | Status | Who must review | Open question for the owner |
|---|---|---|---|---|
| Company disclosure (Companies Act trading disclosures) | New **/company-information** page: registered name, number, "registered in England and Wales", registered office, trading address, phone, email; also in the footer | Name, number, office **Verified**; others Supplied by the business owner | Compliance | VAT number (or not registered)? ICO registration number? |
| UK GDPR | Privacy notice draft (/privacy-policy); data map (PRIVACY_DATA_MAP.md) with proposed lawful bases and retention | Draft | **Solicitor** | Retention periods; ICO registration; who handles data requests |
| PECR and cookies | Cookie notice draft (/cookie-policy). The site today sets **no tracking or advertising cookies**: only a staff sign-in cookie (essential) and saved properties kept in the visitor's own browser. So **no consent banner is needed today**; one must be added before any analytics or advertising tool is switched on | Draft | **Solicitor** | Will you want analytics? (DEPLOYMENT.md lists consent-friendly options) |
| PECR — marketing emails | Property alerts need a separate, unticked consent box; no emails are sent today | Built; email off | Solicitor | Wording of the consent line |
| Equality Act 2010 / accessibility | Accessibility statement (/accessibility); WCAG 2.2 AA testing recorded in ACCESSIBILITY.md; Day 6 Task 4 re-tests it | Draft | Compliance | A named contact for accessibility requests |
| Consumer protection (CPRs, now Part 4 Chapter 1 of the DMCC Act 2024) | No invented claims (register); demonstration listings visibly labelled; material information fields on every property page | Ready for review | Compliance | — |
| DMCC Act — price transparency / "drip pricing" (in force 6 April 2025) | Fee page structure requires any unavoidable charge to be shown **within the headline price**, not added later; rent and price shown with their mandatory extras (deposit, service charge, ground rent) on property pages | Structure only — amounts missing | **Solicitor** | Do you charge any compulsory extra fee to buyers or tenants? |
| Agent fee transparency (Consumer Rights Act 2015 s.83; Tenant Fees Act 2019) | /fees sets out tenant permitted payments and the landlord/seller fee structure; **amounts are missing** | **Launch blocker** | Solicitor | Full landlord fee schedule incl. VAT; deposit level; holding deposit |
| Redress scheme | Property Redress Scheme membership shown on /company-information, /why-choose-us and footer, labelled "Requires verification" | Supplied by the business owner | Compliance | Confirm membership directly with the scheme |
| Client Money Protection | Client Money Protect membership shown the same way. **The CMP certificate itself must be displayed (or linked) on the website** | Supplied by the business owner | Compliance | Permission to publish the certificate PDF |
| EPC | Every property page shows an EPC rating field, marked "must verify against the EPC register". It is **not yet compulsory** before a listing is approved — recommend making it so (or "exempt") | Partly built | Compliance | — |
| Material information (NTSELAT Parts A, B, C) | Property pages show price/rent, council tax band, tenure, lease length, ground rent, service charge, deposit, EPC, floor area, rooms. **Part B (utilities, broadband, mobile signal, parking, construction) and Part C (flood risk, building safety, restrictions, rights of way) fields are not yet in the data model** | Partly built | Compliance | Which property software will supply these? |
| Complaints procedure | /complaints draft: how to complain, then escalation to the redress scheme | Draft — **timescales missing** | Compliance | Your acknowledgement and final-response times (must fit the scheme's rules) |
| Accessibility statement | /accessibility draft | Draft | Compliance | — |
| Renters' Rights Act 2025 | Not described on the site. Main tenancy changes started 1 May 2026; landlord database later. Mentioned only as "guidance to follow" | Not started (deliberately) | **Solicitor** | Do you want a landlord guide? |
| AI assistant and regulated advice | The assistant **refuses** legal, financial, mortgage and surveying advice, valuation figures, tenancy decisions and emergency classification, and says it is an AI (tests: refusals, assistant-safety) | Built and tested | Compliance | — |

### Drafts now in place (all carry a "Draft — requires legal review" banner)

Privacy notice · Cookie notice · Terms of use · Accessibility statement ·
Complaints information · Fee information structure · **Company
information (new today)**.

### Sources consulted (secondary summaries; reviewer to confirm against originals)

- Material information Parts A–C: summaries of the NTSELAT guidance
  (Mondaq; Letting Agent Today, Nov 2023). Official: National Trading
  Standards Estate and Letting Agency Team.
- DMCC Act drip pricing in force 6 April 2025; CMA final guidance and
  price transparency guidance CMA209 (CMS; Taylor Wessing; CMA PDF on
  gov.uk).
- Renters' Rights Act 2025: Royal Assent 27 Oct 2025; main tenancy
  provisions from 1 May 2026; later phases to follow (Gowling WLG;
  Trowers & Hamlins; Mishcon de Reya roadmap summaries).

---


## Status of this document

**This document does not claim Times Estate Ltd or this website is
legally compliant.** It records, topic by topic, what the site
currently does, what's still missing, and what a qualified UK
solicitor or compliance professional needs to review before any of
today's drafted material is relied upon. Building a page or a control
is not the same as confirming compliance (CLAUDE.md Rule 4) — every
row below ends with a status, and "built" is never treated as a
synonym for "compliant."

Research for this document used current authoritative sources (ICO,
National Trading Standards, GOV.UK, legislation.gov.uk) fetched live
during today's work — see the Day 6 entry in `CHANGELOG.md` for the
specific pages consulted.

## 1. Company disclosure

**What exists:** legal name, Companies House number, and registered
office are displayed on `/about` and in the footer, each with its
verification status shown via a visible badge (Confirmed, in this
case — see `/CONTENT_VERIFICATION_REGISTER.md`).

**What's missing:** a trading address (if different), VAT number if
applicable, and a public phone/email address — required under the
Companies Act 2006 disclosure rules and, separately, expected under
consumer-protection transparency rules once the business actively
trades through the site.

**Status: Requires legal review** once the missing items above are
supplied — the disclosure that exists today is accurate as far as it
goes, but incomplete.

## 2. UK GDPR / Data Protection Act 2018

**What exists:** a drafted Privacy Notice (`/privacy-policy`) describing
actual current data flows (see `/PRIVACY_DATA_MAP.md`, built Day 5) —
what's collected, the lawful basis relied on (consent), where it's
held, who can access it, and how to exercise data-subject rights.

**What's missing:** a confirmed retention period, a dedicated privacy
contact, and confirmation of whether ICO registration is required and
has been completed (`/BUSINESS_REQUIREMENTS.md`: ICO registration
number — Missing).

**Status: Requires legal review.** The notice is drafted from real
system behaviour, not a generic template, which should make review
faster, but it has not been reviewed.

## 3. PECR and cookies

**Researched today (ICO's current cookies/PECR guidance):** consent
must be a clear affirmative action, "Accept all" and "Reject all" must
carry equal prominence, and the "strictly necessary" exemption only
covers what a visitor's own use of the feature requires — not
analytics, personalisation, or advertising.

**What exists:** no cookie banner, because nothing on the site today
needs one — the only two storage mechanisms in use (the development
mock-role cookie and the client-side favourites list) both fall
squarely within the strictly-necessary exemption, and this reasoning
is stated plainly on `/cookie-policy` rather than assumed silently.

**Status: Currently consistent with PECR as researched, given no
tracking/analytics/advertising technology is connected — Requires
legal review to confirm this reasoning before launch, and MUST be
revisited (a real consent banner built) the day any analytics,
advertising, or third-party AI provider is connected.**

## 4. Equality Act 2010 considerations

The Act doesn't set a specific technical web-accessibility standard for
a private business (unlike the public-sector accessibility
regulations), but does require reasonable steps to avoid discriminating
against disabled customers, of which an inaccessible website could be
evidence. **What exists:** a WCAG 2.2 AA-targeted accessibility effort,
documented in `/ACCESSIBILITY.md` with concrete test results, real
defects found, and real fixes applied today, plus a public
`/accessibility` statement.

**Status: Genuine, tested effort exists — Requires legal review** to
confirm this is sufficient framing for Equality Act purposes
specifically (a distinct question from WCAG conformance itself).

## 5. Consumer protection (CPRs) and Digital Markets, Competition and
   Consumers Act 2024

**Researched today:** the DMCC Act 2024 (in force since 6 April 2025,
consumer-protection provisions enforced from 6 July 2025) makes it an
automatically unfair commercial practice to publish fake or
incentivised-but-undisclosed reviews, or to present review information
misleadingly.

**What exists:** no reviews, ratings, or testimonials appear anywhere
on the site — none exist to fabricate, and none will be added until
genuine, attributable ones are supplied (`CONTENT_REQUIRED.md`). This
is the safest possible position under the DMCC's review rules: full
compliance by having nothing to comply about, yet.

**Status: Compliant by absence today; Requires legal review before any
future testimonial/review feature is built**, to design it correctly
from the start (attribution, incentive disclosure, genuine-review
verification) rather than retrofitting compliance later.

## 6. Estate and letting agent fee transparency

**Researched today:** the Tenant Fees Act 2019 restricts letting agents
to a fixed list of permitted payments, and the Consumer Rights Act
requires fees to be displayed clearly, not hidden until later in the
process.

**What exists:** a new `/fees` page setting out the *categories* the
law permits (so a visitor can already see the legal framework), with
every actual amount marked Missing rather than invented.

**Status: Structure is legally-informed but Requires legal review**,
and cannot move to Confirmed until the owner supplies real fee amounts
for legal review alongside the structure.

## 7. Redress scheme and Client Money Protection

**What exists:** both memberships are displayed on `/about` and
`/complaints`, each with a visible "Requires verification" badge
reflecting their true status (owner-supplied certificates reviewed
directly, not independently confirmed against the schemes' own
registers — see `/CONTENT_VERIFICATION_REGISTER.md`, items 3–4).

**Status: Requires verification** (an independent check against the
scheme, not a legal review) before either can move to Confirmed.

## 8. EPC (Energy Performance Certificate) information

**Researched today:** under the Energy Performance of Buildings
(England and Wales) Regulations 2012, a property's EPC rating (or the
full A–G graph where space allows) must appear in any advertisement or
listing of that property, with a £200-per-advertisement penalty for
non-compliance.

**What exists:** the property data model has an `epcRating` field, and
the property detail page displays it whenever a demo property has one
set (see `web/src/app/property/[id]/page.tsx`).

**Status: The mechanism is built and ready; nothing to confirm yet**
since every current listing is demo data, not a real advertisement this
regulation applies to. This becomes a live compliance requirement the
moment a real listing is published, and should be spot-checked again
at that point.

## 9. Material information (NTSELAT Parts A, B and C)

**Researched today:** National Trading Standards' Estate and Letting
Agency Team has published guidance requiring agents to disclose,
progressively: Part A (price/rent, council tax band, tenure), Part B
(property type, construction, utilities, parking, and more), and Part
C (conditional facts like flood risk or restrictive covenants, only
where they apply).

**What exists:** the property data model and detail page already show
several Part A/B fields where present (price, tenure, council tax
band, EPC rating). A visible "Material information — requires
professional review" notice already sits on every property detail page
(built Day 4), stating plainly that a full, solicitor-reviewed material
information disclaimer has not yet been drafted.

**Status: Requires legal review** before any real listing goes live —
the data model supports the fields NTSELAT expects, but a real
listing's specific completeness against Parts A/B/C has not been
checked because no real listing exists yet.

## 10. Complaints procedure

**What exists:** a drafted `/complaints` page describing the two-stage
process required of redress-scheme members (in-house first, then the
scheme). **What's missing:** a confirmed acknowledgement/resolution
timescale — deliberately left as a visible placeholder rather than an
invented promise.

**Status: Requires legal review** and an owner-confirmed timescale
before Confirmed.

## 11. Accessibility statement

Published at `/accessibility`, referencing the detailed, dated test
results in `/ACCESSIBILITY.md`. Unlike the other pages in this section,
an accessibility statement is a factual account of testing already
done, not a legal instrument — it is accurate to today's real testing
and does not require the same solicitor sign-off, though the surrounding
Equality Act framing (item 4 above) still does.

## 12. The AI assistant must not give regulated advice

**Already built and tested (Day 5, re-verified today):** the assistant
hard-refuses mortgage, legal, investment, and surveying-advice requests
before anything else runs (`web/src/lib/ai/refusals.ts`), and this is
covered by both unit tests and a live browser test recorded in
`/TEST_REPORT.md`. Nothing new was needed here today beyond confirming
it still holds — see `/AI_SAFETY_RULES.md` for the full contract.

**Status: Confirmed as implemented and tested.** Whether this
*framing* fully satisfies FCA/SRA/RICS perimeter concerns for a live
service (as opposed to a demonstration) is itself a question for
professional review once a real AI provider is ever connected.

## Summary table

| Topic | Built today? | Status |
|---|---|---|
| Company disclosure | Enhanced | Requires legal review (once Missing items supplied) |
| UK GDPR | Drafted notice | Requires legal review |
| PECR / cookies | Drafted notice + real reasoning | Requires legal review; must be revisited on any tracking tech |
| Equality Act | Accessibility programme | Requires legal review |
| Consumer protection / DMCC | N/A (no reviews exist) | Compliant by absence; review before any review feature |
| Fee transparency | Page structure | Requires legal review + owner figures |
| Redress scheme / CMP | Displayed | Requires independent verification |
| EPC | Data field + display | Ready; not yet applicable to real listings |
| Material information | Partial data + disclaimer | Requires legal review before real listings |
| Complaints procedure | Drafted | Requires legal review + owner timescale |
| Accessibility statement | Published | Reflects real testing done today |
| AI regulated-advice refusal | Already built (Day 5) | Confirmed as implemented and tested |

**No item in this document may be described to a customer, regulator,
or the public as "compliant."** Every status above is either "requires
review" or "confirmed as implemented" (a statement about the code, not
about legal sufficiency).
