import { getProductImageUrl } from "@/lib/product-images";
import basicTeeImg from "@/assets/product-img/Urban-Edge-Basic-Cotton-Tee.webp";
import kurtiImg from "@/assets/product-img/Cotton Everyday Kurti.jpeg";
import kurtiImg2 from "@/assets/product-img/Cotton Everyday Kurti2.jpeg";
import bomberImg from "@/assets/product-img/Urban Edge Bomber Jacket.webp";

export interface Brand { id: string; slug: string; name: string; }
export interface Category { id: string; slug: string; name: string; description?: string; parentId?: string; }
export interface Review { id: string; productId: string; rating: number; author: string; body: string; }
export interface Product {
  id: string; slug: string; name: string; description: string;
  priceInPaise: number; mrpInPaise?: number; currency: string;
  inStock: boolean; color?: string; imageUrl?: string;
  categoryId: string; brandId?: string;
  rating?: number; reviewCount?: number; sizes?: string[];
}
export interface CollectionFilter { categorySlug?: string; brandSlug?: string; color?: string; maxPriceInPaise?: number; }
export interface Collection { id: string; slug: string; title: string; intro?: string; filter: CollectionFilter; }

const U = (url: string) => url;

export const brands: Brand[] = [
  { id: "b_nike", slug: "nike", name: "Nike" },
  { id: "b_urban", slug: "urban-edge", name: "Urban Edge" },
];

export const categories: Category[] = [
  { id: "c_men_jackets", slug: "men-jackets", name: "Men's Jackets", description: "Men's jackets for Indian winters — puffers, bombers and waterproof shells from value to premium." },
  { id: "c_winter_jackets", slug: "winter-jackets", name: "Winter Jackets", description: "Insulated winter jackets for men. Warmth-to-weight picks for North Indian cold.", parentId: "c_men_jackets" },
  { id: "c_women_kurti", slug: "women-kurti", name: "Women's Kurti", description: "Cotton and festive kurtis for women — everyday comfort to occasion wear." },
  { id: "c_sneakers", slug: "sneakers", name: "Sneakers", description: "Everyday and running sneakers for men and women. Cushioned, breathable, street-ready." },
  { id: "c_men_shirts", slug: "men-shirts", name: "Men's Shirts", description: "Formal, casual and linen shirts for men. Wrinkle-resistant fabrics, regular and slim fits." },
  { id: "c_basics", slug: "basics", name: "Men's Basics", description: "Essential everyday tees and casual wear under ₹300. Soft, breathable, machine-washable cotton." },
  { id: "c_accessories", slug: "accessories", name: "Accessories", description: "Wallets, bags, hair accessories and socks. Smart everyday picks under ₹300." },
];

const _products: Product[] = [
  // ── Winter jackets ──
  {
    id: "p_puffer", slug: "urban-edge-puffer-jacket", name: "Urban Edge Puffer Jacket",
    description: "A lightweight, warm puffer with water-resistant shell. Packs down small for travel. Fill power 600, rated to -5°C.",
    priceInPaise: 99900, mrpInPaise: 149900, currency: "INR", inStock: true, color: "Black",
    imageUrl: U("https://images.unsplash.com/photo-1547624643-3bf761b09502?w=600&q=80&fit=crop&auto=format"), categoryId: "c_winter_jackets", brandId: "b_urban",
    rating: 4.4, reviewCount: 218, sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "p_bomber", slug: "urban-edge-bomber-jacket", name: "Urban Edge Bomber Jacket",
    description: "Classic bomber silhouette in matte black. Ribbed cuffs, full-zip, relaxed everyday wear.",
    priceInPaise: 79900, mrpInPaise: 119900, currency: "INR", inStock: true, color: "Black",
    imageUrl: U("https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80&fit=crop&auto=format"), categoryId: "c_winter_jackets", brandId: "b_urban",
    rating: 4.2, reviewCount: 143, sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "p_windrunner", slug: "nike-windrunner-jacket", name: "Nike Windrunner Jacket",
    description: "Iconic Windrunner with chevron design. Wind-resistant, breathable, packable.",
    priceInPaise: 89900, mrpInPaise: 129900, currency: "INR", inStock: true, color: "Black",
    imageUrl: U("https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80&fit=crop&auto=format"), categoryId: "c_winter_jackets", brandId: "b_nike",
    rating: 4.6, reviewCount: 387, sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "p_parka", slug: "premium-waterproof-parka", name: "Premium Waterproof Parka",
    description: "Fully seam-sealed parka rated for heavy rain. Faux-fur hood, long hem, fleece lining.",
    priceInPaise: 199900, mrpInPaise: 299900, currency: "INR", inStock: true, color: "Olive",
    imageUrl: U("https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80&fit=crop&auto=format"), categoryId: "c_winter_jackets", brandId: "b_urban",
    rating: 4.7, reviewCount: 92, sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "p_fleece", slug: "nike-sherpa-fleece-jacket", name: "Nike Sherpa Fleece Jacket",
    description: "Cosy sherpa-lined fleece for layering. Stand collar, zip pockets, brushed interior.",
    priceInPaise: 69900, mrpInPaise: 99900, currency: "INR", inStock: true, color: "Grey",
    imageUrl: U("https://images.unsplash.com/photo-1617952236317-0bd127407984?w=600&q=80&fit=crop&auto=format"), categoryId: "c_winter_jackets", brandId: "b_nike",
    rating: 4.3, reviewCount: 201, sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "p_denim_jacket", slug: "urban-edge-denim-jacket", name: "Urban Edge Denim Jacket",
    description: "Mid-wash trucker denim jacket. All-season staple with a relaxed fit.",
    priceInPaise: 84900, mrpInPaise: 129900, currency: "INR", inStock: true, color: "Blue",
    imageUrl: U("https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&q=80&fit=crop&auto=format"), categoryId: "c_men_jackets", brandId: "b_urban",
    rating: 4.1, reviewCount: 176, sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "p_softshell", slug: "nike-softshell-running-jacket", name: "Nike Softshell Running Jacket",
    description: "Stretch softshell with reflective trims for early-morning runs.",
    priceInPaise: 94900, mrpInPaise: 139900, currency: "INR", inStock: false, color: "Black",
    imageUrl: U("https://images.unsplash.com/photo-1623874514711-0f321325f318?w=600&q=80&fit=crop&auto=format"), categoryId: "c_men_jackets", brandId: "b_nike",
    rating: 4.5, reviewCount: 134, sizes: ["S","M","L","XL","XXL"],
  },
  // ── Women's Kurti ──
  {
    id: "p_kurti", slug: "cotton-everyday-kurti", name: "Cotton Everyday Kurti",
    description: "Breathable cotton kurti for daily wear. Straight cut, side slits, machine washable. Available in 6 colours.",
    priceInPaise: 59900, mrpInPaise: 89900, currency: "INR", inStock: true, color: "Blue",
    imageUrl: U("https://images.unsplash.com/photo-1583391733981-8498408ee4b6?w=600&q=80&fit=crop&auto=format"), categoryId: "c_women_kurti",
    rating: 4.3, reviewCount: 512, sizes: ["XS","S","M","L","XL","XXL"],
  },
  {
    id: "p_festive_kurti", slug: "festive-anarkali-kurti", name: "Festive Anarkali Kurti",
    description: "Flared Anarkali kurti with zari detailing. Perfect for festivals and family functions.",
    priceInPaise: 129900, mrpInPaise: 199900, currency: "INR", inStock: true, color: "Maroon",
    imageUrl: U("https://images.unsplash.com/photo-1594938375523-7bc4b5fc9a1e?w=600&q=80&fit=crop&auto=format"), categoryId: "c_women_kurti",
    rating: 4.6, reviewCount: 284, sizes: ["XS","S","M","L","XL","XXL"],
  },
  {
    id: "p_printed_kurti", slug: "block-print-cotton-kurti", name: "Block Print Cotton Kurti",
    description: "Hand block-printed cotton kurti in earthy tones. Lightweight and airy for summer.",
    priceInPaise: 74900, mrpInPaise: 109900, currency: "INR", inStock: true, color: "Green",
    imageUrl: U("https://images.unsplash.com/photo-1624939547671-91e5d9e3e27b?w=600&q=80&fit=crop&auto=format"), categoryId: "c_women_kurti",
    rating: 4.4, reviewCount: 198, sizes: ["XS","S","M","L","XL","XXL"],
  },
  // ── Sneakers ──
  {
    id: "p_runner", slug: "nike-air-runner-sneakers", name: "Nike Air Runner Sneakers",
    description: "Cushioned daily running sneakers with breathable mesh upper and rubber outsole.",
    priceInPaise: 149900, mrpInPaise: 199900, currency: "INR", inStock: true, color: "White",
    imageUrl: U("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&fit=crop&auto=format"), categoryId: "c_sneakers", brandId: "b_nike",
    rating: 4.7, reviewCount: 623, sizes: ["UK 6","UK 7","UK 8","UK 9","UK 10","UK 11"],
  },
  {
    id: "p_canvas", slug: "urban-edge-canvas-sneakers", name: "Urban Edge Canvas Sneakers",
    description: "Low-top canvas sneakers for casual everyday wear. Vulcanised sole, lace-up.",
    priceInPaise: 89900, mrpInPaise: 129900, currency: "INR", inStock: true, color: "Black",
    imageUrl: U("https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80&fit=crop&auto=format"), categoryId: "c_sneakers", brandId: "b_urban",
    rating: 4.2, reviewCount: 341, sizes: ["UK 6","UK 7","UK 8","UK 9","UK 10","UK 11"],
  },
  // ── Men's Shirts ──
  {
    id: "p_oxford", slug: "urban-edge-oxford-shirt", name: "Urban Edge Oxford Shirt",
    description: "Slim-fit oxford cotton shirt. Button-down collar, smart-casual staple.",
    priceInPaise: 64900, mrpInPaise: 99900, currency: "INR", inStock: true, color: "White",
    imageUrl: U("https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80&fit=crop&auto=format"), categoryId: "c_men_shirts", brandId: "b_urban",
    rating: 4.3, reviewCount: 267, sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "p_linen_shirt", slug: "urban-edge-linen-shirt", name: "Urban Edge Linen Shirt",
    description: "Breathable pure-linen shirt for hot days. Relaxed fit, half-placket, beach to brunch.",
    priceInPaise: 99900, mrpInPaise: 149900, currency: "INR", inStock: true, color: "Beige",
    imageUrl: U("https://images.unsplash.com/photo-1594938298603-c8148c4b4132?w=600&q=80&fit=crop&auto=format"), categoryId: "c_men_shirts", brandId: "b_urban",
    rating: 4.5, reviewCount: 189, sizes: ["S","M","L","XL","XXL"],
  },
  // ── Men's Basics (₹150–₹300) ──
  {
    id: "p_basic_tee", slug: "urban-edge-basic-cotton-tee", name: "Urban Edge Basic Cotton Tee",
    description: "100% combed cotton crew-neck tee. Pre-shrunk, double-stitched seams, everyday essential.",
    priceInPaise: 19900, mrpInPaise: 39900, currency: "INR", inStock: true, color: "White",
    imageUrl: U("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80&fit=crop&auto=format"), categoryId: "c_basics", brandId: "b_urban",
    rating: 4.4, reviewCount: 1203, sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "p_pocket_tee", slug: "urban-edge-pocket-tee", name: "Urban Edge Pocket Tee",
    description: "Structured jersey pocket tee with a relaxed drop-shoulder fit. Perfect for layering.",
    priceInPaise: 24900, mrpInPaise: 44900, currency: "INR", inStock: true, color: "Black",
    imageUrl: U("https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&q=80&fit=crop&auto=format"), categoryId: "c_basics", brandId: "b_urban",
    rating: 4.3, reviewCount: 892, sizes: ["S","M","L","XL","XXL"],
  },
  {
    id: "p_jogger_shorts", slug: "urban-edge-jogger-shorts", name: "Urban Edge Jogger Shorts",
    description: "Lightweight jersey shorts with elasticated waist and drawstring. Gym to street.",
    priceInPaise: 24900, mrpInPaise: 49900, currency: "INR", inStock: true, color: "Grey",
    imageUrl: U("https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80&fit=crop&auto=format"), categoryId: "c_basics", brandId: "b_urban",
    rating: 4.2, reviewCount: 567, sizes: ["S","M","L","XL","XXL"],
  },
  // ── Accessories (₹150–₹300) ──
  {
    id: "p_canvas_wallet", slug: "urban-edge-canvas-wallet", name: "Urban Edge Canvas Wallet",
    description: "Slim bi-fold canvas wallet with RFID-blocking lining. Fits 8 cards + cash.",
    priceInPaise: 17900, mrpInPaise: 29900, currency: "INR", inStock: true, color: "Olive",
    imageUrl: U("https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80&fit=crop&auto=format"), categoryId: "c_accessories", brandId: "b_urban",
    rating: 4.1, reviewCount: 432,
  },
  {
    id: "p_tote_bag", slug: "cotton-tote-bag", name: "Cotton Tote Bag",
    description: "12oz canvas tote with internal zip pocket. Folds flat, holds 15kg. Reusable everyday.",
    priceInPaise: 29900, mrpInPaise: 54900, currency: "INR", inStock: true, color: "Natural",
    imageUrl: U("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80&fit=crop&auto=format"), categoryId: "c_accessories",
    rating: 4.5, reviewCount: 718,
  },
  {
    id: "p_ankle_socks", slug: "ankle-socks-3-pack", name: "Ankle Socks — 3 Pack",
    description: "Cushioned cotton-blend ankle socks. Reinforced heel and toe. Fits UK 6–11.",
    priceInPaise: 19900, mrpInPaise: 34900, currency: "INR", inStock: true, color: "White",
    imageUrl: U("https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80&fit=crop&auto=format"), categoryId: "c_accessories",
    rating: 4.6, reviewCount: 2104,
  },
  {
    id: "p_hair_clips", slug: "hair-clip-set", name: "Hair Clip Set — 6 Pieces",
    description: "Assorted claw clips and bobby pins in a reusable pouch. Strong hold, no snag.",
    priceInPaise: 15900, mrpInPaise: 24900, currency: "INR", inStock: true, color: "Mixed",
    imageUrl: U("https://images.unsplash.com/photo-1519682577862-22b62b24e493?w=600&q=80&fit=crop&auto=format"), categoryId: "c_accessories",
    rating: 4.3, reviewCount: 876,
  },
  {
    id: "p_casual_kurti_s", slug: "casual-short-kurti", name: "Casual Short Kurti",
    description: "Knee-length A-line kurti in soft cotton. Mandarin collar, quarter-button placket.",
    priceInPaise: 24900, mrpInPaise: 49900, currency: "INR", inStock: true, color: "Pink",
    imageUrl: U("https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80&fit=crop&auto=format"), categoryId: "c_women_kurti",
    rating: 4.2, reviewCount: 334, sizes: ["XS","S","M","L","XL","XXL"],
  },
];

export const products: Product[] = _products.map(p => {
  if (p.id === "p_basic_tee") {
    return { ...p, imageUrl: basicTeeImg.src };
  }
  if (p.id === "p_kurti" || p.id === "p_festive_kurti") {
    return { ...p, imageUrl: kurtiImg.src };
  }
  if (p.id === "p_printed_kurti" || p.id === "p_casual_kurti_s") {
    return { ...p, imageUrl: kurtiImg2.src };
  }
  if (p.id === "p_bomber") {
    return { ...p, imageUrl: bomberImg.src };
  }
  return { ...p, imageUrl: getProductImageUrl(p.name) };
});

export const reviews: Review[] = [
  { id: "r1", productId: "p_puffer", rating: 5, author: "Aarav", body: "Genuinely warm and very light. Great for Delhi winters." },
  { id: "r2", productId: "p_puffer", rating: 4, author: "Priya", body: "Good fit, slightly snug. Order one size up." },
  { id: "r3", productId: "p_runner", rating: 5, author: "Rohit", body: "Excellent cushioning. Wore these on a 10K and feet felt great." },
  { id: "r4", productId: "p_runner", rating: 4, author: "Sneha", body: "True to size, breathable mesh, looks clean." },
  { id: "r5", productId: "p_kurti", rating: 5, author: "Meera", body: "Fabric is so soft! Washed 5 times and colour hasn't faded." },
  { id: "r6", productId: "p_basic_tee", rating: 5, author: "Karan", body: "Best basic tee under ₹200. Already ordered 3 more colours." },
  { id: "r7", productId: "p_basic_tee", rating: 4, author: "Nisha", body: "Soft and comfortable, washes well. Slightly boxy on XS." },
  { id: "r8", productId: "p_windrunner", rating: 5, author: "Dev", body: "Iconic design, lightweight and wind-resistant. Worth every rupee." },
];

export const collections: Collection[] = [
  {
    id: "col_winter", slug: "best-men-winter-jackets", title: "Best Men's Winter Jackets (2026)",
    intro: "Our edit of the warmest men's winter jackets you can buy in India right now — from a value puffer under ₹1000 to a seam-sealed waterproof parka. Each pick is in stock and chosen for warmth-to-weight, not just price. Updated for the 2026 season.",
    filter: { categorySlug: "winter-jackets" },
  },
  {
    id: "col_black", slug: "best-black-jackets-under-1000", title: "Best Black Jackets Under ₹1000",
    intro: "Black jackets are the easiest layer to style, and these all come in under ₹1000. We pulled every in-stock black jacket below that price so you can compare puffer vs bomber vs windrunner at a glance.",
    filter: { color: "Black", maxPriceInPaise: 100000 },
  },
  {
    id: "col_under300", slug: "best-products-under-300", title: "Best Picks Under ₹300",
    intro: "Smart everyday essentials under ₹300 — basics tees, canvas wallets, socks, tote bags and casual kurtis. Quality that punches above its price tag.",
    filter: { maxPriceInPaise: 30000 },
  },
  {
    id: "col_olive", slug: "best-olive-jackets-under-500", title: "Best Olive Jackets Under ₹500",
    filter: { color: "Olive", maxPriceInPaise: 50000 },
  },
];

// ── Query helpers ──────────────────────────────────────────────────────────

export function getTopCategories(): Category[] {
  return categories.filter((c) => !c.parentId).sort((a, b) => a.name.localeCompare(b.name));
}

export interface CategoryWithRelations extends Category {
  parent?: Category;
  children: Category[];
}

export function getCategoryBySlug(slug: string): CategoryWithRelations | undefined {
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return undefined;
  return {
    ...cat,
    parent: cat.parentId ? categories.find((c) => c.id === cat.parentId) : undefined,
    children: categories.filter((c) => c.parentId === cat.id),
  };
}

export function getProductsByCategoryId(
  categoryId: string,
  opts?: { maxPriceInPaise?: number; color?: string; sort?: string }
): Product[] {
  let list = products.filter((p) => p.categoryId === categoryId && p.inStock);
  if (opts?.color) list = list.filter((p) => p.color?.toLowerCase() === opts.color!.toLowerCase());
  if (opts?.maxPriceInPaise) list = list.filter((p) => p.priceInPaise <= opts.maxPriceInPaise!);
  if (opts?.sort === "price_desc") return list.sort((a, b) => b.priceInPaise - a.priceInPaise);
  if (opts?.sort === "rating") return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  return list.sort((a, b) => a.priceInPaise - b.priceInPaise);
}

export interface ProductWithRelations extends Product {
  category: Category;
  brand?: Brand;
  reviews: Review[];
}

export function getProductBySlug(slug: string): ProductWithRelations | undefined {
  const product = products.find((p) => p.slug === slug);
  if (!product) return undefined;
  const category = categories.find((c) => c.id === product.categoryId)!;
  return {
    ...product,
    category,
    brand: product.brandId ? brands.find((b) => b.id === product.brandId) : undefined,
    reviews: reviews.filter((r) => r.productId === product.id),
  };
}

export function getRelatedProducts(productId: string, categoryId: string, limit = 4): Product[] {
  return products.filter((p) => p.categoryId === categoryId && p.id !== productId && p.inStock).slice(0, limit);
}

export function getCollections(limit?: number): Collection[] {
  return typeof limit === "number" ? collections.slice(0, limit) : collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function findProductsByFilter(filter: CollectionFilter): Product[] {
  const categoryId = filter.categorySlug ? categories.find((c) => c.slug === filter.categorySlug)?.id : undefined;
  const brandId = filter.brandSlug ? brands.find((b) => b.slug === filter.brandSlug)?.id : undefined;
  return products
    .filter((p) => {
      if (!p.inStock) return false;
      if (filter.categorySlug && p.categoryId !== categoryId) return false;
      if (filter.brandSlug && p.brandId !== brandId) return false;
      if (filter.color && p.color?.toLowerCase() !== filter.color.toLowerCase()) return false;
      if (typeof filter.maxPriceInPaise === "number" && p.priceInPaise > filter.maxPriceInPaise) return false;
      return true;
    })
    .sort((a, b) => a.priceInPaise - b.priceInPaise);
}

export function getInStockProducts(): Product[] {
  return products.filter((p) => p.inStock);
}

export function searchProducts(q: string): Product[] {
  const query = q.toLowerCase().trim();
  if (!query) return [];
  return products.filter(
    (p) =>
      p.inStock &&
      (p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.color?.toLowerCase().includes(query) ||
        categories.find((c) => c.id === p.categoryId)?.name.toLowerCase().includes(query))
  );
}
