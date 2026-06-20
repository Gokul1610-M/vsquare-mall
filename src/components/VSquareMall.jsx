"use client";
import { useState, useEffect, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   THEME - LIGHT COLOR PALETTE
══════════════════════════════════════════════════════════════ */
const T = {
  red:"#E63946", gold:"#F4A261", dark:"#1A1A2E",
  navy:"#16213E", teal:"#0E8388", pink:"#C86B85",
  blue:"#4361EE", purp:"#7209B7",
  bg:"#F8F9FA", surface:"#FFFFFF", text:"#1A1A2E",
  textLight:"#6C757D", border:"#E9ECEF"
};

/* ══════════════════════════════════════════════════════════════
   MOCK API — unchanged
══════════════════════════════════════════════════════════════ */
const FALLBACK = {
  banners: [
    { 
      id:1, 
      image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1920&q=80",
      tag:"Grand Sale",    
      title:"Up to 70% Off\nThis Weekend",  
      sub:"200+ stores — biggest sale of the year",        
      cta:"Shop Now",    
      accent:"#E63946" 
    },
    { 
      id:2, 
      image: "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=1920&q=80",
      tag:"New Opening",  
      title:"Apple Store\nNow Open",         
      sub:"Level 2, Wing B — come experience the future",  
      cta:"Explore",     
      accent:"#4361EE" 
    },
    { 
      id:3, 
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
      tag:"Weekend Event",
      title:"Live Music &\nFood Festival",   
      sub:"Saturday & Sunday — Centre Court, Ground Floor",
      cta:"Get Tickets", 
      accent:"#0E8388" 
    },
  ],
  storeCategories: [
    { id:1, icon:"👗", name:"Fashion & Apparel", count:"48 Stores",  grad:"linear-gradient(135deg,#f72585,#b5179e)" },
    { id:2, icon:"🍔", name:"Food & Dining",     count:"32 Outlets", grad:"linear-gradient(135deg,#f4a261,#e76f51)" },
    { id:3, icon:"💻", name:"Electronics",       count:"14 Stores",  grad:"linear-gradient(135deg,#4361ee,#3a0ca3)" },
    { id:4, icon:"💄", name:"Beauty & Wellness", count:"22 Stores",  grad:"linear-gradient(135deg,#e63946,#c1121f)" },
    { id:5, icon:"🎮", name:"Entertainment",     count:"8 Venues",   grad:"linear-gradient(135deg,#7209b7,#560bad)" },
    { id:6, icon:"👟", name:"Footwear",          count:"18 Stores",  grad:"linear-gradient(135deg,#0e8388,#0096c7)" },
  ],
  services: [
    { id:1, icon:"🅿️", name:"Parking",          desc:"4 levels · 2,000+ spots",  col:"#4361EE" },
    { id:2, icon:"♿",  name:"Accessibility",     desc:"Full wheelchair access",    col:"#0E8388" },
    { id:3, icon:"🛎️", name:"Concierge",         desc:"Level 1, Main Atrium",      col:"#F4A261" },
    { id:4, icon:"💱", name:"Currency Exchange",  desc:"Ground Floor, East Wing",  col:"#C86B85" },
    { id:5, icon:"📦", name:"Parcel Storage",     desc:"Drop & collect service",   col:"#7209B7" },
    { id:6, icon:"🕌", name:"Prayer Room",        desc:"Level 3, North Block",     col:"#06d6a0" },
  ],
  promotions: [
    { id:1, tag:"FLASH DEAL",   title:"Buy 2 Get 1 Free",           store:"H&M",          expiry:"Ends Sunday",    grad:"linear-gradient(135deg,#f72585,#b5179e)" },
    { id:2, tag:"WEEKEND ONLY", title:"20% Cashback on All Dining", store:"Food Court",   expiry:"Sat & Sun",      grad:"linear-gradient(135deg,#f4a261,#e76f51)" },
    { id:3, tag:"MEMBERS",      title:"Triple Points Day",           store:"All Stores",   expiry:"Members Only",   grad:"linear-gradient(135deg,#4361ee,#7209b7)" },
    { id:4, tag:"NEW ARRIVAL",  title:"Season Launch Event",         store:"Zara & Mango", expiry:"Starting Friday",grad:"linear-gradient(135deg,#0e8388,#0096c7)" },
  ],
  offers: [
    { id:1, pct:"50%", store:"Nike",    cat:"Footwear",     img:"👟", col:"#E63946" },
    { id:2, pct:"30%", store:"Samsung", cat:"Electronics",  img:"📱", col:"#4361EE" },
    { id:3, pct:"40%", store:"Sephora", cat:"Beauty",       img:"💄", col:"#C86B85" },
    { id:4, pct:"25%", store:"IKEA",    cat:"Home & Living",img:"🪑", col:"#F4A261" },
  ],
  topBrands: [
    { id:1,  name:"Zara"       },{ id:2,  name:"H&M"        },{ id:3,  name:"Nike"       },
    { id:4,  name:"Apple"      },{ id:5,  name:"Samsung"     },{ id:6,  name:"Sephora"    },
    { id:7,  name:"Starbucks"  },{ id:8,  name:"McDonald's"  },{ id:9,  name:"Mango"      },
    { id:10, name:"Forever 21" },{ id:11, name:"LEVI'S"      },{ id:12, name:"Adidas"     },
    { id:13, name:"Puma"       },{ id:14, name:"Zudio"       },
  ],
  siteInfo: {
    mallName:     "V Square Mall",
    tagline:      "Shopping Centre",
    address:      "123 Anna Salai, Chennai, Tamil Nadu 600002",
    phone:        "+91 44 2345 6789",
    email:        "vsquaremall.cuddalore@gmail.com",
    hours:        "Daily: 10:00 AM – 10:00 PM",
    mapEmbedUrl:  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.785!2d80.2707!3d13.0605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267b3b4b14e43%3A0x8bec9cc8b55b04bc!2sAnna%20Salai%2C%20Chennai!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin",
    privacyPolicy:"https://meridianmall.in/privacy",
    termsUrl:     "https://meridianmall.in/terms",
    sitemapUrl:   "https://meridianmall.in/sitemap",
    inc:          "Meridian Retail Pvt. Ltd. · CIN: U52100TN2001PTC123456 · GST: 33AAACM1234C1Z5",
    socialLinks:  [{ label:"Instagram", url:"#" },{ label:"Facebook", url:"#" },{ label:"X / Twitter", url:"#" }],
  },
};

/* Helper functions unchanged */
function fetchWithTimeout(url, ms = 2000) {
  return Promise.race([
    fetch(url).then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); }),
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

async function fetchAllData() {
  const API = {
    banners:         "/api/mall/banners",
    storeCategories: "/api/mall/store-categories",
    services:        "/api/mall/services",
    promotions:      "/api/mall/promotions",
    offers:          "/api/mall/offers",
    topBrands:       "/api/mall/top-brands",
    siteInfo:        "/api/mall/site-info",
  };

  const results = await Promise.allSettled(
    Object.entries(API).map(([key, url]) =>
      fetchWithTimeout(url, 1800).then(data => ({ key, data }))
    )
  );

  const merged = { ...FALLBACK };
  results.forEach(r => {
    if (r.status === "fulfilled") merged[r.value.key] = r.value.data;
  });
  return merged;
}

/* Skeleton components unchanged */
const shimmerStyle = {
  background: "linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)",
  backgroundSize: "400px 100%",
  animation: "shimmer 1.4s infinite linear",
  borderRadius: 12,
};

function Sk({ w = "100%", h = 20, r = 10, style = {} }) {
  return <div style={{ width: w, height: h, borderRadius: r, ...shimmerStyle, ...style }} />;
}

function BannerSkeleton() {
  return (
    <div style={{ height: "100vh", minHeight: 560, background: "#f0f0f0", display: "flex", alignItems: "center", padding: "0 clamp(20px,5vw,60px)", paddingTop: 80 }}>
      <div style={{ maxWidth: 540, width: "100%", display: "flex", flexDirection: "column", gap: 18 }}>
        <Sk w={100} h={22} />
        <Sk w="80%" h={64} r={12} />
        <Sk w="60%" h={64} r={12} />
        <Sk w="70%" h={22} />
        <div style={{ display: "flex", gap: 14 }}>
          <Sk w={140} h={50} r={30} />
          <Sk w={120} h={50} r={30} />
        </div>
      </div>
    </div>
  );
}

function CardGridSkeleton({ count = 6, h = 160 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(180px,100%),1fr))", gap: 18 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Sk key={i} h={h} r={20} style={{ animationDelay: `${i * 0.08}s` }} />
      ))}
    </div>
  );
}

function PillsSkeleton({ count = 12 }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Sk key={i} w={80 + (i % 3) * 24} h={42} r={30} style={{ animationDelay: `${i * 0.05}s` }} />
      ))}
    </div>
  );
}

function InfoBarSkeleton() {
  return (
    <div style={{ background: "#f8f9fa", padding: "10px 24px", display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
      {Array.from({ length: 4 }).map((_, i) => <Sk key={i} w={160} h={16} r={8} />)}
    </div>
  );
}

/* Hooks unchanged */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCounter(target, active, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function Reveal({ children, delay = 0, dir = "up", style = {} }) {
  const [ref, inView] = useInView();
  const tx = dir === "left" ? "-40px" : dir === "right" ? "40px" : "0px";
  const ty = dir === "up"   ? "40px"  : dir === "down"  ? "-40px" : "0px";
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translate(0,0)" : `translate(${tx},${ty})`,
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      ...style,
    }}>{children}</div>
  );
}

function SectionHeader({ eyebrow, title, sub, eyeColor = T.red }) {
  return (
    <Reveal>
      <div style={{ textAlign: "center", marginBottom: "clamp(32px,5vw,48px)" }}>
        <span style={{ color: eyeColor, fontWeight: 700, fontSize: "clamp(10px,1.5vw,12px)", letterSpacing: 4 }}>{eyebrow}</span>
        <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 900, margin: "10px 0 8px", color: T.text }}>{title}</h2>
        {sub && <p style={{ color: T.textLight, fontSize: "clamp(13px,2vw,15px)" }}>{sub}</p>}
      </div>
    </Reveal>
  );
}

function StatCard({ num, suffix, label, active }) {
  const val = useCounter(num, active);
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "clamp(20px,4vw,28px) clamp(16px,3vw,20px)", textAlign: "center", transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s", cursor: "default" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = T.red; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = ""; }}
    >
      <div style={{ fontSize: "clamp(28px,5vw,36px)", fontWeight: 900, color: T.red }}>{val}{suffix}</div>
      <div style={{ fontSize: "clamp(11px,1.5vw,13px)", color: T.textLight, marginTop: 6 }}>{label}</div>
    </div>
  );
}

const NAV_LINKS = ["Store Directory", "Services", "Promotions", "Offers", "About", "Mall Map", "Contact"];
const FLOORS = [
  { floor: "GF", label: "Ground Floor", areas: [{ n: "Supermarket", i: "🛒" }, { n: "Food Court", i: "🍽️" }, { n: "Currency Exchange", i: "💱" }, { n: "Concierge", i: "🛎️" }] },
  { floor: "L1", label: "Level 1",      areas: [{ n: "Fashion", i: "👗" }, { n: "Footwear", i: "👟" }, { n: "Accessories", i: "💍" }, { n: "Pharmacy", i: "💊" }] },
  { floor: "L2", label: "Level 2",      areas: [{ n: "Electronics", i: "💻" }, { n: "Apple Store", i: "🍎" }, { n: "Gaming", i: "🎮" }, { n: "Telecom", i: "📱" }] },
  { floor: "L3", label: "Level 3",      areas: [{ n: "Beauty & Wellness", i: "💄" }, { n: "Spa", i: "💆" }, { n: "Prayer Room", i: "🕌" }, { n: "Kids Zone", i: "🎠" }] },
];
const ABOUT_STATS = [
  { num: 200, suffix: "+", label: "Stores" },
  { num: 30,  suffix: "+", label: "Dining Options" },
  { num: 12,  suffix: "L", label: "Sq Ft Area" },
  { num: 50,  suffix: "K+", label: "Daily Visitors" },
];

export default function MallWebsite() {
  const [data, setData]         = useState(null);
  const [slide, setSlide]       = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFloor, setFloor] = useState("GF");
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);
  const [aboutRef, aboutInView] = useInView(0.3);

  useEffect(() => {
    const t0 = Date.now();
    fetchAllData().then(result => {
      const elapsed = Date.now() - t0;
      const wait = Math.max(0, 400 - elapsed);
      setTimeout(() => setData(result), wait);
    });
  }, []);

  useEffect(() => {
    if (!data) return;
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % data.banners.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [data]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Detect mobile for conditional rendering
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const goSlide = i => { clearInterval(timerRef.current); setSlide(i); timerRef.current = setInterval(() => setSlide(s => (s + 1) % data.banners.length), 5000); };
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  //gokul
  const loading = !data;
  const s = data?.banners[slide];
  const info = data?.siteInfo ?? {};

  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", background: T.bg, color: T.text, minHeight: "100vh", overflowX: "hidden" }}>

      <style>{`
        @keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        @keyframes pulse    { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.08)} }
        @keyframes slideUp  { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes tickerBg { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes imageSlide { from{opacity:0;transform:scale(1.05)} to{opacity:1;transform:scale(1)} }
        
        /* Mobile-first responsive styles */
        @media(max-width:768px){
          .deskNav{display:none!important}
          .burger{display:flex!important}
          .hero-content{padding:0 clamp(20px,5vw,40px)!important}
          .hero-buttons{flex-direction:column!important}
          .hero-buttons button{width:100%!important}
          .nav-arrows{display:none!important}
        }
      `}</style>

      {/* ══ HEADER ══ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.border}` : "none",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,24px)", height: "clamp(56px,10vw,68px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {loading
            ? <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Sk w={40} h={40} r={10} /><Sk w={120} h={24} /></div>
            : (
              <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <div style={{ width: "clamp(32px,5vw,40px)", height: "clamp(32px,5vw,40px)", borderRadius: 10, background: `linear-gradient(135deg,${T.red},${T.pink})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "clamp(16px,2.5vw,20px)", color: "#fff", boxShadow: `0 4px 16px rgba(230,57,70,0.25)` }}>V</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "clamp(13px,2vw,16px)", letterSpacing: 1, color: T.text, lineHeight: 1 }}>{info.mallName?.toUpperCase() ?? "V SQUARE MALL"}</div>
                  <div style={{ fontSize: "clamp(8px,1vw,9px)", color: T.textLight, letterSpacing: 3 }}>{info.tagline?.toUpperCase() ?? "SHOPPING CENTRE"}</div>
                </div>
              </div>
            )
          }

          <nav className="deskNav" style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase().replace(/\s/g, "-"))}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 14px", fontSize: 13, fontWeight: 500, color: T.textLight, borderRadius: 8, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = T.red; e.currentTarget.style.background = "rgba(230,57,70,0.06)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = T.textLight; e.currentTarget.style.background = "none"; }}
              >{link}</button>
            ))}
          </nav>

          <div style={{ display: "flex", gap: "clamp(6px,2vw,10px)", alignItems: "center" }}>
            <button style={{ background: `linear-gradient(135deg,${T.red},${T.pink})`, color: "#fff", border: "none", borderRadius: 24, padding: "clamp(7px,1.5vw,9px) clamp(14px,3vw,20px)", fontSize: "clamp(11px,1.5vw,13px)", fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px rgba(230,57,70,0.2)`, transition: "transform 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}
            >🔍 Search</button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="burger" style={{ display: "none", background: "none", border: "none", color: T.text, fontSize: "clamp(22px,3vw,26px)", cursor: "pointer", padding: "4px 8px" }}>☰</button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background: "rgba(255,255,255,0.98)", borderTop: `1px solid ${T.border}`, padding: "12px 24px", animation: "slideUp 0.2s ease", maxHeight: "80vh", overflowY: "auto" }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase().replace(/\s/g, "-"))}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 0", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: T.text, borderBottom: `1px solid ${T.border}` }}
              >{link}</button>
            ))}
          </div>
        )}
      </header>

      {/* ══ HERO BANNER ══ */}
      {loading ? <BannerSkeleton /> : (
        <section style={{ position: "relative", height: isMobile ? "70vh" : "100vh", minHeight: 500, overflow: "hidden" }}>
          {data.banners.map((banner, i) => (
            <div
              key={banner.id}
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${banner.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: i === slide ? 1 : 0,
                transition: "opacity 1s ease-in-out",
                animation: i === slide ? "imageSlide 1.2s ease-out" : "none",
              }}
            />
          ))}
          
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)" }} />
          
          <div className="hero-content" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 clamp(20px,5vw,60px)", paddingTop: isMobile ? 60 : 80 }}>
            <div key={slide} style={{ maxWidth: 640, animation: "slideUp 0.6s ease" }}>
              <div style={{ display: "inline-block", background: s.accent, color: "#fff", borderRadius: 6, padding: "5px 14px", fontSize: "clamp(9px,1.5vw,11px)", fontWeight: 800, letterSpacing: 3, marginBottom: "clamp(12px,2vw,18px)", boxShadow: `0 4px 20px ${s.accent}55` }}>{s.tag}</div>
              <h1 style={{ fontSize: "clamp(28px,6vw,64px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 clamp(12px,2vw,18px)", color: "#fff", whiteSpace: "pre-line", textShadow: "0 2px 30px rgba(0,0,0,0.5)" }}>{s.title}</h1>
              <p style={{ fontSize: "clamp(14px,2.5vw,17px)", color: "rgba(255,255,255,0.9)", marginBottom: "clamp(20px,4vw,32px)", lineHeight: 1.6, textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}>{s.sub}</p>
              <div className="hero-buttons" style={{ display: "flex", gap: "clamp(10px,2vw,14px)", flexWrap: "wrap" }}>
                <button style={{ background: s.accent, color: "#fff", border: "none", borderRadius: 32, padding: "clamp(12px,2vw,14px) clamp(24px,4vw,36px)", fontSize: "clamp(13px,2vw,15px)", fontWeight: 800, cursor: "pointer", boxShadow: `0 6px 24px ${s.accent}60`, transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}
                >{s.cta} →</button>
                <button style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 32, padding: "clamp(12px,2vw,14px) clamp(20px,3vw,28px)", fontSize: "clamp(13px,2vw,15px)", fontWeight: 600, cursor: "pointer", backdropFilter: "blur(10px)" }}>Learn More</button>
              </div>
            </div>
          </div>
          
          <div style={{ position: "absolute", bottom: "clamp(20px,4vw,32px)", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
            {data.banners.map((_, i) => (
              <button key={i} onClick={() => goSlide(i)} style={{ width: i === slide ? 32 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", background: i === slide ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.4s" }} />
            ))}
          </div>
          
          {!isMobile && [-1, 1].map((dir, idx) => (
            <button key={dir} onClick={() => goSlide((slide + dir + data.banners.length) % data.banners.length)}
              className="nav-arrows"
              style={{ position: "absolute", [idx === 0 ? "left" : "right"]: 20, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", width: 46, height: 46, borderRadius: "50%", cursor: "pointer", fontSize: 20, backdropFilter: "blur(10px)", zIndex: 10, transition: "background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
            >{dir < 0 ? "‹" : "›"}</button>
          ))}
          
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "clamp(60px,10vw,120px)", background: `linear-gradient(to bottom,transparent,${T.bg})` }} />
        </section>
      )}

      {/* ══ TICKER BAR ══ */}
      {loading ? <InfoBarSkeleton /> : (
        <div style={{ background: `linear-gradient(270deg,${T.red},${T.pink},${T.purp},${T.blue},${T.teal},${T.red})`, backgroundSize: "400% 400%", animation: "tickerBg 8s ease infinite", padding: "clamp(8px,1.5vw,10px) 0", overflow: "hidden" }}>
          <div style={{ display: "flex", animation: "marquee 24s linear infinite", width: "max-content", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
            {[...Array(2)].map((_, rep) =>
              [`🕙 Open: ${info.hours ?? "10AM – 10PM"}`, `📞 ${info.phone ?? "+91 44 2345 6789"}`, `📍 ${info.address ?? "Chennai"}`, "⭐ Members get Triple Points!", "🛍️ 200+ Brands", "🎉 Food Festival Sat"].map((t, i) => (
                <span key={`${rep}-${i}`} style={{ fontSize: "clamp(11px,1.5vw,13px)", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", letterSpacing: 0.5 }}>{t}</span>
              ))
            )}
          </div>
        </div>
      )}

      {/* ══ STORE DIRECTORY ══ */}
      <section id="store-directory" style={{ padding: "clamp(40px,8vw,80px) clamp(16px,4vw,24px)", background: T.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <SectionHeader eyebrow="EXPLORE" title="Store Directory" sub="200+ stores across 4 floors" />
          {loading ? <CardGridSkeleton count={6} h={170} /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(160px,100%),1fr))", gap: "clamp(12px,2vw,18px)" }}>
              {data.storeCategories.map((cat, i) => (
                <Reveal key={cat.id} delay={i * 0.08}>
                  <div style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s", border: `1px solid ${T.border}`, background: T.surface }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >
                    <div style={{ background: cat.grad, padding: "clamp(20px,4vw,28px) clamp(16px,3vw,20px) clamp(16px,3vw,20px)", textAlign: "center" }}>
                      <div style={{ fontSize: "clamp(32px,5vw,42px)", marginBottom: 10, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}>{cat.icon}</div>
                      <div style={{ fontWeight: 800, fontSize: "clamp(13px,2vw,15px)", color: "#fff", marginBottom: 4 }}>{cat.name}</div>
                      <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{cat.count}</div>
                    </div>
                    <div style={{ background: T.bg, padding: "clamp(10px,2vw,12px) clamp(16px,3vw,20px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "clamp(11px,1.5vw,12px)", color: T.textLight }}>View Stores</span>
                      <span style={{ fontSize: 18, color: T.red }}>→</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
          <Reveal delay={0.4}>
            <div style={{ textAlign: "center", marginTop: "clamp(24px,4vw,36px)" }}>
              <button style={{ background: `linear-gradient(135deg,${T.red},${T.pink})`, color: "#fff", border: "none", borderRadius: 32, padding: "clamp(12px,2vw,14px) clamp(28px,5vw,40px)", fontWeight: 800, fontSize: "clamp(13px,2vw,15px)", cursor: "pointer", boxShadow: `0 8px 28px rgba(230,57,70,0.2)`, transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = ""}
              >View Full Directory →</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section id="services" style={{ padding: "clamp(40px,8vw,80px) clamp(16px,4vw,24px)", background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <SectionHeader eyebrow="WE CARE" title="Services" sub="Everything for a comfortable visit" eyeColor={T.teal} />
          {loading ? <CardGridSkeleton count={6} h={160} /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(180px,100%),1fr))", gap: "clamp(12px,2vw,18px)" }}>
              {data.services.map((sv, i) => (
                <Reveal key={sv.id} delay={i * 0.08}>
                  <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: "clamp(24px,4vw,32px) clamp(20px,3vw,24px)", textAlign: "center", cursor: "pointer", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = sv.col; e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.06)`; e.currentTarget.style.transform = "translateY(-6px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}
                  >
                    <div style={{ fontSize: "clamp(32px,5vw,38px)", marginBottom: 12 }}>{sv.icon}</div>
                    <div style={{ fontWeight: 800, color: T.text, marginBottom: 8, fontSize: "clamp(13px,2vw,15px)" }}>{sv.name}</div>
                    <div style={{ fontSize: "clamp(12px,1.5vw,13px)", color: T.textLight, lineHeight: 1.5 }}>{sv.desc}</div>
                    <div style={{ marginTop: 16, width: 32, height: 3, borderRadius: 2, background: sv.col, margin: "16px auto 0" }} />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ PROMOTIONS ══ */}
      <section id="promotions" style={{ padding: "clamp(40px,8vw,80px) clamp(16px,4vw,24px)", background: T.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <SectionHeader eyebrow="THIS WEEK" title="Promotions & Events" sub="Don't miss what's happening" eyeColor={T.gold} />
          {loading ? <CardGridSkeleton count={4} h={180} /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(250px,100%),1fr))", gap: "clamp(16px,3vw,22px)" }}>
              {data.promotions.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.1}>
                  <div style={{ borderRadius: 22, overflow: "hidden", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s", border: `1px solid ${T.border}`, background: T.surface }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 24px 48px rgba(0,0,0,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >
                    <div style={{ background: p.grad, padding: "clamp(20px,3vw,24px) clamp(18px,3vw,22px) clamp(16px,3vw,20px)" }}>
                      <span style={{ background: "rgba(255,255,255,0.3)", color: "#fff", fontSize: "clamp(9px,1.2vw,10px)", fontWeight: 800, letterSpacing: 2, padding: "4px 10px", borderRadius: 20 }}>{p.tag}</span>
                      <h3 style={{ color: "#fff", fontSize: "clamp(18px,3vw,22px)", fontWeight: 900, margin: "14px 0 0", lineHeight: 1.2 }}>{p.title}</h3>
                    </div>
                    <div style={{ background: T.bg, padding: "clamp(14px,2vw,16px) clamp(18px,3vw,22px)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "clamp(13px,1.5vw,14px)", color: T.text }}>{p.store}</div>
                        <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: T.textLight }}>{p.expiry}</div>
                      </div>
                      <span style={{ background: "rgba(230,57,70,0.1)", borderRadius: 20, padding: "6px 16px", fontSize: "clamp(11px,1.5vw,12px)", fontWeight: 700, color: T.red }}>View →</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ OFFERS ══ */}
      <section id="offers" style={{ padding: "clamp(40px,8vw,80px) clamp(16px,4vw,24px)", background: T.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <SectionHeader eyebrow="HOT DEALS" title="Offers" sub="Exclusive deals, only at V Square Mall" />
          {loading ? <CardGridSkeleton count={4} h={240} /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(200px,100%),1fr))", gap: "clamp(16px,3vw,22px)" }}>
              {data.offers.map((o, i) => (
                <Reveal key={o.id} delay={i * 0.1}>
                  <div style={{ background: T.surface, border: `1px solid ${o.col}30`, borderRadius: 22, padding: "clamp(28px,5vw,36px) clamp(18px,3vw,22px)", textAlign: "center", cursor: "pointer", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = o.col; e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.08)`; e.currentTarget.style.transform = "scale(1.04)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${o.col}30`; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = ""; }}
                  >
                    <div style={{ fontSize: "clamp(40px,6vw,48px)", marginBottom: 12 }}>{o.img}</div>
                    <div style={{ fontSize: "clamp(44px,7vw,52px)", fontWeight: 900, color: o.col, lineHeight: 1 }}>{o.pct}</div>
                    <div style={{ fontSize: "clamp(11px,1.5vw,12px)", color: T.textLight, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>OFF</div>
                    <div style={{ fontWeight: 800, fontSize: "clamp(15px,2vw,17px)", color: T.text }}>{o.store}</div>
                    <div style={{ fontSize: "clamp(12px,1.5vw,13px)", color: T.textLight, marginBottom: 16 }}>{o.cat}</div>
                    <div style={{ background: o.col, borderRadius: 20, padding: "clamp(7px,1vw,8px) clamp(18px,3vw,22px)", fontSize: "clamp(12px,1.5vw,13px)", fontWeight: 700, color: "#fff", display: "inline-block" }}>Grab Deal</div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ TOP BRANDS ══ */}
      <section id="top-brands" style={{ padding: "clamp(40px,8vw,80px) clamp(16px,4vw,24px)", background: T.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <SectionHeader eyebrow="FEATURED" title="Top Brands" sub="World-class names, all under one roof" eyeColor={T.teal} />
          {loading ? <PillsSkeleton count={14} /> : (
            <Reveal delay={0.2}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(8px,1.5vw,12px)", justifyContent: "center" }}>
                {data.topBrands.map((brand, i) => (
                  <div key={brand.id} style={{ border: `1px solid ${T.border}`, borderRadius: 40, padding: "clamp(9px,1.5vw,11px) clamp(18px,3vw,26px)", fontWeight: 700, fontSize: "clamp(12px,1.8vw,14px)", color: T.textLight, cursor: "pointer", transition: "all 0.25s", background: T.surface }}
                    onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg,${T.red},${T.pink})`; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = `0 8px 24px rgba(230,57,70,0.2)`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = T.surface; e.currentTarget.style.color = T.textLight; e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                  >{brand.name}</div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{ padding: "clamp(40px,8vw,90px) clamp(16px,4vw,24px)", background: T.bg }}>
        <div ref={aboutRef} style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(30px,5vw,70px)", alignItems: "center", position: "relative" }}>
          <Reveal dir="left">
            <div>
              <span style={{ color: T.gold, fontWeight: 700, fontSize: "clamp(10px,1.5vw,12px)", letterSpacing: 4 }}>SINCE 2001</span>
              <h2 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 900, color: T.text, margin: "12px 0 18px", lineHeight: 1.15 }}>Chennai's Favourite Shopping Destination</h2>
              <p style={{ color: T.textLight, fontSize: "clamp(13px,2vw,15px)", lineHeight: 1.9, marginBottom: 16 }}>V Square Mall has been at the heart of Chennai's retail and entertainment scene for over two decades. Spread across 1.2 million sq ft, we bring an unparalleled shopping, dining, and lifestyle experience.</p>
              <p style={{ color: T.textLight, fontSize: "clamp(13px,2vw,15px)", lineHeight: 1.9, marginBottom: 28 }}>With 200+ stores, 30+ dining options, a cinema, arcade, and a dedicated kids' zone — V Square Mall is more than a mall, it's a destination.</p>
              <button style={{ background: `linear-gradient(135deg,${T.gold},${T.red})`, color: "#fff", border: "none", borderRadius: 32, padding: "clamp(11px,2vw,13px) clamp(24px,4vw,32px)", fontSize: "clamp(12px,2vw,14px)", fontWeight: 800, cursor: "pointer", boxShadow: `0 6px 20px rgba(244,162,97,0.3)` }}>Our Story →</button>
            </div>
          </Reveal>
          <Reveal dir="right" delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr", gap: "clamp(10px,2vw,16px)" }}>
              {ABOUT_STATS.map(st => <StatCard key={st.label} {...st} active={aboutInView} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ MALL MAP ══ */}
      <section id="mall-map" style={{ padding: "clamp(40px,8vw,80px) clamp(16px,4vw,24px)", background: T.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <SectionHeader eyebrow="FIND YOUR WAY" title="Mall Map" sub="Navigate across floors with ease" eyeColor={T.teal} />
          <Reveal delay={0.15}>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ display: "flex", gap: 10, flexDirection: isMobile ? "row" : "column", overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 8 : 0 }}>
                {FLOORS.map(f => (
                  <button key={f.floor} onClick={() => setFloor(f.floor)} style={{ background: activeFloor === f.floor ? `linear-gradient(135deg,${T.red},${T.pink})` : T.bg, color: activeFloor === f.floor ? "#fff" : T.text, border: `1px solid ${activeFloor === f.floor ? "transparent" : T.border}`, borderRadius: 12, padding: "clamp(12px,2vw,14px) clamp(16px,3vw,18px)", fontWeight: 800, cursor: "pointer", fontSize: "clamp(12px,2vw,14px)", transition: "all 0.25s", boxShadow: activeFloor === f.floor ? `0 4px 16px rgba(230,57,70,0.2)` : "none", whiteSpace: "nowrap", minWidth: isMobile ? "auto" : 90, flex: isMobile ? "1" : "none" }}>{f.floor}</button>
                ))}
              </div>
              <div style={{ flex: 1, background: T.bg, border: `1px solid ${T.border}`, borderRadius: 22, padding: "clamp(20px,4vw,28px)", minHeight: 260 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(16px,3vw,24px)", flexWrap: "wrap", gap: 10 }}>
                  <h3 style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 800, color: T.text, margin: 0 }}>{FLOORS.find(f => f.floor === activeFloor)?.label}</h3>
                  <span style={{ background: `linear-gradient(135deg,${T.red},${T.pink})`, color: "#fff", borderRadius: 20, padding: "4px 16px", fontSize: "clamp(10px,1.5vw,12px)", fontWeight: 800 }}>{activeFloor}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(8px,1.5vw,12px)", marginBottom: 20 }}>
                  {FLOORS.find(f => f.floor === activeFloor)?.areas.map(area => (
                    <div key={area.n} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "clamp(14px,2vw,16px) clamp(14px,2vw,18px)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = T.red; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <span style={{ fontSize: "clamp(18px,3vw,22px)" }}>{area.i}</span>
                      <span style={{ fontWeight: 700, fontSize: "clamp(13px,1.8vw,14px)", color: T.text }}>{area.n}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(14,131,136,0.08)", borderRadius: 12, padding: "clamp(12px,2vw,14px) clamp(14px,2vw,18px)", fontSize: "clamp(11px,1.5vw,13px)", color: T.teal, display: "flex", alignItems: "center", gap: 10, border: `1px solid rgba(14,131,136,0.2)` }}>
                  ℹ️ Visit the Concierge at GF for a printed mall map or ask our staff.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ MAP VIEW ══ */}
      <section id="mapview" style={{ padding: `0 clamp(16px,4vw,24px) clamp(40px,8vw,80px)`, background: T.surface }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ borderRadius: 24, overflow: "hidden", border: `1px solid ${T.border}`, boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
              <div style={{ background: T.bg, padding: "clamp(14px,2vw,18px) clamp(18px,3vw,28px)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${T.border}`, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.red, animation: "pulse 2s infinite" }} />
                  <span style={{ color: T.text, fontWeight: 700, fontSize: "clamp(13px,2vw,15px)" }}>📍 Find Us — {loading ? "Chennai" : info.address}</span>
                </div>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(info.address ?? "Anna Salai Chennai")}`} target="_blank" rel="noopener noreferrer" style={{ color: T.red, fontSize: "clamp(11px,1.5vw,13px)", textDecoration: "none", fontWeight: 700, background: "rgba(230,57,70,0.06)", padding: "6px 16px", borderRadius: 20, border: `1px solid ${T.red}30`, whiteSpace: "nowrap" }}>Open in Maps →</a>
              </div>
              {loading
                ? <Sk w="100%" h={400} r={0} />
                : <iframe title="Mall Location" src={info.mapEmbedUrl} width="100%" height={isMobile ? 300 : 400} style={{ border: "none", display: "block" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              }
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding: "clamp(40px,8vw,80px) clamp(16px,4vw,24px)", background: T.bg }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative" }}>
          <SectionHeader eyebrow="GET IN TOUCH" title="Contact Us" sub="We're here to help" eyeColor={T.pink} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "clamp(20px,3vw,26px)" }}>
            <Reveal dir="left" delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,2vw,14px)" }}>
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => <Sk key={i} h={72} r={16} />)
                  : [
                      { icon: "📍", label: "Address", value: info.address,  col: T.red  },
                      { icon: "📞", label: "Phone",   value: info.phone,    col: T.teal },
                      { icon: "📧", label: "Email",   value: info.email,    col: T.blue },
                      { icon: "🕙", label: "Hours",   value: info.hours,    col: T.gold },
                    ].map(item => (
                      <div key={item.label} style={{ background: T.surface, borderRadius: 16, padding: "clamp(14px,2vw,18px) clamp(16px,3vw,22px)", display: "flex", gap: "clamp(12px,2vw,16px)", alignItems: "center", border: `1px solid ${T.border}`, transition: "all 0.25s", cursor: "default" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = item.col; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}
                      >
                        <div style={{ width: "clamp(38px,6vw,44px)", height: "clamp(38px,6vw,44px)", borderRadius: 12, background: `${item.col}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(18px,3vw,20px)", flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <div style={{ fontSize: "clamp(10px,1.5vw,11px)", color: T.textLight, fontWeight: 700, letterSpacing: 1.5, marginBottom: 3 }}>{item.label.toUpperCase()}</div>
                          <div style={{ fontSize: "clamp(13px,1.8vw,14px)", fontWeight: 700, color: T.text }}>{item.value}</div>
                        </div>
                      </div>
                    ))
                }
              </div>
            </Reveal>
            <Reveal dir="right" delay={0.1}>
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 22, padding: "clamp(24px,4vw,30px)" }}>
                <h3 style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 800, color: T.text, margin: "0 0 clamp(18px,3vw,22px)" }}>Send a Message</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px,2vw,14px)" }}>
                  {["Your Name", "Email Address"].map(ph => (
                    <input key={ph} placeholder={ph} style={{ width: "100%", padding: "clamp(11px,2vw,13px) clamp(14px,2vw,16px)", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, fontSize: "clamp(13px,1.8vw,14px)", color: T.text, boxSizing: "border-box", outline: "none" }}
                      onFocus={e => { e.target.style.borderColor = T.red; e.target.style.background = "#fff"; }}
                      onBlur={e => { e.target.style.borderColor = T.border; e.target.style.background = T.bg; }}
                    />
                  ))}
                  <select style={{ width: "100%", padding: "clamp(11px,2vw,13px) clamp(14px,2vw,16px)", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, fontSize: "clamp(13px,1.8vw,14px)", color: T.text, boxSizing: "border-box", outline: "none" }}>
                    <option style={{ background: "#fff" }}>Select Topic</option>
                    {["Store Inquiry", "Feedback", "Lost & Found", "Leasing", "Other"].map(o => <option key={o} style={{ background: "#fff" }}>{o}</option>)}
                  </select>
                  <textarea placeholder="Your message..." rows={4} style={{ width: "100%", padding: "clamp(11px,2vw,13px) clamp(14px,2vw,16px)", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, fontSize: "clamp(13px,1.8vw,14px)", color: T.text, boxSizing: "border-box", outline: "none", resize: "vertical" }}
                    onFocus={e => { e.target.style.borderColor = T.red; e.target.style.background = "#fff"; }}
                    onBlur={e => { e.target.style.borderColor = T.border; e.target.style.background = T.bg; }}
                  />
                  <button style={{ background: `linear-gradient(135deg,${T.red},${T.pink})`, color: "#fff", border: "none", borderRadius: 12, padding: "clamp(13px,2vw,15px)", fontSize: "clamp(13px,2vw,15px)", fontWeight: 800, cursor: "pointer", boxShadow: `0 6px 24px rgba(230,57,70,0.2)`, transition: "transform 0.2s, box-shadow 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = `0 10px 32px rgba(230,57,70,0.3)`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 6px 24px rgba(230,57,70,0.2)`; }}
                  >Send Message →</button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: T.text, color: "#fff", borderTop: `1px solid rgba(255,255,255,0.1)` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(32px,6vw,48px) clamp(16px,4vw,24px) clamp(20px,4vw,24px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: "clamp(24px,4vw,40px)", marginBottom: "clamp(24px,4vw,40px)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${T.red},${T.pink})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 18 }}>V</div>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(14px,2vw,16px)" }}>
                  {loading ? "" : info.mallName}
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(12px,1.5vw,13px)", lineHeight: 1.8, maxWidth: 300 }}>
                {loading ? "" : `${info.address} · ${info.phone} · ${info.email}`}
              </p>
              {!loading && (
                <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                  {info.socialLinks?.map(s => (
                    <a key={s.label} href={s.url} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "clamp(11px,1.5vw,12px)", fontWeight: 600, transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${T.red}40`; e.currentTarget.style.borderColor = T.red; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
                    >{s.label}</a>
                  ))}
                </div>
              )}
            </div>
            
            {!isMobile && (
              <>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 16 }}>QUICK LINKS</div>
                  {NAV_LINKS.map(link => (
                    <div key={link} style={{ marginBottom: 8 }}>
                      <button onClick={() => scrollTo(link.toLowerCase().replace(/\s/g, "-"))}
                        style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "#fff"}
                        onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                      >{link}</button>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 16 }}>LEGAL</div>
                  {loading
                    ? Array.from({ length: 3 }).map((_, i) => <Sk key={i} w={100} h={14} r={6} style={{ marginBottom: 12 }} />)
                    : [
                        { label: "Privacy Policy", url: info.privacyPolicy },
                        { label: "Terms of Use",   url: info.termsUrl      },
                        { label: "Sitemap",        url: info.sitemapUrl    },
                      ].map(item => (
                        <div key={item.label} style={{ marginBottom: 10 }}>
                          <a href={item.url} target="_blank" rel="noopener noreferrer"
                            style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                            onMouseEnter={e => e.target.style.color = T.red}
                            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                          >{item.label}</a>
                        </div>
                      ))
                  }
                </div>
              </>
            )}
            
            {isMobile && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 16 }}>QUICK LINKS</div>
                  {NAV_LINKS.slice(0, 4).map(link => (
                    <div key={link} style={{ marginBottom: 8 }}>
                      <button onClick={() => scrollTo(link.toLowerCase().replace(/\s/g, "-"))}
                        style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "#fff"}
                        onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                      >{link}</button>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 16 }}>MORE</div>
                  {NAV_LINKS.slice(4).map(link => (
                    <div key={link} style={{ marginBottom: 8 }}>
                      <button onClick={() => scrollTo(link.toLowerCase().replace(/\s/g, "-"))}
                        style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "#fff"}
                        onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                      >{link}</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "clamp(11px,1.5vw,12px)" }}>
              © {new Date().getFullYear()} {loading ? "V Square Mall" : info.mallName}. All rights reserved.
            </span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "clamp(10px,1.2vw,11px)", textAlign: "right" }}>
              {loading ? "" : info.inc}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}