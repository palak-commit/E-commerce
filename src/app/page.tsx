import Link from "next/link";
import { getTopCategories, getCollections, getInStockProducts } from "@/data/store";
import { ProductCard } from "@/components/ProductCard";

// Home = hub that links out to top categories and curated collections, and
// surfaces featured products directly. Pure internal-linking surface; it passes
// authority down to the pages that convert.
export default function HomePage() {
  const categories = getTopCategories();
  const collections = getCollections(8);
  const featured = getInStockProducts().slice(0, 8);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-bold">Trendora</h1>
        <p className="mt-2 text-zinc-600">
          Buyer-first fashion. Browse by category or jump into a curated edit.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Shop by category</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/${c.slug}`}
                className="block rounded-lg border border-zinc-200 p-4 hover:shadow-md"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Featured products</h2>
          <Link href="/men-jackets" className="text-sm text-zinc-500 hover:underline">
            Shop all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Curated collections</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {collections.map((c) => (
            <li key={c.id}>
              <Link
                href={`/c/${c.slug}`}
                className="block rounded-lg border border-zinc-200 p-4 hover:shadow-md"
              >
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
