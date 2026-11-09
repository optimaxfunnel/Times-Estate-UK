# COMPLIANCE_REGISTER.md — Times Estate Ltd

> **Restored 9 November 2026 from the project's git history** (commit
> `5284b25`, 30 October 2026). This file was missing from the folder on
> this computer. Any changes made to it between 31 October and
> 2 November could not be recovered, so Day 7 updates may be absent.
> Anything dated 9 November was added after the restore. See
> `RECOVERY_REPORT_2026-11-09.md`.


## Status of this document

**This register never claims Times Estate Ltd or this website is
legally compliant.** It lists every regulatory topic relevant to a UK
estate/letting agency's website, its current status, and what's
missing. Full topic-by-topic reasoning and researched sources already
exist in `REGULATORY_READINESS.md` (Day 6) — this file is the shorter
register view requested today, cross-referencing that document rather
than repeating its detail.

## Phase 6 QA note (2026-09-09)

A full technical QA pass (`QA_REPORT.md`) reviewed the site against
this register and confirmed: every "Requires verification"/"Missing"
row below is still exactly that — QA testing cannot clear a compliance
item, only confirm the site correctly labels it as unresolved rather
than presenting it as settled. No row below changed status as a result
of Phase 6. The one new item Phase 6 surfaced belongs in
`QA_REPORT.md`, not here: a critical technical defect (a server hang
on certain form submissions) that is a launch blocker independent of,
and in addition to, everything in this register.

## Register

| Topic | Status | Detail |
|---|---|---|
| Company disclosure (name, number, office) | Confirmed and displayed | `/about`, footer |
| Redress scheme (Property Redress Scheme, PRS030616) | Requires verification | Certificate reviewed directly; no independent register lookup completed — see `CONTENT_VERIFICATION_REGISTER.md` item 3 |
| Client Money Protection (Client Money Protect, CMP013294) | Requires verification | Same caveat — item 4 |
| **Tenancy deposit protection scheme** | **Missing — details expected** | A distinct requirement from CMP, legally required for any assured shorthold tenancy deposit taken. Owner has confirmed a scheme exists and will supply the name/membership details (2026-09-08) — update this row and `CONTENT_VERIFICATION_REGISTER.md` as soon as they arrive, following the same "Requires verification" pattern used for the redress scheme and CMP |
| Professional indemnity insurance | Requires verification | Policy wording supplied; the schedule with actual figures is still needed |
| Professional body membership (Propertymark/NAEA/ARLA) | Missing | Not supplied |
| AML supervision registration | Missing | Not supplied |
| UK GDPR / Data Protection Act 2018 | Drafted, requires legal review | `/privacy-policy`, `PRIVACY_DATA_MAP.md` |
| PECR / cookies | Compliant by having nothing to consent to yet | No analytics/tracking exists; `/cookie-policy` states this plainly; must be revisited the day any tracking technology is added |
| Equality Act 2010 (accessibility) | Genuine testing programme exists | `ACCESSIBILITY.md` — not a legal sufficiency claim |
| Consumer protection / DMCC Act 2024 (fake reviews) | Compliant by absence | No reviews/testimonials exist to be fake |
| Fee transparency (Tenant Fees Act 2019, Consumer Rights Act) | Structure built, real figures Missing | `/fees`. **Phase 4 (2026-09-09):** a dedicated `/tenant-fees` page is now specified separately from the general `/fees` page (`SITEMAP.md` §18), matching the Act's convention of a clearly, separately signposted tenant fees page — permitted/prohibited payment structure can be built now, real amounts remain Missing |
| Construction/renovation service line (discovered via the owner's business cards, 2026-09-09) | Resolved — excluded from site scope, mention only | The owner confirmed (Phase 4 gating question) this stays a separate trading activity, not a service area on timesestates.co.uk. A single factual mention with its own phone number appears on `/about` and the footer only (`SITEMAP.md` §14) — no construction-specific regulatory regime (e.g. CIS, Building Regulations, trade-specific insurance) applies to this website's content as a result |
| EPC advertising requirement | Mechanism ready, not yet applicable | Field exists in the data model; no real listing exists yet for the requirement to bite |
| Material information (NTSELAT Parts A/B/C) | Partially supported, requires legal review | Property pages show several relevant fields; a full disclaimer awaits solicitor review |
| Complaints handling procedure | Drafted, requires legal review + owner timescale | `/complaints` |
| Accessibility statement | Published, reflects real testing | `/accessibility` |
| AI assistant regulated-advice refusal | Confirmed implemented and tested | `AI_SAFETY_RULES.md` |

## What must happen before any compliance claim could be made

Every "Requires verification" and "Missing" row above must clear, and
every drafted legal page must receive actual solicitor sign-off —
none of that has happened yet. See `REGULATORY_READINESS.md` for the
full reasoning behind each row and `DEPLOYMENT.md` for how this fits
into the overall pre-deployment checklist.
