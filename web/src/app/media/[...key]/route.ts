import { readPhoto } from "@/lib/property/photo-storage";

/**
 * Serves uploaded property photos from this website's own address, so
 * visitors' browsers never contact the storage service. File names are
 * random and never reused, so each photo can be cached for a year.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const body = await readPhoto(key.join("/"));
  if (!body) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
