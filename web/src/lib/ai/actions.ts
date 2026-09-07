"use server";

import { aiProvider } from "@/lib/ai/demo-provider";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { sanitiseText } from "@/lib/security/sanitize";
import type { AIMessage, AIResponse } from "@/lib/ai/provider";

export async function askAssistant(
  history: AIMessage[],
  question: string,
): Promise<AIResponse> {
  const rateLimit = await checkRateLimit("ai-assistant");
  if (!rateLimit.allowed) {
    return {
      content: `Please wait a moment before sending another message (about ${rateLimit.retryAfterSeconds}s).`,
      sources: [],
      suggestsHumanFollowUp: false,
    };
  }

  const clean = sanitiseText(question, 500);
  if (!clean) {
    return {
      content: "Could you say a little more?",
      sources: [],
      suggestsHumanFollowUp: false,
    };
  }

  const messages: AIMessage[] = [...history, { role: "user", content: clean }];
  return aiProvider.respond(messages);
}
