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

## Summary: what needs the owner's decision before Day 5

1. Email/notification provider (most urgent — blocks every enquiry
   journey from actually reaching staff).
2. Whether a CMS is wanted, or whether code-based content (today's
   approach) is acceptable for longer.
3. Database provider, once a CMS/data-storage decision is made.
4. Hosting provider, ahead of any real deployment.
