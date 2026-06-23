// Static in-memory data store. No database — everything lives here as plain
// arrays, and the query helpers below give the routes a small, DB-like API.
// Swapping this file for a real Prisma/Drizzle layer later means changing only
// the helper bodies, not the route code.

export interface Brand {
  id: string;
  slug: string;
  name: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  parentId?: string;
}

export interface Review {
  id: string;
  productId: string;
  rating: number; // 1..5
  author: string;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceInPaise: number;
  currency: string;
  inStock: boolean;
  color?: string;
  imageUrl?: string;
  categoryId: string;
  brandId?: string;
}

export interface CollectionFilter {
  categorySlug?: string;
  brandSlug?: string;
  color?: string;
  maxPriceInPaise?: number;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  intro?: string; // unique editorial copy; thin/empty => stays noindex
  filter: CollectionFilter;
}

// --- Brands ---------------------------------------------------------------
export const brands: Brand[] = [
  { id: "b_nike", slug: "nike", name: "Nike" },
  { id: "b_urban", slug: "urban-edge", name: "Urban Edge" },
];

// --- Categories (one nested subcategory: men-jackets > winter-jackets) -----
export const categories: Category[] = [
  {
    id: "c_men_jackets",
    slug: "men-jackets",
    name: "Men's Jackets",
    description:
      "Men's jackets built for Indian winters — puffers, bombers and waterproof shells from value to premium.",
  },
  {
    id: "c_winter_jackets",
    slug: "winter-jackets",
    name: "Winter Jackets",
    description:
      "Insulated winter jackets for men. Warmth-to-weight picks for North Indian cold.",
    parentId: "c_men_jackets",
  },
  {
    id: "c_women_kurti",
    slug: "women-kurti",
    name: "Women's Kurti",
    description:
      "Cotton and festive kurtis for women — everyday comfort to occasion wear.",
  },
  {
    id: "c_sneakers",
    slug: "sneakers",
    name: "Sneakers",
    description:
      "Everyday and running sneakers for men and women. Cushioned, breathable, street-ready.",
  },
  {
    id: "c_men_shirts",
    slug: "men-shirts",
    name: "Men's Shirts",
    description:
      "Formal, casual and linen shirts for men. Wrinkle-resistant fabrics, regular and slim fits.",
  },
];

// Stable placeholder images keyed by product slug.
const img = (slug: string) => `https://picsum.photos/seed/${slug}/600/600`;

// --- Products -------------------------------------------------------------
export const products: Product[] = [
  // ---- Winter jackets (men) ----
  {
    id: "p_puffer",
    slug: "urban-edge-puffer-jacket",
    name: "Urban Edge Puffer Jacket",
    description:
      "A lightweight, warm puffer with water-resistant shell. Packs down small for travel.",
    priceInPaise: 99900,
    currency: "INR",
    inStock: true,
    color: "Black",
    imageUrl: img("urban-edge-puffer-jacket"),
    categoryId: "c_winter_jackets",
    brandId: "b_urban",
  },
  {
    id: "p_bomber",
    slug: "urban-edge-bomber-jacket",
    name: "Urban Edge Bomber Jacket",
    description:
      "Classic bomber silhouette in matte black. Ribbed cuffs, full-zip, everyday wear.",
    priceInPaise: 79900,
    currency: "INR",
    inStock: true,
    color: "Black",
    imageUrl: img("urban-edge-bomber-jacket"),
    categoryId: "c_winter_jackets",
    brandId: "b_urban",
  },
  {
    id: "p_windrunner",
    slug: "nike-windrunner-jacket",
    name: "Nike Windrunner Jacket",
    description:
      "Iconic Windrunner with chevron design. Wind-resistant and breathable.",
    priceInPaise: 89900,
    currency: "INR",
    inStock: true,
    color: "Black",
    imageUrl: img("nike-windrunner-jacket"),
    categoryId: "c_winter_jackets",
    brandId: "b_nike",
  },
  {
    id: "p_parka",
    slug: "premium-waterproof-parka",
    name: "Premium Waterproof Parka",
    description:
      "Fully seam-sealed parka rated for heavy rain. Faux-fur hood, ₹1500+ premium tier.",
    priceInPaise: 199900,
    currency: "INR",
    inStock: true,
    color: "Olive",
    imageUrl: img("premium-waterproof-parka"),
    categoryId: "c_winter_jackets",
    brandId: "b_urban",
  },
  {
    id: "p_fleece",
    slug: "nike-sherpa-fleece-jacket",
    name: "Nike Sherpa Fleece Jacket",
    description:
      "Cosy sherpa-lined fleece for layering. Stand collar, zip pockets, brushed interior.",
    priceInPaise: 69900,
    currency: "INR",
    inStock: true,
    color: "Grey",
    imageUrl: img("nike-sherpa-fleece-jacket"),
    categoryId: "c_winter_jackets",
    brandId: "b_nike",
  },
  {
    id: "p_denim_jacket",
    slug: "urban-edge-denim-jacket",
    name: "Urban Edge Denim Jacket",
    description:
      "Mid-wash trucker denim jacket. All-season staple with a relaxed fit.",
    priceInPaise: 84900,
    currency: "INR",
    inStock: true,
    color: "Blue",
    imageUrl: img("urban-edge-denim-jacket"),
    categoryId: "c_men_jackets",
    brandId: "b_urban",
  },
  {
    id: "p_softshell",
    slug: "nike-softshell-running-jacket",
    name: "Nike Softshell Running Jacket",
    description:
      "Stretch softshell with reflective trims for early-morning runs. Out of stock for now.",
    priceInPaise: 94900,
    currency: "INR",
    inStock: false,
    color: "Black",
    imageUrl: img("nike-softshell-running-jacket"),
    categoryId: "c_men_jackets",
    brandId: "b_nike",
  },

  // ---- Women's kurti ----
  {
    id: "p_kurti",
    slug: "cotton-everyday-kurti",
    name: "Cotton Everyday Kurti",
    description:
      "Breathable cotton kurti for daily wear. Straight cut, side slits, machine washable.",
    priceInPaise: 59900,
    currency: "INR",
    inStock: true,
    color: "Blue",
    imageUrl: img("cotton-everyday-kurti"),
    categoryId: "c_women_kurti",
  },
  {
    id: "p_festive_kurti",
    slug: "festive-anarkali-kurti",
    name: "Festive Anarkali Kurti",
    description:
      "Flared Anarkali kurti with zari detailing. Perfect for festivals and family functions.",
    priceInPaise: 129900,
    currency: "INR",
    inStock: true,
    color: "Maroon",
    imageUrl: img("festive-anarkali-kurti"),
    categoryId: "c_women_kurti",
  },
  {
    id: "p_printed_kurti",
    slug: "block-print-cotton-kurti",
    name: "Block Print Cotton Kurti",
    description:
      "Hand block-printed cotton kurti in earthy tones. Lightweight and airy for summer.",
    priceInPaise: 74900,
    currency: "INR",
    inStock: true,
    color: "Green",
    imageUrl: img("block-print-cotton-kurti"),
    categoryId: "c_women_kurti",
  },

  // ---- Sneakers ----
  {
    id: "p_runner",
    slug: "nike-air-runner-sneakers",
    name: "Nike Air Runner Sneakers",
    description:
      "Cushioned daily running sneakers with breathable mesh upper and rubber outsole.",
    priceInPaise: 149900,
    currency: "INR",
    inStock: true,
    color: "White",
    imageUrl: img("nike-air-runner-sneakers"),
    categoryId: "c_sneakers",
    brandId: "b_nike",
  },
  {
    id: "p_canvas",
    slug: "urban-edge-canvas-sneakers",
    name: "Urban Edge Canvas Sneakers",
    description:
      "Low-top canvas sneakers for casual everyday wear. Vulcanised sole, lace-up.",
    priceInPaise: 89900,
    currency: "INR",
    inStock: true,
    color: "Black",
    imageUrl: img("urban-edge-canvas-sneakers"),
    categoryId: "c_sneakers",
    brandId: "b_urban",
  },

  // ---- Men's shirts ----
  {
    id: "p_oxford",
    slug: "urban-edge-oxford-shirt",
    name: "Urban Edge Oxford Shirt",
    description:
      "Slim-fit oxford cotton shirt. Button-down collar, smart-casual staple.",
    priceInPaise: 64900,
    currency: "INR",
    inStock: true,
    color: "White",
    imageUrl: img("urban-edge-oxford-shirt"),
    categoryId: "c_men_shirts",
    brandId: "b_urban",
  },
  {
    id: "p_linen_shirt",
    slug: "urban-edge-linen-shirt",
    name: "Urban Edge Linen Shirt",
    description:
      "Breathable pure-linen shirt for hot days. Relaxed fit, half-placket, beach to brunch.",
    priceInPaise: 99900,
    currency: "INR",
    inStock: true,
    color: "Beige",
    imageUrl: img("urban-edge-linen-shirt"),
    categoryId: "c_men_shirts",
    brandId: "b_urban",
  },
];

// --- Reviews --------------------------------------------------------------
export const reviews: Review[] = [
  {
    id: "r1",
    productId: "p_puffer",
    rating: 5,
    author: "Aarav",
    body: "Genuinely warm and very light. Great for Delhi winters.",
  },
  {
    id: "r2",
    productId: "p_puffer",
    rating: 4,
    author: "Priya",
    body: "Good fit, slightly snug. Order one size up.",
  },
];

// --- Collections ----------------------------------------------------------
export const collections: Collection[] = [
  // INDEXABLE: 3+ live products + real unique intro.
  {
    id: "col_winter",
    slug: "best-men-winter-jackets",
    title: "Best Men's Winter Jackets (2026)",
    intro:
      "Our edit of the warmest men's winter jackets you can buy in India right now — from a value puffer under ₹1000 to a seam-sealed waterproof parka. Each pick is in stock and chosen for warmth-to-weight, not just price. Updated for the 2026 season.",
    filter: { categorySlug: "winter-jackets" },
  },
  // INDEXABLE: color + price programmatic page that still has enough stock.
  {
    id: "col_black",
    slug: "best-black-jackets-under-1000",
    title: "Best Black Jackets Under ₹1000",
    intro:
      "Black jackets are the easiest layer to style, and these all come in under ₹1000. We pulled every in-stock black jacket below that price so you can compare puffer vs bomber vs windrunner at a glance.",
    filter: { color: "Black", maxPriceInPaise: 100000 },
  },
  // DELIBERATELY THIN — no intro + over-narrow filter => fails the guard,
  // renders noindex, excluded from sitemap.
  {
    id: "col_olive",
    slug: "best-olive-jackets-under-500",
    title: "Best Olive Jackets Under ₹500",
    filter: { color: "Olive", maxPriceInPaise: 50000 },
  },
];

// ==========================================================================
// Query helpers — the small DB-like API the routes consume.
// ==========================================================================

export function getTopCategories(): Category[] {
  return categories
    .filter((c) => !c.parentId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export interface CategoryWithRelations extends Category {
  parent?: Category;
  children: Category[];
}

export function getCategoryBySlug(
  slug: string,
): CategoryWithRelations | undefined {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return undefined;
  return {
    ...cat,
    parent: cat.parentId
      ? categories.find((c) => c.id === cat.parentId)
      : undefined,
    children: categories.filter((c) => c.parentId === cat.id),
  };
}

export function getProductsByCategoryId(categoryId: string): Product[] {
  return products
    .filter((p) => p.categoryId === categoryId && p.inStock)
    .sort((a, b) => a.priceInPaise - b.priceInPaise);
}

export interface ProductWithRelations extends Product {
  category: Category;
  brand?: Brand;
  reviews: Review[];
}

export function getProductBySlug(
  slug: string,
): ProductWithRelations | undefined {
  const product = products.find((p) => p.slug === slug);
  if (!product) return undefined;
  const category = categories.find((c) => c.id === product.categoryId)!;
  return {
    ...product,
    category,
    brand: product.brandId
      ? brands.find((b) => b.id === product.brandId)
      : undefined,
    reviews: reviews.filter((r) => r.productId === product.id),
  };
}

export function getCollections(limit?: number): Collection[] {
  return typeof limit === "number" ? collections.slice(0, limit) : collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

// In-memory equivalent of a WHERE clause: select in-stock products matching a
// collection's filter, cheapest first.
export function findProductsByFilter(filter: CollectionFilter): Product[] {
  const categoryId = filter.categorySlug
    ? categories.find((c) => c.slug === filter.categorySlug)?.id
    : undefined;
  const brandId = filter.brandSlug
    ? brands.find((b) => b.slug === filter.brandSlug)?.id
    : undefined;

  return products
    .filter((p) => {
      if (!p.inStock) return false;
      if (filter.categorySlug && p.categoryId !== categoryId) return false;
      if (filter.brandSlug && p.brandId !== brandId) return false;
      if (filter.color && p.color?.toLowerCase() !== filter.color.toLowerCase())
        return false;
      if (
        typeof filter.maxPriceInPaise === "number" &&
        p.priceInPaise > filter.maxPriceInPaise
      )
        return false;
      return true;
    })
    .sort((a, b) => a.priceInPaise - b.priceInPaise);
}

export function getInStockProducts(): Product[] {
  return products.filter((p) => p.inStock);
}
