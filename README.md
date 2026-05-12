# Best Grillz On Earth

A premium two-page Next.js 14 + TypeScript + Tailwind ecommerce site for **Best Grillz On Earth** — an American luxury grillz brand.

> The Standard. American-Born. World-Class.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Tech stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + custom CSS variables for the brand palette
- **Framer Motion** for entrance, scroll, hover, and layout animations
- **Phosphor Icons** (no emojis — taste-skill compliant)
- **next/font** for self-hosted Anton, Inter, JetBrains Mono

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing — Hero, Marquee, Difference, Pricing, Coming Soon |
| `/shop` | The Collection — filter bar, sort, large editorial product cards |
| `/shop/[slug]` | Product detail — gallery, description, highlights, related items |

## Where to drop your own content

Every spot needing real assets has a `TODO: USER — …` comment. The big three:

### 1. Logo

Replace **`/public/logo.png`** with the brand mark (Earth + diamond grillz).

> The current file is a 1×1 transparent placeholder so `next/image` doesn't error. Drop your real PNG over it.
> The logo always sits on a dark background — never on white.

### 2. Hero video loop

Drop your video file at **`/public/hero-loop.mp4`** (recommended ~10s loop, muted, ~1080p, < 4MB).

The hero already has a `<video autoplay loop muted playsinline>` element wired up. No code change needed.

### 3. Product images

Drop your product photography into **`/public/products/`**:

```
public/products/the-standard.png
public/products/the-championship.png
public/products/the-mogul.png
public/products/the-legacy.png
public/products/the-icon.png
public/products/the-empire.png
```

Each filename matches a product slug in [`data/products.ts`](data/products.ts) — that's where you edit names, prices, descriptors, and the long-form copy.

> Cards are tuned for a **4:5 portrait aspect ratio**. Anything from 4:5 to 1:1 will look correct.

### 4. Email capture wiring

The "Notify Me" modal currently validates the email client-side and shows a thank-you state. To wire it to a real backend (Klaviyo, ConvertKit, Mailchimp, your own API), edit the `submit` function in [`components/EmailCaptureModal.tsx`](components/EmailCaptureModal.tsx).

### 5. Order CTA

Each product detail page links **`Start Your Order`** to `mailto:hello@bestgrillz.com`. Swap that for your real contact form, Shopify checkout, or Instagram DM link in [`app/shop/[slug]/page.tsx`](app/shop/[slug]/page.tsx).

## Brand system

Defined as CSS variables in [`app/globals.css`](app/globals.css) and re-exported as Tailwind tokens in [`tailwind.config.ts`](tailwind.config.ts):

| Token | Value |
| --- | --- |
| `bg-bg-primary` | `#0A0A0A` — main canvas |
| `bg-bg-secondary` | `#141414` — raised surface |
| `bg-bg-tertiary` | `#1C1C1C` — cards |
| `text-text-primary` | `#FFFFFF` |
| `text-text-secondary` | `#B8B8B8` |
| `text-text-muted` | `#6B6B6B` |
| `text-accent-silver` | `#E8E8E8` |
| `text-accent-ice` | `#B8D8E8` |
| `font-display` | Anton |
| `font-sans` | Inter |
| `font-mono` | JetBrains Mono |

Diamond gradient + sweeping shimmer is on the `.diamond-text` utility class — apply it to any heading or price tag to get the brand sheen.

## Skill compliance

This build was authored against three reference skills:

- [Gorgeous Websites](https://github.com/ItsssssJack/Gorgeous-websites.-)
- [taste-skill](https://github.com/Leonxlnx/taste-skill) — anti-slop frontend rules
- [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — design-system intelligence

Key rules applied: **double-bezel** nested card architecture, asymmetric hero, `min-h-[100dvh]` (never `h-screen`), custom cubic-bezier transitions, GPU-only `transform`/`opacity` animations, Phosphor icons (no emojis), no pure black (`#0A0A0A` instead of `#000`), and full mobile collapse to a single column below 768px.

## Final checklist

- [x] Logo displays on dark backgrounds only
- [x] Diamond shimmer sweeps every ~6s on key headings
- [x] Hero video placeholder wired up
- [x] Six product cards render with placeholder data
- [x] Filter bar + sort dropdown work on the shop page
- [x] Product detail pages generate statically for all six slugs
- [x] No mention of 3D scanning or SLM printing
- [x] "Starting at $750" with lab-grown diamond messaging
- [x] AR, 3D configurator, AI preview cards clearly marked "Coming Soon"
- [x] Responsive at 375 / 768 / 1024 / 1440
- [x] Reduced-motion respected
- [x] Keyboard focus ring visible

## File structure

```
app/
  layout.tsx
  globals.css
  page.tsx                 — Landing
  not-found.tsx
  shop/
    page.tsx               — The Collection
    [slug]/page.tsx        — Product detail
components/
  Nav.tsx
  Footer.tsx
  Logo.tsx
  Bezel.tsx                — Double-bezel container
  CTAButton.tsx
  ShimmerText.tsx
  ProductCard.tsx
  ShopExperience.tsx       — Client-side filter + sort + grid
  EmailCaptureModal.tsx
  sections/
    Hero.tsx
    Marquee.tsx
    Difference.tsx
    PricingStatement.tsx
    ComingSoon.tsx
data/
  products.ts              — Edit names, prices, descriptors here
public/
  logo.png                 — Replace with brand mark
  products/*.png           — Replace with product photography
  hero-loop.mp4            — User-supplied (optional; component handles absence)
```
