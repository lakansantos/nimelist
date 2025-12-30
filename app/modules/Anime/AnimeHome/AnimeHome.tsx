import React from "react";
import Banner from "@modules/Anime/AnimeHome/Banner/Banner";
import AnimeNoData from "@components/Anime/AnimeNoData";
import TrendingAnime from "@modules/Anime/AnimeHome/Trending/TrendingAnime";
import RecommendedAnime from "@modules/Anime/AnimeHome/Recommended/RecommendedAnime";
import {Anime as AnimeType} from "@app-types/anime";
import {AnimeResponse} from "@app-types/anime";
import {AnimeData} from "@app-types/topAnimeData";

type AnimeProps = {
  animeBannerData: AnimeType[];
  trendingData: AnimeResponse;
  recommendedData: AnimeData[];
};
const AnimeHome = ({
  trendingData,
  animeBannerData,
  recommendedData,
}: AnimeProps) => {
  const bothEmptyData =
    (trendingData.length === 0 || !trendingData) &&
    (recommendedData.length === 0 || !recommendedData);

  return (
    <>
      <Banner data={animeBannerData} />
      {bothEmptyData ? (
        <AnimeNoData />
      ) : (
        <>
          <TrendingAnime title="Trending" data={trendingData} />
          <RecommendedAnime
            title="Recommended for you"
            data={recommendedData}
          />
        </>
      )}
    </>
  );
};

export default React.memo(AnimeHome);
