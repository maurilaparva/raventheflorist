import { useState } from "react";
import { Link } from "react-router";
import { MessageCircle, Menu, X, ArrowRight, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import heroPhoto from "@/imports/IMG_1994-1.png";
import roseBouquetPhoto from "@/imports/flower.jpeg";
import buildBouquetPhoto from "@/imports/IMG_3406.jpeg";
import eventPhoto from "@/imports/store.jpeg";

const NAV_LINKS = ["Home", "About", "Event Inquiry", "Policies", "Gallery"];

const COLLECTIONS = [
  {
    name: "Rose Bouquet",
    desc: "Handcrafted rose bouquets for every occasion",
    photo: roseBouquetPhoto,
  },
  {
    name: "Floral Basket",
    desc: "Beautiful baskets designed to make a lasting impression",
    photo: "https://images.unsplash.com/photo-1548532928-b34e3be62f07?w=500&h=600&fit=crop&auto=format",
  },
  {
    name: "Build Your Own Bouquet",
    desc: "Design a one-of-a-kind bouquet that's uniquely yours",
    photo: buildBouquetPhoto,
  },
  {
    name: "Event",
    desc: "Custom floral arrangements for unforgettable celebrations",
    photo: eventPhoto,
  },
];

const TESTIMONIALS = [
  {
    name: "Clara M.",
    text: "The arrangement for our dinner party was breathtaking. Guests kept asking where it came from. I've never seen anything so thoughtfully composed.",
    occasion: "Dinner Party",
  },
  {
    name: "James & Priya",
    text: "Our wedding flowers were everything we dreamed of and more. The team listened carefully and translated our vision into something magical.",
    occasion: "Wedding",
  },
  {
    name: "Sophie L.",
    text: "I order a weekly subscription and it genuinely lifts my whole week. Each bouquet feels like a small gift to myself.",
    occasion: "Weekly Subscription",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── PROMO BANNER ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border py-2 px-4 flex items-center justify-center gap-2">
        <span className="text-accent text-sm">🌿</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.8rem" }} className="text-foreground">
          30% off your first order —
        </span>
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>
          use code
        </span>
        <span className="text-xs tracking-[0.2em] uppercase text-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
          FIRSTBLOOM
        </span>
      </div>

      {/* ── NAV ── */}
      <nav className="fixed top-[37px] left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-background/90 backdrop-blur-sm border-b border-border">
        <a href="#" className="flex flex-col items-center leading-none">
          <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.1rem", letterSpacing: "0.05em", opacity: 0.7, lineHeight: 1 }}>Raven</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "0.95rem", letterSpacing: "0.28em", textTransform: "uppercase", lineHeight: 1.2 }}>The Florist</span>
          <span style={{
            display: "block",
            height: "1px",
            background: "linear-gradient(to right, transparent, currentColor 30%, currentColor 70%, transparent)",
            width: "120%",
            marginTop: "4px",
            opacity: 0.3
          }} />
        </a>

        <ul className="hidden md:flex gap-10 items-center">
          <li className="relative">
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Book Arrangements
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform duration-200 ${shopOpen ? "rotate-180" : ""}`}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {shopOpen && (
              <div className="absolute top-full left-0 mt-3 bg-background border border-border shadow-sm min-w-[200px] z-50">
                {[
                  ["Mix Bouquets", "#mix-bouquets"],
                  ["Floral Baskets", "#mini-baskets"],
                  ["Build Your Bouquet", "#home"],
                ].map(([label, href]) => (
                  <a
                    key={label as string}
                    href={href as string}
                    onClick={() => setShopOpen(false)}
                    className="block px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border-b border-border last:border-0"
                  >
                    {label}
                  </a>
                ))}
                <Link
                  to="/rose-bouquets"
                  onClick={() => setShopOpen(false)}
                  className="block px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  Rose Bouquets
                </Link>
              </div>
            )}
          </li>

          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground text-sm px-5 py-2.5 hover:bg-primary/90 transition-colors">
            <MessageCircle size={14} />
            Contact
          </button>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-20 px-8 flex flex-col gap-6 overflow-y-auto">
          <div className="border-b border-border pb-4">
            <p className="text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Book Arrangements</p>
            <div className="flex flex-col gap-2 pl-4">
              {["Mix Bouquets", "Floral Baskets", "Build Your Bouquet"].map((item) => (
                <a key={item} href="#home" className="text-base text-muted-foreground" onClick={() => setMenuOpen(false)}>{item}</a>
              ))}
              <Link to="/rose-bouquets" className="text-base text-muted-foreground" onClick={() => setMenuOpen(false)}>Rose Bouquets</Link>
            </div>
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="text-2xl border-b border-border pb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="mt-4 bg-primary text-primary-foreground py-4 flex items-center justify-center gap-2">
            <MessageCircle size={16} />
            Contact
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative pt-28 min-h-screen flex items-center justify-center overflow-hidden">
        <ImageWithFallback
          src={heroPhoto}
          alt="Woman holding a stunning bouquet of white roses at golden hour"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "50% 15%" }}
        />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 45%, rgba(248,249,246,0.2) 75%, rgba(248,249,246,0.5) 100%)"
        }} />
        <div className="absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(to bottom, rgba(248,249,246,0.3), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(to top, rgba(248,249,246,0.3), transparent)" }} />
        <div className="absolute inset-y-0 left-0 w-24" style={{ background: "linear-gradient(to right, rgba(248,249,246,0.25), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-24" style={{ background: "linear-gradient(to left, rgba(248,249,246,0.25), transparent)" }} />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          <p
            className="text-xs tracking-[0.4em] uppercase text-primary-foreground/70 mb-6"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Give Her Her Flowers
          </p>
          <h1
            className="text-6xl md:text-8xl leading-[1.02] mb-8 text-primary-foreground"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Arrangements<br />
            <em>for every</em><br />
            season
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#home"
              className="inline-flex items-center gap-2 bg-primary-foreground text-foreground px-8 py-4 text-sm hover:bg-primary-foreground/90 transition-colors"
            >
              Book Arrangements
              <ArrowRight size={14} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground px-8 py-4 text-sm hover:bg-primary-foreground/10 transition-colors"
            >
              Need Inspiration?
            </a>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS ── */}
      <section id="gallery" className="py-24 bg-secondary">
        <div className="px-8 md:px-16 mb-14">
          <p
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Raven the Florist
          </p>
          <h2
            className="text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Arrangements
          </h2>
        </div>

        <div className="px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {COLLECTIONS.map((col) => (
            <div key={col.name} className="group cursor-pointer">
              <div className="relative overflow-hidden bg-card aspect-[3/4] mb-4">
                <ImageWithFallback
                  src={col.photo}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={col.name === "Rose Bouquet" ? { objectPosition: "60% 40%" } : {}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                  <p className="font-medium mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {col.name}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 grid md:grid-cols-2 overflow-hidden">
        <div className="relative bg-secondary min-h-[400px] md:min-h-full">
          <img
            src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=900&fit=crop&auto=format"
            alt="Florist carefully arranging flowers in the studio"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="px-10 md:px-20 py-20 flex flex-col justify-center">
          <p
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            My Story
          </p>
          <h2
            className="text-4xl md:text-5xl leading-[1.1] mb-8"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Rooted in the <em>Pacific Northwest</em>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 font-light">
            Raven The Florist began in a small studio in Portland with a single conviction: flowers should tell the story of the land they come from. We work exclusively with independent growers within 200 miles, choosing varietals for their character rather than their shelf life.
          </p>
          <p className="text-muted-foreground leading-relaxed font-light">
            Each arrangement is composed by hand, never from a template. We follow the season, not a catalog — which means what we make in July looks and feels entirely different from what we make in November.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
            {[
              ["Farm-direct", "All flowers sourced within 200 miles"],
              ["Zero waste", "Trimmings composted or donated"],
              ["Seasonal only", "No imported out-of-season stems"],
              ["Carbon neutral", "Deliveries offset since 2021"],
            ].map(([title, desc]) => (
              <div key={title}>
                <p className="text-sm font-medium mb-1">{title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-8 md:px-16 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.25em] uppercase opacity-60 mb-10"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            What people say
          </p>

          <blockquote
            className="text-2xl md:text-3xl leading-relaxed mb-8 font-light"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "{TESTIMONIALS[activeTestimonial].text}"
          </blockquote>

          <p className="text-sm opacity-70 mb-1">{TESTIMONIALS[activeTestimonial].name}</p>
          <p className="text-xs opacity-50" style={{ fontFamily: "'DM Mono', monospace" }}>
            {TESTIMONIALS[activeTestimonial].occasion}
          </p>

          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeTestimonial ? "bg-primary-foreground w-6" : "bg-primary-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION BANNER ── */}
      <section className="py-20 px-8 md:px-16 bg-accent/20 border-y border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
          <div>
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              A weekly bouquet, delivered.
            </h2>
            <p className="text-muted-foreground font-light max-w-md">
              Subscribe and receive a fresh seasonal arrangement every Monday morning. Pause or cancel anytime.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm w-full md:w-auto">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-primary-foreground px-4 py-1 text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>Small</span>
              <span className="text-muted-foreground">Single stems & posies</span>
              <span className="ml-auto font-medium">$42 / wk</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-accent text-accent-foreground px-4 py-1 text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>Medium</span>
              <span className="text-muted-foreground">Full table arrangement</span>
              <span className="ml-auto font-medium">$68 / wk</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-secondary text-secondary-foreground border border-border px-4 py-1 text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>Large</span>
              <span className="text-muted-foreground">Statement showpiece</span>
              <span className="ml-auto font-medium">$95 / wk</span>
            </div>
            <button className="mt-2 bg-primary text-primary-foreground py-3 px-8 flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
              Start your subscription <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* ── EVENT INQUIRY ── */}
      <section id="event-inquiry" className="py-24 px-8 md:px-16 bg-secondary">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Event Inquiry
          </p>
          <h2
            className="text-4xl md:text-5xl leading-[1.1] mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            Let's make your event <em>unforgettable</em>
          </h2>
          <p className="text-muted-foreground font-light mb-12 max-w-xl">
            Whether it's an intimate dinner, a bridal shower, or a full wedding, Raven creates custom florals tailored to your vision. Fill out the form below and we'll be in touch within 48 hours.
          </p>

          <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Your name</label>
              <input type="text" className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Jasmine Williams" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Email address</label>
              <input type="email" className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="jasmine@example.com" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Event type</label>
              <select className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors text-foreground">
                <option value="">Select an event type</option>
                <option>Wedding</option>
                <option>Bridal Shower</option>
                <option>Birthday</option>
                <option>Baby Shower</option>
                <option>Corporate Event</option>
                <option>Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Event date</label>
              <input type="date" className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Estimated guest count</label>
              <input type="text" className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="e.g. 50–75 guests" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Approximate budget</label>
              <select className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors text-foreground">
                <option value="">Select a range</option>
                <option>Under $500</option>
                <option>$500 – $1,000</option>
                <option>$1,000 – $2,500</option>
                <option>$2,500 – $5,000</option>
                <option>$5,000+</option>
              </select>
            </div>
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Tell us about your vision</label>
              <textarea rows={4} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Colors, mood, inspiration, anything you'd like us to know..." />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="bg-primary text-primary-foreground px-10 py-3.5 text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                Submit Inquiry <ArrowRight size={14} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 grid md:grid-cols-2 gap-0">
        <div className="px-8 md:px-16 py-10 bg-secondary">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>
            Get in touch
          </p>
          <h2 className="text-4xl mb-8" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
            We'd love to<br />hear from you
          </h2>

          <div className="flex flex-col gap-5 mb-10">
            {[
              [MapPin, "128 NW Flanders St, Portland, OR 97209"],
              [Phone, "+1 (503) 842-0173"],
              [Mail, "hello@raventheflorist.com"],
            ].map(([Icon, text]) => (
              <div key={text as string} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon size={14} className="flex-shrink-0 text-accent" />
                {text as string}
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-xs text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Studio hours</p>
            <div className="text-sm grid grid-cols-2 gap-y-2 gap-x-8 max-w-xs">
              {[
                ["Mon – Fri", "8am – 6pm"],
                ["Saturday", "9am – 4pm"],
                ["Sunday", "Closed"],
              ].map(([day, hrs]) => (
                <>
                  <span key={day} className="text-muted-foreground">{day}</span>
                  <span key={hrs}>{hrs}</span>
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 md:px-16 py-10">
          {submitted ? (
            <div className="flex flex-col items-start justify-center h-full gap-4 py-20">
              <div className="text-3xl" style={{ fontFamily: "'Playfair Display', serif" }}>Thank you.</div>
              <p className="text-muted-foreground font-light">We received your message and will be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-4">
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>
                Send a message
              </p>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Your name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Sophie Laurent" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Email address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="sophie@example.com" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Message</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Tell us about the occasion, size, preferred colours..." />
              </div>
              <button type="submit" className="self-start bg-primary text-primary-foreground px-10 py-3.5 text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                Send message <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── POLICIES ── */}
      <section id="policies" className="py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
            Policies
          </p>
          <h2 className="text-4xl md:text-5xl mb-14" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
            Good to know
          </h2>

          <div className="flex flex-col divide-y divide-border">
            {[
              { title: "Orders & Lead Time", body: "Same-day orders are accepted until 10am for afternoon delivery. For custom or event arrangements, we ask for a minimum of 5 business days notice. Wedding and large-event florals require at least 4 weeks lead time." },
              { title: "Delivery", body: "We deliver within the Portland metro area Tuesday through Saturday. A flat delivery fee of $15 applies to all orders under $150. Orders over $150 receive complimentary delivery. We are not responsible for arrangements left unattended at the door." },
              { title: "Substitutions", body: "We work with what's in season and in bloom. If a specific stem is unavailable, we will substitute with something of equal or greater value that maintains the spirit of your arrangement. We will always notify you of any significant changes." },
              { title: "Cancellations & Refunds", body: "Orders cancelled more than 24 hours before the scheduled delivery date are eligible for a full refund. Cancellations within 24 hours are eligible for store credit only. Event and wedding deposits are non-refundable once florals have been sourced." },
              { title: "Care Instructions", body: "Trim stems at a 45° angle and place in fresh, cool water immediately upon receipt. Change the water every two days and keep arrangements away from direct sunlight and heat sources. Most arrangements last 5–10 days with proper care." },
              { title: "Allergies & Safety", body: "Some flowers and plants may be toxic to pets or cause allergic reactions. Please inform us of any known sensitivities when placing your order and we will do our best to accommodate. A full list of pet-safe options is available upon request." },
            ].map(({ title, body }) => (
              <div key={title} className="py-7 grid md:grid-cols-[220px_1fr] gap-4">
                <h3 className="text-base font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-primary-foreground py-16 px-8 md:px-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <p className="text-sm tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
              Raven The Florist
            </p>
            <p className="text-sm opacity-60 leading-relaxed max-w-xs font-light">
              Flowers for every woman who deserves them. Seasonal, considered, and entirely yours.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><Instagram size={16} /></a>
              <a href="#" className="opacity-60 hover:opacity-100 transition-opacity"><Facebook size={16} /></a>
            </div>
          </div>

          {[
            ["Shop", ["Fresh Arrangements", "Dried & Preserved", "Subscriptions", "Corporate", "Weddings"]],
            ["Studio", ["My Story", "Growers", "Press", "Careers", "Contact"]],
          ].map(([heading, links]) => (
            <div key={heading as string}>
              <p className="text-xs tracking-[0.2em] uppercase opacity-40 mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>
                {heading as string}
              </p>
              <ul className="flex flex-col gap-2">
                {(links as string[]).map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-40">© 2026 Raven The Florist. All rights reserved.</p>
          <p className="text-xs opacity-40">Portland, Oregon · hello@raventheflorist.com</p>
        </div>
      </footer>
    </div>
  );
}
