import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { productBySlug } from "@/data/products";
import {
  computePrice,
  configLineItemName,
  describeConfig,
  FINISHES,
  PLAIN_HALVES,
  STONE_TIERS,
  TOOTH_COUNTS,
  type Finish,
  type OrderConfig,
  type PlainHalf,
  type StoneTier,
  type ToothCount,
} from "@/data/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function originFromRequest(req: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const fromHeader = req.headers.get("origin");
  if (fromHeader) return fromHeader.replace(/\/$/, "");
  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto}://${host}`;
  return "http://localhost:3000";
}

function isFinish(value: unknown): value is Finish {
  return typeof value === "string" && (FINISHES as readonly string[]).includes(value);
}
function isStoneTier(value: unknown): value is StoneTier {
  return typeof value === "string" && (STONE_TIERS as readonly string[]).includes(value);
}
function isToothCount(value: unknown): value is ToothCount {
  return typeof value === "number" && (TOOTH_COUNTS as readonly number[]).includes(value);
}
function isPlainHalf(value: unknown): value is PlainHalf {
  return typeof value === "string" && (PLAIN_HALVES as readonly string[]).includes(value);
}

function validateConfig(raw: unknown): OrderConfig | { error: string } {
  if (!raw || typeof raw !== "object") return { error: "Missing config" };
  const c = raw as Record<string, unknown>;
  if (c.kind === "plain") {
    if (!isPlainHalf(c.half)) return { error: "Invalid half" };
    if (!isFinish(c.finish)) return { error: "Invalid finish" };
    return { kind: "plain", half: c.half, finish: c.finish };
  }
  if (c.kind === "stoned") {
    if (!isStoneTier(c.stoneTier)) return { error: "Invalid stone tier" };
    if (!isToothCount(c.topCount)) return { error: "Invalid top count" };
    if (!isToothCount(c.bottomCount)) return { error: "Invalid bottom count" };
    if (!isFinish(c.finish)) return { error: "Invalid finish" };
    return {
      kind: "stoned",
      stoneTier: c.stoneTier,
      topCount: c.topCount,
      bottomCount: c.bottomCount,
      finish: c.finish,
    };
  }
  return { error: "Invalid kind" };
}

export async function POST(req: NextRequest) {
  let body: { slug?: unknown; config?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug : null;
  if (!slug) {
    return NextResponse.json({ error: "Missing product slug" }, { status: 400 });
  }

  const product = productBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const configResult = validateConfig(body.config);
  if ("error" in configResult) {
    return NextResponse.json({ error: configResult.error }, { status: 400 });
  }

  // Enforce that the config kind matches the product kind.
  if (configResult.kind !== product.kind) {
    return NextResponse.json(
      { error: "Configuration does not match product type" },
      { status: 400 }
    );
  }

  // Server-side price computation — never trust the client total.
  const breakdown = computePrice(configResult);
  if (!breakdown.valid) {
    return NextResponse.json(
      { error: breakdown.error ?? "Invalid configuration" },
      { status: 400 }
    );
  }
  if (breakdown.total <= 0) {
    return NextResponse.json(
      { error: "Configuration produced a zero total" },
      { status: 400 }
    );
  }

  const origin = originFromRequest(req);
  const stripe = getStripe();
  const lineItemName = configLineItemName(product.name, configResult);
  const description = describeConfig(configResult);

  // Build metadata — Stripe accepts up to 50 keys, max 500 char each.
  const metadata: Record<string, string> = {
    slug: product.slug,
    product_name: product.name,
    kind: configResult.kind,
    finish: configResult.finish,
  };
  if (configResult.kind === "stoned") {
    metadata.stone_tier = configResult.stoneTier;
    metadata.top_count = String(configResult.topCount);
    metadata.bottom_count = String(configResult.bottomCount);
    metadata.matched_set = breakdown.isMatchedSet ? "yes" : "no";
    metadata.set_savings = String(breakdown.setSavings);
  } else {
    metadata.half = configResult.half;
  }

  const productImages = product.gallery
    .slice(0, 1)
    .map((path) => `${origin}${path}`);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "klarna", "afterpay_clearpay", "affirm"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: breakdown.total * 100,
            product_data: {
              name: lineItemName,
              description,
              ...(productImages.length > 0 ? { images: productImages } : {}),
              metadata: { slug: product.slug },
            },
          },
        },
      ],
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      metadata,
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order/cancel?slug=${product.slug}`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 500 }
      );
    }
    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[checkout] failed:", message);
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: message },
      { status: 500 }
    );
  }
}
