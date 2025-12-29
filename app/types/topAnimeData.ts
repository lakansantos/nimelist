export type AnimeEntry = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
};

export type AnimeData = {
  mal_id: string;
  entry: AnimeEntry[];
  content: string;
  date: string;
  user: {
    url: string;
    username: string;
  };
};

export type AnimeDetailData = AnimeEntry & Pick<AnimeData, "mal_id">;
