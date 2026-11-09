import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssistantWidget } from "@/components/ai/AssistantWidget";
import { askAssistant } from "@/lib/ai/actions";

vi.mock("@/lib/ai/actions", () => ({ askAssistant: vi.fn() }));

describe("AssistantWidget when the service is unavailable", () => {
  it("tells the visitor and points to a person instead of hanging", async () => {
    vi.mocked(askAssistant).mockRejectedValueOnce(new Error("network down"));
    const user = userEvent.setup();
    render(<AssistantWidget />);
    await user.click(screen.getByRole("button", { name: "Ask the assistant" }));
    await user.type(screen.getByRole("textbox"), "Do you have flats to rent?");
    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(
      await screen.findByText(/couldn't reach the assistant/),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact Us" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("button", { name: "Send" })).toBeEnabled();
  });
});

describe("AssistantWidget keyboard support", () => {
  it("moves focus into the panel when opened", async () => {
    const user = userEvent.setup();
    render(<AssistantWidget />);
    await user.click(screen.getByRole("button", { name: "Ask the assistant" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(document.activeElement?.tagName).toBe("INPUT");
  });

  it("returns focus to the open button after Escape", async () => {
    const user = userEvent.setup();
    render(<AssistantWidget />);
    await user.click(screen.getByRole("button", { name: "Ask the assistant" }));
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(
      screen.getByRole("button", { name: "Ask the assistant" }),
    ).toHaveFocus();
  });
});
