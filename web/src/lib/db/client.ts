import fs from "node:fs";
import path from "node:path";
import { SCHEMA_STATEMENTS } from "@/lib/db/schema";

/**
 * The website's own folder (`web/`), however the server was started:
 * `next start` may run from `web/` itself or from the folder above it.
 */
function appDir(): string {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, "next.config.ts"))) return cwd;
  if (fs.existsSync(path.join(cwd, "web", "next.config.ts"))) return path.join(cwd, "web");
  return cwd;
}

/**
 * The one database connection for the server.
 *
 *  - DATABASE_URL set  → the live PostgreSQL database (Supabase, project in
 *    Ireland/eu-west-1; owner decisions 2026-11-09). Connection details live only in the
 *    host's settings or the git-ignored `web/.env` — never in code.
 *  - DATABASE_URL unset → PGlite, a full PostgreSQL that runs inside this
 *    app with no account: saved under `web/.data/` when running the site
 *    locally, and in memory for tests and during `next build` (several
 *    build workers must not open the same folder at once).
 *
 * Both speak the same SQL, so nothing else in the site changes between them.
 */
export interface Db {
  query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
  close(): Promise<void>;
}

export type DbKind = "postgres" | "pglite-file" | "pglite-memory";

function localKind(): DbKind {
  if (process.env.LOCAL_DB === "file") return "pglite-file";
  const inTest = !!process.env.VITEST;
  const inBuild = process.env.NEXT_PHASE === "phase-production-build";
  return inTest || inBuild || process.env.LOCAL_DB === "memory"
    ? "pglite-memory"
    : "pglite-file";
}

/**
 * SAFETY: automated tests empty tables between runs, so they must never
 * reach the live database. Under the test runner DATABASE_URL is ignored.
 */
function liveUrl(): string | undefined {
  return process.env.VITEST ? undefined : process.env.DATABASE_URL || undefined;
}

export function dbKind(): DbKind {
  return liveUrl() ? "postgres" : localKind();
}

async function open(): Promise<Db> {
  const url = liveUrl();
  if (url) {
    const { default: postgres } = await import("postgres");
    const isLocalHost = /@(localhost|127\.0\.0\.1)[:/]/.test(url);
    const sql = postgres(url, {
      // Supabase's connection pooler (transaction mode) does not support
      // prepared statements.
      prepare: false,
      ssl: isLocalHost ? false : "require",
      max: 5,
      idle_timeout: 20,
      onnotice: () => {},
    });
    return {
      query: async <T,>(text: string, params: unknown[] = []) =>
        (await sql.unsafe(text, params as never[])) as unknown as T[],
      close: () => sql.end(),
    };
  }

  const { PGlite } = await import("@electric-sql/pglite");
  let pg;
  if (localKind() === "pglite-memory") {
    pg = new PGlite();
  } else {
    const dir = process.env.LOCAL_DB_DIR ?? path.join(appDir(), ".data", "pglite");
    fs.mkdirSync(dir, { recursive: true }); // PGlite does not create parent folders
    pg = new PGlite(dir);
  }
  return {
    query: async <T,>(text: string, params: unknown[] = []) =>
      (await pg.query<T>(text, params)).rows,
    close: () => pg.close(),
  };
}

async function applySchema(db: Db): Promise<void> {
  for (const statement of SCHEMA_STATEMENTS) await db.query(statement);
}

const GLOBAL_KEY = Symbol.for("times-estate.db");
type Holder = { [GLOBAL_KEY]?: Promise<Db> };

/**
 * Shared, lazily opened connection. Kept on `globalThis` so development
 * hot-reloads reuse one connection instead of opening a new one each time.
 */
export function getDb(): Promise<Db> {
  const holder = globalThis as Holder;
  if (!holder[GLOBAL_KEY]) {
    holder[GLOBAL_KEY] = (async () => {
      const db = await open();
      await applySchema(db);
      return db;
    })().catch((error) => {
      delete holder[GLOBAL_KEY];
      throw error;
    });
  }
  return holder[GLOBAL_KEY]!;
}

/** Tests only: close the connection, as if the server had stopped. */
export async function __closeDbForTests(): Promise<void> {
  const holder = globalThis as Holder;
  const pending = holder[GLOBAL_KEY];
  delete holder[GLOBAL_KEY];
  if (pending) await (await pending).close();
}

/** Tests only: empty every table. */
export async function __truncateAllForTests(): Promise<void> {
  if (dbKind() === "postgres") {
    throw new Error("Refusing to empty a live database: tests only run against a local one.");
  }
  const db = await getDb();
  await db.query("truncate table leads, audit_events, properties restart identity");
}
