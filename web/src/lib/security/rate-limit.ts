import { headers } from "next/headers";

/**
 * A simple in-memory, fixed-window rate limiter — enough to stop a burst
 * of automated form submissions from one source during development and
 * a small-scale launch. It resets on server restart and only works
 * within a single server process, so it will need replacing with a
 * shared store (e.g. Upstash Redis) if the site is ever deployed across
 * multiple server instances — that is a Day 6/hosting-provider decision,
 * not something to build speculatively today.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

async function getClientKey(): Promise<string> {
  try {
    const h = await headers();
    const forwarded = h.get("x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return h.get("x-real-ip") ?? "unknown";
  } catch {
    return "unknown";
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

/** `formId` scopes the limit per form, so filling in one form doesn't block another. */
export async function checkRateLimit(formId: string): Promise<RateLimitResult> {
  const client = await getClientKey();
  const key = `${formId}:${client}`;
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const existing = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (existing.length >= MAX_REQUESTS_PER_WINDOW) {
    const retryAfterSeconds = Math.ceil((existing[0] + WINDOW_MS - now) / 1000);
    return {
      allowed: false,
      retryAfterSeconds: Math.max(retryAfterSeconds, 1),
    };
  }

  existing.push(now);
  hits.set(key, existing);
  return { allowed: true };
}

/** Test-only reset. */
export function __resetRateLimitForTests() {
  hits.clear();
}
