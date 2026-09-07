/** Joins class names, skipping any falsy values. Deliberately dependency-free. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
