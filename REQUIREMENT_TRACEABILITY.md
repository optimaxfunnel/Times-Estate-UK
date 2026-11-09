# REQUIREMENT_TRACEABILITY.md — Times Estate Ltd

**Final audit, 2026-10-30 (Day 7 Task 1).** Each requirement from the
project's control documents and the owner's decisions, where it lives in
the website, what proves it works, and what is still needed.
**Nothing is marked Complete without evidence.** Code paths are under
`web/src/`; test files end in `.test.ts(x)`; "live" means checked in a
browser against the running site during Day 5–6.

Statuses used: **Complete** · **Complete with limitation** · **Blocked**
· **Requires owner approval** · **Requires professional review** ·
**Not started**.

This replaces the Day 7 (Sept) table in `TEST_REPORT.md` §1, which is
kept as history.

## Summary

*Updated after Day 7 Task 2 (server-hang defect I8 fixed: Blocked → Complete) and Task 5 (three gaps found while writing the staff manual added: D6, E9, F7).*

| Status | Count |
|---|---|
| Complete | 39 |
| Complete with limitation | 20 |
| Blocked | 3 |
| Requires owner approval | 10 |
| Requires professional review | 7 |
| Not started | 10 |
| **Total** | **89** |

## A. Business requirements (BUSINESS_REQUIREMENTS.md §1–4)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| A1 | Company name, number, registered office shown | `lib/site-config.ts`; footer; `app/company-information` | Companies House check (register row 1–2, 8); live page read Day 6 | Complete | — |
| A2 | Trading address, phones, email shown | `site-config.ts`; header, footer, `/contact`, `/company-information` | Live Day 6; labelled "Supplied by owner" | Complete with limitation | Owner to confirm numbers answered and address correct for visitors |
| A3 | Residential sales | `app/sell`, `app/buy`, `LeadForm` (sales valuation) | `LeadForm.test.tsx`; axe/Lighthouse 100 on `/sell`, `/buy` | Complete with limitation | Real listings feed (all listings are demonstration data) |
| A4 | Residential lettings | `app/let`, `app/rent` | As A3; Lighthouse on `/rent` area via `/buy` template | Complete with limitation | Real listings feed |
| A5 | Residential property management | `app/property-management` (`management_enquiry`) | Lead workflow tests (`controls`, `provider`) | Complete | — |
| A6 | Commercial sales, lettings, management | `app/commercial`, `/commercial/for-sale`, `/commercial/to-let`; three commercial lead categories | axe clean on `/commercial/to-let`; provider tests | Complete with limitation | Sectors covered not confirmed (hidden note) |
| A7 | Valuation requests | Sell/Let/Commercial forms; `components/admin/ValuationRecordForm.tsx` | `controls.test.ts` (only Manager/Admin record a valuation; no automated figure) | Complete | — |
| A8 | Viewing requests | `app/property/[id]` viewing form; `LeadStageForm` | `controls.test.ts` (booking needs confirmed occupier access; past dates rejected) | Complete | — |
| A9 | Repair reporting | `app/report-a-repair`, `lib/leads/repair-actions.ts` | `repair-uploads.test.ts` (types, signatures, 5 files, 20 MB total) | Complete with limitation | Files are checked then discarded until scanned storage is approved; real multi-MB upload not exercised (server-freeze fault) |
| A10 | Property enquiries / callback / register | `app/callback`, `app/register`, `app/contact` | `LeadForm.test.tsx`; live error-summary test Day 6 | Complete | — |
| A11 | Controlled AI assistance | `components/ai/AssistantWidget.tsx`, `lib/ai/*` | `refusals`, `demo-provider`, `assistant-safety`, `AssistantWidget` tests; live injection refusal | Complete with limitation | Demonstration mode only; a live AI provider needs approval |
| A12 | Lead-management automation | `app/admin/leads`, `lib/leads/escalation.ts`, `workflow` | `escalation.test.ts`, `controls.test.ts`, `workflow.test.ts` | Complete with limitation | Outbound email off; leads held in memory |
| A13 | Construction mentioned only (owner decision 2026-09-09) | Footer and `/about` phone-line mention | Live footer read Day 6 | Complete | — |
| A14 | Redress scheme displayed | Footer, `/company-information`, `/why-choose-us` | Live; labelled "Requires verification" | Requires owner approval | Confirm membership with the scheme |
| A15 | Client Money Protection displayed, certificate available | Same places (number only) | Live | Requires owner approval | Confirm with CMP; approve publishing the certificate |
| A16 | Fee transparency (tenant permitted payments, landlord fees, VAT) | `app/fees` structure | `content-gaps` launch-blocker test | Blocked | Owner to supply fees and VAT position |
| A17 | VAT, ICO, AML, deposit scheme, professional body | — | — | Not started | Owner to supply each |
| A18 | Opening hours | — (hidden note on `/contact`) | `PlaceholderNotice.test.tsx` | Not started | Owner to supply |

## B. Sitemap and pages (SITEMAP.md, Phase 4 / Segment 2)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| B1 | All Phase 4 core pages (Home, Sell, Let, Management, Buy, Rent, Commercial hub/sales/lettings, Alerts, Repair, About, Contact) | `app/*` routes | Link crawl: 36 internal URLs, 0 broken; structure check 27 pages (1 H1, landmarks) | Complete | — |
| B2 | Legal and regulatory pages | `privacy-policy`, `cookie-policy`, `terms`, `complaints`, `fees`, `accessibility`, `company-information` | Live; "Draft — requires legal review" banner on each | Requires professional review | Solicitor review |
| B3 | Header navigation with grouped dropdowns (2026-10-20 decision) | `components/layout/Header.tsx`, `DropdownDismiss.tsx` | `Header.test.tsx`; keyboard + Escape live Day 6 | Complete | — |
| B4 | Segment 2 proposed pages `/investors`, `/how-we-protect-you` | — | — | Requires owner approval | Gate 2 choice (A, B, C) still not given |
| B5 | `/tenants` route | Redirect to `/buyers#tenants` (`next.config.ts`) | Config reviewed | Complete with limitation | Separate page only if Gate 2 approves |
| B6 | Area guides | `app/areas` (noindex, candidate list) | `structured-data.test.ts` (kept out of sitemap) | Requires owner approval | Owner to confirm areas served |
| B7 | Map on search pages | Not built (text "Search by Area" panel — decision 2026-10-20) | — | Not started | Only if owner wants one; needs accessible alternative |

## C. User journeys (USER_JOURNEYS.md S2.1)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| C1 | Vendor → valuation | Header "Get a Valuation" → `/sell` form → `/enquiry-received` | `LeadForm.test.tsx` (redirect to confirmation) | Complete with limitation | Email confirmation off |
| C2 | Landlord → rental valuation / management | `/let`, `/property-management` | Same | Complete with limitation | Same |
| C3 | Buyer → viewing | `/buy` → card → `/property/[id]` → viewing form | `PropertyDetail.test.tsx`, `controls.test.ts` | Complete with limitation | Real listings |
| C4 | Tenant → viewing | `/rent` → detail → viewing | Same | Complete with limitation | Real listings |
| C5 | Searcher → alert (no match) | Empty state "Create a Property Alert" (`ListingExplorer.tsx`) → `/property-alerts` | Code reviewed; `search-filters.test.ts` | Complete with limitation | Alert emails need an email provider |
| C6 | Commercial client → enquiry | `/commercial` forms (`commercial_enquiry` etc.) | Provider tests | Complete | — |
| C7 | Investor → conversation | — (`/investors` not built) | — | Requires owner approval | Gate 2 |
| C8 | Managed tenant → repair | Footer + Tenants menu → `/report-a-repair` (emergency guidance first) | `repair-uploads.test.ts`; live keyboard check | Complete with limitation | Emergency wording needs professional review (see F4) |
| C9 | Due diligence → contact | `/about`, `/company-information`, `/complaints` | Live | Complete with limitation | Memberships unverified (A14–A15) |
| C10 | Old links → new site (301/410 map) | `SEO_REDIRECT_PLAN.md` (plan only) | — | Not started | Implement at deployment, after owner approval |

## D. Design system (DESIGN_SYSTEM.md, brand decisions)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| D1 | Design tokens (colour, type, spacing) applied sitewide | `app/globals.css`, `components/ui/*` | axe colour-contrast clean on all scanned pages | Complete | — |
| D2 | Owner-supplied logo in header, footer, favicon | `BrandLockup.tsx`, `public/brand/` | Visual check Day 6 (right-sized copies) | Complete with limitation | Clean logo export still awaited (screenshot has a button over the "D") |
| D3 | Shared components with states (badge, status panel, cards) | `components/ui` | `Badge`, `StatusPanel`, `PropertyCard` tests | Complete | — |
| D4 | Choice of design-application option A/B/C | — | — | Requires owner approval | Owner to choose at Gate 2 |
| D5 | Responsive from 320 px to 1920 px | All layouts | No sideways scroll at 320–1920 px (Day 6) | Complete | — |
| D6 | Content Editor can update page text | — (role exists; page text lives in code) | — | Not started | Owner to decide whether a page editor is needed; until then the developer makes text changes (found Day 7 handover) |

## E. Data model and admin (DATA_MODEL.md, ADMIN_AND_CMS.md)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| E1 | Property data model with public/private and must-verify fields | `lib/property/schema.ts`, `field-rules.ts`, `types.ts` | `field-rules.test.ts`, `types.test.ts` | Complete | — |
| E2 | Material information on property pages (Part A) | `app/property/[id]` (price, council tax, tenure, lease, charges, EPC) | `PropertyDetail.test.tsx` | Complete with limitation | Part B/C fields not in model; EPC not compulsory before approval |
| E3 | Five roles, approval workflow, drafts never public | `lib/auth/roles.ts`, `lib/property/workflow.ts` | `roles.test.ts`, `workflow.test.ts` | Complete | — |
| E4 | Audit log of admin changes | `lib/auth/audit-log.ts`, `/admin/audit` | Existing tests | Complete with limitation | In memory until a database exists |
| E5 | Persistent database | — | — | Blocked | Owner to approve a provider (cost) |
| E6 | CRM / portal feed | `lib/property/feeds` adapter boundary only | `feed-adapter.test.ts` | Requires owner approval | Owner to choose CRM/portal |
| E7 | Staff content-status view | `app/admin/content`, `lib/content-gaps.ts` | `PlaceholderNotice.test.tsx` | Complete | — |
| E8 | Demonstration data labelled visibly | Card and detail labels ("Sample property — invented for testing") | Production HTML read Day 6; `PropertyCard.test.tsx` | Complete | — |
| E9 | Staff can add a new property | — (no add-property screen; listings come from demonstration data) | — | Not started | Owner to choose: CRM feed (E6) or an add-property screen (found Day 7 handover) |

## F. Automation and AI (AUTOMATION_WORKFLOWS.md, AI_SAFETY_RULES.md)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| F1 | Per-category workflow, assignment, priority, follow-up, overdue flags | `lib/leads/*`, `LeadStageForm.tsx` | `controls`, `escalation`, `provider` tests | Complete | — |
| F2 | Outbound communications only as drafts awaiting a person | `lib/ai/outbound-drafts.ts` (no send function) | `assistant-safety.test.ts` | Complete | — |
| F3 | Live email (staff alerts, confirmations, property alerts) | `lib/leads/notify.ts` logs "not sent" | `provider.test.ts` (failure path) | Requires owner approval | Recipients, reply-to, wording, retention, provider |
| F4 | AI never decides emergencies or gives legal, financial, mortgage, surveying advice or valuations | `lib/ai/refusals.ts` | `refusals`, `assistant-safety`, `repair-uploads` tests | Complete | — |
| F5 | AI resists prompt injection; never sees private fields | `demo-provider.ts` (`looksLikeInjection`), public property shape | `assistant-safety.test.ts` (4 attacks); live Day 5 | Complete | — |
| F6 | AI suggests only available properties, cites sources, says it is an AI | `demo-provider.ts` | `assistant-safety.test.ts` | Complete | — |
| F7 | Staff screen to review AI-generated drafts | — (drafts module only; no screen) | `assistant-safety.test.ts` (drafts never sent) | Not started | Build with the email service; until then no drafts reach anyone (found Day 7 handover) |

## G. Accessibility (ACCESSIBILITY.md)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| G1 | WCAG 2.2 AA automated checks | Sitewide | axe 0 violations (14 pages, 4 states); Lighthouse 100 | Complete | — |
| G2 | Keyboard, skip link, focus, menus, dialog, forms | `layout.tsx`, `Header`, `MobileMenu`, `AssistantWidget`, `LeadForm` | Manual Day 6; `AssistantWidget.test.tsx` | Complete | — |
| G3 | Reflow, zoom, text spacing, touch targets, reduced motion | `globals.css`, header | Manual Day 6 (320 px, 1.4.12 override, 2.5.8) | Complete | — |
| G4 | Screen-reader user testing | — | — | Not started | Test with NVDA/VoiceOver user before launch |
| G5 | Accessibility statement | `app/accessibility` | Live | Requires professional review | Named contact; review |

## H. SEO (SEO_PLAN.md, SEO_REDIRECT_PLAN.md)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| H1 | Titles, descriptions, canonicals on every public page | Page `metadata` | Live HTML checks Day 6 | Complete | — |
| H2 | Sitemap and robots, private pages excluded | `app/sitemap.ts`, `app/robots.ts`, noindex metadata | `structured-data.test.ts` (2 tests) | Complete | — |
| H3 | Honest structured data (no ratings/reviews/demo listings) | `lib/seo/structured-data.ts` | `structured-data.test.ts` (4 tests) | Complete | Rich Results Test once public |
| H4 | Phone numbers in structured data | Omitted | Test asserts what is emitted | Requires owner approval | Owner to approve using owner-supplied numbers |
| H5 | Sharing image (Open Graph) | Site name, locale and card type set in `app/layout.tsx`; no image | — | Not started | Needs clean logo export to make one |

## I. Security (SECURITY.md)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| I1 | Server validation, sanitisation, rate limiting, honeypot | `lib/security/*`, every server action | `sanitize`, `rate-limit`, `honeypot` tests | Complete with limitation | Rate limit needs a shared store when hosted |
| I2 | Security headers, CSP, no framework banner | `next.config.ts` | `curl -I` on production build Day 6 | Complete | — |
| I3 | Upload security | `lib/security/file-upload.ts`, `attachment-store.ts` | `repair-uploads.test.ts` | Complete | — |
| I4 | Admin locked in production | `lib/auth/session.ts`, `proxy.ts` | `curl` 307 to sign-in on production build | Complete | — |
| I5 | Real staff sign-in with MFA | — | — | Blocked | Owner to choose provider |
| I6 | Dependencies free of critical advisories | `package.json` | 2026-11-09: Next.js upgraded to 16.4.5 (owner approved); `npm audit --omit=dev`: 0 vulnerabilities. 8 moderate advisories remain in developer-only lint tooling (not shipped) | Done | Recheck `npm audit` before deployment |
| I7 | No secrets or customer data in the repository | `.gitignore`, `.env.example` | Secret scan incl. full history, Day 6 | Complete | — |
| I8 | Form submission must not hang the server | `components/forms/LeadForm.tsx` (unbound action), `lib/leads/form-config.ts` | Reproduced and CPU-profiled, root cause fixed; all 14 public forms re-submitted on a production build with the server healthy after each; `form-config.test.ts` (regression guard + 6 tests) — TEST_REPORT.md Day 7 Task 2 | Complete | — (updated 2026-10-30, Task 2) |

## J. Privacy (PRIVACY_DATA_MAP.md)

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| J1 | Data map of what is collected, why, where, who, how long | `PRIVACY_DATA_MAP.md` | Document review | Requires professional review | Lawful bases, retention |
| J2 | Consent captured (privacy; separate marketing consent) | `LeadForm`, alert form | `LeadForm.test.tsx` | Complete | — |
| J3 | Privacy and cookie notices | `app/privacy-policy`, `app/cookie-policy` | Live | Requires professional review | Solicitor review |
| J4 | No tracking cookies without consent | No analytics loaded; CSP blocks third-party scripts | Lighthouse: 0 third-party bytes | Complete | Consent banner needed before any analytics |
| J5 | Deletion / data-subject request process | — | — | Not started | Build admin deletion; agree process |
| J6 | Retention periods | Proposals only | — | Requires professional review | Owner and adviser to decide |

## K. Owner decisions and project rules

| # | Requirement | Implementation location | Test evidence | Status | Outstanding action |
|---|---|---|---|---|---|
| K1 | Rule 1 — no invented facts | `CONTENT_VERIFICATION_REGISTER.md` (Day 6 table); copy audit | Day 6 copy review | Complete | — |
| K2 | Rule 2 — demonstration content labelled | See E8 | See E8 | Complete | — |
| K3 | Unverified content kept out of misleading public claims | `PlaceholderNotice` hides internal notes in production | `PlaceholderNotice.test.tsx`; production HTML check | Complete | — |
| K4 | Guaranteed Rent not offered | `/landlords` (hidden note only) | Live | Requires professional review | Only after terms are legally reviewed |
| K5 | Legal wording, complaints timescales, emergency wording | Drafts | — | Requires professional review | Solicitor / compliance |
| K6 | Header shows landline then mobile (owner, 2026-10-30) | `Header.tsx` | Live at 375–1536 px; axe target-size clean | Complete | — |
| K7 | Rule 6 — no deployment without exact approval | Nothing deployed; no hosting, DNS or paid service | `git log`; no deploy config used | Complete | Wait for "I approve production deployment." |
| K8 | Rule 7 — all checks recorded before any deployment recommendation | `TEST_REPORT.md`, `QA_REPORT.md`, `ACCESSIBILITY.md`, `SECURITY.md` | Day 6 verification table | Complete with limitation | Final pre-launch re-run on the real host |
