// Digital essentials + a small number of real, representative social
// templates for Times Estate Ltd, Direction E — Claret.
import { writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const INK = "#201014";
const IVORY = "#FBF6EE";
const CLARET = "#7A1F3D";
const BLUSH = "#EFD9DE";

mkdirSync("digital", { recursive: true });
mkdirSync("social", { recursive: true });

const FONT_IMPORT =
  "<style>@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&amp;family=Work+Sans:wght@400;500;600&amp;display=swap'); text{font-family:'Work Sans',sans-serif;} .display{font-family:'Playfair Display',Georgia,serif;font-weight:700;}</style>";

function monogramGlyphs(colour) {
  return `
    <rect x="15" y="15" width="32" height="10" fill="${colour}"/>
    <rect x="26" y="15" width="10" height="70" fill="${colour}"/>
    <rect x="53" y="15" width="10" height="70" fill="${colour}"/>
    <rect x="53" y="15" width="32" height="10" fill="${colour}"/>
    <rect x="53" y="45" width="26" height="10" fill="${colour}"/>
    <rect x="53" y="75" width="32" height="10" fill="${colour}"/>
  `;
}
function monogram(x, y, size, glyph) {
  const s = size / 100;
  return `<g transform="translate(${x},${y}) scale(${s})">${monogramGlyphs(glyph)}</g>`;
}

// ---- Open Graph image: 1200x630 ----------------------------------------
const ogImage = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
${FONT_IMPORT}
<rect width="1200" height="630" fill="${CLARET}"/>
${monogram(80, 80, 130, IVORY)}
<text x="80" y="420" class="display" font-size="72" fill="${IVORY}">Times Estate</text>
<rect x="82" y="440" width="360" height="8" fill="${IVORY}"/>
<text x="80" y="480" font-size="28" fill="${IVORY}" opacity="0.85">Residential &amp; commercial sales, lettings and property management</text>
<text x="80" y="580" font-size="24" fill="${IVORY}" opacity="0.7">timesestates.co.uk</text>
</svg>
`;

// ---- No-property-image placeholder (site pattern, re-skinned) ---------
const noImage = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
${FONT_IMPORT}
<rect width="800" height="600" fill="${BLUSH}"/>
${monogram(350, 250, 100, CLARET)}
<text x="400" y="400" text-anchor="middle" font-size="26" fill="${INK}" opacity="0.6">Photograph not yet supplied</text>
</svg>
`;

// ---- Loading / empty state ----------------------------------------------
const loadingState = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
${FONT_IMPORT}
<rect width="400" height="300" fill="${IVORY}"/>
${monogram(150, 90, 60, CLARET)}
<rect x="130" y="180" width="140" height="8" rx="4" fill="${BLUSH}"/>
<rect x="150" y="198" width="100" height="8" rx="4" fill="${BLUSH}"/>
<text x="200" y="240" text-anchor="middle" font-size="14" fill="${INK}" opacity="0.5">Loading…</text>
</svg>
`;

// ---- 404 artwork ---------------------------------------------------------
const notFound = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
${FONT_IMPORT}
<rect width="800" height="500" fill="${IVORY}"/>
${monogram(340, 60, 120, CLARET)}
<text x="400" y="260" text-anchor="middle" class="display" font-size="64" fill="${CLARET}">404</text>
<text x="400" y="300" text-anchor="middle" font-size="22" fill="${INK}">This page doesn&#8217;t exist &#8212; or the property is no longer listed.</text>
<rect x="330" y="330" width="140" height="44" rx="6" fill="${CLARET}"/>
<text x="400" y="357" text-anchor="middle" font-size="16" fill="${IVORY}" font-weight="600">Back to home</text>
</svg>
`;

// ---- Instagram square "Just Listed" post: 1080x1080 ---------------------
const instaJustListed = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
${FONT_IMPORT}
<rect width="1080" height="1080" fill="${IVORY}"/>
<rect x="0" y="0" width="1080" height="620" fill="${BLUSH}"/>
<text x="540" y="320" text-anchor="middle" font-size="30" fill="${INK}" opacity="0.4">[Property photograph]</text>
<rect x="60" y="60" width="220" height="64" rx="32" fill="${CLARET}"/>
<text x="170" y="102" text-anchor="middle" font-size="26" font-weight="600" fill="${IVORY}">JUST LISTED</text>
${monogram(60, 700, 70, CLARET)}
<text x="150" y="760" class="display" font-size="42" fill="${INK}">14 Ashcombe Road</text>
<text x="150" y="800" font-size="26" fill="${CLARET}">Tooting, SW17</text>
<text x="60" y="880" font-size="30" fill="${INK}">Offers in the Region of &#163;675,000</text>
<rect x="60" y="920" width="200" height="6" fill="${CLARET}"/>
<text x="60" y="990" font-size="24" fill="${INK}" opacity="0.75">020 8672 8080 &#183; timesestates.co.uk</text>
</svg>
`;

// ---- Instagram/Facebook Story: 1080x1920 ---------------------------------
const storyTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
${FONT_IMPORT}
<rect width="1080" height="1920" fill="${CLARET}"/>
<rect x="0" y="0" width="1080" height="1100" fill="${INK}" opacity="0.06"/>
<text x="540" y="560" text-anchor="middle" font-size="30" fill="${IVORY}" opacity="0.5">[Property photograph]</text>
${monogram(460, 1180, 100, IVORY)}
<text x="540" y="1360" text-anchor="middle" class="display" font-size="52" fill="${IVORY}">Just Listed</text>
<text x="540" y="1410" text-anchor="middle" font-size="30" fill="${IVORY}" opacity="0.85">14 Ashcombe Road, SW17</text>
<rect x="390" y="1700" width="300" height="80" rx="40" fill="${IVORY}"/>
<text x="540" y="1750" text-anchor="middle" font-size="28" font-weight="600" fill="${CLARET}">Book a Viewing</text>
</svg>
`;

const files = {
  "digital/og-image-default.svg": ogImage,
  "digital/no-property-image.svg": noImage,
  "digital/loading-empty-state.svg": loadingState,
  "digital/404-artwork.svg": notFound,
  "social/instagram-post-just-listed.svg": instaJustListed,
  "social/instagram-facebook-story.svg": storyTemplate,
};
for (const [path, content] of Object.entries(files)) {
  writeFileSync(path, content, "utf8");
}
console.log(`Wrote ${Object.keys(files).length} digital/social SVGs`);

// ---- Raster the OG image and Instagram post (both font-dependent, so we
// render them via the browser-verified pipeline is ideal, but for a fast
// local PNG copy at correct pixel size we rasterise with sharp too — text
// will use sharp/librsvg's fallback serif locally; the SVG source (opened
// in any internet-connected browser or design tool) remains the accurate
// version. See BRAND_GUIDELINES.md for this noted limitation. -----------
for (const [name, svg, w, h] of [
  ["og-image-default", ogImage, 1200, 630],
  ["instagram-post-just-listed", instaJustListed, 1080, 1080],
  ["instagram-facebook-story", storyTemplate, 1080, 1920],
]) {
  await sharp(Buffer.from(svg)).resize(w, h).png().toFile(`social/${name}-fallback-preview.png`);
}
console.log("Wrote fallback-font PNG previews for quick reference (see note above).");

// ---- Extra favicon/avatar sizes for platforms researched today ---------
const monogramSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="${CLARET}"/>${monogramGlyphs(IVORY)}</svg>`;
for (const size of [200, 400, 640]) {
  await sharp(Buffer.from(monogramSvg), { density: 384 })
    .resize(size, size)
    .png()
    .toFile(`logo/png/te-monogram-${size}.png`);
}
console.log("Wrote additional avatar sizes: 200 (TikTok), 400, 640 (WhatsApp) — into logo/png/");
