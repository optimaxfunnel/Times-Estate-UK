# TECHNICAL_HANDOVER.md — Times Estates (Times Estate Ltd)

## Status of this document

Phase 7 deliverable (2026-09-09). Written for whoever takes technical
responsibility for this project next — a new developer, an agency, or
the owner working with one. It's the "start here" technical document;
it points to the detailed record rather than repeating it. The
non-technical staff guide is `OPERATIONS_MANUAL.md`; this is its
technical counterpart.

## 1. What this project is, in one paragraph

A Next.js 16 (App Router, Turbopack) property-agency website for Times
Estates (legal entity: Times Estate Ltd), covering residential and
commercial sales/lettings/management, valuations, viewings, repair
reporting, a rule-based AI assistant, and a five-role admin/CMS area —
all currently running on fabricated demonstration data with no
external services connected. `README.md` is the full documentation
map; `PROJECT_BRIEF.md` has the business facts; `WEBSITE_AUDIT.md` has
the last full technical audit.

## 2. Running it locally

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

Checks, all of which must pass before any change is considered done
(`web/package.json` scripts):

```bash
npm run typecheck   # tsc --noEmit
npm run lint         # eslint
npm run format       # prettier --check .
npm run test         # vitest run
npm run build        # next build — the real production build
```

`npm run start` (after `npm run build`) serves the actual production
bundle on port 3000 — **always test against this, not just `npm run
dev`, before drawing any conclusion about production behaviour**
(`QA_REPORT.md` was built entirely against this, not the dev server,
for exactly this reason).

## 3. Architecture patterns worth understanding before changing code

- **Design tokens, not hardcoded colours.** Every colour/font/radius is
  a CSS custom property in `web/src/app/globals.css`, re-exported into
  Tailwind's theme via `@theme inline`. Change a token once, and it
  cascades to every component using it — this is how the entire site
  was re-branded in Phase 5 without touching most component files. Do
  not hardcode a hex value in a component; add or reuse a token.
- **Public/private data separation is enforced at the type level, not
  just in the UI.** `Property` (full internal record) and
  `PublicProperty` (what a visitor may ever see) are different
  TypeScript types; `toPublicProperty()` physically removes private
  fields rather than hiding them. A page cannot receive a `Property`
  by mistake. See `DATA_MODEL.md`.
- **Adapter interfaces for data access** (`PropertyProvider`, the lead
  store) mean the current in-memory implementation can be swapped for
  a real database without touching page code — see §7 below, this is
  the actual mechanism for the database migration `DEPLOYMENT.md` §11
  describes.
- **One shared, validated, rate-limited form pipeline** (`LeadForm` →
  `submitLeadForm` server action) handles every one of the twelve lead
  categories (`EMAIL_AND_FORM_ROUTING.md` §0) — don't build a second
  form-submission path; add a new category to the existing one.
- **RBAC is enforced server-side**, not just hidden in the UI — a
  Property Editor is genuinely blocked from publishing, not just
  visually prevented.

## 4. Known issues — read this before touching anything

1. **CRITICAL, unresolved: a server hang on certain form submissions.**
   Confirmed present as of Phase 6, reproduced via a genuine click (not
   only a script). The Node process enters a runaway, CPU-bound state
   and stops responding to every request until manually killed and
   restarted. Full investigation history: `TEST_REPORT.md` §5 (Day 7)
   and `QA_REPORT.md` §9 (Phase 6, confirmed still present). **Root
   cause not found** — every line of the submission pipeline has been
   individually reviewed and is short, synchronous or properly
   `await`ed; a framework-level issue in the Next.js 16.3.4/React
   19.2.8/Turbopack combination is suspected, not confirmed. If you
   have real profiling tools (`node --inspect` + Chrome DevTools'
   profiler) available, attaching one to a hung process is the single
   most valuable next step — this project's environment never had one.
2. **No persistent database.** Every property, lead, and audit-log
   record is an in-memory array, lost on every restart (`DATA_MODEL.md`).
   Fixing this is a real, scoped piece of work (§7 below), not a
   configuration toggle.
3. **`/admin` authentication is a development-only mock** — a role
   switcher with no password. Must not be exposed publicly as-is
   (`SECURITY.md`, `ADMIN_AND_CMS.md`).
4. **No email provider is connected** — every form "succeeds" (records
   the lead) but never notifies anyone. Plan exists, nothing built:
   `EMAIL_AND_FORM_ROUTING.md`.
5. **LCP runs ~2.6–2.7s on a simulated slow mobile connection**,
   ~100–200ms over the internal 2.5s target — minor, see
   `QA_REPORT.md` §3 for the specific render-blocking CSS chunk
   identified.

## 5. Pre-launch and post-launch test plan

**Immediately before any real deployment**, re-run, against the
*production build* (`npm run build && npm run start`), not dev:

1. `npm run typecheck && npm run lint && npm run format && npm run
   test` — all must pass.
2. `npm run build` — must complete with 0 errors/warnings.
3. A full route/broken-link crawl (the same method `QA_REPORT.md` §2
   used) against every static route, every footer/nav link, and a
   sample of dynamic property pages.
4. Lighthouse (mobile, production build, an isolated Chrome profile —
   `QA_REPORT.md` §3's method note explains why an isolated profile
   matters) against home, a search page, a property detail page, and
   the conversion form — confirm scores match or exceed
   `QA_REPORT.md`'s recorded baseline; investigate any regression
   before proceeding.
5. **Do not attempt to re-trigger the critical hang defect as a "final
   check" unless you have a specific new hypothesis to test** — it is
   already thoroughly confirmed; deliberately destabilising a
   pre-launch environment for no new information is not worth the
   risk.

**Immediately after any real deployment:**

1. Load the home page, a search page, a property detail page, and the
   admin area over the real, public URL — confirm HTTPS, no mixed-
   content warnings, and the correct canonical host resolves
   (`DEPLOYMENT.md` §5).
2. Confirm `robots.txt` and `sitemap.xml` serve correctly from the real
   domain and reference the real domain (not `localhost`) in every URL.
3. Submit one real test enquiry end-to-end through the *safest*
   category first (`sales_valuation`, per `QA_REPORT.md` §2's own
   finding that this category didn't hang in testing) and confirm it
   appears in `/admin/leads`.
4. Watch monitoring (once connected, `DEPLOYMENT.md` §9) closely for
   the first hour, specifically for CPU spikes matching the hang
   defect's known signature.
5. Re-run a subset of the accessibility/performance checks from step 4
   of the pre-launch list against the *live* URL, not just the
   pre-deployment build — a hosting environment can behave differently
   from local (`npm run start`).

## 6. Brand-asset master-file index (cross-checked against the registers)

Confirms what's actually deployed on the live site matches the
approved identity — cross-referenced against `LOGO_ASSET_REGISTER.md`
and `MEDIA_ASSET_REGISTER.md`'s "CURRENT" sections, not assumed:

| Asset | Master source file | Deployed as | Confirmed matching? |
|---|---|---|---|
| Header/footer logo (primary lockup) | `brand/logo-real/svg/te-real-primary-transparent-*-use.svg` | `web/public/brand/times-estates-logo.svg`, `-reversed.svg` | ✅ Same file, copied not re-derived |
| Favicon / app icon | `brand/logo-real/png/te-real-icon-*.png` | `web/src/app/icon.png` (192px), `apple-icon.png` (180px) | ✅ Confirmed via Phase 6's route crawl — both resolve 200, and `<link rel="icon">` correctly serves only the real-brand icon (the old default Next.js favicon was deliberately removed in Phase 5, `DECISIONS.md`) |
| Icon-alone mark (compact use) | `brand/logo-real/svg/te-real-icon-full-colour.svg` | `web/public/brand/times-estates-icon.svg` | ✅ Copied, not currently referenced by any page (available for future use, e.g. a social avatar) |
| Social avatar / Open Graph image | — | — | ❌ **Does not exist yet** for the real brand — flagged in `QA_REPORT.md` §5/§9 as a non-blocking gap. The only OG-style images ever built (`brand/digital/`, `brand/social/`) are for the superseded Claret identity and must not be used |
| Colour tokens live on the site | `BRAND_GUIDELINES.md` §C (corrected 2026-09-09) | `web/src/app/globals.css` | ✅ Confirmed identical values by direct comparison, both directions, this phase |
| Typefaces live on the site | `BRAND_GUIDELINES.md` §D (Poppins/Inter) | `web/src/app/layout.tsx` | ✅ Confirmed via `next/font/google` imports matching exactly |

**Anything not in this table** (the full Claret-era logo suite in
`brand/logo/`, and the Claret stationery/social/digital pack in
`brand/stationery/`, `brand/social/`, `brand/digital/`) **is
historical, superseded material — do not use it for anything live.**
It's kept per `CLAUDE.md` Rule 3 (preserve existing work), not because
it's current.

## 7. If a real database is commissioned (the single highest-value next technical project)

1. Choose a provider (`INTEGRATIONS.md` compares options — none
   chosen).
2. Model tables/collections matching `DATA_MODEL.md` field-for-field,
   preserving its mandatory/optional, public/private, and verified/
   unverified distinctions — don't simplify these away.
3. Re-implement `PropertyProvider` and the lead store against the real
   database, behind their existing interfaces — no page or component
   should need to change.
4. Never migrate the current demo/sample data in as if real — delete
   it, don't import it (`CLAUDE.md` Rule 2).
5. This also resolves `DEPLOYMENT.md` §1's hosting-architecture
   constraint (classic serverless becomes safe once state lives in the
   database, not in server memory) and §10's disaster-recovery gap.

## 8. Who to ask

For business facts and approvals: the owner, Mohammad Muzaffar Malik.
For the project's own rules and history: `CLAUDE.md` (rules),
`DECISIONS.md` (every judgement call and why), `PROJECT_PLAN.md`
(day-by-day build record).
