// Rewritten 2026-11-09 after the original test files were lost (RECOVERY_REPORT_2026-11-09.md).
import { describe, expect, it } from "vitest";
import { sanitiseFields, sanitiseText } from "@/lib/security/sanitize";

describe("input cleaning", () => {
  it("strips script and HTML tags", () => {
    expect(sanitiseText('<script>alert("x")</script>Hello')).toBe('alert("x")Hello');
    expect(sanitiseText("<img src=x onerror=alert(1)>Leak")).toBe("Leak");
    expect(sanitiseText("<b>bold</b> text")).toBe("bold text");
  });

  it("strips control characters but keeps line breaks and tabs", () => {
    expect(sanitiseText("a\u0000b\u0007c\u007f")).toBe("abc");
    expect(sanitiseText("line one\nline two\tend")).toBe("line one\nline two\tend");
  });

  it("trims and caps length", () => {
    expect(sanitiseText("   hi   ")).toBe("hi");
    expect(sanitiseText("x".repeat(5000))).toHaveLength(4000);
    expect(sanitiseText("abcdef", 3)).toBe("abc");
  });

  it("keeps ordinary text, including symbols people type", () => {
    const text = "Flat 2, 12 O'Brien Rd — £1,500 pcm & bills? 50% off!";
    expect(sanitiseText(text)).toBe(text);
  });

  it("cleans every string field and leaves other values alone", () => {
    const out = sanitiseFields({ name: " <i>Ann</i> ", count: 3, ok: true });
    expect(out).toEqual({ name: "Ann", count: 3, ok: true });
  });
});
