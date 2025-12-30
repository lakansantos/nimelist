import {Anime} from "@app-types/anime";
import {BASE_API_KITSU_URL} from "@constants/configs";

type AnimeDataResponse = {
  data?: Anime | null;
};

const useGetDetail = async (id: string): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_KITSU_URL}/anime/${id}`;

  const response = await fetch(joinedURL);

  if (!response.ok) {
    return {data: null};
  }

  const json = await response.json();

  return {
    data: json.data,
  };
};

export default useGetDetail;
