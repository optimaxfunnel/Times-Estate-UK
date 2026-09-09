# LAUNCH_CHECKLIST.md — Times Estates (Times Estate Ltd)

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
