# EMAIL_AND_FORM_ROUTING.md — Times Estates (Times Estate Ltd)

## Status of this document

Phase 4 deliverable (2026-09-09). This is a **plan, not a
purchase or a configuration that has happened.** No mailbox, alias,
DNS record, or third-party mail service has been created or connected
— doing so involves a paid service and a third-party integration,
both requiring the owner's explicit approval under `CLAUDE.md` Rule 4
before any account is opened or any DNS record is changed. Nothing
here has been actioned.

**Domain status:** `timesestates.co.uk` is recorded elsewhere
(`CONTENT_VERIFICATION_REGISTER.md` item 11) as supplied by the owner,
**not independently verified as owned/controlled by Times Estate
Ltd.** Before any of the DNS work below can actually happen, the owner
needs access to that domain's DNS control panel (at whichever
registrar it's held with) — this document assumes that access exists
but does not verify it.

The twenty addresses in the Phase 4 brief are **proposed**, not
confirmed existing mailboxes — none of them currently receive mail.

---

## 1. Provider options (comparison only — no provider chosen)

| Provider | Cost shape (indicative, verify current pricing before deciding) | Fit for a lean small-agency setup |
|---|---|---|
| **Google Workspace (Business Starter)** | Per-user/month, no free tier | Strong spam filtering, generous alias support per mailbox, familiar to most staff |
| **Microsoft 365 (Business Basic)** | Per-user/month, no free tier | Good if the business also wants Office apps/Teams; similar alias support |
| **Zoho Mail** | Genuinely free tier for a small number of users/aliases on a custom domain, paid tiers beyond that | Lowest cost to start; smaller ecosystem, still supports SPF/DKIM/DMARC properly |
| **Domain registrar's own email forwarding** | Often free or very cheap | Aliases/forwarding only, no real inbox, no MFA, weaker spam filtering — fine only for pure forward-to-another-address addresses, not for a monitored inbox |

**This document does not recommend a specific paid provider** — that's
a cost decision for the owner (Rule 4). What follows is written so it
applies to whichever is chosen; provider-specific setup steps (where
to paste the DNS record) differ, but the record content and reasoning
don't.

---

## 2. Mailbox, alias, and group plan — lean by design

**Principle:** pay for a real, licensed mailbox only where someone
genuinely needs to read and reply from that specific address day to
day. Everything else is a free alias that forwards into a real
mailbox — this is how the 20 requested addresses can exist without 20
paid seats.

### 2.1 Real mailboxes (licensed, logged into directly)

| Mailbox | Why it needs to be real, not an alias |
|---|---|
| **hello@timesestates.co.uk** | The primary, day-to-day monitored inbox — the default destination for most aliases below. |
| **complaints@timesestates.co.uk** | Complaints handling has its own timescale/record-keeping expectations tied to the redress scheme (`COMPLIANCE_REGISTER.md`) — a real mailbox with its own audit trail (received/read/replied timestamps) is safer than a forwarding rule that could silently misfire. |

Two licensed mailboxes is the minimum for a lean, defensible setup.
**As the team grows, promote further addresses to real mailboxes or to
shared group inboxes (§2.3)** rather than adding more forwarding rules
that get harder to track.

### 2.2 Aliases (no separate inbox — forward into a real mailbox)

| Alias | Forwards to | Purpose |
|---|---|---|
| info@ | hello@ | General enquiries synonym |
| sales@ | hello@ | Sales enquiries |
| lettings@ | hello@ | Lettings enquiries |
| commercial@ | hello@ | Commercial enquiries |
| management@ | hello@ | Property management enquiries |
| valuations@ | hello@ | Valuation requests |
| landlords@ | hello@ | Landlord-specific correspondence |
| tenants@ | hello@ | Tenant-specific correspondence |
| repairs@ | hello@ | Repair reports (mirrors `/report-a-repair`) |
| viewings@ | hello@ | Viewing bookings/confirmations |
| offers@ | hello@ | Offer correspondence — **flag:** offers should also always be confirmed by phone/in person per normal agency practice; email is a record, not the sole channel |
| accounts@ | hello@ initially | Financial correspondence — **recommend promoting to its own real mailbox (or the owner's/bookkeeper's existing one) once transaction volume justifies it; do not mix financial records into the general inbox long-term** |
| compliance@ | hello@ | Regulatory/compliance correspondence |
| privacy@ | hello@ | UK GDPR data-subject requests and privacy queries — **recommend this reaches whoever is designated to handle data-subject rights; currently unassigned, flag to the owner** |
| marketing@ | hello@ | Marketing-related correspondence (agents, portals, printers) |
| careers@ | hello@ | Exists for when a hiring need arises — no careers page exists yet (`SITEMAP.md` §"Pages considered but not included") |
| postmaster@ | hello@ | **Required by internet mail standards (RFC 2142)** for any domain that sends mail — receives bounce/delivery-problem reports. Do not skip this one even though it wasn't in the original list's emphasis. |
| abuse@ | hello@ | **Also an RFC 2142 standard address** — receives abuse reports about the domain (e.g. if the domain is ever used to send spam, a reporting party expects this address to exist) |

### 2.3 Shared/group pattern (recommended growth path, not needed on day one)

Once more than one person needs to see the same queue (e.g. two people
handling lettings enquiries), most providers support a **group alias**
that delivers one copy of each message into several real mailboxes or
a shared inbox, rather than a single forward. Recommended order to
convert, as the team grows: lettings@ and sales@ first (highest
volume), then commercial@ and management@.

### 2.4 Special-purpose address: noreply@

**noreply@timesestates.co.uk** is not for a human to read — it's the
**From:** address for automated transactional email the website sends
(booking confirmations, alert emails), once an email-sending service
is actually connected (`INTEGRATIONS.md` — not done today, a Rule 4
decision). It must still have a **monitored Reply-To** (§4) so a
recipient who hits "reply" doesn't send mail into a void.

---

## 3. DNS: MX, SPF, DKIM, staged DMARC

**None of the records below have been created.** They're written here
so that whichever provider is chosen, the owner (or whoever holds
registrar access) has the exact records and reasoning ready to paste
in, rather than needing to research this from scratch.

### 3.1 MX records

Point to the chosen provider's mail servers exactly as that provider's
own setup wizard specifies (values differ by provider and change over
time — always copy them from the provider's live setup page, not from
a document like this one, which could go stale).

### 3.2 SPF (one TXT record only — a domain can have just one)

```
v=spf1 include:<provider's SPF include> -all
```

Use `-all` (hard fail) once testing confirms every legitimate sending
source is included; use `~all` (soft fail) during the first 1–2 weeks
of testing so a missed sending source doesn't get hard-rejected while
still being caught in delivery testing (§6).

### 3.3 DKIM

Enable DKIM signing in the provider's admin console (this generates
the key pair) and publish the TXT record it gives you at the exact
selector/host it specifies. Use a 2048-bit key if the provider offers
a choice — stronger than the older 1024-bit default some providers
still default to.

### 3.4 DMARC — staged rollout, not switched on at full strength immediately

| Stage | Record | Duration | Purpose |
|---|---|---|---|
| **1. Monitor** | `v=DMARC1; p=none; rua=mailto:dmarc-reports@timesestates.co.uk; pct=100` | 2–4 weeks | Collect aggregate reports on what's sending mail as the domain, with **no enforcement** — see what would break before anything is blocked |
| **2. Partial enforcement** | `v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc-reports@timesestates.co.uk` | 1–2 weeks, then raise `pct` to 100 if reports look clean | Start quarantining failures for a quarter of mail, watch for problems before going further |
| **3. Full enforcement** | `v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@timesestates.co.uk` | Ongoing | Reject mail that fails SPF/DKIM alignment — the real anti-spoofing protection this whole chain exists for |

`dmarc-reports@` is itself a new alias this plan needs — add it to
§2.2, forwarding to hello@ (or to whoever reviews DMARC reports; these
reports are technical XML files, not typically useful to a
non-technical reader without a report-parsing tool).

---

## 4. Reply-To handling for automated (transactional) mail

Automated mail from the website (once a provider is connected) should:

- **From:** noreply@timesestates.co.uk (so a bounce or spam-report
  doesn't land on a real staff mailbox)
- **Reply-To:** the relevant queue alias for that message type — e.g.
  a viewing-confirmation email sets `Reply-To: viewings@
  timesestates.co.uk`, a valuation acknowledgement sets `Reply-To:
  valuations@timesestates.co.uk` — so a recipient who simply hits
  "reply" reaches a monitored inbox, not noreply@.

## 5. Authenticated form sending

The website's own forms (existing `LeadForm` pipeline,
`AUTOMATION_WORKFLOWS.md`) do not send any email today — no provider
is connected. When one is (a Rule 4 decision, and an `INTEGRATIONS.md`
comparison, not assumed here), the sending method must:

- Send through the chosen provider's own authenticated SMTP relay or
  transactional-email API (not a raw, unauthenticated `mail()` call
  from the server) so SPF/DKIM alignment actually passes.
- Never let a website visitor's own submitted email address appear in
  the **From:** header (a classic spoofing/deliverability mistake) —
  the visitor's address goes in **Reply-To** or in the message body,
  and **From:** stays noreply@.
- Rate-limit and validate exactly as the existing lead pipeline
  already does for form submissions, so the email-sending step can't
  be abused to send arbitrary mail through the domain's reputation.

## 6. Delivery testing (before relying on any of this)

1. Send a test message to a free SPF/DKIM/DMARC checking tool (e.g.
   mail-tester.com or equivalent) from the real hello@ mailbox and
   confirm all three pass and the spam score is clean.
2. Send a real external test email to each alias in §2.2 from an
   outside account (e.g. a personal Gmail) and confirm it actually
   arrives at hello@ (or complaints@) — don't assume a forwarding rule
   works just because it was configured; verify it.
3. Once a transactional sender exists (§5), send a real test booking
   confirmation and check both the **From**/**Reply-To** headers and
   that a reply genuinely reaches the intended alias's inbox.
4. Re-run step 1 after each DMARC stage change in §3.4 — a policy
   change can surface a previously-hidden alignment problem.

---

## 7. MFA and permissions

- **Multi-factor authentication is required on every real mailbox
  login** (hello@, complaints@, and any future promoted mailbox) —
  aliases have no login of their own, so this applies wherever the
  provider account itself is concerned.
- **Access is per person, never a shared password.** Provider admin
  consoles support delegated/shared-mailbox access without handing out
  the actual account password — use that mechanism, not credential
  sharing. **This project will never ask for, store, or expose a real
  mailbox password or API key** — the owner sets these up directly in
  the chosen provider's own console.
- **Admin/owner role:** whoever holds the domain and billing
  relationship (presumably the owner) should hold the top-level admin
  role; day-to-day staff get only the mailbox access they need, not
  admin rights, following normal least-privilege practice.

## 8. Retention and backups

- **General correspondence** (hello@ and most aliases): a working
  recommendation of retaining mail for at least 2 years is reasonable
  for a small agency, but **the exact period for financial and
  complaints-related correspondence should be confirmed with an
  accountant/compliance adviser** (CLAUDE.md Rule 5) rather than
  asserted here — UK financial record-keeping commonly runs longer
  (accountants often cite 6 years for tax-relevant records) and
  redress-scheme expectations for complaints records may specify their
  own period.
- **Backups:** rely on the chosen provider's own built-in retention/
  backup feature (e.g. Google Vault, Microsoft 365 retention policies,
  Zoho's retention settings) rather than building a separate backup
  system — proportionate for a mailbox setup this size, and avoids
  introducing a second place where the same personal data lives
  (`PRIVACY_DATA_MAP.md`'s existing principle of minimising where data
  is copied to).

---

## 9. What this Phase deliberately did not do

- **Did not create any mailbox, alias, or DNS record.** Everything
  above is a specification to execute once the owner approves a
  provider and cost (Rule 4).
- **Did not choose a mail provider** — a cost decision left to the
  owner, with options compared, not decided, in §1.
- **Did not connect any email-sending service to the website's forms**
  — the existing `LeadForm` pipeline still does not send email to
  anyone; §5 specifies how it should work once that changes.
- **Did not request, generate, or handle any real credential** —
  nothing in this document required or produced a password, API key,
  or DNS-panel login.
