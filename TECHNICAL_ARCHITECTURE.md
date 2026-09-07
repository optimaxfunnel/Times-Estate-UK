# TECHNICAL_ARCHITECTURE.md — Times Estate Ltd

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
