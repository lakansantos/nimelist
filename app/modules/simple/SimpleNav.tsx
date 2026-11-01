"use client";

import cx from "classnames";
import Link from "next/link";
import {ReactNode} from "react";
import {LogoMark} from "@components/Logo";
import ModeToggle, {usePublicPath} from "@components/ModeToggle";
import {BookmarkIcon, GridIcon, HomeIcon, SearchIcon} from "@components/icons";
import {ANIME_TYPES} from "@lib/anime";
import {useSaved} from "@lib/saved";

type NavItem = {
  href: string;
  label: string;
  icon: (active: boolean) => ReactNode;
};

const NAV: NavItem[] = [
  {href: "/", label: "Home", icon: () => <HomeIcon />},
  {href: "/browse", label: "Browse", icon: () => <GridIcon />},
  {href: "/search", label: "Search", icon: () => <SearchIcon />},
  {
    href: "/saved",
    label: "Saved",
    icon: (active) => <BookmarkIcon filled={active} />,
  },
];

const useSavedCount = () => String(useSaved().items.length).padStart(2, "0");

export const SimpleSidebar = () => {
  const path = usePublicPath();
  const savedCount = useSavedCount();

  return (
    <aside className="hidden w-[240px] shrink-0 flex-col gap-6 border-r border-line bg-rail px-5 py-6 md:flex">
      <div className="sticky top-6 flex flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-[22px] font-extrabold tracking-[-0.03em] text-fg-soft"
        >
          <LogoMark className="text-fg-soft" />
          nimelist
        </Link>
        <ModeToggle current="simple" look="simple" />
        <nav aria-label="Main">
          <ul className="flex flex-col gap-1">
            {NAV.map(({href, label, icon}) => {
              const active = path === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "flex min-h-[44px] items-center gap-3 rounded-[10px] px-3",
                      active
                        ? "bg-raised font-medium text-white"
                        : "text-muted-strong hover:text-fg"
                    )}
                  >
                    {icon(active)}
                    {label}
                    {href === "/saved" && (
                      <span className="ml-auto font-mono text-xs text-amber">
                        {savedCount}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex flex-col gap-2.5">
          <span className="text-xs uppercase tracking-[0.1em] text-muted">
            Browse by type
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ANIME_TYPES.map((type) => (
              <Link
                key={type}
                href={`/browse?type=${type}`}
                className="inline-flex min-h-[36px] items-center rounded-lg border border-line-strong px-3 text-[13px] text-muted-strong hover:border-muted hover:text-fg"
              >
                {type}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export const SimpleTopBar = () => (
  <div className="flex h-16 items-center justify-between px-4 md:hidden">
    <Link
      href="/"
      className="flex items-center gap-2 font-display text-xl font-extrabold tracking-[-0.03em] text-fg-soft"
    >
      <LogoMark size={26} className="text-fg-soft" />
      nimelist
    </Link>
    <ModeToggle current="simple" look="simple-compact" />
  </div>
);

export const SimpleTabBar = () => {
  const path = usePublicPath();
  const savedCount = useSavedCount();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-rail px-2 pb-[max(18px,env(safe-area-inset-bottom))] pt-1.5 md:hidden"
    >
      {NAV.map(({href, label, icon}) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cx(
              "flex min-h-[52px] flex-col items-center justify-center gap-1 text-[11px]",
              active ? "font-semibold text-amber" : "font-medium text-muted"
            )}
          >
            {icon(active)}
            {href === "/saved" ? `${label} · ${savedCount}` : label}
          </Link>
        );
      })}
    </nav>
  );
};
