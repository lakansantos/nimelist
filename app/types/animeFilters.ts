export const ANIME_FILTER_TYPES = {
  TV: "Series",
  movie: "Movie",
  all: "all",
};

export const NAV_ANIME_FILTER_TYPES = [
  {label: "All", value: "all"},
  {label: "Series", value: "TV"},
  {label: "Movie", value: "movie"},
] as const;
