# CHANGELOG.md — Times Estate Ltd Website Project

All notable changes to this project are recorded here, most recent first.
This is a project log, not a marketing document — it should stay accurate
and plain.

## 2026-10-30 (Day 6 Tasks 2–3 — SEO and regulatory readiness)

- Header shows both phone numbers (landline, then mobile) as the owner asked.
- SEO: descriptions and canonical addresses added to five pages that lacked
  them; /favourites marked noindex; sitemap now 26 pages incl. new
  /company-information (/areas stays out, noindexed); structured-data and
  indexing tests added (6). SEO_PLAN.md: full Day 6 plan.
- New /company-information page (company disclosure, each fact with its status);
  linked in the footer.
- REGULATORY_READINESS.md: topic-by-topic readiness table for solicitor/compliance
  review, with sources. No compliance is claimed.
- Tests 133 → 139.

## 2026-10-30 (Day 6 Task 1 — content)

- Internal "not yet supplied" notes are now hidden on the public build
  (shown in development, or on staging with NEXT_PUBLIC_SHOW_CONTENT_NOTES=true);
  some are replaced by a plain public line. New staff page /admin/content lists
  every open item and which ones block launch.
- Homepage hero: removed "across London" and "trusted local expert"; now names
  the Upper Tooting Road office. Commercial intro no longer implies a separate team.
- CONTENT_VERIFICATION_REGISTER.md: new current table using the Day 6 statuses.
- Tests 128 → 133.

## 2026-10-29 (Day 5)

- **Forms:** required/optional labels, browser-side checks with error
  summary, confirmation page, landlord/vendor enquiry, privacy wording.
- **Valuations and viewings:** internal valuation record (Manager/Admin
  only; never automated); viewing booking needs confirmed occupier
  access; future-date check; assigned-staff routing.
- **Leads:** assignment, priority, follow-up editing; due-soon/overdue
  flags; full workflow table.
- **Repairs:** 5-file limit enforced; file signatures checked; tenancy
  reference; private storage rules (scan, signed links, retention);
  emergency guidance marked for review.
- **AI:** available-only suggestions; appointment and valuation
  refusals; injection detection; draft-only outbound module.
- **Docs:** AI_SAFETY_RULES, PRIVACY_DATA_MAP, AUTOMATION_WORKFLOWS,
  TEST_REPORT, INTEGRATIONS, CONTENT_VERIFICATION_REGISTER.
- Tests 94 → 128. No packages added; nothing connected.

## 2026-10-29 (Day 4 Task 5 + verification)

- **Added:** `lib/property/feeds/feed-adapter.ts` — CRM feed boundary
  (one adapter shape; six provider placeholders that refuse to run;
  imports validated, held for approval, never demo or verified) and its
  tests; `components/property/PropertyDetail.test.tsx`.
- **Fixed:** mobile overflow on the search pages caused by the category
  switcher (663px → 375px).
- **Docs:** `INTEGRATIONS.md` (feed requirements, risks, failure
  handling, ownership, open questions), `TEST_REPORT.md`,
  `PROJECT_PLAN.md`.
- Tests 86 → 94. No packages added; nothing connected; no customer data
  imported.

## 2026-10-29 (later) — Day 4: data model, secure admin, listings and search

- Data model: commercial EPC rating; field rules in code with tests (Task 1).
- Admin: signed, expiring, fail-closed session; development sign-in disabled in production; status workflow rules; refused attempts audited; proxy check (Task 2).
- Listings: category switcher; detail pages gain floor plans/brochure/tour, EPC panel, visible breadcrumb, phone route (Task 3).
- Search: tenure, furnishing, availability-date and floor-area filters; save-this-search; no-result suggestions (Task 4).
- Tests 69 → 86. No packages added; nothing connected.

## 2026-10-29 — Architecture confirmed, design system, core pages, responsive QA

**Added:** `/why-choose-us`, `/landlords`, `/buyers` (with `/tenants` redirect),
`/areas`; `app/global-error.tsx`; `ui/TextLink`, `ui/Skeleton`,
`ui/StatusPanel` (empty + error states) and a test file;
`scripts/check-contrast.mjs` (`npm run check:contrast`); tokens
`border-strong`, motion durations; two-tone focus ring.

**Changed:** form-field borders (1.3:1 → 3.76:1) and placeholders;
route loading state (skeletons); listing explorer empty state; nav and
XML sitemap for the new pages; Fees page now shows the legal-review
banner; Contact page contrast and list markup; 404 page title.
`TECHNICAL_ARCHITECTURE.md`, `INTEGRATIONS.md`, `DESIGN_SYSTEM.md`,
`TEST_REPORT.md` rewritten with earlier versions kept as historical.

**Packages:** none added. `npm audit fix` (non-breaking) updated
transitive dependencies; `next` upgrade held for approval.

**Checks:** typecheck, lint, format, 69/69 tests, contrast 17/17,
Lighthouse accessibility 100 on 10 pages, production build pass,
secret scan clean; `npm audit` 1 critical (next).

## 2026-10-20 — Front end rebuilt to the owner's reference homepage; supplied logo installed

**Scope:** the owner's instruction to build the front end to match
their reference homepage screenshot and install their new
clock-and-skyline logo, with the colour scheme left unchanged. Full
reasoning and the four deliberate departures from the reference in
`DECISIONS.md` (2026-10-20). Nothing deployed, nothing connected.

**Added**
- `brand/build-supplied-logo.mjs`, `brand/logo-supplied/` — the
  owner's original file and the emblem/favicon exports derived from it.
- `web/public/brand/times-estate-ltd-emblem{.webp,@2x.webp,.png}`.
- `web/src/components/brand/BrandLockup.tsx`, `components/icons.tsx`.
- `components/home/{HomeHero,HeroSearchCard,SkylineBackdrop,ServiceStrip,ValuationBand}.tsx`.
- `components/property/{ListingExplorer,FilterSidebar,SortSelect,Pagination,AreaPanel,PropertyImagePlaceholder}.tsx`.
- `lib/property/facets.ts`.

**Changed**
- `Header`, `MobileMenu`, `Footer` — rebuilt to the reference (grouped
  dropdown navigation from a new `headerNav` in `site-config.ts`,
  light footer). `PropertyCard` redesigned; `FavouriteButton` gains an
  icon variant; `Container` gains a `size="wide"` option.
- `/`, `/buy`, `/rent`, `/commercial/for-sale`, `/commercial/to-let` —
  all use the shared listing explorer.
- `lib/property/provider.ts`, `search-params.ts`, `format.ts` —
  multi-value filters, optional scope, price-part/description helpers.
- `web/src/app/icon.png`, `apple-icon.png` — emblem-on-white tiles.
- `globals.css` — removed the unused slideshow keyframe only; **no
  colour token changed.**

**Removed** (superseded, recoverable from git): `HeroSlideshow` (+
test), `HomeSearchTabs`, `SellLetCtaBand`, `PropertySearchForm`,
`PropertyResultsGrid`.

**Checks run:** typecheck, lint, Prettier, tests (66/66), production
build (33 routes), Lighthouse desktop 100/100/100
(accessibility/best-practices/SEO) and mobile accessibility 99→100
after fixes, route smoke tests with multi-value filters, dropdown and
mobile-menu interaction checks. Performance not re-measured today.

## 2026-09-08 — Phase 1: Audit, discovery and project foundation

**Scope:** a fresh audit pass requested via a "Phase 1" prompt,
against the existing Day 1–7 build — not a restart. Safe checks only;
no restructuring, no deployment, no new packages, no DNS/email/CRM
changes.

**Added**
- `PROJECT_BRIEF.md`, `WEBSITE_AUDIT.md`, `CONTENT_REGISTER.md`,
  `COMPLIANCE_REGISTER.md`, `DECISIONS.md`, `QA_REPORT.md` — each
  cross-references the existing, more detailed documents rather than
  duplicating them (see `DECISIONS.md`).

**Changed**
- `BUSINESS_REQUIREMENTS.md`, `CONTENT_VERIFICATION_REGISTER.md`,
  `CONTENT_REQUIRED.md` — recorded two newly-supplied phone numbers
  (landline 020 8672 8080, mobile +44 7779 991313) and a domain name
  (https://timesestates.co.uk, **not verified as owned/controlled,
  nothing deployed there**), each status "Supplied by owner." Added a
  previously-untracked compliance gap: tenancy deposit protection
  scheme membership (status: Missing).
- `web/src/lib/site-config.ts` — added `phoneLandline`/`phoneMobile`
  fields (replacing the unused `phone: null` field, which nothing had
  ever consumed).
- `web/src/app/contact/page.tsx` — now displays both phone numbers
  with a "Supplied by owner" badge, narrowing the previous blanket
  "phone/email/hours all Missing" notice to just email/hours.

**Checks run today:** typecheck, lint, format, unit tests (64/64),
`npm audit` (0 vulnerabilities), local preview started and screenshotted
at desktop/mobile — all pass. Full results in `QA_REPORT.md`. No form
was submitted live today, to avoid re-triggering the critical defect
recorded in `TEST_REPORT.md` §5, which remains unresolved and carried
forward unchanged.

**Not done today (explicitly out of scope):** no redesign, no new
packages beyond what already existed, no logo generated, no DNS
altered, no email configured, no CRM connected, no deployment, no
external domain browsed/verified.

## 2026-09-07 — Day 7: Final quality assurance, documentation, handover and deployment preparation

**Baseline check (before changing anything)**
- Ran typecheck, lint, tests and production build against Day 6's code —
  all passed.

**Added**
- `README.md` (repository root) and a rewritten `web/README.md` —
  previously the default `create-next-app` boilerplate.
- `DEPLOYMENT.md` — full deployment/rollback preparation (Task 6):
  environment checklist, variable list, hosting/domain/DNS, database
  migration, backup/restoration, monitoring, rollback, post-deployment
  verification, maintenance schedule. Prepared, nothing executed.
- `OPERATIONS_MANUAL.md` — plain-English staff guide covering every
  topic in today's brief (signing in, roles, CMS editing, approval,
  enquiries, repairs, AI drafts, failed notifications, backups,
  incident escalation, support).
- A requirement-traceability table (`TEST_REPORT.md` §1) comparing the
  built site against every approved planning document, using the exact
  six-status vocabulary requested.

**Changed**
- `web/src/components/ui/Section.tsx` usage on 7 pages — see "Findings"
  below.
- `web/next.config.ts` — CSP made dev/production-aware — see "Findings."
- `CLAUDE.md` — project-status section updated (had not been touched
  since Day 4; Days 5 and 6 were missing from it entirely).
- Ran `prettier --write .` across the codebase (90 files had drifted
  formatting accumulated over Days 3–6; no logic changed, confirmed by
  re-running the full check suite identically afterwards).

**Findings (defects found today)**
- **Fixed — major layout defect:** `/sell`, `/let`,
  `/property-management`, `/report-a-repair`, `/register`, `/contact`
  and `/property/[id]` were all silently rendering their intended
  two-column desktop layout as a single narrow stacked column, because
  layout classes were passed to the wrong prop on the shared `Section`
  component. Found during today's cross-device visual review; not
  caught in Days 3–6 because prior responsive checks looked for
  horizontal overflow, not for a specific intended arrangement. Full
  root-cause and fix in `TEST_REPORT.md` §3.
- **Fixed — Day 6 regression:** the Content-Security-Policy added Day 6
  had no `'unsafe-eval'` allowance, which broke `next dev` entirely
  (every page stuck on the loading fallback) because React's
  development build needs `eval()` for Fast Refresh debugging — a need
  React's own console message confirms production never has. Fixed
  with a `NODE_ENV`-gated policy; production is byte-for-byte
  unchanged. Full detail in `TEST_REPORT.md` §8.
- **Found, NOT fixed — CRITICAL, unresolved:** certain lead-form
  submissions cause the entire server to hang (CPU-pegged,
  unresponsive to every request) in both `next dev` and a production
  build, confirmed via two independent tools. Extensively investigated
  and several plausible causes ruled out (security headers, production-
  only behaviour, every line of the lead-submission code); root cause
  not confirmed. **This is an absolute launch blocker** — full detail,
  reproduction steps, and recommended next steps in `TEST_REPORT.md`
  §5.

**Not done today (by design — out of scope, or explicitly prohibited)**
- No deployment, no hosting/domain/DNS account created, no cloud
  resource created, no live external communication sent, no customer
  data imported — all explicitly prohibited by today's brief regardless
  of any other progress.
- No automated end-to-end or API test suite was built — none existed
  before today and building one was not in today's scope; its absence
  is recorded as a real gap in `TEST_REPORT.md` §2/§6.
- The critical defect in `TEST_REPORT.md` §5 was not fixed — today's
  time was spent ruling out causes rather than attempting a fix without
  a confirmed root cause this late in the project.

**Open items carried forward**
- **Fix the critical defect in `TEST_REPORT.md` §5 before anything
  else.**
- All previously-open items (solicitor review of legal pages, email
  provider, authentication, database, CRM, AI provider, domain, fee
  amounts, geographic coverage) remain outstanding — see
  `PROJECT_PLAN.md`'s "Immediate next steps."

## 2026-09-07 — Day 6: Content, SEO, compliance readiness, accessibility, performance and security

**Baseline check (before changing anything)**
- Ran typecheck, lint, tests and production build against Day 5's code —
  all passed. No pre-existing failure to fix before starting.

**Added**
- `SEO_PLAN.md` — search-intent map, page/keyword map, structured-data
  policy, and an explicit, reasoned decision not to build area or FAQ
  pages yet.
- `REGULATORY_READINESS.md` — UK GDPR, PECR/cookies, Equality Act,
  consumer protection/DMCC, fee transparency, redress/CMP, EPC,
  material information, complaints and AI-advice topics, each with a
  status — no compliance claim made anywhere.
- `ACCESSIBILITY.md` — dated WCAG 2.2 AA test record: axe-core across
  18 pages/states, an independent Lighthouse pass, and manual checks;
  4 automated + 4 hand-found defects, all fixed.
- `SECURITY.md` — full review against Task 6's checklist, including a
  fresh `npm audit`, secret scan, and redirect-safety search.
- `/fees` — fee-transparency page structure (Tenant Fees Act 2019
  categories), amounts marked Missing.
- `/accessibility` — accessibility statement.
- `web/src/app/sitemap.ts`, `web/src/app/robots.ts` — dynamic XML
  sitemap and robots rules; previously neither existed.
- `web/src/lib/seo/structured-data.ts`, `web/src/components/seo/JsonLd.tsx`
  — `RealEstateAgent` (sitewide, Confirmed facts only), `BreadcrumbList`,
  and a conditional `RealEstateListing` that emits nothing for demo
  properties (i.e. every property today) by design.
- `web/src/components/layout/DraftLegalNotice.tsx` — banner shown on
  every drafted legal page.
- Real drafted content (previously bare placeholders) for
  `/privacy-policy`, `/cookie-policy`, `/terms`, `/complaints` — each
  describing this site's actual current behaviour, not generic
  boilerplate, and each carrying `DraftLegalNotice`.
- A `--color-warning-text` design token (`web/src/app/globals.css`) —
  see "Findings" below.

**Changed**
- `web/next.config.ts` — added security headers (CSP, X-Frame-Options,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS);
  previously none were set.
- `web/src/app/layout.tsx` — added `metadataBase`, Open Graph/Twitter
  defaults, and sitewide `RealEstateAgent` JSON-LD.
- Every primary page — added a meta description and `alternates.canonical`
  where missing.
- `/about` — added a "Regulatory information" section (redress scheme,
  CMP, PII, each with its real status) and links to the new
  `/complaints`, `/fees` and `/accessibility` pages.
- `/admin/layout.tsx` — added `robots: {index:false, follow:false}`.
- `web/src/app/property/[id]/page.tsx` — added a real meta description,
  canonical URL, `noindex` for demo properties, and `BreadcrumbList`/
  `RealEstateListing` JSON-LD.
- `web/src/components/layout/MobileMenu.tsx`,
  `web/src/components/ai/AssistantWidget.tsx` — added Escape-to-close
  and focus management (found missing during accessibility testing).
- `web/src/components/ui/PropertyCard.tsx`,
  `web/src/components/property/FavouriteButton.tsx` — enlarged touch
  targets to meet WCAG 2.2's 24×24px minimum.
- `web/src/components/property/PropertyResultsGrid.tsx` — added a
  visually-hidden `<h2>` to fix a skipped heading level.
- `web/src/lib/site-config.ts` — added Fee Information and
  Accessibility Statement to the footer's Legal section.

**Findings (defects found and fixed today)**
- **Fixed:** a genuine WCAG 1.4.3 colour-contrast failure (4.33:1,
  needs 4.5:1) on every "Requires verification"/"Requires professional
  review" status badge sitewide, found by axe-core. Added a dedicated,
  darker `--color-warning-text` token (6.10:1) for warning-coloured
  text specifically.
- **Fixed:** `text-ink/60` and similar low-opacity text utility classes
  measured 4.22:1 against the page background (below 4.5:1), found by
  hand-calculation, across 12 files — replaced with `text-ink/70`
  (5.75:1).
- **Fixed:** the AI assistant's scrollable message log wasn't keyboard-
  focusable (`scrollable-region-focusable`, found by axe-core once the
  widget was actually opened and scanned, a state static page-load
  scanning can't reach).
- **Fixed:** touch targets on every property card ("View details",
  "☆ Save") measured 20px tall, below WCAG 2.2's new 24×24px minimum —
  found by Lighthouse, not axe-core, a reminder that no single
  automated tool catches everything.
- **Fixed:** every property search/listing page skipped from `<h1>`
  straight to a property card's `<h3>` with no `<h2>` in between —
  also found by Lighthouse.
- **Fixed:** the mobile navigation menu and AI assistant widget had no
  Escape-to-close or focus management, leaving a keyboard user's focus
  stranded on close.

**Not done today (by design — out of scope for Day 6)**
- No legal/regulatory page was submitted for actual solicitor review —
  drafted, not reviewed; every page states this clearly.
- No area/location pages were built — geographic coverage remains
  unconfirmed (`SEO_PLAN.md`).
- No live Google Rich Results Test / schema.org validator run — both
  need a public URL, not `localhost`.
- No nonce-based CSP (the current policy still allows `'unsafe-inline'`
  for scripts/styles) — a documented, accepted limitation, not an
  oversight.
- No real authentication, database, or third-party integration was
  connected — unchanged from every previous day.

**Open items carried to Day 7**
- Every drafted legal/regulatory page needs solicitor review before
  reliance (`REGULATORY_READINESS.md`).
- A real domain name is needed before `NEXT_PUBLIC_SITE_URL`'s
  `localhost` default can be replaced and today's SEO work take real
  effect.
- All previously-open items (email provider, authentication, database,
  CRM, AI provider, fee amounts, geographic coverage) remain
  outstanding.

## 2026-09-07 — Day 5: Forms, lead management, repair reporting, AI and automation

**Baseline check (before changing anything)**
- Ran typecheck, lint, tests and production build against Day 4's code —
  all passed. No pre-existing failure to fix before starting.

**Added**
- `web/src/components/forms/LeadForm.tsx` and
  `web/src/lib/leads/actions.ts` — a generic, reusable lead form and
  server action covering all twelve lead categories, each protected by
  a honeypot field, per-form rate limiting, sanitisation and mandatory,
  timestamped Privacy Policy consent. Replaces the Day 3 `EnquiryForm`,
  which is now deleted (confirmed no remaining references first).
- `web/src/lib/valuation-terms.ts` and `ValuationTermsNotice.tsx` — a
  shared vocabulary distinguishing an initial market appraisal, an
  automated estimate, a formal valuation and a regulated valuation,
  used on every page offering a "valuation" so none ever states a
  figure or implies an automated estimate is final.
- `/report-a-repair` — a bespoke repair-reporting page with genuine UK
  emergency-safety information (999, National Gas Emergency Service,
  the national power-cut number), dual consent (privacy +
  contractor-sharing), and file-upload validation
  (`web/src/lib/security/file-upload.ts`) that never stores file bytes
  — only sanitised metadata — since no storage provider is approved.
- `web/src/lib/leads/` — a `Lead` data model and in-memory store, a
  `/admin/leads` list and `/admin/leads/[id]` detail view with a
  nine-stage lifecycle, notes, and assignment, gated by a new
  `manage_leads` permission.
- `web/src/lib/security/` — honeypot, rate-limiting, sanitisation, and
  file-upload validation utilities, each with its own test file.
- `web/src/lib/ai/` — a provider-neutral `AIProvider` interface and a
  rule-based `DemoAIProvider` (no external AI service, no paid account,
  no API key), plus a floating chat widget (`AssistantWidget.tsx`) site
  -wide. Enforces eight hard-refusal rules (no mortgage/legal/
  investment/surveying advice, no negotiation, no tenancy confirmation,
  never claims humanity, never reveals private information) before
  anything else runs.
- `AUTOMATION_WORKFLOWS.md` — per-category workflow documentation:
  trigger, validation, consent, internal action, and what needs owner
  approval before any real external communication is sent.
- `AI_SAFETY_RULES.md` — the assistant's full behavioural contract, and
  why prompt-injection resistance is structural in today's rule-based
  implementation.
- `PRIVACY_DATA_MAP.md` — what personal data is collected, where it
  lives, who can access it, and what must change before it holds real
  customer data.
- `INTEGRATIONS.md` — a new AI-provider comparison section (Anthropic,
  OpenAI, Azure OpenAI, self-hosted open-weight models), none connected.
- 40 new automated tests (security utilities, the lead store, AI
  refusals, and AI demonstration-provider behaviour including a table
  of five prompt-injection attempts) — 64 total, up from 24.

**Changed**
- `/sell`, `/let`, `/commercial`, `/contact`, `/property-management`,
  `/property/[id]` — migrated from `EnquiryForm` to `LeadForm`, with
  `ValuationTermsNotice` added wherever a page offers a valuation.
- `/property/[id]`'s viewing-request section rewritten to require a
  preferred date/time and state explicitly that a request does not
  confirm a viewing.
- `web/src/lib/auth/roles.ts` — added the `manage_leads` permission
  (Manager/Administrator only).

**Findings (defects found and fixed today)**
- **Fixed:** `listLeads()` produced flaky ordering when two leads shared
  the same millisecond timestamp — changed from sorting by `createdAt`
  to `.slice().reverse()`, correct regardless of timestamp precision.
- **Fixed:** React's internal `$ACTION_*` form-encoding fields (added
  automatically to support a bound server action's progressive
  enhancement) were leaking into stored lead records as if they were
  real form data — `submitLeadForm()` now explicitly excludes any key
  starting with `$ACTION` before processing a submission.
- **Investigated, not a production defect:** the Day-4 dev-server-only
  loading quirk recurred several times during today's live testing;
  re-confirmed absent from a full production build — see
  `TEST_REPORT.md` section 10.

**Not done today (by design — out of scope for Day 5)**
- No real outbound email or SMS activated — every notification is
  logged only (`web/src/lib/leads/notify.ts`).
- No AI provider account created, no API key exists anywhere in the
  repository.
- No file storage provider connected — uploaded files are validated
  but their bytes are never persisted.
- No customer data imported or connected.

**Open items carried to Day 6**
- Owner to choose and approve an email/notification provider (recipient
  addresses, reply-to addresses, wording, retention rule).
- Owner to decide whether a real AI provider is wanted at all, and if
  so which one and at what spending cap.
- A real authentication provider must be chosen before `/admin`
  (including the new `/admin/leads`) can ever be deployed publicly.
- A real, persistent, access-controlled database must exist before any
  real personal data is accepted — see `PRIVACY_DATA_MAP.md`.
- All Missing items from earlier days remain outstanding.

## 2026-09-07 — Day 4: Property data, CMS, listings and search

**Baseline check (before changing anything)**
- Ran typecheck, lint, tests and production build against Day 3's code —
  all passed. No pre-existing failure to fix before starting.

**Added**
- `DATA_MODEL.md` and `web/src/lib/property/types.ts` — one structured
  property model covering residential/commercial, sales/lettings, with
  every field marked mandatory/optional, public/private and
  verified/unverified. Private fields are a distinct TypeScript type
  from public fields (`Property` vs `PublicProperty`), not just a
  display-layer filter.
- `ADMIN_AND_CMS.md` — a five-role permission model (Administrator,
  Manager, Property Editor, Content Editor, Enquiry Viewer), a
  Draft → Awaiting approval → Available approval workflow, and an audit
  log, all enforced server-side. Includes an explicit, prominent warning
  that the accompanying login mechanism is a development-only mock, not
  real authentication.
- Nine fabricated demonstration properties (`web/src/data/demo-properties.ts`)
  covering every marketing status, including Draft and Sold, specifically
  to prove the public-visibility rules work — none resemble a genuine
  Times Estate Ltd instruction.
- A `PropertyProvider` adapter interface (`web/src/lib/property/provider.ts`)
  so a real CRM/portal can be connected later by writing one new class,
  with no changes needed to any page.
- Search and listing pages for all four categories (`/buy`, `/rent`,
  `/commercial/for-sale`, `/commercial/to-let`), a shared property detail
  page (`/property/[id]`), `/favourites`, and a working `/property-alerts`
  page.
- An admin area (`/admin/properties`, `/admin/properties/[id]`,
  `/admin/audit`) demonstrating the full approval workflow and audit
  logging against real pages.
- `INTEGRATIONS.md` — a new CRM/property-portal section: confirmed no
  agreement exists yet, compared six real UK providers (Reapit, Alto,
  Dezrez, Jupix, Street, SME Professional) and what each would require,
  without scraping or contacting any of them.
- 19 new automated tests (roles, public/private field separation,
  provider filtering/pagination, extended property-card coverage).

**Changed**
- Primary navigation now matches `SITEMAP.md`'s originally approved
  8-item structure exactly (added Buy/Rent, removed the Day-3 "Residential"
  substitute) — re-tested for responsive overflow at the same breakpoint
  Day 3 had fixed.
- `CONTENT_REQUIRED.md` — added a "Systems and integrations" section for
  the CRM/portal confirmation gap.

**Findings (defects found)**
- **Fixed:** the admin edit page could get stuck showing "Loading…"
  after a successful save, caused by a redundant `revalidatePath()` call
  on the same page that had just invoked the action.
- **Investigated, not a production defect:** a related dev-server-only
  loading quirk was found and deliberately tested against a full
  production build, where it did not reproduce at all — see
  `TEST_REPORT.md` section 9.

**Not done today (by design — out of scope for Day 4)**
- No live CRM or property-portal connected.
- No real authentication implemented (explicitly flagged as a blocker
  for any future deployment of the admin area).
- No customer data imported.

**Open items carried to Day 5**
- Owner to choose an email/notification provider.
- Owner to confirm whether a CRM/agency software or portal agreement
  already exists.
- A real authentication provider must be chosen before `/admin` can ever
  be deployed publicly.
- All Missing items from earlier days remain outstanding.

## 2026-09-07 — Day 3: Technical foundation, design system and core website

**Blocker found and resolved**
- Node.js was not installed on this computer (flagged since Day 1, never
  resolved). With the owner's explicit approval, installed Node.js 24 LTS
  via `winget`.

**Added**
- `TECHNICAL_ARCHITECTURE.md` — the chosen technology stack (Next.js 16,
  React 19, TypeScript strict mode, Tailwind CSS 4, Zod), with current
  versions verified against the npm registry.
- `INTEGRATIONS.md` — a comparison of options for database, CMS, auth,
  search, email, file storage, analytics, hosting and monitoring. Nothing
  connected; every option needs the owner's approval.
- `DESIGN_SYSTEM.md` — the implemented Brand Direction 1 design system:
  colours, typography, components, and accessibility features.
- `TEST_REPORT.md` — every check run today (TypeScript, lint, tests,
  build, audit, secret scan, responsive testing, accessibility, form
  functional testing) with commands and real results.
- `web/` — the scaffolded Next.js application: eleven core public pages
  (Home, About, Residential, Commercial, Sell, Let, Property Management,
  Contact, and three legal placeholders), a shared design system, and a
  server-validated enquiry form used across Sell/Let/Commercial/Property
  Management/Contact.

**Changed**
- `CONTENT_REQUIRED.md` — corrected three items (legal name, Companies
  House number, registered office) that were still marked "Missing" despite
  being Confirmed since Day 1; updated regulatory items to "Requires
  verification" to match `CONTENT_VERIFICATION_REGISTER.md`.
- `PROJECT_PLAN.md` — Day 3 marked complete; the long-standing "no
  command-line access" technical note removed now that it no longer
  applies.

**Findings (defects found and fixed today)**
- Tablet-width (768px) navigation overlapped the logo and CTA button —
  the mobile/desktop switch-over point was moved from 768px to 1024px.
- The open mobile menu didn't fully cover the page beneath it at its
  bottom edge — fixed to cover the full remaining screen height.
- One transitive dependency (`unrs-resolver`) has an unreviewed
  postinstall script — flagged, not approved or run.

**Not done today (by design — out of scope for Day 3)**
- No property database, CMS, email/CRM integration, authentication, or
  hosting connected.
- No production deployment.
- No automated accessibility scan (axe-core) — planned for Day 6.

**Open items carried to Day 4**
- Owner to choose an email/notification provider (blocks every enquiry
  journey from actually reaching staff — see `INTEGRATIONS.md`).
- Owner to confirm whether a property feed/CRM exists for Buy/Rent search.
- All Missing items from earlier days (contact details, fees, brand
  assets, geographic coverage) remain outstanding.

## 2026-09-07 — Day 2: Research, positioning, brand, sitemap and user journeys

**Added**
- `MARKET_RESEARCH.md` — analysis of six premium London estate agency
  websites (Knight Frank, Winkworth, Dexters, Foxtons, Chestertons,
  Hamptons), with observations, weaknesses to avoid, and original
  opportunities for Times Estate Ltd.
- `BUSINESS_PRIORITIES_AND_AUDIENCES.md` — a proposed ranked list of
  business priorities and ten audience profiles, built only from the
  twelve confirmed service areas.
- `BRAND_DIRECTIONS.md` — three original brand directions ("The
  Established Line", "Quiet Modern", "Warm Contemporary Local Expert"),
  each with a WCAG-checked accessible colour palette, typography and
  photography approach, and a recommendation.
- `SITEMAP.md` — a proposed information architecture and navigation
  structure, with pages deliberately excluded where no genuine content or
  confirmation exists (e.g. guides/FAQs, blog, developments).
- `USER_JOURNEYS.md` — nine complete user journeys (sales/rental
  valuation, management enquiry, residential/commercial search, viewing
  request, property alerts, repair report, callback request), each ending
  in human review rather than an automated commitment.

**Findings**
- Confirmed the Git repository and working tree were clean and Day 1's
  commits intact before starting today's work.
- Identified that several Day 1 business-discovery answers were never
  actually supplied (contact details, VAT number, trading name,
  professional body membership, AML registration, fee information, all
  brand assets, live property data, testimonials) — recorded in
  `PROJECT_PLAN.md` under "Day 1 completeness check" rather than assumed
  complete.
- Two competitor sites (Savills, Marsh & Parsons) could not be accessed
  for research (HTTP 403) and were excluded rather than guessed at.

**Not done today (by design — out of scope for Day 2)**
- No technology stack chosen, no application scaffolded, no code written.
- No brand direction, sitemap, or user journey treated as approved —
  all await the owner's explicit sign-off.

**Approval**
- Owner approved business priorities, sitemap, user journeys, and Brand
  Direction 1 ("The Established Line") as a working baseline for Day 3
  onward — recorded as approved-but-changeable, not permanently fixed, in
  each affected document.

**Open items carried to Day 3**
- All Missing items listed in `PROJECT_PLAN.md`'s Day 1 completeness
  check remain outstanding.

## 2026-09-06 — Day 1: Project inspection, business discovery and master plan

**Added**
- Initial project-control documents: `CLAUDE.md`, `PROJECT_PLAN.md`,
  `BUSINESS_REQUIREMENTS.md`, `CONTENT_REQUIRED.md`,
  `CONTENT_VERIFICATION_REGISTER.md`, `CHANGELOG.md` (this file),
  `.gitignore`, `.env.example`.
- Recorded the eight permanent project rules in `CLAUDE.md`.
- Recorded the confirmed project scope (12 service areas) in
  `BUSINESS_REQUIREMENTS.md`, all business facts marked Missing pending
  owner input.

**Findings**
- The `Times Estate Ltd` project folder was empty prior to today — no
  existing code, configuration, or content to preserve.
- No local development tooling (Git repository, Node.js project) yet
  exists on this machine for the project; none was found to back up.

**Not done today (by design — out of scope for Day 1)**
- No pages designed, no application scaffolded, no dependencies installed,
  no accounts connected, nothing deployed.

**Open items carried to Day 2**
- Five grouped business-discovery questions asked; awaiting owner answers.
- Git repository initialisation and Node.js/package-manager version checks
  are pending — this session currently has file access to the project
  folder but not command-line access to the owner's machine.
