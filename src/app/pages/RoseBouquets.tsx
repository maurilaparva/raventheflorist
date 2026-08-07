import { useState } from "react";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import roseBouquetPhoto from "@/imports/flower.jpeg";

const BOUQUETS = [
  {
    id: 1,
    name: "Classic White Roses",
    desc: "50 premium white roses wrapped in soft ivory paper with a satin ribbon.",
    price: "$120",
    sizes: ["Small (25)", "Medium (50)", "Large (100)"],
    photo: "https://images.unsplash.com/photo-1548532928-b34e3be62f07?w=600&h=700&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Blush Pink Roses",
    desc: "Soft blush roses with baby's breath, wrapped in blush tissue.",
    price: "$95",
    sizes: ["Small (25)", "Medium (50)", "Large (100)"],
    photo: "https://images.unsplash.com/photo-1490750967868-88df5691cc35?w=600&h=700&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Red Rose Bouquet",
    desc: "Bold red roses — a timeless declaration. Wrapped in deep burgundy paper.",
    price: "$110",
    sizes: ["Small (25)", "Medium (50)", "Large (100)"],
    photo: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&h=700&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Mixed Rose Garden",
    desc: "A vibrant mix of cream, blush, coral, and red roses with eucalyptus.",
    price: "$135",
    sizes: ["Small (25)", "Medium (50)", "Large (100)"],
    photo: roseBouquetPhoto,
  },
];

export default function RoseBouquets() {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", date: "", size: "", notes: "" });

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-6 md:px-16 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem" }}>
          Raven the Florist
        </span>
        <div className="w-24" />
      </div>

      {/* Hero */}
      <div className="pt-20 px-8 md:px-16 pb-14 border-b border-border">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-10 mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
          Book Now
        </p>
        <h1 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
          Rose Bouquets
        </h1>
        <p className="text-muted-foreground font-light max-w-lg">
          Handcrafted rose bouquets for every occasion. Select a style below and fill out the booking form — we'll confirm within 24 hours.
        </p>
      </div>

      {/* Bouquet grid */}
      <div className="px-8 md:px-16 py-16">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-8" style={{ fontFamily: "'DM Mono', monospace" }}>
          Choose your bouquet
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {BOUQUETS.map((b) => (
            <div
              key={b.id}
              onClick={() => setSelected(b.id)}
              className={`group cursor-pointer border-2 transition-all duration-200 ${
                selected === b.id ? "border-primary" : "border-transparent"
              }`}
            >
              <div className="relative overflow-hidden bg-secondary aspect-[3/4]">
                <img
                  src={typeof b.photo === "string" ? b.photo : undefined}
                  {...(typeof b.photo !== "string" ? { src: b.photo as unknown as string } : {})}
                  alt={b.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {selected === b.id && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs px-2 py-1" style={{ fontFamily: "'DM Mono', monospace" }}>
                    Selected
                  </div>
                )}
              </div>
              <div className="pt-4 px-1">
                <h3 className="text-lg mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>{b.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{b.desc}</p>
                <p className="text-sm font-medium">From {b.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Booking form */}
        <div className="max-w-2xl border-t border-border pt-14">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>
            Booking Details
          </p>
          <h2 className="text-3xl mb-8" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
            {selected ? `Booking: ${BOUQUETS.find(b => b.id === selected)?.name}` : "Select a bouquet above to continue"}
          </h2>

          {submitted ? (
            <div className="py-10">
              <p className="text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Thank you!</p>
              <p className="text-muted-foreground font-light">Your booking request has been received. We'll be in touch within 24 hours to confirm.</p>
            </div>
          ) : (
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Your name</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="Jasmine Williams"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Email address</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
                    placeholder="jasmine@example.com"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Desired date</label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                    className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">Bouquet size</label>
                  <select
                    required
                    value={form.size}
                    onChange={e => setForm({ ...form, size: e.target.value })}
                    className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors"
                  >
                    <option value="">Select a size</option>
                    <option>Small (25 stems)</option>
                    <option>Medium (50 stems)</option>
                    <option>Large (100 stems)</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Special requests or notes</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={e => setForm({ ...form, notes: e.target.value })}
                  className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                  placeholder="Color preferences, ribbon style, delivery address..."
                />
              </div>
              <button
                type="submit"
                disabled={!selected}
                className="self-start bg-primary text-primary-foreground px-10 py-3.5 text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={14} />
                Submit Booking
              </button>
              {!selected && (
                <p className="text-xs text-muted-foreground">Please select a bouquet above before submitting.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
