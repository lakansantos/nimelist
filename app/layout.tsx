import type {Metadata} from "next";
import {
  Bricolage_Grotesque,
  Inter,
  JetBrains_Mono,
  Noto_Sans_JP,
} from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-display",
  display: "swap",
  // next 13.5 ships no fallback metrics for this family.
  adjustFontFallback: false,
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Only used for the decorative vertical Japanese titles. next/font has no
// Japanese subset to preload, so the glyphs load on demand.
const jp = Noto_Sans_JP({
  weight: ["900"],
  variable: "--font-jp",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Nimelist",
  description:
    "An anime website that tracks latest, trending and recommended anime for you to enjoy.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${jp.variable}`}
    >
      <body className="bg-ink font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
