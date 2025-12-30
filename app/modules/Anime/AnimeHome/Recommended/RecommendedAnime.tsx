"use client";
import {AnimeData} from "@app-types/topAnimeData";
import React from "react";
import RecommendedCardSkeleton from "./RecommendedCardSkeleton";
import useLoad from "./useLoad";
import cx from "classnames";
import removeDuplicateDataByTitle from "@utils/removeDuplicateDataByTitle";
import AnimeNoDataBySection from "@components/Anime/AnimeNoDataBySection";
import RecommendedAnimeCard from "./RecommendedAnimeCard";
import useRecommendedInfiniteScroll from "./useRecommendedInfiniteScroll";
import {IoMdStar} from "react-icons/io";

type AnimeCardsContainerProps = {
  data: AnimeData[];
  title: string;
};

const INITIAL_COUNT = 9;
const LOAD_INCREMENT = 10; // how many more to load per scroll

const RecommendedAnime = ({data, title}: AnimeCardsContainerProps) => {
  const {load, setLoad} = useLoad();

  const filteredData = removeDuplicateDataByTitle(data);

  const {visibleCount} = useRecommendedInfiniteScroll(
    filteredData,
    INITIAL_COUNT,
    LOAD_INCREMENT
  );

  if (!data || data.length === 0) return <AnimeNoDataBySection />;

  const visibleData = filteredData.slice(0, visibleCount);

  return (
    <>
      <div
        className={cx("flex flex-col mb-6 max-w-full", {
          hidden: !load,
          flex: load,
        })}
      >
        <div className="mb-5 flex items-center gap-1">
          <IoMdStar className="text-white text-3xl" />
          <p className="text-3xl text-white font-thin"> {title}</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {visibleData.map((item, index) => (
            <RecommendedAnimeCard
              item={item}
              setLoad={setLoad}
              key={`${index}-${item.mal_id}`}
            />
          ))}
        </div>
      </div>

      <RecommendedCardSkeleton load={load} cards={INITIAL_COUNT} />
    </>
  );
};

export default RecommendedAnime;
