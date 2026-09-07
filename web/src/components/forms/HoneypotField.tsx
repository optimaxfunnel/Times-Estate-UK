import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";

/**
 * Invisible to people, visible to most bots. Positioned off-screen
 * (rather than `display:none`, which some bots detect and skip) and
 * removed from both tab order and the accessibility tree, so it never
 * interferes with keyboard or screen-reader use of the real form.
 */
export function HoneypotField() {
  return (
    <div
      style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
      aria-hidden="true"
    >
      <label htmlFor={HONEYPOT_FIELD_NAME}>Leave this field blank</label>
      <input
        type="text"
        id={HONEYPOT_FIELD_NAME}
        name={HONEYPOT_FIELD_NAME}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
