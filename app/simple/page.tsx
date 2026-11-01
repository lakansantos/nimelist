import {getTopRated, getTrending} from "@lib/kitsu";
import {
  AnimeTable,
  FeaturedCard,
  PosterGrid,
  SearchFieldLink,
  SectionHeader,
} from "@modules/simple/parts";

export default async function SimpleHome() {
  const [trending, topRated] = await Promise.all([
    getTrending(),
    getTopRated(1),
  ]);
  const featured = trending[0];

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <SearchFieldLink />
      {featured && <FeaturedCard item={featured} rank={1} />}
      {trending.length > 0 ? (
        <section aria-labelledby="s-trending" className="flex flex-col gap-3.5">
          <SectionHeader id="s-trending" title="Trending" href="/browse" />
          <AnimeTable items={trending.slice(0, 7)} />
        </section>
      ) : (
        <p className="rounded-[14px] border border-dashed border-line-strong p-8 text-muted-strong">
          Kitsu didn&apos;t answer just now, so there&apos;s nothing to show.
          Try again in a minute.
        </p>
      )}
      {topRated.length > 0 && (
        <section aria-labelledby="s-top" className="flex flex-col gap-3.5">
          <SectionHeader id="s-top" title="Top rated" href="/browse?list=top" />
          <PosterGrid items={topRated.slice(0, 12)} dense />
        </section>
      )}
    </div>
  );
}
