/**
 * Graceful fallback when the database cannot be reached (for example the
 * Supabase project is paused or the network is down). Public pages use
 * this so a database outage shows a polite "temporarily unavailable"
 * message instead of breaking the whole page.
 *
 * Only a short, generic line is logged — never the query, parameters or
 * any customer data.
 */
export type SafeResult<T> = { ok: true; value: T } | { ok: false };

export async function tryDb<T>(
  label: string,
  run: () => Promise<T>,
): Promise<SafeResult<T>> {
  try {
    return { ok: true, value: await run() };
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? String((error as { code: unknown }).code)
        : "unknown";
    console.error(`[db] ${label} failed — database unavailable (${code})`);
    return { ok: false };
  }
}

/** Shown to visitors when a form could not be saved. */
export const SAVE_FAILED_MESSAGE =
  "Sorry — we couldn't save your details just now because of a technical problem on our side. Nothing was sent. Please try again in a few minutes, or call us on 0208 672 8080.";
