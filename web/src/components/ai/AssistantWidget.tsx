"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { askAssistant } from "@/lib/ai/actions";
import { AI_GREETING } from "@/lib/ai/demo-provider";
import type { AIMessage, AISource } from "@/lib/ai/provider";
import { Button } from "@/components/ui/Button";

interface DisplayMessage {
  role: "user" | "assistant";
  content: string;
  sources?: AISource[];
}

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([
    { role: "assistant", content: AI_GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isPending, setIsPending] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Same keyboard/focus support as the mobile nav menu: Escape closes
  // the panel and returns focus to the button that opened it, and
  // opening it moves focus to the question field.
  // The open button is unmounted while the panel shows, so focus is
  // returned once it has re-rendered, not at the moment of closing.
  const returnFocus = useRef(false);
  function close() {
    returnFocus.current = true;
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      if (returnFocus.current) openButtonRef.current?.focus();
      returnFocus.current = false;
      return;
    }
    inputRef.current?.focus();
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || isPending) return;

    const history: AIMessage[] = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setIsPending(true);

    // If the request itself fails (connection lost, server restarting),
    // say so and point to a person, rather than leaving "sending" forever.
    const response = await askAssistant(history, question).catch(() => ({
      content:
        "Sorry, I couldn't reach the assistant just now. Please try again, or use the Contact page to reach the team.",
      sources: [{ href: "/contact", label: "Contact Us" }],
    }));

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: response.content,
        sources: response.sources,
      },
    ]);
    setIsPending(false);
  }

  return (
    // Hidden while the mobile menu is open, where it covered menu items
    // (globals.css, Day 7 visual review).
    <div data-assistant-fab className="fixed bottom-4 right-4 z-40">
      {open ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="assistant-heading"
          className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col rounded-sm border border-border bg-surface shadow-lg"
        >
          <div className="flex items-center justify-between border-b border-border p-3">
            <div>
              <p
                id="assistant-heading"
                className="text-sm font-semibold text-ink"
              >
                Times Estate Ltd assistant
              </p>
              <p className="text-xs text-warning-text">
                AI · Demonstration mode — not a real person
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close assistant"
              className="-m-2 inline-flex h-11 w-11 items-center justify-center rounded-sm text-ink/70 hover:bg-accent-tint hover:text-ink"
            >
              ✕
            </button>
          </div>

          <div
            role="log"
            aria-live="polite"
            tabIndex={0}
            className="flex-1 space-y-3 overflow-y-auto p-3 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "text-right" : "text-left"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "inline-block rounded-sm bg-accent px-3 py-2 text-white"
                      : "inline-block rounded-sm bg-secondary/10 px-3 py-2 text-ink"
                  }
                >
                  {m.content}
                </div>
                {m.sources && m.sources.length > 0 && (
                  <div className="mt-1 space-x-2">
                    {m.sources.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="text-xs text-accent underline"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isPending && <p className="text-xs text-ink/70">Thinking…</p>}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-border p-3"
          >
            <label htmlFor="assistant-input" className="sr-only">
              Ask a question
            </label>
            <input
              ref={inputRef}
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 rounded-sm border border-border px-3 py-2 text-sm"
            />
            <Button type="submit" disabled={isPending}>
              Send
            </Button>
          </form>
        </div>
      ) : (
        <button
          ref={openButtonRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-accent-dark"
        >
          Ask the assistant
        </button>
      )}
    </div>
  );
}
