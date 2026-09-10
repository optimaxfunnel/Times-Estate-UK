// The THIRD logo era for this project. The owner has deliberately chosen
// to rebrand — replacing the "Times Estates" identity (recreated from
// their business card, Phases 3/5/6) with a new "skyline" mark, based on
// a reference screenshot they supplied 2026-09-11. This is a genuine new
// creative direction the owner selected, not a correction — see
// DECISIONS.md (2026-09-11) for the full record.
//
// Honesty notes, same discipline as every prior logo build in this
// project:
// - The reference was a screenshot of a rendered page, not the original
//   vector artwork or font file. The skyline icon is rebuilt as plain
//   geometry (a generic multi-building silhouette — not a trace of any
//   specific real landmark), and the wordmark uses a bold slab serif
//   (Merriweather, Google Fonts, OFL-licensed) as a close visual match to
//   the reference's letterforms, not an extracted original font.
// - Colours are NOT re-sampled from the new reference — the project's
//   existing black/ink/orange tokens (already corrected for WCAG AA
//   contrast in Phase 6) are reused deliberately, since the owner's brief
//   asked for "the exact same colour scheme (black, orange, white)" and
//   changing the underlying hex values again would re-risk the contrast
//   defect already found and fixed once.
import { writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const INK = "#141414";
const WHITE = "#FFFFFF";
const ACCENT = "#D9772E"; // accent-vivid — the brand's bright orange, unchanged from Phase 5/6
const SECONDARY = "#6B6259"; // existing secondary/grey token, for the tagline

const svgDir = "logo-skyline/svg";
const pngDir = "logo-skyline/png";
const webpDir = "logo-skyline/webp";
for (const d of [svgDir, pngDir, webpDir]) mkdirSync(d, { recursive: true });

const FONT_IMPORT =
  "<style>@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@900&amp;display=swap');</style>";

function svgWrap(viewBox, inner, { bg = "none", withFont = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${
    withFont ? FONT_IMPORT : ""
  }${bg !== "none" ? `<rect width="100%" height="100%" fill="${bg}"/>` : ""}${inner}</svg>\n`;
}

// ---- Skyline icon: pure geometry, no font dependency -------------------
// A generic multi-building silhouette (varied heights, two simple spire/
// tower accents) — evocative of a city skyline without tracing any one
// specific, identifiable landmark.
function skylineIcon(color) {
  return `
    <rect x="2" y="30" width="16" height="40" fill="${color}"/>
    <rect x="20" y="18" width="14" height="52" fill="${color}"/>
    <polygon points="27,4 20,18 34,18" fill="${color}"/>
    <rect x="36" y="40" width="18" height="30" fill="${color}"/>
    <rect x="56" y="10" width="20" height="60" fill="${color}"/>
    <rect x="63" y="0" width="6" height="10" fill="${color}"/>
    <rect x="78" y="34" width="16" height="36" fill="${color}"/>
    <rect x="96" y="22" width="18" height="48" fill="${color}"/>
    <polygon points="105,6 96,22 114,22" fill="${color}"/>
    <rect x="116" y="44" width="20" height="26" fill="${color}"/>
  `;
}

function iconOnly({ color = ACCENT } = {}) {
  return svgWrap("0 0 138 70", skylineIcon(color));
}

function iconOnDark() {
  return svgWrap(
    "-8 -8 154 86",
    `<rect x="-8" y="-8" width="154" height="86" rx="14" fill="${INK}"/>${skylineIcon(ACCENT)}`,
  );
}

function iconOnLight() {
  return svgWrap(
    "-8 -8 154 86",
    `<rect x="-8" y="-8" width="154" height="86" rx="14" fill="${WHITE}"/>${skylineIcon(ACCENT)}`,
  );
}

// ---- Primary lockup: skyline + "TIMES ESTATE LTD" + tagline -------------
function primaryLockup({ bg = null, ink = INK, tagline = SECONDARY } = {}) {
  const bgRect = bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : "";
  return svgWrap(
    "0 0 760 170",
    `${bgRect}
     <g transform="translate(10,45)">${skylineIcon(ACCENT)}</g>
     <text x="172" y="92" font-family="'Merriweather', Georgia, serif" font-weight="900" font-size="52" fill="${ink}">TIMES <tspan fill="${ACCENT}">ESTATE</tspan> <tspan font-size="28" fill="${ink}">LTD</tspan></text>
     <line x1="172" y1="112" x2="230" y2="112" stroke="${ACCENT}" stroke-width="2"/>
     <text x="238" y="118" font-family="'Merriweather', Georgia, serif" font-weight="900" font-size="14" letter-spacing="2.5" fill="${tagline}">LONDON PROPERTY EXPERTS</text>`,
    { withFont: true },
  );
}

function primaryOnWhite() {
  return primaryLockup({ bg: WHITE, ink: INK, tagline: SECONDARY });
}
function primaryTransparentLight() {
  return primaryLockup({ bg: null, ink: INK, tagline: SECONDARY });
}
function primaryOnBlack() {
  return primaryLockup({ bg: INK, ink: WHITE, tagline: "#B9B2AA" });
}
function primaryTransparentDark() {
  return primaryLockup({ bg: null, ink: WHITE, tagline: "#B9B2AA" });
}

const files = {
  "te-skyline-icon-full-colour.svg": iconOnly(),
  "te-skyline-icon-on-dark.svg": iconOnDark(),
  "te-skyline-icon-on-light.svg": iconOnLight(),
  "te-skyline-primary-on-white.svg": primaryOnWhite(),
  "te-skyline-primary-transparent-light-use.svg": primaryTransparentLight(),
  "te-skyline-primary-on-black.svg": primaryOnBlack(),
  "te-skyline-primary-transparent-dark-use.svg": primaryTransparentDark(),
};

for (const [name, content] of Object.entries(files)) {
  writeFileSync(`${svgDir}/${name}`, content, "utf8");
}
console.log(`Wrote ${Object.keys(files).length} SVG masters to ${svgDir}/`);

const iconSvg = files["te-skyline-icon-on-dark.svg"];
const sizes = [16, 32, 48, 180, 192, 512];

for (const size of sizes) {
  const png = `${pngDir}/te-skyline-icon-${size}.png`;
  const webp = `${webpDir}/te-skyline-icon-${size}.webp`;
  await sharp(Buffer.from(iconSvg), { density: 384 })
    .resize(size, size)
    .png()
    .toFile(png);
  await sharp(Buffer.from(iconSvg), { density: 384 })
    .resize(size, size)
    .webp({ quality: 95 })
    .toFile(webp);
}
console.log(`Rasterised icon at: ${sizes.join(", ")}px (PNG + WebP)`);
