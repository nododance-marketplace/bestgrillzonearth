import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best Grillz On Earth — The American Standard. Iced Out.",
  description:
    "Premium custom grillz. Full 10-on-10 sets, rimless permanent cuts, lab-grown diamonds. American-born, world-class. Starting at $750.",
  keywords: [
    "grillz",
    "custom grillz",
    "diamond grillz",
    "lab grown diamond grillz",
    "permanent grillz",
    "rimless grillz",
    "iced out grillz",
  ],
  openGraph: {
    title: "Best Grillz On Earth — The Standard.",
    description:
      "American-born, world-class custom grillz. Full 10-on-10 sets with lab-grown diamonds. Starting at $750.",
    type: "website",
  },
  metadataBase: new URL("https://bestgrillz.example"),
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-[100dvh] bg-bg-primary text-text-primary antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
