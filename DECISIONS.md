# DECISIONS.md — Times Estate Ltd

A running log of judgement calls made during this project that aren't
simple bug fixes — what was decided, why, and what the alternative
would have been. Business-facing decisions (pricing, legal wording,
compliance positions) remain the owner's or their professional
advisers', per `CLAUDE.md` Rule 5; this log covers project-management
and technical judgement calls made in carrying out an instruction.

## 2026-09-08 — Phase 2 Round 2: bolder single-hue directions after rejection, no pre-selected recommendation

**Decision:** the owner rejected all three Round 1 directions (too
safe, wrong colour mood, too similar to each other/Day 2). Rather than
guess again, two short clarifying questions were asked: what didn't
work, and which of four described colour moods felt closest. The
owner chose "bold contemporary colour" — one vivid, confident hue used
generously, explicitly not the deep-moody-luxury or monochrome-plus-
accent alternatives also offered.

**What was done:** three new directions (D "Cobalt", E "Claret", F
"Emerald"), each built around a different single saturated hue used
as a bold field rather than a restrained accent, each with a
genuinely different typographic character (blocky grotesque / high-
contrast serif / rounded geometric sans) so they don't read as three
colourways of the same idea. Round 1's content was kept in
`BRAND_CONCEPTS.md`, marked REJECTED, rather than deleted — the
reasoning that didn't land stays on record. The comparison Artifact
was updated in place (same URL) rather than creating a second link.
**No direction is pre-recommended this round** — genuinely a three-way
trade-off, stated as such, rather than defaulting to a "safe" pick
after the last recommendation was itself rejected as too safe.

**Why:** two short questions cost far less than a third blind attempt,
and the risk of repeating whatever caused the rejection was real.
Deliberately not recommending one this round avoids repeating the
exact feedback ("too safe") on the recommendation itself.

## 2026-09-08 — Phase 2 explored three new creative directions rather than re-presenting Day 2's

**Decision:** `BRAND_DIRECTIONS.md` (Day 2) already proposed three
original directions, one of which ("The Established Line") is already
the live design system. Phase 2's brief asked for "three genuinely
distinct creative directions" for a "premium rebrand." Three entirely
new directions were developed (A "The Long View", B "Meridian", C "The
Folio") rather than re-presenting the existing three.

**Why:** re-submitting Day 2's work wouldn't give the owner anything
new to compare against what's already built, and the brief's own
framing ("rebrand") signalled an appetite for fresh options. Day 2's
directions and the live design system are referenced throughout
`BRAND_STRATEGY.md`/`BRAND_CONCEPTS.md` for continuity, not discarded.

**Also decided:** the visual comparison prototype was built as a
single published Artifact (palettes, logo sketches, type, mini UI/
business-card/social-post mockups for all three directions) rather
than as code inside `web/` — this satisfies "make only the minimum
prototype needed to compare" and "do not apply a concept across the
whole website" without touching the live, tested site at all.

## 2026-09-08 — New Phase 1 documents made primary; old documents kept in place, unedited

**Decision:** the six Phase 1 documents (`PROJECT_BRIEF.md`,
`WEBSITE_AUDIT.md`, `CONTENT_REGISTER.md`, `COMPLIANCE_REGISTER.md`,
`DECISIONS.md`, `QA_REPORT.md`) were initially created as thin
summaries cross-referencing the existing Day 1–7 documents. Asked
directly, the owner chose to make the new six **primary** going
forward. Investigating what that would take found the five overlapping
old documents (`BUSINESS_REQUIREMENTS.md`,
`CONTENT_VERIFICATION_REGISTER.md`, `CONTENT_REQUIRED.md`,
`REGULATORY_READINESS.md`, `TEST_REPORT.md`) are referenced in 46+
places, including 16 application source files where the filename
appears as literal text shown to visitors (e.g. a placeholder banner
reading "see /CONTENT_REQUIRED.md").

**What was done:** `CLAUDE.md` and `README.md`'s document maps were
updated to clearly mark the six new files as primary/current-state,
with the five old files reframed as detailed historical background.
**The five old files themselves, and every application-code reference
to them, were left exactly as they were** — not moved, archived, or
rewritten.

**Why:** given the true scope, a full retirement (merging complete
historical detail into the new files, then rewriting every reference
including user-visible page text) is a much larger, higher-risk change
than the original request implied. Presented with the real trade-off,
the owner chose the version with zero risk of breaking a working,
tested site. This can be revisited properly, as its own dedicated
piece of work, if a full retirement is wanted later.

## 2026-09-08 — Recorded new phone numbers and displayed them, but did not add them to the header

**Decision:** the owner supplied a landline and mobile number in
today's prompt. These were added to `web/src/lib/site-config.ts` and
displayed on `/contact` with a "Supplied by owner" badge. They were
**not** added to the site header, even though `SITEMAP.md` originally
planned for a header phone number "once confirmed."

**Why:** today's brief explicitly says "do not restructure or redesign
the project." Adding a number to `/contact` is a content update within
an existing page; changing the header's layout is a design change best
done deliberately, not as a side effect of an audit-phase content fix.

## 2026-09-08 — Did not verify or browse the externally-referenced domain

**Decision:** the owner's prompt referred to `https://timesestates.co.uk`
as a "live domain." This was recorded in `BUSINESS_REQUIREMENTS.md` and
`CONTENT_VERIFICATION_REGISTER.md` as **Supplied by owner, not
independently verified** — no WHOIS/DNS lookup was performed and the
external site was not browsed.

**Why:** verifying domain ownership isn't necessary to audit this
project's own local codebase, and browsing an external site the owner
merely named, without a clear need, is outside today's scope. If the
owner wants this checked, that's a simple, low-risk follow-up.

## 2026-09-08 — Did not re-trigger the critical server-hang defect

**Decision:** today's audit did not submit any lead/enquiry form live,
to avoid re-triggering the unresolved critical defect recorded in
`TEST_REPORT.md` §5 (certain submissions can hang the entire dev
server). Functional correctness of the form pipeline was instead
confirmed by code inspection and by citing the prior day's evidence.

**Why:** deliberately destabilising today's own audit environment for
a defect already thoroughly documented would waste time without adding
new information.

## 2026-09-08 — Flagged tenancy deposit protection as a new, previously-untracked gap

**Decision:** today's prompt asked me to confirm the "deposit scheme"
among other regulatory facts. This is a genuinely different
requirement from Client Money Protection (which was already tracked)
— added as a new row to `BUSINESS_REQUIREMENTS.md` and
`COMPLIANCE_REGISTER.md`, status Missing, and included in today's
question list.

**Why:** CLAUDE.md Rule 1 requires never assuming a fact is already
covered — this is a real, previously-unrecorded compliance
requirement, not a duplicate of CMP.
