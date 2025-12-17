import {BASE_API_ANIME_URL} from "@constants/configs";

type AnimeDataResponse = {
  data: AnimeData[];
};

const useGetTrending = async (): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_ANIME_URL}/top/anime`;
  const response = await fetch(joinedURL);

  if (!response.ok) {
    return {data: []};
  }
  const json = await response.json();

  return {
    data: json.data,
  };
};

export default useGetTrending;
