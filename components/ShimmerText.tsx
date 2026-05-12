import { clsx } from "clsx";

type Tag = "h1" | "h2" | "h3" | "h4" | "span" | "div";

export function ShimmerText({
  children,
  as: Tag = "span",
  className,
}: {
  children: React.ReactNode;
  as?: Tag;
  className?: string;
}) {
  return (
    <Tag className={clsx("diamond-text inline-block", className)}>{children}</Tag>
  );
}
