import {BASE_API_JIKAN_URL} from "@constants/configs";

type AnimeDataResponse = {
  data: AnimeDataResponse[];
};

const useGetTopAnime = async (): Promise<AnimeDataResponse> => {
  const joinedURL = `${BASE_API_JIKAN_URL}/top/anime?filter=bypopularity`;
  const response = await fetch(joinedURL);

  if (!response.ok) {
    return {data: []};
  }
  const json = await response.json();

  return {
    data: json.data,
  };
};

export default useGetTopAnime;
