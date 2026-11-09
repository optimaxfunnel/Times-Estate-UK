# DECISIONS.md — Times Estate Ltd

> **Restored 9 November 2026 from the project's git history** (commit
> `5284b25`, 30 October 2026). This file was missing from the folder on
> this computer. Any changes made to it between 31 October and
> 2 November could not be recovered, so Day 7 updates may be absent.
> Anything dated 9 November was added after the restore. See
> `RECOVERY_REPORT_2026-11-09.md`.

---

### 2026-11-09 — Intro video stays on every first-visited page (owner decision)

- **Decision (owner):** keep the full-screen intro video on whichever
  page a visitor first lands on, not only the homepage. The owner's
  words: "Keep on every page".
- **Trade-off accepted:** on a phone's first visit, the main content
  appears after about 3.3–3.6 s (Lighthouse mobile performance 87–93).
  Returning visitors are unaffected (97–100; 0.8–1.1 s). Measurements
  are in `QA_REPORT.md` (2026-11-09 addendum).
- **Not done:** no change to the code.

### 2026-11-09 — Recovery of an incomplete project copy

- **Decision:** Restore the website from the original source code kept
  inside the last build (`web/.next`) rather than rewriting it. Where
  a recovered file and an existing file differ, keep the existing
  (newer) file. Rebuild only the modules that could not be recovered,
  and label them "RECONSTRUCTED".
- **Why:** That keeps the team's own tested work. 58 recovered files
  matched existing ones exactly, which proves the source is genuine.
- **Decision:** Remove the recovered `EnquiryForm.tsx` instead of
  restoring it.
- **Why:** Nothing uses it, and it contains the pattern behind the
  Day 7 critical server-hang defect. The current regression test
  rejects it.
- **Decision:** Stop the early enquiry and alert actions from logging
  personal details.
- **Why:** The current privacy test requires it.
- **Decision:** Keep Next.js at 16.3.4 when reinstalling.
- **Why:** The upgrade still awaits the owner's written approval.
- **Not done:** No commit or push, because the git history in this
  folder is damaged. Nothing deployed.

---

---


A running log of judgement calls made during this project that aren't
simple bug fixes — what was decided, why, and what the alternative
would have been. Business-facing decisions (pricing, legal wording,
compliance positions) remain the owner's or their professional
advisers', per `CLAUDE.md` Rule 5; this log covers project-management
and technical judgement calls made in carrying out an instruction.

## 2026-10-29 — Day 5 Task 4: repair reporting

**Journey collects:** property address plus an optional tenancy or property reference (new), issue category, description, up to 5 photos or PDFs, contact details, access information, the tenant's own urgency choice, and two separate consents (privacy; sharing with contractors).

**Uploads — two real gaps found and fixed:** the 5-file limit was defined but never enforced (now it is), and the file type was taken on trust from the browser (a renamed program could pass as a photo). Each file's first bytes are now checked against its claimed type (JPEG, PNG, HEIC, PDF). Bad files now return a clear error to the tenant instead of being silently noted. Size limit 8 MB each; names cleaned.

**Storage (not connected):** `lib/security/attachment-store.ts` fixes the rules any provider must follow — private bucket, no public links, short-lived signed links only for Managers/Administrators, files unopenable until a malware scan marks them clean (infected ones quarantined), and deletion 12 months after the repair is closed (**proposed — owner to confirm**). Until storage is approved, files are checked and then discarded; only a description is kept.

**Emergency guidance:** immediate danger, gas, fire, serious flooding, loss of electricity — public UK numbers (999, 0800 111 999, 105). The box now states that its **wording requires professional review** and that Times Estate Ltd's own out-of-hours arrangements are not yet confirmed, so none are promised.

**The assistant never classifies:** new refusal rule — it will not say whether something is an emergency or safe; it points to the guidance and 999. The tenant's urgency choice sets priority; staff decide.

Tests 111 → 116.

## 2026-10-29 — Day 5 Task 2: valuation and viewing controls

**Four kinds of valuation, kept apart** (`lib/valuation-terms.ts`, shown to visitors on Sell, Let and Commercial): initial market appraisal (what the site books, free, in person); automated estimate (not offered); formal valuation (qualified valuer); regulated valuation (RICS-registered valuer).

**A figure needs an authorised person.** Valuation enquiries now have an internal "Valuation record" in admin. Only a Manager or Administrator can confirm a figure; it is stamped with who and when, written to the audit log, and never shown publicly. An automated estimate can never be recorded as a valuation, and a formal or regulated valuation needs the valuer's name and report reference (`lib/leads/controls.ts`, 8 tests).

**Viewing requests.** The request now captures the property id as well as its address; dates must be today or later (checked on the server); finance or move-in timing is asked as the qualification question; the lead notification names the property's assigned staff member, or the branch if none; the confirmation page says the viewing is not confirmed. **A viewing can only be marked "Appointment booked" after staff tick that access has been agreed with the occupier** (and the landlord or owner where needed) — the website never confirms one itself.

Also fixed: field labels that already ended in "(optional)" showed the marker twice. Tests 98 → 106.

## 2026-10-29 — Day 5 Task 1: secure forms

- **One new record type**, "Landlord or vendor enquiry", for the only
  form in the brief that had no home; placed on `/landlords` and given
  a proposed route in `EMAIL_AND_FORM_ROUTING.md`.
- **Confirmation is now a page** (`/enquiry-received`), not just a
  message in place, so every form ends the same way. The address
  carries only the form type and record reference.
- **Browser-side checks added in front of the server checks**, never
  instead of them; the error summary takes focus so screen-reader users
  hear what to fix.
- **No live form submission was sent while testing.** The unresolved
  server-hang fault was triggered by form submissions on this PC
  before; it was not re-triggered on purpose. Browser checks were tested
  live; the server pipeline is covered by existing tests.
- **Outbound email stays off** pending the owner's approval of
  recipients, reply-to, wording, retention and provider.

## 2026-10-29 — Day 4 Tasks 3–4: listing and detail pages, property search

**Listing experiences.** The four searches (residential for sale / to let,
commercial for sale / to let) stay four separate, shareable pages, now
joined by a category switcher at the top of each. Each keeps its own
filters: residential gets bedrooms and property type; lettings add
furnishing and an "available by" date; commercial gets use and a floor-
area range; all get price, location, area, tenure, features and
availability.

**Detail pages** now also show floor plans, brochure and virtual tour
(each "Not yet supplied" when missing), an Energy Performance (EPC) panel
that says "EPC not yet recorded — Missing" rather than staying silent, a
visible breadcrumb that points to the right category (commercial pages
used to point to Buy/Rent), and a "Prefer to talk?" phone route beside
the viewing form. The existing share button, favourites, viewing request
and material-information disclaimer are kept. Demo listings now read
"Sample property — invented for testing, not a genuine Times Estate Ltd
instruction", and every demo address is plainly fictional ("Sample
Street", "Placeholder House").

**Search additions:** "Save this search" (stored in this browser, listed
on Saved properties — the foundation for alert emails once an email
service is approved); no-result suggestions that each drop one filter;
everything in the URL so any search can be shared or bookmarked.

**Deliberately not built:**
- *Radius search* — needs coordinates for every listing and a geocoding
  or map service (a third-party integration, Rule 4). The data model
  already has a coordinates field; the filter is added when a provider is
  approved.
- *Map view* — not approved; the "Search by Area" panel stays.
- *Incremental loading* — numbered pagination is kept: it is simpler for
  keyboard and screen-reader users and gives every page its own URL.

**Checks:** 86/86 tests (5 new for the filters, including that no URL can
make a non-public property appear); Lighthouse accessibility 100 on
`/rent`, `/commercial/to-let`, a no-results search, two property pages
and Saved properties; typecheck, lint and production build pass.

## 2026-10-29 — Core content pages built (no database or integrations needed)

**Built:** `/why-choose-us`, `/landlords`, `/buyers` (Buyers & Tenants, one page with two sections; `/tenants` redirects to its tenants section), `/areas`. Already existing and kept: Home, About, Residential, Commercial, Property Management, Contact, and the legal pages — every legal page now carries the "Draft — requires legal review" banner (Fees was missing it; added).

**Judgement calls:**
- *Why Choose Us* also carries the sitemap's "How we protect you" content (redress, CMP, PI insurance, deposit scheme), each with its real status, rather than a second near-duplicate page.
- *Areas We Cover* lists the seven areas printed on the existing live website, labelled **Requires verification**, and is `noindex` until coverage is confirmed and real guides exist. No area guide or coverage claim is made.
- *Guaranteed rent* is mentioned on Landlords only to say it is not offered until verified and legally reviewed.
- No reviews, statistics, team, awards, fees or "best/leading" claims anywhere; every unverified item shows Supplied by owner, Missing, Requires verification or Requires professional review.

Navigation and the XML sitemap updated. Checks: typecheck, lint, tests 69/69, production build; every page returns 200.

## 2026-10-20 — Segment 2 (strategy, design-application options, sitemap, journeys, SEO/redirects) delivered at Approval Gate 2

**Instruction:** "I approve Segment 1. Complete Segment 2 only." —
audiences, jobs/objections/trust/conversions, evidence-based
positioning with every unsupported claim flagged, three design-
application options (A Heritage London · B Modern Property Platform ·
C Boutique London Agency) on the same identity and colour system with
desktop/mobile header, search hero, property card, service card,
valuation CTA, footer and typography for each, a recommendation
without choosing, the sitemap/navigation, critical journeys with
page-specific CTAs, and an SEO/redirect strategy. Stop at Gate 2.

**Where the deliverables went, and why not a `segment-2/` folder.**
Segment 1 wrote to `segment-1/` because that session could not run
git and would not touch existing files. This session can, and
`CLAUDE.md` names the root documents as primary — so the Segment 2
content was written **into** `BRAND_STRATEGY.md`, `SITEMAP.md`,
`USER_JOURNEYS.md`, `CONTENT_REGISTER.md` and this file (each with the
earlier content kept beneath, marked historical where superseded),
and the two new documents `DESIGN_APPLICATION_OPTIONS.md` and
`SEO_REDIRECT_PLAN.md` were created at the root. `segment-1/` is
untouched and is cited as a source throughout; its own `DECISIONS.md`
entries (2026-10-19) remain there and are not duplicated here.

**Segment numbering.** Segment 1 proposed its own seven-segment plan
(`segment-1/PROJECT_BRIEF.md`) in which "Segment 2" was facts,
identity and architecture decisions. The owner's Segment 2 instruction
is the strategy/IA/design-options deliverable above; this session
followed the instruction, not the proposal. The architecture
decisions (Next.js upgrade, persistence, auth, email provider) remain
open Rule 4 approvals and are not advanced by this segment.

**Settled questions not repeated.** Segment 1's seven questions are
still unanswered; none is re-asked. Where a deliverable depends on one,
the dependency is named inline (Q1 artwork ownership, Q3 regulatory
confirmations, Q4 services actually offered, Q5 fees, Q6 listings, Q7
routing/access). The only question at Gate 2 is the option choice.

**Judgement calls made in the deliverables:**

- *Guaranteed Rent* is excluded from the sitemap (route reserved):
  neither factually verified nor professionally reviewed — the brief's
  own condition.
- *Audience "Investors"* is treated as a sub-audience of landlords,
  inferred from the live site's own language, with "no return figures"
  as a hard rule rather than a tone preference.
- *Canonical host*: `www.timesestates.co.uk` recommended over
  `DEPLOYMENT.md` §5's earlier bare-domain preference, because that is
  what is indexed; recorded as a decision for the owner only if they
  object.
- *Live-site redirect map*: decided row by row from Segment 1's URL
  register; the two stale listings are the only rows left to the owner
  (301 vs 410 depends on whether they are genuinely available).
- *Header navigation* grouping built on 2026-10-20 (Properties ·
  Landlords · Tenants · Services · About · Contact) is adopted in the
  proposed sitemap with its dropdown contents settled, replacing the
  Phase 4 Buy-first flat list that was itself never approved.
- *Colour tokens*: the options use Segment 1's measured values. The
  owner's same-day instruction "do not make changes to colour scheme"
  was followed for the build (tokens untouched); applying the measured
  values is proposed as part of whichever option is chosen, since the
  current `#A8551A`/`#D9772E` are approximations inside the same
  family and the swap is reversible. Flagged at Gate 2 as "unless you
  object", not as a separate question.
- *Style tiles* were produced on a Design canvas artifact rather than
  as code in `web/`, matching the Phase 2 and Phase 4 pattern: the
  brief says "show inspectable concepts or style tiles without
  building the full website". The emblem on the canvas is the installed
  asset; the wordmark on the tiles is set in Playfair Display, the
  face every option proposes for it.
- *Recommendation*: Option B, with "B + A's typography" named as the
  specified combination if more heritage character is wanted. The
  choice is explicitly left to the owner.

**Also recorded:** Segment 1 (2026-10-19) advised against using the
supplied logo file on the website until its ownership was confirmed.
The owner's direct instruction the following day ("install the
following logo") overrode that advice for the emblem; the ownership
question (Q1) stays open and the emblem's use is reversible.

## 2026-10-20 — Front end rebuilt to the owner's reference homepage; owner-supplied logo installed (emblem only — the supplied file's wordmark is unusable)

**Instruction:** "I want to build the front end of the website to look
like the first attachment [the reference homepage screenshot first
supplied on 2026-09-11] and logo like the second attachment [a new
clock-and-London-skyline logo]. Please do not make changes to colour
scheme." Earlier the same day the owner had sent the logo alone
("install the following logo") and, when the problem below was
explained, confirmed the file "looks very odd" — then restated the
instruction with both attachments. No further questions were asked:
the owner had already dismissed a question set about this same
reference on 2026-09-11 and given a direct instruction instead, so
the judgement calls below were made and are recorded here, each easy
to reverse.

**The logo file, and what was done about it.** The supplied file is a
1206×877 JPEG *screenshot* of the logo inside an image viewer: a black
frame, a white rounded card, and a circular "share" button baked into
the bottom-right corner, sitting directly on top of the "D" in "LTD".
Cropping can't remove it (it overlaps the letter) and painting over it
visibly damages the letterform — tried and rejected rather than
shipped. So: the **emblem** (the clock-and-skyline artwork above the
wordmark, which the overlay doesn't touch) was extracted, its white
ground knocked out to transparency, and installed; the **wordmark**
("TIMES ESTATE LTD / LONDON PROPERTY EXPERTS") is rendered as live
text beside it in the site's heading face and colour tokens
(`web/src/components/brand/BrandLockup.tsx`). This matches how the
reference homepage itself shows the logo (emblem + text lockup in the
header), is sharper at every size than a raster of the text would be,
and sidesteps the damaged letter entirely. Generator:
`brand/build-supplied-logo.mjs`; inventory: `LOGO_ASSET_REGISTER.md`.
**A clean export of the original artwork (PNG with transparency, or
vector) is still wanted** — it would let the wordmark be set exactly
as drawn (the supplied wordmark has a copper gradient and small-caps
"TIMES" that live text approximates with the flat accent token and
uppercase Merriweather). Favicon/app-icon slots were overwritten with
an emblem-on-white tile (a favicon is one canonical slot); the
previous skyline SVG identity's files stay in place, untouched.

**Colour scheme untouched, as instructed.** Every token in
`globals.css` is byte-identical to before; the reference's and the
logo's black/white/copper read correctly through the existing
`--color-ink` / `--color-accent` / `--color-accent-vivid` tokens, and
re-sampling them would re-risk the Phase 6 contrast fix. Three small
text colours that were introduced today at 50–55% ink opacity and
failed WCAG AA on Lighthouse's first run were switched to the existing
`--color-secondary` token (5.97:1) — a use of the palette, not a
change to it.

**What was built to the reference, and the four places it deliberately
departs from it** (each a standing rule, not a new opinion):

1. *Header:* lockup · grouped nav with CSS-only dropdowns (Home ·
   Properties · Landlords · Tenants · Services · About · Contact) ·
   search · "Get a Valuation" · phone + "Call us today". **This
   regroups the SITEMAP.md navigation** — every dropdown entry is an
   existing route; nothing new was created and the old flat list is
   one level down. Recorded as a change to the approved IA pending
   the Segment 2 sitemap work that followed the same day.
2. *Hero:* "Browse London Properties", three-tab quick search (Buy ·
   Rent · Commercial, the commercial tab choosing For Sale / To Let)
   posting into the existing search pages. **Departure:** the
   reference's photographs are stood in for by a generic skyline
   illustration — no photography has been supplied and none is
   invented or stock-sourced without approval.
3. *Service strip:* Sales · Lettings · Management · Commercial ·
   Construction. **Departure:** Construction stays "mention only"
   (owner's Phase 4 answer): its tile links to the construction phone
   line, not to a page, and says only "Construction · Renovation" —
   the wording on the owner's own business card — not the reference's
   "extensions · refurbishments · all types of construction".
4. *Listing explorer:* filter sidebar with real facet counts (property
   type, use, bedrooms, price, location, features, availability — all
   multi-select, all plain GET parameters), results grid with sort /
   grid-list toggle / pagination, and an area panel; reused on `/buy`,
   `/rent`, `/commercial/for-sale`, `/commercial/to-let` so every
   search page shares one pattern. **Departures:** the count is the
   real count of demo listings (7), not "672"; every card carries the
   "Sample property — not real" ribbon and the results header carries
   the MISSING badge; and the reference's interactive map is an
   honest **"Search by Area"** panel (areas drawn from the listings,
   an explicit note that a map view follows a map-provider approval
   under Rule 4) with an abstract graphic, not a fake map.
5. *Valuation band:* "Get Your Free Property Valuation" (accurate —
   `valuation-terms.ts` defines the initial appraisal as free) with
   three evidence-safe points. **Departure:** the reference's named
   five-star testimonial is not reproduced (Rule 1); the slot shows
   "Client reviews — MISSING" with a one-line explanation, the same
   treatment the site already gives every unsupplied fact.
6. *Footer:* light, single-row lockup/nav/contacts/socials to the
   reference, **plus** the link columns and regulatory/company line
   the reference omits but a UK agency's site has to carry. The
   social-links row still renders nothing (no profile supplied).

**Removed:** the hero slideshow (`HeroSlideshow`, its 5 tests), the
four-tab `HomeSearchTabs`, `SellLetCtaBand`, `PropertySearchForm` and
`PropertyResultsGrid` — all superseded by the components above and
recoverable from git. Test count 69 → 66 (−5, +2 new header tests).

**Data layer, extended not replaced:** `PropertyFilter` gains
multi-value `propertyTypes` / `commercialUses` / `bedrooms` /
`postcodes` / `statuses` (the last never widens past the public
status set); `buildListParams` now accepts an optional scope so the
homepage searches everything public; a new `lib/property/facets.ts`
counts options. The provider interface, admin area and lead pipeline
are untouched.

**Verified:** typecheck / lint / Prettier / tests (66/66) /
production build (33 routes) all pass. Lighthouse against the
homepage: desktop Accessibility 100 · Best Practices 100 · SEO 100
(after fixing the two defects its first run found — the contrast
issue above and header/card links whose `aria-label` omitted their
visible text, WCAG 2.5.3); mobile Accessibility 99 → the one finding
(a `role="status"` on the results heading removing it from the
heading outline) fixed. Dropdown menus confirmed to open on hover and
keyboard focus; every search route confirmed 200 with multi-value
filters; mobile header confirmed to fit at 375px with the menu
opening and listing every grouped route. Performance was not
re-measured against a production server today — the Phase 6 figures
stand as the last measured values and should be re-run before launch.

**Not done, still open, unchanged:** the critical server-hang defect,
the missing persistent database, real admin authentication, every
compliance item in `COMPLIANCE_REGISTER.md`, an OG image, and a
stationery/social pack for this identity.

## 2026-09-11 — Second rebrand: "Times Estates" real-photo identity replaced by a new "Times Estate Ltd" skyline identity, at the owner's explicit direction

**What happened:** the owner supplied a screenshot of a website using a
"TIMES ESTATE LTD" wordmark with a skyline icon, a "LONDON PROPERTY
EXPERTS" tagline, and a black/orange/white colour scheme, alongside a
large implementation prompt asking for it to be applied site-wide. Before
touching anything, this was flagged directly: the screenshot also
contained several things that conflicted with standing project rules and
prior decisions — a different logo/brand than the one already built and
approved (Phases 3/5/6), Construction shown as a full peer service
(contradicting the Phase 4 "mention only" decision), a fabricated named
testimonial with a star rating, specific fake listings across named
London areas plus a "672 properties" count (contradicting the standing
rule that geographic coverage is unconfirmed and nothing invents
listings), live-looking social icons (contradicting the same-session
confirmation that zero social profiles are supplied), and an interactive
map with pins (no map provider ever approved). Four clarifying questions
were asked; the owner dismissed the question prompts and instead replied
directly: **"Replace the previous logo and identity... with this new
skyline-icon design as the official Times Estate Ltd brand going
forward — this is a deliberate new direction, not a correction of a
mistake."**

**What this resolves and what it doesn't.** Taken together with the
explicit instruction, this authorises exactly one of the four flagged
items: **the logo/visual identity change** — recorded here, actioned
immediately. The other three flagged conflicts (Construction's scope,
the fabricated testimonial/listings/area names, and the live social
icons/interactive map) were **not** addressed by this instruction and
remain exactly as previously decided: Construction stays mention-only,
no testimonial or invented listing/area content has been added anywhere,
and the social-links system built earlier today stays fully disabled.
The larger sitewide implementation prompt (search tabs/filter sidebar/
service strip reused everywhere, per the dismissed question set) has not
been actioned either — only this specific, explicit logo/identity
instruction has been carried out.

**What was built:** a full recreation of the skyline mark — see
`BRAND_GUIDELINES.md` and `LOGO_ASSET_REGISTER.md`'s current sections for
the design detail. Same honesty discipline as every prior logo build in
this project: the reference was a screenshot of a rendered page, not
source artwork, so the skyline icon is rebuilt as generic geometry (not a
trace of one specific real landmark) and the wordmark uses Merriweather
(a bold slab serif, Google Fonts OFL) as a close visual match rather than
an extracted original font.

**Judgement call, flagged explicitly rather than assumed silently: the
customer-facing display name also changes, from "Times Estates" back to
the full "Times Estate Ltd."** The owner's instruction was scoped to
"logo and identity," and didn't explicitly mention the display-name
convention set in Phase 5. But the new logo artwork itself spells out
"TIMES ESTATE LTD" in full — keeping the site's running text, aria-labels
and page titles saying the shorter "Times Estates" while the visible logo
reads "Times Estate Ltd" would have produced a visibly inconsistent site
(the one thing "apply it consistently across every page" most clearly
asked to avoid). `siteConfig.displayName` was updated to match the logo
exactly, and every hardcoded "Times Estates" string across the codebase
was updated to match. If the owner actually wants to keep "Times Estates"
as informal running-text branding alongside a "Times Estate Ltd" logo
mark, that's a one-line config change to reverse — flagged here so it's
an easy, visible correction if this reading is wrong.

**Colour tokens deliberately left unchanged.** The brief asked for "the
exact same colour scheme (black, orange, white)" — rather than
re-sampling new hex values from the reference screenshot (which would
re-risk reintroducing the WCAG contrast defect found and fixed in Phase
6), the existing, already-corrected `--color-accent`/`--color-ink`/etc.
tokens were reused exactly as-is. Only the logo artwork and the heading
typeface (Merriweather, replacing Poppins, chosen to match the new
wordmark's slab-serif character the same way Poppins was chosen to match
the previous wordmark's rounded character) changed.

**Old identity preserved, not deleted, per Rule 3.** `web/public/brand/
times-estates-*.svg` and `brand/logo-real/` remain exactly as they were;
the new files (`times-estate-ltd-*.svg`, `brand/logo-skyline/`) sit
alongside them. Only the favicon/app-icon files were overwritten (a
favicon is a single canonical slot, not something to keep historical
copies of live) — the previous "TimesEstates" house-icon favicon is
still recoverable from `brand/logo-real/png/` if ever needed.

**Verified:** typecheck/lint/format/test (69/69) all pass; production
build succeeds; Lighthouse (mobile, isolated Chrome profile) shows
Accessibility 100, Best Practices 100, SEO 100, Performance 94, CLS 0,
colour-contrast and target-size both still passing — confirming the
Phase 6 fixes hold under the new logo/font. Header, footer, and favicon
all screenshot-verified live on the rebuilt production site. LCP rose
slightly (2.6s → 3.2s), consistent with Merriweather being a heavier
font file than Poppins — a modest addition to the already-flagged,
non-blocking LCP gap from `QA_REPORT.md` §3, not a new defect.

## 2026-09-09 — Sitewide social-links system built, every channel disabled (no profile has ever been supplied)

**What was checked before building anything:** a full search of every
project document and every line of application code for any Facebook,
Instagram, LinkedIn, YouTube, X/Twitter, TikTok, WhatsApp Business, or
Google Business Profile URL. **None exist anywhere** — this isn't a
partial list with a few confirmed; zero social profiles have ever been
supplied by the owner. This matches the WhatsApp-specific gate already
recorded for Phase 5/7 (a `wa.me` link needs WhatsApp Business approval
specifically, never given) — extended here to mean the same caution
applies to all eight channels equally, not just WhatsApp.

**What was built anyway, and why that's not a contradiction:** a
reusable `SocialLinks` component and a typed `social-config.ts`
covering all eight platforms, wired into the footer, the mobile
navigation drawer, and a new "Connect with us" section on `/contact` —
but with **every entry's `url: null` and `enabled: false`**. The
component itself renders nothing when no profile is both enabled and
has a real URL (confirmed on the built production site: no "Follow
Times Estates" heading, no "Connect with us" section, no `sameAs` in
structured data — verified by direct inspection of the built HTML, not
assumed). This means the plumbing is ready and tested, but nothing
invented reaches a real visitor — the same pattern already used for
other not-yet-confirmed facts throughout this project (e.g. the
Construction-services mention), just applied to a whole feature rather
than a content field.

**Design choice: hand-authored icons, no new dependency.** The project
has zero icon-package dependencies (`WEBSITE_AUDIT.md`). Eight simple,
recognisable, single-colour glyphs didn't justify adding one — they're
built the same way the existing hamburger/phone icons already are
(plain inline SVG, `currentColor`), just centralised in one file.

**Design choice: default state uses the site's own tokens; brand
colour appears only on hover.** Exactly as instructed — a muted grey
circle (`bg-secondary/10` on light backgrounds, `bg-white/10` on the
dark footer) that fills with the platform's own brand colour and turns
the icon white on hover/focus, verified to hold clear contrast in both
states by direct screenshot.

**Verification performed:** typecheck/lint/format/test/build all pass;
the production build was checked directly (not just the dev server)
to confirm zero social markup renders anywhere while every channel is
disabled; screenshots taken of the mobile footer (all eight icons,
plus a hover-state screenshot), the mobile navigation drawer's compact
row, and the Contact page's fuller icon-plus-label-plus-description
treatment — desktop-width footer confirmed via computed CSS/DOM
inspection rather than a screenshot after a repeated, tool-side
screenshot-rendering failure specific to certain resized-viewport-plus-
long-scroll combinations in this session (unrelated to the code — the
same content renders correctly at every viewport width that could be
screenshotted, and the responsive grid classes are the same standard
Tailwind breakpoints already used and verified working elsewhere on
this site).

## 2026-09-09 — Phase 7: prepared launch/email/handover plans, but recommended against approving launch

**What was done:** every item Phase 7 asked for was prepared without
publishing — deployment target and costs (`DEPLOYMENT.md` §1), env-var
checklist (§2), a domain/DNS plan (§3–4), hosting/SSL/redirects (§5),
analytics/consent options (§6), the final form-to-mailbox routing
matrix (`EMAIL_AND_FORM_ROUTING.md` §0, corrected against the real
twelve lead categories in code rather than invented category names),
MFA/leaver/recovery procedures (§7 addendum), monitoring/backup/DR
plans (`DEPLOYMENT.md` §9–10), a brand-asset master-file index cross-
checked against `LOGO_ASSET_REGISTER.md`/`MEDIA_ASSET_REGISTER.md`
(`TECHNICAL_HANDOVER.md` §6), and a technical handover document. All
consolidated into one `FINAL_LAUNCH_APPROVAL.md` request, exactly as
asked, with the seven concrete actions, costs, and rollback methods it
would authorise.

**What was decided, and why it isn't just "prepare and present neutrally":**
`FINAL_LAUNCH_APPROVAL.md` explicitly recommends the owner **not**
approve launch yet, rather than presenting the request as a neutral
menu. Two reasons drove this, both already established facts this
phase didn't change: the critical server-hang defect
(`QA_REPORT.md` §9) is still unresolved, and — newly surfaced this
phase while writing the hosting-target comparison — the site's total
lack of a persistent database is not just a "nice to have fixed
eventually" item but an actual disaster-recovery hole (every lead is
silently lost on any restart, including a restart from recovering the
hang defect) and a genuine hosting-architecture constraint (classic
serverless hosting like default Vercel doesn't reliably support the
current in-memory data model at all). `CLAUDE.md` Rule 7 requires
checks to be completed and recorded before any deployment
*recommendation* — it doesn't require withholding the mechanical
request the owner explicitly asked for, but it does mean the
recommendation attached to that request has to say what the evidence
actually shows, not soften it into neutral options.

**New discovered constraint, not previously written down anywhere:**
the in-memory data model's incompatibility with classic serverless
hosting. This wasn't wrong before — it simply hadn't been evaluated
against a concrete hosting decision until Phase 7 required comparing
real hosting options with real costs. Recorded in `DEPLOYMENT.md` §1
and cross-referenced from `TECHNICAL_HANDOVER.md` §7.

## 2026-09-09 — Phase 6: QA found and fixed a real contrast regression introduced by the Phase 5 rebrand

**What happened:** Phase 5 set `--color-accent` to the real brand's bright
Copper Orange (`#d9772e`), taken directly from `BRAND_GUIDELINES.md`.
That document's own contrast table only checked "orange on white" and
"orange on ink" — it never tabulated "white text on an orange fill,"
which is exactly how the colour is used everywhere: `bg-accent
text-white` is the primary-button pattern used site-wide (Book a
Valuation, Search, pagination, the AI assistant launcher), and
`text-accent` alone is used for eyebrow labels and links on white
backgrounds. Lighthouse's accessibility audit measured that pairing at
**3.16:1** — comfortably enough for a border or icon (3:1) but short of
the 4.5:1 WCAG AA minimum for text. The old "Established Line" bronze
accent (`#8c6a3f`) it replaced happened to pass at 4.94:1; the rebrand
didn't re-check this specific pairing before shipping.

**Fix:** `--color-accent` now holds a darkened shade (`#a8551a`, 5.3:1
with white text) for every light-background text/button use — which is
nearly everywhere, so this fixes the pattern site-wide via the token
cascade rather than requiring a per-component pass. A new
`--color-accent-vivid` token keeps the original bright `#d9772e` for
the small number of dark-background contexts where it already passes
(the footer's hover links, on `--color-ink`: 5.8:1) and non-text fills
(the hero slideshow's dot indicators). `--color-warning` needed the
same fix for the same reason (`#a6790a` measured 3.91:1 with white
text on the "Sample property" and status badges) — darkened to
`#8a6008` (5.6:1). Re-verified via Lighthouse with a genuinely isolated
Chrome profile: `color-contrast` now scores 1.0 (was 0) on every page
checked. `BRAND_GUIDELINES.md`'s colour table needs a follow-up
correction to match — flagged, not yet done as of this entry.

**Also found and fixed in the same pass:**
- **Touch targets too small (WCAG 2.2 SC 2.5.8):** the hero slideshow's
  slide-indicator dots were a 10×10px visible dot used directly as the
  clickable button. Fixed by keeping the visible dot small but wrapping
  it in a 24×24px button (the same "small visual, larger hit area"
  pattern already used elsewhere, e.g. `FavouriteButton`'s `-m-2 p-2`).
- **CLS from unsized logo images (0.505, target <0.1):** the header and
  footer `<img>` logo tags had no `width`/`height` attributes, so the
  browser reflowed the whole footer once the SVG's real aspect ratio
  loaded. Fixed by adding explicit `width={900} height={140}` (the
  SVG's own viewBox units — browsers use these to compute the correct
  aspect ratio at any CSS-set display size). Re-verified: CLS 0 on
  every page checked. The (currently unused, no real photos exist yet)
  `PropertyGallery` image element was given a CSS `aspect-[4/3]` for
  the same reason, pre-emptively, since it can't have fixed pixel
  dimensions the way a fixed logo file can.

**Why this matters beyond the numbers:** the accent-contrast and
warning-contrast fixes affect the "Sample property" badge and every
primary button on the site — this was a real, if invisible-until-
measured, barrier for low-vision users on every single page, not an
edge case. Caught only because Phase 6 explicitly required an
automated contrast scan; a purely visual/manual review is exactly the
kind of check this class of defect can slip past. See `QA_REPORT.md`
for the full test matrix.

## 2026-09-09 — Phase 6: the critical server-hang defect is confirmed still present, reproduced via a genuine click for the first time

**What was done:** `TEST_REPORT.md` §5 (Day 7) documented a critical
defect — certain lead-form submissions make the entire server
unresponsive — but explicitly flagged one open question: every
reproduction to date used a script-driven `form.requestSubmit()`, and
whether a **genuine mouse click** triggers it was "not confirmed, for
lack of time." Phase 6 closed that gap: a real `HTMLElement.click()`
dispatch (not a scripted form submission) on the `/let` rental-
valuation form reproduced the identical hang — the server stopped
responding to all requests (`curl` timed out completely), and the
Node process's CPU time climbed continuously while hung (32.8s → 45.8s
over 3 seconds of wall-clock time), matching Day 7's measurements
almost exactly. The process was killed and the server restarted
cleanly; no other investigation was attempted (Day 7 already reviewed
every line of the submission pipeline and ruled out CSP, production-
vs-dev, and category-specificity — re-litigating that today would not
add information, and re-triggering it a second time on
`viewing_request` purely to "double-confirm" a well-evidenced,
unchanged defect was judged not worth another multi-second full-site
outage in this environment).

**Conclusion: this remains an absolute launch blocker, now with one
fewer open question than Day 7 left it with** — real users clicking
normally, not just automated scripts, are confirmed to be able to
trigger it. See `QA_REPORT.md` §1 and §8 for the full current record
and `TEST_REPORT.md` §5 for the original investigation, which stands
unchanged.

**New operational mitigation idea, not implemented:** because the hang
is CPU-bound and synchronous (confirmed by the climbing CPU time), an
in-process `Promise.race` timeout cannot help — Node.js is single-
threaded, so nothing can preempt a runaway synchronous computation on
the same thread. A genuinely effective mitigation, if the root cause
still isn't found before a deployment deadline, would be an
**external, process-level watchdog** (e.g. a process manager with a
health-check ping that force-restarts the server if it stops
responding within a few seconds) — this limits the blast radius to a
brief outage instead of an indefinite one, without requiring the
underlying bug to be understood first. This is a deployment-
infrastructure decision, not a code change, and is recorded here as a
recommendation only.

## 2026-09-09 — Phase 4: UX/IA/wireframes/content/email plan

**Construction services — resolved.** The Phase 4 brief's required
gating question was asked before any sitemap work began, per its own
explicit instruction ("wait for my answer before finalising the
sitemap"). **Answer: mention only, don't build.** `SITEMAP.md` and
`COMPLIANCE_REGISTER.md` were updated to reflect a single factual line
on `/about` and in the footer (naming the service and its own phone
number), with no dedicated page, nav item, or journey — the smallest-
footprint option offered, and the one the owner chose.

**`BRAND_GUIDELINES.md` and `LOGO_ASSET_REGISTER.md` were rewritten
before wireframing began**, not after. The Phase 4 brief named both as
the source of truth for "the approved black-and-orange identity," but
both documents still described the superseded Claret system in their
main body (only a short notice at the top flagged the supersession).
Wireframing against a stale spec would have meant re-deriving colour/
type decisions from scratch anyway, so both were restructured: a new
"CURRENT BRAND" section at the top of each is now the live
specification (real palette with contrast ratios recalculated, a
typography system for actual page content — Poppins/Inter, chosen
because the logo's own novelty rounded lettering doesn't hold up as a
body/heading face at paragraph sizes — and the real logo file
inventory), with the Claret material kept below, unedited, marked
historical. This is a documentation-accuracy fix the Phase 4 work
depended on, not a new creative decision.

**Homepage navigation order changed to Buy-first in the new
`SITEMAP.md`, but this is a recommendation, not an approval.** The
Phase 4 brief's own page list leads with the four search categories;
the Day 2/3 approved nav led with Sell/Let. Rather than silently
picking one, the new document states the change plainly and repeats
the still-open Day 2/3 question about nav order at Approval Gate 4 —
see the Phase 4 report for the explicit ask.

**Area Guides and Insights are built as empty page templates, not
populated with placeholder-but-plausible content.** Both were
previously excluded entirely (Day 2/3) for lacking confirmed content.
The Phase 4 brief asks for them in the IA, so the page structure now
exists — but with zero real guides/articles written, and both
deliberately **omitted from primary navigation** until at least one
real, sourced piece of content exists, so an empty nav item never
ships. Every heading in the template is a section label, not a filled-
in claim.

**Wireframes were delivered as a published, inspectable Artifact, not
as code in `web/`.** The Phase 4 brief explicitly says "create
inspectable responsive wireframes but do not implement the final
polished website" — matching the pattern already used for Phase 2's
creative-direction comparison, a static prototype outside the tested
live codebase satisfies "inspectable" without touching, or risking
regressing, the actual application.

**Email plan is a specification only.** All twenty proposed addresses,
the DNS records (SPF/DKIM/DMARC), and the provider comparison in
`EMAIL_AND_FORM_ROUTING.md` are unactioned — no account, mailbox,
alias, or DNS record exists. Choosing and paying for a provider is a
Rule 4 decision left entirely to the owner.

## 2026-09-09 — Owner override: replacing the invented Direction E ("Claret") with the existing real "Times Estates" brand

**Decision:** Direction E ("Claret") was approved at Approval Gate 3 and
a full logo suite, design system, and stationery/social/digital pack
were built for it (`BRAND_GUIDELINES.md`, `LOGO_ASSET_REGISTER.md`,
`MEDIA_ASSET_REGISTER.md`, `brand/`). Before that identity went any
further, the owner stopped the process: Times Estate Ltd already has
an established, real-world brand — evidenced by two photographs of the
owner's actual business cards — and that real identity is to be used
instead of any newly invented one, however well-researched.

**What the cards show:**

- The current card's wordmark: **"Times"** in white/light text, a
  small **orange house-shaped icon containing a white "E"** standing
  in for "Estates," then **"states"** — read together as "Times
  Estates." A friendly, rounded sans-serif letterform, not the
  Playfair Display serif used in Claret.
- A black/charcoal background with a warm burnt-orange/copper accent,
  not the claret/ivory palette.
- Contact block matching the owner's chat instructions exactly: Tel
  0208 672 8080, Mob 0777 999 1313, email timesestatesuk@gmail.com,
  web www.timesestates.co.uk, Director: Mr. Malik.
- An address band reading "127, Upper Tooting Road, Londong SW17 7TJ"
  (the typo "Londong" is on the card itself, not introduced here) —
  confirming 127 as the trading address printed on current stationery.
- Services listed as Sales / Lettings / Management / Commercials /
  **Construction** — the last of which is new information, addressed
  separately below.
- A second, older card variant exists (different phone number for a
  separate "construction services" line, no wordmark logo) — kept as
  supporting evidence that Construction has been offered for some
  time, but the current card above is treated as the authoritative
  reference for the identity itself.

**Why this overrides Direction E entirely, rather than sitting
alongside it as a fourth option:** CLAUDE.md Rule 1 (never invent
business facts) extends naturally to brand identity — a genuinely
existing, real-world mark the business already trades under is not
something to compete against with an invented alternative once its
existence is known. Direction E's Phase 2/3 work is not deleted (see
below); it is superseded.

**What this means for delivered Phase 3 work:** `BRAND_GUIDELINES.md`,
`LOGO_ASSET_REGISTER.md`, `MEDIA_ASSET_REGISTER.md`, and every file
under `brand/` describing or built for Direction E are now **superseded**
— left in place (Rule 3: preserve existing work), each header-flagged
as superseded rather than rewritten or deleted, while a new set of
brand files is built for the real "Times Estates" identity alongside
them, not in place of them.

**Naming:** "Times Estates" becomes the customer-facing brand name
everywhere on the public site, marketing, and social — matching the
card and the domain timesestates.co.uk. "Times Estate Ltd" is retained
only where legally required: Companies House references, contracts,
and the legal-footer text, exactly as CLAUDE.md's own project title
already uses the Ltd form for the legal entity.

**Colour:** the owner's own estimate of the accent (`#D97730`) is
noted, but the photographed card is treated as the source of truth
over that estimate, per the owner's own instruction. **Caveat recorded
honestly:** a colour read from a phone-camera photograph (affected by
the camera's white balance and the room's lighting) is a close visual
approximation, not a lab-accurate or print-accurate colour sample. If
exact colour matching to the printed card stock matters later (e.g.
for reprinting stationery), a proper swatch, Pantone reference, or the
original print file from whoever produced the card would remove this
uncertainty — recommended as a follow-up, not required to proceed now.

**Logo:** recreated as a vector redrawing of the existing mark, not a
new design — "Times" + the house-icon-with-"E" + "states," light text
on black, orange accent, in a rounded sans-serif chosen as a close
visual match to the card (the exact original typeface/artwork file is
not available). **Flagged plainly, per the owner's own instruction:**
this recreation should be treated as a working approximation and
ideally redrawn from a proper source file by a designer if the exact
original vector artwork exists or can be commissioned — a phone
photograph of a printed card is not a substitute for original artwork
however carefully it's traced.

**Contact details superseding placeholders:** phone, mobile, email,
and a newly-recorded trading address were added to
`web/src/lib/site-config.ts`, `/contact`, and the relevant registers —
see `CONTENT_VERIFICATION_REGISTER.md` items 12–15 for the full detail
and status of each.

**Address handling (resolved without further owner input, as a
low-risk call):** the card confirms **127** Upper Tooting Road as the
trading address. This is recorded as a new, separate `tradingAddress`
fact, shown alongside the existing Companies House-verified
**registered office** (145 Upper Tooting Road) rather than overwriting
it — a trading address and a registered office are legitimately
allowed to differ, and nothing here changes the Companies House
filing. If 127 should actually replace 145 as the registered office
too, that is a Companies House filing action for the owner, not a
website content edit.

**Construction services — flagged, not actioned:** both cards list
"Construction" (tiling, flooring, plastering, extensions, kitchen/
bathroom remodelling) as a service line. This sits entirely outside
this project's defined scope in `CLAUDE.md` ("What this project is").
**No construction page, service, or claim has been added anywhere** —
this is recorded as a discovered scope question for the owner to
decide (add a Construction section to the site, keep it deliberately
off the property-focused site, or something else), not assumed either
way, per Rule 1 and Rule 5.

**Homepage rotating banner — scoped separately, not yet built:** the
owner also asked for a full-width, auto-rotating image/video banner at
the top of the homepage, structurally similar to Foxtons.co.uk (layout
only, not Foxtons' colours or branding), with the property search bar
overlapping its bottom edge, in the new black/orange palette, using
clearly-labelled placeholder images. This is a genuine code change to
the live, tested website — a different category of action from the
brand-asset work above, and Phase 3's own brief explicitly said "do
not rebrand the entire website yet." It is queued as the next piece of
work, to be built once the black/orange identity itself (colour, logo)
is confirmed, so it isn't built twice in two different colour schemes.

## 2026-09-09 — Real logo applied to the live website header and favicon

**What changed:** following a clearer reference image of the actual
logo (supplied after the draft below), the recreation was refined —
the wordmark now reads as one continuous logotype "TimesEstates" (no
space, matching the reference exactly), with a custom orange "T"
crossbar and oversized "i" dot rebuilt as plain geometry rather than
relying on font glyphs for that flourish, and a chimney added to the
house icon. Regenerated via the same `brand/build-real-brand-logo.mjs`.

The owner then explicitly asked for this image to be used as the
website's header logo and as the site's logo generally. Both were
done:

- **`web/src/components/layout/Header.tsx`** now renders
  `/brand/times-estates-logo.svg` (copied from
  `brand/logo-real/svg/te-real-primary-transparent-light-use.svg`)
  in place of the old plain-text "Times Estate Ltd" link, on every
  page (the header is shared layout).
- **Favicon/app icon:** `web/src/app/icon.png` and
  `web/src/app/apple-icon.png` now use the recreated house-icon-E
  (from `brand/logo-real/png/`). The old default Next.js
  `favicon.ico` placeholder was removed so only the real brand icon is
  served — verified via the page's actual `<link rel="icon">` output
  after the change.

**Verified:** checked live in the browser at both desktop and mobile
widths (375px) — the logo reads clearly at header size and doesn't
clip or overflow; the existing Header test suite (`Header.test.tsx`)
still passes unchanged.

**What this deliberately does not touch:** every other on-page mention
of the company name (e.g. "Times Estate Ltd handles residential and
commercial sales..." on the homepage, and the many other body-copy and
legal-page references) is untouched. The header/logo change is a
visual identity element the owner explicitly asked for; rewriting body
copy throughout the site from "Times Estate Ltd" to "Times Estates"
wherever the customer-facing name is more appropriate is a larger,
separate content pass — flagged here as an open item, not assumed or
done silently. The footer's legal line correctly continues to show
"Times Estate Ltd" (the legal name), unchanged, per the naming split
recorded above.

## 2026-09-09 — Draft recreation of the real logo produced for review

**What was built:** a first draft of the real "Times Estates" mark, in
`brand/logo-real/svg/` (`te-real-primary-on-black.svg`,
`te-real-primary-transparent-dark-use.svg`,
`te-real-primary-for-light-backgrounds.svg`, plus the house-icon-with-
"E" alone in `te-real-icon-full-colour.svg` / `te-real-icon-on-dark.svg`),
and rasterised the icon to PNG/WebP at favicon/app-icon sizes in
`brand/logo-real/png/` and `brand/logo-real/webp/`. Generator:
`brand/build-real-brand-logo.mjs` (deterministic, re-runnable).

The icon is built from plain geometry (a roof triangle + a body
rectangle, with the "E" itself made of four rectangles) so it stays
font-free and rasterises reliably at every size, the same technique
proven for the Claret monogram. The wordmark uses live text in "Baloo
2" (Google Fonts, OFL-licensed, free) as a close, rounded, friendly
stand-in for the card's actual typeface, which is not available as a
file — flagged again here, not just once: **this is a working
approximation, not a traced reproduction, and should be redrawn from
proper source artwork if pixel-exact fidelity to the original card
matters.**

**Verified:** both the primary lockup and the icon were checked in a
live, internet-connected browser (a local static server, the same
verification method used for the Claret suite) — the wordmark renders
in genuine Baloo 2, not a fallback, and the icon reads clearly down to
192px.

**This is a draft for approval, not final artwork** — no stationery,
social, or digital pack has been rebuilt around it yet, and it has not
been applied anywhere on the live website. It's offered now so the
owner can react to the colour and shape before more is built on top of
it.

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
