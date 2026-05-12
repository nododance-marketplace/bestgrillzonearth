/**
 * TODO: USER — Edit names, prices, descriptions, and image paths below.
 * Drop your product images into /public/products/ and reference them by filename.
 * Slugs are used in URLs — keep them lowercase, dashed.
 */

export type ProductCategory = "TOP SET" | "BOTTOM SET" | "FULL 10-ON-10" | "CUSTOM DESIGNS";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  descriptor: string;
  longDescription: string;
  priceFrom: number;
  image: string;
  featured?: boolean;
  highlights: string[];
};

export const products: Product[] = [
  {
    slug: "the-standard",
    name: "The Standard",
    category: "FULL 10-ON-10",
    descriptor: "Full 10-on-10 · Classic Rimless · VS Lab Diamonds",
    longDescription:
      "The benchmark every grillz brand is measured against. A complete top-and-bottom set, fully iced in VS-clarity lab diamonds, sculpted with our signature rimless cut for an invisible-fit finish.",
    priceFrom: 750,
    image: "/products/the-standard.png",
    featured: true,
    highlights: [
      "Complete top and bottom — 20 teeth",
      "Lab-grown VS diamonds, pavé set",
      "Rimless permanent cut",
      "3D-designed, custom-fit per impression",
    ],
  },
  {
    slug: "the-championship",
    name: "The Championship",
    category: "FULL 10-ON-10",
    descriptor: "Full 10-on-10 · VVS Lab Diamonds · Rimless Cut",
    longDescription:
      "The set you wear when you've already won. VVS-clarity lab diamonds in a tightened micro-pavé pattern, finished with our deepest mirror polish on the metalwork that shows through. Built for stage lighting.",
    priceFrom: 1200,
    image: "/products/the-championship.png",
    highlights: [
      "Full set with VVS-grade lab diamonds",
      "Micro-pavé prong density",
      "Mirror-polished negative space",
      "Includes premium velvet case",
    ],
  },
  {
    slug: "the-mogul",
    name: "The Mogul",
    category: "TOP SET",
    descriptor: "Custom Top Set · Iced Edges · Statement Profile",
    longDescription:
      "A custom top-only set with a bolder front-facing profile and iced edges that flash under any angle of light. Designed for the person who built it themselves and wants you to know.",
    priceFrom: 950,
    image: "/products/the-mogul.png",
    highlights: [
      "Top set, 10 teeth",
      "Iced lateral edges",
      "Bolder facing for stronger smile read",
      "Custom shape tooling per client",
    ],
  },
  {
    slug: "the-legacy",
    name: "The Legacy",
    category: "FULL 10-ON-10",
    descriptor: "Full Set · Two-Tone · Yellow + White Mix",
    longDescription:
      "Two-tone craftsmanship. Yellow precious-metal accents on the canine and lateral teeth, white-metal bases throughout, complete with lab diamonds across every surface. Inherited energy, custom build.",
    priceFrom: 1500,
    image: "/products/the-legacy.png",
    highlights: [
      "Yellow + white two-tone build",
      "Accented canine and lateral teeth",
      "Lab diamond full-cover",
      "Heirloom-grade finishing",
    ],
  },
  {
    slug: "the-icon",
    name: "The Icon",
    category: "BOTTOM SET",
    descriptor: "Custom Bottom Set · Pavé Finish · Low-Profile",
    longDescription:
      "A bottom-only custom set with a tightened pavé finish across every tooth. Sits flush, reads clean, and lets the top stay quiet so the bottom does the talking.",
    priceFrom: 850,
    image: "/products/the-icon.png",
    highlights: [
      "Bottom set, 10 teeth",
      "Full pavé lab-diamond surface",
      "Low-profile rimless cut",
      "Pairs with any top set",
    ],
  },
  {
    slug: "the-empire",
    name: "The Empire",
    category: "CUSTOM DESIGNS",
    descriptor: "Full Custom · Premium Cut · Designed With You",
    longDescription:
      "Our flagship. A full custom build co-designed with our 3D team — your initials, your stone layout, your finish, your shape language. Limited to one set per design. Begins with a 1-on-1 design call.",
    priceFrom: 2000,
    image: "/products/the-empire.png",
    highlights: [
      "Fully custom — top, bottom, or both",
      "1-on-1 design call with our 3D team",
      "Initials, motifs, custom stone layouts",
      "Limited to one set per design",
    ],
  },
];

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const filterCategories: Array<"ALL" | ProductCategory> = [
  "ALL",
  "TOP SET",
  "BOTTOM SET",
  "FULL 10-ON-10",
  "CUSTOM DESIGNS",
];
