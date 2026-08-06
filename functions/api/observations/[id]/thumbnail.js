import { ensureSchema, json } from "../../../../src/cloudflare-storage.js";

export async function onRequestGet({ env, params }) {
  try {
    await ensureSchema(env);
    if (!env.UPLOADS) return json({ error: "R2 binding UPLOADS is unavailable." }, 503);
    const item = await env.DB.prepare("SELECT thumbnail_key AS thumbnailKey FROM observations WHERE id = ? AND review_status = 'visible'")
      .bind(String(params.id || "").trim()).first();
    if (!item?.thumbnailKey) return json({ error: "Thumbnail not found." }, 404);
    const object = await env.UPLOADS.get(item.thumbnailKey);
    if (!object) return json({ error: "Thumbnail not found." }, 404);
    return new Response(object.body, {
      headers: {
        "Content-Type": object.httpMetadata?.contentType || "image/jpeg",
        "Content-Length": String(object.size),
        "Cache-Control": "public, max-age=86400, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return json({ error: "The thumbnail could not be loaded." }, 500);
  }
}
