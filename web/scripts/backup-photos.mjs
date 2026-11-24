// Copies every property photo and floor plan from Supabase Storage to
// this computer. Supabase's daily database backups do NOT include
// Storage files, so run this regularly (weekly is plenty).
//
//   node --env-file=.env scripts/backup-photos.mjs [folder]
//
// Default folder: ../backups/property-photos (kept out of git). Files
// already copied are skipped, so each run only downloads what's new.
// Only reads; never changes or deletes anything in Supabase.
import fs from "node:fs";
import path from "node:path";
import postgres from "postgres";

const { DATABASE_URL, NEXT_PUBLIC_SUPABASE_URL } = process.env;
if (!DATABASE_URL || !NEXT_PUBLIC_SUPABASE_URL) {
  console.error("DATABASE_URL and NEXT_PUBLIC_SUPABASE_URL must be set (run with --env-file=.env).");
  process.exit(1);
}
const target = path.resolve(process.argv[2] ?? path.join("..", "backups", "property-photos"));
const KEY = /^[a-z0-9-]{3,60}\/[a-f0-9-]{36}-(640|1200|plan)\.webp$/;

const sql = postgres(DATABASE_URL, { prepare: false, ssl: "require", max: 1, onnotice: () => {} });
let copied = 0;
let skipped = 0;
let failed = 0;
try {
  const rows = await sql`select name from storage.objects where bucket_id = 'property-photos' order by name`;
  for (const { name } of rows) {
    if (!KEY.test(name)) {
      console.warn("skipping unexpected file name:", name);
      failed++;
      continue;
    }
    const file = path.join(target, name);
    if (fs.existsSync(file)) {
      skipped++;
      continue;
    }
    const res = await fetch(`${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-photos/${name}`);
    if (!res.ok) {
      console.warn("could not download", name, res.status);
      failed++;
      continue;
    }
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    copied++;
  }
  console.log(`Backup folder: ${target}`);
  console.log(`${rows.length} file(s) in storage: ${copied} copied, ${skipped} already backed up, ${failed} problem(s).`);
  if (failed) process.exitCode = 1;
} catch (e) {
  console.error("Backup failed:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
