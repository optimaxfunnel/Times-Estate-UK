/**
 * Banner shown at the top of every drafted legal/regulatory page. These
 * pages now carry real drafted text (Day 6), a deliberate change from
 * the earlier "no wording at all" placeholder approach — but drafted is
 * not the same as approved: CLAUDE.md Rule 5 keeps legal wording under
 * professional and owner control, so nothing here may be relied upon
 * until a qualified UK solicitor has reviewed it and the owner has
 * approved the final text. See /REGULATORY_READINESS.md.
 */
export function DraftLegalNotice() {
  return (
    <div
      role="note"
      className="rounded-sm border-2 border-dashed border-warning/60 bg-warning/5 p-4 text-sm text-ink"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-warning-text">
        Draft — requires legal review
      </p>
      <p className="mt-1 text-ink/80">
        This page is a drafted starting point, prepared from the site&rsquo;s
        actual current features and data practices. It has{" "}
        <strong>not</strong> yet been reviewed by a qualified UK solicitor
        or approved by the business owner, and must not be relied upon as
        finished legal text until it has. See{" "}
        <code className="text-xs">/REGULATORY_READINESS.md</code> and{" "}
        <code className="text-xs">/CONTENT_VERIFICATION_REGISTER.md</code>.
      </p>
    </div>
  );
}
