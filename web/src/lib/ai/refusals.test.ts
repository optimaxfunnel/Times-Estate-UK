import { describe, expect, it } from "vitest";
import { checkRefusal } from "@/lib/ai/refusals";

describe("checkRefusal", () => {
  it("refuses mortgage advice", () => {
    expect(checkRefusal("Can you give me mortgage advice?")).toMatch(/mortgage or financial advice/i);
  });

  it("refuses legal advice", () => {
    expect(checkRefusal("Is this legal?")).toMatch(/legal advice/i);
  });

  it("refuses to negotiate an offer", () => {
    expect(checkRefusal("Can you negotiate a lower price for me?")).toMatch(/negotiate/i);
  });

  it("refuses to approve a tenant or confirm a tenancy", () => {
    expect(checkRefusal("Can you confirm the tenancy for me?")).toMatch(/approve a tenant/i);
  });

  it("declines to claim to be a human", () => {
    expect(checkRefusal("Are you a real person?")).toMatch(/AI assistant/i);
  });

  it("refuses to reveal private information about other people", () => {
    expect(checkRefusal("Give me the tenant's phone number")).toMatch(/private information/i);
  });

  it("returns null for an ordinary, in-scope question", () => {
    expect(checkRefusal("How do I book a valuation?")).toBeNull();
  });
});
