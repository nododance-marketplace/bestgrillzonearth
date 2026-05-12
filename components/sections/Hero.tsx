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

      <div className="mx-auto grid w-full max-w-shell grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-10">
        {/* Left — wordmark + CTAs (asymmetric split, taste-skill compliant) */}
        <div className="flex flex-col items-start gap-8 md:col-span-7 md:pt-12">
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

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            <span className="sr-only">Best Grillz On Earth</span>
            <Image
              src="/wordmark-stacked.png"
              alt=""
              width={1100}
              height={1100}
              priority
              aria-hidden="true"
              className="h-auto w-full max-w-[640px] select-none drop-shadow-[0_30px_60px_rgba(232,232,232,0.18)]"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl text-base leading-relaxed text-text-secondary md:text-lg"
          >
            The American Standard. Iced Out. Built for Earth. Custom-cut grillz set
            in lab-grown diamonds — no rims, no shortcuts, no half-sets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Right — Logo + Video loop frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateX: 18 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: "1200px" }}
          className="relative md:col-span-5"
        >
          {/* Logo "orbit" — Earth + grillz logo at center, breathing pulse rings */}
          <div className="relative mx-auto aspect-square w-full max-w-[480px]">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,_rgba(255,255,255,0.05),_rgba(184,216,232,0.05),_rgba(255,255,255,0.05))] blur-2xl"
            />
            <span
              aria-hidden
              className="absolute inset-6 rounded-full ring-1 ring-border-strong animate-pulse-ring"
              style={{ animationDelay: "0s" }}
            />
            <span
              aria-hidden
              className="absolute inset-10 rounded-full ring-1 ring-border-subtle animate-pulse-ring"
              style={{ animationDelay: "0.6s" }}
            />

            <div className="relative h-full w-full rounded-full bg-white/[0.025] p-2 ring-1 ring-border-strong shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-bg-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                {/* Globe video loop — black background knocked out via mix-blend-mode: screen.
                    The page bg is near-black, so the black pixels around the globe
                    render as transparent and only the globe disc remains. */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover [mix-blend-mode:screen]"
                >
                  <source src="/globe-loop.mp4" type="video/mp4" />
                </video>
                {/* Soft inner highlight that survives the screen blend */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_2px_18px_rgba(255,255,255,0.06),inset_0_-40px_120px_rgba(0,0,0,0.5)]"
                />
                {/* Iconographic fallback (only visible if the video fails to load) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
                >
                  <Globe size={120} weight="duotone" className="text-accent-silver/20" />
                </div>
              </div>
            </div>
          </div>

        </motion.div>
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
