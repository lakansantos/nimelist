import {AnimeResponse} from "@app-types/anime";
import {BASE_API_KITSU_URL} from "@constants/configs";

type AnimeDataResponse = {
  data: AnimeResponse;
};

const useGetRecommendedAnime = async (): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_KITSU_URL}/anime?sort=-averageRating&page[limit]=20`;
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
