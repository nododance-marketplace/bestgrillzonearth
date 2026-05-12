import { Diamond } from "@phosphor-icons/react/dist/ssr";

const items = [
  "10-on-10 Standard",
  "Lab-Grown Diamonds",
  "Rimless Permanent Cuts",
  "3D-Designed In-House",
  "American-Born · World-Class",
];

export function Marquee() {
  // Duplicate items to create a seamless infinite scroll
  const loop = [...items, ...items, ...items];
  return (
    <section
      aria-hidden
      className="relative overflow-hidden border-y border-border-subtle bg-bg-secondary/40 py-6"
    >
      <div className="flex animate-[scroll_42s_linear_infinite] gap-12 whitespace-nowrap">
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
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
