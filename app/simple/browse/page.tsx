import cx from "classnames";
import Link from "next/link";
import {GridIcon, ListIcon} from "@components/icons";
import {
  BROWSE_TYPES,
  browseHref,
  loadBrowse,
  parseBrowseParams,
  pluralType,
} from "@lib/browse";
import {AnimeTable, PosterGrid} from "@modules/simple/parts";

export const metadata = {title: "Browse · Nimelist"};

type Props = {searchParams: Record<string, string | string[] | undefined>};

export default async function SimpleBrowse({searchParams}: Props) {
  const params = parseBrowseParams(searchParams);
  const {items, ranks, counts, listLabel} = await loadBrowse(params);

  const segment = (active: boolean) =>
    cx(
      "inline-flex min-h-[38px] items-center justify-center rounded-[7px] px-4 font-semibold",
      active ? "bg-amber text-amber-ink" : "text-muted-strong hover:text-fg"
    );

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <h1 className="font-display text-2xl font-extrabold tracking-[-0.03em] md:text-[32px]">
        Browse
      </h1>

      <div className="flex flex-wrap items-center justify-between gap-3.5">
        <nav
          aria-label="List"
          className="grid grid-cols-2 gap-1 rounded-[10px] border border-line bg-panel p-1 max-md:w-full"
        >
          <Link
            href={browseHref(params, {list: "trending", type: "All"})}
            aria-current={params.list === "trending" ? "page" : undefined}
            className={segment(params.list === "trending")}
          >
            Trending
          </Link>
          <Link
            href={browseHref(params, {list: "top", type: "All"})}
            aria-current={params.list === "top" ? "page" : undefined}
            className={segment(params.list === "top")}
          >
            Top rated
          </Link>
        </nav>
        <div className="flex items-center gap-3.5">
          <span aria-live="polite" className="text-sm text-muted">
            {items.length} {items.length === 1 ? "title" : "titles"}
          </span>
          <nav
            aria-label="Layout"
            className="hidden gap-1 rounded-[10px] border border-line bg-panel p-1 md:flex"
          >
            <Link
              href={browseHref(params, {view: "table"})}
              aria-label="Table view"
              aria-current={params.view === "table" ? "page" : undefined}
              className={cx(segment(params.view === "table"), "!px-2.5")}
            >
              <ListIcon />
            </Link>
            <Link
              href={browseHref(params, {view: "grid"})}
              aria-label="Grid view"
              aria-current={params.view === "grid" ? "page" : undefined}
              className={cx(segment(params.view === "grid"), "!px-2.5")}
            >
              <GridIcon />
            </Link>
          </nav>
        </div>
      </div>

      <nav
        aria-label="Filter by type"
        className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0"
      >
        {BROWSE_TYPES.filter((t) => t !== "Music").map((type) => {
          const active = params.type === type;
          return (
            <Link
              key={type}
              href={browseHref(params, {type})}
              aria-current={active ? "page" : undefined}
              className={cx(
                "inline-flex min-h-[36px] shrink-0 items-center gap-1.5 rounded-lg border px-3 text-[13px]",
                active
                  ? "border-amber bg-raised text-white"
                  : "border-line-strong text-muted-strong hover:text-fg"
              )}
            >
              {type}
              <span className="font-mono text-[11px] opacity-70">
                {String(counts[type]).padStart(2, "0")}
              </span>
            </Link>
          );
        })}
      </nav>

      {items.length === 0 ? (
        <div className="flex flex-col items-start gap-2.5 rounded-[14px] border border-dashed border-line-strong p-8">
          <span className="font-semibold">
            No {pluralType(params.type)} in {listLabel} right now
          </span>
          <Link
            href={browseHref(params, {type: "All"})}
            className="inline-flex min-h-[40px] items-center rounded-lg bg-amber px-3.5 font-semibold text-amber-ink"
          >
            Show all types
          </Link>
        </div>
      ) : params.view === "grid" ? (
        <PosterGrid items={items} ranks={ranks} />
      ) : (
        <AnimeTable items={items} ranks={ranks} columns={{score: true}} />
      )}
    </div>
  );
}
