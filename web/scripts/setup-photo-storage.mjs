// One-off setup for property photo storage in Supabase (owner approval,
// 2026-11-24: "Yes, use Supabase Storage"). Safe to run again: every step
// is "create if missing" or "replace".
//
//   node --env-file=.env scripts/setup-photo-storage.mjs
//
// Creates the "property-photos" bucket and the rules that decide who may
// add or remove files in it:
//  - Reading: public. Photos are only ever shown through the website's own
//    /media address, and file names are random, so a draft's photos cannot
//    be guessed.
//  - Adding, replacing, removing: only a signed-in staff member who has
//    passed two-step verification (session "aal2") AND has the role
//    Administrator, Manager or Property Editor in staff_roles.
//  - Only WebP images (the website converts every photo) and PDF
//    brochures (checked by the website first), up to 10 MB.
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set (run with --env-file=.env).");
  process.exit(1);
}
const sql = postgres(url, { prepare: false, ssl: "require", max: 1, onnotice: () => {} });

const steps = [
  [
    "bucket",
    `insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
     values ('property-photos', 'property-photos', true, 10485760, array['image/webp', 'application/pdf'])
     on conflict (id) do update set public = true, file_size_limit = 10485760,
       allowed_mime_types = array['image/webp', 'application/pdf']`,
  ],
  [
    "staff check",
    // SECURITY DEFINER so the rule can read staff_roles, which is closed to
    // the public API by row-level security. It reveals only true/false
    // about the person making the request.
    `create or replace function public.is_property_photo_staff()
     returns boolean language sql stable security definer
     set search_path = public
     as $$
       select coalesce((auth.jwt() ->> 'aal') = 'aal2', false)
          and exists (
            select 1 from public.staff_roles s
            where s.email = lower(auth.jwt() ->> 'email')
              and s.role in ('administrator', 'manager', 'property_editor')
          )
     $$`,
  ],
  ["lock function", `revoke all on function public.is_property_photo_staff() from public, anon`],
  ["allow staff", `grant execute on function public.is_property_photo_staff() to authenticated`],
  ...["insert", "update", "delete", "select"].map((cmd) => [
    `${cmd} rule`,
    `do $$ begin
       drop policy if exists "property photos: staff ${cmd}" on storage.objects;
       create policy "property photos: staff ${cmd}" on storage.objects
         for ${cmd} to authenticated
         ${cmd === "insert" ? "" : "using (bucket_id = 'property-photos' and public.is_property_photo_staff())"}
         ${cmd === "insert" || cmd === "update" ? "with check (bucket_id = 'property-photos' and public.is_property_photo_staff())" : ""};
     end $$`,
  ]),
];

try {
  for (const [name, statement] of steps) {
    await sql.unsafe(statement);
    console.log("ok", name);
  }
  const [b] = await sql`select id, public, file_size_limit from storage.buckets where id = 'property-photos'`;
  const p = await sql`select policyname from pg_policies where schemaname = 'storage' and policyname like 'property photos:%' order by 1`;
  console.log("bucket:", b);
  console.log("rules:", p.map((r) => r.policyname).join(" | "));
} catch (e) {
  console.error("FAILED:", e.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
