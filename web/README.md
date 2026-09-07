# Times Estate Ltd — Web Application

The Next.js application for the Times Estate Ltd website. See the
repository root's `README.md` for the full project overview and
documentation map.

## Requirements

- Node.js 24 LTS (installed via `winget` on the owner's machine — see
  `../TECHNICAL_ARCHITECTURE.md`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The admin area is
at `/admin` — see `../ADMIN_AND_CMS.md` for the roles available via the
on-page development-only role switcher (**not real authentication —
never deploy this publicly as-is**).

## Scripts

| Command             | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Start the development server (Turbopack).                |
| `npm run build`     | Production build.                                        |
| `npm run start`     | Run a production build locally (`npm run build` first).  |
| `npm run typecheck` | TypeScript check, no output files.                       |
| `npm run lint`      | ESLint.                                                  |
| `npm run format`    | Check Prettier formatting (`prettier --write .` to fix). |
| `npm run test`      | Run the unit/component test suite (Vitest).              |

## Known issues

- **A critical defect exists where certain form submissions can hang
  the entire server** (both `next dev` and a production build) —
  see `../TEST_REPORT.md` §5 before doing anything with live forms.
  Not yet root-caused.
- In `next dev` only, a browser tab can occasionally get stuck showing
  the global loading fallback after certain navigation sequences —
  a workaround is opening a fresh tab; confirmed absent from production
  builds in prior testing (see `../TEST_REPORT.md` history).

## Environment variables

See `../.env.example` at the repository root for the full list.
`NEXT_PUBLIC_SITE_URL` defaults to `http://localhost:3000` and must be
set to the real production domain before deployment — see
`../DEPLOYMENT.md`.

## Technology

Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict),
Tailwind CSS 4, Zod. Full reasoning in `../TECHNICAL_ARCHITECTURE.md`.
