# CONTENT_REGISTER.md — Times Estate Ltd

## Status of this document

Today's brief asks for content classified as exactly: **CONFIRMED /
MISSING / PLACEHOLDER / PROHIBITED TO INVENT.** This is a different
vocabulary from the five-label system `CLAUDE.md` established
(Confirmed / Supplied by owner / Missing / Requires verification /
Requires professional review), which remains authoritative throughout
`CONTENT_VERIFICATION_REGISTER.md` and the rest of this project. Rather
than reinterpret either system silently, this file maps between them:

| CLAUDE.md label | Today's label |
|---|---|
| Confirmed | CONFIRMED |
| Supplied by owner / Requires verification / Requires professional review | MISSING (until it clears its check) — shown with its detailed CLAUDE.md status in the Notes column below |
| A visible "not yet supplied" placeholder on the page itself | PLACEHOLDER |
| (a whole category of content this project must never fabricate) | PROHIBITED TO INVENT |

## Register

| Item | Classification | Notes |
|---|---|---|
| Legal name (Times Estate Ltd) | CONFIRMED | Verified against Companies House |
| Companies House number (09597081) | CONFIRMED | Verified against Companies House |
| Registered office (145 Upper Tooting Road, London, SW17 7TJ) | CONFIRMED | Owner-confirmed, matches Companies House |
| Landline (0208 672 8080) | MISSING → newly supplied | Supplied by owner, matches the owner's photographed business card; not independently verified as reaching the business; shown on `/contact` with a "Supplied by owner" badge |
| Mobile (0777 999 1313) | MISSING → newly supplied | Same as above |
| Domain (https://timesestates.co.uk) | SUPPLIED BY OWNER — control confirmed by owner 2026-11-09 | The owner states they can log in where the domain is registered. Public DNS (checked 2026-11-09): run by **20i** (StackDNS); email already hosted on **20i StackMail**; SPF allows only StackMail (`-all`); DMARC `quarantine`; the old site is on a 20i server (185.151.30.191). **Not deployed to by this project.** |
| Public email address (timesestatesuk@gmail.com) | MISSING → newly supplied 2026-09-09 | Supplied by owner, matches the photographed business card; not independently verified; shown on `/contact` |
| Trading address (127 Upper Tooting Road, London, SW17 7TJ) | MISSING → newly supplied 2026-09-09 | Supplied by owner, matches the photographed business card; **differs from the Companies House-verified registered office (145 Upper Tooting Road)** — recorded as a separate trading address, not a correction; see `DECISIONS.md` |
| Customer-facing name | CONFIRMED — "Times Estate Ltd" (since 2026-09-11) | The 2026-09-09 "Times Estates" contraction was retired when the owner's own logo artwork spelt out the full name; display and legal name now coincide. See `DECISIONS.md` (2026-09-11) |
| VAT number | MISSING | Still outstanding |
| Opening hours | MISSING | Still outstanding |
| "Construction" as an additional service line | RESOLVED (2026-09-09) — mention only | Owner's answer to the Phase 4 gating question: not a sitemap section or page. One factual line on `/about` and in the footer small print names it and its separate phone number (`SITEMAP.md` §14) — see `DECISIONS.md` |
| Area Guides content (per-area facts) | MISSING — template only | `SITEMAP.md` §13, Phase 4: page template built, zero real guides written. Every fact needs a source before publication — none invented to fill the template |
| Insights articles | MISSING — template only | `SITEMAP.md` §15, Phase 4: page template built, zero real articles written |
| Tenant Fees page real figures | MISSING | `SITEMAP.md` §18, Phase 4: dedicated page structure specified (permitted vs. prohibited payments), real figures still Missing |
| Homepage hero and valuation-band imagery | PLACEHOLDER (illustration) | Since 2026-10-20 the reference's photographs are stood in for by a generic skyline illustration (`SkylineBackdrop.tsx`); no photograph is shown anywhere until real photography is supplied |
| Client reviews slot on the homepage valuation band | PROHIBITED TO INVENT — slot shows "MISSING" | The owner's reference shows a named five-star testimonial; the live site shows a labelled empty slot instead (2026-10-20). Fills only with genuine, attributable reviews |
| Map/list results — map provider | MISSING | `SITEMAP.md` §5: no map provider chosen; connecting one is a paid third-party integration requiring Rule 4 approval |
| Proposed email addresses (20, see `EMAIL_AND_FORM_ROUTING.md`) | PLACEHOLDER — none exist | Proposed, not confirmed existing mailboxes; no mailbox, alias, or DNS record has been created |
| Social media profiles (Facebook, Instagram, LinkedIn, YouTube, X, TikTok, WhatsApp Business, Google Business Profile) | MISSING — all eight | No profile URL has ever been supplied for any of the eight channels. The `SocialLinks` component and config exist (`web/src/lib/social-config.ts`) with every entry `enabled: false` — confirmed rendering nothing on the live built site. See `DECISIONS.md` (2026-09-09) |
| Open Graph share image | MISSING | Phase 6 QA (`QA_REPORT.md` §5): no real-brand OG image exists; shared links currently have no preview image on social platforms |
| Brand accent/warning colours | CONFIRMED (corrected) | Phase 6 QA found and fixed a real WCAG contrast failure in the Phase 5 rebrand's colour tokens (white text on the bright orange/warning-gold fills measured below 4.5:1) — see `DECISIONS.md` and `BRAND_GUIDELINES.md` for the corrected values |
| Redress scheme (Property Redress Scheme PRS030616) | MISSING (Requires verification) | Certificate reviewed, no independent register lookup completed |
| Client Money Protection (CMP013294) | MISSING (Requires verification) | Same caveat |
| Professional indemnity insurance schedule | MISSING (Requires verification) | Only generic policy wording supplied, not the schedule with actual figures |
| Professional body membership (e.g. Propertymark) | MISSING | Not supplied |
| AML supervision registration | MISSING | Not supplied |
| Fee schedule (sales commission, lettings/management fees) | PLACEHOLDER | `/fees` shows the legal framework with real amounts marked Missing |
| Privacy Policy / Cookie Policy / Terms / Complaints procedure text | PLACEHOLDER (drafted, unreviewed) | Real drafted text exists on each page, each carrying a visible "Draft — requires legal review" banner |
| Logo | CONFIRMED (supplied by owner, 2026-10-20) — emblem usable, wordmark not | The owner's clock-and-skyline artwork is live as the emblem; its wordmark portion is unusable (a share button is baked over the "D" in the supplied screenshot) and is rendered as live text instead. A clean vector/PNG export is still wanted — `LOGO_ASSET_REGISTER.md` |
| Real property photography | PLACEHOLDER (illustration) | Every listing card shows a labelled line illustration ("Sample property — not real") rather than a stock/invented photograph |
| Every property listing shown on the site | PLACEHOLDER (demonstration content) | Fabricated sample data, clearly labelled "Sample property — not real" everywhere it appears, excluded from search-engine indexing |
| Geographic coverage / areas served | MISSING | Site deliberately avoids naming specific areas until confirmed |
| Staff names, roles, biographies, photography | PROHIBITED TO INVENT until supplied | Never fabricated; `/about`'s team section stays a visible placeholder until real, consenting people are supplied |
| Testimonials, reviews, ratings | PROHIBITED TO INVENT | None exist anywhere on the site; none will be added without genuine, attributable evidence |
| Statistics (properties sold, years of experience, etc.) | PROHIBITED TO INVENT | Never stated anywhere |
| Awards, memberships not evidenced | PROHIBITED TO INVENT | Never claimed |
| Fees, prices, or valuation figures not confirmed by the owner | PROHIBITED TO INVENT | The site structurally never generates a valuation figure — see `valuation-terms.ts` and `AI_SAFETY_RULES.md` |

## How this relates to `CONTENT_VERIFICATION_REGISTER.md`

That file remains the detailed, dated, sourced log with a verifier and
date for every fact — this file is a simpler classification view for
today's Phase 1 report. Any future fact should be added to
`CONTENT_VERIFICATION_REGISTER.md` first; this file can be refreshed
from it, not the other way round.

---

## Segment 2 addendum (2026-10-20) — content the proposed sitemap needs, and claims under review

The fuller catalogue of what the **live** WordPress site and the local
build each contain is `segment-1/CONTENT_REGISTER.md` (2026-10-19);
nothing there has changed. This addendum lists what the Segment 2
sitemap (`SITEMAP.md` S2.1) and brand strategy (`BRAND_STRATEGY.md`
S2.3) add to the picture.

### Content required per proposed page

| Page | Content needed | Classification today |
|---|---|---|
| `/buyers` | Process copy (how buying works, viewings, offers, what the agency does) | Can be written from the existing journeys — no new fact needed; **sales activity itself** Supplied by owner (Q4) |
| `/tenants` | Renting process; permitted payments; deposit scheme name; referencing process; repair route | Tenant fees figures MISSING; deposit scheme MISSING; referencing process MISSING (only if real) |
| `/investors` | Service process for owners of let property; management levels; "we publish no projections" | Can be written; **no return figures ever** — PROHIBITED TO INVENT |
| `/how-we-protect-you` | Redress scheme (name, number, logo under licence), CMP (certificate image/PDF — a statutory publication duty if client money is held), deposit scheme, PI insurance schedule, complaints link | Redress & CMP MISSING (verification); certificate MISSING; deposit scheme MISSING; PI schedule MISSING |
| `/areas`, `/areas/[area]` | Confirmed coverage list; per-area sourced facts; listings filter | Coverage MISSING (the live site's list — Tooting, Mitcham, Streatham, Balham, Colliers Wood, Wimbledon, Clapham and ten more — is a candidate list, Supplied (live), not re-confirmed) |
| `/insights/[slug]` | Articles with author and review date | MISSING — none written; the live "Planning Permission" post is not reusable |
| `/tenant-fees` | Permitted payments with real amounts | MISSING (Q5) |
| Share image (`og:image`) | 1200×630 built from the emblem + live-text wordmark | Can be produced in Segment 3 from the installed emblem |
| Wordmark typeface | Playfair Display (open licence) as the closest match to the artwork | Proposed in `DESIGN_APPLICATION_OPTIONS.md` §1; the artwork's actual typeface unknown (Segment 1 §7, Q1) |

### Claims reviewed in Segment 2

See `BRAND_STRATEGY.md` S2.3 for the full table. Summary of status
changes versus the Phase 1 register above:

| Claim | Status |
|---|---|
| "Guaranteed Rent" (live site) | PROHIBITED until verified + professionally reviewed — not in the sitemap |
| "Risk Free" (live site) | PROHIBITED — absolute claim; removed |
| "London Property Experts" (logo tagline) | Supplied by owner (in the artwork); coverage claim under review (Q4) |
| "Trusted by London homeowners", "Accurate market insight", "Building Brighter Tomorrows", "Est. London" (reference mock-up) | Not used |
| "Established 2015" | CONFIRMED (Companies House) — usable |
| "family-run", "over 10 years" (live site) | Requires verification / arithmetic only |
| Testimonials (live site ×3, mock-up ×1) | PROHIBITED TO INVENT; live ones Requires verification (DMCC Act) |
