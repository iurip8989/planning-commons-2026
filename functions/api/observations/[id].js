import { canManage, ensureSchema, json, matchesSecret, normalizeObservation } from "../../../src/cloudflare-storage.js";

async function findObservation(env, id) {
  return env.DB.prepare(`SELECT id, object_key AS objectKey, thumbnail_key AS thumbnailKey,
    manage_token_hash AS manageTokenHash, starred
    FROM observations WHERE id = ?`).bind(id).first();
}

export async function onRequestPatch({ request, env, params }) {
  try {
    await ensureSchema(env);
    const id = String(params.id || "").trim();
    const item = await findObservation(env, id);
    if (!item) return json({ error: "Observation not found." }, 404);

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "A JSON body is required." }, 400);
    }

    const updates = [];
    const values = [];
    const changesOnlyStar = Object.keys(body).every((key) => key === "starred") && Object.hasOwn(body, "starred");
    const ownerOrAdmin = await canManage(request, env, item.manageTokenHash);
    const classMember = await matchesSecret(request.headers.get("x-upload-code") || "", env.UPLOAD_CODE);
    if (!ownerOrAdmin && !(changesOnlyStar && classMember)) return json({ error: "Management permission is required." }, 403);

    if (Object.hasOwn(body, "displayName")) {
      if (typeof body.displayName !== "string" || !body.displayName.trim() || body.displayName.trim().length > 160) {
        return json({ error: "The display name must contain 1 to 160 characters." }, 400);
      }
      updates.push("display_name = ?");
      values.push(body.displayName.trim());
    }
    if (Object.hasOwn(body, "note")) {
      if (typeof body.note !== "string" || body.note.length > 600) return json({ error: "The note is too long." }, 400);
      updates.push("note = ?");
      values.push(body.note.trim() || null);
    }
    if (Object.hasOwn(body, "starred")) {
      if (typeof body.starred !== "boolean") return json({ error: "The starred value must be true or false." }, 400);
      updates.push("starred = ?");
      values.push(body.starred ? 1 : 0);
    }
    if (!updates.length) return json({ error: "No supported changes were supplied." }, 400);

    updates.push("updated_at = ?");
    values.push(Date.now());
    await env.DB.prepare(`UPDATE observations SET ${updates.join(", ")} WHERE id = ?`).bind(...values, id).run();
    const updated = await env.DB.prepare(`SELECT
      id, created_at AS createdAt, updated_at AS updatedAt, field_date AS fieldDate,
      group_code AS groupCode, student_name AS studentName, category,
      other_category AS otherCategory, note, original_name AS originalName,
      display_name AS displayName, content_type AS contentType, size_bytes AS sizeBytes,
      thumbnail_key AS thumbnailKey, latitude, longitude, starred
      FROM observations WHERE id = ?`).bind(id).first();
    return json({ ok: true, item: normalizeObservation(updated) });
  } catch {
    return json({ error: "The observation could not be updated." }, 500);
  }
}

export async function onRequestDelete({ request, env, params }) {
  try {
    await ensureSchema(env);
    if (!env.UPLOADS) return json({ error: "R2 binding UPLOADS is unavailable." }, 503);
    const id = String(params.id || "").trim();
    const item = await findObservation(env, id);
    if (!item) return json({ error: "Observation not found." }, 404);
    if (!(await canManage(request, env, item.manageTokenHash))) return json({ error: "Management permission is required." }, 403);

    await env.DB.prepare("DELETE FROM observations WHERE id = ?").bind(id).run();
    await Promise.allSettled([item.objectKey, item.thumbnailKey].filter(Boolean).map((key) => env.UPLOADS.delete(key)));
    return json({ ok: true });
  } catch {
    return json({ error: "The observation could not be deleted." }, 500);
  }
}
