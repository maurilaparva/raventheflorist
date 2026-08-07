import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-7e4d3869/health", (c) => {
  return c.json({ status: "ok" });
});

const BUCKET = "gallery";

function supabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

async function ensureBucket() {
  const sb = supabase();
  const { data: buckets } = await sb.storage.listBuckets();
  if (!buckets?.find((b: any) => b.name === BUCKET)) {
    await sb.storage.createBucket(BUCKET, { public: true });
  }
}

// List all gallery photos
app.get("/make-server-7e4d3869/gallery", async (c) => {
  await ensureBucket();
  const sb = supabase();
  const { data, error } = await sb.storage.from(BUCKET).list("", { sortBy: { column: "created_at", order: "desc" } });
  if (error) return c.json({ error: error.message }, 500);
  const photos = (data ?? [])
    .filter((f: any) => f.name !== ".emptyFolderPlaceholder")
    .map((f: any) => ({
      name: f.name,
      url: `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/${BUCKET}/${f.name}`,
    }));
  return c.json({ photos });
});

// Upload a photo
app.post("/make-server-7e4d3869/gallery/upload", async (c) => {
  await ensureBucket();
  const sb = supabase();
  const formData = await c.req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return c.json({ error: "No file provided" }, 400);
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const buffer = await file.arrayBuffer();
  const { error } = await sb.storage.from(BUCKET).upload(filename, buffer, { contentType: file.type });
  if (error) return c.json({ error: error.message }, 500);
  const url = `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/${BUCKET}/${filename}`;
  return c.json({ name: filename, url });
});

// Delete a photo
app.delete("/make-server-7e4d3869/gallery/:filename", async (c) => {
  const sb = supabase();
  const filename = c.req.param("filename");
  const { error } = await sb.storage.from(BUCKET).remove([filename]);
  if (error) return c.json({ error: error.message }, 500);
  return c.json({ success: true });
});

Deno.serve(app.fetch);
