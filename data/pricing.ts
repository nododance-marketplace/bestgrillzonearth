/**
 * Single source of truth for all configurator pricing.
 *
 * Two product modes:
 *  - 'stoned' — Moissanite / Lab Diamond / Natural Diamond at variable tooth counts
 *  - 'plain'  — solid metal "slugs" (no stones); flat-priced per half / per set
 *
 * Stoned pricing chart (per tooth count, in USD):
 *   single half (top OR bottom)    matched set (top AND bottom, same count)
 *   ─────────────────────────────  ──────────────────────────────────────────
 *   tier      6    8    10   12    6     8     10    12
 *   ────────────────────────────   ──────────────────────────────────────────
 *   moissanite 350  375  400  425   650   700   750   800
 *   lab        369  399  420  445   695   745   795   845
 *   natural    480  510  540  570   740   790   840   890
 *
 * Plain gold (no stones, any finish): $150 per half, $270 for the full set.
 */

export type ProductKind = "stoned" | "plain";
export type StoneTier = "moissanite" | "lab" | "natural";
export type ToothCount = 0 | 6 | 8 | 10 | 12;
export type PlainHalf = "top" | "bottom" | "set";
export type Finish = "Yellow Gold" | "White Gold" | "Rose Gold";

export const STONE_TIERS: StoneTier[] = ["moissanite", "lab", "natural"];
export const TOOTH_COUNTS: ToothCount[] = [0, 6, 8, 10, 12];
export const PLAIN_HALVES: PlainHalf[] = ["top", "bottom", "set"];
export const FINISHES: Finish[] = ["Yellow Gold", "White Gold", "Rose Gold"];

export const STONE_TIER_LABELS: Record<StoneTier, string> = {
  moissanite: "Moissanite",
  lab: "Lab Diamond",
  natural: "Natural Diamond",
};

export const STONE_TIER_BLURBS: Record<StoneTier, string> = {
  moissanite:
    "Brilliant cubic-zirconia-grade stones — most affordable, holds light beautifully.",
  lab: "Real diamond, lab-grown — same chemistry as mined, fraction of the cost.",
  natural:
    "Earth-mined natural diamonds — the most prestigious choice in the lineup.",
};

export const PLAIN_HALF_LABELS: Record<PlainHalf, string> = {
  top: "Top Only",
  bottom: "Bottom Only",
  set: "Top + Bottom",
};

type StonedToothCount = Exclude<ToothCount, 0>;

const SINGLE_PRICES: Record<StoneTier, Record<StonedToothCount, number>> = {
  moissanite: { 6: 350, 8: 375, 10: 400, 12: 425 },
  lab: { 6: 369, 8: 399, 10: 420, 12: 445 },
  natural: { 6: 480, 8: 510, 10: 540, 12: 570 },
};

const SET_PRICES: Record<StoneTier, Record<StonedToothCount, number>> = {
  moissanite: { 6: 650, 8: 700, 10: 750, 12: 800 },
  lab: { 6: 695, 8: 745, 10: 795, 12: 845 },
  natural: { 6: 740, 8: 790, 10: 840, 12: 890 },
};

const PLAIN_PRICES: Record<PlainHalf, number> = {
  top: 150,
  bottom: 150,
  set: 270,
};

export type StonedConfig = {
  kind: "stoned";
  stoneTier: StoneTier;
  topCount: ToothCount;
  bottomCount: ToothCount;
  finish: Finish;
};

export type PlainConfigOrder = {
  kind: "plain";
  half: PlainHalf;
  finish: Finish;
};

export type OrderConfig = StonedConfig | PlainConfigOrder;

export type PriceBreakdown = {
  total: number;
  topPrice: number;
  bottomPrice: number;
  /** True when the matched-set discount applies (same nonzero count on both halves). */
  isMatchedSet: boolean;
  /** Discount applied when picking a matched set (vs. two singles). 0 otherwise. */
  setSavings: number;
  /** Whether the configuration is valid (at least one half configured). */
  valid: boolean;
  /** Reason it's invalid, if not valid. */
  error?: string;
};

export function singleHalfPrice(tier: StoneTier, count: ToothCount): number {
  if (count === 0) return 0;
  return SINGLE_PRICES[tier][count];
}

export function setPrice(tier: StoneTier, count: StonedToothCount): number {
  return SET_PRICES[tier][count];
}

export function plainPrice(half: PlainHalf): number {
  return PLAIN_PRICES[half];
}

export function computePrice(config: OrderConfig): PriceBreakdown {
  if (config.kind === "plain") {
    const total = plainPrice(config.half);
    return {
      total,
      topPrice: config.half === "top" || config.half === "set" ? 150 : 0,
      bottomPrice: config.half === "bottom" || config.half === "set" ? 150 : 0,
      isMatchedSet: config.half === "set",
      setSavings: config.half === "set" ? 30 : 0,
      valid: true,
    };
  }

  const { stoneTier, topCount, bottomCount } = config;

  if (topCount === 0 && bottomCount === 0) {
    return {
      total: 0,
      topPrice: 0,
      bottomPrice: 0,
      isMatchedSet: false,
      setSavings: 0,
      valid: false,
      error: "Pick at least one half.",
    };
  }

  const topPrice = singleHalfPrice(stoneTier, topCount);
  const bottomPrice = singleHalfPrice(stoneTier, bottomCount);

  // Matched-set discount: both halves configured, same tooth count.
  if (topCount > 0 && bottomCount > 0 && topCount === bottomCount) {
    const matched = setPrice(stoneTier, topCount as StonedToothCount);
    return {
      total: matched,
      topPrice,
      bottomPrice,
      isMatchedSet: true,
      setSavings: topPrice + bottomPrice - matched,
      valid: true,
    };
  }

  return {
    total: topPrice + bottomPrice,
    topPrice,
    bottomPrice,
    isMatchedSet: false,
    setSavings: 0,
    valid: true,
  };
}

/** Lowest possible total a stoned design can sell for ($350 — 6 Moissanite single). */
export function startingPriceStoned(): number {
  return SINGLE_PRICES.moissanite[6];
}

/** Lowest possible total Plain Gold can sell for ($150 — single half). */
export function startingPricePlain(): number {
  return PLAIN_PRICES.top;
}

/** Human-readable description of a config for emails, Stripe line items, etc. */
export function describeConfig(config: OrderConfig): string {
  if (config.kind === "plain") {
    return `${PLAIN_HALF_LABELS[config.half]} · ${config.finish}`;
  }
  const parts: string[] = [STONE_TIER_LABELS[config.stoneTier]];
  if (config.topCount > 0) parts.push(`${config.topCount} Top`);
  if (config.bottomCount > 0) parts.push(`${config.bottomCount} Bottom`);
  parts.push(config.finish);
  return parts.join(" · ");
}

/** Compact descriptor used in Stripe line item name. */
export function configLineItemName(productName: string, config: OrderConfig): string {
  if (config.kind === "plain") {
    return `${productName} — ${PLAIN_HALF_LABELS[config.half]}, ${config.finish}`;
  }
  const top = config.topCount > 0 ? `${config.topCount} Top` : null;
  const bot = config.bottomCount > 0 ? `${config.bottomCount} Bottom` : null;
  const counts = [top, bot].filter(Boolean).join(" + ");
  return `${productName} — ${STONE_TIER_LABELS[config.stoneTier]} · ${counts} · ${config.finish}`;
}
