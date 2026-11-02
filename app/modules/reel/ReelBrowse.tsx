"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import SaveButton from "@components/SaveButton";
import {AnimeItem, episodesLabel} from "@lib/anime";
import {
  BROWSE_TYPES,
  BrowseParams,
  BrowseType,
  browseHref,
  pluralType,
} from "@lib/browse";
import {reveal} from "./ReelChrome";

type Props = {
  params: BrowseParams;
  items: AnimeItem[];
  ranks: number[];
  counts: Record<BrowseType, number>;
  listLabel: string;
};

const ReelBrowse = ({params, items, ranks, counts, listLabel}: Props) => {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <nav
        aria-label="List"
        className="flex flex-col items-start gap-0.5 md:flex-row md:flex-wrap md:items-end md:gap-x-9 md:gap-y-3"
      >
        {(["trending", "top"] as const).map((list) => {
          const active = params.list === list;
          return (
            <Link
              key={list}
              href={browseHref(params, {list, type: "All"})}
              aria-current={active ? "page" : undefined}
              className={cx(
                "font-display text-[58px] font-extrabold leading-[0.95] tracking-[-0.05em] md:text-[clamp(48px,7vw,108px)] md:leading-[0.9]",
                active
                  ? "text-fg"
                  : "text-transparent [-webkit-text-stroke:1.5px_#3A4152] hover:[-webkit-text-stroke:1.5px_#8C93A3] md:[-webkit-text-stroke:2px_#3A4152]"
              )}
            >
              {list === "top" ? "Top rated" : "Trending"}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 md:border-b md:border-[#1C2130] md:pb-5">
        <nav
          aria-label="Filter by type"
          className="no-scrollbar -mx-5 flex gap-1.5 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:gap-2 md:px-0"
        >
          {BROWSE_TYPES.filter((t) => t !== "Music").map((type) => {
            const active = params.type === type;
            return (
              <Link
                key={type}
                href={browseHref(params, {type})}
                aria-current={active ? "page" : undefined}
                className={cx(
                  "inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold md:min-h-[44px] md:gap-2 md:px-4 md:text-base",
                  active
                    ? "border-fg bg-fg text-ink"
                    : "border-[#2A3040] text-[#B4BAC7] hover:text-fg"
                )}
              >
                {type}
                <span className="font-mono text-[11px] opacity-70 md:text-xs">
                  {String(counts[type]).padStart(2, "0")}
                </span>
              </Link>
            );
          })}
        </nav>
        <span
          aria-live="polite"
          className="font-mono text-[11px] tracking-[0.1em] text-[#D5D9E2] md:text-[13px]"
        >
          {String(items.length).padStart(2, "0")}{" "}
          {items.length === 1 ? "TITLE" : "TITLES"} · {listLabel.toUpperCase()}{" "}
          · {params.type.toUpperCase()}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-3.5 py-6 md:gap-4 md:py-10">
          <span className="font-display text-[44px] font-extrabold leading-[0.95] tracking-[-0.05em] text-[#2A3040] md:text-7xl">
            No {pluralType(params.type)} in this list.
          </span>
          <p className="text-[15px] text-[#D5D9E2] md:text-lg">
            Kitsu has none in {listLabel} right now. Try another type or switch
            lists.
          </p>
          <Link
            href={browseHref(params, {type: "All"})}
            className="inline-flex min-h-[48px] items-center rounded-full bg-amber px-[22px] font-semibold text-amber-ink"
          >
            Show all types
          </Link>
        </div>
      ) : (
        <ol
          key={`${params.list}-${params.type}`}
          className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:gap-x-6 md:gap-y-10"
        >
          {items.map((item, i) => (
            <li key={item.id} {...reveal(i, "relative")}>
              <Link
                href={`/${item.id}`}
                className="group flex flex-col gap-2 md:gap-2.5"
              >
                <span className="relative block">
                  {item.poster ? (
                    <Image
                      src={item.poster.small}
                      alt=""
                      width={284}
                      height={402}
                      className="aspect-[2/3] w-full rounded-[10px] bg-[#1B2130] object-cover md:rounded-xl"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="block aspect-[2/3] w-full rounded-xl bg-[#1B2130]"
                    />
                  )}
                  <span className="absolute bottom-1 left-2 font-display text-[40px] font-extrabold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_#F5B544] md:bottom-1.5 md:left-2.5 md:text-[56px] md:[-webkit-text-stroke:2px_#F5B544]">
                    {String(ranks[i]).padStart(2, "0")}
                  </span>
                </span>
                <span className="text-sm font-semibold leading-snug group-hover:text-amber md:text-[15px]">
                  {item.title}
                </span>
                <span className="font-mono text-[11px] uppercase text-[#9AA1B2] md:text-xs">
                  {[item.year, item.type, episodesLabel(item)]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </Link>
              <SaveButton
                item={item}
                variant="reel-icon"
                className="absolute right-1.5 top-1.5 md:right-2.5 md:top-2.5"
              />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default ReelBrowse;
