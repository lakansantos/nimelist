import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "Nimelist",
  description:
    "An anime website that tracks latest, trending and recommended anime for you to enjoy.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
