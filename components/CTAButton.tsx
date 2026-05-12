"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group/cta relative inline-flex select-none items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-medium tracking-wider transition-all duration-500 ease-out-quint will-change-transform active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-chrome text-bg-primary shadow-[0_18px_40px_-18px_rgba(232,232,232,0.4)] ring-1 ring-white/30 hover:shadow-[0_22px_44px_-16px_rgba(232,232,232,0.55)]",
  secondary:
    "bg-bg-secondary/60 text-text-primary ring-1 ring-border-strong backdrop-blur-md hover:bg-bg-secondary hover:ring-white/30",
  ghost:
    "bg-transparent text-text-primary ring-1 ring-border-subtle hover:ring-border-strong hover:bg-white/[0.03]",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
};

type AnchorProps = CommonProps & {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
};

type ButtonProps = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function CTAButton(props: AnchorProps | ButtonProps) {
  const {
    variant = "primary",
    className,
    children,
    withArrow = true,
  } = props;

  const inner = (
    <>
      <span className="relative z-10 whitespace-nowrap uppercase">{children}</span>
      {withArrow && (
        <motion.span
          aria-hidden="true"
          className={clsx(
            "relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full",
            variant === "primary"
              ? "bg-bg-primary/90 text-accent-silver"
              : "bg-white/10 text-text-primary group-hover/cta:bg-white/15"
          )}
          whileHover={{ x: 2, y: -1, scale: 1.06 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        >
          <ArrowUpRight size={16} weight="bold" />
        </motion.span>
      )}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={clsx(base, variants[variant], className)}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={clsx(base, variants[variant], "disabled:opacity-50", className)}
    >
      {inner}
    </button>
  );
}
