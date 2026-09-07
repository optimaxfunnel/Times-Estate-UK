import { describe, expect, it } from "vitest";
import { sanitiseText, sanitiseFields } from "@/lib/security/sanitize";

describe("sanitiseText", () => {
  it("strips HTML tags from user input", () => {
    expect(sanitiseText("<script>alert('x')</script>hello")).toBe(
      "alert('x')hello",
    );
    expect(sanitiseText("<b>bold</b> text")).toBe("bold text");
  });

  it("keeps normal spaces and punctuation untouched", () => {
    expect(sanitiseText("hello world")).toBe("hello world");
    expect(sanitiseText("It's a nice flat, close to the station.")).toBe(
      "It's a nice flat, close to the station.",
    );
  });

  it("strips control characters such as a null byte", () => {
    const withNull = "hi" + String.fromCharCode(0) + "there";
    expect(sanitiseText(withNull)).toBe("hithere");
  });

  it("trims whitespace and enforces a maximum length", () => {
    expect(sanitiseText("  hi  ")).toBe("hi");
    expect(sanitiseText("a".repeat(10), 5)).toBe("aaaaa");
  });
});

describe("sanitiseFields", () => {
  it("sanitises every string field without touching the object shape", () => {
    const result = sanitiseFields({
      name: "<b>Jo</b>",
      age: 30 as unknown as string,
    });
    expect(result.name).toBe("Jo");
    expect(result.age).toBe(30);
  });
});
