import { json } from "../../../src/cloudflare-storage.js";

const GROUPS = new Set(["A", "B", "C", "D", "E"]);
const CATEGORIES = new Set(["walking", "public_space", "commerce", "transport", "community", "environment", "other"]);

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function numberRows(rows, fields = []) {
  return (rows || []).map((row) => ({
    ...row,
    ...Object.fromEntries(fields.map((field) => [field, Number(row[field] || 0)])),
  }));
}

export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ error: "Cloudflare database binding is unavailable." }, 503);

  try {
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

    const where = conditions.join(" AND ");
    const queryAll = async (sql) => {
      const statement = env.DB.prepare(sql);
      const result = await (values.length ? statement.bind(...values) : statement).all();
      return result.results || [];
    };

    const [totalRows, groupRows, categoryRows, materialRows, dateRows] = await Promise.all([
      queryAll(`SELECT COUNT(*) AS count FROM observations WHERE ${where}`),
      queryAll(`SELECT group_code AS groupCode, COUNT(*) AS count
        FROM observations WHERE ${where}
        GROUP BY group_code ORDER BY group_code ASC`),
      queryAll(`SELECT category, COUNT(*) AS count
        FROM observations WHERE ${where}
        GROUP BY category ORDER BY count DESC, category ASC`),
      queryAll(`SELECT COALESCE(NULLIF(TRIM(display_name), ''), original_name) AS name, COUNT(*) AS count
        FROM observations WHERE ${where}
        GROUP BY COALESCE(NULLIF(TRIM(display_name), ''), original_name)
        ORDER BY count DESC, name COLLATE NOCASE ASC`),
      queryAll(`SELECT field_date AS fieldDate, COUNT(*) AS count
        FROM observations WHERE ${where}
        GROUP BY field_date ORDER BY field_date DESC`),
    ]);

    return json({
      total: Number(totalRows[0]?.count || 0),
      groups: numberRows(groupRows, ["count"]),
      categories: numberRows(categoryRows, ["count"]),
      materialNames: numberRows(materialRows, ["count"]),
      dates: numberRows(dateRows, ["count"]),
    });
  } catch {
    return json({ error: "The fieldwork summary could not be loaded." }, 500);
  }
}
