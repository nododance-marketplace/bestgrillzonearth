import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Difference } from "@/components/sections/Difference";
import { PricingStatement } from "@/components/sections/PricingStatement";
import { ComingSoon } from "@/components/sections/ComingSoon";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Difference />
        <PricingStatement />
        <ComingSoon />
      </main>
      <Footer />
    </>
  );
}
