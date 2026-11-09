# OPERATIONS_MANUAL.md — Times Estate Ltd

**Rewritten 2026-10-31 (Day 7) to match the website exactly as it is
built today.** Where something is not built yet, this manual says so
plainly rather than describing how it might work.

## Before you start: what is and isn't live

- **The website is not live.** It runs only on this computer. Nothing
  has been published, and nothing will be until the owner writes
  exactly: "I approve production deployment."
- **All properties on the site are demonstration data**, marked
  "Sample property — not real" on every card and page.
- **Nothing is permanently stored yet.** Enquiries, staff changes and
  the activity log are held in the server's memory and **are lost every
  time the website restarts**. A database must be chosen and approved
  before real use (see `DEPLOYMENT.md` §11).
- **No emails are sent.** Every notification is recorded as "Not sent"
  until an email service is approved.

---

## 1. Signing in

**Today (testing only).** Go to `/admin/sign-in`, pick a role
(Administrator, Manager, Property Editor, Content Editor or Enquiry
Viewer) and press **Sign in**. There is no password, so this proves
nothing about who you are. It exists only so the system can be tested,
and it **switches itself off automatically on the public website** —
on a live build, every staff page sends you back to the sign-in page.
Sessions last 8 hours; "Sign out" ends one immediately.

**Before launch.** A real sign-in service must be chosen, with
two-step verification (a code from your phone as well as a password)
for every member of staff. This is a launch blocker. Each person will
have their own account, so the activity log shows who did what.

## 2. Staff roles

Each person gets the smallest role that lets them do their job.

| Role | Can do | Cannot do |
|---|---|---|
| **Administrator** | Everything, including managing staff accounts (once real accounts exist) | — |
| **Manager** | Approve and publish properties, change any status, withdraw or archive, manage enquiries, record valuations, read the activity log | Manage staff accounts |
| **Property Editor** | Edit draft properties and submit them for approval | Publish, change a live listing, withdraw or archive, see enquiries |
| **Content Editor** | Reserved for editing page text — **no page editor exists yet** (see §11) | Properties, enquiries |
| **Enquiry Viewer** | Read enquiries ("View only") | Change an enquiry, read the activity log, touch properties |

These rules are checked by the server every time, not just hidden on
the screen, and tested automatically (`TEST_REPORT.md`).

## 3. Adding a property

**Not built yet.** There is no "Add property" screen. Today the
listings come from a demonstration file. The plan is for new listings
to arrive from your property software (CRM) through a feed, arriving as
"Awaiting approval" so a Manager checks them before anything is public
(`INTEGRATIONS.md`, `DATA_MODEL.md`). If you would rather add listings
by hand on the website, that screen needs to be built — tell the
developer which you prefer.

## 4. Editing a property

1. Sign in, open **Properties**, click the property.
2. Change the summary or description, choose the status, press
   **Save changes**.
3. You'll see "Property updated." or a plain reason why not.

A Property Editor can edit **drafts** only. A listing already on the
public site can only be changed by a Manager or Administrator.

## 5. Approving publication

1. A Property Editor sets a draft to **Awaiting approval** and saves.
2. A Manager opens it, checks every detail against the source documents
   (EPC certificate, title, the vendor's or landlord's confirmation),
   sets the status to **Available** and presses **Save changes**.
3. Only then does it appear on the public site. Drafts and properties
   awaiting approval are never public.

Every approval, and every refused attempt, is written to the activity
log (**Audit Log**).

## 6. Changing a property's status

| Status | Public? | Who can set it |
|---|---|---|
| Draft, Awaiting approval | No | Editors (Managers if the listing is currently live) |
| Available, Under offer, Sold STC, Sold, Let agreed, Let | Yes | Managers, Administrators |
| Withdrawn, Archived | No | Managers, Administrators |

Use the status list on the property's edit page, then **Save changes**.

## 7. Reviewing enquiries

1. Open **Leads**. Every enquiry from every form is listed with its
   type, priority, stage, when it arrived, and whether the notification
   was sent.
2. Managers and Administrators click **Manage** to open one. Enquiry
   Viewers see "View only".
3. On the lead page you can: set the **stage** (New → Acknowledged →
   Assigned → Contact attempted → Appointment booked → Qualified →
   Instruction won or lost → Closed), **assign** it to a person, set the **priority**, set
   a **follow-up date**, and add a **note**. Press **Update Lead**.
4. Leads due for follow-up are flagged "Due soon"; missed ones
   "Overdue".

**Viewings:** a viewing can only be marked "Appointment booked" after
you tick that the occupier has confirmed access. The website never
confirms a viewing to a customer by itself.

**Valuations:** only a Manager or Administrator can record a valuation
figure on a lead (**Confirm valuation**). The website never gives an automatic valuation.

## 8. Processing repair reports

Repair reports arrive in **Leads** as "Repair report", with the
tenant's chosen urgency as the priority.

1. **Emergencies first.** If the tenant chose "Emergency", treat it as
   urgent immediately and phone them. The website shows tenants
   emergency numbers (999, gas 0800 111 999, power cut 105) but **does
   not decide whether something is an emergency** — a person does.
2. Contact the tenant, arrange a contractor (the tenant has agreed to
   their details being shared with one), and record each step as a
   stage and note.
3. **Photos:** the website checks each file (type, size, that it really
   is a photo or PDF) but **does not keep them yet** — no secure file
   storage has been approved. Ask the tenant to email photos if you
   need them until storage is set up.

Still needed from the owner: your out-of-hours process and response
times (`CONTENT_REQUIRED.md`).

## 9. Reviewing AI-generated drafts

The assistant on the website **never sends anything to anyone**. The
system can only create *drafts* marked "requires human approval", and
refuses to draft anything about valuations, money, tenancies, legal
matters or emergencies — those are always written by a person.

**Not built yet:** a screen to list and review those drafts. Until it
exists (and until an email service is approved), no drafts reach staff
and none are sent. When it is built, the rule is: read every draft,
edit it, and send it yourself — or delete it.

## 10. Handling failed notifications

In **Leads**, the notification column shows:

- **Not sent (no provider)** — normal today: no email service is
  connected. Check the Leads list yourself several times a day.
- **Failed** — the email service (once connected) could not deliver
  the alert. The enquiry itself is safe in the list. Open it, deal with
  it as normal, and tell the Administrator if failures continue.

The customer always sees their confirmation, even if the staff alert
fails.

## 11. Updating website content

- **Properties:** through the admin area (§4–6).
- **Page text** (About, Fees, services, legal pages): **there is no page
  editor yet** — text lives in the website's code, so changes are made
  by the developer. Send the new wording, and its source, in writing.
- **Facts** (phone numbers, addresses, memberships, fees): every fact
  must first be recorded in `CONTENT_VERIFICATION_REGISTER.md` with its
  source and status. Nothing unverified is presented as fact.
- **Content gaps:** sign in and open **Content** to see everything
  still missing and which items block launch.

## 12. Backups

**Nothing to back up yet** — there is no database, so data is not kept
at all between restarts. When a database is approved, the plan in
`DEPLOYMENT.md` §10 applies: automatic daily backups kept for at least
30 days, a monthly test that a backup can actually be restored, and
backups stored separately from the live site. The website's code is
already backed up on GitHub after every working day.

## 13. Restoring service

If the website stops working once live:

1. Check whether it's down for everyone (try a phone on mobile data).
2. Tell the Administrator and the developer immediately.
3. The developer follows `DEPLOYMENT.md` §12: restart the service, or
   roll back to the last version that worked (every version is kept in
   GitHub, so this takes minutes).
4. Meanwhile, put the office phone numbers on your social pages so
   customers can still reach you.

## 14. Security incident escalation

Treat any of these as an incident: a staff account used by someone
else, a lost phone or laptop with access, strange changes in the Audit
Log, customer data seen where it shouldn't be, or a message claiming
your site has been hacked.

1. **Immediately:** tell the Administrator and the developer. Don't
   delete anything — evidence matters.
2. **Within the hour:** the Administrator disables the affected
   account(s) and the developer changes the website's secret keys.
3. **If customer personal data may have been exposed:** the owner
   decides, with advice, whether to report it to the Information
   Commissioner's Office — this must be done **within 72 hours** of
   becoming aware of a reportable breach — and whether to tell the
   people affected. Record what happened, when, and what was done.

## 15. Routine maintenance

| How often | Task | Who |
|---|---|---|
| Daily | Check Leads (while emails are off, several times a day) | Staff |
| Weekly | Look for "Overdue" leads; check the Audit Log for anything unexpected | Manager |
| Monthly | Apply security updates to the website software and re-run the test suite (`TEST_REPORT.md`) | Developer |
| Monthly | Remove staff accounts for anyone who has left | Administrator |
| Quarterly | Test restoring a backup (once a database exists) | Developer |
| Yearly | Renew and re-check redress scheme, Client Money Protection and insurance details on the site | Owner |

## 16. Getting technical support

- **Website code and history:** GitHub repository (branch
  `segment-1-audit` today).
- **Developer "start here":** `TECHNICAL_HANDOVER.md` and `README.md`.
- **What's tested and how:** `TEST_REPORT.md`.
- **What's still open:** `REQUIREMENT_TRACEABILITY.md` and the
  **Content** page in admin.
- When asking for help, say what you were doing, what you expected,
  what happened, and the time — and never send passwords by email.
