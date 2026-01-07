export const ANIME_FILTER_TYPES = {
  TV: "Series",
  movie: "Movie",
  ONA: "ONA",
  all: "all",
};

export const ANIME_STATUS_TYPE = {
  finished: "Finished",
  current: "Ongoing",
};

export const NAV_ANIME_FILTER_TYPES = [
  {label: "All", value: "all"},
  {label: "Series", value: "TV"},
  {label: "Movie", value: "movie"},
] as const;
