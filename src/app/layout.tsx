import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema-org";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { CartButton } from "@/components/CartButton";
import logo from "@/assets/favicon.jpg";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — Fashion, Buyer-First`, template: `%s | ${SITE_NAME}` },
  description: "Shop men's and women's fashion. Jackets, kurtis, sneakers, basics and accessories. Quality picks from ₹159.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google AdSense — must be in <head> for site verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3720190862522195"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ fontFamily: "var(--font-inter, Inter), ui-sans-serif, system-ui, sans-serif" }}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <CartProvider>
          {/* ── Header ── */}
          <header style={{
            position:"sticky", top:0, zIndex:30,
            background:"rgba(255,255,255,0.95)", backdropFilter:"blur(10px)",
            borderBottom:"1px solid var(--border)", boxShadow:"var(--shadow-sm)",
          }}>
            <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 1rem", height:60, display:"flex", alignItems:"center", gap:"1.5rem" }}>
              {/* Logo */}
              <Link href="/" style={{ display:"flex", alignItems:"center", gap:"0.5rem", fontWeight:800, fontSize:"1.4rem", color:"var(--primary)", textDecoration:"none", letterSpacing:"-0.03em", flexShrink:0 }}>
                <Image src={logo} alt="Trendora" width={32} height={32} style={{ borderRadius: "0.5rem", objectFit: "cover" }} />
                Trendora
              </Link>

              {/* Search bar */}
              <form action="/search" method="GET" style={{ flex:1, maxWidth:480 }}>
                <div style={{ position:"relative" }}>
                  <input
                    name="q"
                    type="search"
                    placeholder="Search for jackets, kurtis, sneakers…"
                    className="input"
                    style={{ paddingLeft:"2.5rem", fontSize:"0.875rem", height:38 }}
                  />
                  <span style={{ position:"absolute", left:"0.75rem", top:"50%", transform:"translateY(-50%)", color:"var(--fg-muted)", pointerEvents:"none" }}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </span>
                </div>
              </form>

              {/* Nav + Cart */}
              <nav style={{ display:"flex", alignItems:"center", gap:"1.5rem", marginLeft:"auto" }}>
                <Link href="/men-jackets" style={{ fontSize:"0.875rem", fontWeight:500, color:"var(--fg)", textDecoration:"none" }} className="nav-link">Men</Link>
                <Link href="/women-kurti" style={{ fontSize:"0.875rem", fontWeight:500, color:"var(--fg)", textDecoration:"none" }}>Women</Link>
                <Link href="/basics" style={{ fontSize:"0.875rem", fontWeight:500, color:"var(--fg)", textDecoration:"none" }}>Basics</Link>
                <Link href="/accessories" style={{ fontSize:"0.875rem", fontWeight:500, color:"var(--fg)", textDecoration:"none" }}>Accessories</Link>
                <CartButton />
              </nav>
            </div>
          </header>

          {/* ── Page ── */}
          <main style={{ maxWidth:1200, margin:"0 auto", padding:"1.5rem 1rem 4rem" }}>
            {children}
          </main>

          {/* ── Footer ── */}
          <footer style={{ borderTop:"1px solid var(--border)", background:"var(--surface)", marginTop:"auto" }}>
            <div style={{ maxWidth:1200, margin:"0 auto", padding:"3rem 1rem 2rem", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"2rem" }}>
              <div>
                <p style={{ fontWeight:800, fontSize:"1.25rem", color:"var(--primary)", marginBottom:"0.75rem", letterSpacing:"-0.02em" }}>Trendora</p>
                <p style={{ fontSize:"0.875rem", color:"var(--fg-muted)", lineHeight:1.6 }}>Buyer-first fashion. Quality picks from ₹159.</p>
              </div>
              <div>
                <p style={{ fontWeight:700, fontSize:"0.875rem", marginBottom:"0.75rem" }}>Shop</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                  {[["Men's Jackets","/men-jackets"],["Women's Kurti","/women-kurti"],["Sneakers","/sneakers"],["Men's Basics","/basics"],["Accessories","/accessories"]].map(([l,h])=>(
                    <Link key={h} href={h} style={{ fontSize:"0.875rem", color:"var(--fg-muted)", textDecoration:"none" }}>{l}</Link>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontWeight:700, fontSize:"0.875rem", marginBottom:"0.75rem" }}>Collections</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                  {[["Winter Jackets","/c/best-men-winter-jackets"],["Under ₹300","/c/best-products-under-300"],["Black Jackets","/c/best-black-jackets-under-1000"]].map(([l,h])=>(
                    <Link key={h} href={h} style={{ fontSize:"0.875rem", color:"var(--fg-muted)", textDecoration:"none" }}>{l}</Link>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontWeight:700, fontSize:"0.875rem", marginBottom:"0.75rem" }}>Help</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem" }}>
                  {["Returns & Exchanges","Size Guide","Track Order","Contact Us"].map((t)=>(
                    <span key={t} style={{ fontSize:"0.875rem", color:"var(--fg-muted)", cursor:"pointer" }}>{t}</span>
                  ))}
                </div>
                <div style={{ marginTop:"1rem", display:"flex", gap:"0.5rem" }}>
                  <span className="badge badge-green">🚚 Free delivery ₹499+</span>
                </div>
                <div style={{ marginTop:"0.5rem" }}>
                  <span className="badge badge-indigo">↩ 7-day returns</span>
                </div>
              </div>
            </div>
            <div style={{ borderTop:"1px solid var(--border)", padding:"1rem", textAlign:"center", fontSize:"0.8rem", color:"var(--fg-subtle)" }}>
              © 2026 Trendora. All rights reserved.
            </div>
          </footer>

          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
