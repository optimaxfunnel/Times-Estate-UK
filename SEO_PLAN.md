# SEO_PLAN.md — Times Estate Ltd

## Day 6 Task 2 update (2026-10-30) — ethical local SEO, current plan

**Plain-English summary.** The site is set up so search engines can
understand it accurately: every public page has its own title,
description and preferred web address, a sitemap lists only real public
pages, and the business is described to search engines using only facts
in the content register. Nothing is hidden, stuffed or invented. Area
pages are **not** being created until you confirm where you work.

### 1. Search-intent map

| What someone is trying to do | Typical search | Page that answers it |
|---|---|---|
| Sell a home, find out its value | "estate agents Tooting", "house valuation SW17" | /sell |
| Let a property / find a managing agent | "letting agents Tooting", "property management SW17" | /let, /property-management, /landlords |
| Buy a home | "flats for sale Tooting" | /buy (property pages once real listings exist) |
| Rent a home | "flats to rent Tooting" | /rent |
| Commercial space | "shops to let Tooting", "commercial property agent SW17" | /commercial, /commercial/for-sale, /commercial/to-let |
| Contact the agency | "Times Estate Ltd", "Times Estate Tooting phone" | /contact, /company-information |
| Existing tenant with a problem | "Times Estate report repair" | /report-a-repair |
| Check credentials or fees | "Times Estate Ltd fees", "redress" | /fees, /company-information, /complaints |

### 2. Page-to-keyword map, titles and descriptions

One main topic per page; no two pages chase the same phrase. Titles use
the template "Page | Times Estate Ltd".

| Page | Main topic | Title | Meta description (summary) | H1 |
|---|---|---|---|---|
| / | Estate agent in Tooting / SW London | Times Estate Ltd \| London Property Experts | Residential and commercial sales, lettings and management | Browse London Properties |
| /sell | Selling, valuation | Sell Your Home | Free initial market appraisal* | Book a free initial market appraisal |
| /let | Letting, rental appraisal | Let Your Property | Let-only and managed lettings | (page H1) |
| /property-management | Managing agent | Property Management | Managed service for landlords | (page H1) |
| /buy, /rent | Property search | Property for Sale / to Rent | Search listings | (page H1) |
| /commercial (+ for-sale, to-let) | Commercial agency | Commercial Property | Sales, lettings and management for commercial property | (page H1) |
| /landlords, /buyers | Audience guides | Landlords / Buyers & Tenants | What to expect working with us | (page H1) |
| /contact | Contact | Contact Us | Phone, email, address | (page H1) |
| /company-information **(new)** | Company disclosure | Company Information | Registered details, redress, client money protection | Company Information |
| /callback, /register, /property-alerts, /report-a-repair | Tasks | (as named) | **Descriptions and canonicals added today** | (page H1) |
| Legal pages | Policies | (as named) | One each | (page H1) |

\* "free" is owner wording awaiting confirmation (CONTENT_VERIFICATION_REGISTER.md).

**Heading structure:** one H1 per page (the page hero), H2 for sections,
H3 inside sections — checked in the Day 6 accessibility pass and kept.

**Internal links:** header (grouped menus), footer (all services and
legal pages, now including Company Information), in-page calls to
action between related pages (sell ↔ fees, let ↔ property management,
rent ↔ report a repair), breadcrumbs on property pages.

### 3. Canonical addresses, sitemap and robots

- Every indexable page declares its own canonical address. **Added
  today** for /callback, /residential, /register, /property-alerts and
  /report-a-repair, which were missing one.
- `/sitemap.xml` lists 26 public pages. It deliberately leaves out
  /admin, /favourites, /enquiry-received, /areas (see §6) and every
  property page (all are demonstration data).
- `/robots.txt` allows everything except /admin and /favourites and
  points to the sitemap.
- Pages that must never appear in search results are also marked
  "noindex": all of /admin, /enquiry-received, /areas, and now
  /favourites.
- The live domain (`NEXT_PUBLIC_SITE_URL`) is set at deployment; the
  redirect plan from the old site is in SEO_REDIRECT_PLAN.md.

### 4. Open Graph and sharing

Site name, British English locale and large-image card are set
sitewide; each page's title and description are reused for shares. A
sharing image (1200×630) is **not yet made** — it should use the
owner-supplied logo once a clean export arrives.

### 5. Structured data (what search engines are told)

| Markup | Where | Contents | Deliberately left out |
|---|---|---|---|
| RealEstateAgent | Every page | Name, registered name, website, registered office address | Phone, email, opening hours, reviews, ratings, awards, founding date, staff numbers — none is Verified yet |
| BreadcrumbList | Property pages | Home → section → property | — |
| RealEstateListing | Property pages | Address, summary, price, image | **Not emitted for any demonstration property** — so today none at all |

**Validation (automated, `structured-data.test.ts`):** markup is valid
JSON with the schema.org context and type; it contains no rating,
review, award, opening-hours, founding-date or staff-count claims; no
listing markup is produced for any demonstration property; the sitemap
excludes admin, favourites and property pages and has no duplicates;
robots blocks admin and favourites. 6 tests, all passing. Google's
online Rich Results Test can only be run once the site is on a public
address — listed as a launch-week check.

**Decision for you:** the phone numbers now appear in the header. They
could be added to the search-engine markup too (helps local search), but
they are "Supplied by the business owner", not Verified. Say so if you
are happy for them to be added.

### 6. Area-page strategy

- **No area pages are created today.** The seven areas named on your
  current website (Tooting, Mitcham, Streatham, Balham, Colliers Wood,
  Wimbledon, Clapham) have not been re-confirmed for this site.
- /areas stays as one honest page, hidden from search engines, listing
  them as "Requires verification".
- When you confirm an area, it gets a page only if it can carry
  **genuinely different, sourced content**: the streets and property
  types you actually handle there, real (not demonstration) listings in
  that area, transport and amenities with sources. No copy-and-swap
  location pages, no doorway pages, no implied offices outside SW17.

### 7. FAQ and guide strategy

Guides answer real questions customers ask you, are written from your
own process, and are checked before publishing:

1. "What happens when you value my home?" (needs your real process)
2. "What a landlord needs before letting" — gas, electrical, EPC,
   deposit protection, Right to Rent (**solicitor review**)
3. "What the Renters' Rights Act changes for landlords and tenants"
   (**solicitor review**; most changes started 1 May 2026)
4. "Tenant fees: what we can and can't charge" (once fees are supplied)
5. "How to report a repair and what counts as an emergency"
   (**professional review**)

FAQ markup is not used: Google now shows FAQ rich results only for
government and health sites, so it would add nothing.

### 7a. Image alternative text

The logo is decorative beside the written name (`alt=""`); property
images use the alt text stored with each image; the hero illustration
is decorative. When real listing photos arrive, each needs a short,
factual description (e.g. "Front of the house from the street"), never
keywords.

### 8. Not done, by design

Keyword stuffing, duplicated location pages, doorway pages, fake
offices or numbers, hidden text, fabricated reviews, and listing markup
for demonstration properties.

---


## Status of this document

**Confirmed as an accurate description of what today's code actually
does.** SEO here means making genuine content easy to find — not
manufacturing signals the business doesn't yet have. Nothing below
invents a location, a review, a statistic, or a page the business
doesn't genuinely offer (CLAUDE.md Rule 1). Where a standard SEO
practice (e.g. an area page, a local phone number in structured data)
depends on a fact this project doesn't have yet, that's stated plainly
as a gap, not worked around with a plausible guess.

## Search-intent map

| Intent | What a searcher wants | Page(s) that should answer it |
|---|---|---|
| "How much is my house worth" / "sell my house London" | A free valuation and to understand the process | `/sell` |
| "Let my property" / "landlord services London" | A rental appraisal and management options | `/let`, `/property-management` |
| "Property for sale [area]" | To browse listings | `/buy` |
| "Property to rent [area]" | To browse listings | `/rent` |
| "Commercial property to let/for sale London" | Commercial listings and enquiry route | `/commercial`, `/commercial/for-sale`, `/commercial/to-let` |
| "Report a repair" (existing tenant, brand-aware) | A fast, low-friction way to log an issue, plus emergency guidance | `/report-a-repair` |
| "[Business name] reviews / complaints" | Trust and recourse information | `/about`, `/complaints` |
| "Estate agent fees" | Fee transparency before engaging | `/fees` |
| "Is [business name] a real company" | Regulatory/company verification | `/about` |

## Page-to-keyword map

Kept deliberately short and honest — a small set of terms this business
genuinely serves, not a padded list of aspirational terms with no
matching content.

| Page | Primary term | Supporting terms |
|---|---|---|
| `/` | Times Estate Ltd | London estate agent |
| `/sell` | sell your house London | free valuation, market appraisal |
| `/let` | let your property London | rental appraisal, landlord |
| `/buy` | property for sale London | residential sales |
| `/rent` | property to rent London | residential lettings |
| `/commercial` | commercial property London | commercial sales, commercial lettings |
| `/property-management` | property management London | managed lettings, repairs |
| `/report-a-repair` | report a repair | tenant repair, emergency repair |
| `/about` | Times Estate Ltd company information | Companies House, redress scheme |
| `/contact` | contact Times Estate Ltd | estate agent contact |

**Deliberately not targeted today:** neighbourhood/borough-level terms
("estate agent in Wandsworth", "flats for sale in Tooting"). See "Area
pages" below.

## Page titles, meta descriptions, headings

All updated today (`web/src/app/**/page.tsx`) to a consistent pattern:
`<Page-specific title> | Times Estate Ltd` (via the root layout's title
template), a one-sentence, factual meta description with no
exaggeration, and exactly one `<h1>` per page (rendered by `PageHero`),
followed by a logical `<h2>`/`<h3>` structure — verified by manual
review of every page's heading order (see `ACCESSIBILITY.md`, which
checks the same structure for a different reason and found no
skipped-level headings).

## Internal linking

- Every service page cross-links to its natural next step (e.g. `/sell`
  → the sales valuation form; `/property-management` → `/report-a-repair`).
- The footer (`web/src/lib/site-config.ts`) links every legal/regulatory
  page from every page on the site, not just from `/about`.
- The new "Regulatory information" section on `/about` links to
  `/complaints`, `/fees`, and `/accessibility` — these pages had no
  inbound link from anywhere before today.
- Property detail pages link back to `/buy` or `/rent` via their
  breadcrumb (see "Structured data" below), and the header/nav links to
  every top-level page from every page.

## Canonical URLs

Added `alternates.canonical` to every primary page today
(`web/src/app/**/page.tsx`). `/buy`, `/rent`, `/commercial/for-sale` and
`/commercial/to-let` canonicalise to their base path with no query
string, so that different filter/sort combinations of the same search
don't create duplicate-content signals — a real, correctable SEO issue
that existed before today's fix (search-parameter URLs had no canonical
at all).

## XML sitemap

`web/src/app/sitemap.ts` (Next.js's built-in sitemap convention, served
at `/sitemap.xml`) lists every genuinely public, indexable page.
Deliberately excluded:

- `/admin/*` — staff-only, also disallowed in `robots.ts` and noindexed
  at the layout level (see `/SECURITY.md`).
- `/favourites` — a personal, visitor-specific list with nothing generic
  to index.
- `/property/[id]` — every property today is fabricated demonstration
  data (see `/DATA_MODEL.md`); none should be indexed as a real listing.
  Once real listings exist, add them here explicitly (or build a
  dynamic sitemap entry filtered to `!isDemo`) — never bulk-generate
  sitemap entries from demo data.

## robots.txt

`web/src/app/robots.ts` (served at `/robots.txt`) allows everything
except `/admin` and `/favourites`, and points to the sitemap. This is
**defence-in-depth for crawlers only** — it is explicitly documented in
the file itself as not a security control, since a disallow rule is
advisory and any real protection must come from server-side access
checks (see `/SECURITY.md` and `/ADMIN_AND_CMS.md`).

## Open Graph and Twitter Card

Added sitewide defaults in `web/src/app/layout.tsx`: `og:site_name`,
`og:type=website`, `og:locale=en_GB`, and a `summary_large_image`
Twitter Card type. **No `og:image` is set** — there is no approved
logo or brand image yet (`/CONTENT_REQUIRED.md`: "Logo — Missing").
Adding a placeholder or stock image here would misrepresent the brand
in every social-media preview of the site; this is deliberately left
unset until a real image is supplied, rather than filled with something
generic.

## Structured data (JSON-LD)

Implemented in `web/src/lib/seo/structured-data.ts` and rendered via
`web/src/components/seo/JsonLd.tsx`:

- **`RealEstateAgent`** (sitewide, in the root layout): name, URL, and
  postal address only. **Deliberately omits `telephone`, `email`,
  `aggregateRating` and `review`** — none of these are Confirmed facts
  (phone/email are Missing; no reviews exist). Emitting any of them with
  an invented or placeholder value would itself be the "misleading
  structured data" today's brief prohibits.
- **`BreadcrumbList`** on property detail pages, reflecting the real
  navigation path (Home → Buy/Rent → property).
- **`RealEstateListing`** — built, but returns `null` for any property
  where `isDemo` is `true`. Every property in the system today is demo
  data, so **no property currently emits listing structured data at
  all** — a deliberate anti-doorway, anti-fake-data safeguard, not an
  oversight. This will start emitting real markup automatically the day
  real, non-demo listings exist, with no further code change needed.

**Validation performed today:** each JSON-LD object's shape was checked
by hand against the current schema.org type definitions for
`RealEstateAgent`, `BreadcrumbList`, `RealEstateListing`, `PostalAddress`
and `Offer` (fetched live during today's research — see sources in
`CHANGELOG.md`'s Day 6 entry). **Not performed:** a live run of Google's
Rich Results Test or the schema.org validator, both of which require a
publicly reachable URL rather than `localhost` — this should be the
first SEO check performed once a real domain is live, and is recorded
as an open item in `TEST_REPORT.md`.

## Image alternative text

- Every property image renders `image.alt` from the property record —
  checked that this field is populated with a real, descriptive string
  in the demo data (e.g. "Bright reception room with bay window"), not
  the filename or a generic label.
- The "no photograph supplied" placeholder uses `role="img"` with an
  explicit, accurate `aria-label` rather than a blank or decorative
  image, so a screen-reader user is told exactly why nothing is shown
  (see `/ACCESSIBILITY.md`).
- Decorative SVG icons (the mobile-menu hamburger/close icons) are
  marked `aria-hidden`, so they aren't announced as meaningless images.

## Verified local-business information

Only what's Confirmed is published: legal name, Companies House number,
registered office address (`/about`, and now the sitewide
`RealEstateAgent` structured data). **Phone number, email address and
opening hours remain Missing** (`/BUSINESS_REQUIREMENTS.md`) and are
correctly absent from every page and from structured data — publishing
a fake or placeholder number would fail both this brief's "no fake
telephone numbers" instruction and CLAUDE.md Rule 1.

## Property structured data

See "Structured data" above — implemented, but conditional on a
property being real (`!isDemo`), which today means it emits nothing.
The schema (price, `Offer`, `businessFunction` for sale vs. let) is
ready and tested against the current demo data shape; it will need no
changes when real properties replace the demo set, only the `isDemo`
flag becoming `false`.

## FAQ and guide strategy

**No dedicated FAQ or guides page was built today.** The existing AI
assistant's knowledge base (`web/src/lib/ai/knowledge-base.ts`, built
Day 5) already contains a small set of genuine, source-linked answers
(how to book a valuation, how to report a repair, etc.) — turning this
into a public, crawlable FAQ page (with `FAQPage` structured data) is a
natural next step, but was not done today because every existing entry
links to a form or process page rather than standing alone as
publishable guide content, and writing new guide content risks
straying into the "material information" and "professional advice"
territory `/REGULATORY_READINESS.md` flags for review. **Recommended
for a future day, once legal review of Task 3's material has happened**
— building FAQ content before that review risks having to rewrite it.

## Area-page strategy

**No area/location pages were created today, and none should be until
the owner confirms specific geographic coverage.** `BUSINESS_REQUIREMENTS.md`
and `/about`'s "Areas we cover" section both record this as Missing —
the business is known only to be "a London estate agency" with a
registered office in SW17 (Upper Tooting Road). Creating pages for
specific neighbourhoods without a confirmed service area would be
exactly the kind of "duplicated location pages" / "doorway pages"
today's brief explicitly prohibits, and would risk advertising coverage
the business hasn't confirmed it actually provides.

**What to do once areas are confirmed:** build one genuinely
differentiated page per confirmed area (not a templated page with the
area name swapped in), each with real, area-specific content — not
duplicated boilerplate. This is recorded here as the trigger condition,
not attempted today.

## Indexing controls — summary

| Path | Indexing |
|---|---|
| Every public marketing/service page | Indexable |
| `/property/[id]` (demo data) | `noindex, follow` (via `generateMetadata`) |
| `/admin/*` | `noindex, nofollow` (via layout metadata) + disallowed in `robots.txt` |
| `/favourites` | Allowed to render, but excluded from the sitemap and disallowed in `robots.txt` (no unique content to index) |

## Open items for the owner / for Day 7

1. A real domain name is still Missing (`/BUSINESS_REQUIREMENTS.md`) —
   `NEXT_PUBLIC_SITE_URL` currently defaults to `http://localhost:3000`
   for every canonical URL, sitemap entry, and structured-data `url`
   field. This must be set to the real domain before any of today's SEO
   work has real effect.
2. A logo/brand image is needed before `og:image` can be set honestly.
3. Once a real public URL exists, run Google's Rich Results Test and
   the schema.org validator against it (not possible against
   `localhost` today).
4. Geographic coverage confirmation unlocks the area-page strategy
   above.
5. Phone/email confirmation unlocks richer, more useful
   `RealEstateAgent` structured data (currently deliberately minimal).
