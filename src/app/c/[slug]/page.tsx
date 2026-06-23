import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { absUrl } from "@/lib/site";
import { collections } from "@/data/store";
import { resolveCollection } from "@/lib/collections";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import {
  breadcrumbSchema,
  itemListSchema,
  type BreadcrumbItem,
} from "@/lib/schema-org";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

type Params = Promise<{ slug: string }>;

// generateMetadata is where the indexability verdict becomes a real signal to
// Google: a thin/under-stocked collection emits `robots: noindex, follow` so it
// won't compete in search, while still letting crawlers follow internal links.
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = resolveCollection(slug);
  if (!collection) return {};

  return {
    title: collection.title,
    description: collection.intro?.slice(0, 160) ?? `${collection.title} at Trendora.`,
    alternates: { canonical: absUrl(`/c/${slug}`) },
    robots: collection.indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const collection = resolveCollection(slug);
  if (!collection) notFound();

  const crumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: collection.title, path: `/c/${slug}` },
  ];

  return (
    <div className="space-y-6">
      {/* Only advertise ItemList structured data when the page is index-worthy. */}
      <JsonLd
        data={
          collection.indexable
            ? [breadcrumbSchema(crumbs), itemListSchema(collection.products)]
            : [breadcrumbSchema(crumbs)]
        }
      />
      <Breadcrumbs items={crumbs} />

      <header>
        <h1 className="text-2xl font-bold">{collection.title}</h1>
        {collection.intro && (
          <p className="mt-2 max-w-3xl text-zinc-600">{collection.intro}</p>
        )}
      </header>

      {/* Dev-only banner explaining why a page is held back from indexing. In
          production this would be hidden behind a NODE_ENV check / admin role. */}
      {!collection.indexable && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
          <strong>noindex</strong> — this collection is not yet eligible for
          Google indexing:
          <ul className="ml-4 list-disc">
            {collection.noindexReasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {collection.products.length === 0 ? (
        <p className="text-zinc-500">No matching products right now.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {collection.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
