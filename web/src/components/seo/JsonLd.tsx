/**
 * Renders a single JSON-LD `<script>` block. Kept deliberately generic —
 * every call site is responsible for building a schema.org-shaped object
 * from confirmed data only (see /SEO_PLAN.md's "structured data" section
 * for what each page emits and why). `JSON.stringify` output is safe to
 * inline here: it never contains user-supplied HTML, only data this
 * codebase itself constructs from typed fields.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
