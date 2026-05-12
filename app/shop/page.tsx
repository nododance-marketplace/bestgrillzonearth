import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ShopExperience } from "@/components/ShopExperience";

export const metadata: Metadata = {
  title: "The Collection — Best Grillz On Earth",
  description:
    "Browse the Best Grillz On Earth collection. Custom cut, lab-grown diamond grillz starting at $750.",
};

export default function ShopPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 md:pt-40">
        {/* Hero strip */}
        <section
          className="mx-auto w-full max-w-shell px-6 pb-16 md:px-10 md:pb-24"
          aria-labelledby="shop-heading"
        >
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-max items-center gap-2 rounded-full border border-border-strong bg-bg-secondary/60 px-3 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-silver" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                The Collection
              </span>
            </span>
            <h1
              id="shop-heading"
              className="font-display text-[14vw] uppercase leading-[0.85] tracking-tight md:text-[9vw] lg:text-[7.5vw]"
            >
              <span className="diamond-text">The Collection.</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              Each piece custom-cut. Lab-grown diamonds. Rimless permanent cuts.
              Designed in-house with precision tooling — starting at $750.
            </p>
          </div>
        </section>

        <ShopExperience />
      </main>
      <Footer />
    </>
  );
}
