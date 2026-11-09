# Recovery report — 9 November 2026

**In one sentence:** this folder had been copied to this computer
incompletely; the website has been put back into working order, and
most missing files have since been **restored as originals from the
project's own git history**.

Nothing was published, deployed, bought or sent to anyone. No existing
file you or the team created was overwritten. Everything below can be
undone.

## Final position (end of 9 November) — git history repaired

Sections 1–5 below describe the day in order. The final outcome is
this:

- **The damaged `.git` was repaired.** History survives up to commit
  `5284b25` (30 October, "Day 6 Tasks 2–3"). The 16 commits after it
  (31 October to 2 November) are lost: their pack file was missing.
  Their content is largely back, recovered from the last build.
- **71 original files restored from history,** including:
  - `proxy.ts` (admin sign-in check, confirmed present in the last
    build), the original test setup and 7 original test files, and
    the colour-contrast checker;
  - the brand master files, including `te-emblem-transparent.png`;
  - six `segment-1/` documents.
- **The 21 documents rebuilt earlier today were replaced by their
  originals** (30 October versions). Each carries a "Restored from git
  history" notice, plus today's dated entries where relevant. The
  rebuilt versions are kept in `_recovery/backups-2026-11-09/`.
- **Original code restored in place of today's rewrites:** property
  validation, the publishing rules, field rules, the attachment
  boundary, the staff content list, the role banner, the website
  settings and the test settings.
- **Later fixes re-applied,** because the last build or newer tests
  prove they were made after 30 October:
  - image caching for brand images and the intro video;
  - the 21 MB upload limit;
  - no "X-Powered-By" header;
  - the alert form no longer logs email addresses.
- **Checks after the restore:** type-check and lint pass; **266 tests
  pass in 39 files**; the production build passes (42 routes, with the
  proxy active); accessibility re-run gives 74 scans with 0
  violations and no sideways scrolling.
- **Committed** on a new branch, `recovery-2026-11-09`. `main` is
  untouched and nothing was pushed. The pre-repair `.git` is backed up
  in `_recovery/backups-2026-11-09/git-before-repair/`.
- **Finding:** the original property validation needs a full postcode
  (e.g. "SW17 9AA"), but the sample listings store only "SW17". This
  only matters for future imports, so it is recorded, not changed.

---

## 1. What was wrong

| Problem | Effect |
|---|---|
| 21 project documents missing (e.g. `DECISIONS.md`, `TEST_REPORT.md`, `PROJECT_PLAN.md`) | Other documents pointed to files that did not exist |
| About 90 website code files missing, including 20 whole pages (Sell, Let, Landlords, Report a repair, each property's own page, Privacy Policy, About, and more) | The website could not be built or run |
| The website's settings files missing (`next.config.ts` and others) | Security settings and the build setup were gone |
| The downloaded-libraries folder (`web/node_modules`) incomplete | Even the checking tools could not run |
| The version history (`.git`) damaged | Git does not recognise the folder; history cannot be read |
| The GitHub copy (`mmmalik1954/Times-Estate-Ltd`) unreachable | It is private or moved; this computer has no sign-in for it |

The most likely cause is a partial copy from the original computer
(`C:\Users\moves\Desktop\Times Estate Ltd`).

## 2. How the website was recovered

**Most of the code is the team's original work, not a rewrite.** When
the site was last built on the original computer, the build kept a
copy of the source code inside its own working files (`web/.next`).
That copy was extracted:

- **143 original files** were found there.
- **58** were identical, character for character, to files already in
  the folder. That confirms the copy is genuine and matches this
  version of the project.
- **79** were missing from the folder and have been **put back
  unchanged**.
- **4** differed from files already in the folder. The folder's own
  (newer) files were kept and nothing was overwritten.

**Two recovered files turned out to be older versions** that the team
had fixed or retired. The current tests caught both:

| File | Problem | What was done |
|---|---|---|
| `EnquiryForm.tsx` | An early form using the exact pattern behind the critical "server hang" defect fixed on Day 7. Nothing on the site uses it. | Removed (it had only just been put back) |
| `lib/actions.ts` | Wrote the visitor's email address into the server log, which is a privacy problem | Now logs only non-personal details |

**Rebuilt by hand (not recoverable).** Each file is marked
"RECONSTRUCTED 2026-11-09" at the top:

| File | Rebuilt from |
|---|---|
| `lib/property/schema.ts` (checks a property record is complete) | The data model and its tests |
| `lib/property/workflow.ts` (who may publish or change a listing) | The rules table in `ADMIN_AND_CMS.md` |
| `lib/property/field-rules.ts` (which fields are public or private) | Its tests and the data model |
| `lib/security/attachment-store.ts` (repair photos; stores nothing until approved) | Its tests |
| `lib/enquiry-schema.ts` (early enquiry form checks) | The form that used it |
| `lib/content-gaps.ts` (the staff "content status" list) | `CONTENT_REGISTER.md` and `FINAL_LAUNCH_APPROVAL.md` only. Nothing was added that those documents don't record. |
| `next.config.ts` (security headers, upload limit, `/tenants` redirect) | **Security headers recovered exactly** from the last build's records |
| `postcss.config.mjs`, `vitest.config.mts`, `vitest.setup.ts` | Standard setup for the tools the project uses |

**Images.** The favicon was restored byte for byte from the old build.
Three sizes of the owner's emblem (`-120.webp`, `-240.webp` and the
`.png` fallback) were missing. They were re-made by resizing the
owner's own emblem files already in `web/public/brand/`. No new
artwork was created.

**The `brand/` folder is also incomplete.** `LOGO_ASSET_REGISTER.md`
lists a transparent emblem master and six icon sizes. Only 3 master
files are present in `brand/logo-supplied/png/`, and the folder's
image tool (`brand/node_modules`) is broken. The website's own copies
in `web/public/brand/` are complete, so the site is not affected.
These masters can come only from the original copy; they were not
re-made.

**Other fixes:**
- `RoleSwitcher.tsx` (recovered, older) was pointed at the renamed
  development sign-in action.
- `.claude/launch.json` now points at this computer's folder instead
  of the original computer's.
- The libraries were reinstalled at the **exact versions recorded in
  the project's lock file**. Next.js stays at 16.3.4, because the
  upgrade still awaits the owner's "approve the Next.js upgrade".

The old build folder is kept safely at
`_recovery/web-.next-build-from-original-computer/` (1.8 GB). Nothing
was deleted from it.

## 3. Checks run today (9 November 2026)

| Check | Result |
|---|---|
| Type-check (TypeScript) | ✅ Pass, no errors |
| Lint | ✅ Pass |
| Automated tests | ✅ **82 of 82 pass** (17 test files) |
| Production build | ✅ Pass: **41 pages**, the same count recorded on 31 October |
| Browser check on the production build | ✅ Homepage, Sell, property page, Report a repair, Landlords, About, Privacy Policy, Company information, Complaints and others all load. Logo and favicon show. Security headers present. Admin correctly refuses to open on a production build. Draft legal pages carry their draft banner. |

**Update, end of 9 November: full QA re-run.** Accessibility (74
scans, 0 violations), screen sizes (6 widths, 1 defect fixed on
`/cookie-policy`) and Lighthouse performance were all re-run on the
production build. See the addendum at the top of `QA_REPORT.md`.

**Update, later on 9 November: the lost tests have been rewritten.**
There are now **241 passing tests in 32 files**, against 157 on 31
October. They are new tests written against the current code, not the
originals. See `TEST_REPORT.md` for what they cover and the small
findings. The paragraph below describes the position before that.

**Not the same as the 31 October position.** On 31 October the team
recorded **157** passing tests. Only 82 tests survive, because the
other test files were among the missing files and are not kept inside
a build. The lost tests covered areas such as prompt-injection,
property workflow transitions and session tampering. Their subjects
are known, but their exact content is not. **The missing tests are the
main gap left.** They should be rewritten (or recovered from the
original copy) before any launch decision. This was not a full QA
pass: accessibility, responsive and performance audits were not re-run
today.

## 4. Documents

The 21 missing documents have been rebuilt. Each one starts with a
**"RECONSTRUCTED"** notice saying what it was rebuilt from. Records of
past events (`DECISIONS.md`, `CHANGELOG.md`, `TEST_REPORT.md`,
`PROJECT_PLAN.md`) keep only what other surviving documents confirm.
They do not invent dated entries that can no longer be checked.

## 5. What still needs you

1. **The real copy is still worth getting.** It would bring back the
   75 lost tests, the exact original documents and the full version
   history. It is on the original computer
   (`C:\Users\moves\Desktop\Times Estate Ltd`), or on GitHub if you
   sign in as the owner of `mmmalik1954/Times-Estate-Ltd`. If you
   get it, compare before replacing anything. Please don't simply copy
   it over this folder.
2. **Version history.** Because `.git` is damaged, today's work has
   not been committed or pushed (the standing daily commit instruction
   could not be followed). Once a working copy of the repository is
   back, these changes can be committed on top of it.
3. Every launch blocker recorded on 31 October still stands; see
   `FINAL_LAUNCH_APPROVAL.md`. **The site is not ready for
   deployment.**
