import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { FileUploadField } from "@/components/forms/FileUploadField";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.9" }),
}));

describe("FileUploadField", () => {
  it("shows the server's reason when files were rejected", () => {
    render(
      <FileUploadField
        name="photos"
        label="Photos"
        error="photo0.jpg is not a supported file type."
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "not a supported file type",
    );
    const input = screen.getByLabelText("Photos");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")).toMatch(/error/);
  });

  it("shows no error when there is none", () => {
    render(<FileUploadField name="photos" label="Photos" />);
    expect(screen.queryByRole("alert")).toBeNull();
  });
});

describe("property alert logging", () => {
  it("never writes the visitor's email address to the server log", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const { submitPropertyAlert } = await import("@/lib/actions");
    const fd = new FormData();
    fd.append("email", "private.person@example.com");
    fd.append("location", "Tooting");
    fd.append("marketingConsent", "on");
    const r = await submitPropertyAlert({ status: "idle" }, fd);
    expect(r.status).toBe("success");
    expect(JSON.stringify(log.mock.calls)).not.toContain("private.person");
    log.mockRestore();
  });
});
