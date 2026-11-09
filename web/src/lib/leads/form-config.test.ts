import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  REQUIRED_FIELDS_BY_CATEGORY,
  parseLeadCategory,
  parseSourcePage,
} from "@/lib/leads/form-config";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }),
}));

const SRC = join(__dirname, "..", "..");

function filesUnder(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return filesUnder(path);
    return /\.tsx?$/.test(name) && !/\.test\./.test(name) ? [path] : [];
  });
}

/** The required fields a page declares for each <LeadForm category="…">. */
function requiredFieldsOnPages(): Record<string, string[]> {
  const found: Record<string, string[]> = {};
  for (const file of filesUnder(join(SRC, "app"))) {
    const source = readFileSync(file, "utf8");
    // Shared field lists defined in the file (e.g. register's budgetFields).
    const sharedRequired = [
      ...source.matchAll(/name:\s*"([^"]+)",[^}]*?required:\s*true/g),
    ].map((m) => m[1]);
    for (const m of source.matchAll(/<LeadForm([\s\S]*?)\/>/g)) {
      const category = m[1].match(/category="([^"]+)"/)?.[1];
      if (!category) continue;
      const inline = [
        ...m[1].matchAll(/name:\s*"([^"]+)",[^}]*?required:\s*true/g),
      ].map((x) => x[1]);
      found[category] = /fields=\{\s*\[/.test(m[1]) ? inline : sharedRequired;
    }
  }
  return found;
}

describe("lead form rules live on the server", () => {
  it("match the required fields every page actually shows", () => {
    const pages = requiredFieldsOnPages();
    expect(Object.keys(pages).sort()).toEqual(
      Object.keys(REQUIRED_FIELDS_BY_CATEGORY).sort(),
    );
    for (const [category, fields] of Object.entries(pages)) {
      expect(
        [
          ...(REQUIRED_FIELDS_BY_CATEGORY as Record<string, string[]>)[
            category
          ],
        ].sort(),
        category,
      ).toEqual([...fields].sort());
    }
  });

  it("refuses unknown categories and repair reports (they have their own checks)", () => {
    expect(parseLeadCategory("rental_valuation")).toBe("rental_valuation");
    expect(parseLeadCategory("repair_report")).toBeNull();
    expect(parseLeadCategory("admin")).toBeNull();
    expect(parseLeadCategory("__proto__")).toBeNull();
    expect(parseLeadCategory(null)).toBeNull();
  });

  it("only accepts a same-site path as the source page", () => {
    expect(parseSourcePage("/property/demo-res-let-1")).toBe(
      "/property/demo-res-let-1",
    );
    expect(parseSourcePage("https://evil.example")).toBe("/");
    expect(parseSourcePage("//evil.example")).toBe("/");
    expect(parseSourcePage("/x<script>")).toBe("/");
  });
});

describe("server-hang regression guard", () => {
  it("no client component binds arguments into a server action", () => {
    // A bound action is re-created on every render; React's server
    // renderer then waited on each new binding forever when a form was
    // posted without JavaScript (TEST_REPORT.md, Day 7).
    const offenders = filesUnder(join(SRC, "components"))
      .concat(filesUnder(join(SRC, "app")))
      .filter((f) =>
        /\buseActionState\(\s*\w+\.bind\(/.test(readFileSync(f, "utf8")),
      );
    expect(offenders).toEqual([]);
  });
});

describe("submitLeadForm", () => {
  const form = (fields: Record<string, string>) => {
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) fd.append(k, v);
    return fd;
  };
  const valid = {
    fullName: "Test Person",
    email: "test@example.com",
    phone: "020 7946 0000",
    privacyConsent: "on",
  };

  it("rejects a post that names no valid category", async () => {
    const { submitLeadForm } = await import("@/lib/leads/actions");
    const r = await submitLeadForm(
      { status: "idle" },
      form({ ...valid, leadCategory: "repair_report" }),
    );
    expect(r.status).toBe("error");
  });

  it("enforces the server's required fields, not the visitor's", async () => {
    const { submitLeadForm } = await import("@/lib/leads/actions");
    const r = await submitLeadForm(
      { status: "idle" },
      form({ ...valid, leadCategory: "rental_valuation", sourcePage: "/let" }),
    );
    expect(r.status).toBe("error");
    expect(Object.keys(r.fieldErrors ?? {})).toEqual(
      expect.arrayContaining(["propertyAddress", "currentlyTenanted"]),
    );
  });

  it("creates the lead when everything is present, without storing routing fields", async () => {
    const { submitLeadForm } = await import("@/lib/leads/actions");
    const { getLeadById } = await import("@/lib/leads/provider");
    const r = await submitLeadForm(
      { status: "idle" },
      form({
        ...valid,
        leadCategory: "rental_valuation",
        sourcePage: "/let",
        propertyAddress: "1 Test Street",
        currentlyTenanted: "no",
      }),
    );
    expect(r.status).toBe("success");
    const lead = r.reference ? getLeadById(r.reference) : undefined;
    expect(lead?.category).toBe("rental_valuation");
    expect(lead?.sourcePage).toBe("/let");
    expect(lead?.extra).not.toHaveProperty("leadCategory");
    expect(lead?.extra).not.toHaveProperty("sourcePage");
  });
});
