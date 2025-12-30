import {BASE_API_KITSU_URL} from "@constants/configs";
import {Anime} from "@app-types/anime";

type AnimeDataResponse = {
  data: Anime[];
};

const useGetBannerAnime = async (): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_KITSU_URL}/anime?page[limit]=20`;
  const response = await fetch(joinedURL);

  if (!response.ok) {
    return {data: []};
  }
  const json = await response.json();

  return {
    data: json.data,
  };
};

export default useGetBannerAnime;
