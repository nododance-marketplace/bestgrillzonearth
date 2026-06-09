import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  Envelope,
  HandWaving,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Bezel } from "@/components/Bezel";
import { CTAButton } from "@/components/CTAButton";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order Confirmed — Best Grillz On Earth",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type SearchParams = { session_id?: string };

async function fetchSessionSummary(sessionId: string | undefined) {
  if (!sessionId) return null;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    return {
      customerEmail: session.customer_details?.email ?? null,
      customerName: session.customer_details?.name ?? null,
      amountTotal: session.amount_total,
      currency: session.currency?.toUpperCase() ?? "USD",
      paymentStatus: session.payment_status,
      productName: session.metadata?.product_name ?? null,
      finish: session.metadata?.finish ?? null,
    };
  } catch (err) {
    console.error("[order/success] failed to retrieve session:", err);
    return null;
  }
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const summary = await fetchSessionSummary(searchParams.session_id);

  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-shell flex-col items-center justify-center px-6 py-32 text-center md:px-10">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent-silver/15 ring-1 ring-accent-silver/40">
          <CheckCircle size={32} weight="duotone" className="text-accent-silver" />
        </div>
        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-3 py-1 backdrop-blur-md">
          <Sparkle size={12} weight="fill" className="text-accent-ice" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
            Order Confirmed
          </span>
        </span>
        <h1 className="mt-6 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-7xl">
          <span className="diamond-text">You&rsquo;re iced.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
          Payment confirmed. We&rsquo;ll reach out within one business day to
          confirm sizing and walk you through the impression-kit process.
        </p>

        {summary && (
          <Bezel className="mt-12 w-full max-w-xl">
            <div className="flex flex-col gap-4 p-8 text-left md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Order Summary
              </p>
              {summary.productName && (
                <div className="flex items-baseline justify-between gap-4 border-b border-border-subtle pb-3">
                  <span className="font-display text-xl uppercase tracking-wider">
                    {summary.productName}
                  </span>
                  {summary.amountTotal !== null && (
                    <span className="diamond-text font-mono text-lg font-semibold tracking-wider">
                      ${(summary.amountTotal / 100).toLocaleString()}
                    </span>
                  )}
                </div>
              )}
              <dl className="grid grid-cols-2 gap-y-2 text-sm">
                {summary.finish && (
                  <>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      Finish
                    </dt>
                    <dd className="text-right text-text-primary">{summary.finish}</dd>
                  </>
                )}
                {summary.customerEmail && (
                  <>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      Receipt to
                    </dt>
                    <dd className="text-right text-text-primary">
                      {summary.customerEmail}
                    </dd>
                  </>
                )}
                {summary.paymentStatus && (
                  <>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      Status
                    </dt>
                    <dd className="text-right font-mono text-xs uppercase tracking-widest text-text-primary">
                      {summary.paymentStatus.replace(/_/g, " ")}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </Bezel>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <CTAButton href="/shop" variant="ghost">
            Back to the Collection
          </CTAButton>
          <a
            href="mailto:hello@bestgrillz.com"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-text-secondary backdrop-blur-md transition-colors hover:text-text-primary"
          >
            <Envelope size={14} weight="duotone" />
            Email us
          </a>
        </div>

        <p className="mt-12 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-muted">
          <HandWaving size={12} weight="duotone" />
          Thank you — welcome to the standard.
        </p>
      </main>
      <Footer />
    </>
  );
}
