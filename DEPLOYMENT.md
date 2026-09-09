# DEPLOYMENT.md — Times Estates (Times Estate Ltd)

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
| Real, persistent database connected | ❌ Not started — see §1, §11 |
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

Not part of Phase 7's own checklist, but both the hosting-architecture
finding (§1) and the disaster-recovery finding (§10) independently
point to the same prerequisite, so it's recorded here rather than left
implicit. `INTEGRATIONS.md` already compares database options; none
chosen. Migrating the existing `PropertyProvider` and lead-store
interfaces to a real database requires no page or component changes,
by design — only the implementation behind those interfaces changes.

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
