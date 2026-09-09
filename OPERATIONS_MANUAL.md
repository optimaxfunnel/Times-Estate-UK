# OPERATIONS_MANUAL.md — Times Estates (Times Estate Ltd)

## Phase 7 note (2026-09-09)

Everything below is unchanged and still accurate — none of the gaps it
describes (no real login, no real email notifications, no persistent
database) have closed. If you're looking for the launch decision
itself, see `FINAL_LAUNCH_APPROVAL.md`; if you're a developer, see
`TECHNICAL_HANDOVER.md`.

## Who this is for

This is a plain-English guide for Times Estate Ltd staff using the
website day to day, once it is live. It assumes no technical
background. **Today, none of this is live for real visitors** — the
site is still in development, and the admin area uses a temporary,
insecure development login that must be replaced before anyone relies
on this guide for real work (see "Signing in" below).

## Signing in

**Not yet real.** Today's admin area (`/admin`) has a "development-only
role switcher" at the top of the page instead of a real login — you
pick a role from a dropdown and click "Switch role." This exists only
so the system can be built and tested; it has no password and proves
nothing about who you are. Before this site is used for real work, it
will be replaced with a proper sign-in (username/password or similar),
and this section will be rewritten to match. Do not treat the current
switcher as how staff will really sign in.

## Staff roles

Five roles exist, each seeing only what their job needs:

| Role | Can do |
|---|---|
| **Administrator** | Everything below, plus anything an Manager can do. |
| **Manager** | Approve properties for publication, manage enquiries/leads, view the audit log. |
| **Property Editor** | Add and edit properties, but cannot publish them live — a Manager or Administrator must approve. |
| **Content Editor** | Edit property content, similar restrictions to Property Editor. |
| **Enquiry Viewer** | View enquiries/leads only, cannot act on them or change anything. |

## Adding a property

1. Go to **Admin → Properties**.
2. (Once building this out further) use "Add property" and fill in the
   details — address, price, description, photos, and so on.
3. The property starts as **Draft** — it is never visible to the
   public in this state.

## Editing a property

1. Go to **Admin → Properties**, find the property, click **Edit**.
2. Change the summary, description, status, or other details.
3. Click **Save changes**. You'll see a confirmation, and the change is
   recorded in the **Audit Log** automatically.

## Approving publication

- A **Property Editor** or **Content Editor** can move a property to
  **Awaiting approval**, but not further.
- Only a **Manager** or **Administrator** can move a property from
  Awaiting approval to a publicly visible status (e.g. **Available**).
- If a Property Editor tries to publish directly, they'll see a clear
  message explaining only a Manager/Administrator can do that — this
  is intentional, not a fault.

## Changing a property's status

Use the **Status** dropdown on the property's edit page: Draft →
Awaiting approval → Available (or Under Offer, Sold, Let Agreed, and
so on, once it's genuinely at that stage). Every change is logged.

## Reviewing enquiries (leads)

1. Go to **Admin → Leads** (only visible to roles with permission).
2. You'll see every enquiry submitted through the website this session
   — sales/rental valuations, viewing requests, repair reports,
   general enquiries, and more — each with its category, priority, and
   current stage.
3. Click **Manage** on a lead to see full detail, change its stage
   (New → Acknowledged → Assigned → Contact attempted → Appointment
   booked → Qualified → Instruction won/lost → Closed), assign it to a
   colleague, or add a note.
4. **Today, no real email or text message is sent to you when a new
   enquiry arrives** — you need to check this page directly. This is a
   known, documented gap (see `AUTOMATION_WORKFLOWS.md`) that will be
   closed once an email/notification provider is approved.

## Processing repair reports

Repair reports appear in the same Leads list, category "Repair
report," with their urgency (Routine/Urgent/Emergency) shown as the
priority. **An emergency-marked report is not automatically phoned or
texted to anyone today** — it simply appears with "Emergency" priority
in the list, so it's important to check this list regularly, or ask for
this to be prioritised once a real alerting method is approved. Every
repair report also records what photos were attempted to be attached
(the photos themselves are not yet stored anywhere — only their name,
size and type — see `SECURITY.md`).

## Reviewing AI-generated drafts

The website includes an AI assistant, currently in demonstration mode
(it answers from a small, fixed set of approved facts, never invents
one, and never connects to a real AI company). It does not draft
anything for you to review today — it only answers visitor questions
directly on the site, always saying clearly that it is an AI, and
always refusing legal, financial, mortgage and surveying questions,
negotiation, and tenancy confirmation. If this ever changes to draft
messages for staff review, that review step will be built and
documented here at that time — it does not exist today.

## Handling failed notifications

Every lead's detail page shows its notification status: "Sent," "Not
sent (no provider)," or "Failed." Today, every lead shows "Not sent"
because no real email provider is connected yet — this is expected,
not a fault. Once a provider is connected, a "Failed" status means the
system tried to notify someone and it didn't go through — check the
notification log shown on that lead for the reason, and follow up with
that person directly rather than assuming they were told.

## Updating website content

Most page text (service descriptions, the About page, legal pages) is
currently set directly in the code by the development team, not
through an editable content system — see `INTEGRATIONS.md`'s CMS
comparison for the options considered. To request a content change,
tell the development team what needs to change and why; changes go
through `CONTENT_VERIFICATION_REGISTER.md` first if they're a factual
claim, to keep everything the site says checked and true.

## Backups

**Not applicable today** — there is no permanent database yet; all
data lives only in the website's memory while it's running and is
lost when it restarts. Once a real database exists, see
`DEPLOYMENT.md` §6 for the backup plan, and this section will be
updated with what staff need to know (mainly: nothing day-to-day,
backups will run automatically).

## Restoring service

If the website appears down or broken:

1. Do not attempt to fix the server yourself — contact the development
   team or hosting provider (see "Obtaining technical support" below).
2. If you know a recent change was made just before the problem
   started, mention that — it helps diagnose faster.
3. See `DEPLOYMENT.md` §10 for the technical rollback procedure that
   the development team or hosting provider will follow.

## Security incident escalation

If you suspect a security problem (e.g. you can see something you
shouldn't, a form seems to be exposing other people's information, or
you receive a suspicious request claiming to be from the website):

1. Stop using the affected feature immediately.
2. Contact the development team directly and describe exactly what you
   saw, with a screenshot if possible.
3. Do not discuss the specifics publicly or with anyone outside the
   business until it's been assessed.
4. See `SECURITY.md` for the technical controls already in place and
   what's still outstanding.

## Routine maintenance

See `DEPLOYMENT.md` §12 for the technical maintenance schedule
(weekly/monthly/quarterly checks). As a staff member, your part is
mainly: check the Leads list regularly (until real notifications
exist), and flag any content that needs updating via
`CONTENT_VERIFICATION_REGISTER.md`.

## Obtaining technical support

Contact the development team who built this site (see the project's
`README.md` for how this repository is organised, if you're speaking
with a new developer taking over). Have ready: what you were doing,
what you expected to happen, what happened instead, and — if
possible — a screenshot. For anything urgent affecting real visitors
once the site is live, treat it with the same urgency as the
"Restoring service" section above.
