import {Anime, Genres} from "@app-types/anime";
import {BASE_API_KITSU_URL, REVALIDATE_SECONDS} from "@constants/configs";
import {AnimeItem, dedupeFranchises, toAnimeItem} from "@lib/anime";

/** Kitsu caps page[limit] at 20. */
const PAGE_SIZE = 20;

type ListResponse = {data: Anime[]};
type OneResponse = {data: Anime};
type GenresResponse = {data: Genres[]};

/** Network failures (Kitsu sometimes resets connections) get this many retries. */
const RETRIES = 2;
const RETRY_DELAY_MS = 400;

const retry = async <T>(path: string, revalidate: number, attempt: number) => {
  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * attempt));
  return getJson<T>(path, revalidate, attempt);
};

const getJson = async <T>(
  path: string,
  revalidate: number,
  attempt = 0
): Promise<T | null> => {
  try {
    const response = await fetch(`${BASE_API_KITSU_URL}${path}`, {
      next: {revalidate},
    });
    if (response.status >= 500 && attempt < RETRIES) {
      return retry<T>(path, revalidate, attempt + 1);
    }
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    if (attempt < RETRIES) return retry<T>(path, revalidate, attempt + 1);
    return null;
  }
};

const toItems = (anime: Anime[]) =>
  dedupeFranchises(
    anime.filter((a) => a?.attributes && !a.attributes.nsfw).map(toAnimeItem)
  );

/** Kitsu's weekly trending list, one entry per franchise. */
export const getTrending = async (): Promise<AnimeItem[]> => {
  const json = await getJson<ListResponse>(
    `/trending/anime?limit=${PAGE_SIZE}`,
    REVALIDATE_SECONDS.lists
  );
  return toItems(json?.data ?? []);
};

/** Highest rated anime, `pages` × 20 fetched, one entry per franchise. */
export const getTopRated = async (pages = 2): Promise<AnimeItem[]> => {
  const responses = await Promise.all(
    Array.from({length: pages}, (_, i) =>
      getJson<ListResponse>(
        `/anime?sort=-averageRating&page[limit]=${PAGE_SIZE}&page[offset]=${
          i * PAGE_SIZE
        }`,
        REVALIDATE_SECONDS.lists
      )
    )
  );
  return toItems(responses.flatMap((r) => r?.data ?? []));
};

export const getAnime = async (id: string): Promise<AnimeItem | null> => {
  const json = await getJson<OneResponse>(
    `/anime/${encodeURIComponent(id)}`,
    REVALIDATE_SECONDS.details
  );
  return json?.data?.attributes ? toAnimeItem(json.data) : null;
};

export type Genre = {name: string; slug: string};

export const getGenres = async (id: string): Promise<Genre[]> => {
  const json = await getJson<GenresResponse>(
    `/anime/${encodeURIComponent(id)}/genres`,
    REVALIDATE_SECONDS.details
  );
  return (json?.data ?? []).map((g) => ({
    name: g.attributes.name,
    slug: g.attributes.slug,
  }));
};

/** Popular anime sharing a genre with `excludeId`, for "More like this". */
export const getSimilar = async (
  genreSlug: string | undefined,
  excludeId: string,
  limit = 6
): Promise<AnimeItem[]> => {
  if (!genreSlug) return [];
  const json = await getJson<ListResponse>(
    `/anime?filter[genres]=${encodeURIComponent(
      genreSlug
    )}&sort=popularityRank&page[limit]=${PAGE_SIZE}`,
    REVALIDATE_SECONDS.details
  );
  return toItems(json?.data ?? [])
    .filter((a) => a.id !== excludeId)
    .slice(0, limit);
};

/** Position of `id` in the trending list (1-based), or null. */
export const trendingRank = (trending: AnimeItem[], id: string) => {
  const index = trending.findIndex((a) => a.id === id);
  return index === -1 ? null : index + 1;
};
