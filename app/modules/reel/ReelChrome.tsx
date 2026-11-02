"use client";

import cx from "classnames";
import Link from "next/link";
import {CSSProperties, ReactNode} from "react";
import Credits from "@components/Credits";
import {LogoMark} from "@components/Logo";
import ModeToggle, {usePublicPath} from "@components/ModeToggle";
import {BookmarkIcon, FilmIcon, GridIcon, SearchIcon} from "@components/icons";
import {switchModeHref} from "@lib/mode";
import {useSaved} from "@lib/saved";

const NAV = [
  {href: "/", label: "Reel", icon: <FilmIcon size={20} />},
  {href: "/browse", label: "Browse", icon: <GridIcon size={20} />},
  {href: "/search", label: "Search", icon: <SearchIcon size={20} />},
  {href: "/saved", label: "Saved", icon: <BookmarkIcon size={20} />},
];

/**
 * Props for item i of a Reel "pop in" list: a CSS animation (reel-pop-* in
 * globals.css) staggered 125 ms per item, skipped under reduced motion. Put a
 * `key` on the list to replay it when its contents change.
 */
export const reveal = (i: number, className = "", axis: "y" | "x" = "y") => ({
  className: cx(axis === "y" ? "reel-pop-y" : "reel-pop-x", className),
  style: {"--reel-i": Math.min(i, 24)} as CSSProperties,
});

const ReelHeader = () => {
  const path = usePublicPath();
  const {items} = useSaved();
  return (
    <header className="hidden flex-wrap items-center justify-between gap-4 border-b border-[#1C2130] px-[clamp(20px,5vw,72px)] py-5 md:flex">
      <Link
        href="/"
        className="flex min-h-[44px] items-center gap-2.5 font-display text-[22px] font-extrabold tracking-[-0.03em] text-fg"
      >
        <LogoMark size={30} className="text-fg" />
        nimelist
      </Link>
      <nav aria-label="Main" className="flex flex-wrap gap-1.5">
        {NAV.map(({href, label}) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cx(
                "inline-flex min-h-[44px] items-center gap-2 rounded-full px-4",
                active
                  ? "bg-fg font-semibold text-ink"
                  : "font-medium text-[#B4BAC7] hover:text-fg"
              )}
            >
              {label}
              {href === "/saved" && (
                <span className="min-w-[20px] rounded-full bg-amber px-1.5 text-center text-xs text-amber-ink">
                  {String(items.length).padStart(2, "0")}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <ModeToggle
        current="reel"
        look="reel"
        className="!border-[#2A3040] !bg-transparent"
      />
    </header>
  );
};

const ReelMobileTop = ({label}: {label: string}) => {
  const path = usePublicPath();
  return (
    <div className="flex h-[72px] items-center justify-between px-5 md:hidden">
      <Link
        href="/"
        aria-label="Back to the reel"
        className="-ml-2.5 grid h-11 w-11 place-items-center text-[22px]"
      >
        ←
      </Link>
      <span className="font-mono text-[11px] tracking-[0.12em] text-[#D5D9E2]">
        {label}
      </span>
      <a
        href={switchModeHref("simple", path)}
        className="inline-flex min-h-[36px] items-center rounded-full border border-[#2A3040] px-3 text-xs font-semibold text-[#D5D9E2]"
      >
        Simple mode
      </a>
    </div>
  );
};

const ReelTabBar = () => {
  const path = usePublicPath();
  const {items} = useSaved();
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-3 bottom-[max(14px,env(safe-area-inset-bottom))] z-40 grid grid-cols-4 gap-1 rounded-[18px] bg-[rgba(20,23,31,0.94)] p-1.5 md:hidden"
    >
      {NAV.map(({href, label, icon}) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cx(
              "flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold",
              active ? "bg-fg text-ink" : "text-[#B4BAC7]"
            )}
          >
            {icon}
            {href === "/saved"
              ? `${label} · ${String(items.length).padStart(2, "0")}`
              : label}
          </Link>
        );
      })}
    </nav>
  );
};

/** Frame for the Reel's inner pages (search, details, saved, browse). */
export const ReelPage = ({
  mobileLabel,
  children,
  bleed = false,
}: {
  mobileLabel: string;
  children: ReactNode;
  /** Let the first child run edge to edge (details hero). */
  bleed?: boolean;
}) => (
  <div className="min-h-screen bg-ink text-fg">
    <ReelHeader />
    {!bleed && <ReelMobileTop label={mobileLabel} />}
    <main
      className={cx(
        "pb-32 md:pb-20",
        !bleed && "px-5 md:px-[clamp(20px,5vw,72px)] md:pt-12"
      )}
    >
      {children}
    </main>
    <footer className="border-t border-[#1C2130] px-5 py-6 pb-28 text-muted md:px-[clamp(20px,5vw,72px)] md:pb-6">
      <Credits />
    </footer>
    <ReelTabBar />
  </div>
);
