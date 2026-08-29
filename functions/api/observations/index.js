import {
  ensureSchema,
  fileExtension,
  json,
  matchesSecret,
  normalizeObservation,
  randomToken,
  safeName,
  sha256,
  textField,
} from "../../../src/cloudflare-storage.js";

const GROUPS = new Set(["A", "B", "C", "D", "E"]);
const CATEGORIES = new Set(["walking", "public_space", "commerce", "transport", "community", "environment", "other"]);
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const MAX_THUMBNAIL_BYTES = 600 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "video/mp4",
  "video/quicktime",
]);

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function validCoordinate(latitude, longitude) {
  return Number.isFinite(latitude) && Number.isFinite(longitude) && latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
}

function fileFrom(form, name) {
  const value = form.get(name);
  return value && typeof value === "object" && typeof value.arrayBuffer === "function" ? value : null;
}

export async function onRequestGet({ request, env }) {
  try {
    await ensureSchema(env);
    const url = new URL(request.url);
    const fieldDate = url.searchParams.get("date")?.trim() || "";
    const groupCode = url.searchParams.get("group")?.trim() || "";
    const category = url.searchParams.get("category")?.trim() || "";
    const materialName = url.searchParams.get("name")?.trim() || "";

    if (fieldDate && !validDate(fieldDate)) return json({ error: "Invalid date filter." }, 400);
    if (groupCode && !GROUPS.has(groupCode)) return json({ error: "Invalid group filter." }, 400);
    if (category && !CATEGORIES.has(category)) return json({ error: "Invalid category filter." }, 400);
    if (materialName.length > 240) return json({ error: "Invalid material name filter." }, 400);

    const conditions = ["review_status = 'visible'"];
    const values = [];
    if (fieldDate) {
      conditions.push("field_date = ?");
      values.push(fieldDate);
    }
    if (groupCode) {
      conditions.push("group_code = ?");
      values.push(groupCode);
    }
    if (category) {
      conditions.push("category = ?");
      values.push(category);
    }
    if (materialName) {
      conditions.push("COALESCE(NULLIF(TRIM(display_name), ''), original_name) = ?");
      values.push(materialName);
    }

    const statement = env.DB.prepare(`SELECT
      id, created_at AS createdAt, updated_at AS updatedAt, field_date AS fieldDate,
      group_code AS groupCode, student_name AS studentName, category,
      other_category AS otherCategory, note, original_name AS originalName,
      display_name AS displayName, content_type AS contentType, size_bytes AS sizeBytes,
      thumbnail_key AS thumbnailKey, latitude, longitude, starred
      FROM observations
      WHERE ${conditions.join(" AND ")}
      ORDER BY starred DESC, field_date DESC, created_at DESC
      LIMIT 750`);
    const result = await (values.length ? statement.bind(...values) : statement).all();
    return json({ items: (result.results || []).map(normalizeObservation) });
  } catch {
    return json({ error: "The fieldwork library could not be loaded." }, 500);
  }
}

export async function onRequestPost({ request, env }) {
  if (!env.DB || !env.UPLOADS) return json({ error: "Cloudflare storage bindings are unavailable." }, 503);
  if (!env.UPLOAD_CODE) return json({ error: "The class upload code has not been configured yet." }, 503);
  if (!(await matchesSecret(request.headers.get("x-upload-code") || "", env.UPLOAD_CODE))) {
    return json({ error: "The class upload code is incorrect." }, 401);
  }

  try {
    await ensureSchema(env);
    const form = await request.formData();
    const fieldDate = textField(form, "fieldDate", 10);
    const groupCode = textField(form, "studentGroup", 1);
    const studentName = textField(form, "studentName", 60);
    const category = textField(form, "observationCategory", 40);
    const otherCategory = textField(form, "otherCategory", 80);
    const displayName = textField(form, "displayName", 160);
    const originalName = textField(form, "originalName", 240) || safeName(fileFrom(form, "file")?.name);
    const note = textField(form, "note", 600);
    const latitude = Number(textField(form, "latitude", 30));
    const longitude = Number(textField(form, "longitude", 30));
    const file = fileFrom(form, "file");
    const thumbnail = fileFrom(form, "thumbnail");

    if (!validDate(fieldDate)) return json({ error: "A valid fieldwork date is required." }, 400);
    if (!GROUPS.has(groupCode)) return json({ error: "A valid student group is required." }, 400);
    if (!studentName) return json({ error: "A student name or nickname is required." }, 400);
    if (!CATEGORIES.has(category) || (category === "other" && !otherCategory)) {
      return json({ error: "A valid observation category is required." }, 400);
    }
    if (!validCoordinate(latitude, longitude)) return json({ error: "Select a location on the map." }, 400);
    if (!file || !file.size || file.size > MAX_FILE_BYTES || !ALLOWED_TYPES.has(file.type)) {
      return json({ error: "Unsupported file type or file larger than 20MB." }, 400);
    }
    if (file.type === "application/pdf" && file.size > 10 * 1024 * 1024) {
      return json({ error: "PDF files must be 10MB or smaller." }, 400);
    }
    if (thumbnail && (!thumbnail.type.startsWith("image/") || thumbnail.size > MAX_THUMBNAIL_BYTES)) {
      return json({ error: "The image thumbnail is invalid." }, 400);
    }

    const id = crypto.randomUUID();
    const manageToken = randomToken();
    const createdAt = Date.now();
    const objectKey = `fieldwork/${fieldDate}/${groupCode}/${id}${fileExtension(file.name, file.type)}`;
    const thumbnailKey = thumbnail ? `thumbnails/${fieldDate}/${groupCode}/${id}.jpg` : null;
    const storedKeys = [];

    try {
      await env.UPLOADS.put(objectKey, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type },
        customMetadata: { fieldDate, groupCode, category },
      });
      storedKeys.push(objectKey);
      if (thumbnail && thumbnailKey) {
        await env.UPLOADS.put(thumbnailKey, await thumbnail.arrayBuffer(), {
          httpMetadata: { contentType: "image/jpeg" },
        });
        storedKeys.push(thumbnailKey);
      }

      await env.DB.prepare(`INSERT INTO observations (
        id, created_at, updated_at, field_date, group_code, student_name, category,
        other_category, note, original_name, display_name, content_type, size_bytes,
        object_key, thumbnail_key, latitude, longitude, uploader_email,
        review_status, starred, manage_token_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'visible', 0, ?)`)
        .bind(
          id, createdAt, createdAt, fieldDate, groupCode, studentName, category,
          otherCategory || null, note || null, safeName(originalName), displayName || null,
          file.type, file.size, objectKey, thumbnailKey, latitude, longitude,
          request.headers.get("cf-access-authenticated-user-email"), await sha256(manageToken),
        ).run();
    } catch (error) {
      await Promise.allSettled(storedKeys.map((key) => env.UPLOADS.delete(key)));
      throw error;
    }

    const item = normalizeObservation({
      id, createdAt, updatedAt: createdAt, fieldDate, groupCode, studentName, category,
      otherCategory: otherCategory || null, note: note || null, originalName: safeName(originalName),
      displayName: displayName || null, contentType: file.type, sizeBytes: file.size,
      thumbnailKey, latitude, longitude, starred: 0,
    });
    return json({ ok: true, item, manageToken }, 201);
  } catch {
    return json({ error: "The file could not be stored." }, 500);
  }
}
