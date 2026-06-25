// Automatically resolves a relevant Unsplash product image based on product name keywords.
// Priority: most-specific keyword matches first.
// Each entry: [keywords_to_match, stable_unsplash_photo_id]

const BASE = "https://images.unsplash.com";
const Q = "?w=600&q=80&fit=crop&auto=format";

const KEYWORD_MAP: Array<[string[], string]> = [
  // ── Jackets (most specific first) ──────────────────────────────────────
  [["puffer", "puff down"],                    "photo-1547624643-3bf761b09502"],  // black puffer jacket
  [["bomber"],                                  "photo-1601924994987-69e26d50dc26"], // bomber jacket
  [["windrunner", "wind runner"],               "photo-1606107557195-0e29a4b5b4aa"], // sport/windbreaker
  [["parka", "waterproof"],                     "photo-1591369822096-ffd140ec948f"], // long parka
  [["sherpa", "fleece"],                        "photo-1617952236317-0bd127407984"], // sherpa/fleece
  [["denim jacket", "denim"],                   "photo-1551537482-f2075a1d41f2"],   // denim jacket
  [["softshell", "running jacket"],             "photo-1623874514711-0f321325f318"], // running jacket
  [["jacket"],                                  "photo-1547624643-3bf761b09502"],   // generic jacket fallback

  // ── Kurti / Ethnic ──────────────────────────────────────────────────────
  [["anarkali", "festive"],                     "photo-1610030469983-98e550d6193c"], // festive anarkali
  [["block print", "block-print", "printed"],   "photo-1610030469983-98e550d6193c"], // block-print fabric
  [["casual kurti", "short kurti", "casual"],   "photo-1585487000160-6ebcfceb0d03"], // casual kurti
  [["kurti", "kurta", "ethnic"],                "photo-1610030469983-98e550d6193c"], // everyday kurti

  // ── Footwear ─────────────────────────────────────────────────────────────
  [["air runner", "running sneaker", "runner"], "photo-1542291026-7eec264c27ff"],   // nike running shoes
  [["canvas sneaker", "canvas shoe"],           "photo-1525966222134-fcfa99b8ae77"], // canvas sneakers
  [["sneaker", "trainer", "shoe", "boot"],      "photo-1542291026-7eec264c27ff"],   // generic sneaker

  // ── Shirts ───────────────────────────────────────────────────────────────
  [["oxford"],                                  "photo-1596755094514-f87e34085b2c"], // oxford shirt
  [["linen"],                                   "photo-1594938298603-c8148c4b4132"], // linen shirt
  [["shirt"],                                   "photo-1596755094514-f87e34085b2c"], // generic shirt

  // ── Basics / Tops ─────────────────────────────────────────────────────────
  [["pocket tee"],                              "photo-1503341455253-b2e723bb3dbb"], // pocket tee dark
  [["basic tee", "basic cotton", "cotton tee"], "photo-1521572163474-6864f9cf17ab"], // plain white tee
  [["tee", "t-shirt", "tshirt"],               "photo-1521572163474-6864f9cf17ab"], // generic tee
  [["jogger short", "shorts"],                  "photo-1539185441755-769473a23570"], // shorts
  [["jogger", "sweatpant", "trackpant"],        "photo-1542219550-37153d387c27"],   // joggers
  [["hoodie", "sweatshirt"],                    "photo-1556821840-3a63f95609a7"],   // hoodie

  // ── Accessories ────────────────────────────────────────────────────────────
  [["wallet", "bi-fold", "bifold"],             "photo-1627123424574-724758594e93"], // wallet
  [["tote", "canvas bag"],                      "photo-1553062407-98eeb64c6a62"],   // tote bag
  [["backpack", "rucksack"],                    "photo-1553062407-98eeb64c6a62"],   // bag
  [["sock", "ankle sock"],                      "photo-1584735935682-2f2b69dff9d2"], // socks
  [["hair clip", "hair band", "hair pin"],      "photo-1519682577862-22b62b24e493"], // hair accessories
  [["dupatta", "stole", "scarf"],               "photo-1617551307578-3c30bbae51dc"], // dupatta
  [["belt"],                                    "photo-1553062407-98eeb64c6a62"],   // accessories
];

/**
 * Resolves a relevant Unsplash image URL by matching keywords in the product name.
 * Falls back to a generic fashion/apparel image if no keyword matches.
 */
export function getProductImageUrl(name: string): string {
  const lower = name.toLowerCase();
  for (const [keywords, photoId] of KEYWORD_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return `${BASE}/${photoId}${Q}`;
    }
  }
  // Generic fashion fallback
  return `${BASE}/photo-1441986300917-64674bd600d8${Q}`;
}

/**
 * Returns the product's explicit imageUrl if set,
 * otherwise auto-resolves from the product name.
 */
export function resolveProductImage(name: string, imageUrl?: string | null): string {
  if (imageUrl) return imageUrl;
  return getProductImageUrl(name);
}
