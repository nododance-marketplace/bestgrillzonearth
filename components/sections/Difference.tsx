"use client";

import { motion } from "framer-motion";
import {
  Crown,
  Scissors,
  CubeFocus,
} from "@phosphor-icons/react";
import { Bezel } from "../Bezel";

const features = [
  {
    Icon: Crown,
    label: "01 — Perfection",
    title: "10-on-10. No Half-Measures.",
    body:
      "Full top. Full bottom. Every tooth iced out. Nobody walks out of here with a single fang or a half set — that's not the standard we built.",
  },
  {
    Icon: Scissors,
    label: "02 — Cut",
    title: "Rimless Permanent Cuts.",
    body:
      "No bulky metal borders. No clunky frames. Clean, sculpted, custom-fit pieces that read like they grew on your teeth — not bolted onto them.",
  },
  {
    Icon: CubeFocus,
    label: "03 — Precision",
    title: "3D-Designed In-House.",
    body:
      "Our in-house 3D team uses precision tooling traditional cast-iron jewelers can't touch. Cleaner cuts. Tighter fits. Higher grade — every set.",
  },
];

export function Difference() {
  return (
    <section
      id="difference"
      className="relative mx-auto w-full max-w-shell px-6 py-32 md:px-10 md:py-40"
      aria-labelledby="difference-heading"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5 md:sticky md:top-32 md:self-start">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-3 py-1 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
              The Difference
            </span>
          </motion.span>

          <motion.h2
            id="difference-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl"
          >
            Why we&rsquo;re <br />
            <span className="diamond-text">The Best</span>.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-base leading-relaxed text-text-secondary"
          >
            Three things separate Best Grillz On Earth from the jeweler down the
            street. We don&rsquo;t cut corners, we don&rsquo;t cut singles, and we
            don&rsquo;t cut with the tools they use.
          </motion.p>
        </div>

        <ul className="flex flex-col gap-6 md:col-span-7">
          {features.map(({ Icon, label, title, body }, i) => (
            <motion.li
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 100, damping: 20 }}
              className={i === 1 ? "md:translate-x-12" : i === 2 ? "md:translate-x-6" : ""}
            >
              <Bezel>
                <div className="flex flex-col gap-6 p-8 md:flex-row md:items-start md:gap-8 md:p-10">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-bg-primary ring-1 ring-border-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon size={26} weight="duotone" className="text-accent-silver" />
                  </div>
                  <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      {label}
                    </p>
                    <h3 className="mt-3 font-display text-2xl uppercase leading-tight tracking-wider md:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">
                      {body}
                    </p>
                  </div>
                </div>
              </Bezel>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
