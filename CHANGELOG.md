# CHANGELOG.md — Times Estate Ltd Website Project

> **Restored 9 November 2026 from the project's git history** (commit
> `5284b25`, 30 October 2026). This file was missing from the folder on
> this computer. Any changes made to it between 31 October and
> 2 November could not be recovered, so Day 7 updates may be absent.
> Anything dated 9 November was added after the restore. See
> `RECOVERY_REPORT_2026-11-09.md`.

---

## 2026-11-24 — Live AI website assistant built (switched off)

- Owner request: "Yes, website assistant" (AI_AGENT_PLAN.md, stage 1).
- A Claude-powered version of the chat assistant is built:
  - read-only tools: listings, approved answers, form links;
  - the same safety pre-checks as before;
  - a check on every reply before it is shown;
  - automatic fallback to the rule-based assistant.
- **Off by default:** needs both `AI_ASSISTANT=live` and an
  `ANTHROPIC_API_KEY`, and neither is set. Visitors see no change;
  checked in the browser.
- New package `@anthropic-ai/sdk` (0 known vulnerabilities).
- 372 tests pass (29 new, using a fake AI: no account, no cost).
  Lint and build clean.
- To turn it on (owner): open the AI account with a spending cap,
  decide data location and privacy wording, then the stage 2 test set
  and stage 3 staff pilot on the private preview.

## 2026-11-24 — AI agent plan (proposal only)

- Owner request: "plan an AI Agent for this website".
- New `AI_AGENT_PLAN.md`:
  - a **website assistant** for visitors (answers from approved pages,
    finds real available listings, prepares forms the visitor submits
    themselves);
  - a **staff assistant** (enquiry summaries, reply and listing-text
    drafts, missing-information checks, repair triage);
  - read-and-draft only, behind the existing refusal rules, with an off
    switch and automatic fallback to today's rule-based assistant;
  - UK GDPR steps, cost estimates by model, a staged rollout and eight
    owner decisions.
- Nothing built, no AI account, no key, no cost.

## 2026-11-24 — Private client preview on Vercel (not production)

- Owner request: "deploy it on vercel", then "Private preview – go ahead,
  and copy the settings to Vercel", then a shareable link for a client.
  The exact Rule 6 approval words were **not** given, so this is a
  preview only. Nothing public; no domain; no DNS change.
- Vercel team "Times Estate", project `times-estate-web` (root folder
  `web`, Node 24, server in Dublin). Built from GitHub branch
  `client-preview` (same code as `recovery-2026-11-09`, commit c6f9b59).
- **Locked:** Vercel sign-in is required on every address. Checked:
  without the link, a visitor is sent to the Vercel log-in page.
- **Shareable link** for the client: anyone holding it can view. The
  first link (23 hours) was replaced the same day at the owner's
  request by a 30-day link, expiring 24 Dec 2026. It is tied to the
  `client-preview` address, so it keeps working when the preview is
  rebuilt. Revoke or renew it in Vercel (project → Deployment
  Protection → Shareable Links) or ask the AI team.
- **Demo mode:** `LOCAL_DB=memory`, so the preview runs on built-in
  sample data, and anything typed into a form is not kept. The live
  database setting (`DATABASE_URL`) was not added. Adding it later
  switches the preview to the live Supabase database.
- `EMAIL_NOTIFICATIONS=off`; no email settings copied.
- **Production builds blocked:** Vercel's "ignored build step" skips
  any production build until the owner writes "I approve production
  deployment." An accidental first build that Vercel labelled
  "production" was cancelled before it finished.
- Not tested: Firefox/Safari (to do on this preview).

## 2026-11-24 — Faster property photos on phones; mobile speed measured

- Owner request: "move forward with what's left".
- Property pages now give phones the smaller (640px) copy of each photo,
  and the main photo loads first. Speed score on a simulated phone:
  average 81 before (76, 88, 80), 85 after (86, 85, 83).
- The biggest remaining factor is the owner's intro video (accepted by
  the owner) — see the `QA_REPORT.md` addendum.
- 343 tests; build clean.

## 2026-11-24 — Material-information fields on the property form

- Owner request: "move forward with what's left".
- Staff can now enter and edit the details buyers and tenants must be
  given before they enquire. All were already shown on the property
  page, but could only be set in the sample data:
  - **Sales:** lease years remaining, service charge, ground rent, chain.
  - **Lettings:** deposit, available from.
  - **Commercial:** use class, business rates, service charge, VAT, EPC,
    possession date, lease terms.
- Money can be typed as "£1,800". Blank means "not stated".
- 343 tests; axe 0 violations on the edit page; build clean.

## 2026-11-24 — Edit all property details; PDF brochures

- Owner request: "move forward with what's left".
- **Edit property details:** staff could only change a property's
  summary, description and status once it was saved. The edit page now
  has a **Property details** form for type, address, price, rooms,
  tenure, EPC, council tax band, features and an optional https video
  or tour link. Fields the form doesn't show are kept. The usual
  approval rules apply to live listings.
- **PDF brochures:** one per property, up to 10 MB, replaced on
  re-upload. Refused if the file is not a real PDF, or contains
  scripts, automatic actions or attached files. Always downloaded, not
  opened inside the site. The Supabase bucket now also accepts PDFs
  (setup script re-run), and the backup script copies brochures too.
- 342 tests; axe 0 violations on the full edit page; redirect check
  still 40/40; production build clean.

## 2026-11-24 — Old website addresses redirected

- Owner approval: "Yes, build redirects".
- Every address from the old WordPress site (`SEO_REDIRECT_PLAN.md` §2)
  now has an answer. Pages with a successor go permanently (301) to
  it: for example `/contact-us/` → `/contact`, `/properties/` → `/rent`,
  `/agents/` → `/about`. Dead-end WordPress pages, archives and system
  addresses answer 410 "gone", with a short page linking home.
- Next.js normally adds a redirect for addresses ending in "/", which
  would have made old links take two hops. That step is now handled in
  `src/proxy.ts`, so every old link takes one hop.
- `scripts/check-legacy-urls.mjs`: 40/40 on the production build. 336
  tests.

## 2026-11-24 — Floor plans, photo backups, sharing image

- Owner request: "move forward with what's left".
- **Floor plans:** staff upload up to 5 per property. They are scaled
  to fit, never cropped, with transparent areas made white and camera
  data removed. They show under "Floor plans" on the property page.
- **Photo backups:** `npm run backup:photos` copies every stored photo
  and floor plan from Supabase to `backups/property-photos/`
  (git-ignored). It downloads only new files and never changes
  anything in Supabase. Ran successfully on the live project (no
  photos yet).
- **Sharing image:** links shared on WhatsApp, Facebook, LinkedIn or X
  now show a 1200×630 picture with the emblem, the name and the four
  services (`scripts/make-share-image.mjs`; re-run when a clean logo
  export arrives).
- `sharp` is now a direct dependency (npm could reach its registry
  again); 0 known vulnerabilities.
- 331 tests; production build clean.
- **Not done, waiting on the owner:** redirects from the old website's
  addresses (`SEO_REDIRECT_PLAN.md`, needs approval), the AI draft
  review screen (waits for email to be switched on), a map, a page-text
  editor, an investors page, and data retention periods.

## 2026-11-24 — Property photo upload (Supabase Storage)

- Owner approval: "Yes, use Supabase Storage".
- Set up on the live Supabase project: a `property-photos` bucket.
  Supabase's own rules let only staff with two-step verification and a
  property role add or remove files (`web/scripts/setup-photo-storage.mjs`).
  Checked live: an upload without a staff sign-in was refused.
- Staff screen: the property edit page has a **Photos** section to
  upload (JPEG/PNG/WebP, 10 MB, 20 per property), describe, set the
  main photo and remove photos. Same approval rules as editing text.
- Every upload is cropped to 4:3 and saved as WebP at 1200 and 640 px.
  Hidden camera data such as GPS location is removed.
- Visitors get photos from the website's own `/media/…` address, so
  their browsers never contact Supabase and the security policy is
  unchanged. Listing cards and property pages already show uploaded
  photos; sample listings keep their stock photos.
- 330 tests (6 new). Not tested end-to-end with a real staff sign-in
  (needs the owner's password): see `LAUNCH_CHECKLIST.md`.

## 2026-11-24 — Back-end: add property, data requests, health check

- Owner request: "move forward what's left in the backend".
- **Add a property** (`/admin/properties/new`): Property Editors,
  Managers and Administrators can add real listings. They are saved as
  private drafts and go live only through the existing approval step.
  Photo upload is not built yet, because it needs a storage service the
  owner must approve.
- **Data requests** (`/admin/data-requests`): Administrators and
  Managers can find every enquiry from one email address, download a
  copy, and erase records permanently on request. Each step is logged
  with a request reference, never the person's details. Procedure:
  `OPERATIONS_MANUAL.md` §7a.
- **Health check** (`/api/health`): for an uptime monitor. It returns
  "ok", or "degraded" when the database cannot be reached.
- **Cookie table** on `/cookie-policy` corrected to match what the site
  really stores. It still needs solicitor review.
- **Fixes:** the admin menu now wraps on phones. A build warning that
  would have bundled the whole project folder into a deployment is
  gone.
- 324 tests (16 new); axe 0 violations on the new admin pages at phone
  width; production build clean; health check answered "ok" against
  the live database.

## 2026-11-24 — Photos on the sample listings

- Owner request: "get images from free sources and update at the home
  page, where properties images are missing".
- The 7 public sample listings now show a free Unsplash photo instead
  of the drawn picture: a living room, a flat sitting room, a kitchen, a
  bedroom, a warehouse, an empty shop unit and an office. They are all
  interiors, so no real home looks as if it were for sale.
- Labels are unchanged: every card still says "Sample property — not
  real". Each property page now also says "Sample photo — not this
  property" and credits the photographer. Licence record:
  `brand/property-photos/LICENCES.md`.
- The photos are added when the page is shown, not saved into the
  listings, so the sample listings already in the live database get
  them too, and a real listing never can.
- Wikimedia Commons (the hero photos' source) could not be reached from
  this computer on 23–24 November, which is why Unsplash was used.
- 308 tests; axe 0 violations on the homepage (375 and 1440 px) and a
  property page; no sideways scrolling.

## 2026-11-23 — Hero photos brighter, clearer, changing every 3 seconds

- Owner request: "too blur, make it bright and clear", "changes after
  every 3 sec and move forward automatically".
- The photos were sharp, but a 65% dark layer covered the whole picture
  and the files were heavily compressed. Now the shading sits only
  behind the words (left-hand side on wide screens, top on phones), and
  the right side of the photo is clear. The photos were re-exported at
  higher quality with light sharpening, plus a new 2560 px size for
  large, high-resolution screens.
- White text is still readable on every photo. I measured each one at
  desktop and phone sizes: the worst case is 4.9:1, and the target is
  4.5:1. Details are in `TEST_REPORT.md`.
- The photos change every 3 seconds and loop. They now move for every
  visitor, including those whose device asks for reduced motion (the
  owner's instruction). Those visitors get an instant change with no
  fade. The pause button still works for everyone.
- 301 tests; axe 0 violations at 375 and 1440 px.

## 2026-11-23 — Site keeps working when the database is unreachable

- Found when the Supabase project paused (Free plan): the whole
  homepage showed "Something went wrong".
- Now the homepage hero, search, services and valuation band always
  show. Where listings would be, visitors see "Listings are
  temporarily unavailable" with the phone number. Property pages say
  "temporarily unavailable" (not "not found"). Enquiry and repair
  forms say clearly that nothing was sent and give the phone number.
  Favourites say they can't be shown, not that none are saved. The
  assistant says it can't look up properties.
- Database connection attempts now give up after 8 seconds instead of
  30. The server log records only a short line such as
  "save enquiry failed — database unavailable", never customer details.
- New `web/src/lib/db/safe.ts`; 6 new tests (300 in total). Checked on
  the production build against the paused project.
- Later the same day the owner restored the Supabase project. The
  production build reads from it again: homepage 7 listings, each
  search page 2, a listing page and staff sign-in all load (under
  2 seconds), with no server errors. The Pro plan is still needed so
  it cannot pause again.

## 2026-11-23 — Sliding photo hero on the homepage

- New `HeroPhotoSlides`: five openly licensed London photos
  (Wikimedia Commons) behind the headline and search card. Each is
  credited; there is a pause button and dots; reduced-motion visitors
  start paused, but Play still works; only the current and next photo
  are downloaded.
- Photos in `web/public/hero/` (960 and 1920 px WebP, 58–310 KB);
  originals kept locally in `brand/hero-photos/originals/` (git-ignored);
  licence record `brand/hero-photos/LICENCES.md`.
- Bug fixed before release: Play did nothing for reduced-motion
  visitors.
- 294 tests.

## 2026-11-09 — Staff email notifications via 20i StackMail (switched off)

- New `lib/leads/email.ts`: one staff email per enquiry, with no
  customer personal data; emergencies flagged. Sends only when
  configured and `EMAIL_NOTIFICATIONS=on`.
- Added `nodemailer` 10.2.1 (and its types). Website dependencies: 0
  known vulnerabilities.
- Owner steps in `DEPLOYMENT.md` §11c; settings in `.env.example`
  section 5.
- 286 tests.

## 2026-11-09 — Email-link page; Supabase sign-in settings applied

- New `/admin/auth/callback` page handles Supabase's default
  invitation and reset links. Templates are locked until custom SMTP.
- Supabase: public sign-up off; Site URL and redirect URLs set
  (`DEPLOYMENT.md` §11b, steps 1–4 complete).

## 2026-11-09 — Staff sign-in with two-step verification (Supabase Auth)

- New pages: staff sign-in, two-step code (set-up with QR code, or
  code entry), choose a password, forgotten password; plus the
  email-link handler `/admin/auth/confirm`.
- Every admin page and action requires a password, an authenticator
  code and an owner-assigned role (`staff_roles` table, row-level
  security on).
- The admin header has a Sign out button; the development banner
  shows only in test mode.
- Added `@supabase/supabase-js` 2.118.0 and `@supabase/ssr` 0.12.7.
  Website dependencies: 0 known vulnerabilities.
- 282 tests (10 new); 0 accessibility violations on the new pages.

## 2026-11-09 — Supabase connected (project in Ireland, owner decision)

- The live database is connected on this computer; tables created with
  row-level security; enquiries saved and read back.
- Fixed: records stored as JSON text on Supabase; start-up repair
  added.
- Safety: tests ignore `DATABASE_URL` and refuse to empty a live
  database.
- Privacy Policy must now say data is stored in Ireland (EU); added to
  the solicitor items.
- 272 tests.

## 2026-11-09 — Database layer (owner chose Supabase, London)

- Enquiries, property records and the activity log now live in
  PostgreSQL (`web/src/lib/db/`) and survive restarts. Local and test
  runs use PGlite; Supabase connects through `DATABASE_URL`.
- Row-level security on every table; tables created automatically.
- Added `@electric-sql/pglite` 0.5.11 and `postgres` 3.4.9, pinned and
  at least two weeks old. Website dependencies: 0 known
  vulnerabilities.
- The assistant button no longer pulls server code (and the sample
  listings) into visitors' browsers: its greeting moved to
  `lib/ai/greeting.ts`.
- Fixed before commit: the local database folder was not created when
  missing; a test now covers it.
- 269 tests (new: data survives a restart; samples loaded once;
  row-level security on).

## 2026-11-09 — Next.js security upgrade (owner approved)

- `next` and `eslint-config-next` 16.3.4 → 16.4.5. Website
  dependencies: 0 known vulnerabilities (was 1 critical package
  carrying 11 advisories).
- Footer changes the same day (owner requests): top strip removed;
  logo added back; bottom lines restacked into two side-by-side blocks.

## 2026-11-09 (end of day) — Git history repaired; originals restored

- Repaired `.git` (HEAD and index missing; one pack file lost) on a new
  branch, `recovery-2026-11-09`, from commit `5284b25` (30 Oct).
- Restored 71 missing original files, swapped today's rebuilt documents
  and modules for their originals, and re-applied the post-30-October
  settings proven by the last build. See `RECOVERY_REPORT_2026-11-09.md`.
- 266 tests pass (39 files); build 42 routes; accessibility 74/0.

## 2026-11-09 (later) — Tests rewritten and full QA re-run

- 159 new tests written (241 in total, all passing). See `TEST_REPORT.md`.
- Fixed: a double space in the plain-English search summary.
- Fixed: the cookie table on `/cookie-policy` made the page scroll
  sideways on phones. It now has its own labelled scroll box.
- Accessibility, screen-size and Lighthouse audits re-run on the
  production build. See the `QA_REPORT.md` addendum and
  `ACCESSIBILITY.md`.
- Recorded for the owner: the cookie table's content is out of date;
  the intro video slows the first mobile visit.

## 2026-11-09 — Recovery of an incomplete copy

**Added back (original code, recovered from the last build):** 79
files, including 20 pages: About, Sell, Let, Landlords, Residential,
Commercial to let, Report a repair, Callback, Company information,
Complaints, Privacy Policy, Why choose us, Enquiry received,
Favourites, each property's own page, the admin property screens, and
the not-found page. Also the header, form fields, buttons, homepage
hero, listing explorer, property gallery, demonstration properties,
lead handling and search-engine data.

**Rebuilt (marked RECONSTRUCTED in each file):** property validation,
the property approval rules, the public/private field rules, the repair
attachment boundary, the early enquiry checks, the staff content-status
list, and the website, CSS and test settings files.

**Removed:** the recovered `EnquiryForm.tsx` (unused; contained the
retired server-hang pattern).

**Fixed:** the early enquiry and alert actions no longer write
personal details to the server log. The role switcher was pointed at
the renamed sign-in action. The launch settings now use this
computer's folder.

**Images:** the favicon was restored from the old build. The 120 px
and 240 px emblem sizes and the PNG fallback were re-made from the
owner's emblem files.

**Libraries:** reinstalled at the lock-file versions. Next.js stays at
16.3.4.

**Documents:** the 21 missing documents were rebuilt, each labelled
RECONSTRUCTED. `RECOVERY_REPORT_2026-11-09.md` was added.

**Checks:** type-check, lint, 82/82 tests and the production build
(41 pages) pass, and the production site was checked in a browser.
Nothing deployed or committed.

---


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
