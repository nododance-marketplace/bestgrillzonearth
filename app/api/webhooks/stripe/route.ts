import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook endpoint.
 *
 * In production:
 *   1. Create a webhook endpoint in https://dashboard.stripe.com/webhooks
 *      pointing to https://<your-domain>/api/webhooks/stripe
 *   2. Subscribe to: checkout.session.completed, checkout.session.async_payment_succeeded,
 *      checkout.session.async_payment_failed
 *   3. Copy the signing secret (whsec_...) into STRIPE_WEBHOOK_SECRET in Vercel.
 *
 * Locally (with Stripe CLI):
 *   `stripe listen --forward-to localhost:3009/api/webhooks/stripe`
 *   The CLI prints a whsec_... — paste it into STRIPE_WEBHOOK_SECRET in .env.local.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  if (signingSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("[stripe-webhook] signature verification failed:", message);
      return new NextResponse(`Signature error: ${message}`, { status: 400 });
    }
  } else {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[stripe-webhook] STRIPE_WEBHOOK_SECRET missing in production — refusing to process unverified events."
      );
      return new NextResponse("Webhook secret not configured", { status: 503 });
    }
    // Development fallback: parse without signature verification so the
    // endpoint is usable before the Stripe CLI is wired up. Never deploys.
    try {
      event = JSON.parse(rawBody) as Stripe.Event;
    } catch {
      return new NextResponse("Invalid payload", { status: 400 });
    }
    console.warn(
      "[stripe-webhook] WARNING: processing event without signature verification (dev only)."
    );
  }

  // Log the event so it's visible in Vercel logs / `vercel logs` / local console.
  // Replace this block with real fulfillment (DB insert, email, Slack, etc.)
  // when you wire up an order pipeline.
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("[stripe-webhook] order paid:", {
        sessionId: session.id,
        amount: session.amount_total,
        currency: session.currency,
        customerEmail: session.customer_details?.email,
        customerName: session.customer_details?.name,
        slug: session.metadata?.slug,
        finish: session.metadata?.finish,
        productName: session.metadata?.product_name,
        paymentStatus: session.payment_status,
        shipping: session.shipping_details,
      });
      break;
    }
    case "checkout.session.async_payment_failed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.warn("[stripe-webhook] async payment failed:", {
        sessionId: session.id,
        slug: session.metadata?.slug,
      });
      break;
    }
    default:
      console.log(`[stripe-webhook] received ${event.type} (no handler)`);
  }

  return NextResponse.json({ received: true });
}
