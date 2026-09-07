import { describe, expect, it, beforeEach } from "vitest";
import { checkRateLimit, __resetRateLimitForTests } from "@/lib/security/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    __resetRateLimitForTests();
  });

  it("allows the first several submissions within the limit", async () => {
    for (let i = 0; i < 5; i++) {
      const result = await checkRateLimit("test-form");
      expect(result.allowed).toBe(true);
    }
  });

  it("blocks a submission once the limit is exceeded, with a retry time", async () => {
    for (let i = 0; i < 5; i++) {
      await checkRateLimit("test-form-2");
    }
    const blocked = await checkRateLimit("test-form-2");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("scopes the limit per form, so one form's limit doesn't block another", async () => {
    for (let i = 0; i < 5; i++) {
      await checkRateLimit("form-a");
    }
    const otherForm = await checkRateLimit("form-b");
    expect(otherForm.allowed).toBe(true);
  });
});
