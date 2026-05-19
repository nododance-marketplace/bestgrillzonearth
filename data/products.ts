/**
 * First-launch collection — six full 10-on-10 sets at $750 each,
 * offered in three finishes. Edit copy, prices, or finishes here.
 */

export type Finish = "Gold" | "White Gold" | "Rose Gold";

export type Product = {
  slug: string;
  name: string;
  descriptor: string;
  longDescription: string;
  priceFrom: number;
  /** First image is the hero shot; subsequent images appear in the gallery thumb row. */
  gallery: string[];
  finishes: Finish[];
  featured?: boolean;
  highlights: string[];
};

const FINISHES: Finish[] = ["Gold", "White Gold", "Rose Gold"];

const BASE_HIGHLIGHTS = [
  "Full 10-on-10 — complete top and bottom set",
  "Lab-grown diamonds, custom-set per tooth",
  "Rimless permanent cut, 3D-designed in-house",
  "Choose your finish: gold, white gold, or rose gold",
];

export const products: Product[] = [
  {
    slug: "baby-diamonds",
    name: "Baby Diamonds",
    descriptor: "Full 10-on-10 · Micro-Pavé · Maximum Shimmer",
    longDescription:
      "Tightest stone pattern we offer. Hundreds of small lab-grown diamonds set tooth-by-tooth in a true micro-pavé — the surface reads like one continuous sheet of ice. Built for the person who wants every angle to flash.",
    priceFrom: 750,
    gallery: ["/products/baby-diamonds-1.png", "/products/baby-diamonds-2.png"],
    finishes: FINISHES,
    featured: true,
    highlights: BASE_HIGHLIGHTS,
  },
  {
    slug: "big-diamonds",
    name: "Big Diamonds",
    descriptor: "Full 10-on-10 · Statement Stones · Bold Scatter",
    longDescription:
      "Bigger lab-grown diamonds, set in a looser, bolder scatter. Each stone holds the light on its own — no micro-pavé blur, just clear, individual sparkle across every tooth.",
    priceFrom: 750,
    gallery: ["/products/big-diamonds-1.png", "/products/big-diamonds-2.png"],
    finishes: FINISHES,
    highlights: BASE_HIGHLIGHTS,
  },
  {
    slug: "el-presidente",
    name: "El Presidente",
    descriptor: "Full 10-on-10 · Center Stones · Iridescent Aurora",
    longDescription:
      "Statement piece. One large iridescent aurora-cut diamond at the center of every tooth, framed by tight pavé. Light hits it and the whole smile shifts color — different read at every angle.",
    priceFrom: 750,
    gallery: ["/products/el-presidente-1.png", "/products/el-presidente-2.png"],
    finishes: FINISHES,
    highlights: BASE_HIGHLIGHTS,
  },
  {
    slug: "el-stupido",
    name: "El Stupido",
    descriptor: "Full 10-on-10 · Stupid-Iced · Center-Stone Pavé",
    longDescription:
      "Named because of how stupid-iced it looks under any light. Larger lab-grown stones at the center of each tooth, surrounded by tighter pavé — the perfect middle ground between Baby Diamonds and Big Diamonds.",
    priceFrom: 750,
    gallery: ["/products/el-stupido.png"],
    finishes: FINISHES,
    highlights: BASE_HIGHLIGHTS,
  },
  {
    slug: "honey-comb",
    name: "Honey Comb",
    descriptor: "Full 10-on-10 · Hex Pavé Pattern · Tight Cluster",
    longDescription:
      "Hexagonal micro-pavé. Stones cluster in a true honeycomb geometry instead of the usual random scatter — gives the set a structured, almost architectural read up close, with the same all-over shimmer at a distance.",
    priceFrom: 750,
    gallery: ["/products/honey-comb-1.png", "/products/honey-comb-2.png"],
    finishes: FINISHES,
    highlights: BASE_HIGHLIGHTS,
  },
  {
    slug: "rectangles",
    name: "Rectangles",
    descriptor: "Full 10-on-10 · Vertical Baguettes · Architectural",
    longDescription:
      "Vertical baguette-cut diamonds, lined up tooth-by-tooth. The only set in the collection with linear geometry — reads cleaner, more architectural, more watchmaker than jeweler. Light catches the long edges.",
    priceFrom: 750,
    gallery: ["/products/rectangles.png"],
    finishes: FINISHES,
    highlights: BASE_HIGHLIGHTS,
  },
];

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
