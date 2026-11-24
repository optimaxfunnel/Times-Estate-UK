/**
 * Checks every reply from the live AI model before a visitor sees it
 * (AI_AGENT_PLAN.md §5 point 4). A reply that fails is never shown; the
 * caller replaces it with a safe, fixed answer.
 *
 * These are a backstop. The model is also told the rules, and the
 * refusal checks in refusals.ts run before it is asked at all.
 */

export type GuardResult = { ok: true } | { ok: false; reason: string };

/** A £ figure (or "k"/"m" amount) near valuation words: the AI must never value a property. */
const VALUATION_FIGURE =
  /\b(worth|valued?|valuation|estimate[ds]?|appraisal|would (sell|go|fetch|achieve)|could (sell|get|achieve|fetch)|market value)\b[^.?!\n]{0,80}£\s?\d|£\s?\d[\d,.]*\s?(k|m|million|thousand)?[^.?!\n]{0,60}\b(worth|valuation|market value|would (sell|fetch|achieve))\b/i;

/** Promises only a person can make. */
const PROMISES =
  /\b(guarantee[ds]?|i('ve| have)? (booked|confirmed|arranged|approved)|(we('ve| have)|i('ve| have)) (booked|confirmed) (you|your)|(your|the) (viewing|appointment|tenancy|application) (is|has been) (booked|confirmed|approved|accepted)|you (are|have been) (approved|accepted)|offer (is|has been) accepted)\b/i;

/** Claiming to be a person. */
const CLAIMS_HUMAN = /\b(i am|i'm) (a )?(real )?(human|person|member of (the )?staff|an? (estate )?agent)\b/i;

/** Advice only a qualified person may give. */
const ADVICE =
  /\byou should (buy|invest|sell|accept|reject|offer)\b|\b(good|great|bad|safe) investment\b|\b(legally|by law) you (must|can|should)\b/i;

const LISTING_LINK = /\/property\/([A-Za-z0-9-]+)/g;

export function checkReply(text: string, allowedListingIds: Set<string>): GuardResult {
  if (!text.trim()) return { ok: false, reason: "empty" };
  if (text.length > 2500) return { ok: false, reason: "too long" };
  if (VALUATION_FIGURE.test(text)) return { ok: false, reason: "valuation figure" };
  if (PROMISES.test(text)) return { ok: false, reason: "promise" };
  if (CLAIMS_HUMAN.test(text)) return { ok: false, reason: "claims to be human" };
  if (ADVICE.test(text)) return { ok: false, reason: "advice" };
  for (const m of text.matchAll(LISTING_LINK)) {
    if (!allowedListingIds.has(m[1])) return { ok: false, reason: `unknown listing ${m[1]}` };
  }
  return { ok: true };
}
