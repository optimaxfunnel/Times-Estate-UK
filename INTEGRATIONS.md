# INTEGRATIONS.md — Times Estate Ltd

## Status of this document

A comparison of external service options for later days' work.
**Nothing on this page has been connected, purchased, or signed up for.**
Every option below requires the owner's explicit approval (CLAUDE.md
Rule 4) before any account is created or any code is wired to it. This is
a menu to choose from, not a set of decisions already made.

## Database

| Option | Notes |
|---|---|
| **Managed Postgres** (e.g. Neon, Supabase, Vercel Postgres) | Free tiers exist for early development; paid tiers scale with usage — needs the owner's approval before any tier beyond free is chosen. Good fit for structured data (enquiries, property listings). |
| **SQLite (local file)** | No account or cost at all; fine for early development, not suitable for a live multi-user production site. Could be a genuinely free way to build and test Day 5's workflows before committing to a paid database. |

**Recommendation for discussion:** start with SQLite for development, move
to a managed Postgres provider only once the owner approves a specific
provider and, if applicable, a paid tier.

## CMS (for editable content — property listings, page text)

| Option | Notes |
|---|---|
| **Headless CMS** (e.g. Sanity, Payload, Directus) | Lets non-technical staff edit content without code changes. Most have a free tier for small projects; some (Payload, Directus) can be self-hosted at no licence cost. |
| **No CMS — content in code** | Zero cost, but every content change needs a developer. Reasonable for today's scope (Day 3) given how much content is still Missing, but not sustainable once the site has real, frequently-changing property listings. |

**Current approach:** today's pages hold confirmed facts in
`src/lib/site-config.ts` as typed, version-controlled data — effectively a
"CMS of one file" appropriate for the current amount of content. A real
CMS decision should wait until Day 4/5, once live listings are in scope.

## Authentication

| Option | Notes |
|---|---|
| **Auth.js (NextAuth)** | Free, open-source, self-hosted — no third-party account required unless using a social login provider. |
| **Managed auth** (e.g. Clerk, Auth0) | Free tiers exist; paid beyond a user-count threshold. |

**Not needed today.** No page built today requires a login. This becomes
relevant only if a landlord/tenant portal (referenced as a possible future
idea in `MARKET_RESEARCH.md`) is approved later.

## Search (site search / property search)

| Option | Notes |
|---|---|
| **Database query (Postgres full-text search)** | No extra service or cost — sufficient for a single agency's property volume. |
| **Dedicated search service** (e.g. Algolia, Meilisearch) | Faster, more forgiving of typos; Algolia has a free tier, Meilisearch can be self-hosted free. Likely unnecessary at this business's scale. |

**Recommendation for discussion:** plain database search is almost
certainly sufficient and avoids an unnecessary paid dependency.

## Email (enquiry notifications, alerts)

| Option | Notes |
|---|---|
| **Transactional email provider** (e.g. Resend, Postmark, Amazon SES) | All have a free/low-cost tier for the volume a single agency would generate. Needed for every form in `USER_JOURNEYS.md` to actually notify staff and confirm receipt to the visitor. |

**This is the most urgent integration decision for Day 5** — every
enquiry/valuation/repair-report journey approved on Day 2 depends on it.
No provider has been chosen; the owner must approve one specifically.

## File storage (property photos, floorplans, EPCs)

| Option | Notes |
|---|---|
| **Cloud object storage** (e.g. Cloudflare R2, Amazon S3) | Pay-as-you-go, typically pennies at this scale; needed once real property photography exists. |
| **CMS-bundled storage** | If a headless CMS is chosen, it may include file storage, avoiding a separate service. |

**Not needed today** — no property photography exists yet to store.

## Analytics

| Option | Notes |
|---|---|
| **Privacy-respecting analytics** (e.g. Plausible, Fathom) | Paid, but simple and GDPR-friendly by design — relevant given this is a UK business handling personal enquiry data. |
| **Google Analytics** | Free, but has more involved cookie-consent implications or requires consent-mode configuration. |

**Not connected today.** Requires a cookie policy to exist first (still
Missing/Requires professional review), and explicit owner approval of
whichever provider is chosen.

## Hosting

| Option | Notes |
|---|---|
| **Vercel** | Built by the makers of Next.js; free tier for small sites, paid tiers scale with traffic. Simplest deployment path for this exact stack. |
| **Self-hosted / other cloud provider** | More control, more setup effort; only worth it if the owner has a specific reason (existing infrastructure, cost at scale). |

**Not connected today** — no hosting account exists, and none will be
created without the owner's explicit approval, per Rule 4 and Rule 6 (no
deployment without the exact stated approval phrase).

## Monitoring / error tracking

| Option | Notes |
|---|---|
| **Sentry** (or similar) | Free tier available; valuable once the site is live and handling real enquiries, so a broken form is noticed immediately rather than silently losing a lead. |

**Not needed today** — relevant from Day 6 (quality assurance) onward.

## CRM / property portal integration (added Day 4, 7 September 2026)

**Confirmed CRM or portal agreement:** none. Nothing in
`BUSINESS_REQUIREMENTS.md` or anywhere else in this project confirms that
Times Estate Ltd already uses a CRM, or has a live feed agreement with
Rightmove, Zoopla, OnTheMarket or anyone else. **This is an open question
for the owner, not an assumption** — see "Unresolved questions" below.

**What was explicitly not done today:** no portal was scraped, no feed
was assumed to be free or open, and no specific provider was contacted or
connected. Today's search and listing pages run entirely on the
fabricated demonstration data described in `DATA_MODEL.md`.

### The adapter architecture built today

Every part of the website that reads or writes property data — search,
listing pages, the property detail page, the admin area — talks only to
one interface, `PropertyProvider` (`web/src/lib/property/provider.ts`).
Today, the only implementation of that interface is `DemoPropertyProvider`,
which reads from an in-memory array of fabricated properties.

Connecting a real CRM or portal later means writing **one new class**
that implements the same `PropertyProvider` interface (`list`, `getById`,
`create`, `update`) against that provider's real API — nothing in the
search, listing, or admin pages needs to change, because they were never
written against the demo data directly.

### Provider comparison

| Provider | Notes |
|---|---|
| **Reapit** | Widely used UK estate agency CRM/back-office system with a published API (Reapit Foundations). Requires a Reapit account/subscription and API credentials issued by Reapit or via their marketplace. |
| **Alto** (by Zoopla) | CRM aimed at agents; API access is typically arranged through Zoopla/Alto directly, often tied to an existing Alto subscription. |
| **Dezrez** | UK CRM with an API (Dezrez Connect); requires an existing Dezrez subscription and API key issuance from Dezrez. |
| **Jupix** | UK lettings/sales CRM; API access requires a Jupix account and their integration team's involvement. |
| **Street** (Street.co.uk) | Newer UK agency software with an API; requires a Street subscription. |
| **SME Professional** | UK agency software; API/integration availability would need confirming directly with SME Professional. |

None of these have been evaluated in detail (pricing, API quality,
contract terms) because there is no confirmed decision to use any CRM at
all yet. This table exists so that, once the owner confirms a provider
(or confirms none is wanted and listings will be entered by hand), the
correct adapter can be built quickly.

### What every option would require, regardless of provider

- **Required agreement:** a commercial account/subscription with the
  chosen provider, in the business's name — this is the owner's contract
  to enter into, not something this project can create.
- **Credential requirements:** an API key or OAuth client
  issued by the provider. Per CLAUDE.md Rule 4, these credentials must be
  supplied by the owner and stored only as environment variables (never
  committed to the repository) — see `web/src/lib/env.ts`'s pattern for
  how required variables are validated with no default.
- **Expected data direction:** most likely **inbound** (the CRM is the
  source of truth; the website reads and displays listings) with
  **outbound** enquiry data (viewing requests, valuation requests) sent
  back into the CRM once Day 5's automation work is approved. A genuinely
  two-way sync is more complex and should not be assumed without the
  owner's confirmation of what the CRM actually supports.
- **Security risks:** a leaked API key would expose live business data
  (property instructions, potentially client contact details) — this is
  why credentials are never committed and access should be scoped to the
  minimum the website needs (read listings; write enquiries), not full
  account access, if the provider allows scoping.
- **Failure handling:** the website must degrade gracefully if the CRM is
  unreachable (e.g. show "search is temporarily unavailable" rather than
  a broken page or, worse, silently showing stale/incorrect data). This
  needs building into whichever real `PropertyProvider` implementation is
  written — today's demo provider cannot fail, so this hasn't been
  exercised yet.
- **Synchronisation ownership:** who/what decides a listing is
  live/withdrawn/sold — the CRM (website just reflects it) or does the
  website ever write status changes back? The admin approval workflow
  built today (`ADMIN_AND_CMS.md`) assumes the website can be a source of
  truth for status in the absence of a CRM; if a real CRM is adopted, it
  should almost certainly become the source of truth instead, and
  today's admin approval screens would need rethinking, not just
  extending.

### Unresolved questions for the owner

1. Does Times Estate Ltd already use a CRM or agency software (Reapit,
   Alto, Dezrez, Jupix, Street, SME Professional, or another)? If so,
   which, and is there an existing API/integration agreement?
2. Does Times Estate Ltd have an existing live feed agreement with any
   property portal (Rightmove, Zoopla, OnTheMarket)? Portal feeds are
   typically *outbound* (the agency's CRM pushes listings *to* the
   portal) rather than something a website pulls *from* — so even with a
   portal agreement, the website would likely still need its own listings
   source (a CRM or manual entry), not a portal feed as the primary data
   source.
3. If no CRM exists yet, is manual entry through today's admin area
   (`/admin/properties`) an acceptable interim approach, or should
   choosing a CRM be prioritised before Day 5?

## Summary: what needs the owner's decision before Day 5

1. Email/notification provider (most urgent — blocks every enquiry
   journey from actually reaching staff).
2. Whether a CMS is wanted, or whether code-based content (today's
   approach) is acceptable for longer.
3. Database provider, once a CMS/data-storage decision is made.
4. Hosting provider, ahead of any real deployment.
5. **(Added Day 4)** Whether a CRM/agency software already exists, and
   whether a portal feed agreement exists — see the "Unresolved
   questions" list above. This determines whether Day 5 connects a real
   `PropertyProvider` or continues with manual admin entry.
6. **(Added Day 4)** A real authentication provider must be chosen before
   the admin area (`/admin`) can ever be deployed anywhere public — see
   `ADMIN_AND_CMS.md`'s security warning.
