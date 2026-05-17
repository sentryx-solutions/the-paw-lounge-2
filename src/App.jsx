import { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";

const NAV_LINKS = ["Home", "Services", "Products", "Pets", "Contact"];

const SERVICES = [
  {
    icon: "✂️",
    title: "Pet Grooming",
    desc: "Full luxury grooming for dogs and cats — cuts, styling, nail trimming and finishing touches fit for royalty.",
    color: "#C89B3C",
  },
  {
    icon: "🛁",
    title: "Spa & Bathing",
    desc: "Comfort-focused bathing with premium shampoos, aromatherapy rinses, and coat conditioning treatments.",
    color: "#0B2341",
  },
  {
    icon: "🎀",
    title: "Pet Accessories",
    desc: "Curated premium collars, leashes, toys, and grooming essentials for the discerning pet owner.",
    color: "#C89B3C",
  },
  {
    icon: "🥣",
    title: "Premium Pet Food",
    desc: "Nutritionist-approved, natural and grain-free food ranges crafted for optimal pet health and vitality.",
    color: "#0B2341",
  },
];

const PETS = [
  {
    name: "Golden Retriever",
    category: "Dog",
    image: "/pets/dog.png",
    desc: "Gentle, loving, and perfect for families. Fully vaccinated and health checked.",
    color: "#FFF3D4",
  },
  {
    name: "Persian Cat",
    category: "Cat",
    image: "/pets/cat.png",
    desc: "Elegant and affectionate long-haired companion. Groomed and socialized.",
    color: "#F0E8FF",
  },
  {
    name: "Rabbit",
    category: "Rabbit",
    image: "/pets/rabbit.png",
    desc: "Adorably floppy-eared and docile. Litter trained and ready to love.",
    color: "#E8F5E9",
  },
  {
    name: "Parrot",
    category: "Bird",
    image: "/pets/parrot.png",
    desc: "Playful, vocal and intelligent. Hand-tamed and cage-ready with accessories.",
    color: "#FFF8E1",
  },
];

const PRODUCTS = [
  { name: "Royal Canin Dog Food", cat: "Dog Food", image: "/products/dog-food.png", bg: "#FFF3D4" },
  { name: "Whiskas Premium", cat: "Cat Food", image: "/products/cat-food.png", bg: "#E8F5E9" },
  { name: "Rope Tug Toy", cat: "Toys", image: "/products/toy.png", bg: "#F0E8FF" },
  { name: "Leather Premium Leash", cat: "Leashes", image: "/products/leash.png", bg: "#FFF8E1" },
  { name: "Stainless Steel Bowl", cat: "Bowls", image: "/products/bowl.png", bg: "#E8F4FF" },
  { name: "De-Shedding Brush", cat: "Grooming", image: "/products/brush.png", bg: "#FFF0F0" },
];

const WHY_US = [
  { icon: "🏆", title: "Expert Care", desc: "Trained professional groomers with 5+ years of experience." },
  { icon: "💚", title: "Healthy Pets", desc: "Vet-approved care protocols for every service we offer." },
  { icon: "⭐", title: "Premium Products", desc: "Only the finest brands available in our curated store." },
  { icon: "🤝", title: "Friendly Environment", desc: "Calm, stress-free atmosphere designed with your pet in mind." },
  { icon: "🫧", title: "Hygiene First", desc: "Thoroughly sanitised facilities after every single session." },
];

// ── Responsive hook ──────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

// ── InView / FadeIn ──────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const transforms = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-link {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #C89B3C; }
        .nav-cta {
          background: linear-gradient(135deg, #C89B3C, #E8C46A);
          color: #0B2341;
          padding: 10px 22px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 13px;
          text-decoration: none;
          letter-spacing: 0.5px;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(200,155,60,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .nav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(200,155,60,0.5);
        }
        .hamburger {
          background: none;
          border: none;
          cursor: pointer;
          color: #fff;
          font-size: 26px;
          line-height: 1;
          padding: 4px 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mobile-menu {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          background: rgba(11,35,65,0.98);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(200,155,60,0.2);
          padding: 24px 5%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: slideDown 0.3s ease;
          z-index: 99;
        }
        .mobile-nav-link {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 15px;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 500;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: #C89B3C; }
        .mobile-cta {
          background: linear-gradient(135deg, #C89B3C, #E8C46A);
          color: #0B2341;
          padding: 14px 22px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          text-align: center;
          margin-top: 4px;
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(11,35,65,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,155,60,0.2)" : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 72,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <img
              src="/hero/logo.png"
              alt="The Paw Lounge"
              style={{ width: 80, height: 80, objectFit: "contain", transform: "translateY(6px)" }}
            />
            <div>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#C89B3C", lineHeight: 1.1 }}>
                The Paw Lounge
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>
                CANINE AND FELINE GROOMI
              </div>
            </div>
          </div>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
              {NAV_LINKS.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
              ))}
              <a href="tel:9542905904" className="nav-cta">📞 Call Now</a>
            </div>
          )}

          {/* Hamburger */}
          {isMobile && (
            <button
              className="hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="mobile-nav-link" onClick={handleNavClick}>{l}</a>
          ))}
          <a href="tel:9542905904" className="mobile-cta" onClick={handleNavClick}>📞 Call Now</a>
        </div>
      )}
    </>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [float, setFloat] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    let frame;
    const animate = (t) => {
      setFloat(Math.sin(t / 1200) * 12);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const circleSize = isMobile ? 280 : 460;

  return (
    <section id="home" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #050f1e 0%, #0B2341 45%, #0f2d50 100%)",
      position: "relative", display: "flex", alignItems: "center", overflow: "hidden",
    }}>
      {/* Decorative orbs */}
      <div style={{ position: "absolute", top: "10%", right: "5%", width: isMobile ? 220 : 500, height: isMobile ? 220 : 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,155,60,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "0%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,155,60,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", opacity: 0.07 }} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0,200 C360,60 1080,60 1440,200 Z" fill="#C89B3C" />
      </svg>

      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: isMobile ? "100px 6% 60px" : "120px 5% 80px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? 40 : 60,
        alignItems: "center",
        width: "100%",
        boxSizing: "border-box",
      }}>
        {/* Left text */}
        <div>
          <FadeIn delay={0}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,155,60,0.15)", border: "1px solid rgba(200,155,60,0.3)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C89B3C", display: "inline-block" }} />
              <span style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
                Vizag's Premium Pet Spa
              </span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: "0 0 24px",
            }}>
              Luxury Care for<br />
              <span style={{ background: "linear-gradient(135deg, #C89B3C, #E8C46A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Your Beloved Pets
              </span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
  style={{
    color: "rgba(255,255,255,0.65)",
    fontSize: isMobile ? 14 : 16,
    lineHeight: 1.8,
    marginBottom: 40,
    maxWidth: 500,
  }}
>
  Professional grooming, indulgent bathing, premium pet food,
  accessories, and healthy pets for loving homes — all under one
  luxurious roof. Backed by{" "}
  <span
    style={{
      color: "#FFD700",
      fontWeight: 700,
      fontSize: isMobile ? 16 : 18,
    }}
  >
    15+ years of experience
  </span>{" "}
  in pet care, we combine expertise, compassion, and premium-quality
  services to keep your furry companions happy, healthy, and pampered.
</p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#services" style={{
                background: "linear-gradient(135deg, #C89B3C, #E8C46A)", color: "#0B2341",
                padding: "14px 28px", borderRadius: 50, fontWeight: 700, fontSize: 14,
                textDecoration: "none", letterSpacing: 0.5,
                boxShadow: "0 8px 30px rgba(200,155,60,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}>Explore Services ✦</a>
              <a href="#contact" style={{
                border: "1.5px solid rgba(200,155,60,0.5)", color: "#C89B3C",
                padding: "14px 28px", borderRadius: 50, fontWeight: 600, fontSize: 14,
                textDecoration: "none", background: "transparent", transition: "all 0.2s",
              }}>Contact Us</a>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 10, marginTop: 40, flexWrap: "wrap" }}>
              {["🏙️ Trusted in Vizag", "✨ Premium Pet Care", "💚 Healthy Pets"].map((b, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 50, padding: "7px 14px", fontSize: 12, color: "rgba(255,255,255,0.75)",
                  transform: `translateY(${float * (i % 2 === 0 ? 1 : -1) * 0.5}px)`,
                  transition: "transform 0.1s",
                }}>{b}</div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right – hero visual */}
        <FadeIn delay={0.2} direction={isMobile ? "up" : "left"}>
          <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", marginTop: isMobile ? 20 : 0 }}>
            <div style={{
              width: circleSize, height: circleSize, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(200,155,60,0.2), rgba(200,155,60,0.05))",
              border: "2px solid rgba(200,155,60,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transform: `translateY(${float}px)`,
              transition: "transform 0.1s linear",
              position: "relative",
            }}>
              <div style={{
                width: circleSize - 20, height: circleSize - 20, borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(11,35,65,0.8), rgba(15,45,80,0.9))",
                border: "1px solid rgba(200,155,60,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", position: "relative",
              }}>
                <img
                  src="/hero/logo.png"
                  alt="The Paw Lounge"
                  style={{
                    position: "absolute",
                    width: "200%", height: "200%",
                    objectFit: "contain", objectPosition: "center",
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -40%)",
                    filter: "drop-shadow(0 0 30px rgba(200,155,60,0.35))",
                  }}
                />
              </div>
              {/* Floating badges */}
              <div style={{
                position: "absolute", top: -10, right: isMobile ? -10 : 10,
                background: "linear-gradient(135deg, #C89B3C, #E8C46A)", borderRadius: 50,
                padding: "8px 14px", fontSize: isMobile ? 11 : 12, fontWeight: 700, color: "#0B2341",
                boxShadow: "0 8px 24px rgba(200,155,60,0.4)",
                transform: `translateY(${float * -0.8}px)`,
                whiteSpace: "nowrap",
              }}>🐈 All pets 🐕 </div>
              <div style={{
                position: "absolute", bottom: 20, left: isMobile ? -15 : -20,
                background: "rgba(255,255,255,0.95)", borderRadius: 16,
                padding: "10px 14px", fontSize: 11, fontWeight: 600, color: "#0B2341",
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                transform: `translateY(${float * 0.6}px)`,
              }}>⭐⭐⭐⭐⭐<br /><span style={{ fontSize: 11, color: "#555" }}>100+ Happy Pets</span></div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Services ─────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ padding: "80px 5%", background: "#FFF8F0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>What We Offer</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#0B2341", margin: "0 0 16px" }}>Premium Services</h2>
            <p style={{ color: "#666", maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>Every service designed with your pet's comfort and well-being as the absolute priority.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <ServiceCard {...s} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", borderRadius: 24, padding: "36px 28px", minHeight: 300,
        boxShadow: hov ? "0 24px 60px rgba(11,35,65,0.14)" : "0 4px 20px rgba(11,35,65,0.06)",
        transform: hov ? "translateY(-8px)" : "none",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        border: `1px solid ${hov ? "rgba(200,155,60,0.3)" : "rgba(0,0,0,0.05)"}`,
        cursor: "default",
      }}
    >
      <div style={{
        width: 60, height: 60, borderRadius: 18, fontSize: 26,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: color === "#C89B3C" ? "rgba(200,155,60,0.1)" : "rgba(11,35,65,0.06)",
        marginBottom: 20,
        transition: "transform 0.3s",
        transform: hov ? "scale(1.1) rotate(5deg)" : "none",
      }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: "#0B2341", margin: "0 0 10px" }}>{title}</h3>
      <p style={{ color: "#777", lineHeight: 1.75, fontSize: 14, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ── Featured Pets ─────────────────────────────────────────────────────────────
function FeaturedPets() {
  return (
    <section id="pets" style={{ padding: "80px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Available Now</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#0B2341", margin: "0 0 16px" }}>Find Your Companion</h2>
            <p style={{ color: "#666", maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>Each pet is health-checked, vaccinated and lovingly cared for — ready for their forever home.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 24 }}>
          {PETS.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <PetCard {...p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function PetCard({ name, category, image, desc, color }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 24, overflow: "hidden",
        boxShadow: hov ? "0 24px 60px rgba(11,35,65,0.14)" : "0 4px 20px rgba(11,35,65,0.06)",
        transform: hov ? "translateY(-8px)" : "none",
        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "default", background: "#fff",
        border: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div style={{
        background: color, height: 180, display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        transition: "transform 0.4s",
        transform: hov ? "scale(1.05)" : "none",
      }}>
        <img src={image} alt={name} style={{ width: 130, height: 175, objectFit: "contain" }} />
      </div>
      <div style={{ padding: "22px 22px 26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#0B2341", margin: 0 }}>{name}</h3>
          <span style={{ background: "rgba(200,155,60,0.12)", color: "#C89B3C", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 50, letterSpacing: 0.5, whiteSpace: "nowrap", marginLeft: 8 }}>{category}</span>
        </div>
        <p style={{ color: "#777", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

// ── Products ─────────────────────────────────────────────────────────────────
function Products() {
  const [active, setActive] = useState("All");
  const cats = ["All", "Dog Food", "Cat Food", "Toys", "Leashes", "Bowls", "Grooming"];
  const filtered = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);
  return (
    <section id="products" style={{ padding: "80px 5%", background: "#F5EFE6" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Our Store</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#0B2341", margin: "0 0 16px" }}>Premium Products</h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
            {cats.map((c) => (
              <button key={c} onClick={() => setActive(c)} style={{
                padding: "9px 20px", borderRadius: 50, border: "none", cursor: "pointer",
                background: active === c ? "#0B2341" : "#fff",
                color: active === c ? "#C89B3C" : "#555",
                fontWeight: active === c ? 700 : 500, fontSize: 13,
                transition: "all 0.25s",
                boxShadow: active === c ? "0 4px 20px rgba(11,35,65,0.2)" : "0 2px 8px rgba(0,0,0,0.06)",
              }}>{c}</button>
            ))}
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {filtered.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08}>
              <ProductCard {...p} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ name, cat, image, bg }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        boxShadow: hov ? "0 16px 40px rgba(11,35,65,0.12)" : "0 2px 12px rgba(11,35,65,0.06)",
        transform: hov ? "translateY(-6px)" : "none",
        transition: "all 0.3s ease", cursor: "default",
      }}
    >
      <div style={{ background: bg, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={image} alt={name} style={{ width: 130, height: 100, objectFit: "contain" }} />
      </div>
      <div style={{ padding: "14px 18px 18px" }}>
        <p style={{ color: "#C89B3C", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, margin: "0 0 5px" }}>{cat}</p>
        <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 14, fontWeight: 700, color: "#0B2341", margin: 0 }}>{name}</h4>
      </div>
    </div>
  );
}

// ── Why Us ────────────────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section style={{ padding: "80px 5%", background: "#0B2341", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,155,60,0.08), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Our Promise</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#fff", margin: 0 }}>Why Choose The Paw Lounge</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 24 }}>
          {WHY_US.map((w, i) => (
            <FadeIn key={w.title} delay={i * 0.1}>
              <WhyCard {...w} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(200,155,60,0.12)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "rgba(200,155,60,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 20, padding: "32px 24px", textAlign: "center",
        transition: "all 0.3s ease",
        transform: hov ? "translateY(-6px)" : "none",
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 14 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: "#C89B3C", margin: "0 0 10px" }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const isMobile = useIsMobile();
  return (
    <section id="contact" style={{ padding: "80px 5%", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Get In Touch</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 700, color: "#0B2341", margin: "0 0 16px" }}>Visit Our Store Today</h2>
            <p style={{ color: "#666", maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>We'd love to meet you and your pet. Drop by or reach out — we're always happy to help.</p>
          </div>
        </FadeIn>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 32 : 50,
          alignItems: "start",
        }}>
          <FadeIn direction="right">
            <div style={{ background: "#0B2341", borderRadius: 28, padding: isMobile ? "36px 28px" : "48px 44px", color: "#fff" }}>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#C89B3C", margin: "0 0 28px" }}>Contact Information</h3>
              {[
                { icon: "📍", label: "Location", val: "Beach Rd, Jalari Peta, Visakhapatnam, Andhra Pradesh 530017" },
                { icon: "📞", label: "Phone", val: "9642189421", link: "tel:9642189421" },
                { icon: "💬", label: "WhatsApp", val: "9642189421", link: "https://wa.me/919642189421" },
                { icon: "✉️", label: "Email", val: "sentryx.solutions@gmail.com", link: "mailto:sentryx.solutions@gmail.com" },
              ].map((c) => (
                <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 22 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(200,155,60,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 3px" }}>{c.label}</p>
                    {c.link ? (
                      <a href={c.link} style={{ color: "#fff", fontSize: 13, fontWeight: 500, textDecoration: "none", wordBreak: "break-all" }}>{c.val}</a>
                    ) : (
                      <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: 0 }}>{c.val}</p>
                    )}
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 28, padding: "18px", background: "rgba(200,155,60,0.1)", borderRadius: 16, border: "1px solid rgba(200,155,60,0.2)" }}>
                <p style={{ color: "#C89B3C", fontWeight: 600, fontSize: 13, margin: "0 0 6px" }}>Business Hours</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: 0, lineHeight: 1.7 }}>Mon–Sat: 9:00 AM – 9:00 PM<br />Sunday: 9:00 AM – 9:00 PM</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div style={{ background: "#F8F4EC", borderRadius: 28, padding: 20, width: "100%", boxSizing: "border-box", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
              <h3 style={{ fontSize: 26, fontWeight: 700, color: "#0B2A52", marginBottom: 16, fontFamily: "'Playfair Display', Georgia, serif" }}>Visit Us</h3>
              <iframe
  src="https://www.google.com/maps?q=17.7403685,83.343301&z=17&output=embed"
  width="100%"
  height={isMobile ? 260 : 340}
  style={{ border: "none", borderRadius: 20, display: "block" }}
  loading="lazy"
  allowFullScreen
  title="Store Location"
/>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: "#050f1e", padding: "60px 5% 28px", borderTop: "1px solid rgba(200,155,60,0.15)" }}>
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="/hero/logo.png" alt="The Paw Lounge" style={{ width: 54, height: 54, objectFit: "contain" }} />
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: "#C89B3C" }}>The Paw Lounge</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase" }}>CANINE AND FELINE GROOMI</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.8, maxWidth: 280, margin: 0 }}>
              Vizag's most trusted premium pet care destination. Luxury grooming, spa treatments, and more — for pets who deserve only the best.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, margin: "0 0 18px" }}>Quick Links</h4>
            {["Home", "Services", "Products", "Pets", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", marginBottom: 9, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#C89B3C"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
              >{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, margin: "0 0 18px" }}>Services</h4>
            {["Pet Grooming", "Spa & Bathing", "Accessories", "Pet Food", "Adoption"].map((s) => (
              <p key={s} style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: "0 0 9px" }}>{s}</p>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#C89B3C", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, margin: "0 0 18px" }}>Contact</h4>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: "0 0 9px" }}>📍 Beac Rd, Jalari Peta, Visakhapatnam, Andhra Pradesh 530017</p>
            <a href="tel:9642189421" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", margin: "0 0 9px" }}>📞 9642189421</a>
            <a href="https://wa.me/919642189421" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", margin: "0 0 9px" }}>💬 WhatsApp Us</a>
            <a href="mailto:sentryx.solutions@gmail.com" style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", wordBreak: "break-all" }}>✉️ sentryx.solutions@gmail.com</a>
          </div>
        </div>
        <div style={{ paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: 0 }}>© 2025 The Paw Lounge. All rights reserved.</p>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, margin: 0 }}>Made with 😊 in Vizag</p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function PawLounge() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);
    const link2 = document.createElement("link");
    link2.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap";
    link2.rel = "stylesheet";
    document.head.appendChild(link2);
    document.title = "The Paw Lounge — Pet Grooming & Spa, Vizag";
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <Services />
      <FeaturedPets />
      <Products />
      <WhyUs />
      <Contact />
      <Footer />
      {/* Floating Action Buttons — stacked vertically */}
      <div style={{
        position: "fixed", bottom: 24, right: 24,
        display: "flex", flexDirection: "column", gap: 14,
        alignItems: "center", zIndex: 9999,
      }}>
        {/* WhatsApp */}
        <a
          href="https://wa.me/919642189421?text=Hi%20The%20Paw%20Lounge"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "#25D366",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 22px rgba(37,211,102,0.5)",
            textDecoration: "none",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(37,211,102,0.65)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(37,211,102,0.5)"; }}
        >
          <FaWhatsapp style={{ color: "white", fontSize: 28 }} />
        </a>

        {/* Call */}
        <a
          href="tel:9642189421"
          title="Call Us"
          style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "linear-gradient(135deg, #C89B3C, #E8C46A)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 22px rgba(200,155,60,0.5)",
            textDecoration: "none", fontSize: 24,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.12)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(200,155,60,0.65)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 22px rgba(200,155,60,0.5)"; }}
        >
          📞
        </a>
      </div>
    </div>
  );
}
