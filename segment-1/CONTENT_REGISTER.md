# CONTENT_REGISTER.md — Times Estate Ltd (Segment 1, 2026-10-19)

Catalogue of every piece of content, data, claim, contact detail, image
and legal page found on (a) the **live site** timesestates.co.uk and (b)
the **local build** in this repository, with a status from the project's
standing vocabulary: **Confirmed / Supplied by owner / Missing /
Requires verification / Requires professional review**, plus
**Preserve / Replace / Remove** as the recommended action. Nothing here
has been invented; where a value exists only in the supplied mock-up it
is marked *illustrative*.

## 1. Company identity

| Item | Live site | Local build | Independent check (2026-10-19) | Status | Action |
|---|---|---|---|---|---|
| Legal name | "Times Estates" / "Times Estates Ltd" (privacy, terms) | "Times Estate Ltd" | Companies House: **TIMES ESTATE LTD** | Confirmed (legal name); live site wording **incorrect** | Replace: use "Times Estate Ltd" wherever the company is identified; "Times Estates" only as a trading name if the owner confirms it |
| Company number | not shown | 09597081 | Companies House: 09597081, Active, private limited, incorporated 19 May 2015, SIC 68320 | Confirmed | Preserve; must appear on the site (Companies Act 2006 s.82 / Trading Disclosures Regs 2008) |
| Registered office | 145 Upper Tooting Road (privacy/terms only) | 145 Upper Tooting Road, London SW17 7TJ | Companies House: matches | Confirmed | Preserve |
| Trading address | 127 Upper Tooting Road, London SW17 7TJ | same, badge "Supplied by owner" | not independently checked | Supplied by owner | Owner to confirm (Q2) |
| Directors (public record) | "Mohammad Muzaffar Malik, CEO & Founder" | not shown | Companies House: Mohammad Muzaffar Malik and Akhtar Naheed, both appointed 15 April 2025 (Mr Malik also a director 19 May–1 Dec 2015) | Confirmed (record) / "CEO & Founder" title Requires verification | Only publish titles the owner confirms |
| Filing status | — | — | Accounts to 31 May 2025 filed; next due 28 Feb 2027; confirmation statement 15 Apr 2026 filed | Confirmed | No action |
| VAT number | not shown | "MISSING" placeholder on `/fees` | — | Missing | Q2 |
| "family-run" / "over 10 years" (live home) | yes | no | Incorporated 2015 → 11 years is arithmetically consistent, "family-run" unverified | Requires verification | Keep only if owner confirms trading history |

## 2. Contact details

| Item | Live site | Local build | Status | Action |
|---|---|---|---|---|
| Landline | 0208 672 8080 (footer, agents page); `tel:` link empty on contact page | 0208 672 8080 | Supplied by owner (consistent across both) | Owner to confirm it is answered (Q2) |
| Mobile | 0777 999 1313 (agents page); 07779991313 (privacy/terms) | 0777 999 1313 | Supplied by owner | Q2 |
| Construction line | not on live site | "0208 6738 555" (footer line) | Supplied by owner (Phase 4) | Q4 |
| Email — general | info@timesestates.co.uk | timesestatesuk@gmail.com | **Conflict** | Owner to choose the public address and the form recipients (Q2, Q7) |
| Email — personal | malik@timesestates.co.uk (agents page) | — | Supplied (live) | Q7 |
| Email — placeholder | someone@example.com in listing share links | — | Defect | Remove |
| Opening hours | not shown | "MISSING" placeholder | Missing | Q2 |
| Domain | www.timesestates.co.uk (live) | referenced in config | Live and serving; ownership/registrar not verified | Q7 |
| Areas served | "Tooting, Mitcham, Streatham, Balham, Colliers Wood, Wimbledon, Clapham and Surrounding Areas"; filter list adds Battersea, Camberwell, Clapham Junction, Earlsfield, Furzedown, Nine Elms, Putney, Southfields, Tooting Bec, Tooting Broadway | "MISSING" (deliberately not named) | Supplied (live site) — not re-confirmed | Owner to confirm the list before area pages are built |

## 3. Services and claims

| Claim | Where | Status | Action |
|---|---|---|---|
| Residential lettings | live + local | Supplied by owner; live listings are lettings only | Preserve |
| Residential sales | local; live has "For Sale" filter but no sale listings | Supplied by owner | Owner to confirm sales are offered (affects AML supervision, Q3/Q4) |
| Commercial sales/lettings/management | local; live has a "Commercial Properties" section | Supplied by owner | Q4 |
| Property management | both | Supplied by owner | Preserve |
| **"Guaranteed rent"** scheme | live (heading + service card + terms: "guarantees monthly rental payments, whether the property is tenanted or vacant") | Requires professional review — a rent guarantee is a financial promise; wording, conditions and whether this is a rent-to-rent arrangement determine regulatory treatment | Do not reproduce until reviewed (Q4) |
| "Fully Vetted Tenants" | live | Requires verification (referencing process must exist) | Hold |
| "Competitive Rates", "Transparency", "Risk Free" | live | Marketing claims; "Risk Free" is an absolute claim likely to breach CAP Code 3.1/3.3 | Remove "Risk Free"; others need substantiation |
| "London Property Experts" (tagline) | logo, mock-up, local build | Positioning claim; defensible as puffery if the business genuinely operates across London, but the live site serves SW London only | Owner decision (Q4) |
| Construction / "Builders Terminal" sister company | live terms; local footer line | Supplied by owner; scope decision already made (mention only) | Preserve decision; confirm the sister company's legal identity (Q4) |
| Testimonials: Dave Smith (developer), Umar Farooq (tenant), Kelly Watkins (landlord) | live | **Requires verification** — no date, no consent evidence; DMCC Act 2024 bans fake/unsubstantiated reviews | Remove unless the owner can evidence each (genuine, dated, consented) |
| "Sarah M, Clapham" five-star quote; "672 Properties Found"; eight priced listings in Battersea, Notting Hill, Clapham, Shoreditch, Canary Wharf, Kensington, Hampstead, Soho | mock-up only | *Illustrative* — PROHIBITED TO INVENT | Never publish |
| "Planning Permission" article | live blog | Unreviewed, contains "sdfsdf" and duplicated paragraphs, byline `admin.timesestates` | Remove or rewrite with a named author |

## 4. Property data

| Item | Detail | Status | Action |
|---|---|---|---|
| Live listing TE1915, 67A Flaxman Road SE5 9DN, £1,250 pcm | 5 photos, EPC C(69), no deposit/council-tax/tenure/availability, "Updated 29 Jan 2022", tagged "New Listing" | **Stale (4 years 9 months)**; missing material information | Owner confirms let/withdrawn; remove from public view (Q6) |
| Live listing Fishponds Road SW17 7LF, £1,000 pcm room | 6 photos, 3 floor plans, Matterport tour, EPC D(64), bed/bath counts conflict with "3 bedroom property" description | Stale; same gaps | As above |
| Live search taxonomy | 13 areas, 5 types, labels incl. "Managed/Sold/Let agreed" | Theme configuration | Record only |
| Local build data | 9 fabricated properties in `web/src/data/demo-properties.ts`, each labelled "SAMPLE PROPERTY — NOT REAL", `noindex` | Demo, correctly labelled | Replace with real feed when supplied |
| Property feed / CRM | none on either site; listings typed into WordPress | Missing | Q6 |
| Portal presence (Rightmove/Zoopla/OnTheMarket) | not checked (outside scope of the website audit) | Missing | Q6 |

## 5. Images and media

| Item | Status | Action |
|---|---|---|
| Live listing photographs (11) and 3 floor plans | Ownership presumed agency's; no licence record | Preserve files if the owner confirms rights (row 24 of compliance register) |
| Live hero/slider imagery (Slider Revolution) | Source unknown | Requires verification |
| Matterport tour (Fishponds Road) | Hosted on Matterport; account ownership unknown | Q6 |
| Supplied logo and homepage mock-up | See `BRAND_SOURCE_AUDIT.md` | Ownership/licence Q1 |
| Local build imagery | None — every slot says "Photograph not yet supplied" | Missing | 
| Open Graph image | None on either site | Missing |

## 6. Legal pages

| Page | Live site | Local build | Status |
|---|---|---|---|
| Privacy policy | Exists (eff. 01.01.2024, updated 09.11.2024); wrong company name; says Google Analytics used yet no consent banner; "do not transfer outside EEA" conflicts with GA | Drafted, banner "DRAFT — REQUIRES LEGAL REVIEW" | Requires professional review (both) |
| Cookie policy | Only a section in privacy; "Cookies Policy" link is `#` | Drafted; states no non-essential cookies — **verified true** for the local build (no third-party script) | Requires professional review |
| Terms | "Terms of Service" (eff. 01.01.2024, updated 01.12.2024); "Terms & Conditions" links elsewhere point to `#` or the same page | "Terms of Website Use" drafted | Requires professional review |
| Complaints procedure | None on live site | Drafted; response timescale MISSING | Requires professional review + owner timescale |
| Fees page | None on live site | Structure only; every figure MISSING | Missing (Q5) |
| Accessibility statement | None | Published, reflects testing | Preserve |
| Redress / CMP statements | None on live site | PRS030616 / CMP013294 shown with "REQUIRES VERIFICATION" badges | Requires verification (Q3) |
| CMP certificate (image/PDF) | Not published | Not published | Missing — required by reg. 4(1)(c) CMP Regs 2019 if client money is held |

## 7. Forms

| Form | Live site | Local build |
|---|---|---|
| Contact | Tenant/owner choice, property type, message; GDPR checkbox "I consent to having this website store my submitted information"; no privacy link | Name, email, phone, message, privacy consent checkbox linked to policy; honeypot; rate limit |
| Valuation / appraisal | "Request A Valuation" button (destination not verified) | `/sell`, `/let` lead forms |
| Viewing / callback / register / alerts / repair (with file upload) | Not present | Present, all through one validated pipeline; **no email is sent** (no provider) |
| Login / Register / Create a Listing | Public registration open | Not present (admin is mock-only) |

## 8. Assets and content to preserve from the live site

Preserve: the domain and its indexed URLs (with redirects), the landline
and mobile numbers, the trading address, the two listings' photographs
and floor plans (subject to rights confirmation), the Matterport tour,
the area list as a candidate coverage list, and the fact pattern of a
Tooting-based family business established 2015. Do not preserve: Houzez
template pages, user registration, the blog post, the testimonials in
their current unverifiable form, the agency credit link, the privacy and
terms texts, and any "demo18.houzez.co" links.
