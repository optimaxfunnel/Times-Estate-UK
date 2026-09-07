"use client";

import { useState } from "react";
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || isPending) return;

    const history: AIMessage[] = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setIsPending(true);

    const response = await askAssistant(history, question);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: response.content, sources: response.sources },
    ]);
    setIsPending(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {open ? (
        <div className="flex h-[28rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col rounded-sm border border-border bg-surface shadow-lg">
          <div className="flex items-center justify-between border-b border-border p-3">
            <div>
              <p className="text-sm font-semibold text-ink">Times Estate Ltd assistant</p>
              <p className="text-xs text-warning">AI · Demonstration mode — not a real person</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="text-ink/60 hover:text-ink"
            >
              ✕
            </button>
          </div>

          <div role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
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
                      <Link key={s.href} href={s.href} className="text-xs text-accent underline">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isPending && <p className="text-xs text-ink/50">Thinking…</p>}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-3">
            <label htmlFor="assistant-input" className="sr-only">
              Ask a question
            </label>
            <input
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
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-accent-dark"
        >
          Ask the assistant
        </button>
      )}
    </div>
  );
}
