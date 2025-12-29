import {AnimeDetailData} from "@app-types/topAnimeData";
import React from "react";

const RecommendedDetailPage = ({data}: {data?: AnimeDetailData | null}) => {
  if (data === null || !data) {
    return "No data";
  }

  const {mal_id, title} = data;

  return (
    <div className="relative min-h-[calc(100vh-10%)] bg-default_blue text-white p-5 flex md:flex-row flex-col gap-5">
      {title} {mal_id}
    </div>
  );
};

export default RecommendedDetailPage;
