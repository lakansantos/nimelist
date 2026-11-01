import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";

/*
 * Self-hosted (Latin subset, variable weight) instead of next/font/google:
 * next 13.5's Google loader crashes when Google Fonts answers with a font URL
 * that has no file extension, which happened on Vercel's build machines.
 * Files come from Google Fonts (SIL Open Font License).
 */
const display = localFont({
  src: "./fonts/bricolage.woff2",
  weight: "200 800",
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: "./fonts/inter.woff2",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/jetbrains-mono.woff2",
  weight: "100 800",
  variable: "--font-mono",
  display: "swap",
});

/*
 * Noto Sans JP is only used for the decorative vertical Japanese titles. It is
 * loaded by the browser (Google splits it into small unicode-range files, so
 * only the glyphs on screen download) rather than at build time.
 */
const JP_FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&display=swap";

export const metadata: Metadata = {
  title: "Nimelist",
  description:
    "An anime website that tracks latest, trending and recommended anime for you to enjoy.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={JP_FONT_CSS} />
      </head>
      <body className="bg-ink font-sans text-fg antialiased">{children}</body>
    </html>
  );
}
