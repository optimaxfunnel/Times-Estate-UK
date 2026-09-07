/**
 * Provider-neutral interface for the AI assistant. See
 * /AI_SAFETY_RULES.md for the full behavioural contract every
 * implementation must follow, and /INTEGRATIONS.md for the comparison of
 * real providers (none connected).
 *
 * Connecting a real provider later means writing one new class
 * implementing `AIProvider` — the widget and its server action never
 * change, the same adapter pattern as `PropertyProvider`.
 */

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AISource {
  href: string;
  label: string;
}

export interface AIResponse {
  content: string;
  sources: AISource[];
  /** True whenever the reply touches a lead-worthy topic — the UI uses this to surface a human-reviewed form link, never to act automatically. */
  suggestsHumanFollowUp: boolean;
}

export interface AIProvider {
  readonly name: string;
  readonly isLiveProvider: boolean;
  respond(messages: AIMessage[]): Promise<AIResponse>;
}
