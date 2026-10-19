# Segment 1 — End Report (Approval Gate 1) — Times Estate Ltd, 2026-10-19

## 1. Executive findings

1. **The repository is a sound foundation** (Next.js 16, 33 routes, 69
   passing tests, clean build, strict CSP, honest placeholder
   discipline) with three known structural gaps — no database, mock
   admin login, no email sending — and **one new critical finding**:
   Next.js 16.3.4 carries a critical advisory set (fixed in 16.3.8+/
   16.4.2). The features behind the RCE/SSRF advisories are not used,
   but the cache-poisoning advisories apply to any self-hosted deploy.
2. **The documented server-hang defect did not reproduce** in four
   real-click form submissions in an isolated Linux container; all
   earlier reproductions were on the owner's Windows PC. It is open,
   not closed, and now points to an environment-specific cause.
3. **The live WordPress site should be retired, not repaired**: two
   listings last edited January 2022 still labelled "New Listing";
   three unverifiable testimonials; "Guaranteed Rent", "Risk Free" and
   "Fully Vetted" claims; no company number, redress, CMP or fees
   displayed; privacy policy names "Times Estates Ltd" (wrong entity)
   and conflicts with itself on analytics; open public registration and
   exposed author slugs; a 2021-era slider plugin; 14 of 17 pages are
   theme templates.
4. **The supplied logo is a phone screenshot of a raster image**
   (1206×877 JPEG, iOS share icon baked in, no transparency, no vector)
   — usable only as the reference for a later redraw. The repository's
   current SVG logo is a generic placeholder that does not match it.
5. **Company facts are confirmed; regulatory facts are not.** Companies
   House confirms name, number, office, directors and filings. Redress
   (PRS030616) and CMP (CMP013294) are quoted but unconfirmed with the
   schemes; AML supervision, deposit scheme, ICO registration, fees,
   VAT status and asset licences are missing.

## 2. Assets and content to preserve

Domain and its 20 indexed URLs (with redirects); landline 0208 672 8080
and mobile 0777 999 1313; trading address 127 Upper Tooting Road; the
two listings' photographs, floor plans and Matterport tour (subject to
rights confirmation); the area list as a candidate coverage list; the
entire `web/` codebase and its provider/RBAC/form architecture; the 42
project documents; both brand files unchanged.

## 3. Risks

**Critical** — Next.js advisory set (upgrade before deploy); mock admin
auth; no persistence; live site statutory disclosures absent (Trading
Disclosures Regs, CRA 2015 s.83–84, CMP reg. 4).
**Major** — hang defect unresolved; stale/misleading live listings
(DMCC Act material-information omissions); unverifiable testimonials and
absolute claims; privacy notice errors; open registration on the live
site; logo unusable as-is; no `og:image`; 5 public pages without
canonical; admin pages overflow on mobile; no E2E tests.
**Minor** — cold typecheck failure before build; cookie-policy table
overflow; sample SVGs left in `public/`; Node version drift (24 vs 22);
live-site typos and placeholder text.

## 4. Brand colour samples and accessibility

Measured from the artwork (median of filtered pixel regions):
ivory #FEFEFE · ink #131619 · charcoal #1D1D20 · **copper #984E15**
(6.11:1 on white — AA as-is) · copper rule #9A5230 · bronze #E1903F
(fails on white 2.54:1, passes on ink 7.14:1) · warm gold #F8AE58
(decorative) · gold glow #FCC67B · ivory highlight #F8E2C8 · mock-up
action orange **#FA641F** (3.04:1 with white text — **fails** as used in
the mock-up's buttons). Companions, same hue: #D34605 (orange text/
button, 4.52:1), #AD641B (bronze text), #B16207 (gold text), #C4651B
(copper on dark). Originals retained for decorative and large-format
use; the difference is recorded, not hidden. Wordmark is a high-contrast
transitional serif (not the site's current Merriweather); tagline a
wide-tracked geometric sans.

## 5. Legal and compliance gaps (from the 24-row register)

MISSING: trading disclosures on the live site; redress and CMP scheme
confirmation and the CMP certificate itself; fee schedule; HMRC AML
supervision; deposit scheme; ICO registration number; referral-fee/
connected-company statement; asset licences and testimonial consents;
live-site cookie consent; substantiation for live claims; security
patching. PROFESSIONAL REVIEW REQUIRED: Estate Agents Act terms; Renters'
Rights Act wording (in force 1 May 2026: fixed advertised rent, no
bidding, one month's rent in advance, no benefit/children
discrimination); sanctions screening; DMCC Act material information and
review policy; UK GDPR notice; DUAA complaints route; Equality Act
sufficiency. VERIFIED: company facts; EPC shown on live listings; local
build has nothing requiring cookie consent. No row claims overall
compliance.

## 6. Architecture options and costs

A — keep the Next.js build, add managed Postgres, Auth.js and
transactional email on a managed host: **£10–£60/month**, recommended.
B — A plus CRM/portal feed: CRM £40–£150+/month plus integration work.
C — A/B plus a headless CMS for guides and articles: £0–£15/month.
D — repair the WordPress site: cheapest, does not meet the quality
target. Recommendation: **A now, built so B and C plug in later.**

## 7. Files created or changed

Created in `segment-1/` at the repository root on your PC and in the
project folder (`/mnt/project-files/segment-1/`): PROJECT_BRIEF.md,
WEBSITE_AUDIT.md, BRAND_SOURCE_AUDIT.md, CONTENT_REGISTER.md,
EXISTING_URL_REGISTER.md, COMPLIANCE_REGISTER.md,
SKILLS_AND_TOOLS_REGISTER.md, DECISIONS.md, QA_REPORT.md and this
report. The 64 screenshots (every local route, desktop and mobile) are
in the project folder's `segment-1/screenshots/` only, not on your PC,
to keep the repository light. **No existing file was changed; no git
branch was created** (folder access cannot run git — commands are in
DECISIONS.md, or grant GitHub access / approve Remote Control).
Production, DNS and the live site untouched. No package installed, no
service connected.

## 8. Checks run and exact results

`npm ci` OK (350 pkgs) · `typecheck` cold **FAIL** (1 error, generated
types absent) → **PASS** after build · `lint` PASS · `format` PASS ·
`test` **69/69** · `next build` PASS (33 routes, 0 warnings) ·
`npm audit` **9 vulnerabilities (1 critical, 8 high)** · crawl 32 routes
× 2 viewports: 31×200 + 1×404, **0 broken links** of 43, 0 missing alt,
0 unlabelled controls, 3 routes overflow at 390 px, 2 admin pages
without H1, 6 pages without canonical, 0 `og:image` · 4 form submissions:
2 leads created, no hang, CPU flat · Companies House lookup confirmed ·
live site: 11 pages fetched, 15 sitemaps parsed; browser-level live
checks blocked by network policy.

## 9. First set of questions (no more than seven)

1. **Artwork ownership.** Who created the logo and the homepage mock-up
   (a designer, an AI tool, an agency)? Do you own the rights, and is
   there a higher-resolution or vector original anywhere?
2. **Identity facts.** Please confirm which of these are correct for
   public use: trading address 127 vs registered office 145 Upper
   Tooting Road; public email (info@timesestates.co.uk, timesestatesuk@gmail.com or
   another); the landline and mobile; opening hours; and whether the
   company is VAT-registered (number if so).
3. **Regulatory memberships.** Are PRS030616 (Property Redress) and
   CMP013294 (Client Money Protect) current? Please send both
   certificates with expiry dates, your tenancy-deposit scheme details,
   your HMRC anti-money-laundering registration number (required if you
   do sales), your ICO registration number, and any Propertymark/ARLA
   membership.
4. **Services actually offered today.** Residential sales? Commercial
   sales/lettings/management? Is the "guaranteed rent" scheme still
   offered, and on what terms (do you hold client money)? What is the
   legal relationship with "Builders Terminal"/the construction line?
5. **Fees.** Landlord let-only and full-management fees, sales
   commission, tenant permitted payments (deposit level, default
   charges), and whether figures are quoted inclusive of VAT.
6. **Listings and systems.** Where do your listings live today (only in
   the WordPress site, a CRM such as Reapit/Alto/Jupix, Rightmove/
   Zoopla/OnTheMarket)? Are the Camberwell flat and the Fishponds Road
   room still available? Who holds the Matterport account?
7. **Routing and access.** Which mailbox should each form reach
   (valuation, lettings, repairs, general)? Which social profiles exist?
   Who controls the domain registrar, the WordPress hosting and DNS? And
   will you grant this project access to the GitHub repository
   `mmmalik1954/Times-Estate-Ltd` so branches and pull requests can be
   made from here?

**Stopped at Approval Gate 1.** Nothing further will be designed,
installed, connected, deployed or changed until you answer and approve.
