// Generates the Times Estate Ltd logo suite (Direction E — Claret) as clean,
// editable SVG masters, then rasterises the font-free monogram to PNG/WebP
// at the sizes actually needed (favicon, app icon, social avatar).
//
// The monogram is built from plain rectangles (no font dependency), so it
// rasterises identically everywhere. The wordmark/primary/stacked lockups
// use live text in "Playfair Display" / "Work Sans" — genuinely editable
// (per the brief's "preserve editable vector masters" instruction) and will
// render correctly in any browser or design tool with those fonts
// available (both are Google Fonts, OFL-licensed, free).
import { writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const INK = "#201014";
const IVORY = "#FBF6EE";
const CLARET = "#7A1F3D";
const BLUSH = "#EFD9DE";

const svgDir = "logo/svg";
const pngDir = "logo/png";
const webpDir = "logo/webp";
for (const d of [svgDir, pngDir, webpDir]) mkdirSync(d, { recursive: true });

// Embedded so every SVG that uses live text is self-contained: opened
// directly in any internet-connected browser, it fetches and applies the
// real typeface itself, rather than depending on the font being installed
// or on how the file happens to be embedded elsewhere.
const FONT_IMPORT =
  "<style>@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&amp;family=Work+Sans:wght@400;500&amp;display=swap');</style>";

function svgWrap(viewBox, inner, { bg = "none", withFont = false } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${
    withFont ? FONT_IMPORT : ""
  }${bg !== "none" ? `<rect width="100%" height="100%" fill="${bg}"/>` : ""}${inner}</svg>\n`;
}

// ---- The monogram: pure geometry, no font dependency -----------------
// 100x100 box. "T" occupies the left block, "E" the right block, both
// built from simple rectangles so it reads cleanly from 512px down to 16px.
function monogramGlyphs(colour) {
  return `
    <!-- T -->
    <rect x="15" y="15" width="32" height="10" fill="${colour}"/>
    <rect x="26" y="15" width="10" height="70" fill="${colour}"/>
    <!-- E -->
    <rect x="53" y="15" width="10" height="70" fill="${colour}"/>
    <rect x="53" y="15" width="32" height="10" fill="${colour}"/>
    <rect x="53" y="45" width="26" height="10" fill="${colour}"/>
    <rect x="53" y="75" width="32" height="10" fill="${colour}"/>
  `;
}

function monogramFullColour() {
  // claret rounded square + ivory glyphs
  return svgWrap(
    "0 0 100 100",
    `<rect x="0" y="0" width="100" height="100" rx="20" fill="${CLARET}"/>${monogramGlyphs(IVORY)}`,
  );
}
function monogramOneColourDark() {
  // ink glyphs only, no background fill — for single-colour print/engraving
  return svgWrap("0 0 100 100", monogramGlyphs(INK));
}
function monogramReversed() {
  // for placing on a claret or dark background: ivory outline square + ivory glyphs
  return svgWrap(
    "0 0 100 100",
    `<rect x="2" y="2" width="96" height="96" rx="20" fill="none" stroke="${IVORY}" stroke-width="4"/>${monogramGlyphs(IVORY)}`,
  );
}

// ---- Wordmark (live text — editable master) ---------------------------
function wordmark(colour, ruleColour = null) {
  const rule = ruleColour
    ? `<rect x="2" y="70" width="230" height="7" fill="${ruleColour}"/>`
    : "";
  return svgWrap(
    "0 0 420 90",
    `<text x="0" y="58" font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="52" fill="${colour}">Times Estate</text>${rule}`,
    { withFont: true },
  );
}

// ---- Primary horizontal lockup: monogram + wordmark + rule -------------
function primaryHorizontal(monoColour, monoBg, textColour, ruleColour) {
  const monoBgEl = monoBg
    ? `<rect x="0" y="0" width="100" height="100" rx="20" fill="${monoBg}"/>`
    : `<rect x="2" y="2" width="96" height="96" rx="20" fill="none" stroke="${monoColour}" stroke-width="4"/>`;
  return svgWrap(
    "0 0 530 100",
    `${monoBgEl}${monogramGlyphs(monoColour === CLARET ? IVORY : monoColour)}
     <g transform="translate(125,5)">
       <text x="0" y="46" font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="40" fill="${textColour}">Times Estate</text>
       <rect x="1" y="58" width="220" height="6" fill="${ruleColour}"/>
     </g>`,
    { withFont: true },
  );
}

// ---- Stacked lockup: monogram above wordmark, centred -------------------
function stacked(monoColour, monoBg, textColour, ruleColour) {
  const monoBgEl = monoBg
    ? `<rect x="0" y="0" width="100" height="100" rx="20" fill="${monoBg}"/>`
    : `<rect x="2" y="2" width="96" height="96" rx="20" fill="none" stroke="${monoColour}" stroke-width="4"/>`;
  return svgWrap(
    "0 0 280 210",
    `<g transform="translate(90,0)">${monoBgEl}${monogramGlyphs(monoColour === CLARET ? IVORY : monoColour)}</g>
     <text x="140" y="150" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="30" fill="${textColour}">Times Estate</text>
     <rect x="90" y="164" width="100" height="5" fill="${ruleColour}"/>`,
    { withFont: true },
  );
}

const files = {
  // Compact mark
  "te-monogram-full-colour.svg": monogramFullColour(),
  "te-monogram-one-colour-dark.svg": monogramOneColourDark(),
  "te-monogram-reversed.svg": monogramReversed(),

  // Wordmark alone
  "wordmark-full-colour.svg": wordmark(INK, CLARET),
  "wordmark-one-colour-dark.svg": wordmark(INK, INK),
  "wordmark-reversed.svg": wordmark(IVORY, IVORY),

  // Primary horizontal lockup
  "primary-horizontal-full-colour.svg": primaryHorizontal(CLARET, CLARET, INK, CLARET),
  "primary-horizontal-one-colour-dark.svg": primaryHorizontal(INK, null, INK, INK),
  "primary-horizontal-reversed.svg": primaryHorizontal(IVORY, null, IVORY, IVORY),

  // Stacked lockup
  "stacked-full-colour.svg": stacked(CLARET, CLARET, INK, CLARET),
  "stacked-one-colour-dark.svg": stacked(INK, null, INK, INK),
  "stacked-reversed.svg": stacked(IVORY, null, IVORY, IVORY),
};

for (const [name, content] of Object.entries(files)) {
  writeFileSync(`${svgDir}/${name}`, content, "utf8");
}
console.log(`Wrote ${Object.keys(files).length} SVG masters to ${svgDir}/`);

// ---- Raster exports of the font-free monogram (favicon/app icon/avatar) --
const monogramSvg = files["te-monogram-full-colour.svg"];
const sizes = [16, 32, 48, 180, 192, 512, 720, 1024];

for (const size of sizes) {
  const png = `${pngDir}/te-monogram-${size}.png`;
  const webp = `${webpDir}/te-monogram-${size}.webp`;
  await sharp(Buffer.from(monogramSvg), { density: 384 })
    .resize(size, size)
    .png()
    .toFile(png);
  await sharp(Buffer.from(monogramSvg), { density: 384 })
    .resize(size, size)
    .webp({ quality: 95 })
    .toFile(webp);
}
console.log(`Rasterised monogram at: ${sizes.join(", ")}px (PNG + WebP)`);
