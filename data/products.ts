/**
 * Product catalog. Pricing now lives in /data/pricing.ts and is computed
 * per configuration at runtime — there's no static `priceFrom` on the
 * product anymore. The card view derives "From $X" from the kind.
 */

import type { ProductKind } from "./pricing";

export type Product = {
  slug: string;
  name: string;
  kind: ProductKind;
  descriptor: string;
  longDescription: string;
  /** First image is the hero shot; subsequent images appear in the gallery thumb row. */
  gallery: string[];
  featured?: boolean;
  highlights: string[];
};

const STONED_HIGHLIGHTS = [
  "Configurable — pick 6, 8, 10, or 12 teeth on top and bottom independently",
  "Two stone tiers — Moissanite or Lab Diamond",
  "Three finishes — Yellow Gold, White Gold, or Rose Gold",
  "Rimless permanent cut, 3D-designed in-house",
  "Matched-set discount applies when top and bottom counts are equal",
];

const PLAIN_HIGHLIGHTS = [
  "Solid metal — no stones, no pavé (industry calls these slugs)",
  "Three finishes — Yellow Gold, White Gold, or Rose Gold",
  "Buy top only, bottom only, or save $30 on the full top-and-bottom set",
  "Rimless permanent cut, 3D-designed in-house",
  "Same custom-fit guarantee as the iced sets",
];

export const products: Product[] = [
  {
    slug: "baby-diamonds",
    name: "Baby Diamonds",
    kind: "stoned",
    descriptor: "Micro-Pavé · Maximum Shimmer",
    longDescription:
      "Tightest stone pattern we offer. Hundreds of small stones set tooth-by-tooth in a true micro-pavé — the surface reads like one continuous sheet of ice. Built for the person who wants every angle to flash.",
    gallery: ["/products/baby-diamonds-1.png", "/products/baby-diamonds-2.png"],
    featured: true,
    highlights: STONED_HIGHLIGHTS,
  },
  {
    slug: "big-diamonds",
    name: "Big Diamonds",
    kind: "stoned",
    descriptor: "Statement Stones · Bold Scatter",
    longDescription:
      "Bigger stones, set in a looser, bolder scatter. Each stone holds the light on its own — no micro-pavé blur, just clear, individual sparkle across every tooth.",
    gallery: ["/products/big-diamonds-1.png", "/products/big-diamonds-2.png"],
    highlights: STONED_HIGHLIGHTS,
  },
  {
    slug: "el-presidente",
    name: "El Presidente",
    kind: "stoned",
    descriptor: "Center Stones · Iridescent Aurora",
    longDescription:
      "Statement piece. One large iridescent aurora-cut stone at the center of every tooth, framed by tight pavé. Light hits it and the whole smile shifts color — different read at every angle.",
    gallery: ["/products/el-presidente-1.png", "/products/el-presidente-2.png"],
    highlights: STONED_HIGHLIGHTS,
  },
  {
    slug: "el-stupido",
    name: "El Stupido",
    kind: "stoned",
    descriptor: "Stupid-Iced · Center-Stone Pavé",
    longDescription:
      "Named because of how stupid-iced it looks under any light. Larger stones at the center of each tooth, surrounded by tighter pavé — the perfect middle ground between Baby Diamonds and Big Diamonds.",
    gallery: ["/products/el-stupido.png"],
    highlights: STONED_HIGHLIGHTS,
  },
  {
    slug: "honey-comb",
    name: "Honey Comb",
    kind: "stoned",
    descriptor: "Hex Pavé Pattern · Tight Cluster",
    longDescription:
      "Hexagonal micro-pavé. Stones cluster in a true honeycomb geometry instead of the usual random scatter — gives the set a structured, almost architectural read up close, with the same all-over shimmer at a distance.",
    gallery: ["/products/honey-comb-1.png", "/products/honey-comb-2.png"],
    highlights: STONED_HIGHLIGHTS,
  },
  // Rectangles temporarily removed — inventory unavailable. Re-add to bring
  // it back; the image at /public/products/rectangles.png is still in place.
  {
    slug: "gold-slugs",
    name: "Gold Slugs",
    kind: "plain",
    descriptor: "Solid Gold · No Stones · Industry Classic",
    longDescription:
      "Pure metal — no stones, no pavé. The industry calls these slugs. Solid Yellow, White, or Rose Gold caps, rimless and custom-fit. Pick a single half or the full top-and-bottom set; the set saves you $30 vs. buying two halves.",
    gallery: [],
    highlights: PLAIN_HIGHLIGHTS,
  },
];

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
