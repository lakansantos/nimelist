"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import {CloseIcon, SearchIcon} from "@components/icons";
import {AnimeItem} from "@lib/anime";
import {useKitsuSearch} from "@lib/useKitsuSearch";
import {reveal} from "./ReelChrome";

const SUGGESTIONS = ["Frieren", "Death Note", "One Piece", "Demon Slayer"];

const ReelSearch = ({
  initialQuery,
  popular,
}: {
  initialQuery: string;
  popular: AnimeItem[];
}) => {
  const {query, setQuery, results, loading, error, hasQuery} =
    useKitsuSearch(initialQuery);
  const list = hasQuery ? results : popular;
  const revealKey = `${hasQuery}-${list.map((a) => a.id).join(",")}`;
  const count = String(results.length).padStart(2, "0");

  let label = "POPULAR RIGHT NOW";
  if (hasQuery) {
    label = loading
      ? "SEARCHING…"
      : error
      ? "SEARCH FAILED"
      : `${count} RESULT${results.length === 1 ? "" : "S"} FOR “${query
          .trim()
          .toUpperCase()}”`;
  }

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <label className="flex flex-col gap-3.5">
        <span className="hidden font-mono text-[13px] tracking-[0.12em] text-[#9AA1B2] md:block">
          SEARCH THE CATALOGUE · ESC CLEARS
        </span>
        <span className="sr-only md:hidden">Search anime</span>
        <span
          className={cx(
            "flex items-center gap-3 border-b-2 pb-2 md:gap-5 md:pb-2.5",
            hasQuery ? "border-amber" : "border-[#2A3040]"
          )}
        >
          <SearchIcon size={44} className="hidden text-amber md:block" />
          <SearchIcon size={28} className="text-amber md:hidden" />
          <input
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            // eslint-disable-next-line jsx-a11y/no-autofocus -- the page exists to type into this field
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setQuery("");
            }}
            placeholder="Type a title…"
            className="min-w-0 flex-1 bg-transparent font-display text-[40px] font-extrabold leading-[1.05] tracking-[-0.04em] text-fg outline-none placeholder:text-[#4A5266] md:text-[clamp(44px,7vw,104px)]"
          />
          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1B2130] text-fg"
            >
              <CloseIcon />
            </button>
          )}
        </span>
      </label>

      {!hasQuery && (
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:items-center md:gap-2.5 md:px-0">
          <span className="mr-1.5 hidden font-mono text-xs tracking-[0.1em] text-[#9AA1B2] md:inline">
            TRY
          </span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s)}
              className="min-h-[40px] shrink-0 rounded-full border border-[#2A3040] px-4 text-sm font-medium hover:border-fg md:min-h-[44px] md:px-[18px] md:text-base"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <section
        aria-live="polite"
        aria-label="Results"
        className="flex flex-col gap-4 md:gap-[22px]"
      >
        <span className="font-mono text-[11px] tracking-[0.1em] text-[#D5D9E2] md:text-[13px]">
          {label}
        </span>
        {list.length > 0 && (
          <ul
            key={revealKey}
            className={cx(
              "grid grid-cols-2 gap-x-3.5 gap-y-[22px] md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:gap-x-[22px] md:gap-y-8",
              loading && "opacity-60"
            )}
          >
            {list.map((item, i) => (
              <li key={item.id} {...reveal(i)}>
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
                    <span className="absolute left-2 top-2 hidden rounded bg-ink/75 px-1.5 py-0.5 font-mono text-[11px] md:block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="text-sm font-semibold leading-snug group-hover:text-amber md:text-[15px]">
                    {item.title}
                  </span>
                  <span className="font-mono text-[11px] uppercase text-[#9AA1B2] md:text-xs">
                    {[item.year, item.type].filter(Boolean).join(" · ")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {hasQuery && !loading && !error && results.length === 0 && (
          <div className="flex flex-col items-start gap-3 py-6 md:gap-4 md:py-12">
            <span className="font-display text-5xl font-extrabold tracking-[-0.04em] text-[#3A4152] md:text-[56px]">
              CUT.
            </span>
            <p className="text-[15px] leading-relaxed text-[#D5D9E2] md:text-lg">
              Nothing in the catalogue matches &ldquo;{query.trim()}&rdquo;.
              Check the spelling, or try the Japanese or English title.
            </p>
            <Link
              href="/browse"
              className="inline-flex min-h-[44px] items-center font-semibold hover:text-amber"
            >
              Browse everything instead →
            </Link>
          </div>
        )}
        {error && (
          <p className="text-[#D5D9E2]">
            Kitsu didn&apos;t answer. Check your connection and try again.
          </p>
        )}
      </section>
    </div>
  );
};

export default ReelSearch;
