# CONTENT_VERIFICATION_REGISTER.md

## Day 7 note (2026-10-31)

No new facts added on Day 7. Copy changes during the visual review
were labels only: the listings count now shows "Demonstration" and the
empty reviews panel "Not yet published" instead of the internal
"Missing" badge; the homepage search placeholder reads "Area or
postcode, e.g. SW17". The mobile menu now shows both owner-supplied
phone numbers (landline first). The Day 6 table below remains current.


This is the master log of every business fact and content item used
anywhere on the Times Estate Ltd website. It exists to enforce Rule 1 in
`CLAUDE.md`: nothing is invented. Every row must be added before the
corresponding fact or content is used anywhere in the project (including
draft pages), and no item may be used on a live page until its status is
**Confirmed**.

Status key:
- **Confirmed** — verified accurate, approved for use.
- **Supplied by owner** — given by the business owner, not yet independently verified.
- **Missing** — required but not yet provided.
- **Requires verification** — needs an independent check (e.g. Companies House, redress scheme register, regulator database).
- **Requires professional review** — needs sign-off from a qualified professional (solicitor, accountant, compliance adviser, etc.).

## Day 6 content register (2026-10-30) — current

**This table is the current record of every material factual statement
on the public site.** The older table below is kept as history. Statuses
used here are only: **Verified**, **Supplied by the business owner**,
**Placeholder**, **Requires legal or professional review**,
**Demonstration content**.

**How placeholders are handled now:** internal "not yet supplied" notes
show on the site in development, and on a staging copy only if
`NEXT_PUBLIC_SHOW_CONTENT_NOTES=true` is set. On the public site they are
hidden, or replaced by a plain line that makes no claim (for example
"Ask us for a written fee quote"). Staff can still see every open item at
**/admin/content**.

| Statement | Source | Status | Website location | Action required |
|---|---|---|---|---|
| Company name "Times Estate Ltd" | Companies House record 09597081 | Verified | Header, footer, every page | None |
| Company number 09597081, incorporated 19 May 2015, active | Companies House | Verified | Footer, /about | None |
| Registered office: 145 Upper Tooting Road, London SW17 7TJ | Companies House | Verified | Footer, /contact | None |
| Office (trading address): 127 Upper Tooting Road, London SW17 7TJ | Owner; business card | Supplied by the business owner | Footer, /contact, homepage, /about | Owner to confirm it is the address visitors should come to |
| "Our office on Upper Tooting Road in South West London" | Derived from the two addresses above | Supplied by the business owner | Homepage hero | None beyond the row above |
| Phone 0208 672 8080; mobile 0777 999 1313 | Owner; business card | Supplied by the business owner | Header, footer, /contact | Test that both numbers are answered |
| Construction line 0208 6738 555 | Owner; business card | Supplied by the business owner | /about, footer (mention only) | None |
| Email timesestatesuk@gmail.com | Owner; business card | Supplied by the business owner | Footer, /contact | Consider a domain address before launch (see EMAIL_AND_FORM_ROUTING.md) |
| Property Redress Scheme member, PRS030616, to 14/04/2027 | Owner-supplied certificate | Supplied by the business owner | /why-choose-us, footer | Confirm with the scheme directly, then mark Verified. **Launch blocker** (membership must be displayed accurately) |
| Client Money Protect member, CMP013294, to 19/06/2027 | Owner-supplied certificate | Supplied by the business owner | /why-choose-us, /landlords | Confirm with the scheme directly. **Launch blocker** |
| Professional indemnity insurance with Folgate / APC | Owner-supplied policy wording (no schedule) | Supplied by the business owner | /why-choose-us | Owner to supply the policy schedule |
| "London Property Experts" | Tagline in the owner's logo | Supplied by the business owner | Logo, header, page title, hero eyebrow | Owner to confirm the London-wide coverage it implies; body copy no longer says "across London" |
| Services: residential and commercial sales, lettings and management; valuations; viewings; repair reporting | Owner (Day 1 scope) | Supplied by the business owner | Navigation, service pages | None |
| "Free initial market appraisal" | Existing site copy (owner) | Supplied by the business owner | /sell, /let, assistant | Owner to confirm it is free and without obligation |
| "We quote fees in writing before you instruct us" | Build team wording | Requires legal or professional review | /landlords, /sell, /let | Owner to confirm this is the practice |
| Tenant permitted payments and deposit protection scheme | — | Placeholder | /fees, /buyers | Owner to supply. **Launch blocker** — letting agents must publish fees on their website |
| Landlord fees, sales commission, VAT treatment | — | Placeholder | /fees, /let, /sell | Owner to supply. **Launch blocker** for lettings fees and VAT |
| Opening hours | — | Placeholder | /contact | Owner to supply |
| Areas covered beyond SW17 | — | Placeholder | /about, /areas | Owner to confirm |
| Commercial sectors covered | — | Placeholder | /commercial | Owner to confirm |
| Team, history, reviews, track record | — | Placeholder | /about, /why-choose-us (hidden publicly) | Only with evidence and consent |
| Complaints timescales | — | Requires legal or professional review | /complaints | Set to match redress scheme rules. **Launch blocker** |
| Repair response times, out-of-hours process | — | Placeholder | /report-a-repair, /buyers | Owner to supply |
| Emergency numbers 999, 0800 111 999 (gas), 105 (power cut) | Public UK services | Verified | /report-a-repair | Wording around them: professional review. **Launch blocker** |
| Privacy policy, cookie policy, terms (drafts) | Build team drafts | Requires legal or professional review | /privacy-policy, /cookie-policy, /terms | Solicitor review; retention periods. **Launch blocker** |
| Form privacy wording | Build team draft | Requires legal or professional review | Every form | Solicitor review |
| Renters' Rights Act 2025 guidance | — | Requires legal or professional review | /landlords (note only) | Solicitor to write or review |
| Guaranteed rent | — | Requires legal or professional review | Not offered | Stays off the site until terms are reviewed |
| All property listings, prices, photos and counts | Fabricated test data | Demonstration content | Homepage, /buy, /rent, /commercial, /property/* | Visibly labelled "Demonstration" on every card and page; replace with the real feed |
| Assistant answers | Approved site content only | Demonstration content | Chat assistant | Labelled as an AI demonstration |

**Copy changed today:** homepage hero no longer says "across London" or
"trusted local expert" (unevidenced); commercial page no longer implies a
separate commercial team (no team details supplied). Nothing was added
that is not in this table.

---

## Register (historical, Day 1–5)

| # | Item | Value used | Source | Status | Verified by | Date | Notes |
|---|---|---|---|---|---|---|---|
| 1 | Company legal name | Times Estate Ltd | Owner + Companies House public register | Confirmed | Companies House record "TIMES ESTATE LTD" | 2026-09-06 | Exact register spelling is "TIMES ESTATE LTD" (all caps, as is standard for CH records) |
| 2 | Companies House number | 09597081 | Owner + Companies House public register | Confirmed | Companies House record for 09597081 | 2026-09-06 | Status: Active. Incorporated 19 May 2015. Type: Private limited company |
| 8 | Registered office address | 145 Upper Tooting Road, London, SW17 7TJ | Owner + Companies House public register | Confirmed | Owner confirmation; matches Companies House record for 09597081 | 2026-09-07 | Owner confirmed this as the address to display |
| 3 | Redress scheme membership | Property Redress Scheme, Membership No. PRS030616, valid 15/04/2026–14/04/2027 | Owner-supplied certificate PDF ("PROPERTY REDRESS MEMBERSHIP 22ND APRIL 2026.pdf") | Requires verification | — | 2026-09-07 | Certificate reviewed directly and appears genuine (signed by Sean Hooker, Head of Redress; authorised by MHCLG/National Trading Standards). No public online member-lookup tool found on propertyredress.co.uk to independently cross-check the membership number — recommend confirming by phone (0333 321 9418) or email (info@propertyredress.co.uk) if independent verification is required before publishing |
| 4 | Client Money Protection scheme | Client Money Protect, Membership No. CMP013294, valid 20/06/2026–19/06/2027 | Owner-supplied certificate PDF ("CLIENT MONEY PROTECT CERTIFICATE 2026-2027.pdf") | Requires verification | — | 2026-09-07 | Certificate reviewed directly and appears genuine (signed by Eddie Hooker, Client Money Protect). No public online member-lookup completed — recommend confirming directly with Client Money Protect if independent verification is required before publishing |
| 5 | Regulatory/professional body membership | *(not yet used anywhere)* | — | Missing | — | — | Verify against body's public register once supplied |
| 6 | Professional indemnity insurance | Folgate Insurance Company Limited / APC Underwriting, "Surveyors' Professional Combined Policy", ref #2391142793, "for 2026 to 2027" | Owner-supplied PDF ("POLICY DOCUMENT FROM SIMON FOR 2026 TO 2027\(#2391142793) Surveyors' Professional Combined Policy Wording 1223.pdf") | Requires verification | — | 2026-09-07 | Document supplied is the generic policy WORDING (terms and conditions) only — it does not contain Times Estate Ltd's name, policy number, limit of indemnity, or period of insurance. The schedule (which shows these specifics) is still needed before this can be confirmed |
| 7 | Privacy policy / cookie policy / terms text | *(not yet drafted)* | — | Missing | — | — | Requires professional (legal) review before publication |
| 9 | Public landline number | 020 8672 8080 | Owner (chat instruction, 2026-09-08) | Supplied by owner | — | 2026-09-08 | Not independently tested for reachability; displayed on `/contact` with a visible badge |
| 10 | Public mobile number | +44 7779 991313 | Owner (chat instruction, 2026-09-08) | Supplied by owner | — | 2026-09-08 | Not independently tested for reachability; displayed on `/contact` with a visible badge |
| 11 | Domain name | https://timesestates.co.uk | Owner (chat instruction, 2026-09-08) | Supplied by owner | — | 2026-09-08 | **Not verified as registered to/controlled by Times Estate Ltd, and this project has deployed nothing there.** No domain-ownership lookup or DNS check has been performed. Do not treat this as confirmation that a live Times Estate Ltd website already exists at this address, and do not point this project's DNS at it without the owner's separate, explicit deployment approval (CLAUDE.md Rule 6) |
| 12 | Public email address | timesestatesuk@gmail.com | Owner (chat instruction, 2026-09-09), then also seen printed on the owner's photographed business card | Supplied by owner | — | 2026-09-09 | Not independently tested for deliverability. Seeing it printed on physical stationery is stronger corroboration than a chat message alone, but is still the owner's own material, not an independent third-party check — status stays Supplied by owner, not Confirmed |
| 13 | Trading address | 127 Upper Tooting Road, London, SW17 7TJ | Owner (chat instruction, 2026-09-09), matches the address printed on the photographed business card | Supplied by owner | — | 2026-09-09 | **Differs from item 8, the Companies House-verified registered office (145 Upper Tooting Road).** Recorded as a separate trading address, not a correction to item 8 — a registered office and a trading address are legitimately allowed to differ, and nothing here has been changed at Companies House. If 127 is meant to replace 145 as the registered office too, that requires a Companies House filing, which is the owner's action, not this project's. Both addresses are shown on `/contact`, clearly labelled |
| 14 | Phone number display formatting | Landline "0208 672 8080", mobile "0777 999 1313" | Owner's photographed business card | Supplied by owner | — | 2026-09-09 | Same digits/number as items 9–10 (previously displayed as "020 8672 8080" / "+44 7779 991313") — updated purely to match the exact grouping printed on the current business card, not a change of number |
| 15 | "Construction" as an additional service line | Sales, Lettings, Management, Commercials, **Construction** (wall & floor tiling, laminate flooring, wall painting & plastering, extensions & loft conversions, kitchen & bathroom remodelling) | Both of the owner's photographed business cards list this alongside the estate-agency services | Supplied by owner — **not yet added to the website** | — | 2026-09-09 | This is a real, newly-discovered scope item: the business appears to also trade as a construction/renovation contractor, which is entirely outside this project's current scope as defined in `CLAUDE.md`. No page, service, or claim has been added for it — flagged to the owner in `DECISIONS.md` as a scope question, not assumed either way |

*(This table is a living document — add a new row for every new fact or
content item as soon as it is introduced anywhere in the project, however
early-stage. Do not add rows retroactively "to catch up" without checking
the actual source.)*

## Day 3 note (2026-09-07)

No new facts were confirmed today. The eight facts already in this
register are now also reflected directly in the website's code
(`web/src/lib/site-config.ts`) and rendered visibly on the built pages
(e.g. the About page and footer), each with its correct status badge.
Any future change to a status in this register must also be updated in
that file, or the site will show a stale status.

## Day 5 note (2026-09-07)

No new Times Estate Ltd–specific business facts were added to this
register today — Day 5's work was forms, workflow, and safety logic,
not new business claims. Two content decisions are worth recording
here for completeness, though neither is a Times Estate Ltd fact
requiring its own row:

- **Emergency guidance numbers** shown on `/report-a-repair` (999, the
  National Gas Emergency Service on 0800 111 999, and the national
  power-cut number 105) are well-known, independently verifiable UK
  public-safety facts, not a Times Estate Ltd–specific claim — stated
  directly rather than added to this register, consistent with how
  such universally-published numbers are normally treated.
- **What Times Estate Ltd itself will do** in response to a repair
  report (response times, an out-of-hours contractor process) is
  explicitly **not** stated anywhere on the site — the page carries a
  visible "Requires professional review" notice instead of a specific
  promise, exactly because no such commitment has been confirmed by the
  owner. This is a deliberate absence, not an oversight, and should
  remain absent until the owner (ideally with professional advice)
  confirms what can honestly be promised.

## Day 6 note (2026-09-07) — content review using today's status vocabulary

Today's brief asks every material factual statement to carry one of
exactly: **Verified / Supplied by the business owner / Placeholder /
Requires legal or professional review / Demonstration content.** This
is a slightly different vocabulary from the five-label system CLAUDE.md
established (Confirmed / Supplied by owner / Missing / Requires
verification / Requires professional review), used throughout this
register and the rest of the project. Rather than silently reinterpret
either system, the mapping used below is:

| CLAUDE.md label (used elsewhere in this register) | Today's label (used in the table below) |
|---|---|
| Confirmed | Verified |
| Supplied by owner | Supplied by the business owner |
| Missing | Placeholder (where a page shows a structure with no content yet) |
| Requires verification | Requires legal or professional review (only where the outstanding check is itself legal/professional, e.g. a solicitor review — an independent registry check like Companies House is still recorded as its own thing, see notes column) |
| (fabricated sample data) | Demonstration content |

**Every material statement on the site today, reviewed against this
vocabulary:**

| Statement | Where shown | Status (today's vocabulary) | Notes |
|---|---|---|---|
| Legal name, Companies House number, registered office | `/about`, footer | Verified | Unchanged from register items 1, 2, 8 |
| Redress scheme, CMP membership, PII insurer | `/about`, `/complaints` | Requires legal or professional review | Certificates reviewed directly but not independently verified against each scheme's own register — see items 3, 4, 6 above |
| Privacy Notice text | `/privacy-policy` | Requires legal or professional review | New today — drafted from real system behaviour, not a template |
| Cookie Notice text | `/cookie-policy` | Requires legal or professional review | New today |
| Terms of Website Use text | `/terms` | Requires legal or professional review | New today |
| Complaints procedure text (except the response-timescale figure) | `/complaints` | Requires legal or professional review | New today |
| Complaints response timescale | `/complaints` | Placeholder | Genuinely not yet decided by the owner — no figure invented |
| Accessibility statement | `/accessibility` | Verified | A factual account of testing actually performed today (`ACCESSIBILITY.md`), not a legal instrument requiring solicitor review in the same way |
| Fee categories (what the law permits) | `/fees` | Requires legal or professional review | The legal framework described is accurate as researched today, but the page as a whole should still be reviewed before publication |
| Actual fee amounts | `/fees` | Placeholder | Not yet supplied by the owner |
| Every property listing | `/buy`, `/rent`, `/property/[id]`, etc. | Demonstration content | Unchanged since Day 4 — fabricated sample data, clearly labelled, excluded from search-engine indexing today (see `SEO_PLAN.md`) |
| AI assistant's answers | Assistant widget, sitewide | Demonstration content | Rule-based, no external AI provider — see `AI_SAFETY_RULES.md` |
| Company details, areas covered, team | `/about` | Placeholder (team, areas) / Verified (company details) | Unchanged from Day 3 |

No item above was invented — every "Placeholder" row remains visibly
marked as such on the page itself (via `PlaceholderNotice`), and every
"Requires legal or professional review" row carries the new
`DraftLegalNotice` banner (`web/src/components/layout/DraftLegalNotice.tsx`),
so a visitor or reviewer can immediately see which is which.

## How to use this register

1. Before adding any business fact, statistic, credential, testimonial, or
   piece of regulated content to a page, mockup, or content draft, add (or
   update) its row here first.
2. A fact may not move to **Confirmed** without a named source and, where
   applicable, a verification date and verifier.
3. If a fact's status is ever downgraded (e.g. a membership lapses), update
   this register immediately and flag any page currently using it.
4. This register is reviewed in full before the Day 7 launch-readiness
   review, and nothing with a non-Confirmed status is permitted to go live.

| 16 | Areas covered (candidate list) | Tooting, Mitcham, Streatham, Balham, Colliers Wood, Wimbledon, Clapham | Owner's existing live website (Segment 1 audit, 2026-10-19) | Requires verification | — | 2026-10-29 | Shown on `/areas` with a Requires verification badge; page is noindex; no area guides written |
| 17 | Tenancy deposit protection scheme | — | — | Missing | — | 2026-10-29 | Shown as Missing on `/why-choose-us` |
| 18 | "No automated valuation figure" | Structural fact about this website | `lib/valuation-terms.ts`, `AI_SAFETY_RULES.md` | Confirmed | Build team | 2026-10-29 | Used on `/why-choose-us` and `/landlords` |
| 19 | Emergency guidance numbers | 999; National Gas Emergency 0800 111 999; power cut 105 | Public UK emergency numbers | Confirmed (public numbers) — wording Requires professional review | — | 2026-10-29 | Shown on Report a Repair; Times Estate Ltd's own out-of-hours process Missing |
| 20 | Repair/out-of-hours process and response times | — | — | Missing | — | 2026-10-29 | Proposed acknowledgement targets (15 min / 2 h / 24 h) are internal flags only, not promised publicly |
| 21 | Lead and file retention periods | Proposals: 12 months after closure (repairs/files), 2 years (instructions) | Build team proposal | Requires professional review | — | 2026-10-29 | See PRIVACY_DATA_MAP.md |
| 22 | Form privacy wording | "We use these details only to respond to this request…" | Build team draft | Requires professional review | — | 2026-10-29 | On every enquiry form |
