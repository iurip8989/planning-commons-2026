import { contentDisposition, ensureSchema, json } from "../../../../src/cloudflare-storage.js";

export async function onRequestGet({ request, env, params }) {
  try {
    await ensureSchema(env);
    if (!env.UPLOADS) return json({ error: "R2 binding UPLOADS is unavailable." }, 503);
    const item = await env.DB.prepare(`SELECT object_key AS objectKey,
      original_name AS originalName, display_name AS displayName,
      content_type AS contentType, size_bytes AS sizeBytes
      FROM observations WHERE id = ? AND review_status = 'visible'`)
      .bind(String(params.id || "").trim()).first();
    if (!item) return json({ error: "Observation not found." }, 404);

    const rangeHeader = request.headers.get("range");
    let range;
    if (rangeHeader) {
      const match = rangeHeader.match(/^bytes=(\d+)-(\d*)$/);
      if (match) {
        const offset = Number(match[1]);
        const end = match[2] ? Math.min(Number(match[2]), item.sizeBytes - 1) : item.sizeBytes - 1;
        if (offset <= end && offset < item.sizeBytes) range = { offset, length: end - offset + 1 };
      }
    }

    const object = await env.UPLOADS.get(item.objectKey, range ? { range } : undefined);
    if (!object) return json({ error: "Stored file not found." }, 404);
    const contentType = object.httpMetadata?.contentType || item.contentType || "application/octet-stream";
    const headers = new Headers({
      "Content-Type": contentType,
      "Content-Disposition": contentDisposition(item.displayName || item.originalName),
      "Cache-Control": "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
      "Accept-Ranges": "bytes",
    });
    if (range) {
      headers.set("Content-Length", String(range.length));
      headers.set("Content-Range", `bytes ${range.offset}-${range.offset + range.length - 1}/${item.sizeBytes}`);
      return new Response(object.body, { status: 206, headers });
    }
    headers.set("Content-Length", String(item.sizeBytes));
    return new Response(object.body, { headers });
  } catch {
    return json({ error: "The stored file could not be loaded." }, 500);
  }
}
