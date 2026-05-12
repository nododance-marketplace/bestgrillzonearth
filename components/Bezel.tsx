import { clsx } from "clsx";

/**
 * Double-bezel nested container.
 * Outer shell carries the hairline + outer radius; inner core carries the
 * content background, inset highlight, and mathematically smaller radius.
 *
 * Use this for premium cards (products, feature panels, pricing).
 */
export function Bezel({
  children,
  className,
  innerClassName,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "div" | "section" | "article" | "li";
}) {
  return (
    <Tag
      className={clsx(
        "relative rounded-bezel bg-white/[0.025] p-1.5 ring-1 ring-border-subtle",
        "shadow-[0_28px_60px_-30px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div
        className={clsx(
          "relative h-full overflow-hidden rounded-bezel-inner bg-bg-secondary",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
          innerClassName
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
