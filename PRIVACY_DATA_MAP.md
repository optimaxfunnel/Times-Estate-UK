# PRIVACY_DATA_MAP.md — Times Estate Ltd

## Day 5 Task 6 update (2026-10-29) — data map

**This map does not claim legal compliance.** Every "basis" below is a
proposal for a solicitor or data-protection adviser to confirm. Today
**all data is held in server memory and lost on restart; no real
customer data has been collected.**

| Information | Purpose | Proposed basis (requires review) | Stored | Access | Retention question | Shared with | Deletion | Security control | Review needed |
|---|---|---|---|---|---|---|---|---|---|
| Name, email, phone (every enquiry) | Reply to the enquiry | Steps at the person's request / legitimate interests | Lead record (memory; database once approved) | Manager, Administrator; Enquiry Viewer (read only) | How long after closure? (proposal: 2 years for won/lost instructions, 12 months otherwise) | Email provider once approved | Admin deletion function (to build); on request | Validation, sanitisation, rate limit, role checks | Yes — basis and retention |
| Property address (valuation, repair) | Arrange visit / repair | As above | Lead record | As above | As above | Contractors (repairs, with consent) | As above | As above | Yes |
| Viewing dates, qualification answer | Arrange a viewing | As above | Lead record | As above | Short (proposal: 6 months) | Vendor/landlord only as needed | As above | As above | Yes |
| Repair description, access information, tenancy reference | Fix the repair | Contract with the tenant / landlord's legal duty | Lead record | Manager, Administrator | Proposal: 12 months after closure | Contractors, **only with the tenant's separate consent** | As above | Role checks | Yes |
| Repair photos / documents | Show the problem | As above | **Not stored today** (checked, then discarded) | When stored: Managers/Admins via short-lived links, only after malware scan | Proposal: 12 months after closure | Contractors with consent | Automatic once storage exists | Type, size, signature checks; private storage rules | Yes |
| Privacy consent + timestamp | Record of consent / notice | Record-keeping | Lead record | As above | Kept as long as the lead | — | With the lead | — | Yes |
| Marketing consent (alerts) | Property alert emails | Consent | Alert record | Manager, Administrator | Until withdrawn; re-confirm periodically | Email provider once approved | Unsubscribe link (to build) | Separate tick box, never pre-ticked | Yes — PECR wording |
| Saved properties, saved searches | Visitor convenience | Not personal data held by us | Visitor's own browser only | Visitor only | Visitor clears it | Nobody | Visitor's browser | Never sent to the server | No |
| Admin session (role, expiry) | Staff sign-in | Legitimate interests (security) | Signed cookie | The staff member | 8 hours | — | Expires / sign out | Signed, httpOnly, SameSite=Strict | No |
| Audit log (role, action, record id) | Accountability | Legitimate interests | Memory (database once approved) | Manager, Administrator | Proposal: 6 years | — | Never edited; deletion policy to decide | Append-only | Yes |
| AI assistant messages | Answer the question | Legitimate interests | **Not stored** | — | — | No AI company connected | — | No personal data needed | Revisit when a provider is approved |
| Server logs (notification lines include the lead reference) | Troubleshooting | Legitimate interests | Hosting logs (once hosted) | Developers | Proposal: 30 days | Host | Host log rotation | No names or emails in log lines | Yes |

**Still missing before real data:** a database with encryption at rest
and backups, real staff accounts with two-factor sign-in, an ICO
registration number, a data-subject request process, a deletion
function in admin, processor agreements with each provider, and a
solicitor-reviewed privacy notice.

---

## Status of this document

**Confirmed as an accurate description of what today's code actually
does and stores.** This document maps personal data end-to-end so the
owner and, eventually, a qualified professional can assess it — it does
**not** itself confirm compliance with UK GDPR, the Data Protection Act
2018, or any other law (CLAUDE.md Rule 4: never claim legal compliance
merely because controls or templates exist). Every row marked "Requires
professional review" needs that review before this site handles real
customers' data.

## What data is collected, and why

| Data | Where it's collected | Purpose | Consent basis recorded |
|---|---|---|---|
| Full name, email, phone | Every lead form (`/sell`, `/let`, `/commercial`, `/contact`, `/callback`, `/register`, `/property/[id]`, `/report-a-repair`) | So a member of staff can identify and contact the person who submitted the enquiry | Privacy Policy checkbox, timestamped (`consentGiven`, `consentTimestamp` on the `Lead` record) |
| Property address / reference | Repair reports, viewing requests | To identify which property the enquiry concerns | Same Privacy Policy consent, given as part of the same submission |
| Message / description text | Every form's free-text field | The substance of the enquiry itself | Same Privacy Policy consent |
| Category-specific detail (best time to call, preferred viewing date/time, issue category, urgency, access information, requirement description) | The relevant form | Lets staff triage and act on the enquiry without a follow-up call just to gather basics | Same Privacy Policy consent |
| Photo/document metadata (filename, size, type) — **file contents are never stored, only this metadata** | `/report-a-repair` | So staff can see what was attempted to be attached, without this project taking on file-storage responsibility before a storage provider is approved (see `INTEGRATIONS.md`) | Same Privacy Policy consent, plus a **separate** explicit consent to share the (eventual) file with a contractor |
| Marketing consent (optional, currently not exposed on any form's UI — the data field exists but no form sets it) | N/A yet | Reserved for a future "keep me updated" checkbox, not built today | Would need its own separate, unticked-by-default checkbox — never bundled with the Privacy Policy consent, per standard UK consent practice — **Requires professional review** before any form adds this |
| Staff notes on a lead | `/admin/leads/[id]`, typed by a signed-in staff member | Internal case notes (e.g. "left voicemail, will retry tomorrow") | Not visitor consent — this is staff's own internal record-keeping about their contact with the visitor |
| Mock role selection (`administrator` / `manager` / etc.) | The development-only role switcher on every admin page | **Not personal data** — this is a temporary development convenience, not tied to any real person's identity (see `ADMIN_AND_CMS.md`'s mock-authentication warning) | N/A |
| Audit log entries (actor role, action, timestamp, a short description) | Every admin create/update/status-change action | Accountability — knowing what changed and, once real authentication exists, who changed it | N/A (staff internal record) |

## Where this data lives today

Everything above is held in **server memory only**
(`web/src/lib/leads/provider.ts`, `web/src/lib/auth/audit-log.ts`) —
plain JavaScript arrays inside the running Next.js process. This means:

- It is **lost completely every time the development server restarts.**
  There is no database, no file on disk, and no backup.
- It **never leaves this single running process** — nothing is sent to
  any third party, because no third-party integration is connected
  (`INTEGRATIONS.md` confirms no email, CRM, or analytics provider is
  wired up).
- It is only ever visible through this website's own admin pages, to a
  browser session that has selected a role via the (explicitly
  labelled, non-real) development role switcher.

**This is appropriate for today's development and demonstration
purposes and is not appropriate for real customer data.** A production
deployment needs a real, persistent, access-controlled database before
any genuine enquiry is accepted — see "What must change before this
handles real data" below.

## Who can access it (today's roles)

See `ADMIN_AND_CMS.md` for the full permission matrix. For personal
data specifically:

| Role | Can view leads | Can manage leads (stage, assignment, notes) |
|---|---|---|
| Administrator | Yes | Yes |
| Manager | Yes | Yes |
| Property Editor | No | No |
| Content Editor | No | No |
| Enquiry Viewer | Yes (read-only) | No |

Both the "can view" and "can manage" checks are enforced **server-side**
(in the server actions and page components themselves, not just hidden
UI), so a role without permission cannot reach the data even by
navigating directly to the URL — confirmed live in `TEST_REPORT.md`.

## Retention

**Not yet decided — flagged as Missing, not assumed.** Because all data
is in-memory only, there is currently no retention period to configure;
data is retained for, at most, the lifetime of one running dev-server
process. Before real data is accepted, the owner (ideally with
professional advice) needs to decide: how long a lead record is kept
after the matter is closed, whether/when it is anonymised or deleted,
and who is responsible for enforcing that. **Requires professional
review.**

## Sharing with third parties

**None today.** No data collected by this site is transmitted to any
third party — no email provider, no CRM, no analytics service, no
contractor. The repair-report form's "contractor-sharing" consent
checkbox exists so that consent can be captured **at the point of
collection**, ready for when a real contractor-notification workflow is
built and approved — but today, ticking it has no external effect
whatsoever; the data still only ever reaches this project's own
in-memory store.

## Deletion

**No deletion mechanism exists today** beyond restarting the server
(which deletes everything indiscriminately, not on request). A real
deployment needs a way to delete one specific person's data on request
(supporting a data-subject erasure request) — this has not been built,
because there is no persistent store to delete from yet. **Requires
professional review** of exactly what process is needed once a real
database exists.

## Security controls already in place

- **Input sanitisation** — every text field has HTML and control
  characters stripped before storage (`web/src/lib/security/sanitize.ts`).
- **Rate limiting** — 5 submissions per form per visitor per minute,
  reducing automated bulk data harvesting/spam risk.
- **Honeypot spam trap** — silently discards likely-bot submissions
  without creating a lead record at all.
- **File-upload validation** — type and size checked; **file bytes are
  never stored**, which removes an entire category of risk (malware
  upload, unbounded storage growth, unauthorised file access) until a
  proper, access-controlled storage solution is chosen.
- **Role-based, server-enforced access control** — see the table above.
- **No secrets or real credentials in the codebase** — confirmed via
  `.env.example` containing only placeholder names (CLAUDE.md's
  Working Conventions).

## Security controls that do NOT exist yet (must precede real data)

- **Encryption at rest** — meaningless today (there is no "at rest,"
  data lives only in memory), but essential once a real database is
  chosen.
- **Transport encryption (HTTPS)** — not applicable to a local
  development server; mandatory before any public deployment (Rule 6:
  no deployment without explicit approval, and this must be part of
  that deployment's configuration, not an afterthought).
- **Real authentication** — the current role switcher is explicitly a
  development convenience, not access control (`ADMIN_AND_CMS.md`).
- **Audit log persistence** — currently in-memory and lost on restart;
  a real deployment needs this in a tamper-resistant, persistent store.
- **A documented incident-response process** — not created today;
  **Requires professional review** before this site handles real data.

## Summary: what must change before this site handles real personal data

1. A real, persistent, access-controlled database (CLAUDE.md/`INTEGRATIONS.md`).
2. A real authentication system for `/admin` (`ADMIN_AND_CMS.md`).
3. HTTPS and a real hosting environment (only after Rule 6's exact
   approval phrase is given).
4. An owner (or professional-advised) decision on retention and
   deletion.
5. A professional review of the whole data flow described in this
   document against UK GDPR/Data Protection Act 2018 obligations —
   this document is the starting map for that review, not a substitute
   for it.
