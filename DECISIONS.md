# DECISIONS.md — Times Estate Ltd

A running log of judgement calls made during this project that aren't
simple bug fixes — what was decided, why, and what the alternative
would have been. Business-facing decisions (pricing, legal wording,
compliance positions) remain the owner's or their professional
advisers', per `CLAUDE.md` Rule 5; this log covers project-management
and technical judgement calls made in carrying out an instruction.

## 2026-09-09 — Phase 3: corrected a missing decision, then finalised Direction E

**Decision:** the Phase 3 brief stated "my selected creative direction
is recorded in DECISIONS.md" — it was not; no selection message had
been sent. Rather than guess (which risks building an entire logo
suite, stationery set, and media pack around the wrong direction),
this was flagged directly and the owner was asked to choose. **Answer:
Direction E — "Claret."** This entry is the actual record the Phase 3
brief assumed already existed.

**Why:** CLAUDE.md Rule 1 (never invent) and Rule 5 (high-risk
decisions stay with the owner) both apply directly to a foundational
choice this consequential — proceeding on an assumed answer would be
exactly the kind of invented fact this project has avoided for eight
days.

## 2026-09-09 — Phase 3 production decisions

**No unverified regulatory information in print artwork.** The
redress scheme and Client Money Protection membership numbers carry
"Requires verification" status in `CONTENT_VERIFICATION_REGISTER.md`
— genuinely different from the phone numbers/domain (which the owner
supplied directly and the brief explicitly said to use). Every printed
item omits both numbers, using a placeholder line pointing to
`COMPLIANCE_REGISTER.md` instead. **Why:** the brief's own instruction
("do not include unverified information in final artwork") most
plausibly targets exactly this category — printing an unverified
membership number on physical stationery carries real compliance risk
that a phone number the owner typed directly does not.

**Local, offline tooling installed for asset export.** `sharp` (a
free, open-source npm image library) was installed in a new,
self-contained `brand/package.json` — deliberately separate from
`web/`'s own dependencies, never deployed, never exposed to the
internet. Treated the same as Day 6/7's use of `npx lighthouse`/
`prettier`: a normal local engineering tool, not a "third-party
integration" requiring separate approval. A high-severity transitive
vulnerability the install initially flagged (`libvips`/`libheif` CVEs)
was fixed immediately via the available patched version.

**Found and fixed: SVG masters needed their own embedded font
reference.** Text-based logo lockups (wordmark, primary, stacked)
initially referenced `'Playfair Display'` by name only — correct in
principle, but meant the files depended on the font being available
wherever opened, and rendered as a generic fallback serif when
verified in-browser via `<img src>`. Fixed by embedding a `<style>
@import` of the exact Google Fonts URL directly inside each SVG, so
every master is self-contained. Re-verified in-browser afterward:
genuine Playfair Display, not a fallback.

**Found and fixed: a bug in the verification harness itself.** A
temporary local preview page used to check the logos had a CSS
specificity error (`.row > div { background: #fff }` beat a more
specific-looking but lower-specificity `.dark-bg` class), making the
reversed logo variant appear washed-out on a white card instead of its
intended dark background. This was a bug in the throwaway preview
tool, not in any delivered brand file — noted here so the QA trail is
honest about what was actually wrong versus what just looked wrong.

**Property-board status colours stay within the approved palette.**
An early draft introduced unrelated hues (a blue for "To Let," a brown
for "Commercial") to distinguish the five board statuses. Corrected to
use only tints/shades of Claret and Ink, so the five boards read as
one consistent brand rather than introducing off-brand colours never
approved in any creative direction.

**Scope: seven of twelve stationery items rendered as files; five
specified in full detail instead.** DL/C4 envelopes, an invoice/
quotation header, a valuation cover, and a presentation folder were
written up as complete, ready-to-build specifications (exact
dimensions and layout) rather than rendered today, given the sheer
size of the full brief. Similarly, two representative social templates
were rendered in full; the remaining ~70-combination platform ×
content-type matrix was specified as a system (dimensions researched
and documented) rather than built speculatively with placeholder
listings. **Why:** matches this project's established pattern (Day
6/7) of being explicit about what's real versus specified rather than
either quietly skipping items or overstating completeness — see
`BRAND_GUIDELINES.md` §8 and `MEDIA_ASSET_REGISTER.md` for the exact
list either way.

**PDF export not generated.** No PDF-generation tool exists in this
environment without adding a heavy dependency (a full headless-browser
print pipeline) for a single format. SVG masters are print-ready as
delivered — a print vendor or design tool converts to PDF (and to
outlined text) as a standard, one-step final-file action.

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
