// Makes the picture shown when someone shares a link to the site
// (Facebook, WhatsApp, LinkedIn, X…): 1200×630, from the owner-supplied
// emblem plus the name as live text (the supplied full logo has a share
// button baked over it — CLAUDE.md, 2026-10-20). Re-run when a clean logo
// export arrives:
//
//   node scripts/make-share-image.mjs
//
// Writes src/app/opengraph-image.png and src/app/twitter-image.png, which
// Next.js attaches to every page automatically.
import fs from "node:fs";
import sharp from "sharp";
const web = process.cwd();
const em = await sharp(`${web}/public/brand/times-estate-ltd-emblem@2x.webp`).metadata();
const W = 1200, H = 630;
const emW = 560, emH = Math.round(em.height * emW / em.width);
// The emblem file has stray dark pixels in its top corners; crop 2% off
// every edge before use.
const cut = (n) => Math.round(n * 0.02);
const emblem = await sharp(`${web}/public/brand/times-estate-ltd-emblem@2x.webp`)
  .extract({ left: cut(em.width), top: cut(em.height), width: em.width - 2 * cut(em.width), height: em.height - 2 * cut(em.height) })
  .resize(emW, emH)
  .toBuffer();
const top = 70;
const textY = top + emH + 70;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="#ffffff"/>
  <rect y="${H - 14}" width="100%" height="14" fill="#a8551a"/>
  <text x="${W / 2}" y="${textY}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="64" fill="#141414">TIMES <tspan fill="#a8551a">ESTATE LTD</tspan></text>
  <text x="${W / 2}" y="${textY + 56}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" letter-spacing="7" fill="#6b6259">LONDON PROPERTY EXPERTS</text>
  <text x="${W / 2}" y="${textY + 110}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#141414">Sales · Lettings · Management · Commercial</text>
</svg>`;
await sharp(Buffer.from(svg))
  .composite([{ input: emblem, top, left: Math.round((W - emW) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile(`${web}/src/app/opengraph-image.png`);
fs.copyFileSync(`${web}/src/app/opengraph-image.png`, `${web}/src/app/twitter-image.png`);
console.log("Wrote src/app/opengraph-image.png and twitter-image.png");
