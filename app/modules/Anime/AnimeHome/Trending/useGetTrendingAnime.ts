import {BASE_API_KITSU_URL, REVALIDATE_SECONDS} from "@constants/configs";
import {AnimeResponse} from "@app-types/anime";

type AnimeDataResponse = {
  data: AnimeResponse;
};

const useGetTrendingAnime = async (): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_KITSU_URL}/trending/anime?limit=30`;
  const response = await fetch(joinedURL, {
    next: {revalidate: REVALIDATE_SECONDS.lists},
  });

  if (!response.ok) {
    return {data: []};
  }
  const json = await response.json();

  return {
    data: json.data,
  };
};

export default useGetTrendingAnime;
