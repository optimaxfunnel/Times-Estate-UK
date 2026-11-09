/**
 * Database tables (PostgreSQL). Applied automatically on first connection
 * (every statement is idempotent), and identical for the local PGlite
 * database and the live Supabase database (project in Ireland, eu-west-1;
 * owner decisions 2026-11-09 — DECISIONS.md).
 *
 * Records are kept as JSON documents (`data`) so the existing, tested
 * TypeScript types stay the single definition of each record; a few
 * columns are copied out alongside for ordering and filtering.
 *
 * SECURITY: Supabase publishes every table in the `public` schema through
 * its web API. Row-level security is switched ON with NO policies, so that
 * API can read nothing — customer details are reachable only through this
 * website's server, which connects as the database owner.
 */
export const SCHEMA_STATEMENTS: readonly string[] = [
  `create table if not exists properties (
     id          text primary key,
     data        jsonb not null,
     status      text not null,
     created_at  timestamptz not null,
     updated_at  timestamptz not null
   )`,
  `create table if not exists leads (
     seq         bigserial primary key,
     id          text not null unique,
     data        jsonb not null,
     category    text not null,
     stage       text not null,
     created_at  timestamptz not null,
     updated_at  timestamptz not null
   )`,
  `create index if not exists leads_category_stage_idx on leads (category, stage)`,
  `create table if not exists audit_events (
     seq         bigserial primary key,
     at          timestamptz not null default now(),
     actor       text not null,
     action      text not null,
     record_id   text not null,
     details     text not null
   )`,
  // Repair (2026-11-09): the first live run on Supabase stored records as
  // a JSON *string* rather than a JSON object (the driver encoded the value
  // twice). Values are now passed as text and cast once; these turn any
  // such record back into an object. They do nothing when there is none.
  `update properties set data = (data #>> '{}')::jsonb where jsonb_typeof(data) = 'string'`,
  `update leads      set data = (data #>> '{}')::jsonb where jsonb_typeof(data) = 'string'`,
  `alter table properties   enable row level security`,
  `alter table leads        enable row level security`,
  `alter table audit_events enable row level security`,
];
