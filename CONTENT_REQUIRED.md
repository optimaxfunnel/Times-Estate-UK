# CONTENT_REQUIRED.md — Master content checklist

Every item below is required before the relevant part of the site can go
live with real (non-demo) content. Nothing here should be filled in with
invented material — if it isn't supplied or confirmed, it stays checked
"Missing" and the corresponding page uses clearly labelled demo content or
is held back.

Status key: Confirmed / Supplied by owner / Missing / Requires verification
/ Requires professional review.

## Company and legal

- [x] Full legal company name — Confirmed (verified against Companies House)
- [x] Companies House number — Confirmed (verified against Companies House)
- [x] Registered office address — Confirmed (owner-confirmed, matches Companies House)
- [ ] Trading address(es), if different — Missing
- [ ] VAT number, if applicable — Missing
- [ ] Privacy policy text — Missing (Requires professional review once drafted)
- [ ] Cookie policy text — Missing (Requires professional review once drafted)
- [ ] Terms of website use — Missing (Requires professional review once drafted)
- [ ] Complaints handling procedure — Missing (Requires professional review)

## Regulatory and compliance

- [ ] Redress scheme name and membership number — Requires verification (certificate supplied, membership number not independently confirmed)
- [ ] Client Money Protection scheme and certificate — Requires verification (certificate supplied, not independently confirmed)
- [ ] Professional body membership(s) — Missing
- [ ] AML supervision registration details — Missing
- [ ] Professional indemnity insurer/policy reference — Requires verification (policy wording supplied; the schedule with the actual policy number/limit is still Missing)
- [ ] Published fee schedule (lettings/management) — Missing

## Brand assets

- [ ] Logo — vector (SVG/EPS) and high-resolution raster — Missing
- [ ] Brand colour palette (hex codes) or preference — Missing
- [ ] Typography preference, if any — Missing
- [ ] Brand tone-of-voice guidance, if any — Missing

## Contact and operational

- [ ] Public phone number(s) — Missing
- [ ] Public email address(es) — Missing
- [ ] Physical office address(es) for display — Missing
- [ ] Opening hours — Missing
- [ ] Out-of-hours/emergency repair contact process — Missing
- [ ] Domain name (existing or to be registered) — Missing

## People

- [ ] Staff names, roles and bios (only those consenting to appear) — Missing
- [ ] Staff photography — Missing
- [ ] Team/office group photography — Missing

## Property content

- [ ] Current live property listings (for sale) — Missing
- [ ] Current live property listings (to let) — Missing
- [ ] Commercial property listings — Missing
- [ ] Property photography (per listing) — Missing
- [ ] Floorplans/EPC documents (per listing) — Missing
- [ ] Existing property feed/API (e.g. from a portal or CRM), if any — Missing

## Systems and integrations (added Day 4)

- [ ] Confirmation of whether a CRM/agency software (e.g. Reapit, Alto,
      Dezrez, Jupix, Street, SME Professional) is already used — Missing.
      See `INTEGRATIONS.md`'s CRM/property portal section.
- [ ] Confirmation of whether a live feed agreement exists with any
      property portal (Rightmove, Zoopla, OnTheMarket) — Missing.

## Trust content

- [ ] Genuine, attributable client testimonials — Missing
- [ ] Case studies (optional) — Missing
- [ ] Awards/memberships actually held (with evidence) — Missing

## Reference material

- [ ] Example websites the owner likes, with notes on what they like — Missing
- [ ] Competitor websites to be aware of, if any — Missing

## Day 3 note

The website (`web/`) now displays every item above's real status directly
on the page, not just in this document — e.g. the About page shows
"MISSING" next to the team section, and the footer shows "Requires
verification" next to the redress scheme. The single source of truth for
these statuses in code is `web/src/lib/site-config.ts`, which must be kept
in sync with this file and with `CONTENT_VERIFICATION_REGISTER.md`
whenever either is updated.

## Demo/placeholder policy

Where real content is not yet available, any placeholder used during
development (sample property, dummy testimonial, stock photo, etc.) must be:

1. Visually and unambiguously labelled as demo/sample content wherever it
   could be seen by anyone other than the development team.
2. Clearly named as such in code (e.g. `demo-property-1`, not `flat-in-mayfair`).
3. Removed or replaced with confirmed content before any production
   deployment — deployment does not proceed while demo content remains in
   a publicly visible location.
