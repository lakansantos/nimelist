import React from "react";
import Banner from "@modules/Anime/Banner/Banner";
import AnimeNoData from "@components/Anime/AnimeNoData";
import TrendingAnime from "@modules/Anime/Trending/TrendingAnime";
import RecommendedAnime from "@modules/Anime/Recommended/RecommendedAnime";

import {Anime as AnimeType} from "@app-types/anime";
import {AnimeResponse} from "@app-types/anime";
import {AnimeData} from "@app-types/topAnimeData";

type AnimeProps = {
  animeData: AnimeType[];
  trendingData: AnimeResponse;
  recommendedData: AnimeData[];
};
const Anime = ({animeData, trendingData, recommendedData}: AnimeProps) => {
  const bothEmptyData =
    (trendingData.length === 0 || !trendingData) &&
    (recommendedData.length === 0 || !recommendedData);
  return (
    <div className="flex flex-1 gap-5 flex-col min-h-[200px] h-fit overflow-hidden">
      <Banner data={animeData} />
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
    </div>
  );
};

export default Anime;
