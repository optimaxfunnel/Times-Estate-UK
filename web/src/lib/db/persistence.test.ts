// @vitest-environment node
// Proves the launch blocker is fixed: enquiries, property edits and the
// activity log survive a restart (added 2026-11-09).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { __closeDbForTests, dbKind, getDb } from "@/lib/db/client";
import { createLead, getLeadById, listLeads } from "@/lib/leads/provider";
import { getAuditLog, recordAuditEvent } from "@/lib/auth/audit-log";
import { propertyProvider } from "@/lib/property/provider";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "te-db-test-"));

beforeAll(async () => {
  await __closeDbForTests();
  process.env.LOCAL_DB = "file";
  // A folder that does not exist yet: the client must create it (a real
  // defect found on 2026-11-09 by testing the running site).
  process.env.LOCAL_DB_DIR = path.join(dir, "not", "yet", "created");
});

afterAll(async () => {
  await __closeDbForTests();
  delete process.env.LOCAL_DB;
  delete process.env.LOCAL_DB_DIR;
  fs.rmSync(dir, { recursive: true, force: true });
});

describe("tests can never touch the live database", () => {
  it("ignores DATABASE_URL under the test runner", () => {
    const saved = process.env.DATABASE_URL;
    process.env.DATABASE_URL = "postgresql://user:pw@live.example.com:6543/postgres";
    try {
      expect(dbKind()).not.toBe("postgres");
    } finally {
      if (saved === undefined) delete process.env.DATABASE_URL;
      else process.env.DATABASE_URL = saved;
    }
  });
});

describe("data survives a restart", () => {
  it("keeps enquiries, property edits and the activity log after the database is closed and reopened", async () => {
    expect(dbKind()).toBe("pglite-file");

    const lead = await createLead({
      category: "sales_valuation",
      sourcePage: "/sell",
      contactName: "Restart Test",
      contactEmail: "restart@example.com",
      contactPhone: "020 7946 0002",
      detail: "Survives a restart?",
      consentGiven: true,
    });
    await recordAuditEvent({ actor: "manager", action: "update", propertyId: "p-x", details: "before restart" });
    await propertyProvider.update("demo-res-sale-1", { summary: "Edited before the restart." }, "manager");

    await __closeDbForTests(); // the "server" stops

    expect(await getLeadById(lead.id)).toMatchObject({ contactName: "Restart Test", stage: "new" });
    expect((await listLeads()).map((l) => l.id)).toContain(lead.id);
    expect((await getAuditLog()).some((e) => e.details === "before restart")).toBe(true);
    expect((await propertyProvider.getById("demo-res-sale-1"))?.summary).toBe("Edited before the restart.");
  });

  it("stores records as structured JSON objects, not as text", async () => {
    const db = await getDb();
    const rows = await db.query<{ t: string; k: string }>(
      "select 'leads' as t, jsonb_typeof(data) as k from leads union all select 'properties', jsonb_typeof(data) from properties",
    );
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) expect(r.k).toBe("object");
  });

  it("repairs a record that was stored as text", async () => {
    const db = await getDb();
    await db.query("insert into leads (id, data, category, stage, created_at, updated_at) values ('text-lead', to_jsonb($1::text), 'general_enquiry', 'new', now(), now())", [JSON.stringify({ id: "text-lead", notes: [] })]);
    await __closeDbForTests(); // repair runs when the database is next opened
    const fixed = await (await getDb()).query<{ k: string }>("select jsonb_typeof(data) as k from leads where id = 'text-lead'");
    expect(fixed[0].k).toBe("object");
  });

  it("loads the sample listings only once, not again on every start", async () => {
    await __closeDbForTests();
    const db = await getDb();
    const rows = await db.query<{ n: string | number }>("select count(*) as n from properties");
    const before = Number(rows[0].n);
    await propertyProvider.list({});
    const after = Number((await db.query<{ n: string | number }>("select count(*) as n from properties"))[0].n);
    expect(after).toBe(before);
  });

  it("switches row-level security on for every table, so Supabase's public API can read nothing", async () => {
    const db = await getDb();
    const rows = await db.query<{ relname: string; relrowsecurity: boolean }>(
      "select relname, relrowsecurity from pg_class where relname in ('leads','properties','audit_events') order by relname",
    );
    expect(rows).toEqual([
      { relname: "audit_events", relrowsecurity: true },
      { relname: "leads", relrowsecurity: true },
      { relname: "properties", relrowsecurity: true },
    ]);
  });
});
