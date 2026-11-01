import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import SaveButton from "@components/SaveButton";
import {SearchIcon} from "@components/icons";
import {
  AnimeItem,
  episodesLabel,
  metaLine,
  scoreLabel,
  wideImage,
} from "@lib/anime";

export const SectionHeader = ({
  id,
  title,
  href,
  linkLabel = "View all",
}: {
  id: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) => (
  <div className="flex items-baseline justify-between gap-3">
    <h2
      id={id}
      className="font-display text-xl font-extrabold tracking-[-0.02em] md:text-2xl"
    >
      {title}
    </h2>
    {href && (
      <Link href={href} className="text-sm text-muted-strong hover:text-amber">
        {linkLabel}
      </Link>
    )}
  </div>
);

export const PosterThumb = ({
  item,
  className,
}: {
  item: AnimeItem;
  className?: string;
}) =>
  item.poster ? (
    <Image
      src={item.poster.tiny}
      alt=""
      width={110}
      height={156}
      className={cx("shrink-0 rounded-md bg-raised object-cover", className)}
    />
  ) : (
    <span
      aria-hidden
      className={cx("shrink-0 rounded-md bg-raised", className)}
    />
  );

export const SearchFieldLink = () => (
  <Link
    href="/search"
    className="flex h-11 items-center gap-2.5 rounded-[10px] border border-line bg-panel px-3.5 text-muted hover:border-line-strong"
  >
    <SearchIcon />
    Search anime
  </Link>
);

/** Status text with a dot; ongoing shows in amber. */
export const StatusLabel = ({item}: {item: AnimeItem}) => (
  <span
    className={cx(
      "inline-flex items-center gap-2",
      item.status === "Ongoing" ? "text-amber" : "text-muted"
    )}
  >
    <span aria-hidden className="h-2 w-2 rounded-full bg-current" />
    {item.status}
  </span>
);

type TableProps = {
  items: AnimeItem[];
  /** Ranks shown in the # column; defaults to position. */
  ranks?: number[];
  columns?: {status?: boolean; score?: boolean};
};

/** Desktop table that collapses to a compact list on phones. */
export const AnimeTable = ({
  items,
  ranks,
  columns = {status: true},
}: TableProps) => (
  <>
    <div className="hidden overflow-x-auto rounded-[14px] border border-line bg-panel md:block">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-[0.06em] text-muted">
            <th scope="col" className="w-12 px-4 py-3 font-medium">
              #
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Title
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Type
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Eps
            </th>
            {columns.status && (
              <th scope="col" className="px-4 py-3 font-medium">
                Status
              </th>
            )}
            <th scope="col" className="px-4 py-3 font-medium">
              Year
            </th>
            {columns.score && (
              <th scope="col" className="px-4 py-3 font-medium">
                Score
              </th>
            )}
            <th scope="col" className="w-16 px-4 py-3 font-medium">
              <span className="sr-only">Save</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id} className="border-t border-line">
              <td className="px-4 py-2.5 font-mono text-muted">
                {String(ranks?.[i] ?? i + 1).padStart(2, "0")}
              </td>
              <td className="px-4 py-2.5">
                <Link
                  href={`/${item.id}`}
                  className="flex items-center gap-3.5 font-medium hover:text-amber"
                >
                  <PosterThumb item={item} className="h-[51px] w-9" />
                  {item.title}
                </Link>
              </td>
              <td className="px-4 py-2.5 text-muted-strong">{item.type}</td>
              <td className="px-4 py-2.5 font-mono">
                {episodesLabel(item, true)}
              </td>
              {columns.status && (
                <td className="px-4 py-2.5">
                  <StatusLabel item={item} />
                </td>
              )}
              <td className="px-4 py-2.5 font-mono">{item.year ?? "—"}</td>
              {columns.score && (
                <td className="px-4 py-2.5 font-mono text-amber">
                  {scoreLabel(item) ?? "—"}
                </td>
              )}
              <td className="px-4 py-1.5">
                <SaveButton item={item} variant="simple-icon" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <ol className="overflow-hidden rounded-[14px] border border-line bg-panel md:hidden">
      {items.map((item, i) => (
        <li
          key={item.id}
          className="flex items-center gap-2.5 border-t border-line py-2 pl-3 pr-2 first:border-t-0"
        >
          <span className="w-6 font-mono text-xs text-muted">
            {String(ranks?.[i] ?? i + 1).padStart(2, "0")}
          </span>
          <Link
            href={`/${item.id}`}
            className="flex min-w-0 flex-1 items-center gap-3"
          >
            <PosterThumb item={item} className="h-12 w-[34px]" />
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-sm font-medium">{item.title}</span>
              <span
                className={cx(
                  "font-mono text-[11px]",
                  item.status === "Ongoing" ? "text-amber" : "text-muted"
                )}
              >
                {metaLine(item, episodesLabel(item))}
              </span>
            </span>
          </Link>
          <SaveButton
            item={item}
            variant="simple-icon"
            className="!h-11 !w-11 border-0"
          />
        </li>
      ))}
    </ol>
  </>
);

export const PosterGrid = ({
  items,
  ranks,
  dense = false,
}: {
  items: AnimeItem[];
  ranks?: number[];
  dense?: boolean;
}) => (
  <ul
    className={cx(
      "grid gap-x-2.5 gap-y-4 md:gap-x-[18px] md:gap-y-6",
      dense
        ? "grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
    )}
  >
    {items.map((item, i) => (
      <li key={item.id} className="relative">
        <Link href={`/${item.id}`} className="group flex flex-col gap-2">
          {item.poster ? (
            <Image
              src={item.poster.small}
              alt=""
              width={284}
              height={402}
              className="aspect-[2/3] w-full rounded-[10px] bg-raised object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="aspect-[2/3] w-full rounded-[10px] bg-raised"
            />
          )}
          <span className="line-clamp-2 text-xs font-medium leading-snug group-hover:text-amber md:truncate md:text-sm">
            {item.title}
          </span>
          <span className="hidden font-mono text-xs text-muted md:block">
            {ranks ? `#${ranks[i]} · ` : ""}
            {metaLine(item)}
          </span>
        </Link>
        {ranks && (
          <SaveButton
            item={item}
            variant="simple-icon"
            className="absolute right-1.5 top-1.5 border-0 !bg-ground/75 aria-pressed:!bg-amber"
          />
        )}
      </li>
    ))}
  </ul>
);

export const FeaturedCard = ({item, rank}: {item: AnimeItem; rank: number}) => {
  const image = wideImage(item);
  return (
    <section
      aria-label={`Featured: ${item.title}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-line bg-panel md:flex-row"
    >
      <div className="relative h-[150px] shrink-0 overflow-hidden bg-raised md:h-auto md:min-h-[280px] md:flex-1">
        {image && (
          <Image
            src={image.src}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className={cx(
              "object-cover",
              image.isPoster && "scale-110 blur-2xl brightness-75"
            )}
            style={{objectPosition: item.coverPosition}}
          />
        )}
      </div>
      <div className="flex flex-col gap-2.5 p-4 md:flex-1 md:gap-4 md:p-7">
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-amber md:text-xs">
          #{rank} trending
        </span>
        <h1 className="font-display text-[26px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-4xl">
          {item.title}
        </h1>
        {item.synopsis && (
          <p className="hidden leading-relaxed text-muted-strong md:line-clamp-3">
            {item.synopsis}
          </p>
        )}
        <dl className="grid grid-cols-4 gap-3 font-mono text-xs md:text-sm">
          {[
            ["Year", item.year ?? "—"],
            ["Type", item.type],
            ["Episodes", episodesLabel(item, true)],
            ["Status", item.status],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-sans text-[11px] text-muted md:text-xs">
                {label}
              </dt>
              <dd className="mt-1">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex gap-2.5 pt-1">
          <Link
            href={`/${item.id}`}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-[10px] bg-amber px-[18px] font-semibold text-amber-ink md:flex-none"
          >
            View details
          </Link>
          <SaveButton item={item} variant="simple-pill" />
        </div>
      </div>
    </section>
  );
};
