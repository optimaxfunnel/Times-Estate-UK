import type { AIProvider } from "@/lib/ai/provider";
import { aiProvider as demoProvider } from "@/lib/ai/demo-provider";
import { isLiveAssistantEnabled } from "@/lib/ai/ai-mode";
import {
  ClaudeAIProvider,
  DEFAULT_AI_MODEL,
  FallbackAIProvider,
  createClaudeClient,
} from "@/lib/ai/claude-provider";

let live: AIProvider | null = null;

/**
 * The assistant the site uses: the rule-based one unless the live AI is
 * switched on (ai-mode.ts). The live one always falls back to the
 * rule-based one if it fails. Turning AI_ASSISTANT off takes effect on
 * the next request.
 */
export function getAIProvider(): AIProvider {
  if (!isLiveAssistantEnabled()) return demoProvider;
  live ??= new FallbackAIProvider(
    new ClaudeAIProvider(
      createClaudeClient(process.env.ANTHROPIC_API_KEY!.trim()),
      process.env.AI_MODEL?.trim() || DEFAULT_AI_MODEL,
    ),
    demoProvider,
  );
  return live;
}
