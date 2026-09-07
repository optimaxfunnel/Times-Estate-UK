# TEST_REPORT.md — Times Estate Ltd

**Date:** 7 September 2026 (Day 4)
**Scope:** Every check listed in today's brief, plus a baseline check
before starting. All commands were actually executed — nothing below is
assumed or estimated. This file replaces the Day 3 version; see git
history for that day's results if needed.

## 0. Baseline check (before making any changes)

Per today's instruction to check the baseline first: `npm run typecheck`,
`npm run lint`, `npm run test`, and `npm run build` were all run against
Day 3's code before any Day 4 change was made. **All four passed
cleanly** — the baseline was healthy, so no pre-existing failure needed
investigating before starting today's work.

## 1. TypeScript check

```
npm run typecheck   # tsc --noEmit
```
**Result: Pass, 0 errors**, after fixing one real error found during
development (a type mismatch in `Badge` usage on the property detail
page — `Badge` doesn't accept children, so a plain styled `<p>` was used
instead for the demo-property notice).

## 2. Linting

```
npm run lint   # eslint
```
**Result: Pass, 0 errors, 0 warnings**, after fixing two real findings:
- `FavouriteButton` used `useState`+`useEffect` to read localStorage,
  which the `react-hooks/set-state-in-effect` rule correctly flagged as
  a cascading-render risk. Rewritten using `useSyncExternalStore`, the
  React-recommended pattern for subscribing to a browser-only store
  without a server/client hydration mismatch.
- Added a documented `no-unused-vars` override for the project's
  deliberate leading-underscore convention (used when destructuring an
  object specifically to omit fields, e.g. `toPublicProperty()`).

## 3. Unit and component tests

```
npm run test   # vitest run
```
**Result: Pass — 6 test files, 24 tests, all passing** (was 3 files/7
tests at the end of Day 3; 3 new test files added today).

New tests written today, chosen to verify the things today's brief
actually cared about, not just "does it render":
- `roles.test.ts` — every one of the five roles' permission boundaries
  (e.g. a Property Editor cannot approve a property; only an
  Administrator can manage users).
- `types.test.ts` — `toPublicProperty()` never includes the private
  address, internal notes, or assigned staff member; an unverified
  investment yield is stripped by `toPublicCommercialDetails()`, a
  verified one is kept.
- `provider.test.ts` — Draft/Sold properties are excluded from search by
  default and only appear with explicit admin access; filtering by
  category, listing type, commercial use and location all work; an
  impossible price filter returns an empty result set, not an error;
  pagination respects the requested page size.
- `PropertyCard.test.tsx` (extended) — demo status labelling, the status
  badge, and the link to the correct property detail page.

## 4. Production build

```
npm run build   # next build
```
**Result: Pass.** 24 routes built (13 static, 11 server-rendered on
demand for pages that depend on search parameters, cookies, or a dynamic
`[id]`). No warnings.

## 5. Dependency audit

```
npm audit
```
**Result: 0 vulnerabilities**, run again after today's changes (no new
dependencies were added today beyond what Day 3 already installed).

## 6. Secret scan

- Confirmed no `.env` file is tracked by git.
- Searched all source files for common secret patterns (API keys,
  tokens, passwords) — none found. The only matches were this project's
  own comments *explaining* that no real credentials exist yet.

## 7. Functional and security testing (performed live in a browser, not just unit tests)

**Public/private field separation:**
- Fetched a real, publicly-visible property's rendered HTML and
  confirmed its private address and internal notes are genuinely absent
  from the markup (not just hidden by CSS) — matches the unit test, but
  proven against the actual rendered page too.
- Confirmed a commercial property's unverified investment yield value
  (6.8%) does not appear anywhere in its public page's rendered text.

**Approval-state visibility (draft/unapproved/sold never public):**
- A Draft property's detail page (`/property/demo-res-sale-3`) correctly
  returns "Property not found" rather than rendering — even though the
  record exists, a direct/guessed URL cannot reach it.
- A Sold property's detail page likewise returns "not found."
- Public search (`/buy`) excludes both from its results; only 2 of the 4
  residential-for-sale demo properties (the two with a publicly visible
  status) are ever returned.

**Permission boundaries (tested against real pages, switching roles
via the documented dev-only role switcher):**
- As Property Editor: could open a property's edit page and submit
  changes, but attempting to set its status directly to "Available" was
  **rejected server-side** with a clear message — not just a hidden
  button, an actual blocked request.
- The same Property Editor could successfully move the property to
  "Awaiting approval."
- Switching to Manager and approving it to "Available" succeeded.
- Both the submit-for-approval and the approval were correctly recorded
  in `/admin/audit`, with the correct actor role and the correct
  before/after status for each.
- As Enquiry Viewer: the properties list showed "No access" instead of
  an edit link for every row, and navigating directly to an edit page's
  URL was blocked with an explicit permission message, not a crash or a
  silently-broken page.

**Search and empty states:**
- An impossible filter (minimum price £50,000,000) correctly showed the
  "No properties match your search" state, with a working "Clear
  filters" link and a working "Create a Property Alert" link
  pre-filled with the search criteria.
- Every filter field in the search form has a proper `<label>`,
  confirmed by checking each control programmatically — the whole search
  form works with native HTML semantics, so it is keyboard- and
  screen-reader-operable without any extra work.

**Image fallback:** properties with no photography (all of them today)
show a clearly labelled "Photograph not yet supplied" placeholder rather
than a broken image icon or an empty space.

## 8. A real defect found and fixed: admin edit page could get stuck on "Loading…" after saving

**What happened:** after a Property Editor or Manager saved changes on
`/admin/properties/[id]`, the page sometimes never showed the result —
it stayed on a spinning "Loading…" state indefinitely in that browser
tab, even though the save had genuinely succeeded (confirmed by opening
the same page in a new tab, where the correct, updated data appeared
immediately).

**Root cause:** the server action was calling `revalidatePath()` on the
very page that had just invoked it, in addition to the two other pages
that needed it (`/admin/properties` and `/admin/audit`). Next.js's
`useActionState` already refreshes the calling page automatically once
the action finishes — the extra, redundant revalidation of that same
page caused the page's loading boundary to get stuck.

**Fix:** removed the self-referential `revalidatePath()` call, keeping
only the two revalidations for *other* pages that genuinely needed to
be told about the change. Re-tested and confirmed fixed.

## 9. A residual, dev-mode-only quirk found — confirmed NOT present in a production build

While investigating the issue above, a related but distinct symptom was
found: in some navigation sequences (e.g. switching role, then
immediately following a link to another `/admin` page), a browser tab
could get stuck showing "Loading…" for *any* subsequent page in that
same tab — always recoverable by opening a new tab, and the underlying
data was always correct (confirmed via a direct fetch of the same URL,
which returned the correct content every time).

**This was tested specifically to find out whether it would affect a
real deployment:** a full production build (`next build` +
`next start`, not the `next dev` server used for day-to-day
development) was run, and the exact same sequence of actions that
triggered the problem in development **did not reproduce it at all** in
the production server. This strongly suggests the issue is specific to
the development server's hot-reloading behaviour in this very new
Next.js/React version combination (flagged as a risk in
`TECHNICAL_ARCHITECTURE.md`), not a defect that would affect real
visitors or staff using a deployed copy of the site.

**Recommendation:** keep an eye on this during Day 6's dedicated QA
pass, and if it recurs, consider it alongside a possible future
Next.js/React patch version bump — but it should not block today's work
or be treated as a production-blocking defect given it could not be
reproduced outside the dev server.

## 10. Responsive check after adding "Buy" and "Rent" to the navigation

Adding two more items to the primary navigation (now 8 items, matching
`SITEMAP.md`'s originally approved structure) was tested at the same
1024px breakpoint where Day 3 fixed a similar overlap issue. Measured
directly (page width vs. content width, and the navigation's own
position) rather than relying on this environment's unreliable
wide-viewport screenshots (see Day 3's `TEST_REPORT.md` for that
limitation): **no horizontal overflow, and the desktop navigation still
fits on one line at 1024px and above.**

## Summary

| Check | Result |
|---|---|
| TypeScript | Pass |
| Lint | Pass |
| Unit/component tests | Pass (24/24) |
| Production build | Pass |
| Dependency audit | 0 vulnerabilities |
| Secret scan | Clean |
| Public/private field separation | Verified live, not just unit-tested |
| Draft/Sold public visibility | Verified live — correctly hidden |
| Permission boundaries | Verified live across 3 roles |
| Search empty state | Verified |
| Keyboard/screen-reader form access | Verified (native semantics) |
| Image fallback | Verified |
| Defects found | 1 real bug (fixed), 1 dev-only quirk (confirmed absent in production) |
