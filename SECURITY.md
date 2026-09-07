# SECURITY.md — Times Estate Ltd

## Status of this document

**Confirmed as an accurate description of what today's code actually
does.** Every control below is either already built (with a file
reference) or explicitly flagged as not yet built, never assumed. See
`TEST_REPORT.md` for the commands run to verify each claim.

## Server-side validation

Every form submission is validated server-side with Zod schemas
(`web/src/lib/leads/lead-schema.ts`, `repair-actions.ts`,
`alert-schema.ts`) — never trusting client-side validation alone, which
a visitor can always bypass. Confirmed by re-reading every server
action today: none skips validation, and none trusts a client-supplied
value (e.g. a role, a permission, a price) without an independent
server-side check.

## Content sanitisation

`web/src/lib/security/sanitize.ts` strips HTML tags and control
characters from every text field before it's stored or displayed —
built and tested Day 5, unchanged today, re-confirmed passing
(`sanitize.test.ts`).

## Rate limiting

`web/src/lib/security/rate-limit.ts` — 5 submissions per form per
visitor per minute, in-memory. **Known limitation, stated plainly:**
this only works within a single server process; a real multi-instance
deployment needs a shared store (e.g. Redis) — already documented in
the file itself since Day 5, still accurate today.

## Authentication

**Still a mock, still not real — the single most important item in
this document.** `web/src/lib/auth/session.ts` reads an unsigned,
plain cookie with no password, no verification, and no session expiry,
explicitly labelled as such in the code and in `ADMIN_AND_CMS.md`. This
**must** be replaced with a real provider (Auth.js, Clerk, or similar —
compared in `INTEGRATIONS.md`) before `/admin` is ever reachable by
anyone outside this development environment. Nothing done today changes
this; it is repeated here because Task 6 explicitly asks for it.

**MFA capability:** not applicable to today's mock session — this
becomes a real question only once a real authentication provider is
chosen. Both providers compared in `INTEGRATIONS.md` (Auth.js, Clerk)
support MFA; this should be a requirement when the owner picks one.

## Authorisation / role-based access control

Five roles (`web/src/lib/auth/roles.ts`), each permission checked
**server-side** in the relevant server action or page component — not
just hidden in the UI. Re-verified today by reading every
permission-gated action (`updatePropertyAction`, `updateLeadStageAction`,
`addLeadNoteAction`) and confirming each calls `hasPermission()` before
doing anything, returning an explicit error rather than silently
succeeding if the check fails. Live-tested across all 5 roles on Day 5
(`TEST_REPORT.md`), unchanged today.

## Security headers

**New today** (`web/next.config.ts`) — previously, no security headers
were set at all:

| Header | Value | Why |
|---|---|---|
| `X-Frame-Options` | `DENY` | Stops this site being framed by another site (clickjacking). |
| `X-Content-Type-Options` | `nosniff` | Stops the browser guessing a file's type in a way that could execute unintended content. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits how much of this site's URLs leak to external links. |
| `Permissions-Policy` | camera/microphone/geolocation/payment disabled | None of these are used anywhere on the site; explicitly denying them removes an entire class of risk if a future bug or dependency ever tried to request one. |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Only takes effect once served over HTTPS (not yet deployed) — included now so it's already correct the day a real deployment happens. |
| `Content-Security-Policy` | `default-src 'self'` plus per-directive allowances | See below. |

**CSP detail and its current limitation:** `script-src 'self'
'unsafe-inline'` and `style-src 'self' 'unsafe-inline'` — the
`'unsafe-inline'` allowance is currently necessary because Next.js
injects legitimate inline scripts (serialized React Server Component
data) that the app cannot function without, and this hasn't been
migrated to a nonce-based CSP (which requires per-request middleware).
**This is a real, accepted, documented limitation, not an oversight**
— a nonce-based CSP removing `'unsafe-inline'` entirely is recorded
here as a genuine future improvement, not attempted today because it
touches how every page is rendered and deserved more testing time than
today's schedule allowed alongside everything else. Verified live: the
CSP was confirmed working by observing it actually block an
externally-hosted script during today's own accessibility testing (see
`ACCESSIBILITY.md`'s method section) — a real, positive test, not just
a header that exists unverified.

## CSRF protection

Next.js Server Actions (used for every form and every admin mutation
on this site) automatically verify that a request's `Origin` header
matches the deployment's own host before running, rejecting
cross-origin POSTs — this is a framework-level default, not something
this project had to build. **Action required before deployment:** if
the site ever sits behind a reverse proxy or CDN presenting a different
origin than Next.js sees directly, `experimental.serverActions.allowedOrigins`
in `next.config.ts` must be set to the real public origin, or genuine
same-site requests could be wrongly rejected. Not needed today, since
nothing is deployed.

## Redirect safety

Searched the entire codebase for every use of `redirect()`: exactly two
call sites (`app/admin/page.tsx`, `lib/property/admin-actions.ts`),
both to a **fixed, hard-coded internal path** (`/admin/properties`),
never built from user input. No open-redirect vulnerability exists
because there is nowhere in the code that redirects to a
visitor-supplied URL at all.

## Upload security

Built Day 5, re-verified unchanged today: `web/src/lib/security/file-upload.ts`
validates file type and size (JPEG/PNG/HEIC/PDF, 8MB max, 5 files max)
and sanitises filenames — but, most importantly, **never persists file
bytes anywhere**, only sanitised metadata. This removes an entire class
of upload risk (malware storage, unbounded disk growth, unauthorised
file access) until a real, access-controlled storage provider with
malware scanning is approved (see `INTEGRATIONS.md`).

## Dependency vulnerabilities

```
npm audit
```
**Result: 0 vulnerabilities**, checked fresh today against the current
`package-lock.json`.

## Secret scanning

- Confirmed `.env` is not tracked by git (only `.env.example`, which
  contains placeholder names only).
- Searched the repository for common secret patterns (API keys,
  private-key PEM headers, tokens) — none found.
- Specifically re-confirmed no AI-provider, email-provider, or any
  other third-party API key exists anywhere in the codebase, consistent
  with `AI_SAFETY_RULES.md` and `INTEGRATIONS.md` — nothing is
  connected, so there is nothing to leak.

## Audit logs

`web/src/lib/auth/audit-log.ts` records every admin create/update/
status-change action with an actor, timestamp, and description —
**in-memory only, lost on restart.** Explicitly documented in the file
itself as needing to move to a persistent, tamper-resistant store (a
database table with no update/delete permission for ordinary roles)
before real deployment — unchanged and re-confirmed today.

## Backup plan

**None exists, because there is nothing persistent to back up yet** —
every data store in this project (leads, audit log, properties) is an
in-memory array, explicitly documented as such since Day 4/5, lost on
every server restart. A real backup plan is a requirement of whichever
real database is chosen (`INTEGRATIONS.md`), not something this
in-memory demonstration phase can meaningfully have. Recorded here so
it isn't forgotten once a real database exists.

## Least-privilege integrations

No third-party integration is connected at all today (no CRM, no
email provider, no AI provider, no analytics, no payment processor —
confirmed via `INTEGRATIONS.md`), so there is currently no external
credential whose privilege scope needs reviewing. When one is
connected, `INTEGRATIONS.md`'s existing "security risks" note (written
Day 4 for the CRM case) already sets the expectation: scope any real
API key to the minimum the site needs (e.g. read listings, write
enquiries), never full account access, where the provider allows it.

## Sensitive-data handling

See `PRIVACY_DATA_MAP.md` (Day 5) for the full data inventory. Nothing
new was collected today; today's addition is the drafted Privacy Notice
(`/privacy-policy`) describing that same inventory publicly and
honestly.

## OWASP Top 10 (2021) — walkthrough

| Risk | Position today |
|---|---|
| A01 Broken Access Control | Server-side RBAC checks exist and are tested (see above); the biggest real gap is that authentication itself is a mock, not that authorization logic is missing. |
| A02 Cryptographic Failures | No secrets or sensitive credentials are stored anywhere to fail cryptographically — nothing to encrypt yet. |
| A03 Injection | No SQL database exists (in-memory arrays only), removing SQL injection entirely; every text input is sanitised and Zod-validated before use. |
| A04 Insecure Design | The adapter-interface pattern (`PropertyProvider`, `AIProvider`) and the explicit "demo data only, isDemo flag" design throughout are deliberate insecure-design mitigations — real data can't accidentally look connected when it isn't. |
| A05 Security Misconfiguration | Security headers were missing before today — now added (see above). CSP's `'unsafe-inline'` is a known, documented remaining gap. |
| A06 Vulnerable and Outdated Components | `npm audit`: 0 vulnerabilities, checked today. |
| A07 Identification and Authentication Failures | The mock admin session is exactly this risk category — flagged repeatedly across every relevant document as the top pre-deployment blocker. |
| A08 Software and Data Integrity Failures | No CI/CD auto-deploy pipeline or unsigned code execution exists to be compromised. |
| A09 Security Logging and Monitoring Failures | An audit log exists but is in-memory only (see above) — a real gap once real data exists. |
| A10 Server-Side Request Forgery (SSRF) | No server-side code fetches a URL supplied by a visitor anywhere in the codebase — checked today, none found. |

## Summary: what must happen before real deployment

1. Replace the mock authentication with a real provider, with MFA
   available (CLAUDE.md Rule 6 already blocks deployment on this).
2. Move the audit log and every in-memory data store to a real,
   persistent, backed-up database.
3. Resolve the CSP's `'unsafe-inline'` script/style allowance via a
   nonce-based approach.
4. Set `experimental.serverActions.allowedOrigins` once the real
   production origin (behind any proxy/CDN) is known.
5. Re-run `npm audit` and this entire checklist again immediately
   before deployment, not just today.
