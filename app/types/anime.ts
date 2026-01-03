// ==============================
// Kitsu Anime Types
// ==============================

export type AnimeResponse = Anime[];

// ---------- Main ----------
export interface Anime {
  id: string;
  type: "anime";
  links: {
    self: string;
  };
  attributes: AnimeAttributes;
  relationships: AnimeRelationships;
}

// ---------- Attributes ----------
export interface AnimeAttributes {
  createdAt: string;
  updatedAt: string;
  slug: string;
  synopsis: string;
  description: string;
  coverImageTopOffset: number;

  titles: AnimeTitles;
  canonicalTitle: string;
  abbreviatedTitles: string[];

  averageRating: string;
  ratingFrequencies: Record<string, string>;

  userCount: number;
  favoritesCount: number;

  startDate: string;
  endDate: string | null;
  nextRelease: string | null;

  popularityRank: number;
  ratingRank: number;

  ageRating: string;
  ageRatingGuide: string;

  subtype: string;
  status: "current" | "finished";
  tba: string | null;

  posterImage: ImageSet;
  coverImage: ImageSet;

  episodeCount: number;
  episodeLength: number;
  totalLength: number;

  youtubeVideoId: string;
  showType: "TV" | "movie";
  nsfw: boolean;
}

// ---------- Titles ----------
export interface AnimeTitles {
  en?: string;
  en_jp?: string;
  en_us?: string;
  ja_jp?: string;
}

// ---------- Images ----------
export interface ImageSet {
  tiny: string;
  small?: string;
  medium?: string;
  large: string;
  original: string;
  meta: {
    dimensions: {
      tiny: ImageDimensions;
      small?: ImageDimensions;
      medium?: ImageDimensions;
      large: ImageDimensions;
    };
  };
}

export interface ImageDimensions {
  width: number;
  height: number;
}

// ---------- Relationships ----------
export interface AnimeRelationships {
  genres: RelationshipLinks;
  categories: RelationshipLinks;
  castings: RelationshipLinks;
  installments: RelationshipLinks;
  mappings: RelationshipLinks;
  reviews: RelationshipLinks;
  mediaRelationships: RelationshipLinks;
  characters: RelationshipLinks;
  staff: RelationshipLinks;
  productions: RelationshipLinks;
  quotes: RelationshipLinks;
  episodes: RelationshipLinks;
  streamingLinks: RelationshipLinks;
  animeProductions: RelationshipLinks;
  animeCharacters: RelationshipLinks;
  animeStaff: RelationshipLinks;
}

// ---------- Relationship Links ----------
export interface RelationshipLinks {
  links: {
    self: string;
    related: string;
  };
}

export interface Genres {
  id: string;
  type: string;
  links: {
    self: string;
  };
  attributes: {
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    description: string;
  };
}
