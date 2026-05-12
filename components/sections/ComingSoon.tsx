"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, CubeTransparent, Sparkle, Bell, Lightning } from "@phosphor-icons/react";
import { Bezel } from "../Bezel";
import { EmailCaptureModal } from "../EmailCaptureModal";

type Teaser = {
  Icon: typeof Camera;
  label: string;
  title: string;
  body: string;
  poweredBy?: string[];
};

const teasers: Teaser[] = [
  {
    Icon: Camera,
    label: "AR Try-On",
    title: "Point your camera. See your grillz.",
    body:
      "Before they're even cast. Live AR preview right from your phone — every angle, every smile.",
  },
  {
    Icon: CubeTransparent,
    label: "3D Configurator",
    title: "Design your set tooth-by-tooth.",
    body:
      "Real-time. In your browser. Pick the stones, the cut, the layout — and watch it render live. Built on the same engines powering the highest-end visualization studios on the planet.",
    poweredBy: ["Unreal Engine", "Three.js", "WebGL 2.0"],
  },
  {
    Icon: Sparkle,
    label: "AI Grill Preview",
    title: "Upload your photo. Place your grillz.",
    body:
      "Our AI places any set on your smile in seconds. Instant preview, infinite possibilities.",
  },
];

export function ComingSoon() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      className="relative mx-auto w-full max-w-shell px-6 py-32 md:px-10 md:py-40"
      aria-labelledby="coming-heading"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-3 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-ice" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
              Innovation Roadmap
            </span>
          </span>
          <h2
            id="coming-heading"
            className="mt-6 font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl"
          >
            <span className="text-text-primary">What&rsquo;s</span> <br />
            <span className="diamond-text">coming next.</span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-text-secondary md:text-right">
          We&rsquo;re building the tools that put the customer in the studio. Drop
          your email on any card — we&rsquo;ll send a note the second it goes live.
        </p>
      </div>

      <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
        {teasers.map(({ Icon, label, title, body, poweredBy }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
            className={
              i === 1 ? "md:translate-y-8" : i === 2 ? "md:translate-y-4" : ""
            }
          >
            <Bezel className="h-full">
              <div className="flex h-full flex-col gap-8 p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bg-primary ring-1 ring-border-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <Icon size={22} weight="duotone" className="text-accent-silver" />
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-primary/60 px-3 py-1 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-ice" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                      Coming Soon
                    </span>
                  </span>
                </div>

                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                    {label}
                  </p>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight tracking-wider md:text-3xl">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    {body}
                  </p>

                  {poweredBy && (
                    <div className="mt-6 border-t border-border-subtle pt-5">
                      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
                        <Lightning size={12} weight="fill" className="text-accent-ice" />
                        Built on
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {poweredBy.map((tech) => (
                          <li key={tech}>
                            <span className="inline-flex items-center rounded-full border border-border-strong bg-bg-primary/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-text-primary">
                              {tech}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActive(label)}
                  className="group/btn inline-flex items-center justify-between gap-3 rounded-full border border-border-strong bg-bg-primary/60 px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-text-secondary transition-colors duration-300 hover:bg-bg-primary hover:text-text-primary"
                >
                  <span className="inline-flex items-center gap-2">
                    <Bell size={12} weight="duotone" />
                    Notify Me
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.05] text-text-secondary transition-all duration-300 group-hover/btn:bg-accent-silver group-hover/btn:text-bg-primary">
                    →
                  </span>
                </button>
              </div>
            </Bezel>
          </motion.li>
        ))}
      </ul>

      <EmailCaptureModal
        open={active !== null}
        onClose={() => setActive(null)}
        featureLabel={active ?? ""}
      />
    </section>
  );
}
