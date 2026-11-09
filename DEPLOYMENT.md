# DEPLOYMENT.md — Times Estates (Times Estate Ltd)

## Current state (2026-10-31) — read first

Nothing in this document has been carried out. Before any step:
1. ~~The owner approves the Next.js update~~ — **done 2026-11-09**
   (approved by the owner; upgraded to 16.4.5).
2. A database and a staff sign-in service are chosen and approved
   (§1, §11).
3. The checks in `TEST_REPORT.md` (Day 7 Task 4) are re-run on the
   real host.
4. The owner writes exactly: **"I approve production deployment."**

**Environment settings at deployment** (`.env.example`):
`NEXT_PUBLIC_SITE_URL` = the real domain (required — otherwise search
and sharing data point to localhost); `ADMIN_SESSION_SECRET` = at least
32 random characters; `NEXT_PUBLIC_SHOW_CONTENT_NOTES` **unset** on the
public site. The critical server-hang blocker described below has
been **fixed** (Day 7).


## Day 7 deployment and rollback runbook (2026-10-31) — PREPARED, NOT EXECUTED

**Nothing in this section has been done.** No hosting account, domain
change, DNS change, database, email service or paid service exists.
Every step waits for the owner's separate written instruction:
**"I approve production deployment."** The sections further down (§1–13)
are the earlier detailed plans; this runbook is the current, ordered
version and takes precedence where they differ.

### R1. Production environment checklist

| # | Item | Required state before go-live |
|---|---|---|
| 1 | Next.js | 16.4.3 or later (owner approval needed), full test suite re-run after the update |
| 2 | Host | Always-on Node host chosen and paid for by the owner (§1 options) |
| 3 | Database | Chosen, created, migrated (R5), backups switched on (R6) |
| 4 | Staff sign-in | Real sign-in service with two-step verification; development sign-in confirmed off |
| 5 | Email | Provider chosen; recipients and reply-to addresses approved; domain authentication (SPF, DKIM, DMARC) set |
| 6 | File storage | Private storage with malware scanning, or repair photos remain "checked, not kept" |
| 7 | Settings | All "required" variables in R2 set on the host; none committed to git |
| 8 | Content | Fees, VAT position and verified memberships published; internal notes hidden (automatic on a production build) |
| 9 | Legal | Solicitor-approved privacy, cookie, terms, complaints and fee pages |
| 10 | Monitoring | Uptime check and error alerts active (R8, R9) |

### R2. Environment-variable list (names only — never values in git)

| Variable | Needed at launch? | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Real domain, e.g. `https://www.timesestates.co.uk`. Without it, canonical links, sitemap and sharing data point to localhost |
| `ADMIN_SESSION_SECRET` | **Yes** | At least 32 random characters, generated on the host |
| `NODE_ENV` | Set by host | `production` |
| `NEXT_PUBLIC_SHOW_CONTENT_NOTES` | **Must be unset** on the public site | Only `true` on a private staging copy |
| `DATABASE_URL` | **Yes**, once the database is wired in | From the database provider |
| `AUTH_SECRET`, `AUTH_URL` | **Yes**, once real sign-in is wired in | From the sign-in provider |
| `EMAIL_FROM_ADDRESS`, `EMAIL_PROVIDER_API_KEY` | When email is approved | — |
| `FILE_STORAGE_*` | When storage is approved | — |
| `CRM_API_URL`, `CRM_API_KEY`, `PROPERTY_FEED_API_KEY` | When a feed is approved | — |
| `AI_PROVIDER_API_KEY` | Optional | Demonstration mode needs none |
| `ANALYTICS_ID` | Optional | Only with a cookie-consent banner |
| `MONITORING_DSN` | Recommended | Error monitoring |

### R3. Hosting instructions

1. Owner chooses the host (§1) and creates the account in the business's
   name, with two-step verification on the account.
2. Connect the host to the GitHub repository; set the root directory to
   `web/`, build command `npm run build`, start command `npm start`,
   Node 20 or later.
3. Enter the R2 variables in the host's settings screen (never in code).
4. Deploy first to a **private preview address**; run R11 there.
5. Only after R11 passes and the owner approves, attach the real domain
   (R4).

### R4. Domain and DNS instructions

1. Confirm who controls `timesestates.co.uk` (registrar login, renewal
   date) — currently unconfirmed.
2. **Before changing anything, export and save the current DNS records**
   (§4). Keep the existing email (MX) records exactly as they are.
3. Lower the time-to-live on the website records to 5 minutes a day
   before the switch, so a rollback takes effect quickly.
4. Point the website records (`www` and the bare domain) to the host as
   the host instructs; choose one as the main address and redirect the
   other (§5).
5. Wait for the host to issue the security certificate (automatic).
6. Apply the old-site redirects in `SEO_REDIRECT_PLAN.md`.
7. Add SPF, DKIM and DMARC records for the email service
   (`EMAIL_AND_FORM_ROUTING.md`) — without touching existing MX records.

### R5. Database migration procedure

There is no database yet, so there is nothing to migrate from. When one
is approved:

1. The developer creates the tables from the data model
   (`DATA_MODEL.md`) using a migration tool, so every change is a
   numbered, reversible script kept in git.
2. Run migrations on a **staging** database first, then run the full
   test suite against it.
3. Before any later migration on the live database: take a backup (R6),
   confirm it restores (R7), run the migration, run R11. If anything
   fails, restore the backup and roll back the code (R10).
4. Real listings enter only through the approved CRM feed or the admin
   approval workflow — never by bulk import of unverified data.

### R6. Backup procedure

- **Database:** automatic daily backups by the provider, kept at least
  30 days, plus a manual backup before every migration or major release.
  Stored separately from the website host.
- **Code:** every version is in GitHub (already the case). Tag each
  release (e.g. `release-2026-11-15`).
- **Settings:** the owner keeps a private, offline record of which
  services and accounts exist (not the secrets themselves).
- **DNS:** the exported record set from R4 step 2.

### R7. Restoration test

Before launch, and then every quarter:
1. Restore the latest database backup into a separate, temporary
   database.
2. Point a private preview copy of the site at it.
3. Check: leads list loads, a known lead opens, properties show,
   the audit log is intact.
4. Record the date, how long it took, and the result in `TEST_REPORT.md`.
5. Delete the temporary copy.

### R8. Monitoring configuration

| What | How | Alert goes to |
|---|---|---|
| Site up | External uptime check every 5 minutes on `/` and `/contact` | Owner and developer, by email and text |
| Forms working | Daily automated test submission marked as a test (filtered out of leads) — or a weekly manual check | Developer |
| Errors | Error-monitoring service (`MONITORING_DSN`) | Developer |
| Certificate | Host's automatic renewal; uptime check alerts on expiry | Developer |
| Security updates | Monthly `npm audit`; GitHub security alerts on | Developer |

### R9. Error-alert procedure

1. Alert arrives → developer acknowledges within 1 working hour (owner
   to confirm this target).
2. Check whether the site is down for everyone (uptime check, phone on
   mobile data).
3. If a recent release caused it → roll back (R10) first, investigate
   second.
4. If customer data may be affected → follow `OPERATIONS_MANUAL.md` §14
   (security incident; 72-hour ICO decision).
5. Record what happened and what was done in `CHANGELOG.md`.

### R10. Rollback procedure

| Problem | Rollback | Time |
|---|---|---|
| New release broken | On the host, redeploy the previous release (every deploy is kept) — or revert the commit in git and redeploy | Minutes |
| Database change broke data | Restore the pre-migration backup (R6), then roll back the code | Under an hour |
| DNS switch went wrong | Re-enter the saved DNS records (R4 step 2); short time-to-live means minutes | Minutes to an hour |
| Whole new site unusable | Point DNS back to the old site's host (records saved in R4) | Minutes to an hour |

After any rollback, run R11 and record it.

### R11. Post-deployment verification

Run within an hour of going live, on the real domain:

1. Every page in the sitemap opens (link check).
2. Each form submitted once with clearly marked test details; each lead
   appears in admin; the email alert arrives at the approved address;
   test leads then deleted.
3. Staff sign-in works with two-step verification; each role sees only
   what it should; the development sign-in is unavailable.
4. Security headers present; no internal notes visible; `robots.txt` and
   `sitemap.xml` show the real domain.
5. Google Rich Results Test and Lighthouse on the live address.
6. Phone and desktop spot check.
7. Old-site redirects work for the top addresses in
   `SEO_REDIRECT_PLAN.md`.
8. Uptime and error alerts receive a test alert.

### R12. Maintenance schedule

See `OPERATIONS_MANUAL.md` §15: daily lead checks; weekly overdue-lead and
audit-log review; monthly security updates, test-suite run and staff
account review; quarterly restoration test; yearly renewal of
membership and insurance details.

---

## Status of this document

**Phase 7 deliverable (2026-09-09) — prepared, nothing executed.** No
hosting account, domain change, database, or monitoring service has
been created or connected. Per `CLAUDE.md` Rule 6, nothing here may be
carried out until the business owner gives the exact written approval
requested in `FINAL_LAUNCH_APPROVAL.md` — no earlier approval,
including approval of this document, counts as that.

**This remains blocked regardless of approval:** the critical server-
hang defect (`QA_REPORT.md` §1/§9, `TEST_REPORT.md` §5) is confirmed
still present as of Phase 6, reproduced via a genuine click. **Nothing
in this document should be executed while that defect is unresolved.**

---

## 1. Deployment target and costs

**Architectural constraint that shapes this choice:** the site has **no
persistent database** — every property, lead, and audit-log record is
an in-memory JavaScript array (`DATA_MODEL.md`). This has a real
consequence for hosting choice, not just for backups:

- **Classic serverless hosting (Vercel's default model, Netlify
  Functions)** spins up a fresh function instance per request, with no
  guaranteed shared memory between invocations. On this architecture,
  a lead submitted through one instance may simply not be visible from
  the admin panel served by a different instance — not just "lost on
  restart," but potentially **unreliable within the same minute**.
  Vercel is still the natural, zero-config fit for this exact Next.js/
  Turbopack stack, and would work correctly for a static/mostly-
  read-only site — but not safely for lead capture as this app is
  built today.
- **An always-on process host** (a persistent Node server: a VPS,
  Railway, Render, Fly.io, or Vercel's newer long-running-function
  tier if available on the chosen plan) keeps one process alive
  continuously, so the in-memory store behaves consistently — but
  **still loses everything on any restart, crash, or redeploy**,
  including a recurrence of the critical hang defect being killed and
  restarted.

**Recommendation (decision, not action — needs the owner's approval
under Rule 4, it's a paid service): deploy to an always-on host, and
treat connecting a real, persistent database as a prerequisite to
launch, not a nice-to-have** — it fixes both the hosting-architecture
risk above and the data-loss risk in §11.

| Option | Indicative cost (verify current pricing before deciding) | Fit |
|---|---|---|
| **Vercel (Pro)** | ~£17–20/month per member | Best DX for this stack; safe only once a real database replaces in-memory storage |
| **Railway** | Usage-based, typically £5–15/month for a small always-on app | Always-on process, simple deploy from Git, good fit today even before a database exists |
| **Render** | Free tier exists (sleeps when idle — unsuitable for a live business site) then ~£7+/month for an always-on instance | Similar fit to Railway |
| **A small VPS** (Hetzner, DigitalOcean) | ~£4–10/month | Cheapest always-on option; more manual setup (reverse proxy, process manager, OS updates) — appropriate only if someone is comfortable maintaining a server |

**One-off costs:** a domain (if `timesestates.co.uk` isn't already
owned/renewed — status unconfirmed, see §3), nothing else — SSL is
free and automatic on every option above.

**Not decided today** — this table is a comparison for the owner to
choose from, not a decision made on their behalf.

## 2. Production build and environment-variable checklist (no secrets)

| Item | Status |
|---|---|
| Successful production build | ✅ Confirmed (`QA_REPORT.md` §2) |
| No unresolved critical/major defects | ❌ **Not met** — critical hang defect open |
| Environment variables set for production | ❌ Not started — see table below |
| Real, persistent database connected | ✅ Connected 2026-11-09 (Supabase, Ireland/eu-west-1): tables created with row-level security; enquiry saved and read back. Restore test and test-record clean-up still to do (§11) — see §11 |
| Real authentication for `/admin` | ❌ Still a development-only mock |
| Domain owned and DNS access confirmed | ❌ Unconfirmed — see §3 |
| Email provider chosen and configured | ❌ Not started — see `EMAIL_AND_FORM_ROUTING.md` |
| Analytics/consent decision made | ❌ Not decided — see §6 |
| Monitoring configured | ❌ Not started — see §9 |
| Legal pages professionally reviewed | ❌ Not done |
| Rollback procedure | ✅ Prepared, not yet tested against a real deployment — see §12 |

**Environment variables** (names only, from `.env.example` — no value
below is a real secret):

| Variable | Set for production when |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Always — set to `https://timesestates.co.uk` (or the approved final host name, see §5) the moment a real domain is live; every canonical URL, the sitemap, and structured data derive from this |
| `NODE_ENV` | Set automatically by the host — never set manually |
| `DATABASE_URL` | Once a real database is chosen and connected (§11) |
| `AUTH_SECRET`, `AUTH_URL` | Once real `/admin` authentication replaces the mock |
| `EMAIL_FROM_ADDRESS`, `EMAIL_PROVIDER_API_KEY` | Once an email-sending provider is approved (`EMAIL_AND_FORM_ROUTING.md`) |
| `CRM_API_URL`, `CRM_API_KEY`, `PROPERTY_FEED_API_KEY` | Only if/when a CRM or property feed is approved |
| `AI_PROVIDER_API_KEY` | Only if a real AI provider replaces the demo assistant |
| `CAPTCHA_SITE_KEY`, `CAPTCHA_SECRET_KEY` | Only if bot protection beyond the existing honeypot/rate-limit is approved |
| `ANALYTICS_ID` | Once an analytics tool is approved (§6) |
| `MONITORING_DSN` | Once error monitoring is approved (§9) |
| `DEPLOYMENT_PROJECT_ID`, `DEPLOYMENT_API_TOKEN` | Once a hosting provider is chosen (§1) |

## 3. Domain and DNS change plan (timesestates.co.uk)

**Cannot be made concrete yet — a real gap, not an oversight.**
`CONTENT_VERIFICATION_REGISTER.md` item 11 records that
`timesestates.co.uk` has never been independently verified as owned
by, or under the control of, Times Estate Ltd — no WHOIS/registrar
lookup has been performed, and this project has no access to the
domain's DNS control panel. **Before any DNS record can actually be
planned with real values, the owner needs to confirm which registrar
holds the domain and provide (or personally action) access to its DNS
zone.**

**The generic process, ready to execute once that access exists:**

1. Export/screenshot the domain's **current, live DNS records first**
   (§4 — this is the rollback baseline) before changing anything.
2. Add the hosting provider's required records exactly as that
   provider's own setup screen specifies at the time (typically an
   `A`/`ALIAS`/`ANAME` record for the root domain and a `CNAME` for
   `www` — exact values are provider-specific and shouldn't be
   guessed from a document like this one).
3. Set a **low TTL** (e.g. 300 seconds) on the records being changed,
   24–48 hours before the change, so a rollback (§4) can propagate
   quickly if needed — then raise the TTL back to normal once the
   change is confirmed stable.
4. Update `NEXT_PUBLIC_SITE_URL` and redeploy.
5. Leave the existing email-related DNS records (if `timesestates.co.uk`
   already sends/receives any mail today) untouched unless the
   `EMAIL_AND_FORM_ROUTING.md` plan is being actioned in the same
   change window — don't let a website DNS change accidentally break
   existing email.

## 4. DNS backup and rollback plan

1. **Before any change:** capture every existing record (type, name,
   value, TTL) for the domain — a screenshot or export from the
   registrar's own panel is sufficient; keep it outside this
   repository (it may reveal other services in use).
2. **To roll back:** re-enter the captured records exactly as they
   were. If the low-TTL step in §3.3 was followed, this propagates
   within minutes rather than up to 24–48 hours.
3. **If email was already flowing through this domain before any
   change**, verify mail delivery specifically after any rollback —
   DNS rollbacks that focus only on "is the website back" can miss a
   broken MX record.

## 5. Hosting, SSL, redirects, and canonical-host plan

- **SSL/HTTPS:** every option in §1 provisions and renews HTTPS
  certificates automatically — no manual certificate management
  needed. The existing `Strict-Transport-Security` header
  (`SECURITY.md`) only takes effect once HTTPS is actually live.
- **Canonical host decision (needs the owner's input, not assumed):**
  `https://timesestates.co.uk` (no `www`) is recommended as the
  canonical form, matching the domain as given throughout this
  project's records — but this is a preference, not a technical
  requirement.
- **Redirects required:**
  - `http://` → `https://` (automatic on every host in §1)
  - `www.timesestates.co.uk` → `timesestates.co.uk` (or the reverse, if
    the owner prefers `www` as canonical) — a single redirect rule at
    the host or DNS level, not application code
  - Confirm no stray redirect loops before going live (test both host
    variants resolve to exactly one final URL)

## 6. Analytics and cookie-consent configuration (not connected)

**Current state, confirmed in Phase 6: no analytics or tracking script
exists anywhere in the codebase**, and `/cookie-policy` correctly
states there is "nothing to consent to yet." This is compliant by
absence, not a gap to rush to fill.

**If analytics is wanted, options compared (none chosen, none
connected — a Rule 4 decision):**

| Option | Cookie/consent implication | Cost |
|---|---|---|
| **Plausible / Fathom** (cookieless, privacy-first) | No cookie banner legally required for this class of tool under current UK guidance (no personal-data cookie is set) — lowest-friction option | ~£7–14/month |
| **Google Analytics 4** | Sets cookies / uses device storage — requires an actual, functioning consent banner before it fires, not just a policy page saying one exists | Free, but requires building real consent-gating first |
| **Server-side/no analytics for now** | No consent mechanism needed | Free |

**Recommendation:** if analytics is wanted at launch, a cookieless
option avoids needing to build and test a real consent-management
system before launch — a genuine scope saving. **Whichever is chosen,
the actual consent banner (if one becomes necessary) must be built and
tested before the analytics script is ever loaded**, not after.

## 7. CMS/property-data roles and editing process

Unchanged from `ADMIN_AND_CMS.md`/`OPERATIONS_MANUAL.md` (five roles:
Administrator, Manager, Property Editor, Content Editor, Enquiry
Viewer — full detail in `TECHNICAL_HANDOVER.md` and
`OPERATIONS_MANUAL.md`). **Blocking gap, not new:** the admin area's
login is still a development-only mock with no password — it must not
be reachable by the public internet until real authentication replaces
it, regardless of any other launch decision.

## 8. Final form-to-mailbox routing matrix

See `EMAIL_AND_FORM_ROUTING.md` §2 (updated this phase) for the
complete table mapping every lead category to its destination mailbox/
alias. No form currently sends anywhere real (§11 of that document) —
this routing only takes effect once an email provider is connected.

## 9. Monitoring, logging, uptime, and error-reporting plan

Nothing connected today. Proposed, not actioned:

| Layer | Proposed tool (comparison only) | Why |
|---|---|---|
| Uptime | UptimeRobot (free tier) or the hosting provider's own health check | A free, immediate baseline — pings the site every few minutes, alerts if it stops responding |
| Error tracking | Sentry (generous free tier) | Captures real server/client errors with stack traces — **specifically valuable for catching a recurrence of the critical hang defect's pattern before a visitor reports it**, once the app can emit a signal before fully locking up |
| Server resource alerting | The chosen host's own CPU/memory dashboard/alerting (Railway, Render, and most VPS panels include this) | Given the hang defect is CPU-bound and its CPU time climbs measurably (`QA_REPORT.md` §9), a CPU-spike alert is a genuinely relevant early-warning signal for this specific known issue, not generic advice |
| Logs | The chosen host's built-in log viewer, to start | No need for a separate log-aggregation service at this size |

**Alert routing:** to a named person (the owner needs to confirm who)
with an agreed response expectation — not defined yet, since nothing
is connected to alert from.

## 10. Backup and disaster-recovery process

**The honest current state: there is nothing to back up, and that is
itself the disaster-recovery risk, not a gap in the backup plan.**
Every lead, every property record, and the entire audit log live only
in server memory. **Any of the following currently causes total,
silent, unrecoverable data loss:** a server restart, a redeploy, a
crash, or — critically — a recurrence of the hang defect being killed
and restarted, which is the one recovery action currently available
for that defect. A prospective seller's valuation request submitted
five minutes before a hang-triggered restart is gone, with no error
shown to anyone, no trace, no way to know it ever arrived.

**This is why §11 (a real database) is listed as a launch prerequisite,
not an enhancement.** Once one exists:

1. Enable the database provider's automated daily backups, minimum 7
   days' retention (adjust once the owner confirms a retention policy —
   `PRIVACY_DATA_MAP.md`).
2. Test a real restore to a separate, non-production instance
   quarterly — never test a restore against the live database.
3. Document the exact restore command/console steps for whichever
   provider is chosen, at that time.

## 11. Real database — launch prerequisite, not originally in this phase's list, added because §1 and §10 both depend on it

**Status 2026-11-09: connected on this computer** (Supabase project in Ireland, eu-west-1; see the steps below for what remains).

- **Owner decision:** Supabase, Pro plan (about £20 a
  month; confirm the price at sign-up). See `DECISIONS.md`.
- **Built and tested:** enquiries, property records and the activity
  log are stored in PostgreSQL. Tables are created automatically on
  first connection (`web/src/lib/db/schema.ts`), with row-level
  security on, so Supabase's public API can read nothing. A test proves
  data survives a restart. Until `DATABASE_URL` is set, the site uses
  a local PostgreSQL saved in `web/.data/` (this computer only).

### Owner's steps to connect Supabase (about 15 minutes)

1. Sign up at supabase.com with the business email, and create a
   project. (The project was created in **Ireland, eu-west-1**, and the
   owner chose on 2026-11-09 to keep it there; see DECISIONS.md.) Choose a strong database
   password and keep it in a password manager.
2. Upgrade the project to the **Pro** plan. It gives daily backups,
   and the free plan pauses after a week without visitors.
3. In the dashboard, accept Supabase's **Data Processing Agreement**
   (UK GDPR) and keep a copy.
4. Project → **Connect** → copy the **"Transaction pooler"** connection
   string (port 6543) and put your database password into it.
5. Paste it as `DATABASE_URL=…` into the file `web/.env` on this
   computer. **Do not paste it into chat, email or GitHub.** On the
   live site it goes in the hosting provider's environment settings.
6. Tell the developer "Supabase is connected". They then start the
   site, which creates the tables; check the tables show "RLS enabled"
   in Supabase; run the full checks against it; and test a backup
   restore into a separate project (R6/R7) before any launch.

**Remaining before launch:** steps 1–6, and a decision on when real
listings replace the samples (then set `SEED_DEMO_PROPERTIES=false`).

## 12. Rollback procedure

1. Every deployment is tied to a specific Git commit (automatic on
   every host in §1).
2. **To roll back:** use the hosting provider's own rollback/redeploy-
   previous-version feature — never `git revert` and push under time
   pressure, which risks compounding an incident.
3. If a real database exists by the time of rollback, confirm the
   rollback target's code is compatible with the *current* data shape
   before rolling back code alone.
4. Announce the rollback and its reason internally; publicly only if
   the incident was publicly visible.
5. **Specific to the hang defect, until it's fixed:** if it recurs in
   production, the immediate action is restarting the process (via the
   host's own restart control), not a code rollback — the defect
   exists in the current and (per Day 7's investigation) likely
   several recent framework versions, so rolling back a commit alone
   would not necessarily remove it unless the rollback target predates
   whichever change actually introduced it, which has not been
   identified.

## 13. Pre-launch and post-launch test plan

See `TECHNICAL_HANDOVER.md` §5 for the full, explicit checklist to run
immediately before and after any real deployment — it mirrors
`QA_REPORT.md`'s methodology but against the live URL, not `localhost`.

## Before this can be approved

Every ❌ in §2's checklist needs to become ✅ or be an explicitly
accepted, owner-approved limitation — **and the critical defect in
`TEST_REPORT.md` §5 / `QA_REPORT.md` §9 must be fixed and re-tested —
before Rule 6's exact approval phrase should be requested or acted
upon.** See `FINAL_LAUNCH_APPROVAL.md` for the consolidated request and
recommendation.
