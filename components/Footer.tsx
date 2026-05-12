import Link from "next/link";
import { InstagramLogo, TiktokLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";

const socials = [
  { href: "#", label: "Instagram", Icon: InstagramLogo },
  { href: "#", label: "TikTok", Icon: TiktokLogo },
  { href: "#", label: "X (Twitter)", Icon: XLogo },
];

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#difference", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-32 border-t border-border-subtle bg-bg-primary"
    >
      <div className="mx-auto w-full max-w-shell px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo size={48} withWordmark />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-text-secondary">
              American-born. World-class. Premium custom grillz designed in-house with
              precision 3D tooling. Lab-grown diamonds. Rimless permanent cuts. No
              shortcuts.
            </p>
            <p className="mt-6 font-display text-2xl uppercase tracking-wider">
              <span className="diamond-text">American-Born.</span>
              <br />
              <span className="text-text-primary">World-Class.</span>
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="md:col-span-3 md:col-start-7"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
              Navigate
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm uppercase tracking-wider text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
              Follow
            </p>
            <ul className="mt-5 flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-border-strong transition-colors hover:bg-white/[0.05]"
                  >
                    <Icon size={18} weight="regular" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-widest text-text-muted">
              Reach Us
            </p>
            <a
              href="mailto:hello@bestgrillz.com"
              className="mt-3 inline-block text-sm text-text-secondary hover:text-text-primary"
            >
              hello@bestgrillz.com
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border-subtle pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            © {new Date().getFullYear()} Best Grillz On Earth. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
            Lab-Grown Diamonds · Custom Rimless Cuts · Starting at $750
          </p>
        </div>
      </div>
    </footer>
  );
}
