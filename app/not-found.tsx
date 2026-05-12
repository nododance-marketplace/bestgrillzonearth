import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[100dvh] w-full max-w-shell flex-col items-center justify-center px-6 text-center md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
          404 — Not Found
        </span>
        <h1 className="mt-6 font-display text-7xl uppercase leading-[0.9] tracking-tight md:text-9xl">
          <span className="diamond-text">Off the map.</span>
        </h1>
        <p className="mt-6 max-w-md text-text-secondary">
          The page you&rsquo;re looking for doesn&rsquo;t exist — at least not on
          this Earth.
        </p>
        <div className="mt-10 flex gap-4">
          <CTAButton href="/">Back to Home</CTAButton>
          <CTAButton href="/shop" variant="ghost">
            Shop the Collection
          </CTAButton>
        </div>
        <Link
          href="/"
          className="mt-12 text-xs uppercase tracking-widest text-text-muted"
        >
          Best Grillz On Earth
        </Link>
      </main>
      <Footer />
    </>
  );
}
