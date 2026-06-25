import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { categories, getCategoryBySlug, getProductsByCategoryId } from "@/data/store";
import { absUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import { breadcrumbSchema, itemListSchema, type BreadcrumbItem } from "@/lib/schema-org";

export function generateStaticParams() {
  return categories.map((c) => {
    const parent = c.parentId ? categories.find((p) => p.id === c.parentId) : undefined;
    return parent ? { category: parent.slug, sub: [c.slug] } : { category: c.slug, sub: [] };
  });
}

function resolveCategory(category: string, sub?: string[]) {
  const segments = [category, ...(sub ?? [])];
  const leafSlug = segments[segments.length - 1];
  const leaf = getCategoryBySlug(leafSlug);
  if (!leaf) return null;
  if (segments.length > 1) {
    const expectedParent = segments[segments.length - 2];
    if (leaf.parent?.slug !== expectedParent) return null;
  } else if (leaf.parentId) return null;
  return leaf;
}

type Params = Promise<{ category: string; sub?: string[] }>;
type SearchParams = Promise<{ color?: string; maxPrice?: string; sort?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category, sub } = await params;
  const cat = resolveCategory(category, sub);
  if (!cat) return {};
  const path = `/${[category, ...(sub ?? [])].join("/")}`;
  return { title: cat.name, description: cat.description ?? `Shop ${cat.name} at Trendora.`, alternates: { canonical: absUrl(path) } };
}

const COLORS = ["Black","White","Blue","Grey","Green","Maroon","Olive","Beige","Pink","Natural"];

export default async function CategoryPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { category, sub } = await params;
  const { color, maxPrice, sort } = await searchParams;

  const cat = resolveCategory(category, sub);
  if (!cat) notFound();

  const segments = [category, ...(sub ?? [])];
  const path = `/${segments.join("/")}`;

  const products = getProductsByCategoryId(cat.id, {
    color: color || undefined,
    maxPriceInPaise: maxPrice ? parseInt(maxPrice) * 100 : undefined,
    sort,
  });

  const crumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    ...segments.map((seg, i) => ({ name: seg.replace(/-/g, " "), path: `/${segments.slice(0, i + 1).join("/")}` })),
  ];

  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { color, maxPrice, sort, ...overrides };
    Object.entries(merged).forEach(([k, v]) => { if (v) p.set(k, v); });
    const qs = p.toString();
    return `${path}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="animate-fade-up">
      <JsonLd data={[breadcrumbSchema(crumbs), itemListSchema(products)]} />
      <Breadcrumbs items={crumbs} />

      <header style={{ marginBottom:"1.5rem", marginTop:"0.75rem" }}>
        <h1 style={{ fontSize:"1.75rem", fontWeight:800, letterSpacing:"-0.02em" }}>{cat.name}</h1>
        {cat.description && <p style={{ marginTop:"0.5rem", color:"var(--fg-muted)", fontSize:"0.9rem" }}>{cat.description}</p>}
      </header>

      {/* Subcategory pills */}
      {cat.children.length > 0 && (
        <nav style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", marginBottom:"1.5rem" }}>
          {cat.children.map((child) => (
            <Link key={child.id} href={`${path}/${child.slug}`} style={{
              padding:"0.4rem 1rem", borderRadius:99, fontSize:"0.875rem", fontWeight:600,
              background:"var(--primary)", color:"#fff", textDecoration:"none",
              boxShadow:"0 1px 3px rgb(79 70 229 / 0.3)",
            }}>{child.name} →</Link>
          ))}
        </nav>
      )}

      {/* ── Filter bar ── */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem", marginBottom:"1.5rem", padding:"1rem", background:"var(--surface)", borderRadius:"var(--radius)", border:"1px solid var(--border)" }}>
        {/* Sort */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--fg-muted)" }}>Sort:</span>
          {[["price_asc","Price ↑"],["price_desc","Price ↓"],["rating","Top Rated"]].map(([val,label])=>(
            <Link key={val} href={buildUrl({ sort: sort === val ? undefined : val })} style={{
              padding:"0.3rem 0.75rem", borderRadius:99, fontSize:"0.8rem", fontWeight:600, textDecoration:"none",
              background: sort === val ? "var(--primary)" : "var(--bg)",
              color: sort === val ? "#fff" : "var(--fg)",
              border: sort === val ? "none" : "1.5px solid var(--border)",
            }}>{label}</Link>
          ))}
        </div>

        {/* Price */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <span style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--fg-muted)" }}>Max Price:</span>
          {[[300,"Under ₹300"],[500,"Under ₹500"],[1000,"Under ₹1000"]].map(([val,label])=>(
            <Link key={val} href={buildUrl({ maxPrice: maxPrice === String(val) ? undefined : String(val) })} style={{
              padding:"0.3rem 0.75rem", borderRadius:99, fontSize:"0.8rem", fontWeight:600, textDecoration:"none",
              background: maxPrice === String(val) ? "var(--accent)" : "var(--bg)",
              color: maxPrice === String(val) ? "#fff" : "var(--fg)",
              border: maxPrice === String(val) ? "none" : "1.5px solid var(--border)",
            }}>{label}</Link>
          ))}
        </div>

        {/* Colour */}
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", flexWrap:"wrap" }}>
          <span style={{ fontSize:"0.8rem", fontWeight:600, color:"var(--fg-muted)" }}>Colour:</span>
          {COLORS.map((c) => (
            <Link key={c} href={buildUrl({ color: color === c ? undefined : c })} style={{
              padding:"0.3rem 0.75rem", borderRadius:99, fontSize:"0.8rem", fontWeight:600, textDecoration:"none",
              background: color === c ? "#111827" : "var(--bg)",
              color: color === c ? "#fff" : "var(--fg)",
              border: color === c ? "none" : "1.5px solid var(--border)",
            }}>{c}</Link>
          ))}
        </div>

        {/* Clear */}
        {(color || maxPrice || sort) && (
          <Link href={path} style={{ marginLeft:"auto", fontSize:"0.8rem", color:"var(--error)", textDecoration:"none", fontWeight:600, display:"flex", alignItems:"center" }}>
            ✕ Clear filters
          </Link>
        )}
      </div>

      {/* Results */}
      <p style={{ fontSize:"0.875rem", color:"var(--fg-muted)", marginBottom:"1rem" }}>
        {products.length} product{products.length !== 1 ? "s" : ""} found
      </p>

      {products.length === 0 ? (
        <div style={{ textAlign:"center", padding:"4rem 1rem", color:"var(--fg-muted)" }}>
          <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>🔍</div>
          <p style={{ fontWeight:600, fontSize:"1.1rem" }}>No products match your filters</p>
          <Link href={path} style={{ display:"inline-block", marginTop:"1rem", color:"var(--primary)", textDecoration:"none", fontWeight:600 }}>Clear filters</Link>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1rem" }}>
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
