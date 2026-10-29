# ADMIN_AND_CMS.md — Times Estate Ltd

## Day 4 Task 2 update (2026-10-29) — secure administration structure

**Plain-English summary.** The admin area now has a proper lock on the
door, even though the real key (staff sign-in) hasn't been chosen yet.
Nobody gets in without signing in; the sign-in that exists today is a
testing stand-in that only works on a development computer and is
switched off automatically in a live build. Every role can do only what
it needs, live listings can only be changed by a Manager or
Administrator, and important actions — including refused attempts — are
written to the audit log.

### The five roles (least privilege)

| Permission | Administrator | Manager | Property Editor | Content Editor | Enquiry Viewer |
|---|---|---|---|---|---|
| Enter admin | ✔ | ✔ | ✔ | ✔ | ✔ |
| Create / edit draft properties | ✔ | ✔ | ✔ | — | — |
| Submit for approval | ✔ | ✔ | ✔ | — | — |
| **Publish / change a live listing** | ✔ | ✔ | — | — | — |
| Withdraw / archive | ✔ | ✔ | — | — | — |
| Edit content pages | ✔ | — | — | ✔ | — |
| View enquiries | ✔ | ✔ | — | — | ✔ |
| Manage leads | ✔ | ✔ | — | — | — |
| View audit log | ✔ | ✔ | — | — | — |
| Manage users | ✔ | — | — | — | — |

### The ten property states

Draft · Awaiting approval · **Available · Under offer · Sold subject to
contract · Let agreed** (the only four shown publicly) · Sold · Let ·
Withdrawn · Archived.

| Move | Who may make it |
|---|---|
| Draft ↔ Awaiting approval | Anyone who can edit properties |
| Into any public state | Manager, Administrator |
| Into Sold or Let | Manager, Administrator |
| Into Withdrawn or Archived | Manager, Administrator |
| Taking a live listing back to Draft | Manager, Administrator |
| Editing the text of a live listing | Manager, Administrator (it is a public change) |

### How each rule is met

| Rule | How |
|---|---|
| 1. Draft/unapproved never public | Public search and every property page show only the four public states; any other state returns "Page not found" (verified on a production build: the draft demo property shows "Page not found", never its content; the HTTP status is 200 because the page streams — a minor search-engine point, recorded in TEST_REPORT.md) |
| 2. Public changes need authorisation | Server-side rules in `lib/property/workflow.ts`, checked on every save regardless of what the form shows |
| 3. Important changes logged | Create, edit, status change, sign-in, sign-out and **refused attempts** go to the audit log (verified live: a Property Editor's attempt to publish appeared as "denied") |
| 4. Least privilege | Table above; every permission is denied unless listed (`lib/auth/roles.ts`) |
| 5. Secure, established authentication | **Not yet available — see limitations.** The stand-in uses a signed (HMAC-SHA256), expiring (8 h), httpOnly, SameSite=Strict cookie, so it cannot be forged by editing a cookie (verified by test and by a forged-cookie request) |
| 6. No fake users or passwords | None exist. The stand-in has no accounts or passwords; it simply picks a role to test with |

### Limitations (must be resolved before going live)

1. **Real staff sign-in is not connected.** Recommended: Auth.js with
   email magic link or password + two-factor (INTEGRATIONS.md) — needs
   your approval. Until then a production build shows "Administration is
   not available" and nobody can sign in (verified).
2. **No individual user accounts**, so the audit log records the role,
   not the person.
3. **Audit log and property edits are kept in memory** and lost on
   restart — needs the database (also awaiting approval).
4. **Content Editor** has the permission but no content-editing screen
   exists yet (no CMS chosen).
5. `ADMIN_SESSION_SECRET` (placeholder in `.env.example`) must be set
   to a long random value on any shared server.

**Code:** `lib/auth/session.ts`, `lib/auth/session-token.ts`,
`lib/auth/roles.ts`, `lib/auth/audit-log.ts`, `lib/property/workflow.ts`,
`app/admin/sign-in/page.tsx`, `proxy.ts`. **Tests:** 81/81, including
role boundaries, every status transition rule, and token tampering,
expiry and wrong-secret rejection.

---

# Historical — Day 4 (September) record


## What this document is

Explains the administration area built today (`web/src/app/admin/`): who
can do what, how property approval works, and — importantly — what is
**not yet real** about the login system, so nobody mistakes today's
demonstration for something safe to put in front of the public.

## The five roles

| Role | Can do |
|---|---|
| **Administrator** | Everything below, plus manage other users' roles (once real accounts exist) |
| **Manager** | Create/edit/approve/archive properties, view enquiries, view the audit log |
| **Property Editor** | Create and edit properties, submit them for approval — **cannot** publish a property live themselves |
| **Content Editor** | Edit general page content (not properties) |
| **Enquiry Viewer** | View enquiries only — read-only, no editing rights anywhere |

This is a least-privilege model: every permission is denied by default
unless a role explicitly has it (see `web/src/lib/auth/roles.ts`). A
Property Editor who tries to publish a property straight to "Available"
is blocked in code, not just hidden in the interface — even if they
manually crafted the request, the server-side check refuses it.

## Property approval workflow

A property moves through these states (full list and public-visibility
rules in `DATA_MODEL.md`):

```
Draft → Awaiting approval → Available → (Under offer / SSTC / Let agreed) → Sold / Let → Archived
                                      ↘ Withdrawn
```

- A **Property Editor** can create a property and move it to "Awaiting
  approval."
- Only a **Manager** or **Administrator** can move it from there to any
  publicly visible status.
- Draft and Awaiting approval properties are **never** returned by
  public search or shown on a public detail page — this is enforced at
  the data layer (`PUBLICLY_VISIBLE_STATUSES` in
  `web/src/lib/property/types.ts`), not just by hiding a link, so a
  guessed or bookmarked URL to a draft property still returns "not found."

## Audit logging

Every property creation, edit and status change is written to an audit
log (`web/src/lib/auth/audit-log.ts`), viewable at `/admin/audit` by
Managers and Administrators. Today this log is **in-memory only** — it
resets when the server restarts. Before any real deployment, this needs
to move to a persistent, append-only store (e.g. a database table that
ordinary roles cannot edit or delete from).

## ⚠️ The login system is not real yet — read this before assuming anything is secure

There is **no real authentication** in this project. What exists instead
is a clearly-labelled, development-only "role switcher" (visible as an
orange banner at the top of every `/admin` page) that lets whoever is
looking at the screen pick which of the five roles to test as. This was
built deliberately, not by mistake, because:

- No authentication service has been approved yet (see the Authentication
  section of `INTEGRATIONS.md` — Auth.js, Clerk and Auth0 are compared,
  none chosen).
- Today's instruction explicitly said not to create fake production users
  or commit passwords — so rather than inventing a fake login form with
  fake credentials, the honest approach was a visibly-labelled dev tool.

**What this means in practice:**
- Anyone who can reach `/admin` on a running copy of this site today can
  grant themselves any role, with no password. This is fine on a
  developer's own machine; it would be a serious security hole if this
  code were deployed anywhere reachable by the public.
- **The admin area must not be deployed publicly until a real
  authentication system is chosen, approved by the owner, and
  implemented in place of `web/src/lib/auth/session.ts`.** This is
  recorded as a blocking item in `PROJECT_PLAN.md` and `TEST_REPORT.md`.

## What's demonstrated today vs. what's a foundation for later

| Built and working today | Foundation only — needs more work before going live |
|---|---|
| Role/permission model and enforcement | Real sign-in (needs an approved auth provider) |
| Draft → Awaiting approval → Published workflow | Persistent audit log storage |
| Status-change audit logging | A full field-by-field property edit form (today's edit form covers summary, description and status — the complete field set from `DATA_MODEL.md` is defined and validated in `web/src/lib/property/schema.ts`, ready for a fuller form once real data entry is needed) |
| Public/private field separation | User management screen (Administrator role can theoretically manage users, but there's no user list yet — there are no real users) |
