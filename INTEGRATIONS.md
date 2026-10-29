# INTEGRATIONS.md — Times Estate Ltd

## Day 4 Task 5 — CRM and portal feed boundary (2026-10-29)

**Is there a confirmed CRM or portal agreement? No.** Nothing in the
project records one: Segment 1 asked where listings live today (a CRM,
Rightmove/Zoopla/OnTheMarket, or only the old WordPress site) and that
question is still unanswered. So nothing is connected, and no portal
is read, scraped or called.

**Portals are not sources.** Rightmove, Zoopla and OnTheMarket receive
listings *from* an agent's CRM under the agent's membership agreement;
none is assumed here to offer a free or open feed that a website could
read. This project will not scrape them.

**What was built** (`web/src/lib/property/feeds/feed-adapter.ts`): one
adapter shape every provider will plug into, plus a placeholder for each
provider named in the brief. Every placeholder reports "not connected"
and refuses to run, so nothing can call a provider by accident. Shared
rules enforced for every future provider:

1. Every imported record is checked against the site's property rules;
   invalid records are listed with reasons, never half-imported.
2. **Nothing imported goes live automatically** — imports arrive as
   "Awaiting approval" for a Manager or Administrator.
3. Imports are never marked as demo data or as "verified".
4. Read-only: the website never writes back to the CRM.

Tested with a fake in-memory feed (no network): accepted records,
rejected records with reasons, and every real placeholder refusing.

### Per-provider requirements

| Provider | Agreement needed | Credentials | Data direction | Notes |
|---|---|---|---|---|
| Reapit (Foundations) | Reapit customer contract + Foundations developer/app approval | OAuth client id/secret per customer, held in environment variables | CRM → website (read listings, images, statuses) | Most common in London agencies; app must be installed by the agency |
| Alto (Zoopla) | Alto subscription + Zoopla partner API access | API key/OAuth issued by Zoopla | CRM → website | Access is granted case by case |
| Dezrez (Rezi) | Rezi subscription + API agreement | API key | CRM → website | — |
| Jupix | Jupix subscription | Feed URL/key supplied by Jupix | CRM → website (XML feed) | Typically a scheduled XML export |
| Street.co.uk | Street subscription + API access | API token | CRM → website | — |
| SME Professional | SME subscription | Feed details from SME | CRM → website | — |
| Another provider | Whatever the owner confirms | As issued | CRM → website | Same adapter shape |

### For any provider

| Topic | Plan |
|---|---|
| **Required agreement** | The agency's own CRM contract, plus the provider's written permission for this website to read the agency's data (often a separate API/partner agreement) |
| **Credentials** | Issued to Times Estate Ltd, stored only as server environment variables, never in code or chat; rotated if a staff member with access leaves |
| **Data direction** | One way: CRM → website. Enquiries flow the other way only if the owner later approves writing leads into the CRM |
| **Security risks** | Leaked credentials exposing landlord/vendor data; private addresses or owner names arriving in the feed (the public/private split strips them before any page); oversized or malicious image URLs (images re-hosted, type/size checked); the provider being unavailable |
| **Failure handling** | A failed or partial import changes nothing on the live site; the last good listings stay; the failure is logged and shown to staff; invalid records are listed with reasons |
| **Synchronisation ownership** | Recommended: the CRM owns listing data and status; the website owns presentation and the approval step. Staff edit listings in the CRM, not in the website admin, once a feed is live (the admin then becomes read-only for feed listings) |
| **Schedule** | Pull every 15–60 minutes, plus a manual "refresh now" for Managers — confirmed with the provider's rate limits |

### Unresolved questions (need the owner)

1. Which CRM, if any, does Times Estate Ltd use today?
2. Which portals do you currently advertise on, and through which CRM?
3. Should the CRM's status be trusted directly (listings go live when the CRM says so), or should every import still wait for approval on the website? (Recommended: approval, at least at first.)
4. Who at the agency holds the CRM administrator account that would authorise the connection?
5. Are the two listings on the old website still live, and should anything be migrated from it?

---


## Task 1 service comparison (2026-10-29)

**Nothing below is connected, signed up for or paid for.** Each row is
a decision for the owner (Rule 4). Costs are **indicative ranges from
general knowledge of these vendors' public tiers, not quotes and not
re-checked against their pricing pages today** — confirm on the
vendor's site at the point of approval. "Essential now?" means needed
before a public launch.

### Recommended set (smallest that works)

| Service | Purpose | Essential now? | Cost (indicative) | Maintenance | Security implications | Simpler alternative | Migration options |
|---|---|---|---|---|---|---|---|
| **Database** — managed Postgres (Neon or Supabase, UK/EU region) | Store listings, leads, audit log, alerts so nothing is lost on restart | **Yes** (no persistence today) | Free tier to start; ~£15–£25/month at small scale | Backups automatic; schema migrations with each release | Holds personal data → UK GDPR processor contract, EU/UK region, encryption at rest, least-privilege credentials | SQLite file on a single VPS (free, but one server, manual backups) | Standard Postgres — dump/restore to any host; adapter keeps pages unchanged |
| **CMS** — none yet; listings via the built admin | Staff edit listings/pages | No | £0 | None extra | Admin must sit behind real auth | Content in code (today) | Add Payload or Sanity later behind the same provider pattern |
| **Authentication** — Auth.js (self-hosted) with email magic link or password + TOTP MFA | Staff login to admin; replaces the mock cookie | **Yes** (before admin is public) | £0 (library) | Library updates | Session security, MFA, brute-force limits; no visitor accounts | Admin only on a private network/VPN (no public admin) | Clerk/Auth0 later if SSO wanted; user table stays in our DB |
| **Search** — Postgres queries (today's filters) | Filter/sort listings | No extra service | £0 | None | None beyond the DB | — (this is the simple option) | Postgres full-text, then Meilisearch/Algolia only if listings reach thousands |
| **Email** — transactional sender (Resend or Postmark) | Lead notifications to staff, confirmations to customers, alert emails | **Yes** (forms send nothing today) | Free tier ~3,000/month; ~£10–£15/month beyond | DNS records (SPF/DKIM/DMARC) once; bounce monitoring | Domain authentication prevents spoofing; API key kept server-side only | Notifications to one staff Gmail via SMTP (fragile, poor deliverability) | Provider-agnostic sender adapter; swap by changing one class + DNS |
| **File storage** — S3-compatible (Cloudflare R2 or Supabase Storage) | Property photos, floor plans, repair-report photos | Yes once real photos exist | Free tier; pennies per GB | Lifecycle rules for repair photos (retention) | Repair photos are personal data — private bucket, signed URLs, virus/type checks (already type/size-checked) | Store on the VPS disk (no CDN, manual backup) | S3 API is portable between vendors |
| **Analytics** — none, or a cookieless tool (Plausible / self-hosted Umami) | Visit and conversion counts | No | £0 (Umami self-hosted) to ~£9/month (Plausible) | Minimal | Cookieless → no consent banner needed; Google Analytics would require one (PECR) | No analytics (today, compliant by absence) | Export CSV; switching costs nothing |
| **Hosting** — managed Node host (Vercel Pro, Render or Railway) **or** UK VPS with a process manager | Run the site | **Yes** (at launch) | Vercel Pro ~$20/month; Render/Railway ~£5–£20; VPS ~£5–£15 | Managed: almost none. VPS: OS patches, process manager, TLS | Managed hosts patch the platform; VPS puts patching on us. A process-manager watchdog also limits the hang-defect blast radius | Single VPS | Standard Next.js build runs on any of them; DNS change to move |
| **Monitoring** — uptime check (UptimeRobot / Better Stack) + error tracking (Sentry) | Know when the site or a form breaks | Yes at launch (uptime); recommended (errors) | Free tiers for both at this size | Alert routing to a staff mailbox | Error reports can contain personal data → scrub form fields before sending | Host's built-in logs + a free uptime ping | Both are drop-in; remove by deleting one SDK |
| **Maps** (from SITEMAP map view) | Map results | No | Free tier (MapTiler/OpenStreetMap-based) to usage-based (Google) | API key rotation | Approximate coordinates only (privacy rule); key restricted to domain | "Search by Area" panel (built) | Map component behind an adapter |
| **AI assistant provider** | Replace rule-based assistant | No | Usage-based | Prompt/safety review | Must keep `AI_SAFETY_RULES.md` refusals; no personal data in prompts without a DPA | Rule-based assistant (today) | Provider interface already exists |
| **CRM / portal feed** | Sync real listings (Reapit, Alto, Jupix, Street) | No — depends on Segment 1 Q6 | £40–£150+/month (CRM) | Feed mapping upkeep | Vendor DPA; API credentials | Enter listings in the admin | New `PropertyProvider` class |

**Minimum to launch** (once the hang defect is resolved and launch is
approved): database, authentication, email, hosting, uptime
monitoring — roughly **£10–£60/month** in total at launch scale,
matching Segment 1's estimate.

**Local substitutes in place now:** demo property provider (database),
mock role cookie (auth — development only), logged-not-sent
notifications (email), in-memory uploads (files), none (analytics),
rule-based assistant (AI), "Search by Area" panel (maps).

---

# Historical — Day 3 comparison (2026-09-07)


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

## AI assistant provider (added Day 5, 7 September 2026)

**Confirmed AI provider agreement:** none. No AI/language-model account
has been created, and no API key exists anywhere in this project — see
`AI_SAFETY_RULES.md` for the full behavioural contract the assistant
follows today and would need to keep following if a real provider is
ever connected.

### The adapter architecture built today

Exactly the same pattern as the `PropertyProvider` interface (Day 4):
every part of the site that talks to the assistant — the chat widget,
its server action — talks only to one interface, `AIProvider`
(`web/src/lib/ai/provider.ts`). Today the only implementation is
`DemoAIProvider`, a rule-based responder with no external calls at all
(`web/src/lib/ai/demo-provider.ts`). Connecting a real provider later
means writing **one new class** implementing the same `AIProvider`
interface (`respond()`); the widget and server action never need to
change.

### Provider comparison

| Provider | Notes |
|---|---|
| **Anthropic (Claude API)** | Pay-as-you-go API; would need a paid account and an API key stored as an environment variable, never committed (see `web/src/lib/env.ts`'s pattern). Strong instruction-following, useful for keeping the refusal rules in `AI_SAFETY_RULES.md` reliable. |
| **OpenAI (GPT API)** | Pay-as-you-go API; same credential-handling requirements as above. |
| **Azure OpenAI** | Same underlying models as OpenAI, via a Microsoft Azure subscription — may suit a business already using Microsoft/Azure services, at broadly similar cost. |
| **Self-hosted open-weight model** (e.g. via Ollama) | No per-token cost and no data leaves the business's own infrastructure, but needs a server capable of running it and ongoing maintenance — likely disproportionate for a single agency's enquiry volume. |

None of these have been evaluated for pricing or contract terms, because
there is no confirmed decision to connect a real AI provider at all —
today's rule-based `DemoAIProvider` was deliberately built to need none
of them (see `AI_SAFETY_RULES.md`'s explanation of why this is a safety
choice, not just a cost-saving one).

### What connecting any of these would require

- **Required agreement:** a billed account with the chosen provider, in
  the business's name.
- **Credential requirements:** an API key, stored only as an environment
  variable, never committed to the repository (CLAUDE.md Rule 4).
- **A rebuild of the safety guarantees, not just the plumbing.** Today's
  prompt-injection resistance (`AI_SAFETY_RULES.md`) is structural,
  because a rule-based responder has no system prompt to leak and a
  fixed, enumerable set of possible replies. A real language model can
  generate novel text, so the same guarantees would need to be rebuilt
  as: a carefully designed system prompt, output-side checks re-using
  the same refusal list, and much more extensive adversarial testing
  before the assistant could be trusted with public traffic again.
- **Cost monitoring:** unlike every other integration on this page, a
  per-token API has a cost that scales with usage in a way that is
  harder to predict in advance than a flat subscription — the owner
  should set a spending cap or alert with whichever provider is chosen.
- **Data-sharing consideration:** every question a visitor asks the
  assistant would be sent to the chosen provider's servers. This needs
  disclosing in the Privacy Policy and considering against
  `PRIVACY_DATA_MAP.md` before going live.

### Unresolved questions for the owner

1. Is connecting a real AI provider wanted at all, given the
   demonstration assistant already covers the FAQ/property-search use
   case safely and at no cost?
2. If so, which provider, and what monthly spending cap should be set?
3. Should visitor questions sent to a real AI provider be disclosed in
   the Privacy Policy as a distinct data-sharing category? (Almost
   certainly yes — flagged here for the professional review this
   project cannot itself perform.)

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
7. **(Added Day 5)** Whether a real AI provider is wanted at all for the
   assistant, and if so which one and at what spending cap — see the AI
   assistant section above and `AI_SAFETY_RULES.md`. The current
   rule-based assistant needs none of this and is the safer default
   until a real need is confirmed.
