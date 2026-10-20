/**
 * Builds the usable logo assets from the owner-supplied raster logo
 * (2026-10-20) — see LOGO_ASSET_REGISTER.md "CURRENT" and DECISIONS.md.
 *
 * The supplied file is a 1206×877 JPEG screenshot of the logo inside a
 * viewer: a black frame, a white rounded card, and a circular "share"
 * button baked into the bottom-right corner, sitting on top of the "D"
 * in "LTD". That overlay cannot be removed without damaging the
 * letterform, so this script only uses the part of the artwork that is
 * clean — the clock-and-skyline EMBLEM above the wordmark — and the
 * live site renders the "TIMES ESTATE LTD / LONDON PROPERTY EXPERTS"
 * wordmark as real text (see web/src/components/brand/BrandLockup.tsx),
 * which is also sharper at every size than a raster of the text would
 * be.
 *
 * Run from brand/:  node build-supplied-logo.mjs   (deterministic)
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.resolve("logo-supplied");
const ORIGINAL = path.join(OUT, "times-estate-ltd-supplied-original.jpg");
const WEB_PUBLIC = path.resolve("../web/public/brand");
const WEB_APP = path.resolve("../web/src/app");

fs.mkdirSync(path.join(OUT, "png"), { recursive: true });

if (!fs.existsSync(ORIGINAL)) {
  throw new Error(
    `Missing ${ORIGINAL} — copy the owner-supplied JPEG there first (never edit it in place).`,
  );
}

// 1. The emblem region, measured from the original: inside the black
//    frame (~30px), everything above the wordmark (which starts at y≈640;
//    the emblem's base swoosh ends at y≈623).
const EMBLEM_REGION = { left: 30, top: 30, width: 1146, height: 595 };

const emblemOpaque = await sharp(ORIGINAL)
  .extract(EMBLEM_REGION)
  .trim({ background: "#ffffff", threshold: 24 })
  .png()
  .toBuffer();

// 2. Knock the (pure white, 254–255) card background out to transparency.
//    JPEG edges aren't perfectly clean, so alpha is feathered between
//    min-channel 232 (opaque) and 248 (fully transparent). The artwork's
//    own lightest interior tones — the warm peach glow inside the clock —
//    keep a blue channel well under 232, so they are untouched.
const { data, info } = await sharp(emblemOpaque)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const min = Math.min(data[i], data[i + 1], data[i + 2]);
  if (min >= 248) data[i + 3] = 0;
  else if (min > 232) data[i + 3] = Math.round(((248 - min) / 16) * 255);
}

const emblemTransparent = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toBuffer();

const emblemMeta = await sharp(emblemTransparent).metadata();
console.log(`emblem: ${emblemMeta.width}×${emblemMeta.height}`);

fs.writeFileSync(
  path.join(OUT, "png", "te-emblem-transparent.png"),
  emblemTransparent,
);
fs.writeFileSync(path.join(OUT, "png", "te-emblem-on-white.png"), emblemOpaque);

// 3. Web copies. The header shows the emblem at 48–56px tall (≈110px
//    wide), so 400px/800px-wide renders cover 1× and 2×+ screens without
//    shipping the full 1.1-megapixel master. WebP carries the transparency
//    at a fraction of the PNG size (~24 KB vs ~136 KB at 400px); the PNG
//    is the <picture> fallback for anything that can't decode WebP.
for (const [width, suffix] of [
  [400, ""],
  [800, "@2x"],
]) {
  await sharp(emblemTransparent)
    .resize({ width })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(path.join(WEB_PUBLIC, `times-estate-ltd-emblem${suffix}.webp`));
}
await sharp(emblemTransparent)
  .resize({ width: 400 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(WEB_PUBLIC, "times-estate-ltd-emblem.png"));

// 4. Favicon / app-icon tiles: the emblem centred on a white, rounded
//    tile (the artwork's own ground), at the standard sizes. The site's
//    colour tokens are untouched by this — white is the page background.
async function tile(size, radiusFraction, pad) {
  const inner = Math.round(size * (1 - pad * 2));
  const emblem = await sharp(emblemTransparent)
    .resize({ width: inner, height: inner, fit: "inside" })
    .png()
    .toBuffer();
  const em = await sharp(emblem).metadata();
  const r = Math.round(size * radiusFraction);
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#fff"/></svg>`,
  );
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      { input: mask, blend: "dest-in" },
      {
        input: emblem,
        left: Math.round((size - em.width) / 2),
        top: Math.round((size - em.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

for (const size of [16, 32, 48, 180, 192, 512]) {
  const buf = await tile(size, size <= 48 ? 0.18 : 0.2, 0.08);
  fs.writeFileSync(path.join(OUT, "png", `te-emblem-tile-${size}.png`), buf);
}

// 5. The live site's single favicon/app-icon slots (overwritten — a
//    favicon is one canonical slot; previous identities' icon tiles stay
//    in their own brand/ folders).
fs.copyFileSync(
  path.join(OUT, "png", "te-emblem-tile-192.png"),
  path.join(WEB_APP, "icon.png"),
);
fs.copyFileSync(
  path.join(OUT, "png", "te-emblem-tile-180.png"),
  path.join(WEB_APP, "apple-icon.png"),
);

console.log("done:", fs.readdirSync(path.join(OUT, "png")).join(", "));
