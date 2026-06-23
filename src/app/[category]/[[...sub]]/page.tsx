import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  categories,
  getCategoryBySlug,
  getProductsByCategoryId,
} from "@/data/store";
import { absUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCard } from "@/components/ProductCard";
import {
  breadcrumbSchema,
  itemListSchema,
  type BreadcrumbItem,
} from "@/lib/schema-org";

// Static data => we can prerender every category/subcategory at build time.
export function generateStaticParams() {
  return categories.map((c) => {
    const parent = c.parentId
      ? categories.find((p) => p.id === c.parentId)
      : undefined;
    return parent
      ? { category: parent.slug, sub: [c.slug] }
      : { category: c.slug, sub: [] };
  });
}

// Resolve the deepest category in the URL path. URL shapes:
//   /men-jackets                     -> top-level category
//   /men-jackets/winter-jackets      -> subcategory (last segment is the leaf)
// We resolve by the LAST slug (slugs are globally unique) and verify the parent
// chain matches the URL so stale/incorrect nesting 404s instead of soft-ranking.
function resolveCategory(category: string, sub?: string[]) {
  const segments = [category, ...(sub ?? [])];
  const leafSlug = segments[segments.length - 1];

  const leaf = getCategoryBySlug(leafSlug);
  if (!leaf) return null;

  if (segments.length > 1) {
    const expectedParent = segments[segments.length - 2];
    if (leaf.parent?.slug !== expectedParent) return null;
  } else if (leaf.parentId) {
    // A subcategory accessed at the top level — wrong canonical path.
    return null;
  }
  return leaf;
}

type Params = Promise<{ category: string; sub?: string[] }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category, sub } = await params;
  const cat = resolveCategory(category, sub);
  if (!cat) return {};
  const path = `/${[category, ...(sub ?? [])].join("/")}`;
  return {
    title: cat.name,
    description: cat.description ?? `Shop ${cat.name} at Trendora.`,
    alternates: { canonical: absUrl(path) },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category, sub } = await params;
  const cat = resolveCategory(category, sub);
  if (!cat) notFound();

  const segments = [category, ...(sub ?? [])];
  const path = `/${segments.join("/")}`;
  const products = getProductsByCategoryId(cat.id);

  const crumbs: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    ...segments.map((seg, i) => ({
      name: seg.replace(/-/g, " "),
      path: `/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  return (
    <div className="space-y-6">
      <JsonLd data={[breadcrumbSchema(crumbs), itemListSchema(products)]} />
      <Breadcrumbs items={crumbs} />

      <header>
        <h1 className="text-2xl font-bold capitalize">{cat.name}</h1>
        {cat.description && (
          <p className="mt-2 text-zinc-600">{cat.description}</p>
        )}
      </header>

      {cat.children.length > 0 && (
        <nav className="flex flex-wrap gap-2">
          {cat.children.map((child) => (
            <a
              key={child.id}
              href={`${path}/${child.slug}`}
              className="rounded-full border border-zinc-200 px-3 py-1 text-sm hover:bg-zinc-50"
            >
              {child.name}
            </a>
          ))}
        </nav>
      )}

      {products.length === 0 ? (
        <p className="text-zinc-500">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
