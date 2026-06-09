import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { productBySlug, type Finish } from "@/data/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_FINISHES: Finish[] = ["Gold", "White Gold", "Rose Gold"];

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

export async function POST(req: NextRequest) {
  let body: { slug?: unknown; finish?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug : null;
  const finish = typeof body.finish === "string" ? (body.finish as Finish) : null;

  if (!slug) {
    return NextResponse.json({ error: "Missing product slug" }, { status: 400 });
  }
  if (!finish || !ALLOWED_FINISHES.includes(finish)) {
    return NextResponse.json({ error: "Invalid finish" }, { status: 400 });
  }

  const product = productBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  if (!product.finishes.includes(finish)) {
    return NextResponse.json(
      { error: "Finish not offered for this product" },
      { status: 400 }
    );
  }

  const origin = originFromRequest(req);
  const stripe = getStripe();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // Buy-now-pay-later methods listed alongside cards.
      // Klarna pay-in-4, Afterpay/Clearpay, and Affirm financing all work
      // at the $750 price point and in USD.
      payment_method_types: ["card", "klarna", "afterpay_clearpay", "affirm"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: product.priceFrom * 100,
            product_data: {
              name: `${product.name} — Best Grillz On Earth`,
              description: `${product.descriptor} · Finish: ${finish}`,
              images: [`${origin}${product.gallery[0]}`],
              metadata: { slug: product.slug, finish },
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      phone_number_collection: { enabled: true },
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      // Used to keep customers' info attached to the order for fulfillment.
      metadata: {
        slug: product.slug,
        finish,
        product_name: product.name,
      },
      // Affirm / Klarna / Afterpay automatically display their messaging on
      // the Checkout page when they're enabled and the amount qualifies.
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
