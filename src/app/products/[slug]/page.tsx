import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, products } from "@/data/store";
import { absUrl, formatPrice } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  breadcrumbSchema,
  productSchema,
  type BreadcrumbItem,
} from "@/lib/schema-org";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    alternates: { canonical: absUrl(`/products/${product.slug}`) },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const crumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: product.category.name, path: `/${product.category.slug}` },
    { name: product.name, path: `/products/${product.slug}` },
  ];

  return (
    <div className="space-y-6">
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          productSchema({
            name: product.name,
            slug: product.slug,
            description: product.description,
            priceInPaise: product.priceInPaise,
            currency: product.currency,
            inStock: product.inStock,
            imageUrl: product.imageUrl,
            brandName: product.brand?.name,
            reviews: product.reviews,
          }),
        ]}
      />
      <Breadcrumbs items={crumbs} />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 text-zinc-400">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            "No image"
          )}
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.brand && (
            <p className="text-sm text-zinc-500">by {product.brand.name}</p>
          )}
          <p className="text-2xl font-semibold">
            {formatPrice(product.priceInPaise, product.currency)}
          </p>
          <p className="text-zinc-700">{product.description}</p>
          <p className={product.inStock ? "text-green-600" : "text-red-600"}>
            {product.inStock ? "In stock" : "Out of stock"}
          </p>
          <button
            disabled={!product.inStock}
            className="rounded-lg bg-zinc-900 px-6 py-3 text-white disabled:opacity-50"
          >
            Add to cart
          </button>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold">
            Reviews ({product.reviews.length})
          </h2>
          <ul className="space-y-3">
            {product.reviews.map((r) => (
              <li key={r.id} className="rounded-lg border border-zinc-200 p-3">
                <div className="text-sm font-medium">
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)} — {r.author}
                </div>
                <p className="text-sm text-zinc-600">{r.body}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
