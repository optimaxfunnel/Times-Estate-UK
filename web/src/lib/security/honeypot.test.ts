import { describe, expect, it } from "vitest";
import { isHoneypotTriggered, HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";

describe("isHoneypotTriggered", () => {
  it("is false when the honeypot field is left blank (a real visitor)", () => {
    const fd = new FormData();
    fd.set(HONEYPOT_FIELD_NAME, "");
    expect(isHoneypotTriggered(fd)).toBe(false);
  });

  it("is false when the honeypot field is missing entirely", () => {
    const fd = new FormData();
    expect(isHoneypotTriggered(fd)).toBe(false);
  });

  it("is true when the honeypot field has been filled in (a bot)", () => {
    const fd = new FormData();
    fd.set(HONEYPOT_FIELD_NAME, "http://spam.example");
    expect(isHoneypotTriggered(fd)).toBe(true);
  });
});
