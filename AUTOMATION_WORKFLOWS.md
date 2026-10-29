# AUTOMATION_WORKFLOWS.md — Times Estate Ltd

## Day 5 Task 3 — lead-management workflows (2026-10-29)

**Plain-English summary.** Every enquiry becomes a "lead" that staff
work through in the admin area, from New to Closed. Nothing is sent to
anyone automatically: the website records the enquiry, flags it to the
right team, and shows staff when something is overdue. Every change is
written to the audit log.

### What every lead holds

| Field | Where it comes from |
|---|---|
| Date and time | Set when the form is received |
| Source page | The page the form was on |
| Category | The form type (table below) |
| Property reference | Property id and address, where the form was on a property |
| Contact details | Name, email, phone (from the form, cleaned) |
| Consent status | Privacy consent with timestamp; marketing consent where asked (alerts) |
| Assigned person | Set by a Manager/Administrator; a viewing is pre-tagged with the property's assigned staff member |
| Priority | Routine / Urgent / Emergency — repairs take the urgency the tenant chose; staff can change it |
| Current status | One of the nine stages below |
| Follow-up date | Set by staff; flagged when it passes |
| Internal notes | Added by staff, with author and time |

**Stages:** New → Acknowledged → Assigned → Contact attempted →
Appointment booked → Qualified → Instruction won / Instruction lost →
Closed. A viewing cannot be marked "Appointment booked" until staff
confirm access with the occupier.

### Workflow per category

All categories share: **validation** — contact details, honeypot, rate
limit, sanitisation (Task 1); **audit log** — creation, every stage,
assignment, priority and follow-up change, valuation records and refused
attempts; **failure recovery** — if saving fails the visitor is shown
the phone number and nothing partial is stored; if the staff
notification fails it is marked "Failed" on the lead and in the server
log, and the lead is still in the admin list, so nothing is lost while
the server runs (**but everything is lost on restart until a database
is approved** — the main open risk).

| Category | Trigger | Extra validation | Consent | Internal action today | Proposed external communication (not built) | Human approval | Escalation flag |
|---|---|---|---|---|---|---|---|
| Sales valuation | Form on `/sell` | Property address | Privacy | Lead created, routed to sales | Acknowledgement email: "we'll call to arrange a visit" — no figure | Wording, recipient, provider; any valuation figure confirmed only by a Manager/Admin | Routine — not acknowledged in 24 h |
| Rental valuation | `/let` | Property address | Privacy | Routed to lettings | As above | As above | Routine |
| Commercial valuations | `/commercial` | Property address | Privacy | Routed to commercial | As above | As above | Routine |
| Management enquiry | `/property-management` | — | Privacy | Routed to property management | Acknowledgement email | Wording etc.; no fee quoted automatically | Routine |
| Landlord or vendor enquiry | `/landlords` | "I am a" + message | Privacy | Routed (proposed) to valuations | Acknowledgement email | As above | Routine |
| Buyer registration | `/register` | Requirements | Privacy | Routed to sales | Matching-property emails | Wording; **marketing consent needed before any property emails** | Routine |
| Tenant registration | `/register` | Requirements | Privacy | Routed to lettings | As above | As above | Routine |
| Commercial enquiry | `/commercial` | Requirement | Privacy | Routed to commercial | Acknowledgement email | Wording etc. | Routine |
| Viewing request | Every property page | Property id, first-choice date (today or later) and time, qualification question | Privacy | Routed to the property's assigned staff member, or the branch | Email proposing a time **only after** staff have agreed access | Staff must confirm access with the occupier before "Appointment booked"; the site never confirms a viewing | Routine |
| Repair report | `/report-a-repair` | Address, issue, description, urgency; two consents; file type/size | Privacy + contractor sharing | Priority set from urgency; emergency guidance shown first | Email to management team; later, contractor instruction | Contractor instruction is always a person's decision | Emergency 15 min · Urgent 2 h · Routine 24 h |
| Callback request | `/callback` | Preferred time | Privacy | Routed to general | Text/email confirming the slot | Wording etc. | Routine |
| General enquiry | `/contact` | Message | Privacy | Routed to general | Auto-acknowledgement | Wording etc. | Routine |

### Escalation (built, flags only)

The admin leads list shows **"Due soon"** (75% of the target) and
**"Overdue"** (target passed, or follow-up date passed) beside the
stage, with the reason read out to screen readers. Targets above are
**proposals for you to confirm**. Escalating to a manager, phoning a
contractor or texting a tenant stays a person's decision; nothing is
sent automatically. Code: `lib/leads/escalation.ts` (5 tests).

### Needs your decision before any external communication

Recipient mailboxes, reply-to address, wording of each message,
retention period for leads, the email/SMS provider, and the response
targets above.

---

## Day 5 Task 1 — secure forms (2026-10-29)

**Every form, where it is, and what it creates.** All run through one
server pipeline (`lib/leads/actions.ts`; repairs and alerts have their
own actions with the same protections).

| Form | Page | Record type |
|---|---|---|
| Residential sales valuation | `/sell` | `sales_valuation` |
| Residential rental valuation | `/let` | `rental_valuation` |
| Commercial sales valuation | `/commercial` | `commercial_sales_valuation` |
| Commercial rental valuation | `/commercial` | `commercial_rental_valuation` |
| Property-management assessment | `/property-management` | `management_enquiry` |
| Viewing request | every property page | `viewing_request` |
| **Landlord or vendor enquiry (new)** | `/landlords` | `landlord_vendor_enquiry` |
| Buyer / tenant registration | `/register` | `buyer_registration` / `tenant_registration` |
| Commercial-property enquiry | `/commercial` | `commercial_enquiry` |
| Callback request | `/callback` | `callback_request` |
| General contact | `/contact` | `general_enquiry` |
| Property alerts | `/property-alerts` | alert record (separate, with its own marketing consent) |
| Repair reporting | `/report-a-repair` | `repair_report` (with photo upload) |

**What every form has:**

| Requirement | How |
|---|---|
| Accessible labels | A visible label on every field, linked to it |
| Clear required fields | Every label says "(required)" or "(optional)" in words |
| Client-side assistance | Before sending: checks required fields, email and phone; shows an error summary that takes focus and links to each field; autocomplete hints for name, email, phone |
| Server-side validation | Zod validation of contact details and each form's required fields — the real gate |
| Sanitisation | Every text field cleaned before storage (`lib/security/sanitize.ts`) |
| Spam protection | Hidden honeypot field; a bot that fills it gets a fake success and no record |
| Rate limiting | Per form, with a clear "please wait" message |
| Helpful errors | Plain-English messages next to each field and in the summary; server errors give the phone number |
| Confirmation page | `/enquiry-received` — reference, what happens next, phone number; repair confirmations repeat the emergency guidance. Only the form type and reference are in the address, never personal details |
| Privacy wording | "We use these details only to respond to this request…", with the Privacy Policy linked |
| Consent | Privacy confirmation required on every enquiry; property alerts additionally ask for marketing consent |
| Internal-notification design | `lib/leads/notify.ts`: each record is routed to a team (sales, lettings, commercial, management, general) — see `EMAIL_AND_FORM_ROUTING.md` |
| Delivery-failure logging | Every notification attempt is recorded on the record as "not sent", "sent" or "failed", with a timestamped log line; staff see it in the admin leads list |

**Outbound email is not active.** Nothing is emailed to staff or
customers. It stays off until you approve: recipient addresses,
reply-to address, wording, retention rules, and the email provider.


## Status of this document

**Confirmed as an accurate description of what today's code actually
does.** Every workflow below is built and tested (see `TEST_REPORT.md`).
None of it sends a real email, text message, or CRM update — "internal
action" always means writing to this website's own in-memory lead
record and audit log, visible only in `/admin/leads`.

## What "automation" means today

Every enquiry, valuation request, registration, viewing request and
repair report on the site follows the same underlying pipeline
(`web/src/lib/leads/actions.ts` and `repair-actions.ts`):

1. **Honeypot check** — a hidden field real visitors never fill in; a
   bot that does gets a normal-looking "thank you," but no lead is
   created and no notification is logged.
2. **Rate limiting** — up to 5 submissions per form per visitor per
   minute; beyond that, a visible message asks them to wait, scoped per
   form so filling in one form never blocks another.
3. **Sanitisation** — every text field has HTML tags and control
   characters stripped before anything is stored.
4. **Validation** — contact details and category-specific required
   fields are checked; anything missing or invalid is returned to the
   visitor as a field-level error, not silently dropped.
5. **Consent** — a Privacy Policy checkbox is required on every form
   (the repair report additionally requires separate consent to share
   details with a contractor — see its row below); the exact timestamp
   of consent is recorded on the lead (`consentTimestamp`).
6. **Lead creation** — a `Lead` record is created in the in-memory store
   (`web/src/lib/leads/provider.ts`), with a priority, a stage
   (always starts at `new`), and an entry in the audit log.
7. **Notification attempt** — logged only (see "Notification failure
   handling" below); no real email is sent to anyone.
8. **Staff triage** — a human with the `manage_leads` permission
   (Manager or Administrator role — see `ADMIN_AND_CMS.md`) reviews the
   lead in `/admin/leads`, changes its stage, assigns it, and adds
   notes. Every stage change and note is written to the audit log with
   the acting role.

Nothing beyond step 7 happens automatically. No stage ever advances
itself, no external message is ever sent, and no viewing, tenancy, or
appointment is ever confirmed by the system — a human always does that,
consistent with CLAUDE.md Rule 5 and the brief's explicit instruction
that important business decisions stay under human control.

## Per-category workflow

| Category | Trigger (page) | Category-specific validation | Internal action today | Proposed external communication (future, not built) | Human approval required before sending | Escalation |
|---|---|---|---|---|---|---|
| Sales valuation | `/sell` | None beyond contact details | Lead created, priority `routine`, routed to "sales" team label | Email/SMS confirming appraisal booking request | Yes — recipient, wording, and provider must be approved (CLAUDE.md Rule 4) | None (routine) |
| Rental valuation | `/let` | None beyond contact details | As above, routed to "lettings" | As above | Yes | None |
| Commercial sales valuation | `/commercial` | None beyond contact details | As above, routed to "commercial" | As above | Yes | None |
| Commercial rental valuation | `/commercial` | None beyond contact details | As above, routed to "commercial" | As above | Yes | None |
| Management enquiry | `/property-management` | None beyond contact details | As above, routed to "property management" | As above | Yes | None |
| Buyer registration | `/register` | None beyond contact details | As above, routed to "sales" | Future property-match alert emails | Yes | None |
| Tenant registration | `/register` | None beyond contact details | As above, routed to "lettings" | As above | Yes | None |
| Commercial enquiry | `/commercial` | None beyond contact details | As above, routed to "commercial" | As above | Yes | None |
| Viewing request | `/property/[id]` | Preferred date/time (1st choice required); linked to the specific property reference | Lead created, routed to "branch/negotiator"; **the page states explicitly that this does not confirm a viewing** | Email/SMS proposing a confirmed time | Yes — and even once approved, confirming an occupied property's access must still be a human decision, never automatic (CLAUDE.md's explicit instruction) | None |
| Repair report | `/report-a-repair` | Property address, issue category, description (10+ characters), urgency, **two separate consents** (privacy + contractor-sharing), optional photo/document upload | Lead created with priority matching urgency (`routine`/`urgent`/`emergency`); file uploads validated (type/size) but **never stored** — only sanitised filename/size/type metadata is kept (no storage provider approved — see `INTEGRATIONS.md`) | Email to property management team; eventually a contractor notification once one exists | Yes | **Emergency-urgency reports are flagged but not phoned automatically** — see "Emergency escalation" below |
| Callback request | `/callback` | Preferred time of day | Lead created, routed to "general enquiries" | SMS/email confirming callback slot | Yes | None |
| General enquiry | `/contact` | None beyond contact details and a message | Lead created, routed to "general enquiries" | Auto-acknowledgement email | Yes | None |

## Notification failure handling

Every lead's notification attempt is recorded on the lead itself
(`notificationStatus`: `not_sent` / `sent` / `failed`, plus a
human-readable `notificationLog` entry), visible to staff on the lead's
detail page in `/admin/leads/[id]`. Today, because no real provider is
connected, every attempt logs `not_sent` with the reason ("no email
provider approved") — this is not a defect, it is the honest state of
an unconnected system. A `failed` status is also modelled and tested
(see `TEST_REPORT.md`), so that once a real provider is connected, a
genuine delivery failure surfaces the same way: on the lead record,
where staff checking `/admin/leads` will see it, not silently lost.
**Until a real provider exists, staff have no way to be notified of a
new lead except by checking the admin area directly** — this is the
single most important operational gap this document surfaces for the
owner.

## Emergency escalation (repair reports)

The repair-report page shows genuine, verifiable UK public-safety
information (999, the National Gas Emergency Service on 0800 111 999,
and the national power-cut number 105) **before** the form, with an
explicit instruction to act on those first and report to Times Estate
Ltd afterwards (`web/src/lib/repair-terms.ts`). Selecting "Emergency" as
the urgency:

- Sets the lead's priority to `emergency` (visible and sortable in
  `/admin/leads`).
- Shows the visitor a message reinforcing that logging the report here
  does not replace calling 999/the gas emergency number if that applies
  to their situation, and that they should not wait for a reply here.

**What this does not do:** phone, text, or otherwise proactively alert
any member of staff. An emergency-priority lead sits in the same
"new" stage as any other lead until a human checks the admin area.
Building genuine urgent-alert automation (an SMS/phone alert to an
on-call number) is a real future improvement, but requires a chosen
provider and the owner's approval — it has deliberately not been
built or assumed today.

## Lead stage lifecycle (staff-only, `/admin/leads`)

`new → acknowledged → assigned → contact_attempted → appointment_booked
→ qualified → instruction_won / instruction_lost → closed`. A stage is
only ever changed by a human with the `manage_leads` permission, through
`updateLeadStageAction()`, which is itself permission-checked
server-side (not just hidden in the UI) and writes every change to the
audit log with the acting role, an optional note, and a timestamp. No
stage transition is enforced as sequential — a manager can move a lead
directly from `new` to `closed` if that reflects reality — because
imposing a rigid workflow on real business judgement was judged more
likely to cause staff to work around the system than to help it.

## What is explicitly NOT automated today

- No real email, SMS, or push notification is ever sent to a visitor or
  to staff.
- No lead is ever assigned to a person automatically — assignment is a
  manual action.
- No stage ever advances itself (e.g. nothing marks a lead
  "contact_attempted" just because time has passed).
- No viewing, tenancy, sale, or appointment is ever confirmed
  automatically — only a human, using the admin area, can do that.
- No lead data is synced to any CRM, portal, or spreadsheet — see
  `INTEGRATIONS.md` for what a real CRM connection would need to
  address (this document's per-category "internal action" column would
  need rethinking, not just extending, once a real CRM exists).

## What needs the owner's decision before any of this goes live

1. An approved email/SMS provider, recipient addresses, reply-to
   addresses, exact wording, and a retention rule for lead data — none
   of which exist yet (CLAUDE.md Rule 4, `INTEGRATIONS.md`).
2. Whether an urgent/emergency repair report should trigger a more
   immediate staff alert than "appears in the admin list," and if so,
   by what channel.
3. A real authentication system before `/admin/leads` is ever exposed
   outside a trusted development environment (see `ADMIN_AND_CMS.md`'s
   mock-authentication warning, which applies identically here).
4. Confirmation, from the owner or a qualified professional, of what
   "response time" or "out-of-hours process" promises (if any) can
   honestly be made to a tenant reporting a repair — none is currently
   stated on the site, and none should be added without that
   confirmation (`CONTENT_VERIFICATION_REGISTER.md`).
