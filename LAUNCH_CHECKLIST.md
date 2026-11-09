# LAUNCH_CHECKLIST.md — Times Estates (Times Estate Ltd)

> **Restored 9 November 2026 from the project's git history** (commit
> `5284b25`, 30 October 2026). This file was missing from the folder on
> this computer. Any changes made to it between 31 October and
> 2 November could not be recovered, so Day 7 updates may be absent.
> Anything dated 9 November was added after the restore. See
> `RECOVERY_REPORT_2026-11-09.md`.

---

## Verdict: NO-GO

### Must be done before launch

- [x] **Lost tests rewritten.** 241 pass (9 Nov), against 157 on 31 Oct
- [x] **Full QA re-run after recovery (9 Nov):** axe 74 scans / 0
  violations; no sideways scrolling at 6 widths (1 fix); Lighthouse
  100 on desktop; see `QA_REPORT.md`
- [x] **Owner decision (9 Nov):** keep the intro video on every
  first-visited page, accepting a slower first mobile visit (about
  3.5 s). See `DECISIONS.md`.
- [ ] **Correct the cookie table** on `/cookie-policy` (out-of-date
  cookie name; two storage items missing). Part of the solicitor review.
- [ ] Testing with a screen-reader user
- [ ] **Approve and apply the Next.js upgrade** ("approve the Next.js
  upgrade")
- [ ] **Choose and connect a database**, so that leads aren't lost
  on restart
- [ ] **Real staff sign-in with two-step verification**
- [ ] **Email provider, form recipients and reply-to addresses**
  approved
- [ ] **Fees and tenant fees** published with real amounts
- [ ] **Redress and CMP memberships** verified; CMP certificate
  published
- [ ] **Solicitor review** of all legal pages
- [ ] **Real listings** replace the sample properties
- [ ] Domain ownership confirmed; DNS, monitoring and backups set up
  (`DEPLOYMENT.md`)
- [ ] The owner writes exactly: **"I approve production deployment."**

### Already in place

- [x] Production build passes (41 pages, re-checked 9 Nov)
- [x] Type-check, lint and the surviving tests pass (re-checked 9 Nov)
- [x] Server-hang defect fixed and guarded by a test
- [x] Security headers in place
- [x] No tracking, so no cookie banner is needed yet
- [x] Demonstration content labelled everywhere
- [x] Deployment and rollback procedures written (not exercised)

---


## Status of this document

Phase 6 deliverable (2026-09-09). A concise, plain-English go/no-go
list for the business owner. Full evidence for every line is in
`QA_REPORT.md`; full regulatory detail is in `COMPLIANCE_REGISTER.md`.
**Nothing on this page is a legal-compliance certification** — items
marked "professional confirmation needed" require a named professional
or the owner's own sign-off, not this project's testing.

## ❌ Blockers — must be resolved before deployment can even be considered

- [ ] **Fix the critical server-hang defect.** Confirmed still present
      today, via a real click, not just an automated script — a single
      visitor can take the whole site offline. No code fix exists yet;
      needs either root-causing (a Node profiler, not available in
      this environment) or a Next.js version change (needs your
      explicit approval, since it's a stack migration). See
      `QA_REPORT.md` §9 and `TEST_REPORT.md` §5.
- [ ] **Replace the admin area's mock login** with real authentication
      before the admin area is ever exposed publicly.

## ⚠ Needs your decision or a professional's confirmation — not a QA/code item

- [ ] Redress scheme membership (Property Redress Scheme) — independently verify
- [ ] Client Money Protection membership — independently verify
- [ ] Tenancy deposit protection scheme — supply details
- [ ] Professional indemnity insurance schedule (actual figures) — supply
- [ ] Professional body membership (e.g. Propertymark) — supply if applicable
- [ ] AML supervision registration — supply
- [ ] Real fee figures (sales/lettings/management) — supply
- [ ] Solicitor review of: Privacy Policy, Cookie Policy, Terms of
      Website Use, Complaints Procedure, material-information
      disclaimer
- [ ] Opening hours — supply
- [ ] Construction services — you've already decided this stays a
      mention-only line, not a page (recorded, done)

## ✅ Confirmed working (Phase 6 testing)

- [x] Real brand (black + orange, real logo) applied consistently
      site-wide, no leftover old colours found anywhere in the code
- [x] Type-checking, linting, formatting, and all 69 automated tests pass
- [x] Production build completes cleanly (33 routes, 0 errors)
- [x] No broken links anywhere on the site (31 URLs checked)
- [x] Accessibility: 100/100 (Lighthouse) on every page checked, after
      fixing a real colour-contrast defect and a touch-target-size
      defect found during this phase
- [x] Performance: 96–97/100, good Core Web Vitals (CLS 0 after a
      fix, small LCP overage — see below)
- [x] SEO: 100/100 on ordinary pages; demo property pages correctly
      excluded from search indexing on purpose
- [x] No exposed secrets, no real email-sending capability, no
      analytics/tracking script anywhere — nothing that could reach a
      real person or a real inbox exists yet
- [x] `npm audit`: 0 dependency vulnerabilities

## ℹ Minor, non-blocking items

- [ ] Page load speed (LCP) is about 100–200ms over the internal
      target on a simulated slow mobile connection — small, not urgent
- [ ] No preview image yet for shared links on social media (Open
      Graph image)
- [ ] Testing could only be done in one browser engine (Chromium) —
      no Firefox/Safari testing was possible in this environment

## What happens next

Nothing is deployed, and nothing will be, until you say the exact
words **"I approve production deployment"** (`CLAUDE.md` Rule 6) — and
even then, the critical server-hang defect above must be fixed first;
it is a launch blocker regardless of any approval.
