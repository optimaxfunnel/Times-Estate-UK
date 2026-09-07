# DEPLOYMENT.md — Times Estate Ltd

## Status of this document

**Everything below is prepared, not executed.** No hosting account,
domain, database, or monitoring service has been created or connected.
Per CLAUDE.md Rule 6, nothing here may be carried out until the
business owner states exactly: **"I approve production deployment."**
No earlier approval, including approval of this document, counts as
that statement.

**As of the Day 7 test report, deployment must not proceed regardless
of approval, because of the unresolved critical defect in
`TEST_REPORT.md` §5** (certain form submissions can make the server
stop responding to every visitor). This document is prepared in
advance so that once that defect is fixed and approval is given,
deployment can happen quickly and correctly — not so it can happen now.

## 1. Production environment checklist

Confirm each of these before deployment is approved:

| Item | Status | Where recorded |
|---|---|---|
| Successful production build | ✅ Confirmed today | `TEST_REPORT.md` §6 |
| Test report reviewed, no unresolved critical defects | ❌ **Not met** — one critical defect open | `TEST_REPORT.md` §5 |
| Environment variables set for production | ❌ Not started | §2 below |
| Form recipients approved | ❌ Missing | `INTEGRATIONS.md`, `AUTOMATION_WORKFLOWS.md` |
| Reply-to addresses approved | ❌ Missing | Same |
| CRM settings confirmed | ❌ Unconfirmed whether a CRM exists | `INTEGRATIONS.md` |
| Property-feed authority confirmed | ❌ Unconfirmed | `INTEGRATIONS.md`, `SITEMAP.md` |
| AI provider decision made | ❌ Not decided (demo mode is the safe default) | `INTEGRATIONS.md`, `AI_SAFETY_RULES.md` |
| Analytics decision made | ❌ Not decided (none connected today) | `INTEGRATIONS.md` |
| Cookie consent mechanism | ✅ Not needed today (no non-essential cookies exist); ❌ must be built before any analytics/tracking is added | `SEO_PLAN.md`, `/cookie-policy` |
| Legal pages drafted | ✅ Drafted | `/privacy-policy`, `/cookie-policy`, `/terms`, `/complaints`, `/fees` |
| Professional legal review of those pages | ❌ Not done | `REGULATORY_READINESS.md` |
| Backups | ❌ Not applicable yet — no persistent database exists | §5 below |
| Domain | ❌ Not registered | §3 below |
| DNS | ❌ Not configured | §3 below |
| Monitoring | ❌ Not configured | §7 below |
| Rollback procedure | ✅ Prepared (not tested against a real deployment) | §9 below |
| Real authentication | ❌ Still a development-only mock | `ADMIN_AND_CMS.md`, `SECURITY.md` |
| Real, persistent database | ❌ Still in-memory only | `PRIVACY_DATA_MAP.md`, `DATA_MODEL.md` |

**Summary: this checklist has more ❌ than ✅. Deployment is not ready.**

## 2. Environment-variable list

Full placeholder list in `.env.example`. What each needs before
production:

| Variable | Production requirement |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The real domain, e.g. `https://www.timesestateltd.co.uk` — currently defaults to `http://localhost:3000`, which is baked into every canonical URL, the sitemap, and structured data. |
| `NODE_ENV` | `production` (set automatically by the hosting platform's build process — do not set manually). |
| `DATABASE_URL` | Only once a real database is chosen (`INTEGRATIONS.md`) — not needed today because there is no persistent store. |
| `AUTH_SECRET`, `AUTH_URL` | Only once real authentication is chosen — required before `/admin` can go live. |
| `EMAIL_FROM_ADDRESS`, `EMAIL_PROVIDER_API_KEY` | Only once an email provider and sender address are approved. |
| `CRM_API_URL`, `CRM_API_KEY`, `PROPERTY_FEED_API_KEY` | Only if/when a CRM or property feed is confirmed and approved. |
| `AI_PROVIDER_API_KEY` | Only if a real AI provider is approved — the demo assistant needs none of this. |
| `CAPTCHA_SITE_KEY`, `CAPTCHA_SECRET_KEY` | Only if bot protection beyond the existing honeypot/rate-limiting is approved. |
| `ANALYTICS_ID`, `MONITORING_DSN` | Only once those services are chosen and approved. |
| `DEPLOYMENT_PROJECT_ID`, `DEPLOYMENT_API_TOKEN` | Only once a hosting provider is chosen. |

**No real value for any of these exists anywhere in this repository
today** — confirmed by today's secret scan (`TEST_REPORT.md` §6).

## 3. Hosting instructions (prepared, not executed)

`INTEGRATIONS.md` compares Vercel (simplest path for this exact stack)
against self-hosting. Once a provider is approved:

1. Create the hosting project under the **business owner's own
   account**, never a personal or contractor account.
2. Connect it to this Git repository.
3. Set every environment variable from §2 that applies to what's
   actually been approved — nothing else.
4. Set the build command (`npm run build`) and start command
   (`npm run start`) if not auto-detected.
5. Do **not** trigger a deployment until Rule 6's exact approval phrase
   has been given for **this specific deployment**.

## 4. Domain and DNS instructions (prepared, not executed)

A domain name is currently Missing (`BUSINESS_REQUIREMENTS.md`). Once
one is registered by the owner:

1. Point the domain's DNS at the hosting provider exactly as that
   provider instructs (typically an `A`/`ALIAS` record for the root
   domain and a `CNAME` for `www`).
2. Set `NEXT_PUBLIC_SITE_URL` to the real domain and redeploy — this
   corrects every canonical URL, sitemap entry, and structured-data
   `url` field, which today all default to `localhost`.
3. Confirm HTTPS is issued and enforced (most hosting providers handle
   this automatically) — the `Strict-Transport-Security` header
   already built (`SECURITY.md`) only takes effect once this is true.
4. Re-run `SEO_PLAN.md`'s recommended live checks (Google's Rich
   Results Test, the schema.org validator) against the real domain —
   these could not be run against `localhost`.

## 5. Database migration procedure (prepared, not executed)

**Not applicable today** — there is no database; every data store
(leads, properties, audit log) is an in-memory array, explicitly
documented as such since Day 4/5. Once a real database is chosen:

1. Write a migration creating tables/collections matching
   `DATA_MODEL.md`'s field list (mandatory/optional, public/private).
2. Migrate the `PropertyProvider` and lead-store implementations to
   the real database, behind their existing interfaces — no page or
   component needs to change, by design (`INTEGRATIONS.md`).
3. Never migrate the current demo/sample data into production as if
   real — it must be deleted, not imported (CLAUDE.md Rule 2).

## 6. Backup procedure (prepared, not executed)

**Not applicable today** — nothing persistent exists to back up. Once
a real database exists:

1. Enable the hosting/database provider's automated daily backups.
2. Store at least 7 days of point-in-time backups (adjust once the
   owner confirms a retention policy — see `PRIVACY_DATA_MAP.md`).
3. Document the exact restore command/console steps for the chosen
   provider here, once chosen.

## 7. Restoration test (prepared, not executed)

Once backups exist: restore a backup to a **separate, non-production**
database instance and confirm the data matches, on a recurring
schedule (e.g. quarterly) — never test a restore against the live
production database.

## 8. Monitoring configuration (prepared, not executed)

`INTEGRATIONS.md` recommends Sentry (or similar) for error tracking.
Once approved:

1. Add the provider's SDK and `MONITORING_DSN`.
2. Configure alerting for: server errors, elevated response times, and
   — **specifically because of today's critical defect** — CPU usage
   and request-queue depth, so a future recurrence of the §5 hang is
   caught automatically rather than discovered by visitors.
3. Add uptime monitoring (a simple external ping check) as a first,
   free, no-account-needed baseline even before a full APM tool is
   approved.

## 9. Error-alert procedure (prepared, not executed)

Once monitoring exists: alerts route to a named person (the owner must
confirm who), with a defined response-time expectation for a site-down
alert versus a minor error — not defined yet, since no monitoring
exists to alert from.

## 10. Rollback procedure (prepared, not tested against a real deployment)

1. Every deployment should be tied to a specific Git commit (most
   hosting providers do this automatically).
2. To roll back: redeploy the previous known-good commit through the
   hosting provider's own rollback/redeploy feature — do **not**
   `git revert` and push under time pressure, which risks compounding
   the incident.
3. If the database has since changed shape, confirm the rollback
   target's code is compatible with the *current* data before rolling
   back code alone — not a concern today (no database exists), but
   will be once one does.
4. Announce the rollback and its reason internally — not to the public
   unless the incident was publicly visible.

## 11. Post-deployment verification (prepared, not executed)

Immediately after any future deployment:

1. Re-run the full check suite from `TEST_REPORT.md` §6 against the
   live URL, not just the pre-deployment build.
2. Manually load the home page, a search page, a property detail page,
   and submit one real test enquiry end-to-end.
3. Confirm HTTPS, the security headers, and `robots.txt`/`sitemap.xml`
   are being served correctly from the real domain.
4. Watch monitoring closely for the first hour, specifically for any
   sign of the §5 hang recurring under real traffic.

## 12. Maintenance schedule (prepared, not executed)

- **Weekly:** review any new enquiries/leads if not yet routed to a
  real CRM; check for failed notifications.
- **Monthly:** `npm audit` and dependency updates; review error/uptime
  monitoring trends.
- **Quarterly:** restoration test (§7); re-run the full accessibility
  and security checklists, not just trust that nothing changed.
- **As needed:** update content per `CONTENT_VERIFICATION_REGISTER.md`
  as new facts are confirmed by the owner.

## Before this can be approved

Every ❌ in §1's checklist needs to become ✅ or be explicitly accepted
as a documented, owner-approved limitation — and **the critical defect
in `TEST_REPORT.md` §5 must be fixed and re-tested** — before Rule 6's
exact approval phrase should be requested or acted upon.
