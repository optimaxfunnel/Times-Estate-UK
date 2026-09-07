/**
 * Strips HTML/script content from free-text form input before it is
 * stored or ever displayed back (e.g. in the admin leads list). This is
 * a defence-in-depth measure — React already escapes text when rendering,
 * but stored data may end up in emails, exports or a future CRM that
 * doesn't escape it, so it is cleaned at the point of entry too.
 */
const CONTROL_CHARS_PATTERN = "[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]";
const controlCharsRegex = new RegExp(CONTROL_CHARS_PATTERN, "g");

export function sanitiseText(value: string, maxLength = 4000): string {
  return value
    .replace(/<[^>]*>/g, "") // strip tags
    .replace(controlCharsRegex, "") // strip control characters (keeps tab/newline)
    .trim()
    .slice(0, maxLength);
}

export function sanitiseFields<T extends Record<string, unknown>>(fields: T): T {
  const result = { ...fields };
  for (const key of Object.keys(result)) {
    const value = result[key];
    if (typeof value === "string") {
      (result as Record<string, unknown>)[key] = sanitiseText(value);
    }
  }
  return result;
}
