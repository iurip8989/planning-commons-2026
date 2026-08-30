import { canManage, ensureSchema, json, matchesSecret, normalizeObservation } from "../../../src/cloudflare-storage.js";

const GROUPS = new Set(["A", "B", "C", "D", "E"]);
const CATEGORIES = new Set(["walking", "public_space", "commerce", "transport", "community", "environment", "other"]);

async function findObservation(env, id) {
  return env.DB.prepare(`SELECT id, object_key AS objectKey, thumbnail_key AS thumbnailKey,
    manage_token_hash AS manageTokenHash, starred, category,
    other_category AS otherCategory
    FROM observations WHERE id = ?`).bind(id).first();
}

function validCoordinate(latitude, longitude) {
  return Number.isFinite(latitude) && Number.isFinite(longitude)
    && latitude >= -90 && latitude <= 90
    && longitude >= -180 && longitude <= 180;
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
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
    if (Object.hasOwn(body, "studentName")) {
      if (typeof body.studentName !== "string" || !body.studentName.trim() || body.studentName.trim().length > 60) {
        return json({ error: "The student name must contain 1 to 60 characters." }, 400);
      }
      updates.push("student_name = ?");
      values.push(body.studentName.trim());
    }
    if (Object.hasOwn(body, "fieldDate")) {
      if (typeof body.fieldDate !== "string" || !validDate(body.fieldDate.trim())) {
        return json({ error: "A valid fieldwork date is required." }, 400);
      }
      updates.push("field_date = ?");
      values.push(body.fieldDate.trim());
    }
    if (Object.hasOwn(body, "groupCode")) {
      if (typeof body.groupCode !== "string" || !GROUPS.has(body.groupCode.trim())) {
        return json({ error: "A valid student group is required." }, 400);
      }
      updates.push("group_code = ?");
      values.push(body.groupCode.trim());
    }
    const hasCategory = Object.hasOwn(body, "category");
    const hasOtherCategory = Object.hasOwn(body, "otherCategory");
    if (hasCategory || hasOtherCategory) {
      if ((hasCategory && typeof body.category !== "string") || (hasOtherCategory && typeof body.otherCategory !== "string")) {
        return json({ error: "A valid observation category is required." }, 400);
      }
      const category = hasCategory && typeof body.category === "string" ? body.category.trim() : item.category;
      const otherCategory = hasOtherCategory && typeof body.otherCategory === "string" ? body.otherCategory.trim() : (item.otherCategory || "");
      if (!CATEGORIES.has(category) || otherCategory.length > 80 || (category === "other" && !otherCategory)) {
        return json({ error: "A valid observation category is required." }, 400);
      }
      updates.push("category = ?", "other_category = ?");
      values.push(category, category === "other" ? otherCategory : null);
    }
    if (Object.hasOwn(body, "note")) {
      if (typeof body.note !== "string" || body.note.length > 600) return json({ error: "The note is too long." }, 400);
      updates.push("note = ?");
      values.push(body.note.trim() || null);
    }
    const hasLatitude = Object.hasOwn(body, "latitude");
    const hasLongitude = Object.hasOwn(body, "longitude");
    if (hasLatitude !== hasLongitude) return json({ error: "Both latitude and longitude are required." }, 400);
    if (hasLatitude && hasLongitude) {
      const latitude = Number(body.latitude);
      const longitude = Number(body.longitude);
      if (!validCoordinate(latitude, longitude)) return json({ error: "The location is invalid." }, 400);
      updates.push("latitude = ?", "longitude = ?");
      values.push(latitude, longitude);
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
