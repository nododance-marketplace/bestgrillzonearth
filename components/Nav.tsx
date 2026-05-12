"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBagOpen, List, X } from "@phosphor-icons/react";
import { clsx } from "clsx";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#difference", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <nav
        className={clsx(
          "flex w-full max-w-shell items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ease-out-quint md:px-4",
          scrolled
            ? "border-border-strong bg-bg-primary/70 backdrop-blur-xl"
            : "border-border-subtle bg-bg-primary/40 backdrop-blur-md"
        )}
        aria-label="Primary"
      >
        <div className="flex min-w-0 items-center gap-2 pl-1 md:gap-3">
          <Logo size={44} />
          <Link
            href="/"
            aria-label="Best Grillz On Earth — Home"
            className="inline-flex min-w-0 shrink"
          >
            <Image
              src="/wordmark-linear.png"
              alt="Best Grillz On Earth"
              width={1040}
              height={176}
              priority
              className="h-9 w-auto select-none sm:h-11 md:h-14 lg:h-16"
            />
          </Link>
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest text-text-secondary transition-colors duration-300 hover:bg-white/[0.05] hover:text-text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <Link
            href="/shop"
            aria-label="Cart — 0 items"
            className="group relative inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-border-strong transition-colors duration-300 hover:bg-white/[0.06] md:h-10 md:w-10"
          >
            <ShoppingBagOpen size={18} weight="regular" />
            <span className="absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent-silver px-1 font-mono text-[10px] font-semibold text-bg-primary">
              0
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-border-strong transition-colors duration-300 hover:bg-white/[0.06] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile expanded menu */}
      <div
        id="mobile-menu"
        className={clsx(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg-primary/95 backdrop-blur-2xl transition-opacity duration-500 ease-out-quint md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <ul className="flex flex-col items-center gap-2">
          {links.map((link, i) => (
            <li
              key={link.href}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={clsx(
                "transition-all duration-700 ease-out-quint",
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-5xl uppercase tracking-wider text-text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
