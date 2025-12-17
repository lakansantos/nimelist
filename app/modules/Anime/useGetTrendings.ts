import {BASE_API_ANIME_URL} from "@/app/constants/configs";

const useGetTrending = async () => {
  const joinedURL = `${BASE_API_ANIME_URL}/top/anime`;

  const response = await fetch(joinedURL);
  const {data} = response.ok ? await response.json() : [];

  return {
    data,
  };
};

export default useGetTrending;
