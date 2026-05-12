import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

/**
 * Logo: emblem (Earth + grillz, transparent background) on dark surfaces only.
 * Source asset: /public/logo.png (the "Emblem transparent BG" PNG).
 */
export function Logo({
  size = 44,
  withWordmark = false,
  className,
}: {
  size?: number;
  withWordmark?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Best Grillz On Earth — Home"
      className={clsx("group inline-flex items-center gap-3", className)}
    >
      <span
        className="relative inline-flex shrink-0 items-center justify-center"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt="Best Grillz On Earth — emblem"
          width={size * 2}
          height={size * 2}
          priority
          className="h-full w-full object-contain"
        />
      </span>
      {withWordmark && (
        <Image
          src="/wordmark-linear.png"
          alt="Best Grillz On Earth"
          width={520}
          height={88}
          priority
          className="h-auto w-auto max-h-7 select-none"
        />
      )}
    </Link>
  );
}
