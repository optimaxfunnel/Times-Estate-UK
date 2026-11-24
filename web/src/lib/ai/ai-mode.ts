/**
 * Whether the live AI assistant is switched on (AI_AGENT_PLAN.md §A4).
 * It needs BOTH AI_ASSISTANT=live and an ANTHROPIC_API_KEY. Anything
 * else, including today's setup, runs the rule-based demonstration
 * assistant. Kept free of the AI SDK so the page layout can read it.
 */
export function isLiveAssistantEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return env.AI_ASSISTANT === "live" && !!env.ANTHROPIC_API_KEY?.trim();
}
