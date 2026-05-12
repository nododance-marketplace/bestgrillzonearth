"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";
import { ProductCard } from "./ProductCard";
import { filterCategories, products, type ProductCategory } from "@/data/products";

type Filter = (typeof filterCategories)[number];
type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

const sorts: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
];

export function ShopExperience() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [sort, setSort] = useState<SortKey>("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const filtered = useMemo(() => {
    const base =
      filter === "ALL"
        ? products
        : products.filter((p) => p.category === (filter as ProductCategory));

    const sorted = [...base];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case "newest":
        sorted.reverse();
        break;
      case "featured":
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
        break;
    }
    return sorted;
  }, [filter, sort]);

  return (
    <>
      <div
        className="sticky top-[88px] z-30 border-b border-border-subtle bg-bg-primary/85 backdrop-blur-xl"
        role="region"
        aria-label="Product filters"
      >
        <div className="mx-auto flex w-full max-w-shell flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
          <div
            className="-mx-2 flex items-center gap-2 overflow-x-auto px-2 [scrollbar-width:none] md:flex-wrap md:overflow-visible"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <LayoutGroup>
              {filterCategories.map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    className="relative shrink-0 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-300"
                    aria-pressed={active}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-accent-silver"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span
                      className={
                        active
                          ? "relative z-10 text-bg-primary"
                          : "relative z-10 text-text-secondary hover:text-text-primary"
                      }
                    >
                      {cat}
                    </span>
                  </button>
                );
              })}
            </LayoutGroup>
          </div>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setSortOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-4 py-2 text-xs font-medium uppercase tracking-widest text-text-secondary backdrop-blur-md transition-colors hover:text-text-primary"
              aria-expanded={sortOpen}
              aria-haspopup="listbox"
            >
              <span className="font-mono text-[10px] tracking-widest text-text-muted">
                Sort
              </span>
              <span>{sorts.find((s) => s.value === sort)?.label}</span>
              <CaretDown
                size={12}
                weight="bold"
                className={`transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {sortOpen && (
                <motion.ul
                  role="listbox"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full z-40 mt-2 w-60 overflow-hidden rounded-2xl border border-border-strong bg-bg-secondary/95 p-1 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                >
                  {sorts.map((s) => {
                    const active = s.value === sort;
                    return (
                      <li key={s.value} role="option" aria-selected={active}>
                        <button
                          type="button"
                          onClick={() => {
                            setSort(s.value);
                            setSortOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs uppercase tracking-widest transition-colors ${
                            active
                              ? "bg-white/[0.08] text-text-primary"
                              : "text-text-secondary hover:bg-white/[0.05] hover:text-text-primary"
                          }`}
                        >
                          {s.label}
                          {active && (
                            <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <section
        className="mx-auto w-full max-w-shell px-6 py-16 md:px-10 md:py-24"
        aria-label="Product grid"
      >
        <div className="mb-10 flex items-baseline justify-between">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            Showing {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            Custom · Lab-Grown · Rimless
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-bezel border border-border-strong bg-bg-secondary/60 p-12 text-center">
            <p className="font-display text-3xl uppercase tracking-wider text-text-primary">
              Nothing here yet
            </p>
            <p className="mt-3 text-sm text-text-secondary">
              Try another filter — or reach out for a fully custom build.
            </p>
          </div>
        ) : (
          <LayoutGroup>
            <motion.ul
              layout
              className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((product, i) => (
                  <ProductCard key={product.slug} product={product} priority={i < 2} />
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        )}
      </section>
    </>
  );
}
