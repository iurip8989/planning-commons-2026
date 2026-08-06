import { ensureSchema, json } from "../../src/cloudflare-storage.js";

export async function onRequestGet({ env }) {
  try {
    await ensureSchema(env);
    return json({
      ok: true,
      database: Boolean(env.DB),
      uploads: Boolean(env.UPLOADS),
      uploadCodeConfigured: Boolean(env.UPLOAD_CODE),
      adminCodeConfigured: Boolean(env.ADMIN_CODE),
    });
  } catch {
    return json({ ok: false, error: "Storage initialization failed." }, 500);
  }
}
