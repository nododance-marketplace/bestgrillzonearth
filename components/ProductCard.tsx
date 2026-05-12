"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Diamond } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { Bezel } from "./Bezel";
import type { Product } from "@/data/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="group/card list-none"
    >
      <Link href={`/shop/${product.slug}`} className="block">
        <Bezel innerClassName="bg-bg-secondary">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-bg-tertiary">
            {/* TODO: USER — Replace with actual product image at /public/products/[slug].png */}
            <Image
              src={product.image}
              alt={`${product.name} — ${product.descriptor}`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover transition-transform duration-700 ease-out-quint group-hover/card:scale-[1.04]"
            />
            {/* Placeholder visual when image is missing — radial vignette + diamond glyph */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_rgba(232,232,232,0.06),_transparent_70%)]"
            >
              <div className="flex flex-col items-center gap-3 text-text-muted">
                <Diamond size={42} weight="duotone" className="text-accent-silver/40" />
                <span className="font-mono text-[10px] uppercase tracking-widest">
                  Add product image
                </span>
              </div>
            </div>

            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-primary/70 px-3 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                {product.category}
              </span>
            </div>

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 opacity-0 transition-opacity duration-500 ease-out-quint group-hover/card:opacity-100">
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-secondary">
                View Details
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-silver text-bg-primary transition-transform duration-500 ease-out-quint group-hover/card:translate-x-1 group-hover/card:-translate-y-[2px]">
                <ArrowUpRight size={16} weight="bold" />
              </span>
            </div>
          </div>

          <div className="flex items-baseline justify-between gap-6 px-7 pb-7 pt-6">
            <div className="min-w-0">
              <h3 className="font-display text-2xl uppercase leading-none tracking-wider text-text-primary md:text-3xl">
                {product.name}
              </h3>
              <p className="mt-2 line-clamp-1 text-xs uppercase tracking-widest text-text-muted">
                {product.descriptor}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                From
              </p>
              <p className="diamond-text font-mono text-xl font-semibold tracking-wider">
                ${product.priceFrom.toLocaleString()}
              </p>
            </div>
          </div>
        </Bezel>
      </Link>
    </motion.li>
  );
}
