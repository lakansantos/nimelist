import {AnimeDetailData} from "@app-types/topAnimeData";
import {BASE_API_JIKAN_URL} from "@constants/configs";

type AnimeDataResponse = {
  data?: AnimeDetailData | null;
};

const useGetRecommendedDetailById = async (
  id: string
): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_JIKAN_URL}/anime/${id}`;

  const response = await fetch(joinedURL);

  if (!response.ok) {
    return {data: null};
  }

  const json = await response.json();

  return {
    data: json.data,
  };
};

export default useGetRecommendedDetailById;
