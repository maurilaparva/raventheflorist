import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import Stripe from "npm:stripe@17";
import * as kv from "./kv_store.ts";

const app = new Hono().basePath("/server");

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
  const url = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("SB_URL") ?? Deno.env.get("PROJECT_SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SB_SERVICE_ROLE_KEY") ?? Deno.env.get("SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Missing SUPABASE_URL or service role key environment variable");
  return createClient(url, serviceKey);
}

function stripe() {
  const key = Deno.env.get("STRIPE_SECRET_KEY") ?? Deno.env.get("SB_STRIPE_SECRET_KEY") ?? Deno.env.get("STRIPE_KEY");
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY environment variable");
  return new Stripe(key, { apiVersion: "2024-12-18.acacia" });
}

// ─── Rose Bouquets pricing (source of truth — mirrors src/app/App.tsx, never trust client-sent totals) ───

const ROSE_OPTIONS: Record<string, { label: string; price: number }> = {
  "25": { label: "25 Premium Roses", price: 95 },
  "50": { label: "50 Premium Roses", price: 185 },
  "75": { label: "75 Premium Roses", price: 265 },
  "100": { label: "100 Premium Roses", price: 345 },
};

const FLOWER_PRICES: Record<string, number> = {
  "Baby's Breath": 10,
  "Spray Roses": 15,
  "Baby Breath Lettering": 25,
  "Greenery": 10,
};

// Basic and Special/Design Wrapping Paper are priced by rose-count tier, not flat — see wrappingPaperPrice().
const ACCESSORY_PRICES: Record<string, number> = {
  "Note": 3.5,
  "Diamond Pins": 3.5,
  "Pearl Pins": 3.5,
  "Heart Pins": 3.5,
  "Star Pins": 3.5,
  "Pearl Bow": 5,
  "Butterflies": 3.5,
  "Pearl Mesh": 5,
  "Bow": 5,
  "Tissue Paper": 4,
  "Banner": 10,
  "Glitter": 5,
  "Crown": 7,
};

function wrappingPaperPrice(name: string, orderKey: string): number {
  const highTier = orderKey === "75" || orderKey === "100";
  if (name === "Basic Wrapping Paper") return highTier ? 15 : 10;
  if (name === "Special/Design Wrapping Paper") return highTier ? 20 : 15;
  return 0;
}

const DELIVERY_FEE = 15;
const DISCOUNT_CODE = "BLOOMS";
const DISCOUNT_RATE = 0.15;
const TAX_RATE = 0.07;

// Minnesota ZIP codes fall within this range — delivery is Minnesota-only.
const MN_ZIP_MIN = 55001;
const MN_ZIP_MAX = 56763;

function isMinnesotaZip(zip: unknown): boolean {
  if (typeof zip !== "string") return false;
  const digits = zip.replace(/\D/g, "").slice(0, 5);
  if (digits.length !== 5) return false;
  const n = parseInt(digits, 10);
  return n >= MN_ZIP_MIN && n <= MN_ZIP_MAX;
}

function computeDeposit(body: any) {
  const order = ROSE_OPTIONS[body.order];
  if (!order) return null;

  const flowerAddons: string[] = Array.isArray(body.flowerAddons) ? body.flowerAddons : [];
  const accessoryAddons: string[] = Array.isArray(body.accessoryAddons) ? body.accessoryAddons : [];

  const roseBase = order.price;
  const flowerTotal = flowerAddons.reduce((sum, f) => sum + (FLOWER_PRICES[f] ?? 0), 0);
  const accessoryTotal = accessoryAddons.reduce((sum, a) => {
    if (a === "Basic Wrapping Paper" || a === "Special/Design Wrapping Paper") return sum + wrappingPaperPrice(a, body.order);
    return sum + (ACCESSORY_PRICES[a] ?? 0);
  }, 0);
  const deliveryFee = body.dateType === "delivery" ? DELIVERY_FEE : 0;

  const preDiscountSubtotal = roseBase + flowerTotal + accessoryTotal + deliveryFee;
  const discountApplied = typeof body.discountCode === "string" && body.discountCode.trim().toUpperCase() === DISCOUNT_CODE;
  const discountAmount = discountApplied ? preDiscountSubtotal * DISCOUNT_RATE : 0;
  const subtotal = preDiscountSubtotal - discountAmount;
  const tax = subtotal * TAX_RATE;
  const grandTotal = subtotal + tax;
  const deposit = Math.round(grandTotal * 0.5 * 100) / 100;

  return { order, deposit, grandTotal: Math.round(grandTotal * 100) / 100 };
}

async function ensureBucket() {
  const sb = supabase();
  const { data: buckets } = await sb.storage.listBuckets();
  if (!buckets?.find((b: any) => b.name === BUCKET)) {
    await sb.storage.createBucket(BUCKET, { public: true });
  }
}

// ─── Inspiration photo uploads (private-ish support bucket for inquiries — never trust client-sent totals applies here too) ───

const INSPO_BUCKET = "inspiration";
const NOTIFY_EMAIL = "raventheflorist@yahoo.com";

async function ensureInspoBucket() {
  const sb = supabase();
  const { data: buckets } = await sb.storage.listBuckets();
  if (!buckets?.find((b: any) => b.name === INSPO_BUCKET)) {
    await sb.storage.createBucket(INSPO_BUCKET, { public: true });
  }
}

function labelize(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (ch) => ch.toUpperCase()).trim();
}

function escapeHtml(s: string): string {
  const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return s.replace(/[&<>"']/g, (ch) => map[ch]);
}

async function sendNotificationEmail(subject: string, fields: Record<string, unknown>, photoUrls: string[]): Promise<{ sent: boolean; detail: string }> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    return { sent: false, detail: "RESEND_API_KEY not set" };
  }
  const rows = Object.entries(fields)
    .filter(([, v]) => v !== "" && v !== undefined && v !== null)
    .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#666;white-space:nowrap;vertical-align:top;">${escapeHtml(labelize(k))}</td><td style="padding:4px 0;">${escapeHtml(String(v))}</td></tr>`)
    .join("");
  const photosHtml = photoUrls.length
    ? `<p><strong>Inspiration photos:</strong></p><ul>${photoUrls.map((u) => `<li><a href="${u}">${escapeHtml(u)}</a></li>`).join("")}</ul>`
    : "";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Raven the Florist Website <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject,
        html: `<h2>${escapeHtml(subject)}</h2><table>${rows}</table>${photosHtml}`,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.log("Resend email failed:", detail);
      return { sent: false, detail };
    }
    return { sent: true, detail: "" };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.log("Resend email error:", detail);
    return { sent: false, detail };
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

// Upload an inspiration photo (used by inquiry forms and the Rose Bouquets checkout flow)
app.post("/make-server-7e4d3869/inspiration/upload", async (c) => {
  await ensureInspoBucket();
  const sb = supabase();
  const formData = await c.req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return c.json({ error: "No file provided" }, 400);
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const buffer = await file.arrayBuffer();
  const { error } = await sb.storage.from(INSPO_BUCKET).upload(filename, buffer, { contentType: file.type });
  if (error) return c.json({ error: error.message }, 500);
  const url = `${Deno.env.get("SUPABASE_URL")}/storage/v1/object/public/${INSPO_BUCKET}/${filename}`;
  return c.json({ name: filename, url });
});

// Record a non-payment inquiry (Floral Basket, Build Your Own Bouquet, Event Inquiry, Rose Bouquets paid via Zelle/Custom)
// and email Raven the full details, since these never touch Stripe.
app.post("/make-server-7e4d3869/inquiry", async (c) => {
  const body = await c.req.json();
  const type = typeof body.type === "string" ? body.type : "inquiry";
  const fields = body.fields && typeof body.fields === "object" ? body.fields : {};
  const photoUrls: string[] = Array.isArray(body.photoUrls) ? body.photoUrls.filter((u: unknown) => typeof u === "string") : [];

  const id = crypto.randomUUID();
  await kv.set(`inquiry:${id}`, { type, ...fields, photoUrls, receivedAt: new Date().toISOString() });

  const emailResult = await sendNotificationEmail(`New ${labelize(type)} — ${fields.name ?? "Website inquiry"}`, fields, photoUrls);

  return c.json({ success: true, emailSent: emailResult.sent, emailDetail: emailResult.detail });
});

// Create a Stripe Checkout session for a Rose Bouquets deposit
app.post("/make-server-7e4d3869/checkout/create-session", async (c) => {
  const body = await c.req.json();
  const computed = computeDeposit(body);
  if (!computed) return c.json({ error: "Invalid rose bouquet selection" }, 400);
  if (!body.origin || typeof body.origin !== "string") return c.json({ error: "Missing origin" }, 400);

  const address = body.address && typeof body.address === "object" ? body.address : null;
  if (body.dateType === "delivery" && !isMinnesotaZip(address?.zip)) {
    return c.json({ error: "We currently only deliver within Minnesota." }, 400);
  }

  const { order, deposit, grandTotal } = computed;

  const orderMetadata: Record<string, string> = {
    customerName: body.name ?? "",
    contactMethod: body.contactMethod ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    order: order.label,
    roseColors: Array.isArray(body.roseColors) ? body.roseColors.join(", ") : "",
    flowerAddons: Array.isArray(body.flowerAddons) ? body.flowerAddons.join(", ") : "",
    accessoryAddons: Array.isArray(body.accessoryAddons) ? body.accessoryAddons.join(", ") : "",
    wrappingColor: body.wrappingColor ?? "",
    dateType: body.dateType ?? "",
    deliveryAddress: address
      ? [address.street, address.apt, `${address.city ?? ""}, ${address.state ?? ""} ${address.zip ?? ""}`]
          .filter(Boolean)
          .join(", ")
          .slice(0, 400)
      : "",
    date: body.date ?? "",
    timeSlot: body.timeSlot ?? "",
    notes: (body.notes ?? "").slice(0, 400),
    grandTotal: grandTotal.toFixed(2),
    deposit: deposit.toFixed(2),
    inspirationPhotos: Array.isArray(body.photoUrls) ? body.photoUrls.join(", ").slice(0, 500) : "",
  };

  try {
    const session = await stripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(deposit * 100),
            product_data: {
              name: `50% deposit — ${order.label}`,
              description: `Order total $${grandTotal.toFixed(2)}, deposit due today $${deposit.toFixed(2)}`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${body.origin}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${body.origin}?checkout=cancelled`,
      customer_email: body.contactMethod === "email" ? body.email : undefined,
      metadata: orderMetadata,
      // Session metadata alone isn't enough — Stripe's default "Payments" dashboard view shows the
      // PaymentIntent/Charge, which has its own separate metadata. Without this, that view looks empty.
      payment_intent_data: {
        metadata: orderMetadata,
      },
    });
    return c.json({ url: session.url });
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Failed to create checkout session" }, 500);
  }
});

// Verify a completed Stripe Checkout session and record the order
app.get("/make-server-7e4d3869/checkout/verify/:sessionId", async (c) => {
  const sessionId = c.req.param("sessionId");
  try {
    const session = await stripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return c.json({ paid: false });
    }
    const amount = (session.amount_total ?? 0) / 100;
    const record = { ...session.metadata, amountPaid: amount, sessionId, paidAt: new Date().toISOString() };
    await kv.set(`order:${sessionId}`, record);
    return c.json({ paid: true, amount, metadata: session.metadata });
  } catch (error) {
    return c.json({ error: error instanceof Error ? error.message : "Failed to verify session" }, 500);
  }
});

Deno.serve(app.fetch);
