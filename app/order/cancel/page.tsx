import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, XCircle } from "@phosphor-icons/react/dist/ssr";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import { productBySlug } from "@/data/products";

export const metadata: Metadata = {
  title: "Order Canceled — Best Grillz On Earth",
  robots: { index: false, follow: false },
};

type SearchParams = { slug?: string };

export default function OrderCancelPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const product = searchParams.slug ? productBySlug(searchParams.slug) : undefined;

  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-shell flex-col items-center justify-center px-6 py-32 text-center md:px-10">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-400/10 ring-1 ring-rose-400/30">
          <XCircle size={32} weight="duotone" className="text-rose-300" />
        </div>
        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-3 py-1 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
            Order Canceled
          </span>
        </span>
        <h1 className="mt-6 font-display text-6xl uppercase leading-[0.9] tracking-tight md:text-7xl">
          No charge made.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
          You closed the checkout — no card was charged, no payment plan started.
          The collection is right where you left it.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {product ? (
            <CTAButton href={`/shop/${product.slug}`}>
              Back to {product.name}
            </CTAButton>
          ) : (
            <CTAButton href="/shop">Back to the Collection</CTAButton>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-4 py-2 text-xs uppercase tracking-widest text-text-secondary backdrop-blur-md transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={14} weight="bold" />
            Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
