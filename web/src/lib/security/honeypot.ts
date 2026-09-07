/**
 * A honeypot field ("website") is included in every form but hidden from
 * sighted and screen-reader users via CSS (not `type="hidden"`, since
 * some bots skip genuinely hidden inputs — see HoneypotField.tsx). Most
 * automated form-fillers populate every visible input field regardless,
 * so a filled honeypot is a strong signal of a bot.
 *
 * When triggered, the form pretends to succeed (so the bot doesn't learn
 * its submission was rejected and adjust) but no lead is created and no
 * notification is logged.
 */
export const HONEYPOT_FIELD_NAME = "website";

export function isHoneypotTriggered(formData: FormData): boolean {
  const value = formData.get(HONEYPOT_FIELD_NAME);
  return typeof value === "string" && value.trim().length > 0;
}
