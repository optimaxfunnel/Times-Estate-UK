# CONTENT_VERIFICATION_REGISTER.md

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

## Register

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
