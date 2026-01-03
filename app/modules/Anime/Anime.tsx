"use client";
import React, {lazy} from "react";

import {Anime as AnimeType} from "@app-types/anime";
import {AnimeResponse} from "@app-types/anime";
import Sidebar from "./Sidebar/Sidebar";
import useSidebar from "./Sidebar/useSidebar";

type AnimeProps = {
  animeBannerData: AnimeType[];
  trendingData: AnimeResponse;
  recommendedData: AnimeResponse;
};

// Lazy load tab components
const AnimeHome = lazy(() => import("./AnimeHome/AnimeHome"));
const Trending = lazy(() => import("./AnimeTrending/AnimeTrending"));
const Saved = lazy(() => import("./AnimeSaved/AnimeSaved"));

const Anime = (animeProps: AnimeProps) => {
  const sidebarProps = useSidebar();
  const {current} = sidebarProps;

  // Render function for current tab
  const renderTab = (current: number) => {
    switch (current) {
      case 0:
        return <AnimeHome {...animeProps} />;
      case 1:
        return <Trending data={animeProps.trendingData} />;
      case 2:
        return <Saved />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-10%)] p-5 flex md:flex-row flex-col gap-5">
      <Sidebar {...sidebarProps} />
      <div className="flex flex-1 gap-5 flex-col min-h-[200px] h-fit overflow-hidden">
        {renderTab(current)}
      </div>
    </div>
  );
};

export default Anime;
