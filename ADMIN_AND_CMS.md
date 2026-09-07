# ADMIN_AND_CMS.md — Times Estate Ltd

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
