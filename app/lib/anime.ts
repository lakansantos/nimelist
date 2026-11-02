import {Anime} from "@app-types/anime";

export type AnimeType =
  | "Series"
  | "Movie"
  | "ONA"
  | "OVA"
  | "Special"
  | "Music";
export type AnimeStatus =
  | "Ongoing"
  | "Finished"
  | "Upcoming"
  | "Not yet aired"
  | "TBA";

export const ANIME_TYPES: AnimeType[] = [
  "Series",
  "Movie",
  "ONA",
  "OVA",
  "Special",
];

type PosterSet = {tiny: string; small: string; medium: string; large: string};

/** View model used by every page, with Kitsu's nullable fields resolved. */
export type AnimeItem = {
  id: string;
  title: string;
  titleJa: string | null;
  type: AnimeType;
  year: string | null;
  episodes: number | null;
  episodeLength: number | null;
  status: AnimeStatus;
  ageRating: string | null;
  score: number | null;
  popularityRank: number | null;
  synopsis: string;
  startDate: string | null;
  endDate: string | null;
  trailerId: string | null;
  poster: PosterSet | null;
  /** Wide banner (~4.2:1). Missing on many entries. */
  cover: {large: string; original: string} | null;
  /** Kitsu's suggested vertical offset for the cover, as a CSS position. */
  coverPosition: string;
};

const TYPE_LABELS: Record<string, AnimeType> = {
  TV: "Series",
  movie: "Movie",
  ONA: "ONA",
  OVA: "OVA",
  special: "Special",
  music: "Music",
};

const STATUS_LABELS: Record<string, AnimeStatus> = {
  current: "Ongoing",
  finished: "Finished",
  upcoming: "Upcoming",
  unreleased: "Not yet aired",
  tba: "TBA",
};

const pickTitle = (a: Anime["attributes"]) =>
  a.titles?.en ||
  a.titles?.en_us ||
  a.canonicalTitle ||
  a.titles?.en_jp ||
  a.titles?.ja_jp ||
  "Untitled";

/**
 * Kitsu sometimes sends an image with every sized URL null and only a signed
 * `original` link that expires in minutes (e.g. anime 49877). Our pages are
 * cached far longer than that, so treat such an image as missing.
 */
const pick = (...urls: (string | null | undefined)[]) =>
  urls.find((u): u is string => !!u) ?? null;

export const toAnimeItem = (anime: Anime): AnimeItem => {
  const a = anime.attributes;
  const p = a.posterImage;
  const posterLarge = p && pick(p.large, p.medium, p.small);
  const poster =
    p && posterLarge
      ? {
          tiny: pick(p.tiny, p.small, posterLarge) as string,
          small: pick(p.small, posterLarge) as string,
          medium: pick(p.medium, posterLarge) as string,
          large: posterLarge,
        }
      : null;
  const cover = a.coverImage?.large ? a.coverImage : null;
  const score = a.averageRating ? Number(a.averageRating) : null;
  const coverHeight = cover?.meta?.dimensions?.large?.height;

  return {
    id: anime.id,
    title: pickTitle(a),
    titleJa: a.titles?.ja_jp || null,
    type: TYPE_LABELS[a.showType] ?? "Series",
    year: a.startDate ? a.startDate.slice(0, 4) : null,
    episodes: a.episodeCount || null,
    episodeLength: a.episodeLength || null,
    status: STATUS_LABELS[a.status] ?? "TBA",
    ageRating: a.ageRating || null,
    score: score !== null && !Number.isNaN(score) ? score : null,
    popularityRank: a.popularityRank || null,
    synopsis: a.synopsis || a.description || "",
    startDate: a.startDate || null,
    endDate: a.endDate || null,
    trailerId: a.youtubeVideoId || null,
    poster,
    cover: cover ? {large: cover.large, original: cover.original} : null,
    coverPosition:
      cover && a.coverImageTopOffset && coverHeight
        ? `center ${Math.min(
            100,
            Math.round((a.coverImageTopOffset / coverHeight) * 100)
          )}%`
        : "center 30%",
  };
};

/**
 * Key that groups seasons, parts and arcs of one show, so lists don't show
 * "My Hero Academia", "... Season 2", "... Season 3" back to back.
 */
export const franchiseKey = (title: string): string => {
  let t = title.toLowerCase();
  const colon = t.indexOf(":");
  // "Re:ZERO" keeps its colon; "Demon Slayer: Kimetsu no Yaiba - X Arc" cuts there.
  if (colon >= 4) t = t.slice(0, colon);
  t = t
    .split(
      /\s[-–]\s|\s-(?=\S)|\s\(|\sseason\b|\spart\b|\sfinal\b|\sthe movie\b/
    )[0]
    .replace(/\s\d+$/, "");
  return t.replace(/[^a-z0-9]+/g, " ").trim();
};

export const dedupeFranchises = (items: AnimeItem[]): AnimeItem[] => {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = franchiseKey(item.title);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

// ---------- Display helpers ----------

export const episodesLabel = (item: AnimeItem, short = false): string => {
  if (item.episodes === null) {
    return item.status === "Ongoing" ? "Ongoing" : short ? "—" : "Unknown";
  }
  if (short) return String(item.episodes);
  return `${item.episodes} ${item.episodes === 1 ? "ep" : "eps"}`;
};

export const scoreLabel = (item: AnimeItem): string | null =>
  item.score === null ? null : `${item.score.toFixed(1)}%`;

export const metaLine = (item: AnimeItem, ...parts: (string | null)[]) =>
  [item.year, item.type, ...parts].filter(Boolean).join(" · ");

/** Image for wide slots: the cover, or the poster when Kitsu has no cover. */
export const wideImage = (item: AnimeItem) =>
  item.cover
    ? {src: item.cover.large, isPoster: false}
    : item.poster
    ? {src: item.poster.large, isPoster: true}
    : null;

export const formatAired = (item: AnimeItem): string | null => {
  const fmt = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  if (!item.startDate) return null;
  if (!item.endDate || item.endDate === item.startDate) {
    return item.status === "Ongoing"
      ? `Since ${fmt(item.startDate)}`
      : fmt(item.startDate);
  }
  return `${fmt(item.startDate)} – ${fmt(item.endDate)}`;
};
