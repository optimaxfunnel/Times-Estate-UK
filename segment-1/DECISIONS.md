# DECISIONS.md — Times Estate Ltd (Segment 1 entries, 2026-10-19)

Judgement calls made while carrying out Segment 1, with the reason and
the alternative. These entries are to be appended to the running
`/DECISIONS.md` at the repository root when the Segment 1 files are
merged; they are kept separate here so that no owner-created file was
edited in this segment (Rule 3).

## 2026-10-19 — Deliverables placed in a new `segment-1/` folder, not on a git branch yet

**Decision.** The nine Segment 1 documents and the end report were
written to a new folder `segment-1/` at the repository root on the
owner's PC and to `/mnt/project-files/segment-1/` in the project (where
the crawl screenshots also sit). No existing file was modified. A git
branch was **not** created.

**Reason.** This session reaches the owner's computer through folder
tools that read and write files but cannot run `git`. Creating a branch
by hand-editing `.git` internals would risk the repository. The
project's GitHub repository (`mmmalik1954/Times-Estate-Ltd`) could not
be attached to this session ("not found or no access"), so the branch
could not be created remotely either.

**Alternative / next step.** Either the owner runs, in
`C:\Users\moves\Desktop\Times Estate Ltd`:

```
git checkout -b segment-1-audit
git add segment-1
git commit -m "Segment 1: audit, brand source analysis, compliance and tool registers"
git push -u origin segment-1-audit
```

or grants this project access to the GitHub repository (Project
settings → repositories, or [Connect GitHub](https://claude.ai/connect-github))
so the branch and pull request can be made from here, or approves a
Remote Control session for those four commands. The `main` branch is a
safe checkpoint as it stands: `HEAD` equals `origin/main` and the
working tree is clean.

## 2026-10-19 — Treated the supplied logo as the controlling reference, and the repository's current SVG logo as a placeholder to be replaced

The repository's `brand/logo-skyline/` SVG (2026-09-11) is a generic
skyline recreation without the clock, Big Ben or the London Eye. It was
built from a screenshot before the actual logo file was supplied. The
brief makes the supplied JPEG the controlling asset, so the SVG is now
recorded as interim. No redraw was done (brief item 7).

## 2026-10-19 — Measured colours recorded as tokens; existing tokens not changed

`globals.css` still carries the Phase 6 colours (`#A8551A`, `#D9772E`).
The brief forbids redesign in this segment, so the measured palette and
companions are proposed in `BRAND_SOURCE_AUDIT.md` §6 and will replace
the tokens only after Gate 1 approval. Where a measured colour fails AA,
the original is kept for decorative use and a companion is recorded —
never a silent substitution.

## 2026-10-19 — Form submissions were attempted in the sandbox, not on the owner's machine

The standing instruction since Phase 1 was not to re-trigger the hang
defect on the owner's machine. The isolated container has no such risk,
so four real-click submissions were run there. They did not reproduce
the hang. This is recorded as evidence that the fault may be
environment-specific, not as closure.

## 2026-10-19 — Live site inspected by server-side fetch only

Browser-level access to `timesestates.co.uk` was refused by the
session's network policy. Rather than stop, the pages were read through
a text fetcher. Performance, headers and visual checks for the live site
are listed as open in `QA_REPORT.md` §5 and §7.

## 2026-10-19 — Redress and CMP numbers left at "Requires verification"

Neither scheme offers a public member search that could be reached from
here. The owner is asked (Question 3) for scheme confirmation and
certificates rather than this project treating a certificate image as
proof.

## 2026-10-19 — Compliance rows use the brief's four statuses

The brief asks for VERIFIED / MISSING / NOT APPLICABLE / PROFESSIONAL
REVIEW REQUIRED. The project's five-label vocabulary continues in
`CONTENT_REGISTER.md`. The two are mapped at the top of
`COMPLIANCE_REGISTER.md` and no row was marked VERIFIED without a named
source checked on the stated date.

## 2026-10-19 — "Guaranteed rent" and "Risk Free" flagged rather than carried over

Both appear on the live site. A rent guarantee is a financial promise
whose terms determine its regulatory treatment, and "Risk Free" is an
absolute claim. They are held for professional review (compliance rows
10 and 22) and Question 4, not reproduced in any register as approved
content.

## 2026-10-19 — Next.js upgrade recommended, not performed

`next` 16.3.4 carries a critical advisory set. The brief forbids
installing packages in this segment, so the upgrade is logged as the
first Segment 2 action requiring approval, with a note that the
codebase does not use the features behind the RCE/SSRF advisories.

## 2026-10-19 — Screenshots of the local build kept, live-site screenshots from 2026-10-18 referenced

The 64 new screenshots (desktop/mobile, every route) sit in
`/mnt/project-files/segment-1/screenshots/` in the project folder only.
They were deliberately not written into the repository folder on the
owner's PC: 13 MB of PNGs do not belong on a git branch. The earlier
`website-screenshots/` set in the project folder (2026-10-18) covers the
same local build and is not duplicated.
