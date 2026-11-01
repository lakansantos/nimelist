import {ANIME_TYPES, AnimeItem, AnimeType} from "@lib/anime";
import {getTopRated, getTrending} from "@lib/kitsu";

export type BrowseList = "trending" | "top";
export type BrowseType = AnimeType | "All";
export type BrowseView = "table" | "grid";

export type BrowseParams = {
  list: BrowseList;
  type: BrowseType;
  view: BrowseView;
};

export const BROWSE_TYPES: BrowseType[] = ["All", ...ANIME_TYPES];

type RawParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export const parseBrowseParams = (raw: RawParams): BrowseParams => {
  const list = first(raw.list) === "top" ? "top" : "trending";
  const typeRaw = first(raw.type);
  const type = BROWSE_TYPES.find((t) => t === typeRaw) ?? "All";
  const view = first(raw.view) === "grid" ? "grid" : "table";
  return {list, type, view};
};

export const browseHref = (
  params: BrowseParams,
  change: Partial<BrowseParams>
) => {
  const next = {...params, ...change};
  const query = new URLSearchParams();
  if (next.list !== "trending") query.set("list", next.list);
  if (next.type !== "All") query.set("type", next.type);
  if (next.view !== "table") query.set("view", next.view);
  const qs = query.toString();
  return `/browse${qs ? `?${qs}` : ""}`;
};

export type BrowseData = {
  items: AnimeItem[];
  /** Rank of each item in the unfiltered list. */
  ranks: number[];
  counts: Record<BrowseType, number>;
  listLabel: string;
};

export const loadBrowse = async (params: BrowseParams): Promise<BrowseData> => {
  const all =
    params.list === "top" ? await getTopRated(2) : await getTrending();
  const ranked = all.map((item, i) => ({item, rank: i + 1}));
  const filtered = ranked.filter(
    ({item}) => params.type === "All" || item.type === params.type
  );
  const counts = Object.fromEntries(
    BROWSE_TYPES.map((t) => [
      t,
      t === "All" ? all.length : all.filter((a) => a.type === t).length,
    ])
  ) as Record<BrowseType, number>;
  return {
    items: filtered.map((f) => f.item),
    ranks: filtered.map((f) => f.rank),
    counts,
    listLabel: params.list === "top" ? "Top rated" : "Trending",
  };
};

export const pluralType = (type: BrowseType) =>
  ({
    All: "anime",
    Series: "series",
    Movie: "movies",
    ONA: "ONAs",
    OVA: "OVAs",
    Special: "specials",
    Music: "music videos",
  })[type];
