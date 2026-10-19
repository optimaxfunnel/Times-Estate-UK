# EXISTING_URL_REGISTER.md — Times Estate Ltd

**Segment 1 deliverable · checked 2026-10-19.** Two properties are
registered: the **live WordPress site** at `https://www.timesestates.co.uk`
and the **local Next.js build** in this repository (`web/`, served at
`http://localhost:3000`). HTTP status for the live site comes from
server-side fetches (a direct browser crawl from this environment was
blocked by the network policy, so response headers, load time and
Lighthouse scores for the live site were **not** measured). Local
statuses come from a Playwright crawl of a production build at desktop
(1440 px) and mobile (390 px) widths.

## A. Live site — https://www.timesestates.co.uk (WordPress + Houzez theme)

Source: `robots.txt`, `wp-sitemap.xml` (15 sub-sitemaps), page fetches.

| # | URL | Type | Last modified (sitemap) | Fetched | Notes / action |
|---|---|---|---|---|---|
| 1 | `/` | Home | 2022-01-29 | 200 | Hero, search, 3 testimonials, 2 listings, "sneak peak… bare with us" banner. **Keep URL (301 target of new home).** |
| 2 | `/contact-us/` | Contact | 2024-11-21 | 200 | Address 127 Upper Tooting Rd, phone 0208 672 8080, email info@timesestates.co.uk. Phone link has empty `tel:` target. **Redirect to new `/contact`.** |
| 3 | `/properties/` | Listings index | 2022-01-30 | 200 | 2 properties, both "For Rent", both "New Listing", both "5 years ago". **Redirect to new `/rent` (or `/properties`).** |
| 4 | `/property/ground-floor-one-bedroom-self-contained-flat-camberwell/` | Listing TE1915 | 2022-01-29 | 200 | £1,250 pcm, 67A Flaxman Road SE5 9DN, EPC C 69. **Stale — confirm availability or remove (see risk register).** |
| 5 | `/property/fishponds-road-tooting-sw17/` | Listing (room) | 2022-01-29 | 200 | £1,000 pcm room, SW17 7LF, EPC D 64, Matterport tour, 3 floor plans. **Stale — as above.** |
| 6 | `/privacy-policy/` | Legal | 2024-12-09 | 200 | Names "Times Estates Ltd" (not the legal name), 145 Upper Tooting Rd, mobile only; cookie link is `#`. **Supersede with solicitor-reviewed policy; 301 to new `/privacy-policy`.** |
| 7 | `/terms-of-service/` | Legal | 2024-12-09 | 200 | Mentions "sister company Builders Terminal"; no redress/complaints route. **Supersede; 301 to new `/terms`.** |
| 8 | `/2022/01/25/planning-permission/` | Blog post | 2022-01-25 | 200 | Duplicated paragraphs, placeholder text "sdfsdf", author `admin.timesestates`. **Remove or rewrite; 410 or 301 to an insights page if kept.** |
| 9 | `/blog/` | Blog index | 2022-01-25 | not fetched | One post only. **301 to insights section if built; else 410.** |
| 10 | `/agents/` | Agent list | 2022-01-24 | 200 | One agent: Mohammad Muzaffar Malik, "CEO & Founder", malik@timesestates.co.uk. **301 to new `/about`.** |
| 11 | `/partner-agencies/` | Houzez template | 2022-01-24 | not fetched | No partner agencies exist. **410.** |
| 12 | `/search-results/` | Houzez search | 2022-01-25 | not fetched | **301 to new search.** |
| 13 | `/properties-2/` | Duplicate listing page | 2022-01-25 | not fetched | Duplicate of #3 (duplicate content). **410 or 301 to #3's successor.** |
| 14 | `/create-a-listing/` | Front-end submission (login required) | 2022-01-25 | 200 | Public registration + "Draft Saved" workflow exposed. **Do not carry over; 410.** |
| 15 | `/my-account/` | Houzez user account | 2022-01-25 | not fetched | **410.** |
| 16 | `/invoices/` | Houzez invoices | 2022-01-25 | not fetched | Exposes a payments feature that is not used. **410.** |
| 17 | `/profile/` | Houzez profile | 2020-09-17 | not fetched | **410.** |
| 18 | `/compare/` | Houzez compare | 2022-01-25 | not fetched | **410.** |
| 19 | `/favourites/` | Houzez favourites | 2022-01-25 | not fetched | **301 to new `/favourites`.** |
| 20 | `/insight/` | Houzez template page | 2022-01-25 | not fetched | **410.** |
| 21 | `/author/admin-timesestates/` and `/author/timesestates/` | Author archives | — | listed in `wp-sitemap-users-1.xml` | **Exposes two account slugs (user enumeration).** 410 on migration. |
| 22 | Taxonomy archives (`property_type`, `property_status`, `property_feature`, `property_label`, `property_country`, `property_city`, `property_area`, `category`, `post_tag`) | 9 sitemaps | — | not fetched | Thin/duplicate archive pages. **410, with the area names recorded in `CONTENT_REGISTER.md`.** |
| 23 | `/robots.txt` | — | — | 200 | Disallows `/wp-admin/` only. |
| 24 | `/wp-sitemap.xml` | — | — | 200 | Default WordPress sitemap; `sitemap_index.xml` (Yoast-style) does not exist. |
| 25 | `http://timesestates.co.uk` (bare domain) | — | — | not resolvable from this environment | Confirm 301 to `https://www.` at migration. |

External links found on the live site: `demo18.houzez.co` (three service
cards still link to the theme vendor's demo), `designerwebsiteagency.com`
(footer credit), `goo.gl` maps short link, Yelp API placeholder on
listing pages ("What's Nearby?" requests an API key), `someone@example.com`
placeholder in the listing share/enquiry mailto.

## B. Local build — this repository, production build 2026-10-19

33 routes compiled (`next build`, 0 errors). Every route returned **200**
at both widths; the deliberate `/does-not-exist` probe returned **404**
with the custom page. 47 distinct `href` targets collected across all
pages: 43 internal links all **200**; 4 non-HTTP (`#main-content`,
2 × `tel:`, 1 × `mailto:`). **0 broken links.**

| Route | Rendering | Title | H1 | Robots | In sitemap | Notes |
|---|---|---|---|---|---|---|
| `/` | static | Times Estate Ltd \| London Property Experts | Times Estate Ltd — straightforward London estate agency advice | index | yes | Hero slideshow placeholders, 4-tab search, trust strip, 3 demo properties |
| `/about` | static | About Us | Times Estate Ltd | index | yes | Company facts with status badges; team/areas MISSING |
| `/accessibility` | static | Accessibility Statement | Accessibility Statement | index | yes | |
| `/buy` | dynamic | Property for Sale | Residential property for sale | index | yes | Demo data |
| `/rent` | dynamic | Property to Rent | Residential property to rent | index | yes | Demo data |
| `/commercial` | static | Commercial Sales, Lettings & Management | … | index | yes | |
| `/commercial/for-sale` | dynamic | Commercial Property for Sale | … | index | yes | |
| `/commercial/to-let` | dynamic | Commercial Property to Let | … | index | yes | |
| `/property/[id]` (9 demo ids) | dynamic | per property | per property | **noindex, follow** | no | All demo; `RealEstateListing` JSON-LD suppressed for demo |
| `/sell` | static | Sell Your Home | Book a free initial market appraisal | index | yes | Lead form |
| `/let` | static | Let Your Property | Request a rental appraisal | index | yes | Lead form |
| `/property-management` | static | Property Management | Full management for landlords | index | yes | |
| `/residential` | static | Residential Sales & Lettings | … | index | yes | **No canonical tag** (only route among public pages without one) |
| `/report-a-repair` | static | Report a Repair | Report a repair | index | yes | File upload field; no canonical |
| `/callback` | static | Request a Callback | … | index | yes | No canonical, generic description |
| `/register` | static | Register Your Requirements | … | index | yes | No canonical, generic description |
| `/property-alerts` | dynamic | Property Alerts | … | index | yes | No canonical, generic description |
| `/favourites` | static | (site default) | Your saved properties | index (meta) | no (robots.txt disallow) | Title falls back to site default |
| `/contact` | static | Contact Us | Get in touch | index | yes | Contact facts with badges |
| `/privacy-policy`, `/cookie-policy`, `/terms`, `/complaints`, `/fees` | static | per page | per page | index | yes | Each carries a visible "DRAFT — REQUIRES LEGAL REVIEW" banner |
| `/admin`, `/admin/properties`, `/admin/properties/[id]`, `/admin/leads`, `/admin/leads/[id]`, `/admin/audit` | dynamic | Admin — … | varies (two admin pages have **no H1**) | noindex, nofollow | no | Mock cookie auth; `/admin` and `/admin/properties` **overflow horizontally at 390 px** |
| `/robots.txt`, `/sitemap.xml` | static | — | — | — | — | Sitemap URLs resolve to `http://localhost:3000` until `NEXT_PUBLIC_SITE_URL` is set |
| `/icon.png`, `/apple-icon.png` | static | — | — | — | — | Generic skyline favicon, not the supplied mark |

Minor findings from the crawl: `/cookie-policy` and `/sitemap.xml`
overflow horizontally at 390 px (table and raw XML respectively); the
custom 404 page logs one console error (the 404 fetch itself); no page
sets `og:image`; no image lacks `alt`; no form control lacks a label.

## C. URL mapping principle for the rebuild (recommendation)

Every live URL in section A that has ever been indexed (all 17 pages,
the post and both listings) gets an explicit 301 to its nearest
successor or a 410, decided row by row above, so search equity and
bookmarks survive migration. This is a Segment 2+ task and nothing has
been changed.
