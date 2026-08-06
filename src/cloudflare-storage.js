const SCHEMA_COLUMNS = {
  student_name: "TEXT NOT NULL DEFAULT ''",
  note: "TEXT",
  display_name: "TEXT",
  thumbnail_key: "TEXT",
  latitude: "REAL",
  longitude: "REAL",
  starred: "INTEGER NOT NULL DEFAULT 0",
  manage_token_hash: "TEXT",
  updated_at: "INTEGER",
};

let schemaPromise;

export function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function ensureSchema(env) {
  if (!env.DB) throw new Error("D1 binding DB is unavailable");
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await env.DB.prepare(`CREATE TABLE IF NOT EXISTS observations (
        id TEXT PRIMARY KEY NOT NULL,
        created_at INTEGER NOT NULL,
        updated_at INTEGER,
        field_date TEXT NOT NULL,
        group_code TEXT NOT NULL,
        student_name TEXT NOT NULL DEFAULT '',
        category TEXT NOT NULL,
        other_category TEXT,
        note TEXT,
        original_name TEXT NOT NULL,
        display_name TEXT,
        content_type TEXT NOT NULL,
        size_bytes INTEGER NOT NULL,
        object_key TEXT NOT NULL UNIQUE,
        thumbnail_key TEXT,
        latitude REAL,
        longitude REAL,
        uploader_email TEXT,
        review_status TEXT NOT NULL DEFAULT 'visible',
        starred INTEGER NOT NULL DEFAULT 0,
        manage_token_hash TEXT
      )`).run();

      const columnResult = await env.DB.prepare("PRAGMA table_info(observations)").all();
      const existing = new Set((columnResult.results || []).map((column) => column.name));
      for (const [name, definition] of Object.entries(SCHEMA_COLUMNS)) {
        if (!existing.has(name)) {
          await env.DB.prepare(`ALTER TABLE observations ADD COLUMN ${name} ${definition}`).run();
        }
      }

      await env.DB.prepare("CREATE INDEX IF NOT EXISTS observations_filters_idx ON observations(field_date, group_code, category)").run();
      await env.DB.prepare("CREATE INDEX IF NOT EXISTS observations_created_idx ON observations(created_at DESC)").run();
      await env.DB.prepare("UPDATE observations SET review_status = 'visible' WHERE review_status IS NULL OR review_status = 'pending'").run();
    })().catch((error) => {
      schemaPromise = undefined;
      throw error;
    });
  }
  return schemaPromise;
}

export async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function matchesSecret(candidate, expected) {
  if (!candidate || !expected) return false;
  const [candidateHash, expectedHash] = await Promise.all([sha256(candidate), sha256(expected)]);
  return candidateHash === expectedHash;
}

export function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export function textField(form, name, maxLength = 240) {
  const value = form.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function fileExtension(name, contentType = "") {
  const match = name.toLowerCase().match(/\.[a-z0-9]{1,8}$/);
  if (match) return match[0];
  const known = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "application/pdf": ".pdf",
    "video/mp4": ".mp4",
    "video/quicktime": ".mov",
  };
  return known[contentType] || ".bin";
}

export function safeName(name) {
  return String(name || "fieldwork-file").replace(/[\r\n]/g, " ").slice(0, 240);
}

export function contentDisposition(name) {
  const clean = safeName(name);
  const ascii = clean.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_");
  return `inline; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(clean)}`;
}

export async function canManage(request, env, manageTokenHash) {
  const adminCode = request.headers.get("x-admin-code") || "";
  if (await matchesSecret(adminCode, env.ADMIN_CODE)) return true;
  const manageToken = request.headers.get("x-manage-token") || "";
  return Boolean(manageTokenHash) && (await sha256(manageToken)) === manageTokenHash;
}

export function normalizeObservation(row) {
  return {
    ...row,
    starred: Boolean(row.starred),
    latitude: row.latitude == null ? null : Number(row.latitude),
    longitude: row.longitude == null ? null : Number(row.longitude),
    fileUrl: `/api/observations/${encodeURIComponent(row.id)}/file`,
    thumbnailUrl: row.thumbnailKey ? `/api/observations/${encodeURIComponent(row.id)}/thumbnail` : null,
  };
}
