import Link from "next/link";
import Image from "next/image";
import { getTopCategories, getCollections, getInStockProducts } from "@/data/store";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
  const categories = getTopCategories();
  const collections = getCollections(3);
  const featured = getInStockProducts().slice(0, 8);
  const under300 = getInStockProducts().filter(p => p.priceInPaise <= 30000).slice(0, 4);

  const catImages: Record<string, string> = {
    "men-jackets": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80&fit=crop&auto=format",
    "women-kurti": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80&fit=crop&auto=format",
    "sneakers":    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80&fit=crop&auto=format",
    "men-shirts":  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80&fit=crop&auto=format",
    "basics":      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80&fit=crop&auto=format",
    "accessories": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80&fit=crop&auto=format",
  };

  return (
    <div className="animate-fade-up">
      {/* ── Hero ── */}
      <section style={{
        background:"linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#a855f7 100%)",
        borderRadius:"var(--radius-lg)", padding:"4rem 2rem", marginBottom:"3rem",
        color:"#fff", position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=60&fit=crop&auto=format)", backgroundSize:"cover", backgroundPosition:"center", opacity:0.15 }} />
        <div style={{ position:"relative", maxWidth:600 }}>
          <span className="badge badge-orange" style={{ marginBottom:"1rem", display:"inline-flex" }}>🔥 New Arrivals</span>
          <h1 style={{ fontSize:"clamp(2rem,5vw,3.25rem)", fontWeight:800, lineHeight:1.1, marginBottom:"1rem", letterSpacing:"-0.03em" }}>
            Fashion that fits<br />your style & budget
          </h1>
          <p style={{ fontSize:"1.125rem", opacity:0.9, marginBottom:"2rem", lineHeight:1.6 }}>
            Jackets, kurtis, sneakers and everyday essentials.<br />Quality picks from <strong>₹159</strong>.
          </p>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <Link href="/c/best-products-under-300" className="btn-accent" style={{ textDecoration:"none" }}>Shop Under ₹300 →</Link>
            <Link href="/men-jackets" style={{ textDecoration:"none", background:"rgba(255,255,255,0.15)", color:"#fff", padding:"0.75rem 1.5rem", borderRadius:"var(--radius)", fontWeight:600, backdropFilter:"blur(4px)" }}>
              Browse Jackets
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap", justifyContent:"center", marginBottom:"3rem" }}>
        {[["🚚","Free delivery above ₹499"],["↩","7-day easy returns"],["🔒","Secure checkout"],["⭐","4.4★ rated by 10,000+ buyers"]].map(([icon,text])=>(
          <div key={text} style={{ display:"flex", alignItems:"center", gap:"0.5rem", padding:"0.5rem 1rem", background:"var(--surface)", borderRadius:"99px", border:"1px solid var(--border)", fontSize:"0.875rem", fontWeight:500 }}>
            <span>{icon}</span><span>{text}</span>
          </div>
        ))}
      </div>

      {/* ── Shop by Category ── */}
      <section style={{ marginBottom:"3rem" }}>
        <h2 style={{ fontSize:"1.5rem", fontWeight:700, marginBottom:"1rem", letterSpacing:"-0.02em" }}>Shop by Category</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))", gap:"1rem" }}>
          {categories.map((c) => (
            <Link key={c.id} href={`/${c.slug}`} style={{ textDecoration:"none", color:"inherit" }}>
              <div className="card" style={{ overflow:"hidden", textAlign:"center" }}>
                <div style={{ aspectRatio:"1/1", background:"var(--surface-2)", position:"relative", overflow:"hidden" }}>
                  {catImages[c.slug] && (
                    <Image src={catImages[c.slug]} alt={c.name} fill style={{ objectFit:"cover" }} sizes="180px" />
                  )}
                </div>
                <div style={{ padding:"0.625rem 0.5rem", fontWeight:600, fontSize:"0.875rem" }}>{c.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Under ₹300 ── */}
      {under300.length > 0 && (
        <section style={{ marginBottom:"3rem" }}>
          <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"1rem" }}>
            <h2 style={{ fontSize:"1.5rem", fontWeight:700, letterSpacing:"-0.02em" }}>
              🏷️ Best Picks Under ₹300
            </h2>
            <Link href="/c/best-products-under-300" style={{ fontSize:"0.875rem", color:"var(--primary)", textDecoration:"none", fontWeight:600 }}>View all →</Link>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1rem" }}>
            {under300.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* ── Featured ── */}
      <section style={{ marginBottom:"3rem" }}>
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:"1rem" }}>
          <h2 style={{ fontSize:"1.5rem", fontWeight:700, letterSpacing:"-0.02em" }}>Featured Products</h2>
          <Link href="/men-jackets" style={{ fontSize:"0.875rem", color:"var(--primary)", textDecoration:"none", fontWeight:600 }}>Shop all →</Link>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1rem" }}>
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ── Curated Collections ── */}
      <section>
        <h2 style={{ fontSize:"1.5rem", fontWeight:700, marginBottom:"1rem", letterSpacing:"-0.02em" }}>Curated Collections</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1rem" }}>
          {collections.filter(c => c.intro).map((c) => (
            <Link key={c.id} href={`/c/${c.slug}`} style={{ textDecoration:"none" }}>
              <div className="card" style={{ padding:"1.5rem" }}>
                <p style={{ fontWeight:700, fontSize:"1.05rem", marginBottom:"0.5rem", color:"var(--primary)" }}>{c.title}</p>
                {c.intro && <p style={{ fontSize:"0.875rem", color:"var(--fg-muted)", lineHeight:1.5, display:"-webkit-box", overflow:"hidden", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{c.intro}</p>}
                <span style={{ display:"inline-block", marginTop:"0.75rem", fontSize:"0.875rem", color:"var(--primary)", fontWeight:600 }}>Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
