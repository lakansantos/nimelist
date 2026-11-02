import cx from "classnames";
import Link from "next/link";
import {AnimeItem, episodesLabel, scoreLabel} from "@lib/anime";
import AnimeImage from "@components/AnimeImage";

/**
 * Details hero: cover zooms out while the title slides in. The motion lives
 * in globals.css (reel-hero-*) so it runs smoothly on the compositor.
 */
const ReelDetailsHero = ({
  anime,
  rank,
}: {
  anime: AnimeItem;
  rank: number | null;
}) => {
  const score = scoreLabel(anime);
  const cover = anime.cover?.large;
  const poster = anime.poster?.large;

  return (
    <section
      aria-labelledby="reel-details-title"
      className="relative h-[560px] overflow-hidden md:h-[600px]"
    >
      {poster && (
        <AnimeImage
          fallback="hide"
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="reel-hero-zoom reel-hero-zoom-lg object-cover md:hidden"
        />
      )}
      {(cover || poster) && (
        <AnimeImage
          fallback="hide"
          src={cover || poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className={cx(
            "reel-hero-zoom hidden object-cover md:block",
            cover ? "brightness-[0.6]" : "blur-[40px] brightness-50"
          )}
          style={{objectPosition: anime.coverPosition}}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,11,0.5)_0%,rgba(7,8,11,0)_25%,rgba(7,8,11,0.3)_55%,#07080B_100%)] md:bg-[linear-gradient(0deg,#07080B_0%,rgba(7,8,11,0.4)_45%,rgba(7,8,11,0.1)_100%)]"
      />
      {anime.titleJa && (
        <span
          lang="ja"
          aria-hidden
          className="reel-hero-ja absolute right-3.5 top-20 font-jp text-[34px] font-black text-fg/85 [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] [writing-mode:vertical-rl] md:right-[clamp(20px,4vw,64px)] md:top-10 md:text-[clamp(48px,6vw,96px)] md:text-fg/20 md:[text-shadow:none]"
        >
          {anime.titleJa}
        </span>
      )}
      <Link
        href="/"
        aria-label="Back to the reel"
        className="absolute left-3.5 top-3.5 grid h-11 w-11 place-items-center rounded-full bg-ink/60 text-xl md:hidden"
      >
        ←
      </Link>
      <div className="absolute inset-x-5 bottom-5 flex flex-col gap-3 md:inset-x-[clamp(20px,5vw,72px)] md:bottom-12 md:gap-[18px]">
        <Link
          href="/"
          className="hidden min-h-[44px] w-fit items-center gap-2 font-semibold hover:text-amber md:inline-flex"
        >
          ← Back to the reel
        </Link>
        {(rank || score) && (
          <span className="w-fit rounded-full bg-amber px-2.5 py-1 font-mono text-[11px] tracking-[0.06em] text-amber-ink md:px-3 md:py-1.5 md:text-xs">
            {[
              rank ? `#${String(rank).padStart(2, "0")} TRENDING` : null,
              score ? `★ ${score}` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </span>
        )}
        <div className="overflow-hidden">
          <h1
            id="reel-details-title"
            className="reel-hero-title font-display text-[56px] font-extrabold leading-[0.9] tracking-[-0.05em] md:text-[clamp(56px,9vw,150px)] md:leading-[0.88]"
          >
            {anime.title}
          </h1>
        </div>
        <div className="reel-hero-meta flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[11px] tracking-[0.04em] text-[#D5D9E2] md:gap-x-[18px] md:gap-y-2.5 md:text-[13px]">
          {[
            anime.year,
            anime.type.toUpperCase(),
            episodesLabel(anime).toUpperCase(),
            anime.status.toUpperCase(),
            anime.ageRating ? `RATED ${anime.ageRating}` : null,
          ]
            .filter(Boolean)
            .map((part) => (
              <span key={part}>{part}</span>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ReelDetailsHero;
