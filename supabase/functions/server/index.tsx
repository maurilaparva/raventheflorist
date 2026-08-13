import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import Stripe from "npm:stripe@17";
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

function stripe() {
  return new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-12-18.acacia" });
}

// ─── Rose Bouquets pricing (source of truth — mirrors src/app/App.tsx, never trust client-sent totals) ───

const ROSE_OPTIONS: Record<string, { label: string; price: number }> = {
  "25": { label: "25 Premium Roses", price: 90 },
  "50": { label: "50 Premium Roses", price: 180 },
  "75": { label: "75 Premium Roses", price: 260 },
  "100": { label: "100 Premium Roses", price: 340 },
};

const FLOWER_PRICES: Record<string, number> = {
  "Baby's Breath": 10,
  "Oriental Lilies": 20,
  "Spray Roses": 20,
  "Premium Gerbera": 15,
  "Snapdragons": 15,
};

const ACCESSORY_PRICES: Record<string, number> = {
  "Basic Wrapping Paper": 0,
  "Note": 3,
  "Diamond Pins": 3,
  "Pearl Pins": 3,
  "Heart Pins": 3,
  "Star Pins": 3,
  "Pearl Bow": 3,
  "Butterflies": 3,
  "Pearl Mesh": 3,
  "Bow": 4,
  "Tissue Paper": 4,
  "Banner": 5,
  "Greenery": 5,
  "Glitter": 5,
  "Crown": 7,
  "Special/Design Wrapping Paper": 10,
  "Baby Breath Letters (Any Size)": 20,
};

const DELIVERY_FEE = 15;
const DISCOUNT_CODE = "BLOOMS";
const DISCOUNT_RATE = 0.2;
const TAX_RATE = 0.07;

function computeDeposit(body: any) {
  const order = ROSE_OPTIONS[body.order];
  if (!order) return null;

  const flowerAddons: string[] = Array.isArray(body.flowerAddons) ? body.flowerAddons : [];
  const accessoryAddons: string[] = Array.isArray(body.accessoryAddons) ? body.accessoryAddons : [];

  const roseBase = order.price;
  const flowerTotal = flowerAddons.reduce((sum, f) => sum + (FLOWER_PRICES[f] ?? 0), 0);
  const accessoryTotal = accessoryAddons.reduce((sum, a) => sum + (ACCESSORY_PRICES[a] ?? 0), 0);
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

// Create a Stripe Checkout session for a Rose Bouquets deposit
app.post("/make-server-7e4d3869/checkout/create-session", async (c) => {
  const body = await c.req.json();
  const computed = computeDeposit(body);
  if (!computed) return c.json({ error: "Invalid rose bouquet selection" }, 400);
  if (!body.origin || typeof body.origin !== "string") return c.json({ error: "Missing origin" }, 400);

  const { order, deposit, grandTotal } = computed;

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
      metadata: {
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
        date: body.date ?? "",
        timeSlot: body.timeSlot ?? "",
        notes: (body.notes ?? "").slice(0, 400),
        grandTotal: grandTotal.toFixed(2),
        deposit: deposit.toFixed(2),
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
