import type {Metadata} from "next";
import {AnimeItem} from "@lib/anime";
import {
  Genre,
  getAnime,
  getGenres,
  getSimilar,
  getTrending,
  trendingRank,
} from "@lib/kitsu";

export type Details = {
  anime: AnimeItem;
  genres: Genre[];
  similar: AnimeItem[];
  /** Position in the trending list, or null when not trending. */
  rank: number | null;
  /** The next trending anime after this one, for "Up next in the reel". */
  next: AnimeItem | null;
};

/** Everything a details page needs. Null when the id is invalid or unknown. */
export const loadDetails = async (id: string): Promise<Details | null> => {
  if (!/^\d+$/.test(id)) return null;
  const [anime, genres, trending] = await Promise.all([
    getAnime(id),
    getGenres(id),
    getTrending(),
  ]);
  if (!anime) return null;
  const similar = await getSimilar(genres[0]?.slug, id);
  const rank = trendingRank(trending, id);
  return {
    anime,
    genres,
    similar,
    rank,
    next: rank ? trending[rank] ?? null : null,
  };
};

export const detailsMetadata = async (id: string): Promise<Metadata> => {
  const anime = /^\d+$/.test(id) ? await getAnime(id) : null;
  if (!anime) return {title: "Not found · Nimelist"};
  return {
    title: `${anime.title} · Nimelist`,
    description: anime.synopsis.slice(0, 160) || undefined,
  };
};
