"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../CTAButton";

export function PricingStatement() {
  return (
    <section
      className="relative mx-auto w-full max-w-shell px-6 py-32 md:px-10 md:py-40"
      aria-labelledby="pricing-heading"
    >
      <div className="relative isolate overflow-hidden rounded-bezel bg-white/[0.025] p-1.5 ring-1 ring-border-subtle shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
        <div className="relative overflow-hidden rounded-bezel-inner bg-bg-secondary px-6 py-24 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:px-16 md:py-32">
          {/* Ambient orbs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-accent-ice/8 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-accent-silver/6 blur-3xl"
          />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-primary/60 px-3 py-1 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
              The Investment
            </span>
          </motion.span>

          <motion.h2
            id="pricing-heading"
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto mt-8 font-display text-[16vw] uppercase leading-[0.85] tracking-tight md:text-[10vw] lg:text-[8.5vw]"
          >
            <span className="block text-text-primary">Starting at</span>
            <span className="diamond-text block">$750</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto mt-8 max-w-2xl font-mono text-xs uppercase leading-relaxed tracking-widest text-text-secondary md:text-sm"
          >
            Lab-Grown Diamonds · Full 10-on-10 Sets · Custom Rimless Perm Cuts
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-12 flex justify-center"
          >
            <CTAButton href="/shop" variant="primary">
              Explore Pricing
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
