import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { tryDb } from "@/lib/db/safe";

/**
 * Health check for uptime monitoring (DEPLOYMENT.md, monitoring).
 *
 * 200 {"status":"ok"} when the site and its database both answer;
 * 503 {"status":"degraded"} when the database cannot be reached (for
 * example the Supabase project has paused), so a monitor can alert staff
 * before customers notice. Reveals nothing else: no versions, hosts or
 * error text.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const db = await tryDb("health check", async () => {
    const conn = await getDb();
    await conn.query("select 1");
  });
  const ok = db.ok;
  return NextResponse.json(
    { status: ok ? "ok" : "degraded", database: ok ? "ok" : "unavailable" },
    {
      status: ok ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
