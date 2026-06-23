import Link from "next/link";
import { formatPrice } from "@/lib/site";

export interface ProductCardData {
  slug: string;
  name: string;
  priceInPaise: number;
  currency: string;
  color?: string | null;
  imageUrl?: string | null;
}

// Internal-linking unit: every listing renders these, and each links to the
// product page. This is the connective tissue that builds topical authority.
export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="block rounded-lg border border-zinc-200 p-3 transition hover:shadow-md"
    >
      <div className="mb-2 flex aspect-square items-center justify-center rounded bg-zinc-100 text-xs text-zinc-400">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full rounded object-cover"
          />
        ) : (
          "No image"
        )}
      </div>
      <div className="text-sm font-medium text-zinc-800">{product.name}</div>
      {product.color && (
        <div className="text-xs text-zinc-500">{product.color}</div>
      )}
      <div className="mt-1 font-semibold">
        {formatPrice(product.priceInPaise, product.currency)}
      </div>
    </Link>
  );
}
