"use client";
import {AnimeData} from "@app-types/topAnimeData";
import Image from "next/image";
import React from "react";
import RecommendedCardSkeleton from "./RecommendedCardSkeleton";
import useLoad from "./useLoad";
import cx from "classnames";
import removeDuplicateDataByTitle from "@utils/removeDuplicateDataByTitle";
import AnimeNoData from "@components/Anime/AnimeNoData";

type AnimeCardsContainerProps = {
  data: AnimeData[];
  title: string;
};

const RecommendedAnime = ({data, title}: AnimeCardsContainerProps) => {
  const {load, setLoad} = useLoad();

  const filteredData = removeDuplicateDataByTitle(data);

  if (data.length === 0 || !data) return <AnimeNoData />;
  return (
    <>
      <div
        className={cx("flex flex-col max-w-full", {
          hidden: !load,
          flex: load,
        })}
      >
        <h2 className="text-3xl font-thin text-white mb-5">{title}</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {filteredData.map((item, index) => (
            <div key={`${index}-${item.mal_id}`} className="w-full">
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                <Image
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  priority
                  onLoad={() => setLoad(true)}
                  src={item.entry[0].images.jpg.large_image_url}
                  alt={`${item.entry[0].title} cover`}
                  className="object-cover"
                />
              </div>

              <p className="mt-2 text-white text-sm">{item.entry[0].title}</p>
            </div>
          ))}
        </div>
      </div>

      <RecommendedCardSkeleton load={load} cards={10} />
    </>
  );
};

export default RecommendedAnime;
