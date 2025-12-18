import {AnimeData} from "@app-types/topAnimeData";
import {BASE_API_JIKAN_URL} from "@constants/configs";

type AnimeDataResponse = {
  data: AnimeData[];
};

const useGetRecommendedAnime = async (): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_JIKAN_URL}/recommendations/anime`;
  const response = await fetch(joinedURL);

  if (!response.ok) {
    return {data: []};
  }
  const json = await response.json();

  return {
    data: json.data,
  };
};

export default useGetRecommendedAnime;
