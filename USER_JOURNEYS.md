# USER_JOURNEYS.md — Times Estate Ltd

> **Restored 9 November 2026 from the project's git history** (commit
> `5284b25`, 30 October 2026). This file was missing from the folder on
> this computer. Any changes made to it between 31 October and
> 2 November could not be recovered, so Day 7 updates may be absent.
> Anything dated 9 November was added after the restore. See
> `RECOVERY_REPORT_2026-11-09.md`.


# Segment 2 — Critical journeys and page-specific calls to action (2026-10-20, at Approval Gate 2)

**Status.** A proposal. The nine Day 2 journeys below remain the
field-level specification for each form (they are all built and all
still run through the one validated lead pipeline, `lib/leads/actions.ts`);
this section maps the **critical end-to-end journeys** across the
Segment 2 sitemap and names the call to action on every step. Every
journey still ends with a person at Times Estate Ltd acting — the site
confirms receipt, never an outcome. No email is sent today (no
provider connected); "confirmation email" means the planned
transactional message in `EMAIL_AND_FORM_ROUTING.md`.

## S2.1 The ten critical journeys

| # | Journey | Entry points | Steps (page → action) | Lead category | What the visitor sees at the end | Owner dependency before this can go live |
|---|---|---|---|---|---|---|
| 1 | **Vendor → valuation** | Header "Get a Valuation" (every page); `/`, `/sell`, `/about`, area guides | `/sell` (why us, how it works, fees link) → form (address, name, phone/email, contact time, consent) → confirmation | `sales_valuation` | "A member of our team will be in touch to arrange a visit — this does not confirm a valuation figure" + reference | Fees (MISSING); email provider; sales confirmed (Q4) |
| 2 | **Landlord → rental valuation / management** | Landlords dropdown; `/let`; `/property-management`; `/investors` | `/let` (let-only vs managed, protection, fees link) → form (+ tenanted? management level?) → confirmation; or `/property-management` → management enquiry | `rental_valuation` / `management_enquiry` | Same pattern; management reply explains the next step (a call) | Fees; CMP certificate; deposit scheme; email provider |
| 3 | **Buyer → viewing** | Hero search; Properties dropdown; `/buyers`; alerts email | `/buy` (filters, map/list) → card → `/property/[id]` → Book a Viewing (name, phone, email, 2–3 preferred times, consent) → confirmation | `viewing_request` | "Received — a person will confirm the time" + reference | Real listings with material information; email provider |
| 4 | **Tenant → viewing** | Hero search (Rent); Tenants dropdown; `/tenants` | `/rent` → card (fixed rent figure, deposit, availability) → detail → Book a Viewing → confirmation | `viewing_request` | As 3 | Renters' Rights wording review; tenant fees figures; deposit scheme |
| 5 | **Searcher → alert** (no match) | Empty results; results footer; detail page | Empty state → "Create a Property Alert" → `/property-alerts` (email, criteria, marketing consent) → confirmation | *(alert record, not a lead)* | "Registered — alerts are stored, not yet emailed" until the sender exists (honest state) | Email provider (double opt-in) |
| 6 | **Commercial client → enquiry** | Properties/Landlords dropdowns; `/commercial`; commercial listings | `/commercial` (sales / lettings / management) → Enquire (name, company, phone, email, requirement) or listing → detail → Enquire → confirmation | `commercial_enquiry` (+ `commercial_*_valuation` for appraisals) | "Received — the commercial team will call" | Sector coverage confirmed; email provider |
| 7 | **Investor → conversation** | Services dropdown; `/investors`; `/property-management` | `/investors` (process: buy → let → manage; what we don't do: projections) → Enquire or Request a rental valuation | `commercial_enquiry` / `rental_valuation` | Same pattern; the page states that return discussions happen in person, never as published figures | Nothing extra beyond 2 and 6 |
| 8 | **Managed tenant → repair** | Footer (every page); Tenants dropdown; `/property-management`; `/tenants` | `/report-a-repair` (urgency first; emergency guidance shown immediately for "emergency") → form (address, name, contact, description, photo) → confirmation with reference | `repair_report` | Reference number; what happens next; emergency route if urgent | **Emergency/out-of-hours process (MISSING)**; email provider |
| 9 | **Due diligence → contact** | About dropdown; footer regulatory links; search for the brand | `/about` → `/how-we-protect-you` (redress, CMP certificate, deposit scheme, insurance, complaints — each with its real status) → `/contact` or call | `general_enquiry` / `callback_request` | Message received / callback requested | Scheme verifications (Q3); certificate publication |
| 10 | **Old link → new site** | Any indexed `timesestates.co.uk` URL, bookmarks, portals | 301/410 per `SEO_REDIRECT_PLAN.md` §2 → the successor page, which must answer the same intent (e.g. `/contact-us/` → `/contact`) | — | The right page, no 404 | Canonical host decision; launch approval |

## S2.2 Call to action on every page (one primary, never two competing)

| Page | Primary (one, prominent) | Secondary (quiet) | Always present |
|---|---|---|---|
| `/` | Search | Book a Free Valuation (band) | Header: Get a Valuation · phone; footer: Report a repair |
| Search pages | View property (card) | Create a Property Alert; Save | as above |
| Property detail | Book a Viewing | Request a callback; Save; Share | as above |
| `/sell` | Book a Valuation | Call us | as above |
| `/let` | Request a Rental Valuation | Management enquiry | as above |
| `/property-management` | Request a Management Appraisal | Report a repair (tenants' panel) | as above |
| `/commercial` and sub-pages | Enquire | Search commercial | as above |
| `/buyers` / `/tenants` | Search (for sale / to rent) | Register; alerts; (tenants) Report a repair | as above |
| `/investors` | Enquire | Request a rental valuation | as above |
| `/report-a-repair` | Submit a repair report | Emergency: call (shown first when urgent) | as above |
| `/areas/[area]` | Search in this area | Book a valuation in this area | as above |
| `/about` | Contact the team | How we protect you | as above |
| `/how-we-protect-you` | Get a Valuation | Complaints; Fees | as above |
| `/insights/[slug]` | Related service | Alerts | as above |
| `/contact` | Send message / call | Request a callback | as above |
| Legal pages | — | Contact | as above |

## S2.3 Journey rules (apply to every row)

- Every form: honeypot, rate limit, sanitise, validate (existing
  pipeline); privacy consent checkbox linked to the policy; UK phone/
  postcode formats; `type="tel"` / `type="email"` on mobile.
- Confirmation screens always say **what happens next and by whom**,
  never promise a time until the owner supplies one, and never imply
  a booking, price or legal outcome.
- Failure: inline validation; on a server error, a plain message with
  the phone number — never a blank page or stack trace.
- Emergency repairs: the emergency route is shown **before** the form
  can be submitted, and again if submission fails.
- No journey collects payment, identity documents or financial
  account details (unchanged).

---

# Historical — Day 2 journeys (approved 2026-09-07), the per-form specification

## Status of this document (Day 2)

**Approved by the owner (2026-09-07) as a working baseline for Day 3
onward — still changeable at any time.** These journeys describe *how
each form/process should work*, not the finished code — nothing has been
built yet. Every journey below assumes
a human at Times Estate Ltd reviews and responds to submissions; none of
these journeys make an automated promise, price, or commitment on the
business's behalf. Any AI assistance referenced is limited to sorting and
prioritising enquiries — never to answering as if it were a qualified
person, negotiating a price, or confirming a legal outcome.

## 1. Sales valuation request

- **Starting page:** `/sell` (or a "Book a Valuation" button anywhere on
  the site).
- **Information required:** Property address, contact name, phone, email,
  reason for selling (optional), preferred contact time (optional).
- **Minimum number of steps:** 2 (details form → confirmation).
- **Consent point:** Checkbox confirming acceptance of the privacy policy
  before submission (privacy policy text itself is Missing — form cannot
  go live until it exists and has been through professional review).
- **Validation:** Required fields (address, name, phone or email) checked
  before submission; UK phone/postcode format checked.
- **Confirmation:** On-screen confirmation plus email confirmation to the
  requester, stating what happens next and an expected response window
  (exact window to be confirmed by the owner — not invented).
- **Internal notification:** Email/CRM notification to the sales team
  with all submitted detail.
- **Human approval requirement:** A person contacts the vendor to arrange
  the actual valuation visit — the website never gives a valuation figure
  itself.
- **Failure route:** If submission fails technically, a clear on-screen
  error with a direct phone number/email as a fallback (phone/email
  currently Missing — must be added before launch).
- **Follow-up status:** Logged as "New valuation request" until a team
  member updates its status (contacted / appointment booked / closed).

## 2. Rental valuation request

- **Starting page:** `/let`.
- **Information required:** Property address, contact detail, whether the
  property is currently tenanted, preferred management level (let-only vs
  full management, if the landlord already knows).
- **Minimum number of steps:** 2 (details form → confirmation).
- **Consent point:** Same privacy consent as above.
- **Validation:** Same pattern as sales valuation.
- **Confirmation:** On-screen and email confirmation; brief plain-English
  explanation of let-only vs. full management sent alongside.
- **Internal notification:** Lettings team notified with full detail.
- **Human approval requirement:** A person contacts the landlord to
  arrange an appraisal visit; no rent figure is ever generated by the
  website.
- **Failure route:** Same fallback pattern as sales valuation.
- **Follow-up status:** "New rental valuation request" through to closed.

## 3. Property-management enquiry (new landlord, or existing landlord upgrading)

- **Starting page:** `/property-management` or `/commercial/management`.
- **Information required:** Property address/type, current arrangement
  (self-managed, another agent, none), specific concerns/questions.
- **Minimum number of steps:** 2.
- **Consent point:** Privacy consent checkbox.
- **Validation:** Required contact fields checked.
- **Confirmation:** On-screen and email confirmation with a short
  explanation of what the management team will send next (e.g. a call to
  discuss requirements) — no fee quoted automatically since fees are
  Missing/not standardised online.
- **Internal notification:** Property management team notified.
- **Human approval requirement:** A person discusses management terms
  directly; the website does not commit to a fee or start date.
- **Failure route:** Same fallback pattern.
- **Follow-up status:** "New management enquiry" through to closed.

## 4. Residential property search

- **Starting page:** `/buy` or `/rent`.
- **Information required (from the user):** None required to browse;
  optional filters (location, price range, bedrooms, property type).
- **Minimum number of steps:** 1 (search results appear immediately from
  default/most-recent listings; filters refine rather than gate access).
- **Consent point:** None required to browse (no personal data collected
  at this stage).
- **Validation:** Filter inputs constrained to sensible ranges (e.g. price
  min ≤ max).
- **Confirmation:** N/A — this journey ends in either a property detail
  page (leading to Journey 6, Viewing Request) or Journey 7 (Alerts).
- **Internal notification:** None at search stage.
- **Human approval requirement:** None — browsing is self-service.
- **Failure route:** "No results" state must suggest widening the search
  or registering for alerts, never show fabricated results.
- **Follow-up status:** N/A.

## 5. Commercial property search

- **Starting page:** `/commercial` (sales/lettings listings, once they
  exist).
- **Information required:** None to browse; optional filters (location,
  size, sector — sector filter only once sector coverage is confirmed).
- **Minimum number of steps:** 1, same pattern as residential search.
- **Consent point:** None to browse.
- **Validation:** Same range-checking pattern as residential search.
- **Confirmation:** N/A — leads to a direct enquiry (see Journey 3 pattern)
  rather than a generic viewing-request form, since commercial enquiries
  are typically more bespoke (per `BUSINESS_PRIORITIES_AND_AUDIENCES.md`).
- **Internal notification:** None at search stage.
- **Human approval requirement:** None at search stage.
- **Failure route:** Same "no results" pattern as residential search.
- **Follow-up status:** N/A.

## 6. Viewing request

- **Starting page:** Any property detail page (`/buy` or `/rent` result).
- **Information required:** Name, phone, email, preferred date/time
  (2–3 options), any accessibility needs for the viewing (optional).
- **Minimum number of steps:** 2 (details form → confirmation).
- **Consent point:** Privacy consent checkbox.
- **Validation:** Required contact fields; date/time must be in the
  future.
- **Confirmation:** On-screen and email confirmation stating the request
  has been received and will be confirmed by a person — the website does
  not auto-confirm a specific appointment slot.
- **Internal notification:** Relevant branch/negotiator notified with
  property reference and requested times.
- **Human approval requirement:** A person confirms the actual viewing
  slot with both the requester and, where applicable, the current
  occupier.
- **Failure route:** Same fallback pattern as valuation requests.
- **Follow-up status:** "Viewing requested" → "Viewing confirmed" →
  "Viewing completed" / "Cancelled".

## 7. Property-alert registration

- **Starting page:** `/property-alerts`, or offered after a "no results"
  search.
- **Information required:** Email, search criteria (location, price,
  bedrooms/type, buy or rent).
- **Minimum number of steps:** 1 (single form, immediate confirmation).
- **Consent point:** Explicit marketing-communication consent checkbox,
  separate from the general privacy consent, since this is an ongoing
  email relationship.
- **Validation:** Valid email format required.
- **Confirmation:** On-screen confirmation plus a confirmation email
  (double opt-in recommended for deliverability and consent clarity).
- **Internal notification:** None required — this feeds an automated
  alert list rather than a human-reviewed enquiry, though the criteria
  should be visible to staff for context if the person later enquires
  directly.
- **Human approval requirement:** None for registration itself; a human
  must still handle any resulting enquiry once an alert leads to contact.
- **Failure route:** Clear error if email invalid or already registered
  (offer to manage existing preferences instead).
- **Follow-up status:** Active / unsubscribed.

## 8. Repair report

- **Starting page:** `/report-a-repair` (linked prominently, not buried).
- **Information required:** Property address, tenant name, contact
  detail, description of the issue, urgency (routine / urgent /
  emergency), photo upload (optional).
- **Minimum number of steps:** 2 (details form → confirmation with
  reference number).
- **Consent point:** Privacy consent checkbox.
- **Validation:** Required fields checked; urgency selection required so
  it can be routed correctly.
- **Confirmation:** On-screen confirmation with a reference number, plus
  email confirmation; emergency-marked reports must display the
  out-of-hours emergency contact process immediately (currently Missing —
  must be supplied before this journey can go live as designed).
- **Internal notification:** Property management team notified
  immediately, with urgency flagged clearly (e.g. emergency reports
  trigger a more urgent notification channel than routine ones).
- **Human approval requirement:** A person triages and assigns a
  contractor — the website never books a contractor automatically.
- **Failure route:** If submission fails, the emergency contact
  number/process must still be shown so an urgent issue is never left
  with no fallback.
- **Follow-up status:** "Reported" → "Contractor assigned" → "Resolved" —
  ideally visible to the tenant via a reference-number lookup or email
  updates, though the exact mechanism is a Day 5 (automation) build
  decision, not today's.

## 9. Callback request

- **Starting page:** Available as a lightweight alternative to a full form
  on any page (e.g. Contact, or a persistent "Request a Callback" link).
- **Information required:** Name, phone number, best time to call,
  one-line reason (optional).
- **Minimum number of steps:** 1 (single short form).
- **Consent point:** Privacy consent checkbox.
- **Validation:** Valid phone number required.
- **Confirmation:** On-screen confirmation only (SMS/email confirmation
  optional, not essential for such a short interaction).
- **Internal notification:** Routed to the relevant team based on where
  the request originated (e.g. from a Commercial page → commercial team).
- **Human approval requirement:** A person makes the actual call — no
  automated call-back system.
- **Failure route:** Same fallback pattern — direct phone number shown if
  submission fails.
- **Follow-up status:** "Callback requested" → "Called" / "No answer,
  retry" → "Closed".

## Cross-cutting notes

- **No journey above collects payment, financial account detail, or
  identity documents.** If AML/right-to-rent identity verification is
  needed later (Section 4 of `BUSINESS_REQUIREMENTS.md`, currently
  Missing), that is a distinct, more sensitive journey requiring its own
  security review before design — not assumed as part of today's scope.
- **Every "Confirmation" step above depends on working email delivery**,
  which depends on a chosen email/CRM integration — this requires the
  owner's explicit approval before any third-party service is connected,
  per Rule 4.
- **"Controlled AI assistance"** (a confirmed service area) is not given
  its own journey today because its exact scope has not been confirmed —
  it should assist with sorting/prioritising the journeys above once
  built, not replace the human-approval step in any of them.
