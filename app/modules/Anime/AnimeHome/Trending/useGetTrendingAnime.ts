import {BASE_API_KITSU_URL} from "@constants/configs";
import {AnimeResponse} from "@app-types/anime";

type AnimeDataResponse = {
  data: AnimeResponse;
};

const useGetTrendingAnime = async (): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_KITSU_URL}/trending/anime?limit=20`;
  const response = await fetch(joinedURL);

  if (!response.ok) {
    return {data: []};
  }
  const json = await response.json();

  return {
    data: json.data,
  };
};

export default useGetTrendingAnime;
