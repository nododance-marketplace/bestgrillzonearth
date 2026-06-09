import Stripe from "stripe";

/**
 * Lazy singleton — Stripe SDK instance.
 * The secret key is read from env at first call so missing keys at build
 * time don't crash static page generation.
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local locally or to Vercel env vars in production."
    );
  }
  _stripe = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    appInfo: {
      name: "Best Grillz On Earth",
      url: "https://bestgrillzonearth.example",
    },
  });
  return _stripe;
}

/** Compute the inline BNPL hint shown on the product page. */
export function bnplPaymentHint(priceUsd: number): { label: string; per: number } {
  const per = Math.round((priceUsd / 4) * 100) / 100;
  return { label: `4 payments`, per };
}
