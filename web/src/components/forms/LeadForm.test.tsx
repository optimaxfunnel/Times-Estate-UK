import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
// The server action is never called in these tests — the browser-side
// check stops an incomplete form before it is sent.
vi.mock("@/lib/leads/actions", () => ({ submitLeadForm: vi.fn() }));

import { LeadForm } from "@/components/forms/LeadForm";

function renderForm() {
  return render(
    <LeadForm
      category="landlord_vendor_enquiry"
      sourcePage="/landlords"
      fields={[
        { type: "textarea", name: "message", label: "Message", required: true },
      ]}
    />,
  );
}

describe("LeadForm", () => {
  it("labels every field as required or optional in words", () => {
    renderForm();
    expect(
      screen.getByLabelText(/Full name.*\(required\)/),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Message.*\(required\)/)).toBeInTheDocument();
  });

  it("uses autocomplete hints for name, email and phone", () => {
    renderForm();
    expect(screen.getByLabelText(/Full name/)).toHaveAttribute(
      "autocomplete",
      "name",
    );
    expect(screen.getByLabelText(/Email address/)).toHaveAttribute(
      "autocomplete",
      "email",
    );
    expect(screen.getByLabelText(/Phone number/)).toHaveAttribute(
      "autocomplete",
      "tel",
    );
  });

  it("shows a linked error summary instead of sending an incomplete form", () => {
    const { container } = renderForm();
    fireEvent.change(screen.getByLabelText(/Email address/), {
      target: { value: "not-an-email" },
    });
    fireEvent.submit(container.querySelector("form")!);
    const summary = screen.getByRole("alert");
    expect(summary).toHaveTextContent(/Full name/);
    expect(summary).toHaveTextContent(/valid email address/);
    expect(summary).toHaveTextContent(/Privacy/);
    expect(summary.querySelector('a[href="#fullName"]')).not.toBeNull();
    expect(screen.getByLabelText(/Full name/)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("states how the details will be used before consent", () => {
    renderForm();
    expect(
      screen.getByText(/only to respond to this request/),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
});
