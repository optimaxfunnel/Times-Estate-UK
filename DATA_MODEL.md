# DATA_MODEL.md — Times Estate Ltd Property Data Model

## Day 4 Task 1 update (2026-10-29)

**Plain-English summary.** One property record covers all four kinds of
listing — residential sales, residential lettings, commercial sales and
commercial lettings. Every record has the same common fields, plus a
residential section or a commercial section. Every field is marked
mandatory or optional, public or private, and how it is verified.

**Baseline before today's changes:** all 69 tests passed and the
production build succeeded — nothing was failing.

**What changed today:**

- **Commercial EPC rating** added (`energyRating`, A+ to G or exempt) —
  the one field in the brief the model did not yet have. Shown on the
  property page when present; must match the real certificate.
- **Commercial purchase price** uses the common `price` field with a
  sale listing type (rent uses `rentPerAnnum` or `price` with a
  "per annum" qualifier) — documented rather than duplicated.
- **The field tables below now also exist in code**
  (`web/src/lib/property/field-rules.ts`), and a test checks that every
  private field is removed before a property reaches a public page,
  that an unverified investment yield is never shown, and that every
  field the brief lists is covered. Tests: 73/73.

**How "verified" works** — three kinds, recorded per field in the code:

| Kind | Meaning | Examples |
|---|---|---|
| System | Set by the software; nothing to check | reference, dates, status, demo flag |
| As supplied | Entered by staff and shown as entered | description, bedrooms, features |
| Must verify | Checked against a source document before a real listing is published | EPC rating (certificate), tenure (title register), council tax band, lease length, service charge, ground rent, floor area (survey), business rates, use class (planning record), investment yield (own verified flag) |

Every property also carries a record-level `verification` flag
(verified / unverified) and a `isDemo` flag that drives the visible
"Sample property — not real" label. The detailed tables follow
unchanged from Day 4 (September), with the commercial EPC row added.

| Added field | Mandatory? | Public/Private | Verified? |
|---|---|---|---|
| Commercial EPC rating | Optional | Public | **Must verify** against the commercial EPC certificate |
| Internal reference | Mandatory | Private | System — the record `id` (e.g. `demo-res-sale-1`); a human-friendly reference such as "TE-0001" can be added when real listings start, if the owner wants one |

---


## What this document is

Describes the single structured model used for every property on the
site — residential sales, residential lettings, commercial sales and
commercial lettings all share one common shape, with category-specific
extra fields. This is implemented in code at
`web/src/lib/property/types.ts` — this document explains it in plain
language; the code is the exact, current source of truth.

No real property data exists yet. Every property currently in the system
is demonstration data, built to exercise this model — see
`web/src/data/demo-properties.ts`, and Rule 2 in `CLAUDE.md`.

## The three-way split that runs through everything

Every field below is marked with three independent things:

1. **Mandatory or Optional** — must every property have this, or only
   some (e.g. only lettings have a deposit)?
2. **Public or Private** — can this ever be shown to a website visitor,
   or must it stay internal to Times Estate Ltd staff?
3. **Verified or Unverified** — has someone actually checked this fact is
   correct, or is it as-supplied and not yet independently confirmed?

**Private fields are never sent to any public page.** This isn't just a
display rule — in code, a property's full internal record and its
public-facing version are two different types
(`Property` vs `PublicProperty`), and the function that converts one to
the other physically removes the private fields rather than just hiding
them in the interface. A future page cannot accidentally leak a private
field, because the private fields don't exist on the type it receives.

## Common fields (every property, any category)

| Field | Mandatory? | Public/Private | Verified? |
|---|---|---|---|
| Internal reference (id) | Mandatory | Private | — |
| Private address (full address incl. house number) | Mandatory | **Private** | As supplied |
| Display address (what visitors see, e.g. "Sample Street, London SW17") | Mandatory | Public | As supplied until checked |
| Postcode | Mandatory | Public (see note below) | As supplied |
| Coordinates (map location) | Optional | Public (approximate only) | As supplied |
| Listing type (sale / letting) | Mandatory | Public | — |
| Property category (residential / commercial) | Mandatory | Public | — |
| Price | Optional (can be "POA") | Public | As supplied |
| Price qualifier (e.g. "Guide Price", "POA", "per calendar month") | Mandatory | Public | — |
| Status (see status list below) | Mandatory | Public status only if publicly visible | — |
| Summary (short description) | Mandatory | Public | As supplied |
| Full description | Mandatory | Public | As supplied |
| Features (bullet list) | Optional | Public | As supplied |
| Images | Optional (should be mandatory before going live) | Public | — |
| Floor plans | Optional | Public | — |
| Brochure | Optional | Public | — |
| Video / virtual tour | Optional | Public | — |
| Branch / office | Optional (Missing until confirmed) | Public | — |
| Assigned staff member | Optional | **Private** (public pages show "the Times Estate Ltd team", not a named individual, unless the owner confirms otherwise) | — |
| Internal notes | Optional | **Private** | — |
| Created date / Updated date | Mandatory | Private (used for sorting "newest first", not displayed as a raw timestamp) | — |
| Verification status | Mandatory | Not shown as raw text, but drives whether "unverified" internal warnings appear in admin | — |
| Demo flag | Mandatory | Drives the visible "Sample property" label — see Rule 2 | — |

**Note on postcode:** the full postcode is stored, but the convention
(standard across the industry, and followed here) is that the public
display address only ever shows the postcode district (e.g. "SW17"), not
the full postcode — the full postcode plus house number is only released
once a viewing is arranged. This is a deliberate privacy safeguard for
sellers and landlords, not an oversight.

## Residential-specific fields

Present only when category = residential.

| Field | Mandatory? | Public/Private | Verified? |
|---|---|---|---|
| Property type (flat, terraced house, etc.) | Mandatory | Public | — |
| Bedrooms | Mandatory | Public | — |
| Bathrooms | Mandatory | Public | — |
| Reception rooms | Optional | Public | — |
| Tenure (freehold/leasehold/share of freehold) | Optional (Missing until confirmed per property) | Public | As supplied |
| Council tax band | Optional | Public | As supplied |
| EPC rating | Optional | Public | **Should be Confirmed against the real EPC certificate before publishing — this project does not fabricate an EPC rating** |
| Deposit (lettings only) | Optional | Public | As supplied |
| Furnishing (furnished/unfurnished/part) | Optional (lettings) | Public | As supplied |
| Availability date (lettings) | Optional | Public | As supplied |
| Lease length remaining (leasehold sales) | Optional | Public | As supplied |
| Service charge (leasehold) | Optional | Public | As supplied |
| Ground rent (leasehold) | Optional | Public | As supplied |
| Chain status (sales only) | Optional | Public | As supplied |

## Commercial-specific fields

Present only when category = commercial.

| Field | Mandatory? | Public/Private | Verified? |
|---|---|---|---|
| Commercial use (office/retail/industrial/etc.) | Mandatory | Public | — |
| Use class (planning) | Optional | Public | **Unverified by default — planning use class must be confirmed with the local authority or a professional before being marked verified; the site never guesses one** |
| Floor area | Mandatory | Public | As supplied |
| Units (if divisible) | Optional | Public | As supplied |
| Tenure | Optional | Public | As supplied |
| Rent per annum (lettings) | Optional | Public | As supplied |
| Business rates payable | Optional | Public | As supplied — clearly marked as indicative, since actual rates depend on the occupier's circumstances |
| Service charge per annum | Optional | Public | As supplied |
| VAT position | Optional | Public | As supplied |
| Lease terms summary | Optional | Public | As supplied |
| Possession date | Optional | Public | As supplied |
| **Investment yield** | Optional | Public **only if verified** | **This field carries its own explicit verified/unverified flag in the data model, separate from the rest of the property. An unverified yield figure is never shown publicly — Rule 1 treats investment return claims as particularly sensitive.** |

## Property status (marketing lifecycle)

| Status | Publicly visible? | Meaning |
|---|---|---|
| Draft | **No** | Being prepared, not yet ready for review |
| Awaiting approval | **No** | Submitted by a Property Editor, waiting for Manager/Administrator sign-off |
| Available | Yes | Actively marketed |
| Under offer | Yes (marked clearly) | An offer has been accepted but not yet completed |
| Sold subject to contract | Yes (marked clearly) | Sales equivalent of under offer, further along |
| Sold | **No** | Transaction complete — removed from public search (a "recently sold" showcase could be added later if the owner wants one, but that is a separate, explicit decision, not assumed here) |
| Let agreed | Yes (marked clearly) | A tenancy has been agreed but not yet started |
| Let | **No** | Tenancy live — removed from public search |
| Withdrawn | **No** | No longer being marketed |
| Archived | **No** | Kept for record-keeping only |

**This visibility rule is an assumption made today, not something the
owner has explicitly confirmed** — it follows normal industry practice
(only actively-marketed or recently-agreed properties are shown), but the
owner should confirm or correct it, particularly whether "Sold"/"Let"
properties should have a public "recently sold/let" showcase.

## Roles allowed to change status

See `web/src/lib/auth/roles.ts` and the CMS section of today's build for
the full permission matrix. In summary: Property Editors can move a
property to "Awaiting approval"; only Managers and Administrators can
approve it to "Available" or beyond.

## What's demo data today

Every property currently in the system (`web/src/data/demo-properties.ts`)
is invented sample data — fictional addresses like "Sample Street" and
"Example Road", not real Times Estate Ltd instructions. Every one is
marked `isDemo: true`, which the interface uses to show a highly visible
"Sample property — not real" label everywhere it could appear. This
follows the explicit instruction that demonstration listings must never
resemble genuine instructions received by Times Estate Ltd.
