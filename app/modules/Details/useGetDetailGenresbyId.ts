import {Genres} from "@app-types/anime";
import {BASE_API_KITSU_URL} from "@constants/configs";

type AnimeDataResponse = {
  data?: Genres[] | null;
};

const useGetDetailGenresbyId = async (
  id: string
): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_KITSU_URL}/anime/${id}/genres`;

  const response = await fetch(joinedURL);

  if (!response.ok) {
    return {data: null};
  }

  const json = await response.json();

  return {
    data: json.data,
  };
};

export default useGetDetailGenresbyId;
