"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe } from "@phosphor-icons/react";
import { CTAButton } from "../CTAButton";

export function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40"
      aria-labelledby="hero-heading"
    >
      {/* Ambient light wash — softens pure black per skill rules */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,_rgba(232,232,232,0.08),_transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[28%] -z-10 mx-auto h-[420px] w-[420px] max-w-[80vw] rounded-full bg-accent-ice/10 blur-[120px]"
      />

      <div className="mx-auto grid w-full max-w-shell grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        {/* H1 — Combined Emblem + Typography image (DOM-first so mobile reads
            image → text; CSS order swaps it to the right on desktop). The black
            background is knocked out via mix-blend-mode: screen against the
            dark page canvas, leaving only the globe, chain, and wordmark. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative md:col-span-6 md:order-2"
        >
          {/* Soft conic glow behind the brand mark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[110%] w-[110%] -translate-y-4 rounded-full bg-[conic-gradient(from_180deg,_rgba(255,255,255,0.06),_rgba(184,216,232,0.07),_rgba(255,255,255,0.06))] blur-[80px]"
          />
          {/* Breathing halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[18%] -z-10 mx-auto h-[55%] w-[80%] rounded-full bg-accent-silver/8 blur-[100px]"
          />

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <span className="sr-only">
              Best Grillz On Earth — the American standard for iced-out custom grillz.
            </span>
            <Image
              src="/emblem-typography.png"
              alt=""
              width={1200}
              height={1200}
              priority
              aria-hidden="true"
              className="animate-float h-auto w-full select-none [mix-blend-mode:screen] drop-shadow-[0_40px_80px_rgba(184,216,232,0.18)]"
            />
          </motion.h1>
        </motion.div>

        {/* Content — eyebrow, descriptor, CTAs, stats. Sits left on desktop. */}
        <div className="flex flex-col items-start gap-8 md:col-span-6 md:order-1 md:pt-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-3 py-1 backdrop-blur-md"
          >
            <Globe size={12} weight="duotone" className="text-accent-silver" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
              American-Born · World-Class
            </span>
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-text-primary md:text-5xl lg:text-6xl"
          >
            The American <br className="hidden md:block" />
            <span className="diamond-text">Standard.</span> Iced Out. <br className="hidden md:block" />
            Built for Earth.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
          >
            Custom-cut grillz set in lab-grown diamonds — no rims, no shortcuts,
            no half-sets. Every piece designed in-house with precision tooling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <CTAButton href="/shop" variant="primary">
              Shop the Collection
            </CTAButton>
            <CTAButton href="#difference" variant="ghost">
              Design Yours
            </CTAButton>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap items-end gap-10 border-t border-border-subtle pt-6"
          >
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Starting at
              </dt>
              <dd className="diamond-text mt-1 font-mono text-2xl font-semibold tracking-wider">
                $750
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Diamonds
              </dt>
              <dd className="mt-1 font-mono text-sm uppercase tracking-wider text-text-secondary">
                Lab-Grown · VS to VVS
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                Cut
              </dt>
              <dd className="mt-1 font-mono text-sm uppercase tracking-wider text-text-secondary">
                Rimless Permanent
              </dd>
            </div>
          </motion.dl>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mx-auto mt-20 hidden w-full max-w-shell px-6 md:block md:px-10">
        <div className="flex items-end justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            Scroll · The Difference
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
            01 / 04
          </span>
        </div>
      </div>
    </section>
  );
}
