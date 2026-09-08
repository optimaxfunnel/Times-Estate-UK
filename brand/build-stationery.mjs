// Stationery for Times Estate Ltd, Direction E — Claret.
// Print items use real mm dimensions (1 SVG unit = 1mm) so they open at
// correct physical size in any design/print tool.
import { writeFileSync, mkdirSync } from "node:fs";

const INK = "#201014";
const IVORY = "#FBF6EE";
const CLARET = "#7A1F3D";
const BLUSH = "#EFD9DE";

const dir = "stationery";
mkdirSync(dir, { recursive: true });

const FONT_IMPORT =
  "<style>@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&amp;family=Work+Sans:wght@400;500;600&amp;display=swap'); text{font-family:'Work Sans',sans-serif;} .display{font-family:'Playfair Display',Georgia,serif;font-weight:700;}</style>";

function monogramGlyphs(colour, scale = 1) {
  // native 100x100 box, used at whatever scale via a parent <g transform>
  return `
    <rect x="15" y="15" width="32" height="10" fill="${colour}"/>
    <rect x="26" y="15" width="10" height="70" fill="${colour}"/>
    <rect x="53" y="15" width="10" height="70" fill="${colour}"/>
    <rect x="53" y="15" width="32" height="10" fill="${colour}"/>
    <rect x="53" y="45" width="26" height="10" fill="${colour}"/>
    <rect x="53" y="75" width="32" height="10" fill="${colour}"/>
  `;
}
function monogram(x, y, size, bg, glyph) {
  const s = size / 100;
  return `<g transform="translate(${x},${y}) scale(${s})">
    <rect width="100" height="100" rx="20" fill="${bg}"/>
    ${monogramGlyphs(glyph)}
  </g>`;
}

// ---------------------------------------------------------------------
// Business card — trim 85x55mm, +3mm bleed each side = 91x61mm artwork.
// A dashed trim guide is included for reference and is NOT part of the
// printed design (remove the .guide layer before sending to print).
// ---------------------------------------------------------------------
function businessCardFront() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="91mm" height="61mm" viewBox="0 0 91 61">
${FONT_IMPORT}
<rect width="91" height="61" fill="${CLARET}"/>
${monogram(8, 8, 20, "none", IVORY)}
<text x="8" y="46" class="display" font-size="7" fill="${IVORY}">Times Estate</text>
<rect x="8" y="49" width="30" height="1" fill="${IVORY}"/>
<g class="guide">
  <rect x="3" y="3" width="85" height="55" fill="none" stroke="${IVORY}" stroke-width="0.15" stroke-dasharray="1,1" opacity="0.5"/>
</g>
</svg>
`;
}

function businessCardBack() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="91mm" height="61mm" viewBox="0 0 91 61">
${FONT_IMPORT}
<rect width="91" height="61" fill="${IVORY}"/>
<text x="8" y="18" font-size="5" font-weight="600" fill="${INK}">[Name]</text>
<text x="8" y="24" font-size="3.4" fill="${CLARET}">[Job title]</text>
<line x1="8" y1="29" x2="83" y2="29" stroke="${BLUSH}" stroke-width="0.6"/>
<text x="8" y="36" font-size="3.4" fill="${INK}">020 8672 8080</text>
<text x="8" y="41" font-size="3.4" fill="${INK}">+44 7779 991313</text>
<text x="8" y="46" font-size="3.4" fill="${INK}">timesestates.co.uk</text>
<text x="8" y="54" font-size="2.6" fill="${INK}" opacity="0.7">Times Estate Ltd &#183; Company No. 09597081</text>
<text x="8" y="58" font-size="2.6" fill="${INK}" opacity="0.7">145 Upper Tooting Road, London, SW17 7TJ</text>
<g class="guide">
  <rect x="3" y="3" width="85" height="55" fill="none" stroke="${CLARET}" stroke-width="0.15" stroke-dasharray="1,1" opacity="0.35"/>
</g>
</svg>
`;
}

// ---------------------------------------------------------------------
// A4 Letterhead — 210x297mm. Regulatory line uses a placeholder: the
// redress scheme / CMP numbers are "Requires verification" in
// CONTENT_VERIFICATION_REGISTER.md, not yet safe to commit to print.
// ---------------------------------------------------------------------
function letterhead() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="297mm" viewBox="0 0 210 297">
${FONT_IMPORT}
<rect width="210" height="297" fill="${IVORY}"/>
<rect x="0" y="0" width="210" height="4" fill="${CLARET}"/>
${monogram(18, 16, 14, "none", CLARET)}
<text x="38" y="27" class="display" font-size="8" fill="${INK}">Times Estate</text>
<rect x="38" y="30" width="34" height="0.9" fill="${CLARET}"/>
<text x="192" y="20" font-size="3.2" fill="${INK}" text-anchor="end">020 8672 8080</text>
<text x="192" y="25" font-size="3.2" fill="${INK}" text-anchor="end">timesestates.co.uk</text>

<!-- body placeholder -->
<text x="18" y="55" font-size="3.4" fill="${INK}" opacity="0.5">[Date]</text>
<text x="18" y="65" font-size="3.4" fill="${INK}" opacity="0.5">[Recipient name and address]</text>
<line x1="18" y1="90" x2="192" y2="90" stroke="${BLUSH}" stroke-width="0.4"/>
<text x="18" y="98" font-size="3.4" fill="${INK}" opacity="0.35">Letter body area</text>

<!-- footer -->
<line x1="18" y1="272" x2="192" y2="272" stroke="${BLUSH}" stroke-width="0.4"/>
<text x="18" y="279" font-size="2.6" fill="${INK}" opacity="0.7">Times Estate Ltd &#183; Registered in England &amp; Wales &#183; Company No. 09597081</text>
<text x="18" y="284" font-size="2.6" fill="${INK}" opacity="0.7">Registered office: 145 Upper Tooting Road, London, SW17 7TJ</text>
<text x="18" y="289" font-size="2.6" fill="${CLARET}" opacity="0.9">[Redress scheme and Client Money Protection membership — pending independent verification, see COMPLIANCE_REGISTER.md]</text>
</svg>
`;
}

function letterheadContinuation() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="297mm" viewBox="0 0 210 297">
${FONT_IMPORT}
<rect width="210" height="297" fill="${IVORY}"/>
<rect x="0" y="0" width="210" height="4" fill="${CLARET}"/>
${monogram(18, 14, 9, "none", CLARET)}
<text x="18" y="284" font-size="2.6" fill="${INK}" opacity="0.6">Continuation sheet &#183; Times Estate Ltd &#183; Company No. 09597081</text>
</svg>
`;
}

// ---------------------------------------------------------------------
// Compliment slip — UK standard 210 x 99mm
// ---------------------------------------------------------------------
function complimentSlip() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="210mm" height="99mm" viewBox="0 0 210 99">
${FONT_IMPORT}
<rect width="210" height="99" fill="${IVORY}"/>
<rect x="0" y="0" width="6" height="99" fill="${CLARET}"/>
${monogram(18, 14, 11, "none", CLARET)}
<text x="40" y="25" class="display" font-size="6.5" fill="${INK}">Times Estate</text>
<text x="18" y="55" font-size="3" fill="${INK}" opacity="0.4">With compliments</text>
<text x="18" y="88" font-size="2.6" fill="${INK}" opacity="0.7">020 8672 8080 &#183; timesestates.co.uk &#183; Company No. 09597081</text>
</svg>
`;
}

// ---------------------------------------------------------------------
// Property board system — one landscape template, 5 status variants.
// Standard UK estate-agent board proportions (approx 600x450mm), drawn
// here at a 4:3 unit scale for screen preview.
// ---------------------------------------------------------------------
function propertyBoard(status, statusColour) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600mm" height="450mm" viewBox="0 0 600 450">
${FONT_IMPORT}
<rect width="600" height="450" fill="${IVORY}"/>
<rect x="0" y="0" width="600" height="90" fill="${CLARET}"/>
${monogram(24, 15, 60, "none", IVORY)}
<text x="100" y="60" class="display" font-size="38" fill="${IVORY}">Times Estate</text>
<rect x="0" y="330" width="600" height="120" fill="${statusColour}"/>
<text x="300" y="410" class="display" font-size="60" fill="${IVORY}" text-anchor="middle">${status.toUpperCase()}</text>
<text x="300" y="230" font-size="26" fill="${INK}" text-anchor="middle" opacity="0.35">[Property photograph]</text>
<text x="300" y="300" font-size="20" fill="${INK}" text-anchor="middle">020 8672 8080 &#183; timesestates.co.uk</text>
</svg>
`;
}

// Status colours stay within the approved Direction E family (tints and
// shades of claret/ink) rather than introducing new, unrelated hues —
// distinguishable at a glance while remaining recognisably "one brand."
const CLARET_DEEP = "#5C1830"; // darker shade of claret, for "To Let"
const INK_WARM = "#3A2A28"; // lighter/warmer shade of ink, for "Let Agreed"
const CHARCOAL = "#4A3F3A"; // neutral warm charcoal, for "Commercial"

const files = {
  "business-card-front.svg": businessCardFront(),
  "business-card-back.svg": businessCardBack(),
  "letterhead.svg": letterhead(),
  "letterhead-continuation.svg": letterheadContinuation(),
  "compliment-slip.svg": complimentSlip(),
  "board-for-sale.svg": propertyBoard("For Sale", CLARET),
  "board-to-let.svg": propertyBoard("To Let", CLARET_DEEP),
  "board-sold.svg": propertyBoard("Sold", INK),
  "board-let-agreed.svg": propertyBoard("Let Agreed", INK_WARM),
  "board-commercial.svg": propertyBoard("Commercial", CHARCOAL),
};

for (const [name, content] of Object.entries(files)) {
  writeFileSync(`${dir}/${name}`, content, "utf8");
}
console.log(`Wrote ${Object.keys(files).length} stationery SVGs to ${dir}/`);
