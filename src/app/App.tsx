import React, { useState } from "react";
import { MessageCircle, Menu, X, ArrowRight, ArrowLeft, Instagram, Facebook, ShoppingBag, Calendar, CreditCard, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import heroPhoto from "@/imports/IMG_1994-1.png";
import roseBouquetPhoto from "@/imports/flower.jpeg";
import buildBouquetPhoto from "@/imports/Untitled-4.jpeg";
import eventPhoto from "@/imports/store.jpeg";

type Page = "home" | "rose-bouquets" | "floral-basket" | "build-bouquet" | "policies" | "gallery" | "event-inquiry" | "contact";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Event Inquiry", "Policies", "Gallery"];

const COLLECTIONS = [
  { name: "Rose Bouquet", desc: "Handcrafted rose bouquets for every occasion", photo: roseBouquetPhoto, style: { objectPosition: "60% 40%" } },
  { name: "Floral Basket", desc: "Beautiful baskets designed to make a lasting impression", photo: "https://images.unsplash.com/photo-1548532928-b34e3be62f07?w=500&h=600&fit=crop&auto=format", style: {} },
  { name: "Build Your Own Bouquet", desc: "Design a one-of-a-kind bouquet that's uniquely yours", photo: buildBouquetPhoto, style: { objectPosition: "50% 100%" } },
  { name: "Event", desc: "Custom floral arrangements for unforgettable celebrations", photo: eventPhoto, style: {} },
];


// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  if (page === "rose-bouquets") {
    return <RoseBouquetsPage onBack={() => setPage("home")} onNavigateHome={(p) => setPage((p as Page) ?? "home")} />;
  }
  if (page === "floral-basket") {
    return <FloralBasketPage onBack={() => setPage("home")} onNavigateHome={() => setPage("home")} />;
  }
  if (page === "build-bouquet") {
    return <BuildBouquetPage onBack={() => setPage("home")} />;
  }
  if (page === "policies") {
    return <PoliciesPage onBack={() => setPage("home")} />;
  }
  if (page === "gallery") {
    return <GalleryPage onBack={() => setPage("home")} />;
  }
  if (page === "event-inquiry") {
    return <EventInquiryPage onBack={() => setPage("home")} />;
  }
  if (page === "contact") {
    return <ContactPage onBack={() => setPage("home")} />;
  }
  return <MainSite onNavigate={setPage} />;
}

// ─── MAIN SITE ────────────────────────────────────────────────────────────────

function MainSite({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* PROMO BANNER */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border py-2 px-4 flex items-center justify-center gap-2">
        <span className="text-accent text-sm">🌿</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.8rem" }} className="text-foreground">
          20% off your order —
        </span>
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>use code</span>
        <span className="text-xs tracking-[0.2em] uppercase text-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>BLOOMS</span>
      </div>

      {/* NAV */}
      <nav className="fixed top-[37px] left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-background/90 backdrop-blur-sm border-b border-border">
        <button onClick={() => { onNavigate("home"); window.scrollTo(0, 0); }} className="flex flex-col items-center leading-none">
          <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: "1.1rem", letterSpacing: "0.05em", opacity: 0.7, lineHeight: 1 }}>Raven</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "0.95rem", letterSpacing: "0.28em", textTransform: "uppercase", lineHeight: 1.2 }}>The Florist</span>
          <span style={{ display: "block", height: "1px", background: "linear-gradient(to right, transparent, currentColor 30%, currentColor 70%, transparent)", width: "120%", marginTop: "4px", opacity: 0.3 }} />
        </button>

        <ul className="hidden md:flex gap-10 items-center">
          <li>
            <button onClick={() => { onNavigate("home"); window.scrollTo(0, 0); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Home</button>
          </li>
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
                <button onClick={() => { setShopOpen(false); onNavigate("floral-basket"); }} className="block w-full text-left px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border-b border-border">
                  Floral Baskets
                </button>
                <button onClick={() => { setShopOpen(false); onNavigate("build-bouquet"); }} className="block w-full text-left px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  Build Your Bouquets
                </button>
                <button
                  onClick={() => { setShopOpen(false); onNavigate("rose-bouquets"); }}
                  className="block w-full text-left px-5 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  Rose Bouquets
                </button>
              </div>
            )}
          </li>
          {NAV_LINKS.map((link) => (
            <li key={link}>
              {link === "Policies" ? (
                <button onClick={() => onNavigate("policies")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{link}</button>
              ) : link === "Gallery" ? (
                <button onClick={() => onNavigate("gallery")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{link}</button>
              ) : link === "Event Inquiry" ? (
                <button onClick={() => onNavigate("event-inquiry")} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{link}</button>
              ) : (
                <a href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">{link}</a>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate("contact")} className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground text-sm px-5 py-2.5 hover:bg-primary/90 transition-colors">
            <MessageCircle size={14} />
            Contact
          </button>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-20 px-8 flex flex-col gap-6 overflow-y-auto">
          <button onClick={() => { setMenuOpen(false); onNavigate("home"); window.scrollTo(0, 0); }} className="text-2xl border-b border-border pb-4 text-left" style={{ fontFamily: "'Playfair Display', serif" }}>Home</button>
          <div className="border-b border-border pb-4">
            <p className="text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Book Arrangements</p>
            <div className="flex flex-col gap-2 pl-4">
              <button className="text-left text-base text-muted-foreground" onClick={() => { setMenuOpen(false); onNavigate("floral-basket"); }}>Floral Baskets</button>
              <button className="text-left text-base text-muted-foreground" onClick={() => { setMenuOpen(false); onNavigate("build-bouquet"); }}>Build Your Bouquets</button>
              <button onClick={() => { setMenuOpen(false); onNavigate("rose-bouquets"); }} className="text-left text-base text-muted-foreground">Rose Bouquets</button>
            </div>
          </div>
          {NAV_LINKS.map((link) => (
            link === "Policies" ? (
              <button key={link} onClick={() => { setMenuOpen(false); onNavigate("policies"); }} className="text-2xl border-b border-border pb-4 text-left" style={{ fontFamily: "'Playfair Display', serif" }}>{link}</button>
            ) : link === "Gallery" ? (
              <button key={link} onClick={() => { setMenuOpen(false); onNavigate("gallery"); }} className="text-2xl border-b border-border pb-4 text-left" style={{ fontFamily: "'Playfair Display', serif" }}>{link}</button>
            ) : link === "Event Inquiry" ? (
              <button key={link} onClick={() => { setMenuOpen(false); onNavigate("event-inquiry"); }} className="text-2xl border-b border-border pb-4 text-left" style={{ fontFamily: "'Playfair Display', serif" }}>{link}</button>
            ) : (
              <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-2xl border-b border-border pb-4" style={{ fontFamily: "'Playfair Display', serif" }} onClick={() => setMenuOpen(false)}>{link}</a>
            )
          ))}
          <button onClick={() => { setMenuOpen(false); onNavigate("contact"); }} className="mt-4 bg-primary text-primary-foreground py-4 flex items-center justify-center gap-2">
            <MessageCircle size={16} />Contact
          </button>
        </div>
      )}

      {/* HERO */}
      <section className="relative pt-28 min-h-screen flex items-center justify-center overflow-hidden">
        <ImageWithFallback src={heroPhoto} alt="Woman holding a bouquet" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "50% 15%" }} />
        <div className="absolute inset-0 bg-foreground/55" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(248,249,246,0.2) 75%, rgba(248,249,246,0.5) 100%)" }} />
        <div className="absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(to bottom, rgba(248,249,246,0.3), transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: "linear-gradient(to top, rgba(248,249,246,0.3), transparent)" }} />
        <div className="absolute inset-y-0 left-0 w-24" style={{ background: "linear-gradient(to right, rgba(248,249,246,0.25), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-24" style={{ background: "linear-gradient(to left, rgba(248,249,246,0.25), transparent)" }} />
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-primary-foreground/70 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Give Her Her Flowers</p>
          <h1 className="text-6xl md:text-8xl leading-[1.02] mb-8 text-primary-foreground" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
            Arrangements<br /><em>for every</em><br />season
          </h1>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => onNavigate("rose-bouquets")} className="inline-flex items-center gap-2 bg-primary-foreground text-foreground px-8 py-4 text-sm hover:bg-primary-foreground/90 transition-colors">
              Book Arrangements <ArrowRight size={14} />
            </button>
            <button onClick={() => onNavigate("gallery")} className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground px-8 py-4 text-sm hover:bg-primary-foreground/10 transition-colors">
              Need Inspiration?
            </button>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="gallery" className="py-24 bg-secondary">
        <div className="px-8 md:px-16 mb-14">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Raven the Florist</p>
          <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>Arrangements</h2>
        </div>
        <div className="px-8 md:px-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {COLLECTIONS.map((col) => {
            const dest: Page | null = col.name === "Rose Bouquet" ? "rose-bouquets" : col.name === "Floral Basket" ? "floral-basket" : col.name === "Build Your Own Bouquet" ? "build-bouquet" : null;
            return (
              <div key={col.name} className="group cursor-pointer" onClick={() => dest && onNavigate(dest)}>
                <div className="relative overflow-hidden bg-card aspect-[3/4] mb-4">
                  <ImageWithFallback src={col.photo} alt={col.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={col.style} />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                    <p className="font-medium mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{col.name}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center">{col.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 grid md:grid-cols-2 overflow-hidden">
        <div className="relative bg-secondary min-h-[400px] md:min-h-full">
          <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=900&fit=crop&auto=format" alt="Florist arranging flowers" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        <div className="px-10 md:px-20 py-20 flex flex-col justify-center">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>My Story</p>
          <h2 className="text-4xl md:text-5xl leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>The story behind <em>the stems</em></h2>
          <p className="text-muted-foreground leading-relaxed mb-6 font-light">This dream of creating flowers began with a vision of becoming a businesswoman and discovering what that path looked like for me. Along the way, floristry found me in a way I never expected. Looking back, flowers had always been a part of my life — I was constantly creating arrangements for close friends and family.</p>
          <p className="text-muted-foreground leading-relaxed font-light">What started as a simple passion grew into something much bigger. There is nothing more fulfilling than bringing joy, beauty, and love to life's special moments through handcrafted arrangements made with care and intention.</p>
        </div>
      </section>

      {/* SOCIAL MEDIA */}
      <section className="py-24 px-8 md:px-16 bg-primary text-primary-foreground">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.25em] uppercase opacity-60 mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Follow Along</p>
          <h2 className="text-4xl md:text-5xl mb-4 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
            Follow along on social
          </h2>
          <p className="text-sm opacity-70 font-light mb-14">Stay connected for behind-the-scenes, new arrangements, and inspiration.</p>

          <div className="flex justify-center gap-10">
            {/* Instagram */}
            <a href="https://www.instagram.com/raventheflorist?utm_source=qr" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-all duration-200 group">
              <div className="w-16 h-16 border border-primary-foreground/30 group-hover:border-primary-foreground flex items-center justify-center transition-colors">
                <Instagram size={28} />
              </div>
              <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Instagram</span>
            </a>

            {/* TikTok */}
            <a href="https://www.tiktok.com/@raventheflorist" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-all duration-200 group">
              <div className="w-16 h-16 border border-primary-foreground/30 group-hover:border-primary-foreground flex items-center justify-center transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/>
                </svg>
              </div>
              <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>TikTok</span>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/people/Raven-TheFlorist/pfbid0285g92SNHVsXpq8J8nzr6TthuCYo4is85vUXVJTDNTpcKLDKvzoXYvVjf9CoSaj6Yl/?mibextid=wwXIfr&rdid=dDSCXqEGrBfDr2Jf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F189ocTZCyJ%2F%3Fmibextid%3DwwXIfr" target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-all duration-200 group">
              <div className="w-16 h-16 border border-primary-foreground/30 group-hover:border-primary-foreground flex items-center justify-center transition-colors">
                <Facebook size={28} />
              </div>
              <span className="text-xs tracking-[0.15em] uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>Facebook</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

// ─── FLORAL BASKET PAGE ──────────────────────────────────────────────────────

const BASKET_OPTIONS = [
  { value: "small", label: "Small Basket", desc: "The perfect size for birthdays, thank you gifts, or just because. Includes 25 stems, premium greenery, and filler flowers. Choose 1–2 different flowers to create your basket.", price: "$65", stems: "25 stems" },
  { value: "medium", label: "Medium Basket", desc: "Fuller and designed with more texture and color. Includes 50 stems, premium greenery, and filler flowers. Choose 2–4 different flowers to create your basket.", price: "$110", stems: "50 stems" },
  { value: "large", label: "Large Basket", desc: "A statement arrangement perfect for every moment in life. Includes 75 stems, premium greenery, and filler flowers. Choose 4–6 different flowers to create your basket.", price: "$175", stems: "75 stems" },
  { value: "premium", label: "Premium Basket", desc: "A show-stopping luxury arrangement with premium blooms, lush greenery, and filler flowers throughout. Fully customizable — floral selection discussed during confirmation.", price: "$240", stems: "Custom" },
];

const BASKET_FLOWER_ADDONS = [
  { name: "Baby's Breath", price: 10 },
  { name: "Oriental Lilies", price: 20 },
  { name: "Spray Roses", price: 20 },
  { name: "Premium Gerbera", price: 15 },
  { name: "Snapdragons", price: 15 },
  { name: "Greenery", price: 5 },
];

const BASKET_COLORS = [
  "Red", "Deep Red", "Hot Pink", "Pink", "Magenta", "White", "Ivory",
  "Peach", "Orange", "Yellow", "Purple", "Lavender", "Sage", "Mixed",
];

const BASKET_TIMEFRAMES = [
  "Morning (9am – 12pm)",
  "Early Afternoon (12pm – 3pm)",
  "Late Afternoon (3pm – 6pm)",
  "Evening (6pm – 8pm)",
  "Flexible / Any Time",
];

function FloralBasketPage({ onBack, onNavigateHome }: { onBack: () => void; onNavigateHome: () => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [form, setForm] = useState({ name: "", email: "", phone: "", quantity: "", date: "", timeframe: "", notes: "" });
  const [inspoFiles, setInspoFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  function addInspoFiles(files: FileList | null) {
    if (!files) return;
    setInspoFiles((prev) => [...prev, ...Array.from(files).filter((f) => f.type.startsWith("image/"))]);
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Promo banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border py-2 px-4 flex items-center justify-center gap-2">
        <span className="text-accent text-sm">🌿</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.8rem" }} className="text-foreground">20% off your order —</span>
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>use code</span>
        <span className="text-xs tracking-[0.2em] uppercase text-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>BLOOMS</span>
      </div>

      {/* Top bar */}
      <div className="fixed top-[37px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-6 md:px-16 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Back to home
        </button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem" }}>Raven the Florist</span>
        <div className="w-32" />
      </div>

      <div className="pt-28 pb-24">

        {/* Hero */}
        <div className="bg-secondary px-8 md:px-16 py-16 mb-14 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Floral Basket Inquiry</p>
            <h1 className="text-5xl md:text-6xl mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
              Premium Floral <em>Baskets</em>
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed mb-4">
              Every floral basket is thoughtfully designed to reflect your unique vision. Each arrangement is fully customized, pricing varies based on your flower selections, basket size, design complexity, specialty materials, and the decorative elements required to bring your arrangement to life.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed">
              To receive a personalized quote, submit an inquiry with your preferred style, color palette, occasion, inspiration photos, and any special requests. Every basket is created one of a kind, tailored to your vision.
            </p>
          </div>
        </div>

        <div className="px-8 md:px-16">
          <div className="max-w-2xl mx-auto">

            {submitted ? (
              <div className="py-16 text-center">
                <p className="text-4xl mb-3" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>Your inquiry is in.</p>
                <p className="text-sm text-muted-foreground mb-6">Thank you for reaching out to Raven the Florist — can't wait to be in contact soon!</p>
                <p className="text-muted-foreground font-light max-w-md mx-auto mb-10">Every arrangement is crafted with intention. Expect to hear back within 24 hours with a personalized quote and all the details needed to bring your vision to life.</p>
                <div className="max-w-md mx-auto text-left border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>What Happens Next</p>
                  <div className="flex flex-col gap-5">
                    {[
                      { step: "01", title: "Expect to hear back", desc: "You'll be contacted via your preferred method — email or phone — to confirm your inquiry details and discuss your vision." },
                      { step: "02", title: "Your quote & order summary", desc: "A full order summary will be sent including your personalized quote and the balance for the service, payable via Zelle, Venmo, Apple Pay, or Cash App." },
                      { step: "03", title: "Confirm your timeframe", desc: "Your delivery or pick up window will be solidified so you know exactly when to expect your arrangement." },
                      { step: "04", title: "Questions along the way?", desc: "For any follow-up communication, reach out by email or by phone — available every step of the way." },
                    ].map(({ step, title, desc }) => (
                      <div key={step} className="flex gap-4">
                        <span className="text-xs text-muted-foreground/50 pt-0.5 flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>{step}</span>
                        <div>
                          <p className="text-sm font-medium mb-1">{title}</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{desc}{step === "04" && <> <a href="mailto:Raventheflorist@yahoo.com" className="text-foreground underline hover:text-primary transition-colors">Raventheflorist@yahoo.com</a></>}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-10">

                {/* Your Information */}
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Your Information</p>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">Your name</label>
                      <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Jasmine Williams" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">Contact via</span>
                        <div className="flex gap-1">
                          {(["email", "phone"] as const).map((m) => (
                            <button key={m} type="button" onClick={() => setContactMethod(m)} className={`px-3 py-1 text-xs border transition-colors ${contactMethod === m ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground"}`}>
                              {m === "email" ? "Email" : "Phone"}
                            </button>
                          ))}
                        </div>
                      </div>
                      {contactMethod === "email"
                        ? <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="jasmine@example.com" />
                        : <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="+1 (555) 000-0000" />
                      }
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Order Details</p>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">How many baskets are you inquiring about?</label>
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="e.g. 2"
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="bg-transparent border-b border-border pb-2 text-sm focus:outline-none focus:border-foreground transition-colors w-full"
                    />
                  </div>
                </div>

                {/* Date & Timeframe */}
                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Date & Timeframe</p>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">Desired date</label>
                      <div className="inline-flex items-center gap-2 border-b border-border pb-2 w-full">
                        <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
                        <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} min={new Date().toISOString().split("T")[0]} className="bg-transparent text-sm focus:outline-none flex-1 cursor-pointer" style={{ colorScheme: "light" }} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-muted-foreground">Preferred timeframe</label>
                      <div className="flex flex-wrap gap-2">
                        {BASKET_TIMEFRAMES.map((t) => (
                          <button key={t} type="button" onClick={() => setForm({ ...form, timeframe: t })}
                            className={`px-3 py-1.5 text-xs border transition-colors ${form.timeframe === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inspiration Photos */}
                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Inspiration Photos</p>
                  <p className="text-sm text-muted-foreground font-light mb-5">Share any photos that capture the look, feel, or colors you have in mind.</p>
                  <div className="flex flex-col gap-3">
                    <label
                      className={`flex flex-col items-center justify-center border-2 border-dashed px-6 py-10 cursor-pointer transition-colors ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-foreground/40"}`}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setDragging(false); addInspoFiles(e.dataTransfer.files); }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground mb-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <p className="text-sm text-muted-foreground mb-1">Drag & drop or <span className="text-foreground underline">click to browse</span></p>
                      <p className="text-xs text-muted-foreground/60">JPG, PNG, HEIC — any size</p>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addInspoFiles(e.target.files)} />
                    </label>
                    {inspoFiles.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {inspoFiles.map((f, i) => (
                          <div key={i} className="relative group aspect-square bg-secondary overflow-hidden">
                            <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => setInspoFiles(inspoFiles.filter((_, j) => j !== i))}
                              className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <X size={14} className="text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Details */}
                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Additional Details</p>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Special requests or notes <span className="opacity-50">(optional)</span></label>
                    <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Occasion, preferred flowers, color palette, basket size ideas, anything else you'd like us to know..." />
                  </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col gap-3">
                  <button type="submit" className="self-start bg-primary text-primary-foreground px-10 py-3.5 text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    Submit Inquiry <ArrowRight size={14} />
                  </button>
                  <p className="text-xs text-muted-foreground">Every arrangement is crafted with intention. Expect to hear back within 24 hours with a personalized quote and all the details needed to bring your vision to life.</p>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BUILD YOUR BOUQUET PAGE ─────────────────────────────────────────────────

const BOUQUET_FLOWERS = [
  "Roses", "Spray Roses", "Ranunculus", "Peonies", "Tulips", "Lilies",
  "Sunflowers", "Dahlias", "Hydrangeas", "Lisianthus", "Carnations",
  "Gerbera Daisies", "Orchids", "Baby's Breath", "Wildflowers", "Mixed / Florist's Choice",
];

const BOUQUET_COLORS = [
  "White", "Ivory", "Blush", "Pink", "Hot Pink", "Red", "Burgundy",
  "Peach", "Orange", "Yellow", "Lavender", "Purple", "Blue", "Sage",
  "Greenery", "Mixed / Rainbow",
];

const BOUQUET_SIZES = [
  { value: "petite", label: "Petite", desc: "A sweet, compact arrangement", stems: "~15 stems", price: "$55" },
  { value: "standard", label: "Standard", desc: "Our most popular everyday bouquet", stems: "~30 stems", price: "$95" },
  { value: "grand", label: "Grand", desc: "A full, lush statement bouquet", stems: "~50 stems", price: "$150" },
  { value: "custom", label: "Custom", desc: "Something entirely your own — all details discussed upon booking", stems: "Your vision", price: "Inquiry" },
];

const WRAP_STYLES = ["Soft Paper Wrap", "Tissue & Ribbon", "Kraft Paper", "Satin Ribbon Only", "Special/Design Wrap", "No Preference"];

const BOUQUET_TIMEFRAMES = [
  "Morning (9am – 12pm)",
  "Early Afternoon (12pm – 3pm)",
  "Late Afternoon (3pm – 6pm)",
  "Evening (6pm – 8pm)",
  "Flexible / Any Time",
];

function BuildBouquetPage({ onBack }: { onBack: () => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", contactMethod: "email", quantity: "", date: "", timeframe: "", notes: "" });
  const [inspoFiles, setInspoFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  function addInspoFiles(files: FileList | null) {
    if (!files) return;
    setInspoFiles((prev) => [...prev, ...Array.from(files).filter((f) => f.type.startsWith("image/"))]);
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Promo banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border py-2 px-4 flex items-center justify-center gap-2">
        <span className="text-accent text-sm">🌿</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.8rem" }} className="text-foreground">20% off your order —</span>
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>use code</span>
        <span className="text-xs tracking-[0.2em] uppercase text-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>BLOOMS</span>
      </div>

      {/* Top bar */}
      <div className="fixed top-[37px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-6 md:px-16 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Back to home
        </button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem" }}>Raven the Florist</span>
        <div className="w-32" />
      </div>

      <div className="pt-28 pb-24">

        {/* Hero */}
        <div className="bg-secondary px-8 md:px-16 py-16 mb-14 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Custom Bouquet</p>
            <h1 className="text-5xl md:text-6xl mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
              Build Your Own <em>Bouquet</em>
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              Looking for 100+ roses, a mixed bouquet, or something completely one of a kind? This is the page for you. Get creative — share your vision and inspiration, and it will be brought to life. Submit your inquiry below and expect a response within 24 hours.
            </p>
          </div>
        </div>

        <div className="px-8 md:px-16">
          <div className="max-w-2xl mx-auto">

            {submitted ? (
              <div className="py-16 text-center">
                <p className="text-4xl mb-3" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>Your inquiry is in.</p>
                <p className="text-sm text-muted-foreground mb-6">Thank you for reaching out to Raven the Florist — can't wait to be in contact soon!</p>
                <p className="text-muted-foreground font-light max-w-md mx-auto mb-10">Your inquiry has been received. Details will be reviewed and a response sent within 24 hours to confirm and discuss next steps.</p>
                <div className="max-w-md mx-auto text-left border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>What Happens Next</p>
                  <div className="flex flex-col gap-5">
                    {[
                      { step: "01", title: "Expect to hear back", desc: "You'll be contacted via your preferred method — email or phone — to confirm your inquiry details and discuss your vision." },
                      { step: "02", title: "Your quote & order summary", desc: "A full order summary will be sent including your personalized quote and the balance for the service, payable via Zelle, Venmo, Apple Pay, or Cash App." },
                      { step: "03", title: "Confirm your timeframe", desc: "Your delivery or pick up window will be solidified so you know exactly when to expect your arrangement." },
                      { step: "04", title: "Questions along the way?", desc: "For any follow-up communication, reach out by email or by phone — available every step of the way." },
                    ].map(({ step, title, desc }) => (
                      <div key={step} className="flex gap-4">
                        <span className="text-xs text-muted-foreground/50 pt-0.5 flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>{step}</span>
                        <div>
                          <p className="text-sm font-medium mb-1">{title}</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{desc}{step === "04" && <> <a href="mailto:Raventheflorist@yahoo.com" className="text-foreground underline hover:text-primary transition-colors">Raventheflorist@yahoo.com</a></>}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-10">

                {/* Contact info */}
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Your Information</p>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">Your name</label>
                      <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Jasmine Williams" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">Contact via</span>
                        <div className="flex gap-1">
                          {(["email", "phone"] as const).map((m) => (
                            <button key={m} type="button" onClick={() => setForm({ ...form, contactMethod: m })} className={`px-3 py-1 text-xs border transition-colors ${form.contactMethod === m ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground"}`}>
                              {m === "email" ? "Email" : "Phone"}
                            </button>
                          ))}
                        </div>
                      </div>
                      {form.contactMethod === "email"
                        ? <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="jasmine@example.com" />
                        : <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="+1 (555) 000-0000" />
                      }
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Order Details</p>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">How many bouquets are you inquiring about?</label>
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="e.g. 1"
                      value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="bg-transparent border-b border-border pb-2 text-sm focus:outline-none focus:border-foreground transition-colors w-full"
                    />
                  </div>
                </div>

                {/* Date & Timeframe */}
                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Date & Timeframe</p>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">Desired date</label>
                      <div className="inline-flex items-center gap-2 border-b border-border pb-2 w-full">
                        <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
                        <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} min={new Date().toISOString().split("T")[0]} className="bg-transparent text-sm focus:outline-none flex-1 cursor-pointer" style={{ colorScheme: "light" }} />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-muted-foreground">Preferred timeframe</label>
                      <div className="flex flex-wrap gap-2">
                        {BOUQUET_TIMEFRAMES.map((t) => (
                          <button key={t} type="button" onClick={() => setForm({ ...form, timeframe: t })}
                            className={`px-3 py-1.5 text-xs border transition-colors ${form.timeframe === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inspiration photos */}
                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Inspiration Photos</p>
                  <p className="text-sm text-muted-foreground font-light mb-5">Share any photos that capture the look, feel, or colors you have in mind.</p>
                  <div className="flex flex-col gap-3">
                    <label
                      className={`flex flex-col items-center justify-center border-2 border-dashed px-6 py-10 cursor-pointer transition-colors ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-foreground/40"}`}
                      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={(e) => { e.preventDefault(); setDragging(false); addInspoFiles(e.dataTransfer.files); }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground mb-3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <p className="text-sm text-muted-foreground mb-1">Drag & drop or <span className="text-foreground underline">click to browse</span></p>
                      <p className="text-xs text-muted-foreground/60">JPG, PNG, HEIC — any size</p>
                      <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addInspoFiles(e.target.files)} />
                    </label>
                    {inspoFiles.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {inspoFiles.map((f, i) => (
                          <div key={i} className="relative group aspect-square bg-secondary overflow-hidden">
                            <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => setInspoFiles(inspoFiles.filter((_, j) => j !== i))}
                              className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <X size={14} className="text-white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional notes */}
                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Additional Details</p>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Special requests or notes <span className="opacity-50">(optional)</span></label>
                    <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Flower preferences, colors, occasion, anything else you'd like us to know..." />
                  </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col gap-3">
                  <button type="submit" className="self-start bg-primary text-primary-foreground px-10 py-3.5 text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
                    Submit Bouquet Inquiry <ArrowRight size={14} />
                  </button>
                  <p className="text-xs text-muted-foreground">Every arrangement is crafted with intention. Expect to hear back within 24 hours with a personalized quote and all the details needed to bring your vision to life.</p>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GALLERY PAGE ────────────────────────────────────────────────────────────

const API = "https://lxifagwspshizosfbmev.supabase.co/functions/v1/server/make-server-7e4d3869/gallery";

function GalleryPage({ onBack }: { onBack: () => void }) {
  const [photos, setPhotos] = useState<{ name: string; url: string }[]>([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then((d) => { setPhotos(d.photos ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function addFiles(files: FileList | null) {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    setUploading(true);
    for (const file of valid) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`${API}/upload`, { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) setPhotos((prev) => [{ name: data.name, url: data.url }, ...prev]);
    }
    setUploading(false);
  }

  async function removePhoto(name: string) {
    await fetch(`${API}/${encodeURIComponent(name)}`, { method: "DELETE" });
    setPhotos((prev) => prev.filter((p) => p.name !== name));
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Promo banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border py-2 px-4 flex items-center justify-center gap-2">
        <span className="text-accent text-sm">🌿</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.8rem" }}>20% off your order —</span>
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>use code</span>
        <span className="text-xs tracking-[0.2em] uppercase text-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>BLOOMS</span>
      </div>

      {/* Top bar */}
      <div className="fixed top-[37px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-6 md:px-16 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} />
          Back to home
        </button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem" }}>Raven the Florist</span>
        <div className="w-32" />
      </div>

      <div className="pt-28 px-8 md:px-16 pb-24">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-10 mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Portfolio</p>
          <h1 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>Gallery</h1>
          <p className="text-muted-foreground font-light mb-12 max-w-lg">A look at the arrangements, moments, and florals that make up our work.</p>

          {/* Upload area */}
          <label
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-none px-8 py-12 mb-12 cursor-pointer transition-colors ${dragging ? "border-primary bg-primary/5" : uploading ? "border-primary/50 bg-primary/5" : "border-border hover:border-foreground/40"}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className={`mb-4 transition-colors ${uploading ? "text-primary" : "text-muted-foreground"}`}>
              <rect x="3" y="3" width="18" height="18" rx="0" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            {uploading ? (
              <p className="text-sm text-primary font-medium">Uploading...</p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-1">Drag & drop photos here, or <span className="text-foreground underline">click to browse</span></p>
                <p className="text-xs text-muted-foreground/60">JPG, PNG, WEBP — any size</p>
              </>
            )}
            <input type="file" accept="image/*" multiple className="hidden" disabled={uploading} onChange={(e) => addFiles(e.target.files)} />
          </label>

          {/* Photo grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm font-light">Loading gallery...</p>
            </div>
          ) : photos.length === 0 ? (
            <div className="text-center py-20 border border-border">
              <p className="text-muted-foreground text-sm font-light">No photos yet — upload some above to build your gallery.</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {photos.map((photo) => (
                <div key={photo.name} className="relative group break-inside-avoid">
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full object-cover block"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-center justify-center">
                    <button
                      onClick={() => removePhoto(photo.name)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-background text-foreground p-2 hover:bg-primary hover:text-primary-foreground"
                      title="Remove photo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── EVENT INQUIRY PAGE ──────────────────────────────────────────────────────

function EventInquiryPage({ onBack }: { onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", eventType: "", eventDate: "", consultDate: "", consultTime: "", guests: "", budget: "", venue: "", vision: "" });
  const [inspoFiles, setInspoFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  function addInspoFiles(files: FileList | null) {
    if (!files) return;
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    setInspoFiles((prev) => [...prev, ...valid]);
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Promo banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border py-2 px-4 flex items-center justify-center gap-2">
        <span className="text-accent text-sm">🌿</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.8rem" }}>20% off your order —</span>
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>use code</span>
        <span className="text-xs tracking-[0.2em] uppercase text-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>BLOOMS</span>
      </div>

      {/* Top bar */}
      <div className="fixed top-[37px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-6 md:px-16 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} />
          Back to home
        </button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem" }}>Raven the Florist</span>
        <div className="w-32" />
      </div>

      <div className="pt-28 pb-24">

        {/* Hero banner */}
        <div className="bg-primary text-primary-foreground px-8 md:px-16 py-16 mb-14 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.3em] uppercase opacity-60 mb-5" style={{ fontFamily: "'DM Mono', monospace" }}>Free Consultation</p>
            <h1 className="text-5xl md:text-6xl mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
              Event Inquiry <em>&amp; Consultation</em>
            </h1>
            <p className="opacity-80 font-light text-base leading-relaxed">
              Every great event starts with a conversation. Book a free one-on-one video consultation to talk through your vision, floral needs, and how to bring it all to life.
            </p>
            {/* Consultation details chips */}
            <div className="flex flex-wrap justify-center gap-3 mt-10 mb-8">
              {[
                { icon: "📹", label: "Video Chat" },
                { icon: "🕐", label: "Up to 1 Hour" },
                { icon: "✨", label: "Completely Free" },
                { icon: "💐", label: "All Event Types" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 border border-primary-foreground/30 px-4 py-2 text-sm">
                  <span>{icon}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs tracking-wide">{label}</span>
                </div>
              ))}
            </div>
            {/* 4-week notice */}
            <div className="border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-4 max-w-xl mx-auto text-left">
              <p className="text-sm font-medium mb-1">Planning a large event?</p>
              <p className="text-sm opacity-75 font-light leading-relaxed">For weddings, large celebrations, and multi-piece event setups, please book your consultation <span className="font-medium opacity-100">at least 4 weeks in advance.</span> This gives the time needed to fully understand your vision, source the right florals, and bring every detail of your dream event to life.</p>
            </div>
          </div>
        </div>

        <div className="px-8 md:px-16">
          <div className="max-w-3xl mx-auto">

            {/* What to expect */}
            <div className="grid md:grid-cols-3 gap-6 mb-16 pb-16 border-b border-border">
              {[
                { step: "01", title: "Submit the form", body: "Fill out the inquiry below with your event details and preferred consultation time." },
                { step: "02", title: "Get confirmed", body: "A confirmation will be sent within 48 hours with a video chat link for your scheduled time." },
                { step: "03", title: "Meet on video", body: "Hop on a video call — up to one hour — to discuss your event, florals, vision, and next steps." },
              ].map(({ step, title, body }) => (
                <div key={step}>
                  <p className="text-xs text-muted-foreground mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>{step}</p>
                  <h3 className="text-base font-medium mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            {submitted ? (
              <div className="py-10 text-center">
                <p className="text-4xl mb-3" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>You're all set.</p>
                <p className="text-sm text-muted-foreground mb-6">Thank you for reaching out to Raven the Florist — can't wait to be in contact soon!</p>
                <p className="text-muted-foreground font-light max-w-md mx-auto mb-10">Your inquiry has been received. A confirmation with your video chat link will be sent within 48 hours.</p>
                <div className="max-w-md mx-auto text-left border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>What Happens Next</p>
                  <div className="flex flex-col gap-5">
                    {[
                      { step: "01", title: "Expect to hear back", desc: "You'll be contacted via your preferred method — email or phone — to confirm your consultation details and receive your video chat link." },
                      { step: "02", title: "Your consultation", desc: "A virtual meeting of up to one hour will be scheduled to talk through your event vision, floral needs, color palette, and any details that matter most." },
                      { step: "03", title: "Your quote & order summary", desc: "Following the consultation, a personalized quote and full order summary will be sent with the balance expected, payable via Zelle, Venmo, Apple Pay, or Cash App." },
                      { step: "04", title: "Questions along the way?", desc: "For any follow-up communication, reach out by email or by phone — available every step of the way." },
                    ].map(({ step, title, desc }) => (
                      <div key={step} className="flex gap-4">
                        <span className="text-xs text-muted-foreground/50 pt-0.5 flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>{step}</span>
                        <div>
                          <p className="text-sm font-medium mb-1">{title}</p>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed">{desc}{step === "04" && <> <a href="mailto:Raventheflorist@yahoo.com" className="text-foreground underline hover:text-primary transition-colors">Raventheflorist@yahoo.com</a></>}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-8">

                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Your Information</p>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">Your name</label>
                      <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Jasmine Williams" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Email address</label>
                        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="jasmine@example.com" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Phone number <span className="opacity-50">(optional)</span></label>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="+1 (555) 000-0000" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>Event Details</p>
                  <div className="flex flex-col gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Event type</label>
                        <div className="relative">
                          <select required value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className="w-full appearance-none border-b border-border bg-transparent py-2.5 pr-8 text-sm focus:outline-none focus:border-foreground transition-colors cursor-pointer">
                            <option value="">Select an event type</option>
                            {["Wedding", "Bridal Shower", "Baby Shower", "Birthday", "Anniversary", "Corporate Event", "Graduation", "Other"].map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Event date</label>
                        <div className="inline-flex items-center gap-2 border-b border-border pb-2 w-full">
                          <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
                          <input required type="date" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} min={new Date().toISOString().split("T")[0]} className="bg-transparent text-sm focus:outline-none flex-1 cursor-pointer" style={{ colorScheme: "light" }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">Approximate budget</label>
                      <div className="relative">
                        <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full appearance-none border-b border-border bg-transparent py-2.5 pr-8 text-sm focus:outline-none focus:border-foreground transition-colors cursor-pointer">
                          <option value="">Select a range</option>
                          {["Under $500", "$500 – $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000+"].map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">Venue <span className="opacity-50">(if known)</span></label>
                      <input type="text" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="e.g. The Grand Ballroom, Minneapolis" />
                    </div>

                    {/* Floral color palette */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-muted-foreground">Floral color palette <span className="opacity-50">(select all that apply)</span></label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "White", swatch: "#f5f5f0" },
                          { label: "Ivory", swatch: "#fffff0" },
                          { label: "Black", swatch: "#1a1a1a" },
                          { label: "Blush", swatch: "#f7c5c5" },
                          { label: "Pink", swatch: "#f48fb1" },
                          { label: "Hot Pink", swatch: "#e91e8c" },
                          { label: "Red", swatch: "#c0392b" },
                          { label: "Burgundy", swatch: "#800020" },
                          { label: "Peach", swatch: "#ffcba4" },
                          { label: "Orange", swatch: "#e67e22" },
                          { label: "Yellow", swatch: "#f9e04b" },
                          { label: "Lavender", swatch: "#c3a6d8" },
                          { label: "Purple", swatch: "#8e44ad" },
                          { label: "Blue", swatch: "#5b9bd5" },
                          { label: "Sage", swatch: "#8fac8f" },
                          { label: "Greenery", swatch: "#4caf50" },
                          { label: "Mixed / Rainbow", swatch: "linear-gradient(135deg,#f48fb1,#f9e04b,#5b9bd5)" },
                        ].map(({ label, swatch }) => {
                          const selected = form.vision.includes(`[color:${label}]`);
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => {
                                const tag = `[color:${label}]`;
                                setForm((f) => ({
                                  ...f,
                                  vision: selected ? f.vision.replace(tag, "").trim() : (f.vision + " " + tag).trim(),
                                }));
                              }}
                              className={`flex items-center gap-2 px-3 py-1.5 text-xs border transition-colors ${selected ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:border-foreground"}`}
                            >
                              <span className="w-3 h-3 rounded-full flex-shrink-0 border border-border/50" style={{ background: swatch }} />
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

<div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">Tell us about your vision</label>
                      <textarea rows={4} value={form.vision.replace(/\[(color|piece):[^\]]+\]/g, "").trim()} onChange={(e) => {
                        const tags = (form.vision.match(/\[(color|piece):[^\]]+\]/g) ?? []).join(" ");
                        setForm({ ...form, vision: (e.target.value + " " + tags).trim() });
                      }} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Mood, theme, any important details you'd like to share..." />
                    </div>

                    {/* Special requests / venue restrictions */}
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">Special requests or venue restrictions <span className="opacity-50">(optional)</span></label>
                      <textarea rows={3} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="e.g. no open flames, allergy restrictions, scent-free venue, outdoor space considerations..." />
                    </div>

                    {/* Inspo photo upload */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-muted-foreground">Inspiration photos <span className="opacity-50">(optional)</span></label>
                      <label
                        className={`flex flex-col items-center justify-center border-2 border-dashed px-6 py-8 cursor-pointer transition-colors ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-foreground/40"}`}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setDragging(false); addInspoFiles(e.dataTransfer.files); }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                        <p className="text-sm text-muted-foreground mb-0.5">Drag & drop or <span className="text-foreground underline">click to browse</span></p>
                        <p className="text-xs text-muted-foreground/60">JPG, PNG, WEBP — share anything that inspires you</p>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => addInspoFiles(e.target.files)} />
                      </label>
                      {inspoFiles.length > 0 && (
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-1">
                          {inspoFiles.map((f, i) => (
                            <div key={i} className="relative group aspect-square bg-secondary overflow-hidden">
                              <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setInspoFiles(inspoFiles.filter((_, j) => j !== i))}
                                className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                              >
                                <X size={14} className="text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>Schedule Your Consultation</p>
                  <p className="text-sm text-muted-foreground font-light mb-6">Choose a preferred date and time for your free video chat. All consultations are up to one hour.</p>
                  <div className="bg-secondary/60 border border-border p-6 mb-6">
                    <div className="flex flex-wrap gap-3 mb-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Free of charge</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Held via video chat</span>
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Standard timing: up to 1 hour</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Preferred consultation date</label>
                        <div className="inline-flex items-center gap-2 border-b border-border pb-2 w-full">
                          <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
                          <input required type="date" value={form.consultDate} onChange={(e) => setForm({ ...form, consultDate: e.target.value })} min={new Date().toISOString().split("T")[0]} className="bg-transparent text-sm focus:outline-none flex-1 cursor-pointer" style={{ colorScheme: "light" }} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-muted-foreground">Preferred time</label>
                        <div className="relative">
                          <select required value={form.consultTime} onChange={(e) => setForm({ ...form, consultTime: e.target.value })} className="w-full appearance-none border-b border-border bg-transparent py-2.5 pr-8 text-sm focus:outline-none focus:border-foreground transition-colors cursor-pointer">
                            <option value="">Select a time</option>
                            {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((t) => (
                              <option key={t}>{t}</option>
                            ))}
                          </select>
                          <ChevronDown size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="self-start bg-primary text-primary-foreground px-10 py-3.5 text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors">
                  Book Free Consultation <ArrowRight size={14} />
                </button>
                <p className="text-xs text-muted-foreground -mt-4">A video chat link will be sent to your email within 48 hours of submitting.</p>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────

function ContactPage({ onBack }: { onBack: () => void }) {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const contactSections = [
    {
      title: "Email",
      items: [
        {
          heading: "General Inquiries & Orders",
          body: "For all questions, booking requests, and order inquiries, reach out directly via email. A response can be expected within 24 hours.",
          email: true,
        },
      ],
    },
    {
      title: "Social Media",
      items: [
        {
          heading: "Facebook",
          body: "Follow along for the latest arrangements, seasonal specials, and availability updates.",
          link: "https://www.facebook.com/people/Raven-TheFlorist/61567894693478/",
          linkLabel: "Raven The Florist on Facebook",
        },
        {
          heading: "Instagram",
          body: "Tag your arrangements or send a DM for a quick question.",
          link: "https://www.instagram.com/raventheflorist",
          linkLabel: "@raventheflorist",
        },
      ],
    },
    {
      title: "What to Expect",
      items: [
        {
          heading: "Response Time",
          body: "All inquiries are typically responded to within 24 hours. For time-sensitive requests, include your needed date in the subject line.",
        },
        {
          heading: "Placing an Order",
          body: "Submit an inquiry through the Book Arrangements or Event Inquiry pages. After your request is reviewed, you'll receive a follow-up with pricing and order details.",
        },
        {
          heading: "Questions About Policies",
          body: "For cancellation, deposit, or delivery questions, visit the Policies page for full details.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs tracking-widest uppercase font-medium">
        20% off your order — use code BLOOMS
      </div>

      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
          ← Back
        </button>
        <span className="font-display text-lg tracking-wide">Raven The Florist</span>
        <div className="w-16" />
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Page Title */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl mb-5">Contact</h1>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            Whether it&apos;s a quick question or a full event inquiry, all the ways to connect are listed below.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-14">
          {contactSections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-xl mb-6 pb-3 border-b border-border">{section.title}</h2>
              <div className="grid gap-6">
                {section.items.map((item) => (
                  <div key={item.heading} className="bg-card border border-border rounded-xl p-6">
                    <h3 className="font-semibold text-sm mb-2">{item.heading}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.body}</p>
                    {"email" in item && item.email && (
                      <a
                        href="mailto:Raventheflorist@yahoo.com"
                        className="text-sm text-foreground underline underline-offset-2 hover:text-primary transition-colors"
                      >
                        Raventheflorist@yahoo.com
                      </a>
                    )}
                    {"link" in item && item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground underline underline-offset-2 hover:text-primary transition-colors"
                      >
                        {item.linkLabel}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── POLICIES PAGE ───────────────────────────────────────────────────────────

function PoliciesPage({ onBack }: { onBack: () => void }) {
  const policies = [
    {
      title: "Order Lead Time",
      body: "All orders must be placed a minimum of 4–5 business days in advance. This allows the time needed to source flowers, prepare each arrangement, and ensure everything is perfect before your pick up or delivery date. For larger orders of 150+ stems, please place your order at least 2 weeks in advance. Event orders require a minimum of 4 weeks notice. Planning ahead is always appreciated!",
    },
    {
      title: "Rush Orders",
      body: "Rush orders are available on a case-by-case basis depending on current availability and flower inventory. Orders placed with less than 4 days notice are subject to a rush fee of 20% of the standard pricing of the floral arrangement. Please note: 100% of the total order amount is due at the time of placing a rush order — no deposit split applies. Please reach out directly to inquire about same-day or next-day availability before placing your order.",
    },
    {
      title: "Deposits & Payment",
      body: "A 50% non-refundable deposit is required at the time of booking to secure your order. The remaining balance is due 24 hours before your scheduled pick up or delivery and is expected to be paid via Zelle, Venmo, Apple Pay, or Cash App. Orders will not be prepared until the deposit has been received and confirmed.",
    },
    {
      title: "Cancellations & Refunds",
      body: "All deposits are non-refundable. Once a deposit is submitted, it cannot be returned under any circumstances, as it is used to reserve your date and begin the sourcing process. Depending on the timing of the order, cancellation may be an option — this would be followed up with direct communication to see what can be arranged.",
    },
    {
      title: "Delivery Policy",
      body: "Delivery is available within the local area for a flat fee of $15. This fee takes into consideration the careful handling, transportation, and delivery of your handcrafted floral arrangement to ensure it arrives fresh, secure, and beautifully presented. Additional fees may apply for address changes or redelivery requests. A valid delivery address must be provided at the time of booking. Please note: there is a 10-minute grace period from the scheduled delivery time. Any wait time beyond the 10-minute grace period will result in an additional $20 fee.",
    },
    {
      title: "Pick Up",
      body: "Pick up is available by appointment only. A confirmation message with your pick up time and location will be sent once your order is confirmed. Please arrive within your designated window. A 10-minute grace period is allowed — anything beyond that will result in an additional $20 fee. To reschedule, contact Raven at least 24 hours in advance.",
    },
    {
      title: "Custom & Event Orders",
      body: "Custom arrangements require a minimum of 4–5 days notice. For orders of 150+ stems, please allow at least 2 weeks to ensure proper sourcing and preparation. Event orders require a minimum of 4 weeks notice to allow adequate time to support your vision and bring every detail to life. A detailed consultation will be scheduled to discuss your vision, color palette, and budget. A 50% deposit is required to hold your date. Full payment is due one week before your event.",
    },
    {
      title: "Care Instructions",
      body: "To keep your arrangement looking its best, trim stems at a 45° angle and place in fresh cool water immediately upon receipt. Change the water every two days, keep away from direct sunlight and heat sources, and mist lightly if needed. Most arrangements last 5–10 days with proper care.",
    },
    {
      title: "Allergies & Safety",
      body: "Some flowers may cause allergic reactions in sensitive individuals. Common examples include Baby's Breath (Gypsophila), Chamomile, Chrysanthemums, Sunflowers, and Lilies. If you have known sensitivities to any flowers or plants, please include that information in your order notes and every effort will be made to accommodate. Some flowers are also toxic to pets — a list of pet-safe options is available upon request.",
    },
    {
      title: "Damage & Quality",
      body: "Every arrangement is made with care and attention to quality. Please inspect your order at the time of pick up or delivery and voice any concerns immediately. Once an arrangement has been picked up or delivered — responsibility for its condition is no longer held. All sales are final upon receipt.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Promo banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border py-2 px-4 flex items-center justify-center gap-2">
        <span className="text-accent text-sm">🌿</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.8rem" }}>20% off your order —</span>
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>use code</span>
        <span className="text-xs tracking-[0.2em] uppercase text-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>BLOOMS</span>
      </div>

      {/* Top bar */}
      <div className="fixed top-[37px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-6 md:px-16 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} />
          Back to home
        </button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem" }}>Raven the Florist</span>
        <div className="w-32" />
      </div>

      <div className="pt-28 px-8 md:px-16 pb-24 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-10 mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Policies</p>
        <h1 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>Good to know</h1>
        <p className="text-muted-foreground font-light mb-14 max-w-lg">
          Please read through all policies before placing your order. By submitting a booking you agree to all terms listed below.
        </p>

        <div className="flex flex-col divide-y divide-border">
          {policies.map(({ title, body }) => (
            <div key={title} className="py-8 grid md:grid-cols-[240px_1fr] gap-4">
              <h2 className="text-base font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{body}</p>
            </div>
          ))}
        </div>

        {/* Follow-up process */}
        <div className="mt-16 border-t border-border pt-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>After You Place an Order</p>
          <h2 className="text-3xl mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>What to expect</h2>
          <p className="text-sm text-muted-foreground font-light mb-3 max-w-lg">Here's a quick overview of what happens once your order or inquiry is submitted.</p>
          <p className="text-sm text-muted-foreground font-light mb-10 max-w-lg">Placing an order through an inquiry? The <span className="text-foreground font-medium">BLOOMS</span> discount still applies — just include the code in your notes and the 20% off will be honored when your quote is sent.</p>
          <div className="flex flex-col divide-y divide-border">
            {[
              { step: "01", title: "Expect to hear back", desc: "You'll be contacted via your preferred method — email or phone — to confirm your order details and discuss any final touches." },
              { step: "02", title: "Your order summary & balance", desc: "A full order summary will be sent outlining the balance for your arrangement, payable via Zelle, Venmo, Apple Pay, or Cash App prior to fulfillment." },
              { step: "03", title: "Timeframe confirmation", desc: "Your delivery or pick up window will be solidified so you know exactly when to expect your arrangement — no guessing required." },
              { step: "04", title: "Follow-up communication", desc: "If anything changes or you have questions at any point, reach out by email or by phone — available every step of the way." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="py-7 grid md:grid-cols-[240px_1fr] gap-4 items-start">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground/50" style={{ fontFamily: "'DM Mono', monospace" }}>{step}</span>
                  <h3 className="text-base font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{desc}{step === "04" && <> <a href="mailto:Raventheflorist@yahoo.com" className="text-foreground underline hover:text-primary transition-colors">Raventheflorist@yahoo.com</a></>}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10 text-center">
          <p className="text-xs text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Questions about policies?</p>
          <p className="text-sm text-muted-foreground">Contact <a href="mailto:Raventheflorist@yahoo.com" className="text-foreground underline hover:text-primary transition-colors">Raventheflorist@yahoo.com</a></p>
        </div>
      </div>
    </div>
  );
}

// ─── ROSE BOUQUETS PAGE ───────────────────────────────────────────────────────

const ROSE_OPTIONS = [
  { value: "25", label: "25 Premium Roses", price: "$90", maxColors: 1 },
  { value: "50", label: "50 Premium Roses", price: "$180", maxColors: 2 },
  { value: "75", label: "75 Premium Roses", price: "$260", maxColors: 3 },
  { value: "100", label: "100 Premium Roses", price: "$340", maxColors: 4 },
];

const ROSE_COLORS = [
  "Red", "Deep Red", "Hot Pink", "Pink", "Magenta", "White", "Ivory",
  "Peach", "Orange", "Yellow", "Purple", "Sage",
];

const ACCESSORY_LIST = [
  { name: "Basic Wrapping Paper", price: 0, hasColors: true },
  { name: "Note", price: 3 },
  { name: "Diamond Pins", price: 3 },
  { name: "Pearl Pins", price: 3 },
  { name: "Heart Pins", price: 3 },
  { name: "Star Pins", price: 3 },
  { name: "Pearl Bow", price: 3 },
  { name: "Butterflies", price: 3 },
  { name: "Pearl Mesh", price: 3 },
  { name: "Bow", price: 4 },
  { name: "Tissue Paper", price: 4 },
  { name: "Banner", price: 5 },
  { name: "Greenery", price: 5 },
  { name: "Glitter", price: 5 },
  { name: "Crown", price: 7 },
  { name: "Special/Design Wrapping Paper", price: 10 },
  { name: "Baby Breath Letters (Any Size)", price: 20 },
];

const WRAPPING_COLORS = ["White", "Black", "Red", "Pink", "Blue"];

function RoseBouquetsPage({ onBack, onNavigateHome }: { onBack: () => void; onNavigateHome: (page?: string) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [showPoliciesModal, setShowPoliciesModal] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [dateType, setDateType] = useState<"delivery" | "pickup">("delivery");
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", timeSlot: "", order: "", notes: "" });
  const [inspoFiles, setInspoFiles] = useState<File[]>([]);
  const [roseColors, setRoseColors] = useState<string[]>([]);
  const [flowerAddons, setFlowerAddons] = useState<string[]>([]);
  const [accessoryAddons, setAccessoryAddons] = useState<string[]>([]);
  const [wrappingColor, setWrappingColor] = useState("");
  const [flowerOpen, setFlowerOpen] = useState(false);
  const [accessoryOpen, setAccessoryOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "zelle" | "applepay">("card");
  const [cardInfo, setCardInfo] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [agreedToPolicies, setAgreedToPolicies] = useState(false);
  const [discountInput, setDiscountInput] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState("");
  const [address, setAddress] = useState({ street: "", apt: "", city: "", state: "Minnesota", zip: "" });

  const selectedOrder = ROSE_OPTIONS.find((o) => o.value === form.order);
  const isCustom = form.order === "custom";
  const maxColors = selectedOrder?.maxColors ?? 0;

  const FLOWER_PRICES: Record<string, number> = { "Baby's Breath": 10, "Oriental Lilies": 20, "Spray Roses": 20, "Premium Gerbera": 15, "Snapdragons": 15 };
  const ACCESSORY_PRICES: Record<string, number> = Object.fromEntries(ACCESSORY_LIST.map(a => [a.name, a.price]));
  const roseBase = isCustom ? 0 : (form.order ? parseInt(ROSE_OPTIONS.find(o => o.value === form.order)?.price.replace("$","") || "0") : 0);
  const flowerTotal = flowerAddons.reduce((sum, f) => sum + (FLOWER_PRICES[f] ?? 0), 0);
  const accessoryTotal = accessoryAddons.reduce((sum, a) => sum + (ACCESSORY_PRICES[a] ?? 0), 0);
  const deliveryFee = dateType === "delivery" ? 15 : 0;
  const preDiscountSubtotal = roseBase + flowerTotal + accessoryTotal + deliveryFee;
  const discountAmount = discountApplied ? parseFloat((preDiscountSubtotal * 0.20).toFixed(2)) : 0;
  const subtotal = parseFloat((preDiscountSubtotal - discountAmount).toFixed(2));
  const tax = parseFloat((subtotal * 0.07).toFixed(2));
  const grandTotal = parseFloat((subtotal + tax).toFixed(2));
  const deposit = parseFloat((grandTotal * 0.5).toFixed(2));

  function applyDiscount() {
    if (discountInput.trim().toUpperCase() === "BLOOMS") {
      setDiscountApplied(true);
      setDiscountError("");
    } else {
      setDiscountApplied(false);
      setDiscountError("Invalid code. Please try again.");
    }
  }

  function toggleRoseColor(color: string) {
    if (roseColors.includes(color)) {
      setRoseColors(roseColors.filter(c => c !== color));
    } else if (roseColors.length < maxColors) {
      setRoseColors([...roseColors, color]);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Promo banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border py-2 px-4 flex items-center justify-center gap-2">
        <span className="text-accent text-sm">🌿</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.8rem" }} className="text-foreground">
          20% off your order —
        </span>
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>use code</span>
        <span className="text-xs tracking-[0.2em] uppercase text-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>BLOOMS</span>
      </div>

      {/* Top bar */}
      <div className="fixed top-[37px] left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-6 md:px-16 py-4 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} />
          Back to home
        </button>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem" }}>Raven the Florist</span>
        <div className="w-32" />
      </div>

      <div className="pt-28 px-8 md:px-16">
        <div className="max-w-2xl mx-auto py-14">

          {submitted ? (
            <div className="py-10">
              <p className="text-3xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Thank you!</p>
              <p className="text-sm text-muted-foreground mb-4">Thank you for ordering with Raven the Florist — can't wait to be in contact soon!</p>
              <p className="text-muted-foreground font-light mb-10">Your booking request has been received. Expect to hear back within 24 hours to confirm.</p>
              <div className="border-t border-border pt-8">
                <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-6" style={{ fontFamily: "'DM Mono', monospace" }}>What Happens Next</p>
                <div className="flex flex-col gap-5">
                  {[
                    { step: "01", title: "Expect to hear back", desc: "You'll be contacted via your preferred method — email or phone — to confirm your order details and discuss any final touches." },
                    { step: "02", title: "Your order summary & balance", desc: "A full order summary will be sent with the balance for your arrangement, payable via Zelle, Venmo, Apple Pay, or Cash App." },
                    { step: "03", title: "Confirm your timeframe", desc: "Your delivery or pick up window will be solidified so you know exactly when to expect your arrangement." },
                    { step: "04", title: "Questions along the way?", desc: "For any follow-up communication, reach out by email or by phone — available every step of the way." },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-4">
                      <span className="text-xs text-muted-foreground/50 pt-0.5 flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>{step}</span>
                      <div>
                        <p className="text-sm font-medium mb-1">{title}</p>
                        <p className="text-xs text-muted-foreground font-light leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-7">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Booking Details</p>
                <h1 className="text-4xl md:text-5xl mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>Rose Bouquets</h1>
                <p className="text-muted-foreground font-light leading-relaxed">Let's bring your floral vision to life. Each bouquet is handcrafted with premium roses and carefully prepared to ensure a luxurious presentation. Select your options below to begin your order — within 24 hours your order will be confirmed.</p>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Your name</label>
                <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Jasmine Williams" />
              </div>

              {/* Contact toggle */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-muted-foreground">Contact via</span>
                  <div className="flex gap-1">
                    {(["email", "phone"] as const).map((m) => (
                      <button key={m} type="button" onClick={() => setContactMethod(m)} className={`px-3 py-1 text-xs border transition-colors ${contactMethod === m ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground"}`}>
                        {m === "email" ? "Email" : "Phone"}
                      </button>
                    ))}
                  </div>
                </div>
                {contactMethod === "email" ? (
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="jasmine@example.com" />
                ) : (
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="+1 (503) 555-0100" />
                )}
              </div>

              {/* Date — delivery or pickup toggle */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-muted-foreground">Date type</span>
                  <div className="flex gap-1">
                    {(["delivery", "pickup"] as const).map((t) => (
                      <button key={t} type="button" onClick={() => setDateType(t)} className={`px-3 py-1 text-xs border transition-colors ${dateType === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground"}`}>
                        {t === "delivery" ? "Delivery" : "Pick Up"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 border-b border-border pb-2 w-full">
                  <Calendar size={14} className="text-muted-foreground flex-shrink-0" />
                  <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} min={new Date().toISOString().split("T")[0]} className="bg-transparent text-sm focus:outline-none flex-1 cursor-pointer" style={{ colorScheme: "light" }} />
                </div>
                {/* Time slot */}
                <div className="flex flex-col gap-1 mt-3">
                  <label className="text-xs text-muted-foreground">Preferred time window</label>
                  <div className="relative">
                    <select required value={form.timeSlot} onChange={(e) => setForm({ ...form, timeSlot: e.target.value })} className="w-full appearance-none border-b border-border bg-transparent py-2.5 pr-8 text-sm focus:outline-none focus:border-foreground transition-colors cursor-pointer">
                      <option value="">Select a time window</option>
                      {["Morning (9am – 11am)", "Late Morning (11am – 1pm)", "Afternoon (1pm – 3pm)", "Late Afternoon (3pm – 5pm)", "Evening (5pm – 7pm)"].map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                  <p className="text-xs text-muted-foreground/70 mt-1">Select the window of time you're comfortable with for your {dateType === "delivery" ? "delivery" : "pick up"}.</p>
                </div>
                {dateType === "delivery" && (
                  <p className="text-xs text-muted-foreground mt-2">🚗 A <span className="text-foreground font-medium">$15 delivery fee</span> will be added to your order total. This fee takes into consideration the careful handling, transportation, and delivery of your handcrafted floral arrangement to ensure it arrives fresh, secure, and beautifully presented. Additional fees may apply for address changes or redelivery requests.</p>
                )}
              </div>

              {/* Delivery address */}
              {dateType === "delivery" && (
                <div className="flex flex-col gap-4 p-5 bg-secondary/50 border border-border">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>Delivery Address</p>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Street address</label>
                    <input required type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="123 Main St" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Apartment / Suite <span className="opacity-50">(optional)</span></label>
                    <input type="text" value={address.apt} onChange={(e) => setAddress({ ...address, apt: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Apt 4B" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">City</label>
                      <input required type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Minneapolis" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground">State</label>
                      <input required type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground">Zip code</label>
                    <input required type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="55401" maxLength={10} />
                  </div>
                </div>
              )}

              {/* Merged order dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Rose bouquet</label>
                <div className="relative">
                  <select required value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="w-full appearance-none border-b border-border bg-transparent py-2.5 pr-8 text-sm focus:outline-none focus:border-foreground transition-colors cursor-pointer">
                    <option value="">Select an option</option>
                    {ROSE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label} — {o.price}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Looking for 100+ roses?{" "}
                  <button type="button" onClick={() => onNavigateHome("build-bouquet")} className="underline text-foreground hover:text-primary transition-colors">
                    Book under Build Your Bouquets
                  </button>{" "}
                  for larger custom orders.
                </p>
              </div>

              {/* Rose color selector */}
              {maxColors > 0 && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted-foreground">
                    Rose color{maxColors > 1 ? "s" : ""} — select up to {maxColors}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ROSE_COLORS.map((color) => {
                      const selected = roseColors.includes(color);
                      const disabled = !selected && roseColors.length >= maxColors;
                      return (
                        <button
                          key={color}
                          type="button"
                          disabled={disabled}
                          onClick={() => toggleRoseColor(color)}
                          className={`px-3 py-1.5 text-xs border transition-colors ${selected ? "border-primary bg-primary text-primary-foreground" : disabled ? "border-border text-muted-foreground/40 cursor-not-allowed" : "border-border text-muted-foreground hover:border-foreground"}`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                  {roseColors.length > 0 && (
                    <p className="text-xs text-muted-foreground">Selected: {roseColors.join(", ")}</p>
                  )}
                </div>
              )}

              {/* Flower add-ons */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Flower add-ons</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => { setFlowerOpen(!flowerOpen); setAccessoryOpen(false); }}
                    className="w-full flex items-center justify-between border-b border-border py-2.5 text-sm text-left focus:outline-none"
                  >
                    <span className={flowerAddons.length ? "text-foreground" : "text-muted-foreground"}>
                      {flowerAddons.length ? flowerAddons.join(", ") : "Select add-ons (optional)"}
                    </span>
                    <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${flowerOpen ? "rotate-180" : ""}`} />
                  </button>
                  {flowerOpen && (
                    <div className="absolute top-full left-0 right-0 z-20 bg-background border border-border shadow-sm mt-1">
                      {[["Baby's Breath", "$10"], ["Oriental Lilies", "$20"], ["Spray Roses", "$20"], ["Premium Gerbera", "$15"], ["Snapdragons", "$15"]].map(([name, price]) => {
                        const checked = flowerAddons.includes(name);
                        return (
                          <label key={name} className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-secondary transition-colors border-b border-border last:border-0">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "bg-primary border-primary" : "border-border"}`}>
                                {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </div>
                              <span className="text-sm">{name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{price}</span>
                            <input type="checkbox" className="hidden" checked={checked} onChange={() => setFlowerAddons(checked ? flowerAddons.filter(f => f !== name) : [...flowerAddons, name])} />
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Accessory add-ons */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Accessory add-ons</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => { setAccessoryOpen(!accessoryOpen); setFlowerOpen(false); }}
                    className="w-full flex items-center justify-between border-b border-border py-2.5 text-sm text-left focus:outline-none"
                  >
                    <span className={accessoryAddons.length ? "text-foreground" : "text-muted-foreground"}>
                      {accessoryAddons.length ? accessoryAddons.join(", ") : "Select add-ons (optional)"}
                    </span>
                    <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${accessoryOpen ? "rotate-180" : ""}`} />
                  </button>
                  {accessoryOpen && (
                    <div className="absolute top-full left-0 right-0 z-20 bg-background border border-border shadow-sm mt-1 max-h-72 overflow-y-auto">
                      {ACCESSORY_LIST.map(({ name, price }) => {
                        const checked = accessoryAddons.includes(name);
                        return (
                          <label key={name} className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-secondary transition-colors border-b border-border last:border-0">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "bg-primary border-primary" : "border-border"}`}>
                                {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </div>
                              <span className="text-sm">{name}</span>
                              {name === "Basic Wrapping Paper" && <span className="text-xs text-muted-foreground">(White, Black, Red, Pink, Blue)</span>}
                            </div>
                            <span className="text-xs text-muted-foreground">{price === 0 ? "Free" : `$${price}`}</span>
                            <input type="checkbox" className="hidden" checked={checked} onChange={() => setAccessoryAddons(checked ? accessoryAddons.filter(a => a !== name) : [...accessoryAddons, name])} />
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* Wrapping paper color selector */}
                {accessoryAddons.includes("Basic Wrapping Paper") && (
                  <div className="mt-2 flex flex-col gap-1.5">
                    <span className="text-xs text-muted-foreground">Wrapping paper color</span>
                    <div className="flex flex-wrap gap-2">
                      {WRAPPING_COLORS.map((c) => (
                        <button key={c} type="button" onClick={() => setWrappingColor(c)} className={`px-3 py-1.5 text-xs border transition-colors ${wrappingColor === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground"}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Notes + inspo upload */}
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Special requests or notes</label>
                <p className="text-xs text-muted-foreground/70 mb-1">Don't see a flower add-on or accessory you're looking for? List it here and it will be followed up on with your order.</p>
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Card messages, Custom Color options, etc." />
              </div>

              {/* Inspo photo upload */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-muted-foreground">Inspiration photos (optional)</label>
                <label className="flex items-center gap-3 border border-dashed border-border px-4 py-4 cursor-pointer hover:border-foreground transition-colors group">
                  <div className="flex flex-col items-center justify-center w-full gap-1 text-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground group-hover:text-foreground transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Upload inspo photos</span>
                    <span className="text-xs text-muted-foreground/60">JPG, PNG, WEBP up to 10MB each</span>
                  </div>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { if (e.target.files) setInspoFiles(Array.from(e.target.files)); }} />
                </label>
                {inspoFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {inspoFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-secondary border border-border px-3 py-1.5 text-xs">
                        <span className="text-muted-foreground truncate max-w-[140px]">{f.name}</span>
                        <button type="button" onClick={() => setInspoFiles(inspoFiles.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-foreground transition-colors ml-1">
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order summary */}
              {form.order && (
                <div className="bg-secondary/60 border border-border p-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>Order Summary</p>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{selectedOrder?.label}</span>
                    <span>{isCustom ? "—" : `$${roseBase}`}</span>
                  </div>
                  {roseColors.length > 0 && (
                    <p className="text-xs text-muted-foreground mb-2">Colors: {roseColors.join(", ")}</p>
                  )}
                  {flowerAddons.map(f => (
                    <div key={f} className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{f}</span>
                      <span>${FLOWER_PRICES[f]}</span>
                    </div>
                  ))}
                  {accessoryAddons.map(a => (
                    <div key={a} className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{a === "Basic Wrapping Paper" && wrappingColor ? `Basic Wrapping Paper (${wrappingColor})` : a}</span>
                      <span>{ACCESSORY_PRICES[a] === 0 ? "Free" : `$${ACCESSORY_PRICES[a]}`}</span>
                    </div>
                  ))}
                  {dateType === "delivery" && (
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Delivery fee</span>
                      <span>$10.00</span>
                    </div>
                  )}
                  {discountApplied && (
                    <div className="flex justify-between text-xs text-primary font-medium mb-1">
                      <span>Discount (BLOOMS — 20% off)</span>
                      <span>−${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  {!isCustom && (
                    <div className="flex justify-between text-xs text-muted-foreground mb-1 mt-2 pt-2 border-t border-border">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-medium mt-2 pt-2 border-t border-border">
                    <span>Total</span>
                    <span>{isCustom ? "Inquiry" : `$${grandTotal.toFixed(2)}`}</span>
                  </div>
                  {!isCustom && (
                    <div className="flex justify-between text-xs text-primary font-medium mt-1">
                      <span>Deposit due today (50%)</span>
                      <span>${deposit.toFixed(2)}</span>
                    </div>
                  )}
                  {form.date && <p className="text-xs text-muted-foreground capitalize mt-3 pt-3 border-t border-border">{dateType === "delivery" ? "Delivery" : "Pick up"} · {form.date}</p>}
                </div>
              )}

              {/* Payment */}
              <div className="border-t border-border pt-8">
                <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>Payment</p>
                <h2 className="text-2xl mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>How would you like to pay?</h2>
                {!isCustom && (
                  <div className="bg-accent/20 border border-accent/40 px-4 py-3 mb-6 text-sm">
                    <p className="font-medium mb-0.5">Deposit required to confirm your order</p>
                    <p className="text-muted-foreground text-xs mb-1.5">You are paying a <span className="text-foreground font-medium">50% deposit (${deposit.toFixed(2)})</span> today to secure your booking. The remaining <span className="text-foreground font-medium">${deposit.toFixed(2)}</span> will be collected 24 hours before your {dateType === "delivery" ? "delivery" : "pick up"}.</p>
                    <p className="text-muted-foreground text-xs">The remaining balance is expected to be paid via <span className="text-foreground font-medium">Zelle, Venmo, Apple Pay, or Cash App</span> prior to fulfillment.</p>
                  </div>
                )}

                {/* Discount code */}
                {!isCustom && (
                  <div className="mb-6">
                    <label className="text-xs text-muted-foreground block mb-2">Discount code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountInput}
                        onChange={(e) => { setDiscountInput(e.target.value); setDiscountError(""); if (discountApplied) setDiscountApplied(false); }}
                        className="flex-1 border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors uppercase tracking-widest"
                        placeholder="ENTER CODE"
                      />
                      <button type="button" onClick={applyDiscount} className="px-5 py-2 text-xs border border-border hover:border-foreground hover:bg-secondary transition-colors">
                        Apply
                      </button>
                    </div>
                    {discountApplied && <p className="text-xs text-primary mt-1">✓ 20% discount applied!</p>}
                    {discountError && <p className="text-xs text-destructive mt-1">{discountError}</p>}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 mb-6">
                  {([
                    { id: "card", label: "Card", icon: <CreditCard size={13} /> },
                    { id: "applepay", label: "Apple Pay", icon: <span className="text-sm leading-none"></span> },
                    { id: "zelle", label: "Zelle", icon: <span className="font-bold text-xs text-[#6D1ED4]">Z</span> },
                  ] as const).map(({ id, label, icon }) => (
                    <button key={id} type="button" onClick={() => setPaymentMethod(id)} className={`flex items-center gap-1.5 px-4 py-2.5 border text-sm transition-all ${paymentMethod === id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-foreground"}`}>
                      {icon}{label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="md:col-span-2 flex flex-col gap-1"><label className="text-xs text-muted-foreground">Cardholder name</label><input type="text" value={cardInfo.name} onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="Jasmine Williams" /></div>
                    <div className="md:col-span-2 flex flex-col gap-1"><label className="text-xs text-muted-foreground">Card number</label><input type="text" value={cardInfo.number} onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="1234 5678 9012 3456" maxLength={19} /></div>
                    <div className="flex flex-col gap-1"><label className="text-xs text-muted-foreground">Expiry</label><input type="text" value={cardInfo.expiry} onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="MM / YY" maxLength={7} /></div>
                    <div className="flex flex-col gap-1"><label className="text-xs text-muted-foreground">CVV</label><input type="text" value={cardInfo.cvv} onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })} className="border-b border-border bg-transparent py-2.5 text-sm focus:outline-none focus:border-foreground transition-colors" placeholder="•••" maxLength={4} /></div>
                  </div>
                )}

                {paymentMethod === "applepay" && (
                  <div className="mb-6 p-5 bg-secondary border border-border">
                    <p className="text-sm font-medium mb-1">Pay via Apple Pay</p>
                    <p className="text-xs text-muted-foreground mb-2">Send your deposit of <span className="font-medium text-foreground">${deposit.toFixed(2)}</span> to <a href="mailto:Raventheflorist@yahoo.com" className="font-medium text-foreground underline hover:text-primary transition-colors">Raventheflorist@yahoo.com</a> via Apple Pay after submitting. Include your name and bouquet in the note.</p>
                    <p className="text-xs text-muted-foreground">Order confirmed once payment is received.</p>
                  </div>
                )}

                {paymentMethod === "zelle" && (
                  <div className="mb-6 p-5 bg-secondary border border-border">
                    <p className="text-sm font-medium mb-1">Pay via Zelle</p>
                    <p className="text-xs text-muted-foreground mb-2">Send your deposit of <span className="font-medium text-foreground">${deposit.toFixed(2)}</span> to <a href="mailto:Raventheflorist@yahoo.com" className="font-medium text-foreground underline hover:text-primary transition-colors">Raventheflorist@yahoo.com</a> after submitting. Include your name and bouquet in the memo.</p>
                    <p className="text-xs text-muted-foreground">Order confirmed once payment is received.</p>
                  </div>
                )}

                {/* Policy agreement checkbox */}
                <label className="flex items-start gap-3 cursor-pointer mb-6 group">
                  <div
                    onClick={() => setAgreedToPolicies(!agreedToPolicies)}
                    className={`mt-0.5 w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${agreedToPolicies ? "bg-primary border-primary" : "border-border group-hover:border-foreground"}`}
                  >
                    {agreedToPolicies && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I have read and agree to all <button type="button" onClick={() => setShowPoliciesModal(true)} className="underline text-foreground hover:text-primary transition-colors">policies</button>, including the cancellation policy, substitution policy, and care instructions. I understand the deposit is non-refundable once florals have been sourced.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={!agreedToPolicies}
                  className="bg-primary text-primary-foreground px-10 py-3.5 text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={14} />
                  {isCustom ? "Send Inquiry" : paymentMethod === "card" ? "Place Order" : "Submit Booking"}
                </button>
                {!agreedToPolicies && <p className="text-xs text-muted-foreground mt-2">Please agree to the policies above to continue.</p>}
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Policies modal */}
      {showPoliciesModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setShowPoliciesModal(false)} />
          <div className="relative bg-background w-full md:max-w-2xl max-h-[85vh] overflow-y-auto shadow-xl flex flex-col">
            <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between z-10">
              <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground" style={{ fontFamily: "'DM Mono', monospace" }}>Policies</span>
              <button type="button" onClick={() => setShowPoliciesModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="px-6 py-8 flex flex-col divide-y divide-border">
              {[
                { title: "Order Lead Time", body: "All orders must be placed a minimum of 4–5 business days in advance. For orders of 150+ stems, please allow at least 2 weeks. Event orders require a minimum of 4 weeks notice." },
                { title: "Rush Orders", body: "Rush orders are available on a case-by-case basis depending on availability. Orders placed with less than 4 days notice are subject to a 20% rush fee. 100% of the total is due at the time of placing a rush order." },
                { title: "Deposits & Payment", body: "A 50% non-refundable deposit is required at the time of booking. The remaining balance is due 24 hours before your scheduled pick up or delivery and is expected to be paid via Zelle, Venmo, Apple Pay, or Cash App." },
                { title: "Cancellations & Refunds", body: "All deposits are non-refundable. Once a deposit is submitted it cannot be returned, as it is used to reserve your date and begin the sourcing process." },
                { title: "Delivery Policy", body: "Delivery is available within the local area for a flat fee of $15. This fee covers careful handling, transportation, and delivery to ensure your arrangement arrives fresh, secure, and beautifully presented. Additional fees may apply for address changes or redelivery requests." },
                { title: "Care Instructions", body: "Trim stems at a 45° angle and place in fresh cool water immediately upon receipt. Change the water every two days, keep away from direct sunlight and heat sources. Most arrangements last 5–10 days with proper care." },
                { title: "Damage & Quality", body: "Please inspect your order at the time of pick up or delivery and voice any concerns immediately. Once an arrangement has been received, responsibility for its condition is no longer held. All sales are final upon receipt." },
              ].map(({ title, body }) => (
                <div key={title} className="py-5">
                  <p className="text-sm font-medium mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">{body}</p>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4">
              <button type="button" onClick={() => { setAgreedToPolicies(true); setShowPoliciesModal(false); }} className="w-full bg-primary text-primary-foreground py-3 text-sm hover:bg-primary/90 transition-colors">
                I have read and agree to all policies
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
