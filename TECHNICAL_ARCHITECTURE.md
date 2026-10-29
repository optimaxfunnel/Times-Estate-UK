# TECHNICAL_ARCHITECTURE.md — Times Estate Ltd

## Task 1 confirmation (2026-10-29) — current architecture decision

**Plain-English summary.** The existing stack is the right one and is
kept. Two things must change before any deployment: Next.js and React
need a routine upgrade to their current patch releases (security
fixes), and the site needs a real database, real login and an email
sender — each a paid or third-party service the owner must approve
first (`INTEGRATIONS.md`). Nothing has been installed, upgraded,
connected or purchased by this task.

**How versions were checked.** Latest published versions were read
from the official npm registry on 2026-10-29 (`npm view <package>
version`); Node.js minimum from the Next.js documentation bundled with
the installed package (`node_modules/next/dist/docs`, "Installation":
minimum Node.js 20.9).

| Layer | In the project today | Current stable (2026-10-29) | Decision | Why |
|---|---|---|---|---|
| Framework | Next.js 16.3.4 (App Router) | **16.4.3** | **Keep; upgrade to 16.4.x before deploy** (approval needed — a package change) | 16.3.4 carries the critical advisory set found in Segment 1 (cache poisoning on self-hosted deploys, among others); fixed in 16.3.8+/16.4.x. Same major version, no rewrite |
| UI library | React 19.2.8 | **19.3.1** | Keep; upgrade alongside Next | Minor release |
| Language | TypeScript 5, `strict: true` | 7.0.2 published | **Keep TypeScript 5.x for now** | TS 7 is a new major (native compiler); adopt only after Next.js/ESLint tooling formally supports it. Strict mode stays on |
| Styling | Tailwind CSS 4 | 4.3.3 | Keep | Design tokens already flow through `@theme` |
| Validation | Zod 4.5 on every server action | 4.6.7 | Keep (patch upgrade) | All form input is validated server-side, sanitised, rate-limited and honeypot-checked (`lib/leads/actions.ts`) |
| Accessible components | Hand-built (native `<details>`, `<button>`, ARIA tabs, CSS dropdowns) | React Aria Components 1.22, Radix 1.3 | **Keep hand-built; add React Aria only for the dialog, combobox and date picker** when those are built | Native elements already pass Lighthouse a11y 100; a library earns its place only for complex widgets where focus management is hard to get right |
| Images | Plain `<img>` with width/height (no real photos yet) | Next.js `next/image` + sharp 0.35.5 | **Adopt `next/image` when real property photos arrive** | Responsive sizes, WebP/AVIF, lazy-loading. Not used today, which also kept the image-optimiser SSRF advisory out of reach — the Next upgrade closes it before adoption |
| Unit tests | Vitest 5 + Testing Library (66 tests) | 5.0.5 | Keep | Fast, already in CI-ready form |
| Browser tests | None (manual + Lighthouse) | Playwright 1.64 + @axe-core/playwright 4.14 | **Add** (dev dependency, free, no account) | Covers the search, valuation, viewing and repair journeys end-to-end and runs axe accessibility checks on every page — closes the "no E2E suite" gap from Segment 1 |
| Runtime | Node 24 on the owner's PC | Next.js minimum 20.9 | Pin Node 22 LTS or 24 LTS in `package.json` `engines` | Removes the 22/24 drift seen in Segment 1 |

**Architecture pattern kept.** Every external dependency sits behind
an adapter interface the pages already use (`PropertyProvider`,
the leads provider, AI provider). Swapping today's in-memory/demo
implementations for real services means writing one new class each,
not changing pages. Local substitutes until approval: in-memory demo
data (database), mock role cookie (auth — **must never be deployed**),
"notification logged, not sent" (email), in-memory uploads (files),
none (analytics), rule-based assistant (AI).

**Blockers unchanged by this task:** the server-hang defect (not
reproduced in Linux, still open on the owner's Windows machine), no
persistence, mock authentication. See `QA_REPORT.md`.

---

# Historical — Day 3 record (2026-09-07)


## Status of this document

Records the technology choices made on Day 3 (7 September 2026) to build
the approved sitemap and brand direction into a real, working website.
Versions below were checked against the live npm registry on the day of
building, not guessed from memory — this matters because several of these
tools have had very recent major-version releases.

## Blocker resolved before starting

Node.js was not installed on this computer at the start of Day 3 (this had
been flagged since Day 1 and never resolved). With the owner's explicit
approval, Node.js 24 (the current LTS release) was installed via `winget`
(Windows's official package manager) — a one-time, official, free
installer, not a paid service or third-party account.

## Chosen stack

| Layer | Choice | Version (verified 2026-09-07) | Why |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.3.4 | Confirmed as the current stable release on the npm registry; supports React Server Components, server actions (used for form handling today), and static generation for content pages. |
| UI library | React | 19.2.8 | Required by Next.js 16; current stable. |
| Language | TypeScript | 5.x (via `create-next-app`'s pinned range) | `strict: true` enabled in `tsconfig.json` — every file is strictly typed, no implicit `any`. |
| Styling | Tailwind CSS | 4.x | CSS-based theme configuration (`@theme` in `globals.css`) rather than a separate config file — this is where the approved Brand Direction 1 colour tokens and fonts live. |
| Validation | Zod | 4.5.x | Used for server-side validation of every form (see `src/lib/enquiry-schema.ts`) — validation happens on the server regardless of what the browser does, per today's requirement. |
| Component testing | Vitest + React Testing Library | 5.0 / 16.3 | Fast, Vite-native test runner; tests focus on genuinely important behaviour (e.g. "demo content is always visibly labelled") rather than trivial rendering checks. |
| Linting | ESLint (`eslint-config-next`) | 9.x, pinned by `create-next-app` for framework compatibility | Deliberately kept at the version `create-next-app` selected for Next.js 16 compatibility, rather than the newest ESLint 10 release, to avoid an unproven combination. |
| Formatting | Prettier | 3.9.x | Installed but not yet wired into a pre-commit hook — a Day 4+ decision if the owner wants one. |

### A note on very recent major versions

Next.js 16, React 19.2, and Tailwind 4 are all recent major releases as of
today's date. They were installed because they are each package's current
default ("latest") registry version — not a beta or release candidate —
but "current" does not always mean "battle-tested in production for
years." If, during later days, anything in this stack behaves
unexpectedly, downgrading to the previous stable major version (Next.js
15 / React 18) is a reasonable fallback and should be raised with the
owner rather than done silently.

## Directory structure

```
web/                        The Next.js application (kept separate from
                             the project's planning documents at the
                             repository root — see CLAUDE.md's document
                             map for why).
  src/app/                  Pages (Next.js App Router — one folder per URL)
  src/components/ui/        Generic, reusable design-system components
  src/components/layout/    Header, footer, page-level layout components
  src/components/forms/     Form fields and the shared enquiry form
  src/lib/                  Non-visual logic: env validation, site
                             configuration (confirmed facts), form
                             validation schema, server actions
  src/test/                 Test setup
```

## Environment-variable validation

`src/lib/env.ts` validates environment variables with Zod at startup.
Today, only a site URL placeholder exists — there are no real secrets to
validate yet. When a real integration (email, CRM, etc.) is approved, its
required variables must be added to this file with **no default value**,
so the application fails to start rather than silently running with a
missing configuration.

## Security and dependency checks performed

- `npm audit` after every dependency install: **0 vulnerabilities** found
  (see `TEST_REPORT.md` for the exact commands and output).
- One install-script warning was raised by npm for a transitive dependency
  (`unrs-resolver`, used internally by ESLint's module resolution) — its
  postinstall script was **not** approved or run today. This is flagged
  for review, not treated as safe by default.
- No `.env` file exists or was created; `.gitignore` (already in place
  from Day 1) excludes `.env*`, `node_modules/`, and `.next/` — confirmed
  by a dry-run `git add` that these are not staged.
- A manual scan for common secret patterns (API keys, tokens, passwords)
  across the application source found none.

## What was deliberately not done today

- No database was connected (none is needed for today's pages).
- No CMS, authentication, search, email, file storage, analytics, or
  hosting service was connected — see `INTEGRATIONS.md` for the
  comparison of options, all still requiring the owner's approval before
  connection.
- No production deployment or hosting account was created.
