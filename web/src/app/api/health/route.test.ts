// Health check (2026-11-24): 200 when the database answers, 503 when not.
import { afterEach, describe, expect, it, vi } from "vitest";
import * as client from "@/lib/db/client";
import { GET } from "@/app/api/health/route";

afterEach(() => vi.restoreAllMocks());

describe("/api/health", () => {
  it("reports ok when the database answers", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok", database: "ok" });
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  it("reports degraded, with no error details, when the database is down", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(client, "getDb").mockRejectedValue(
      Object.assign(new Error("getaddrinfo ENOTFOUND secret-host"), { code: "ENOTFOUND" }),
    );
    const res = await GET();
    expect(res.status).toBe(503);
    const body = await res.text();
    expect(JSON.parse(body)).toEqual({ status: "degraded", database: "unavailable" });
    expect(body).not.toContain("secret-host");
  });
});
