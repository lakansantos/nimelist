"use client";

import cx from "classnames";
import Link from "next/link";
import {CloseIcon, SearchIcon} from "@components/icons";
import {AnimeItem, metaLine} from "@lib/anime";
import {useKitsuSearch} from "@lib/useKitsuSearch";
import {PosterThumb} from "./parts";

const SUGGESTIONS = ["Frieren", "Death Note", "One Piece", "Demon Slayer"];

type Props = {initialQuery: string; popular: AnimeItem[]};

const SimpleSearch = ({initialQuery, popular}: Props) => {
  const {query, setQuery, results, loading, error, hasQuery} =
    useKitsuSearch(initialQuery);
  const list = hasQuery ? results : popular;

  let label = "Popular right now";
  if (hasQuery) {
    label = loading
      ? "Searching…"
      : error
      ? "Search failed"
      : `${results.length} result${results.length === 1 ? "" : "s"}`;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <h1 className="font-display text-2xl font-extrabold tracking-[-0.03em] md:sr-only">
        Search
      </h1>
      <label
        className={cx(
          "relative flex h-12 items-center gap-2.5 rounded-xl border bg-panel pl-3.5 pr-1.5 md:h-14 md:gap-3 md:px-[18px]",
          hasQuery ? "border-amber" : "border-line"
        )}
      >
        <SearchIcon size={20} className="text-muted" />
        <span className="sr-only">Search anime</span>
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
          placeholder="Search by English or Japanese title"
          className="min-w-0 flex-1 bg-transparent text-base text-fg-soft outline-none placeholder:text-[#6B7385] md:text-[17px]"
        />
        {hasQuery ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="grid h-10 w-10 place-items-center rounded-lg text-muted hover:text-fg"
          >
            <CloseIcon />
          </button>
        ) : (
          <span className="hidden font-mono text-[11px] text-[#6B7385] md:inline">
            ESC
          </span>
        )}
      </label>

      {!hasQuery && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[13px] text-muted">Try</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s)}
              className="min-h-[36px] rounded-lg border border-line-strong px-3 text-[13px] text-muted-strong hover:text-fg"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <section
        aria-live="polite"
        aria-label="Results"
        className="flex flex-col gap-2.5"
      >
        <span className="text-[13px] text-muted">{label}</span>
        {list.length > 0 && (
          <ul
            className={cx(
              "overflow-hidden rounded-[14px] border border-line bg-panel",
              loading && "opacity-60"
            )}
          >
            {list.map((item) => (
              <li
                key={item.id}
                className="border-t border-line first:border-t-0"
              >
                <Link
                  href={`/${item.id}`}
                  className="flex items-center gap-3.5 px-3 py-2 hover:bg-raised md:px-4 md:py-2.5"
                >
                  <PosterThumb
                    item={item}
                    className="h-12 w-[34px] md:h-[51px] md:w-9"
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm font-medium md:text-[15px]">
                      {item.title}
                    </span>
                    {item.titleJa && (
                      <span
                        lang="ja"
                        className="truncate text-[13px] text-muted"
                      >
                        {item.titleJa}
                      </span>
                    )}
                  </span>
                  <span className="hidden w-20 text-sm text-muted-strong md:block">
                    {item.type}
                  </span>
                  <span className="hidden w-12 font-mono text-sm md:block">
                    {item.year ?? "—"}
                  </span>
                  <span className="font-mono text-[11px] text-muted md:hidden">
                    {metaLine(item)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {hasQuery && !loading && !error && results.length === 0 && (
          <div className="flex flex-col items-start gap-2.5 rounded-[14px] border border-dashed border-line-strong p-6 md:p-8">
            <span className="font-semibold">
              No results for &ldquo;{query.trim()}&rdquo;
            </span>
            <span className="text-muted-strong">
              Check the spelling, or try the Japanese title.
            </span>
            <Link
              href="/browse"
              className="inline-flex min-h-[40px] items-center font-semibold hover:text-amber"
            >
              Browse all anime →
            </Link>
          </div>
        )}
        {error && (
          <p className="rounded-[14px] border border-dashed border-line-strong p-6 text-muted-strong">
            Kitsu didn&apos;t answer. Check your connection and try again.
          </p>
        )}
      </section>
    </div>
  );
};

export default SimpleSearch;
