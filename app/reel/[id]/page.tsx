import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import SaveButton from "@components/SaveButton";
import {PlayIcon} from "@components/icons";
import {episodesLabel, formatAired} from "@lib/anime";
import {detailsMetadata, loadDetails} from "@lib/details";
import {ReelPage} from "@modules/reel/ReelChrome";
import ReelDetailsHero from "@modules/reel/ReelDetailsHero";

type Props = {params: {id: string}};

export const generateMetadata = ({params}: Props) => detailsMetadata(params.id);

const label =
  "font-mono text-[11px] tracking-[0.12em] text-[#9AA1B2] md:text-[13px]";

export default async function ReelDetails({params}: Props) {
  const details = await loadDetails(params.id);
  if (!details) notFound();
  const {anime, genres, similar, rank, next} = details;

  const facts: [string, string][] = [
    ["AIRED", formatAired(anime) ?? "—"],
    [
      "EPISODES",
      anime.episodeLength
        ? `${episodesLabel(anime, true)} × ${anime.episodeLength} min`
        : episodesLabel(anime, true),
    ],
    ["STATUS", anime.status],
    [
      "POPULARITY",
      anime.popularityRank ? `#${anime.popularityRank} on Kitsu` : "—",
    ],
  ];

  return (
    <ReelPage mobileLabel="DETAILS" bleed>
      <ReelDetailsHero anime={anime} rank={rank} />

      <div className="flex flex-col gap-7 px-5 pt-5 md:gap-16 md:px-[clamp(20px,5vw,72px)] md:pt-10">
        <div className="flex flex-col-reverse gap-7 md:flex-row md:flex-wrap md:items-start md:gap-12">
          <div className="flex min-w-0 flex-col gap-7 md:flex-[999_1_560px] md:gap-9">
            <section
              aria-labelledby="rd-syn"
              className="flex flex-col gap-2.5 md:gap-3.5"
            >
              <h2 id="rd-syn" className={label}>
                SYNOPSIS
              </h2>
              <p className="max-w-[720px] whitespace-pre-line text-base leading-relaxed text-[#E3E6EC] md:text-[19px] md:leading-[1.65]">
                {anime.synopsis || "Kitsu has no synopsis for this title yet."}
              </p>
            </section>
            {genres.length > 0 && (
              <section
                aria-labelledby="rd-gen"
                className="flex flex-col gap-2.5 md:gap-3.5"
              >
                <h2 id="rd-gen" className={label}>
                  GENRES
                </h2>
                <ul className="flex flex-wrap gap-1.5 md:gap-2">
                  {genres.map((g) => (
                    <li
                      key={g.slug}
                      className="inline-flex min-h-[36px] items-center rounded-full border border-[#2A3040] px-3.5 text-sm md:min-h-[40px] md:px-4 md:text-base"
                    >
                      {g.name}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <dl className="grid grid-cols-2 border-t border-[#1C2130] md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
              {facts.map(([term, value]) => (
                <div
                  key={term}
                  className="border-b border-[#1C2130] py-3 pr-2 md:py-4 md:pr-4"
                >
                  <dt className="font-mono text-[11px] tracking-[0.1em] text-[#9AA1B2] md:text-xs">
                    {term}
                  </dt>
                  <dd className="mt-1 text-sm font-medium md:mt-1.5 md:text-base">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="flex flex-col gap-3.5 md:max-w-[380px] md:flex-[1_1_300px]">
            {anime.poster && (
              <Image
                src={anime.poster.large}
                alt={`${anime.title} poster`}
                width={550}
                height={780}
                className="hidden aspect-[2/3] w-full border-[6px] border-fg object-cover md:block"
              />
            )}
            <div className="flex gap-2 md:flex-col md:gap-3.5">
              <SaveButton
                item={anime}
                variant="reel-pill"
                labels={{
                  save: "Save to your list",
                  saved: "Saved to your list",
                }}
                className="flex-1 !min-h-[52px] aria-pressed:!border-amber aria-pressed:!bg-amber aria-pressed:!text-amber-ink"
              />
              {anime.trailerId && (
                <a
                  href={`https://www.youtube.com/watch?v=${encodeURIComponent(
                    anime.trailerId
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-[#2A3040] px-5 font-semibold hover:border-fg"
                >
                  <PlayIcon />
                  <span className="md:hidden">Trailer</span>
                  <span className="hidden md:inline">Watch trailer</span>
                </a>
              )}
            </div>
          </aside>
        </div>

        {next && (
          <Link
            href={`/${next.id}`}
            className="group flex flex-col gap-2.5 rounded-2xl bg-[#12151C] p-4 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-5 md:rounded-[20px] md:px-8 md:py-7"
          >
            <span className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] tracking-[0.12em] text-[#9AA1B2] md:text-xs">
                UP NEXT IN THE REEL · SCENE{" "}
                {String((rank ?? 0) + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[28px] font-extrabold tracking-[-0.04em] group-hover:text-amber md:text-[clamp(32px,4vw,56px)]">
                {next.title} →
              </span>
            </span>
            {next.cover && (
              <Image
                src={next.cover.large}
                alt=""
                width={840}
                height={200}
                className="hidden aspect-[4.2/1] w-[min(420px,100%)] rounded-[10px] object-cover md:block"
              />
            )}
          </Link>
        )}

        {similar.length > 0 && (
          <section
            aria-labelledby="rd-more"
            className="flex flex-col gap-3 md:gap-5"
          >
            <h2
              id="rd-more"
              className="font-display text-[26px] font-extrabold tracking-[-0.03em] md:text-4xl"
            >
              More like this
            </h2>
            <ul className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] md:gap-6 md:overflow-visible md:px-0">
              {similar.map((item) => (
                <li key={item.id} className="w-[130px] shrink-0 md:w-auto">
                  <Link
                    href={`/${item.id}`}
                    className="group flex flex-col gap-2 md:gap-2.5"
                  >
                    {item.poster ? (
                      <Image
                        src={item.poster.small}
                        alt=""
                        width={284}
                        height={402}
                        className="aspect-[2/3] w-full rounded-[10px] object-cover md:rounded-xl"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="block aspect-[2/3] w-full rounded-xl bg-[#1B2130]"
                      />
                    )}
                    <span className="text-[13px] font-semibold leading-snug group-hover:text-amber md:text-[15px]">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </ReelPage>
  );
}
