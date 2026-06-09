"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Diamond, CreditCard, Spinner, WarningCircle } from "@phosphor-icons/react";
import { Bezel } from "./Bezel";
import { CTAButton } from "./CTAButton";
import type { Product, Finish } from "@/data/products";

const finishStyles: Record<Finish, { swatch: string; ring: string }> = {
  Gold: {
    swatch:
      "bg-[radial-gradient(circle_at_35%_30%,#FFE9A3_0%,#E8B547_45%,#A87223_100%)]",
    ring: "ring-[#E8B547]",
  },
  "White Gold": {
    swatch:
      "bg-[radial-gradient(circle_at_35%_30%,#FFFFFF_0%,#E2E5EA_45%,#9CA0A8_100%)]",
    ring: "ring-[#E2E5EA]",
  },
  "Rose Gold": {
    swatch:
      "bg-[radial-gradient(circle_at_35%_30%,#FFD4C2_0%,#E5A187_45%,#A05E48_100%)]",
    ring: "ring-[#E5A187]",
  },
};

/**
 * Client-side gallery + finish picker + checkout button for the product
 * detail page. Receives the full product from the server component.
 */
export function ProductDetailClient({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [finish, setFinish] = useState<Finish>(product.finishes[0]);
  const [checkoutState, setCheckoutState] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeImage = product.gallery[activeIndex];
  const installment = Math.round((product.priceFrom / 4) * 100) / 100;

  async function startOrder() {
    setCheckoutState("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, finish }),
      });
      const data: { url?: string; error?: string; detail?: string } = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? data.detail ?? `Status ${res.status}`);
      }
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      console.error("[order] checkout failed:", message);
      setErrorMessage(message);
      setCheckoutState("error");
    }
  }

  return (
    <>
      {/* Gallery — sits in the left column on desktop */}
      <div className="md:col-span-7">
        <Bezel>
          <div className="relative aspect-square w-full overflow-hidden bg-bg-tertiary">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeImage}
                  alt={`${product.name} — ${product.descriptor}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-primary/70 px-3 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                Full 10-on-10
              </span>
            </div>
          </div>
        </Bezel>

        {product.gallery.length > 1 && (
          <ul className="mt-4 grid grid-cols-4 gap-3" aria-label="Additional angles">
            {product.gallery.map((src, i) => {
              const active = i === activeIndex;
              return (
                <li key={src}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={active}
                    aria-label={`Show angle ${i + 1}`}
                    className={`group/thumb relative block aspect-square w-full overflow-hidden rounded-2xl ring-1 transition-all duration-300 ${
                      active
                        ? "ring-accent-silver"
                        : "ring-border-subtle hover:ring-border-strong"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                  </button>
                </li>
              );
            })}
            {Array.from({ length: Math.max(0, 4 - product.gallery.length) }).map(
              (_, i) => (
                <li
                  key={`empty-${i}`}
                  aria-hidden
                  className="relative aspect-square overflow-hidden rounded-2xl bg-bg-secondary ring-1 ring-border-subtle"
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <Diamond size={18} weight="duotone" className="text-accent-silver/25" />
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* Details — finish selector + checkout button live inside the right col */}
      <div className="md:col-span-5 md:pt-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-3 py-1 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
            Full 10-on-10 · Lab-Grown Diamonds
          </span>
        </span>

        <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-6xl">
          {product.name}
        </h1>

        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-text-muted">
          {product.descriptor}
        </p>

        <div className="mt-8 flex items-baseline gap-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            From
          </span>
          <span className="diamond-text font-mono text-4xl font-semibold tracking-wider">
            ${product.priceFrom.toLocaleString()}
          </span>
        </div>

        {/* BNPL inline messaging — Stripe shows the live messaging widgets on
            the Checkout page; this is a quiet teaser so customers know
            financing is an option BEFORE they click. */}
        <div className="mt-3 flex items-start gap-2 text-xs text-text-secondary">
          <CreditCard size={14} weight="duotone" className="mt-0.5 shrink-0 text-accent-ice" />
          <p>
            or 4 interest-free payments of{" "}
            <span className="font-mono text-text-primary">
              ${installment.toLocaleString()}
            </span>{" "}
            with <span className="text-text-primary">Klarna</span>,{" "}
            <span className="text-text-primary">Afterpay</span>, or{" "}
            <span className="text-text-primary">Affirm</span> — select at checkout.
          </p>
        </div>

        <p className="mt-8 text-base leading-relaxed text-text-secondary">
          {product.longDescription}
        </p>

        {/* Finish selector */}
        <fieldset className="mt-10">
          <legend className="flex w-full items-baseline justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Finish
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-primary">
              {finish}
            </span>
          </legend>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {product.finishes.map((f) => {
              const active = f === finish;
              const style = finishStyles[f];
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFinish(f)}
                  aria-pressed={active}
                  className={`group/finish relative flex flex-col items-center gap-3 rounded-2xl border bg-bg-secondary/60 px-3 py-4 text-center transition-all duration-300 ${
                    active
                      ? "border-accent-silver bg-bg-secondary/90"
                      : "border-border-strong hover:border-white/30"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-bg-secondary transition-all duration-300 ${
                      style.swatch
                    } ${active ? style.ring : "ring-transparent"}`}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-primary">
                    {f}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Checkout */}
        <div className="mt-10 flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <CTAButton
              onClick={startOrder}
              disabled={checkoutState === "loading"}
              withArrow={checkoutState !== "loading"}
            >
              {checkoutState === "loading" ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner size={14} weight="bold" className="animate-spin" />
                  Opening checkout
                </span>
              ) : (
                "Start Your Order"
              )}
            </CTAButton>
            <CTAButton href="/shop" variant="ghost">
              Browse More
            </CTAButton>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            Secure checkout by Stripe · Card · Klarna · Afterpay · Affirm
          </p>
          {checkoutState === "error" && errorMessage && (
            <div
              role="alert"
              className="mt-2 flex items-start gap-2 rounded-2xl border border-rose-400/40 bg-rose-500/[0.06] p-4 text-sm text-rose-100"
            >
              <WarningCircle size={18} weight="duotone" className="mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Checkout couldn&rsquo;t start.</p>
                <p className="mt-1 text-xs opacity-80">{errorMessage}</p>
                <p className="mt-2 text-xs opacity-70">
                  If this keeps happening, email{" "}
                  <a className="underline" href="mailto:hello@bestgrillz.com">
                    hello@bestgrillz.com
                  </a>{" "}
                  and we&rsquo;ll take the order manually.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
