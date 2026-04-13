import { useState } from "react";

const theme = {
  bg: "#1a1a1a",
  surface: "#262626",
  surfaceAlt: "#2e2e2e",
  nav: "#52525b",
  accent: "#e8c84a",
  accentDark: "#c9a828",
  white: "#f5f5f5",
  muted: "#a1a1aa",
  border: "#3f3f46",
  danger: "#ef4444",
};

const styles = {
  app: {
    minHeight: "100vh",
    backgroundColor: theme.bg,
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    color: theme.white,
  },
  header: {
    backgroundColor: theme.surface,
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: `2px solid ${theme.accent}`,
    height: "64px",
  },
  logo: {
    fontSize: "2rem",
    letterSpacing: "0.15em",
    color: theme.accent,
    cursor: "pointer",
    textTransform: "uppercase",
    margin: 0,
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  loginBtn: {
    backgroundColor: "transparent",
    border: `1px solid ${theme.accent}`,
    color: theme.accent,
    padding: "6px 18px",
    cursor: "pointer",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    fontSize: "1rem",
    letterSpacing: "0.1em",
    transition: "all 0.2s",
  },
  cartBtn: {
    backgroundColor: theme.accent,
    border: "none",
    color: theme.bg,
    padding: "6px 18px",
    cursor: "pointer",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    fontSize: "1rem",
    letterSpacing: "0.1em",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  nav: {
    backgroundColor: theme.nav,
    display: "flex",
    justifyContent: "center",
    gap: "0",
    padding: "0",
  },
  navLink: (active) => ({
    color: active ? theme.accent : theme.white,
    textDecoration: "none",
    padding: "10px 28px",
    fontSize: "1.1rem",
    letterSpacing: "0.12em",
    cursor: "pointer",
    borderBottom: active ? `3px solid ${theme.accent}` : "3px solid transparent",
    transition: "all 0.15s",
    display: "inline-block",
  }),
  hero: {
    background: `linear-gradient(135deg, #0f0f0f 0%, #262626 50%, #1a1a1a 100%)`,
    padding: "5rem 2rem",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroTitle: {
    fontSize: "6rem",
    letterSpacing: "0.2em",
    color: theme.accent,
    margin: "0 0 0.5rem",
    lineHeight: 1,
    textTransform: "uppercase",
  },
  heroSub: {
    fontSize: "1.5rem",
    letterSpacing: "0.3em",
    color: theme.muted,
    marginBottom: "2rem",
    textTransform: "uppercase",
  },
  heroBtn: {
    backgroundColor: theme.accent,
    color: theme.bg,
    border: "none",
    padding: "14px 48px",
    fontSize: "1.4rem",
    letterSpacing: "0.15em",
    cursor: "pointer",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    transition: "transform 0.15s",
  },
  section: {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    letterSpacing: "0.2em",
    color: theme.accent,
    marginBottom: "0.25rem",
    textTransform: "uppercase",
  },
  sectionLine: {
    width: "60px",
    height: "3px",
    backgroundColor: theme.accent,
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "1.5rem",
  },
  card: (hovered) => ({
    backgroundColor: theme.surface,
    border: `1px solid ${hovered ? theme.accent : theme.border}`,
    cursor: "pointer",
    transition: "all 0.2s",
    transform: hovered ? "translateY(-4px)" : "none",
    overflow: "hidden",
  }),
  cardImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    display: "block",
    backgroundColor: theme.surfaceAlt,
  },
  cardImgPlaceholder: (color) => ({
    width: "100%",
    height: "200px",
    backgroundColor: color || "#2e2e2e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
    color: theme.accent,
  }),
  cardBody: {
    padding: "1rem",
  },
  cardName: {
    fontSize: "1.2rem",
    letterSpacing: "0.1em",
    color: theme.white,
    margin: "0 0 0.25rem",
  },
  cardPrice: {
    fontSize: "1.1rem",
    color: theme.accent,
    margin: "0 0 0.75rem",
  },
  addToCart: {
    width: "100%",
    backgroundColor: theme.accent,
    color: theme.bg,
    border: "none",
    padding: "8px 0",
    fontFamily: "'Bebas Neue', 'Impact', sans-serif",
    fontSize: "1rem",
    letterSpacing: "0.1em",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  badge: {
    backgroundColor: theme.danger,
    color: "white",
    fontSize: "0.7rem",
    padding: "2px 7px",
    borderRadius: "2px",
    marginLeft: "6px",
    fontFamily: "sans-serif",
    letterSpacing: "0.05em",
  },
  featuredRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    marginBottom: "3rem",
  },
  featuredCard: {
    backgroundColor: theme.surfaceAlt,
    border: `1px solid ${theme.accent}`,
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "200px",
  },
  footer: {
    backgroundColor: theme.surface,
    borderTop: `2px solid ${theme.nav}`,
    padding: "2rem",
    textAlign: "center",
    color: theme.muted,
    fontSize: "0.9rem",
    letterSpacing: "0.1em",
    fontFamily: "sans-serif",
  },
  cartPanel: {
    position: "fixed",
    right: 0,
    top: 0,
    height: "100vh",
    width: "340px",
    backgroundColor: theme.surface,
    borderLeft: `2px solid ${theme.accent}`,
    zIndex: 200,
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
    boxSizing: "border-box",
  },
  cartOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 150,
  },
  emptyMsg: {
    color: theme.muted,
    fontFamily: "sans-serif",
    textAlign: "center",
    marginTop: "2rem",
    fontSize: "0.95rem",
  },
  loginModal: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginBox: {
    backgroundColor: theme.surface,
    border: `2px solid ${theme.accent}`,
    padding: "2.5rem",
    width: "340px",
  },
  input: {
    width: "100%",
    backgroundColor: theme.bg,
    border: `1px solid ${theme.border}`,
    color: theme.white,
    padding: "10px 12px",
    fontFamily: "sans-serif",
    fontSize: "0.95rem",
    marginBottom: "1rem",
    boxSizing: "border-box",
    outline: "none",
  },
};

const products = {
  pants: [
    { id: "p1", name: "Cargo Flex Jogger", price: 64, color: "#3b2a1a", icon: "👖", tag: "NEW" },
    { id: "p2", name: "Ripped Skinny Black", price: 58, color: "#1a1a1a", icon: "👖" },
    { id: "p3", name: "Wide Leg Camo", price: 72, color: "#3a4a30", icon: "👖", tag: "HOT" },
    { id: "p4", name: "Distressed Denim", price: 86, color: "#1e2a3a", icon: "👖" },
    { id: "p5", name: "Track Stripe Pant", price: 54, color: "#1a1a2e", icon: "👖" },
    { id: "p6", name: "Utility Pocket Shorts", price: 42, color: "#2a2210", icon: "👖" },
  ],
  tees: [
    { id: "t1", name: "Oversized Graphic Tee", price: 38, color: "#1e1e1e", icon: "👕", tag: "HOT" },
    { id: "t2", name: "Washed Black Crop", price: 32, color: "#111", icon: "👕" },
    { id: "t3", name: "Skull Print Long Sleeve", price: 44, color: "#1a0a0a", icon: "👕", tag: "NEW" },
    { id: "t4", name: "Tie-Dye Streetwear Tee", price: 36, color: "#1a1533", icon: "👕" },
    { id: "t5", name: "No Rules Tee", price: 34, color: "#2a1a1a", icon: "👕" },
    { id: "t6", name: "Glitch Logo Tee", price: 40, color: "#0a0f1e", icon: "👕" },
  ],
  accessories: [
    { id: "a1", name: "Studded Belt", price: 28, color: "#1a0f0a", icon: "⚡", tag: "NEW" },
    { id: "a2", name: "Bucket Hat Black", price: 24, color: "#111", icon: "🧢" },
    { id: "a3", name: "Chain Necklace Set", price: 36, color: "#1e1e1e", icon: "⚡" },
    { id: "a4", name: "Crossbody Bag", price: 52, color: "#1a1218", icon: "🎒", tag: "HOT" },
    { id: "a5", name: "Beanie Knit Black", price: 22, color: "#111", icon: "🧢" },
    { id: "a6", name: "Fingerless Gloves", price: 18, color: "#1a1a1a", icon: "⚡" },
  ],
  shoes: [
    { id: "s1", name: "Platform Chunky Boot", price: 118, color: "#1a0f0a", icon: "👟", tag: "HOT" },
    { id: "s2", name: "High-Top Canvas", price: 86, color: "#111", icon: "👟" },
    { id: "s3", name: "Slip-On Grunge", price: 72, color: "#1a1a1a", icon: "👟", tag: "NEW" },
    { id: "s4", name: "Retro Skate Shoe", price: 94, color: "#1e1428", icon: "👟" },
    { id: "s5", name: "Combat Lace-Up", price: 128, color: "#0f0f0f", icon: "👟" },
    { id: "s6", name: "Mesh Runner", price: 102, color: "#1a1e24", icon: "👟" },
  ],
};

const navItems = ["Home", "Pants", "Tees", "Accessories", "Shoes"];

function ProductCard({ product, onAdd }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={styles.card(hovered)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.cardImgPlaceholder(product.color)}>
        <span style={{ fontSize: "3.5rem" }}>{product.icon}</span>
      </div>
      <div style={styles.cardBody}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem" }}>
          <p style={styles.cardName}>{product.name}</p>
          {product.tag && <span style={styles.badge}>{product.tag}</span>}
        </div>
        <p style={styles.cardPrice}>${product.price}</p>
        <button style={styles.addToCart} onClick={() => onAdd(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ProductPage({ category, onAdd }) {
  const items = products[category];
  const title = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.sectionLine} />
      <div style={styles.grid}>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}

function HomePage({ setPage, onAdd }) {
  const featured = [
    products.pants[2], products.tees[0], products.shoes[0], products.accessories[3],
  ];
  return (
    <>
      <div style={styles.hero}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 30px, #e8c84a 30px, #e8c84a 31px)",
          pointerEvents: "none"
        }} />
        <h1 style={styles.heroTitle}>Teenage Kicks</h1>
        <p style={styles.heroSub}>Street. Bold. Unfiltered.</p>
        <button style={styles.heroBtn} onClick={() => setPage("Tees")}>
          Shop Now
        </button>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured Drops</h2>
        <div style={styles.sectionLine} />
        <div style={styles.grid}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: theme.surfaceAlt, padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={styles.featuredRow}>
            <div style={styles.featuredCard}>
              <div>
                <h3 style={{ fontSize: "2rem", color: theme.accent, margin: "0 0 0.5rem", letterSpacing: "0.15em" }}>NEW SEASON</h3>
                <p style={{ color: theme.muted, fontFamily: "sans-serif", fontSize: "0.9rem", margin: 0 }}>
                  Fresh kicks & fits just dropped. Be the first to wear what the streets are talking about.
                </p>
              </div>
              <button style={{ ...styles.heroBtn, padding: "10px 28px", fontSize: "1.1rem", marginTop: "1.5rem", alignSelf: "flex-start" }}
                onClick={() => setPage("Shoes")}>
                View Shoes
              </button>
            </div>
            <div style={{ ...styles.featuredCard, backgroundColor: theme.bg }}>
              <div>
                <h3 style={{ fontSize: "2rem", color: theme.white, margin: "0 0 0.5rem", letterSpacing: "0.15em" }}>ACCESSORIES</h3>
                <p style={{ color: theme.muted, fontFamily: "sans-serif", fontSize: "0.9rem", margin: 0 }}>
                  Complete the look with our curated accessories. Chains, bags, hats & more.
                </p>
              </div>
              <button style={{ ...styles.heroBtn, padding: "10px 28px", fontSize: "1.1rem", marginTop: "1.5rem", alignSelf: "flex-start", backgroundColor: theme.nav }}
                onClick={() => setPage("Accessories")}>
                Shop Accessories
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CartPanel({ cart, onClose, onRemove }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  return (
    <>
      <div style={styles.cartOverlay} onClick={onClose} />
      <div style={styles.cartPanel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.8rem", letterSpacing: "0.15em", margin: 0, color: theme.accent }}>Your Cart</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: theme.muted, fontSize: "1.5rem", cursor: "pointer" }}>✕</button>
        </div>
        {cart.length === 0 ? (
          <p style={styles.emptyMsg}>Your cart is empty.</p>
        ) : (
          <div style={{ flex: 1, overflowY: "auto" }}>
            {cart.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
                <div>
                  <p style={{ margin: 0, fontSize: "1rem", letterSpacing: "0.08em", color: theme.white }}>{item.name}</p>
                  <p style={{ margin: 0, color: theme.accent, fontSize: "0.95rem" }}>${item.price}</p>
                </div>
                <button onClick={() => onRemove(i)} style={{ background: "none", border: "none", color: theme.muted, cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div style={{ marginTop: "1.5rem", borderTop: `2px solid ${theme.accent}`, paddingTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.3rem", letterSpacing: "0.1em" }}>Total</span>
              <span style={{ fontSize: "1.3rem", color: theme.accent }}>${total}</span>
            </div>
            <button style={{ ...styles.heroBtn, width: "100%", padding: "12px 0", fontSize: "1.2rem" }}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div style={styles.loginModal} onClick={onClose}>
      <div style={styles.loginBox} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: "2rem", color: theme.accent, margin: "0 0 1.5rem", letterSpacing: "0.15em" }}>Login</h2>
        <input style={styles.input} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
        <button style={{ ...styles.heroBtn, width: "100%", padding: "12px 0", fontSize: "1.2rem" }}>
          Sign In
        </button>
        <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: theme.muted, textAlign: "center", marginTop: "1rem" }}>
          Don't have an account? <span style={{ color: theme.accent, cursor: "pointer" }}>Sign Up</span>
        </p>
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: theme.muted, fontSize: "1.5rem", cursor: "pointer" }} />
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const addToCart = (product) => {
    setCart((c) => [...c, product]);
  };
  const removeFromCart = (i) => {
    setCart((c) => c.filter((_, idx) => idx !== i));
  };

  const renderPage = () => {
    if (page === "Home") return <HomePage setPage={setPage} onAdd={addToCart} />;
    return <ProductPage category={page.toLowerCase()} onAdd={addToCart} />;
  };

  return (
    <div style={styles.app}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />

      <header style={styles.header}>
        <h1 style={styles.logo} onClick={() => setPage("Home")}>Teenage Kicks</h1>
        <div style={styles.headerRight}>
          <button style={styles.loginBtn} onClick={() => setLoginOpen(true)}>Login</button>
          <button style={styles.cartBtn} onClick={() => setCartOpen(true)}>
            Cart {cart.length > 0 && <span style={{ backgroundColor: theme.bg, color: theme.accent, borderRadius: "50%", width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem" }}>{cart.length}</span>}
          </button>
        </div>
      </header>

      <nav style={styles.nav}>
        {navItems.map((item) => (
          <span key={item} style={styles.navLink(page === item)} onClick={() => setPage(item)}>
            {item}
          </span>
        ))}
      </nav>

      {renderPage()}

      <footer style={styles.footer}>
        <p style={{ margin: "0 0 0.5rem" }}>© 2026 Teenage Kicks — All rights reserved</p>
        <p style={{ margin: 0, fontSize: "0.8rem" }}>Street Style · Unfiltered · Bold</p>
      </footer>

      {cartOpen && <CartPanel cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}
