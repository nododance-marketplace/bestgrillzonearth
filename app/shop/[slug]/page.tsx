import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Sparkle,
  ShieldCheck,
  Camera,
} from "@phosphor-icons/react/dist/ssr";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Bezel } from "@/components/Bezel";
import { CTAButton } from "@/components/CTAButton";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { products, productBySlug } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = productBySlug(params.slug);
  if (!product) return { title: "Not Found — Best Grillz On Earth" };
  return {
    title: `${product.name} — Best Grillz On Earth`,
    description: product.longDescription,
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = productBySlug(params.slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main className="pt-32 md:pt-40">
        <section className="mx-auto w-full max-w-shell px-6 md:px-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={14} weight="bold" />
            Back to the Collection
          </Link>
        </section>

        <section
          className="mx-auto mt-12 grid w-full max-w-shell grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-12 md:px-10"
          aria-labelledby="product-heading"
        >
          {/* Client component: gallery + finish picker (state-driven) */}
          <ProductDetailClient product={product} />
        </section>

        {/* Highlights + CTAs + AR callout — sits below the gallery on its own row */}
        <section className="mx-auto mt-16 grid w-full max-w-shell grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-12 md:px-10">
          <div className="md:col-span-7 md:col-start-6">
            <ul className="flex flex-col gap-3 border-y border-border-subtle py-8">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-text-secondary">
                  <Sparkle
                    size={14}
                    weight="fill"
                    className="mt-1 shrink-0 text-accent-silver"
                  />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* TODO: USER — Replace with real order link, contact form, or Instagram DM */}
              <CTAButton
                href={`mailto:hello@bestgrillz.com?subject=Start Order — ${product.name} (Best Grillz On Earth)`}
              >
                Start Your Order
              </CTAButton>
              <CTAButton href="/shop" variant="ghost">
                Browse More
              </CTAButton>
            </div>

            <div className="mt-10 rounded-2xl border border-border-strong bg-bg-secondary/60 p-5">
              <div className="flex items-start gap-3">
                <Camera size={20} weight="duotone" className="mt-0.5 text-accent-ice" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    Coming Soon
                  </p>
                  <p className="mt-1 text-sm text-text-primary">
                    Try this set on with AR — straight from your phone camera.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it's made — proprietary craft section */}
        <section className="mx-auto mt-32 w-full max-w-shell px-6 md:px-10">
          <Bezel>
            <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-12 md:p-14">
              <div className="md:col-span-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  Craft
                </span>
                <h2 className="mt-4 font-display text-4xl uppercase leading-tight tracking-wider md:text-5xl">
                  How it&rsquo;s <span className="diamond-text">made.</span>
                </h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-base leading-relaxed text-text-secondary">
                  Every set begins with our in-house 3D design team. We work with
                  precision tooling that traditional cast-iron jewelers can&rsquo;t match
                  — producing tighter fits, cleaner cut lines, and crisper diamond
                  placement than the market standard. The result reads like the
                  grillz grew on your teeth: rimless, flush, and built to last.
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm text-text-secondary">
                  <ShieldCheck size={18} weight="duotone" className="text-accent-silver" />
                  Custom-fit guarantee · Lifetime adjustments
                </div>
              </div>
            </div>
          </Bezel>
        </section>

        {/* Related */}
        <section className="mx-auto mt-32 w-full max-w-shell px-6 md:px-10">
          <div className="mb-10 flex items-baseline justify-between">
            <h2 className="font-display text-3xl uppercase tracking-wider md:text-4xl">
              You may also like
            </h2>
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary"
            >
              View all →
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug} className="list-none">
                <Link href={`/shop/${p.slug}`} className="group/related block">
                  <Bezel>
                    <div className="relative aspect-square overflow-hidden bg-bg-tertiary">
                      <Image
                        src={p.gallery[0]}
                        alt={p.name}
                        fill
                        sizes="(min-width: 1024px) 380px, 100vw"
                        className="object-cover transition-transform duration-700 ease-out-quint group-hover/related:scale-105"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(0,0,0,0.4)_100%)]"
                      />
                    </div>
                    <div className="flex items-baseline justify-between gap-3 px-6 py-5">
                      <h3 className="font-display text-xl uppercase tracking-wider">
                        {p.name}
                      </h3>
                      <span className="diamond-text font-mono text-sm font-semibold tracking-wider">
                        ${p.priceFrom.toLocaleString()}
                      </span>
                    </div>
                  </Bezel>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
