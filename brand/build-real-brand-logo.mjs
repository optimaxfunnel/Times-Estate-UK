// Recreation of the owner's existing real "Times Estates" identity, traced
// from a clear reference image of the actual logo supplied 2026-09-09 (an
// improvement on the earlier phone-photo business-card reference). NOT a
// new design. See DECISIONS.md for why this replaces the previously-built
// Direction E ("Claret") identity, which is kept, unedited, under
// logo/svg/ (superseded, not deleted).
//
// Honesty notes baked into this file, not just the docs:
// - The reference is a flattened image, not the original vector artwork or
//   the original typeface file. The "T"/"i" flourish and the house icon are
//   hand-rebuilt as plain geometry to match what's visible; the rest of the
//   letters use a similar-feeling Google Font (Baloo 2) standing in for the
//   real typeface. This is a close approximation, not a pixel-perfect
//   trace — it should be redrawn from proper source artwork by a designer
//   if the business wants the exact original reproduced.
// - The orange accent is a visual estimate read from a photograph/screen
//   image (affected by capture conditions), not a lab- or print-verified
//   colour sample. Treat #D9772E as "close," not "exact."
import { writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const INK = "#1A1A1A"; // near-black, used for text on light backgrounds
const WHITE = "#FFFFFF"; // used for text on dark backgrounds
const ORANGE = "#D9772E"; // visual estimate, close to the owner's own #D97730 guess

const svgDir = "logo-real/svg";
const pngDir = "logo-real/png";
const webpDir = "logo-real/webp";
for (const d of [svgDir, pngDir, webpDir]) mkdirSync(d, { recursive: true });

const FONT_IMPORT =
  "<style>@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700&amp;display=swap');</style>";

function svgWrap(viewBox, inner, { bg = "none", withFont = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${
    withFont ? FONT_IMPORT : ""
  }${bg !== "none" ? `<rect width="100%" height="100%" fill="${bg}"/>` : ""}${inner}</svg>\n`;
}

// ---- The house-icon "E": pure geometry, no font dependency -------------
// A house pictogram (pitched roof with a small chimney + body) in orange,
// with a font-free letter "E" cut out in the opposite colour, standing in
// for the missing "E" of "Estates" — matching the reference image.
function houseIconE({ houseColour = ORANGE, letterColour = WHITE } = {}) {
  return `
    <!-- chimney -->
    <rect x="66" y="10" width="12" height="18" fill="${houseColour}"/>
    <!-- pitched roof -->
    <polygon points="50,4 4,46 96,46" fill="${houseColour}"/>
    <!-- house body -->
    <rect x="10" y="44" width="80" height="48" rx="4" fill="${houseColour}"/>
    <!-- letter E, built from plain rectangles (font-free) -->
    <rect x="38" y="53" width="9" height="30" fill="${letterColour}"/>
    <rect x="38" y="53" width="26" height="9" fill="${letterColour}"/>
    <rect x="38" y="64" width="20" height="8.5" fill="${letterColour}"/>
    <rect x="38" y="74" width="26" height="9" fill="${letterColour}"/>
  `;
}

function iconOnly() {
  return svgWrap("0 0 100 100", houseIconE());
}

function iconOnlyOnDark() {
  return svgWrap(
    "0 0 100 100",
    `<rect width="100" height="100" rx="16" fill="#141414"/>${houseIconE()}`,
  );
}

function iconOnlyOnLight() {
  return svgWrap(
    "0 0 100 100",
    `<rect width="100" height="100" rx="16" fill="#FFFFFF"/>${houseIconE({ letterColour: WHITE })}`,
  );
}

// ---- Custom "T" + "i" flourish: pure geometry, no font dependency ------
// Matches the reference: the T's crossbar is a rounded orange bar (rather
// than square black serif), and the "i" carries an oversized round orange
// dot instead of a small square one. Both stems stay ink-coloured.
function tiFlourish(colour) {
  return `
    <!-- T stem -->
    <rect x="18" y="18" width="14" height="64" fill="${colour}"/>
    <!-- T crossbar, rounded, orange -->
    <rect x="0" y="6" width="50" height="16" rx="8" fill="${ORANGE}"/>
    <!-- i stem -->
    <rect x="60" y="34" width="13" height="48" fill="${colour}"/>
    <!-- i dot, oversized, orange -->
    <circle cx="66.5" cy="14" r="11" fill="${ORANGE}"/>
  `;
}

// ---- Primary lockup: custom "Ti" + "mes" + house-icon-E + "states" -----
// Reads as one continuous logotype, "TimesEstates", exactly as in the
// reference image — no space between "Times" and "Estates".
function primaryLockup({ bg = null, textColour = INK } = {}) {
  const bgRect = bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : "";
  return svgWrap(
    "0 0 900 140",
    `${bgRect}
     <g transform="translate(20,28)">${tiFlourish(textColour)}</g>
     <text x="108" y="104" font-family="'Baloo 2', 'Comic Sans MS', sans-serif" font-weight="700" font-size="68" fill="${textColour}">mes</text>
     <g transform="translate(300,20)">${houseIconE()}</g>
     <text x="404" y="104" font-family="'Baloo 2', 'Comic Sans MS', sans-serif" font-weight="700" font-size="68" fill="${textColour}">states</text>`,
    { withFont: true },
  );
}

function primaryOnWhite() {
  return primaryLockup({ bg: "#FFFFFF", textColour: INK });
}
function primaryTransparentLight() {
  // ink text, transparent background — for placing on an already-light surface
  return primaryLockup({ bg: null, textColour: INK });
}
function primaryOnBlack() {
  return primaryLockup({ bg: "#141414", textColour: WHITE });
}
function primaryTransparentDark() {
  // white text, transparent background — for placing on an already-dark surface
  return primaryLockup({ bg: null, textColour: WHITE });
}

const files = {
  "te-real-icon-full-colour.svg": iconOnly(),
  "te-real-icon-on-dark.svg": iconOnlyOnDark(),
  "te-real-icon-on-light.svg": iconOnlyOnLight(),
  "te-real-primary-on-white.svg": primaryOnWhite(),
  "te-real-primary-transparent-light-use.svg": primaryTransparentLight(),
  "te-real-primary-on-black.svg": primaryOnBlack(),
  "te-real-primary-transparent-dark-use.svg": primaryTransparentDark(),
};

for (const [name, content] of Object.entries(files)) {
  writeFileSync(`${svgDir}/${name}`, content, "utf8");
}
console.log(`Wrote ${Object.keys(files).length} SVG masters to ${svgDir}/`);

// ---- Raster exports of the font-free icon (favicon/app icon/avatar) ----
const iconSvg = files["te-real-icon-on-dark.svg"];
const sizes = [16, 32, 48, 180, 192, 512];

for (const size of sizes) {
  const png = `${pngDir}/te-real-icon-${size}.png`;
  const webp = `${webpDir}/te-real-icon-${size}.webp`;
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
