import Link from "next/link";
import {LogoMark} from "@components/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-ground px-6 text-center text-fg-soft">
      <LogoMark size={48} className="text-fg-soft" />
      <h1 className="font-display text-5xl font-extrabold tracking-[-0.04em] text-[#3A4152]">
        CUT.
      </h1>
      <p className="max-w-sm text-muted-strong">
        This page isn&apos;t in the catalogue. The anime may have been removed
        from Kitsu, or the link is wrong.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-[44px] items-center rounded-full bg-amber px-6 font-semibold text-amber-ink"
      >
        Back to Nimelist
      </Link>
    </main>
  );
}
