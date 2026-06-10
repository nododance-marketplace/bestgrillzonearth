"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Diamond,
  Coin,
  CreditCard,
  Spinner,
  WarningCircle,
  CheckCircle,
} from "@phosphor-icons/react";
import { Bezel } from "./Bezel";
import { CTAButton } from "./CTAButton";
import type { Product } from "@/data/products";
import {
  computePrice,
  FINISHES,
  PLAIN_HALF_LABELS,
  PLAIN_HALVES,
  singleHalfPrice,
  STONE_TIERS,
  STONE_TIER_BLURBS,
  STONE_TIER_LABELS,
  TOOTH_COUNTS,
  type Finish,
  type OrderConfig,
  type PlainHalf,
  type StoneTier,
  type ToothCount,
} from "@/data/pricing";

const finishSwatches: Record<Finish, { swatch: string; ring: string }> = {
  "Yellow Gold": {
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

export function ProductDetailClient({ product }: { product: Product }) {
  if (product.kind === "plain") {
    return <PlainGoldConfigurator product={product} />;
  }
  return <StonedConfigurator product={product} />;
}

/* ─────────────────────────────────────────────────────────────────────────
 * Stoned configurator (Baby Diamonds, Big Diamonds, El Presidente, etc.)
 * ───────────────────────────────────────────────────────────────────────── */

function StonedConfigurator({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stoneTier, setStoneTier] = useState<StoneTier>("lab");
  const [topCount, setTopCount] = useState<ToothCount>(10);
  const [bottomCount, setBottomCount] = useState<ToothCount>(10);
  const [finish, setFinish] = useState<Finish>("White Gold");

  const config: OrderConfig = {
    kind: "stoned",
    stoneTier,
    topCount,
    bottomCount,
    finish,
  };
  const breakdown = useMemo(() => computePrice(config), [config]);
  const installment = Math.round((breakdown.total / 4) * 100) / 100;
  const activeImage = product.gallery[activeIndex];

  return (
    <>
      <Gallery
        gallery={product.gallery}
        activeImage={activeImage}
        activeIndex={activeIndex}
        onPickIndex={setActiveIndex}
        productName={product.name}
        descriptor={product.descriptor}
        badgeText="Custom Build · 6 / 8 / 10 / 12"
      />

      <div className="md:col-span-5 md:pt-6">
        <Header
          eyebrow="Configurable · Lab-Tier or Natural Stones"
          name={product.name}
          descriptor={product.descriptor}
        />

        {/* 1. STONE TIER */}
        <Step number={1} title="Stones">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STONE_TIERS.map((tier) => {
              const active = tier === stoneTier;
              const startsAt = singleHalfPrice(tier, 6);
              return (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setStoneTier(tier)}
                  aria-pressed={active}
                  className={`group/tier rounded-2xl border bg-bg-secondary/60 px-4 py-4 text-left transition-all duration-300 ${
                    active
                      ? "border-accent-silver bg-bg-secondary/90"
                      : "border-border-strong hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base uppercase tracking-wider text-text-primary">
                      {STONE_TIER_LABELS[tier]}
                    </span>
                    {active && (
                      <CheckCircle size={16} weight="fill" className="text-accent-silver" />
                    )}
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-secondary">
                    {STONE_TIER_BLURBS[tier]}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    From <span className="text-text-primary">${startsAt}</span>
                  </p>
                </button>
              );
            })}
          </div>
        </Step>

        {/* 2. TOP */}
        <Step number={2} title="Top" trailing={priceTrailing(breakdown.topPrice, topCount)}>
          <CountRow
            value={topCount}
            onChange={setTopCount}
            tier={stoneTier}
            disabledZeroIf={bottomCount === 0}
          />
        </Step>

        {/* 3. BOTTOM */}
        <Step
          number={3}
          title="Bottom"
          trailing={priceTrailing(breakdown.bottomPrice, bottomCount)}
        >
          <CountRow
            value={bottomCount}
            onChange={setBottomCount}
            tier={stoneTier}
            disabledZeroIf={topCount === 0}
          />
        </Step>

        {/* Matched-set banner */}
        <AnimatePresence>
          {breakdown.isMatchedSet && breakdown.setSavings > 0 && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent-silver/40 bg-accent-silver/[0.06] px-3 py-1.5 text-xs text-accent-silver"
            >
              <CheckCircle size={14} weight="fill" />
              Matched set — saves ${breakdown.setSavings}
            </motion.p>
          )}
        </AnimatePresence>

        {/* 4. FINISH */}
        <Step number={4} title="Finish" trailing={<span className="text-text-primary">{finish}</span>}>
          <FinishRow value={finish} onChange={setFinish} />
        </Step>

        <TotalAndCheckout
          product={product}
          config={config}
          total={breakdown.total}
          installment={installment}
          valid={breakdown.valid}
          error={breakdown.error}
        />

        <p className="mt-6 text-base leading-relaxed text-text-secondary">
          {product.longDescription}
        </p>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Plain Gold (Slugs) configurator
 * ───────────────────────────────────────────────────────────────────────── */

function PlainGoldConfigurator({ product }: { product: Product }) {
  const [half, setHalf] = useState<PlainHalf>("set");
  const [finish, setFinish] = useState<Finish>("Yellow Gold");

  const config: OrderConfig = { kind: "plain", half, finish };
  const breakdown = useMemo(() => computePrice(config), [config]);
  const installment = Math.round((breakdown.total / 4) * 100) / 100;

  return (
    <>
      {/* Left column — visual */}
      <div className="md:col-span-7">
        <Bezel>
          <div className="relative aspect-square w-full overflow-hidden">
            <div
              className={`absolute inset-0 transition-colors duration-700 ${finishSwatches[finish].swatch}`}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.5)_100%)]"
            />
            <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 text-bg-primary/85">
              <Coin size={120} weight="duotone" />
              <span className="font-display text-3xl uppercase tracking-wider">
                {finish}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Solid · No Stones · Slugs
              </span>
            </div>
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-bg-primary/30 bg-bg-primary/70 px-3 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                Plain Gold · Slugs
              </span>
            </div>
          </div>
        </Bezel>
      </div>

      {/* Right column — configurator */}
      <div className="md:col-span-5 md:pt-6">
        <Header
          eyebrow="Solid Gold · Industry Classic"
          name={product.name}
          descriptor={product.descriptor}
        />

        {/* 1. CONFIGURATION */}
        <Step number={1} title="Configuration">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {PLAIN_HALVES.map((option) => {
              const active = option === half;
              const price = option === "set" ? 270 : 150;
              const saves = option === "set" ? " · Saves $30" : "";
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setHalf(option)}
                  aria-pressed={active}
                  className={`group/half rounded-2xl border bg-bg-secondary/60 px-4 py-4 text-left transition-all duration-300 ${
                    active
                      ? "border-accent-silver bg-bg-secondary/90"
                      : "border-border-strong hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base uppercase tracking-wider text-text-primary">
                      {PLAIN_HALF_LABELS[option]}
                    </span>
                    {active && (
                      <CheckCircle size={16} weight="fill" className="text-accent-silver" />
                    )}
                  </div>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    <span className="text-text-primary">${price}</span>
                    {saves}
                  </p>
                </button>
              );
            })}
          </div>
        </Step>

        {/* 2. FINISH */}
        <Step number={2} title="Finish" trailing={<span className="text-text-primary">{finish}</span>}>
          <FinishRow value={finish} onChange={setFinish} />
        </Step>

        <TotalAndCheckout
          product={product}
          config={config}
          total={breakdown.total}
          installment={installment}
          valid={breakdown.valid}
          error={breakdown.error}
        />

        <p className="mt-6 text-base leading-relaxed text-text-secondary">
          {product.longDescription}
        </p>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Shared building blocks
 * ───────────────────────────────────────────────────────────────────────── */

function Header({
  eyebrow,
  name,
  descriptor,
}: {
  eyebrow: string;
  name: string;
  descriptor: string;
}) {
  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-3 py-1 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
          {eyebrow}
        </span>
      </span>
      <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-6xl">
        {name}
      </h1>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-text-muted">
        {descriptor}
      </p>
    </>
  );
}

function Step({
  number,
  title,
  trailing,
  children,
}: {
  number: number;
  title: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          <span className="text-accent-silver">{number}.</span>{" "}
          <span className="text-text-primary">{title}</span>
        </h2>
        {trailing && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            {trailing}
          </span>
        )}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function priceTrailing(price: number, count: ToothCount) {
  if (count === 0) return <span>None</span>;
  return <span className="text-text-primary">${price}</span>;
}

function CountRow({
  value,
  onChange,
  tier,
  disabledZeroIf,
}: {
  value: ToothCount;
  onChange: (n: ToothCount) => void;
  tier: StoneTier;
  /** If true, disable the "None" option so the user can't end up with zero/zero. */
  disabledZeroIf: boolean;
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {TOOTH_COUNTS.map((n) => {
        const active = n === value;
        const disabled = n === 0 && disabledZeroIf;
        const price = n > 0 ? singleHalfPrice(tier, n) : null;
        return (
          <button
            key={n}
            type="button"
            disabled={disabled}
            onClick={() => onChange(n)}
            aria-pressed={active}
            className={`flex flex-col items-center justify-center rounded-2xl border bg-bg-secondary/60 px-2 py-3 text-center transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 ${
              active
                ? "border-accent-silver bg-bg-secondary/90"
                : "border-border-strong hover:border-white/30"
            }`}
          >
            <span className="font-display text-lg uppercase leading-none tracking-wider text-text-primary">
              {n === 0 ? "None" : n}
            </span>
            {price !== null && (
              <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-text-muted">
                ${price}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function FinishRow({
  value,
  onChange,
}: {
  value: Finish;
  onChange: (f: Finish) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {FINISHES.map((f) => {
        const active = f === value;
        const style = finishSwatches[f];
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
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
  );
}

function Gallery({
  gallery,
  activeImage,
  activeIndex,
  onPickIndex,
  productName,
  descriptor,
  badgeText,
}: {
  gallery: string[];
  activeImage: string | undefined;
  activeIndex: number;
  onPickIndex: (i: number) => void;
  productName: string;
  descriptor: string;
  badgeText: string;
}) {
  return (
    <div className="md:col-span-7">
      <Bezel>
        <div className="relative aspect-square w-full overflow-hidden bg-bg-tertiary">
          {activeImage ? (
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
                  alt={`${productName} — ${descriptor}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 720px, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Diamond size={48} weight="duotone" className="text-accent-silver/30" />
            </div>
          )}
          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-primary/70 px-3 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
              {badgeText}
            </span>
          </div>
        </div>
      </Bezel>

      {gallery.length > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3" aria-label="Additional angles">
          {gallery.map((src, i) => {
            const active = i === activeIndex;
            return (
              <li key={src}>
                <button
                  type="button"
                  onClick={() => onPickIndex(i)}
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
        </ul>
      )}
    </div>
  );
}

function TotalAndCheckout({
  product,
  config,
  total,
  installment,
  valid,
  error,
}: {
  product: Product;
  config: OrderConfig;
  total: number;
  installment: number;
  valid: boolean;
  error?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function startOrder() {
    if (!valid) return;
    setState("loading");
    setErrMsg(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, config }),
      });
      const data: { url?: string; error?: string; detail?: string } = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? data.detail ?? `Status ${res.status}`);
      }
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      console.error("[order] checkout failed:", message);
      setErrMsg(message);
      setState("error");
    }
  }

  return (
    <div className="mt-10 border-t border-border-subtle pt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            Total
          </p>
          <p className="diamond-text mt-1 font-mono text-4xl font-semibold tracking-wider">
            ${total.toLocaleString()}
          </p>
        </div>
        <div className="hidden text-right md:block">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            or 4 payments of
          </p>
          <p className="mt-1 font-mono text-base text-text-primary">
            ${installment.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-text-secondary">
        <CreditCard size={14} weight="duotone" className="mt-0.5 shrink-0 text-accent-ice" />
        <p>
          or pay in 4 with{" "}
          <span className="text-text-primary">Klarna</span>,{" "}
          <span className="text-text-primary">Afterpay</span>, or{" "}
          <span className="text-text-primary">Affirm</span> — select at checkout.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <CTAButton
          onClick={startOrder}
          disabled={state === "loading" || !valid}
          withArrow={state !== "loading"}
        >
          {state === "loading" ? (
            <span className="inline-flex items-center gap-2">
              <Spinner size={14} weight="bold" className="animate-spin" />
              Opening checkout
            </span>
          ) : valid ? (
            "Start Your Order"
          ) : (
            "Pick at least one half"
          )}
        </CTAButton>
        <CTAButton href="/shop" variant="ghost">
          Browse More
        </CTAButton>
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        Secure checkout by Stripe · Card · Klarna · Afterpay · Affirm
      </p>

      {state === "error" && errMsg && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-2xl border border-rose-400/40 bg-rose-500/[0.06] p-4 text-sm text-rose-100"
        >
          <WarningCircle size={18} weight="duotone" className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Checkout couldn&rsquo;t start.</p>
            <p className="mt-1 text-xs opacity-80">{errMsg}</p>
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

      {!valid && error && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}
