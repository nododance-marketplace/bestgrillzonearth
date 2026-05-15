import { Diamond } from "@phosphor-icons/react/dist/ssr";

const items = [
  "10-on-10 Standard",
  "Lab-Grown Diamonds",
  "Rimless Permanent Cuts",
  "3D-Designed In-House",
  "American-Born · World-Class",
];

export function Marquee() {
  // Triple the items so a -33.333% translate lands on identical content and the loop reads seamless.
  const loop = [...items, ...items, ...items];
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-border-subtle bg-bg-secondary/40 py-6"
    >
      <div className="bg-marquee-track flex gap-12 whitespace-nowrap will-change-transform">
        {loop.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="font-display text-2xl uppercase tracking-widest text-text-secondary md:text-3xl">
              {item}
            </span>
            <Diamond size={14} weight="fill" className="text-accent-silver/60" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes bg-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-33.333%, 0, 0); }
        }
        .bg-marquee-track {
          animation: bg-marquee 14s linear infinite;
        }
        @media (max-width: 768px) {
          .bg-marquee-track { animation-duration: 9s; }
        }
      `}</style>
    </section>
  );
}
