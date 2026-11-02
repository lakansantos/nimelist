import cx from "classnames";
import Link from "next/link";
import {notFound} from "next/navigation";
import SaveButton from "@components/SaveButton";
import {PlayIcon} from "@components/icons";
import {episodesLabel, formatAired, scoreLabel, wideImage} from "@lib/anime";
import {loadDetails, detailsMetadata} from "@lib/details";
import {PosterGrid} from "@modules/simple/parts";
import AnimeImage from "@components/AnimeImage";

type Props = {params: {id: string}};

export const generateMetadata = ({params}: Props) => detailsMetadata(params.id);

export default async function SimpleDetails({params}: Props) {
  const details = await loadDetails(params.id);
  if (!details) notFound();
  const {anime, genres, similar, rank} = details;
  const banner = wideImage(anime);
  const score = scoreLabel(anime);

  const facts: [string, string][] = [
    ["Type", anime.type],
    [
      "Episodes",
      anime.episodeLength
        ? `${episodesLabel(anime, true)} × ${anime.episodeLength}m`
        : episodesLabel(anime, true),
    ],
    ["Status", anime.status],
    ["Rating", anime.ageRating ?? "—"],
    ["Aired", formatAired(anime) ?? "—"],
    ["Popularity", anime.popularityRank ? `#${anime.popularityRank}` : "—"],
  ];

  return (
    <article className="flex flex-col gap-5 md:gap-7">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/" className="text-muted-strong hover:text-amber">
          Home
        </Link>{" "}
        <span aria-hidden>/</span>{" "}
        <Link href="/browse" className="text-muted-strong hover:text-amber">
          Browse
        </Link>{" "}
        <span aria-hidden>/</span>{" "}
        <span aria-current="page" className="text-fg-soft">
          {anime.title}
        </span>
      </nav>

      <div className="relative hidden h-[200px] overflow-hidden rounded-2xl bg-raised md:block">
        {banner && (
          <AnimeImage
            fallback="hide"
            src={banner.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className={cx(
              "object-cover",
              banner.isPoster && "scale-110 blur-2xl brightness-75"
            )}
            style={{objectPosition: anime.coverPosition}}
          />
        )}
      </div>

      <div className="flex gap-3.5 md:-mt-[110px] md:gap-8 md:px-6">
        <AnimeImage
          src={anime.poster?.medium}
          alt={`${anime.title} poster`}
          width={390}
          height={554}
          priority
          className="relative aspect-[2/3] w-28 shrink-0 rounded-[10px] bg-raised object-cover md:w-[200px] md:rounded-xl md:border-4 md:border-ground"
        />
        <div className="flex min-w-0 flex-col gap-1.5 md:gap-3.5 md:pt-[120px]">
          {(rank || score) && (
            <span className="font-mono text-[11px] tracking-[0.04em] text-amber md:text-xs">
              {[rank ? `#${rank} TRENDING` : null, score ? `★ ${score}` : null]
                .filter(Boolean)
                .join(" · ")}
            </span>
          )}
          <h1 className="font-display text-[26px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[40px]">
            {anime.title}
          </h1>
          {anime.titleJa && (
            <span lang="ja" className="text-[13px] text-muted md:text-base">
              {anime.titleJa}
            </span>
          )}
          <span className="font-mono text-xs text-muted-strong md:hidden">
            {[anime.year, anime.type, episodesLabel(anime), anime.ageRating]
              .filter(Boolean)
              .join(" · ")}
          </span>
          <div className="mt-1.5 hidden flex-wrap gap-2.5 md:flex">
            <SaveButton item={anime} variant="simple-pill" />
            {anime.trailerId && <TrailerLink id={anime.trailerId} />}
          </div>
        </div>
      </div>

      <div className="flex gap-2 md:hidden">
        <SaveButton item={anime} variant="simple-pill" className="flex-1" />
        {anime.trailerId && <TrailerLink id={anime.trailerId} />}
      </div>

      <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-start md:gap-7">
        <section
          aria-labelledby="sd-syn"
          className="flex min-w-0 flex-col gap-3 md:flex-[999_1_420px] md:rounded-[14px] md:border md:border-line md:bg-panel md:p-6"
        >
          <h2 id="sd-syn" className="text-[15px] font-semibold md:text-base">
            Synopsis
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-[#C9CDD6]">
            {anime.synopsis || "Kitsu has no synopsis for this title yet."}
          </p>
          {genres.length > 0 && (
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {genres.map((g) => (
                <li key={g.slug}>
                  <span className="inline-flex min-h-[32px] items-center rounded-lg border border-line-strong px-2.5 text-[13px] text-muted-strong">
                    {g.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <dl className="grid grid-cols-2 overflow-hidden rounded-[14px] border border-line bg-panel md:flex-[1_1_260px]">
          {facts.map(([label, value], i) => (
            <div
              key={label}
              className={cx(
                "px-4 py-3.5",
                i < facts.length - 2 && "border-b border-line"
              )}
            >
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="mt-1 font-mono text-sm">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {similar.length > 0 && (
        <section aria-labelledby="sd-more" className="flex flex-col gap-3.5">
          <h2
            id="sd-more"
            className="font-display text-xl font-extrabold tracking-[-0.02em] md:text-[22px]"
          >
            More like this
          </h2>
          <PosterGrid items={similar} dense />
        </section>
      )}
    </article>
  );
}

const TrailerLink = ({id}: {id: string}) => (
  <a
    href={`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border border-line-strong px-4 font-medium hover:border-muted"
  >
    <PlayIcon />
    Trailer
  </a>
);
