/**
 * WCAG 2.2 contrast check for every token pairing the design system uses.
 * Run: node scripts/check-contrast.mjs  — exits 1 if any pairing fails.
 * Text needs 4.5:1 (3:1 if large); UI boundaries and focus rings need 3:1.
 */
const lum = (hex) => {
  const c = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const T = {
  ink: "#141414",
  white: "#ffffff",
  accent: "#a8551a",
  accentDark: "#8a4515",
  vivid: "#d9772e",
  tint: "#fbebdd",
  secondary: "#6b6259",
  borderStrong: "#8c8279",
  warning: "#8a6008",
  warningText: "#7a5a08",
  success: "#2f6b4f",
  danger: "#a3311f",
  focus: "#1f4b8c",
};

const pairs = [
  ["Body text", T.ink, T.white, 4.5],
  ["Secondary text", T.secondary, T.white, 4.5],
  ["Secondary text on tint", T.secondary, T.tint, 4.5],
  ["Link / accent text", T.accent, T.white, 4.5],
  ["Accent text on tint", T.accent, T.tint, 4.5],
  ["Primary button label", T.white, T.accent, 4.5],
  ["Primary button hover", T.white, T.accentDark, 4.5],
  ["Vivid accent on ink", T.vivid, T.ink, 4.5],
  ["White text on ink", T.white, T.ink, 4.5],
  ["Warning badge label", T.white, T.warning, 4.5],
  ["Warning text", T.warningText, T.white, 4.5],
  ["Success text", T.success, T.white, 4.5],
  ["Danger text / error", T.danger, T.white, 4.5],
  ["Form control border", T.borderStrong, T.white, 3],
  ["Focus ring on white", T.focus, T.white, 3],
  ["Focus ring on tint", T.focus, T.tint, 3],
  ["Focus halo on ink (dark bands)", T.white, T.ink, 3],
];

let failed = 0;
for (const [name, fg, bg, min] of pairs) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${r.toFixed(2)}:1  (min ${min})  ${name}`,
  );
}
process.exit(failed ? 1 : 0);
