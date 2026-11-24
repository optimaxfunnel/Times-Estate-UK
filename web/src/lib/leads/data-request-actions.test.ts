// Data requests (2026-11-24): find, export and erase one person's
// enquiries — senior roles only, scoped to that email, audited without
// personal details.
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Role } from "@/lib/auth/roles";

let role: Role = "manager";
vi.mock("@/lib/auth/session", () => ({ getCurrentRole: async () => role }));
vi.mock("next/cache", () => ({ revalidatePath: () => {} }));

import { dataRequestAction } from "@/lib/leads/data-request-actions";
import { __resetLeadsForTests, createLead, getLeadById } from "@/lib/leads/provider";
import { getAuditLog } from "@/lib/auth/audit-log";

const idle = { status: "idle" as const };
const form = (f: Record<string, string>) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(f)) fd.set(k, v);
  return fd;
};
const lead = (email: string) =>
  createLead({
    category: "general_enquiry",
    sourcePage: "/contact",
    contactName: "Pat Example",
    contactEmail: email,
    contactPhone: "020 7946 0000",
    detail: "Test enquiry",
    consentGiven: true,
  });

beforeEach(async () => {
  await __resetLeadsForTests();
  role = "manager";
});

describe("data requests", () => {
  it("finds every enquiry from one email, case-insensitively, with a full copy", async () => {
    await lead("pat@example.com");
    await lead("PAT@example.com");
    await lead("someone.else@example.com");
    const r = await dataRequestAction(idle, form({ email: "Pat@Example.com", reference: "DR-2026-001" }));
    expect(r.status).toBe("success");
    expect(r.leads).toHaveLength(2);
    const copy = JSON.parse(r.exportJson!);
    expect(copy.records).toHaveLength(2);
    expect(copy.records[0].contactName).toBe("Pat Example");
  });

  it("erases one enquiry and logs the reference, not the person", async () => {
    const a = await lead("pat@example.com");
    const r = await dataRequestAction(
      idle,
      form({ intent: "erase", id: a.id, email: "pat@example.com", reference: "DR-2026-002", confirm: "on" }),
    );
    expect(r.status).toBe("success");
    expect(await getLeadById(a.id)).toBeNull();
    const log = (await getAuditLog()).map((e) => e.details).join("\n");
    expect(log).toContain("DR-2026-002");
    expect(log).not.toContain("pat@example.com");
    expect(log).not.toContain("Pat Example");
  });

  it("will not erase without the confirmation tick", async () => {
    const a = await lead("pat@example.com");
    const r = await dataRequestAction(
      idle,
      form({ intent: "erase", id: a.id, email: "pat@example.com", reference: "DR-2026-003" }),
    );
    expect(r.status).toBe("error");
    expect(await getLeadById(a.id)).not.toBeNull();
  });

  it("will not erase an enquiry that belongs to a different email", async () => {
    const other = await lead("other@example.com");
    const r = await dataRequestAction(
      idle,
      form({ intent: "erase", id: other.id, email: "pat@example.com", reference: "DR-2026-004", confirm: "on" }),
    );
    expect(r.status).toBe("error");
    expect(await getLeadById(other.id)).not.toBeNull();
  });

  it("refuses roles without permission", async () => {
    const a = await lead("pat@example.com");
    for (const r of ["property_editor", "content_editor", "enquiry_viewer"] as Role[]) {
      role = r;
      expect((await dataRequestAction(idle, form({ email: "pat@example.com", reference: "DR-1" }))).status).toBe("error");
      expect(
        (await dataRequestAction(idle, form({ intent: "erase", id: a.id, email: "pat@example.com", reference: "DR-1", confirm: "on" }))).status,
      ).toBe("error");
    }
    expect(await getLeadById(a.id)).not.toBeNull();
  });

  it("rejects a reference that looks like a name with an email", async () => {
    const r = await dataRequestAction(idle, form({ email: "pat@example.com", reference: "pat@example.com" }));
    expect(r.status).toBe("error");
  });
});
