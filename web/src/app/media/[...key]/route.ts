import { contentTypeFor, readPhoto } from "@/lib/property/photo-storage";

/**
 * Serves uploaded property photos, floor plans and brochures from this website's own address, so
 * visitors' browsers never contact the storage service. File names are
 * random and never reused, so each photo can be cached for a year.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const name = key.join("/");
  const body = await readPhoto(name);
  if (!body) return new Response("Not found", { status: 404 });
  const type = contentTypeFor(name);
  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": type,
      // Brochures always download rather than open inside the site.
      ...(type === "application/pdf" && {
        "Content-Disposition": 'attachment; filename="property-brochure.pdf"',
      }),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
