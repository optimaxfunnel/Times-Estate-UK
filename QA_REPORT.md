# QA_REPORT.md — Times Estate Ltd (Phase 1)

## Status of this document

Today's (2026-09-08) Phase 1 QA snapshot — the safe checks explicitly
requested, run against the existing build. **This is not a
replacement for `TEST_REPORT.md`**, which remains the full, detailed,
dated technical test record (including the critical defect below) and
should be read for anything not covered here.

## Checks run today

| Check | Command | Result |
|---|---|---|
| TypeScript | `npm run typecheck` | Pass, 0 errors |
| Lint | `npm run lint` | Pass, 0 errors/warnings |
| Formatting | `npm run format` | Pass |
| Unit/component tests | `npm run test` | Pass — 64/64 |
| Dependency audit | `npm audit` | 0 vulnerabilities |
| Local preview | `next dev` (port 3000) | Started successfully; home, `/buy`, and a property detail page loaded and screenshotted correctly at desktop and mobile widths |
| Secret scan (spot check) | Manual review | No secrets found in tracked files |

**Not run today, deliberately:** a fresh production build
(`next build && next start`), a live form submission, or a repeat
Lighthouse/accessibility scan — Day 7 already ran all of these in full
(`TEST_REPORT.md`), and re-running a form submission today risked
re-triggering the critical defect below for no new information.

## Carried-forward critical finding

**A critical, unresolved defect exists:** certain lead-form submissions
can hang the entire server (both `next dev` and a production build),
requiring a manual restart. Found and extensively investigated on Day
7 (`TEST_REPORT.md` §5); root cause not confirmed. **Nothing in
today's audit changed this — it must be assumed still present.** This
remains an absolute block on any deployment recommendation.

## New findings from today's audit

- Two phone numbers and a domain name were supplied and recorded (see
  `CONTENT_REGISTER.md`, `DECISIONS.md`) — a genuine, positive gap
  closure, not a defect.
- A previously-untracked compliance gap (tenancy deposit protection
  scheme membership) was identified and logged (`COMPLIANCE_REGISTER.md`).
- No new code defects were found in today's (narrower, non-form-
  submitting) testing pass.

## Overall QA status

| Area | Status |
|---|---|
| Code quality checks (type/lint/format/tests/audit) | Pass |
| Functional correctness (per Day 7's live testing) | Pass, with one critical exception |
| **Critical defect** | **Unresolved — launch blocker** |
| Content completeness | Improved today; several genuine gaps remain (see `CONTENT_REGISTER.md`) |
| Compliance readiness | Requires professional review (see `COMPLIANCE_REGISTER.md`) |

**Recommendation:** unchanged from Day 7 — not ready for deployment.
