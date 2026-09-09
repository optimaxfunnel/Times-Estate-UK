# QA_REPORT.md — Times Estates (Times Estate Ltd)

## Status of this document

**Phase 6 deliverable (2026-09-09) — the current, primary QA record.**
Tested against a real `next build && next start` **production** server
on `localhost:3000`, not the dev server, per this phase's explicit
instruction. Historical day-by-day test detail remains in
`TEST_REPORT.md`; this document supersedes it as the current-state
reference and is the one to read before any deployment decision.

**This document does not certify legal compliance.** It records what
was tested, what passed, what was fixed, and what remains open —
compliance sign-off is a separate professional-review step, tracked in
`COMPLIANCE_REGISTER.md`.

---

## 1. Executive release-readiness verdict

**Not ready for production deployment. One confirmed critical defect
remains an absolute blocker, unchanged in nature from Day 7 but now
confirmed to reproduce via a genuine mouse click, not only a scripted
submission.** Everything else tested — accessibility, performance,
SEO, security headers, dependency audit, brand consistency, broken
links — is in strong shape, including three real defects found and
fixed during this phase (a colour-contrast regression, a touch-target
size defect, and a layout-shift defect). See §8 for what was fixed and
§9 for what blocks launch.

---

## 2. Test matrix and exact results

| Check | Result |
|---|---|
| `npm run typecheck` | **Pass**, 0 errors |
| `npm run lint` (ESLint) | **Pass**, 0 errors/warnings |
| `npm run format` (Prettier) | **Pass** |
| `npm run test` (Vitest) | **Pass — 69/69** (65 pre-existing + a new 5-test file added this phase for the hero slideshow's reduced-motion/keyboard behaviour, since no browser tool available here can force an OS-level `prefers-reduced-motion` preference — see §4) |
| `npm run build` (`next build`, production) | **Pass** — compiled successfully, 33 routes, 0 errors/warnings |
| `npm audit` | **0 vulnerabilities** |
| Route/broken-link crawl (31 URLs: every static page, every footer/nav link, sitemap/robots, both logo files, 2 sampled property-detail pages) | **0 broken** — every URL returned 200 |
| Form validation, success, failure | **Pass for the safe category** — a real sales-valuation submission on `/sell` (genuine `button.click()`, not a script shortcut) returned a success message with a reference number in under 10ms. Field-level validation errors were confirmed to render correctly (pre-existing behaviour, unchanged, verified in place) |
| Form spam protection | **Pass (unchanged)** — the honeypot field and rate limiting are pre-existing, code-reviewed, not modified this phase |
| **Critical end-to-end journey — lead form submission (rental valuation, `/let`)** | **FAIL — confirmed critical defect, see §8** |
| Automated accessibility scan (Lighthouse/axe, mobile) | Home, `/buy`, `/sell`: **Accessibility 100** after fixes (was 97, two real defects found — see §4). Property detail: **100** |
| Cross-browser | **Not performed** — only a Chromium-based automated browser was available in this environment; no Firefox/Safari/WebKit engine to test against. Flagged as a genuine testing gap, not silently skipped |

---

## 3. Performance results by representative route (mobile, Lighthouse, simulated throttling, production build)

| Route | Performance | Accessibility | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` (home, with hero slideshow) | 96 | 100 | 100 | 100 | 2.7s | 0 | 50ms |
| `/buy` (search results) | 96 | 100 | 100 | 100 | 2.7s | 0 | 70ms |
| `/sell` (conversion form) | 97 | 100 | 100 | 100 | 2.6s | 0 | 40ms |
| `/property/[id]` (detail) | 97 | 100 | 100 | **69*** | 2.6s | 0 | 50ms |

**Targets:** Performance 90+ ✅, Accessibility 100 ✅, Best Practices 95+
✅, SEO 95+ ✅ (except *, see below), LCP <2.5s **narrowly missed**
(2.6–2.7s across every route), CLS <0.1 ✅ (0 everywhere, after the
fix in §4), INP <200ms — not directly measurable by Lighthouse's lab
simulation (it measures TBT as a proxy; TBT is 40–70ms everywhere,
consistent with a healthy INP).

***Property detail's 69 SEO score is by design, not a defect:** every
demo property carries `<meta name="robots" content="noindex, follow">`
(`web/src/app/property/[id]/page.tsx:38`, conditional on
`isDemo`), deliberately excluding fabricated listings from search
indexing per `SEO_PLAN.md`. Lighthouse's `is-crawlable` audit
penalises any `noindex`, without knowing it's intentional. Real
listings (once supplied) will not carry this flag and will not incur
this penalty.

**LCP miss (2.6–2.7s vs. 2.5s target):** small and consistent across
every route, not specific to the hero slideshow. The main contributor
Lighthouse identified is a single ~8.5KB render-blocking CSS chunk
(~165ms). This is a minor, non-blocking finding — recommended follow-
up (not done this phase, out of scope for a QA pass): consider critical-
CSS inlining or font preload hints if a tighter LCP budget is wanted
later.

**Verification method note:** every Lighthouse run in this table used
a freshly isolated Chrome profile (`--user-data-dir` pointed at a new
temp directory each time) after discovering that repeated `npx
lighthouse` invocations were intermittently reconnecting to a stale,
orphaned Chrome process left over from a prior run's cleanup failure —
which produced two runs of wildly inflated, false CLS/contrast
numbers before this was caught and corrected. Numbers in this table
are from the corrected, isolated-profile runs.

---

## 4. Accessibility findings

**Two real defects found and fixed this phase** (both introduced by
Phase 5's rebrand, not pre-existing):

1. **Colour contrast (WCAG AA, 1.4.3) — critical, site-wide.** The
   brand's Copper Orange (`#D9772E`) reaches only 3.16:1 against white
   — below the 4.5:1 minimum for text — but was used as the fill for
   every primary button's white text, and as the text colour for
   eyebrow labels and links on white backgrounds, across the entire
   site. The semantic "warning" colour had the identical problem
   (3.91:1). **Fixed**: `--color-accent` and `--color-warning` now
   hold darkened, AA-passing shades for light-background use; the
   original bright shades are kept as `--color-accent-vivid` for the
   few dark-background contexts where they already passed. See
   `DECISIONS.md` for the full account and exact hex values.
2. **Touch target size (WCAG 2.2 SC 2.5.8) — the hero slideshow's
   slide-indicator dots.** 10×10px, below the 24×24px minimum. **Fixed**:
   the visible dot stays small; the button's hit area is now 24×24px.

**Confirmed via automated scan (Lighthouse/axe) + manual testing:**

- **Keyboard:** every interactive control (nav, forms, slideshow prev/
  next/dots/pause, search tabs) is reachable via Tab in a sensible
  order; a visible focus ring (`:focus-visible`, blue, high-contrast
  against both black and white/orange) was confirmed by direct
  screenshot on the slideshow's dot controls.
- **Landmarks and labels:** header (`banner`), nav (`Primary`), main
  (`#main-content` with a skip link), footer (`contentinfo`) all
  present; every icon-only control (mobile phone icon, hamburger menu,
  slideshow controls, favourite button) has an accessible name.
- **Reduced motion:** the slideshow's autoplay is driven by
  `window.matchMedia("(prefers-reduced-motion: reduce)")`, checked
  both at mount (lazy initial state, not a post-mount effect, so it
  never "starts then stops") and on live preference change. **Verified
  by a new automated test suite**
  (`web/src/components/home/HeroSlideshow.test.tsx`, 5 tests), because
  no browser automation tool available in this environment can force
  an OS-level reduced-motion preference for a live visual check — this
  is a genuine testing-environment limitation, addressed by testing
  the logic directly instead of relying on browser emulation that
  doesn't exist here. The existing global CSS reduced-motion rule
  (`web/src/app/globals.css`) is unchanged and still collapses all
  animation durations.
- **Persistent pause control (WCAG 2.2.2):** confirmed present (a real
  play/pause toggle, not just pause-on-hover) — required because the
  slideshow moves on its own.
- **No layout shift from the slideshow:** confirmed via Lighthouse
  (CLS 0) and by direct screenshot comparison across slide transitions
  — the cross-fade is purely an opacity transition on absolutely
  positioned, identically sized panels, so nothing reflows.
- **Zoom/reflow:** no horizontal overflow confirmed at 320px viewport
  width (`document.documentElement.scrollWidth` = `window.innerWidth`
  exactly). Full 200%-browser-zoom testing was not performed — this
  tool's browser automation doesn't expose a zoom control distinct
  from viewport resizing, which is a related but not identical check;
  flagged as a gap, not silently assumed passing.
- **Contrast (beyond the fix above):** ink-on-white (17.9:1), white-
  on-ink (18.1:1), and every other pairing in `BRAND_GUIDELINES.md`'s
  corrected table pass AA or AAA.

---

## 5. SEO and structured-data findings

- **Metadata:** every page has a unique title (via the `%s | Times
  Estates` template), a description, and a canonical URL — spot-
  checked on home, `/buy`, `/sell`, property detail.
- **Open Graph / Twitter Card:** present sitewide (`og:title`,
  `og:description`, `og:site_name`, `og:locale`, `og:type`,
  `twitter:card`). **Gap, non-blocking:** no `og:image` is set anywhere
  — there is no real-brand Open Graph share image yet (the only one
  that ever existed was built for the now-superseded Claret identity).
  A shared link will render without a preview image on social
  platforms until one is made. Recorded in `CONTENT_REGISTER.md`.
- **`robots.txt` and `sitemap.xml`:** both generated correctly,
  disallow `/admin` and `/favourites`, reference each other correctly.
  (`sitemap.xml` URLs currently resolve to `localhost:3000` because
  `NEXT_PUBLIC_SITE_URL` defaults to that locally — correct behaviour,
  not a bug; must be set to the real domain before any real
  deployment, already tracked in `DEPLOYMENT.md`.)
- **Structured data (JSON-LD), validated for shape and honesty:**
  - `RealEstateAgent` (every page): now emits both `name` ("Times
    Estates") and `legalName` ("Times Estate Ltd") — fixed this
    session to reflect the approved naming split rather than only the
    legal name. Deliberately omits `telephone`/`email`/
    `aggregateRating`/`review` — none are Confirmed facts appropriate
    for schema-level assertion yet (unchanged policy, verified still
    correctly absent).
  - `BreadcrumbList` (property detail): well-formed, correct
    `ListItem` sequence with absolute URLs.
  - `RealEstateListing` (property detail): **confirmed, by reading the
    code, to return `null` for every demo property** (`isDemo: true`)
    — since every property in the system today is demo data, this
    markup is correctly never emitted anywhere live. This is a
    deliberate anti-misleading-data safeguard (`SEO_PLAN.md`), not an
    oversight.
- **No unsupported claims found:** a targeted scan for common invented-
  content patterns ("award-winning," "5-star," "years of experience,"
  "market leader," "guaranteed return," "testimonial," etc.) across
  every page's source returned zero matches.

---

## 6. Security/privacy findings

- **Dependency audit:** `npm audit` — 0 vulnerabilities.
- **Secrets:** a targeted scan for API-key-shaped strings, hardcoded
  passwords, and common secret prefixes across all source files
  returned zero matches. `.env` is correctly git-ignored at both repo
  root and `web/`; nothing resembling a real credential is tracked.
- **No real email-sending integration exists anywhere in the
  codebase** (confirmed by search — no `nodemailer`, SMTP client, or
  transactional-email API call anywhere), matching
  `EMAIL_AND_FORM_ROUTING.md`'s stated status exactly. Forms cannot
  reach a real inbox today even if submitted.
- **No analytics or tracking script exists anywhere** (confirmed by
  search — no `gtag`, Google Analytics, Meta Pixel, or similar).
  `/cookie-policy`'s claim of "nothing to consent to yet" is accurate
  as of this check.
- **Admin authentication remains a development-only mock**
  (unchanged, previously documented in `SECURITY.md`/
  `ADMIN_AND_CMS.md`) — not touched or re-tested this phase since no
  code in that area changed; still not production-grade.
- **Security headers / CSP:** unchanged from Day 6 (`SECURITY.md`), not
  re-audited line-by-line this phase since no header configuration was
  touched — spot-checked that the production build still serves them
  (confirmed present via response headers during route crawl).

---

## 7. Compliance and factual approvals outstanding

No change to the substance of `COMPLIANCE_REGISTER.md` this phase —
every "Requires verification" and "Missing" row there (redress scheme,
CMP, tenancy deposit scheme, professional indemnity schedule,
professional body membership, AML supervision, real fee figures, EPC
ratings once real listings exist, material-information legal review,
complaints-procedure legal review) remains exactly as it was, still
outstanding, still requiring the named professional or the owner's own
confirmation — **this QA phase does not, and cannot, clear any of
those**. See `COMPLIANCE_REGISTER.md` for the full register.

---

## 8. Defects fixed this phase

| # | Defect | Severity | Where | Fix |
|---|---|---|---|---|
| 1 | White-on-orange and white-on-warning-gold text contrast measured 3.16:1 / 3.91:1, below the 4.5:1 WCAG AA minimum, on every primary button and status badge site-wide | **Critical (accessibility)** | `web/src/app/globals.css` design tokens | Darkened `--color-accent` (5.3:1) and `--color-warning` (5.6:1); added `--color-accent-vivid` for the dark-background contexts that already passed |
| 2 | Hero slideshow slide-indicator dots were a 10×10px touch target, below WCAG 2.2's 24×24px minimum | **Major (accessibility)** | `web/src/components/home/HeroSlideshow.tsx` | Wrapped the small visible dot in a 24×24px button |
| 3 | Header/footer logo `<img>` tags had no `width`/`height`, causing a 0.505 CLS (footer reflowing once the SVG's real size loaded) | **Major (performance/accessibility, WCAG 2.2 SC 2.4.11-adjacent stability)** | `web/src/components/layout/Header.tsx`, `Footer.tsx`, `PropertyGallery.tsx` | Added explicit `width={900} height={140}` to both logo images (matching the SVG's own viewBox ratio); added `aspect-[4/3]` to the currently-unused real-photo gallery element pre-emptively |

Each fix was verified by rebuilding the production bundle, restarting
the server, and re-running the full check suite (typecheck/lint/test/
Lighthouse) — not just edited and assumed correct.

---

## 9. Remaining blockers and non-blockers

**Blocking (must be resolved before any deployment recommendation):**

- **CRITICAL — the server-hang defect from `TEST_REPORT.md` §5 is
  confirmed still present**, and now confirmed to reproduce via a
  genuine mouse click (not only a scripted form submission) on the
  `/let` rental-valuation form: the production server stopped
  responding to every request, and the Node process's CPU time climbed
  continuously while hung (32.8s → 45.8s over 3 seconds), matching Day
  7's measurements. The process was killed and the server recovered
  cleanly, but **a single visitor could take the entire site offline
  for everyone else, with no code-level fix identified** (root cause
  still not found — this environment has no profiler, and pinning a
  different Next.js version is a stack migration requiring explicit
  owner approval, not assumed here). See `DECISIONS.md` for a proposed
  operational mitigation (an external process watchdog) that limits
  impact without requiring the root cause first.
- Admin authentication is still a development-only mock — must not be
  exposed publicly as-is (unchanged from Day 6/7).
- Every "Requires verification"/"Missing" item in
  `COMPLIANCE_REGISTER.md` (§7 above) — none of these are QA items;
  they need the owner or a named professional.

**Non-blocking (tracked, not urgent):**

- LCP 2.6–2.7s vs. a 2.5s target (small, consistent, minor render-
  blocking CSS — see §3).
- No Open Graph share image exists for the real brand (§5).
- Cross-browser testing beyond Chromium was not possible in this
  environment (§2).
- 200%-zoom testing was not directly performed (§4).
- `BRAND_GUIDELINES.md`'s stationery/social pack still describes the
  superseded Claret identity — unrelated to this phase's code QA,
  tracked separately since Phase 4.

---

## 10. Launch-decision checklist

See `LAUNCH_CHECKLIST.md` for the concise, standalone version of this
section.
