import { searchProducts } from "@/data/store";
import { ProductCard } from "@/components/ProductCard";
import type { Metadata } from "next";

type SearchParams = Promise<{ q?: string }>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { q } = await searchParams;
  return { title: q ? `Search: "${q}"` : "Search", robots: { index: false, follow: true } };
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = searchProducts(query);

  return (
    <div className="animate-fade-up">
      <h1 style={{ fontSize:"1.5rem", fontWeight:800, marginBottom:"1rem", letterSpacing:"-0.02em" }}>
        {query ? `Results for "${query}"` : "Search Products"}
      </h1>

      {query && (
        <p style={{ color:"var(--fg-muted)", marginBottom:"1.5rem", fontSize:"0.9rem" }}>
          {results.length} result{results.length !== 1 ? "s" : ""} found
        </p>
      )}

      {!query ? (
        <div style={{ textAlign:"center", padding:"4rem 1rem", color:"var(--fg-muted)" }}>
          <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>🔍</div>
          <p>Type something in the search bar above</p>
        </div>
      ) : results.length === 0 ? (
        <div style={{ textAlign:"center", padding:"4rem 1rem", color:"var(--fg-muted)" }}>
          <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>😕</div>
          <p style={{ fontWeight:600, fontSize:"1.1rem" }}>No results for "{query}"</p>
          <p style={{ marginTop:"0.5rem", fontSize:"0.875rem" }}>Try: jackets, kurti, sneakers, wallet, tee</p>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1rem" }}>
          {results.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
