"use client";
import {AnimeData} from "@app-types/topAnimeData";
import Image from "next/image";
import React, {useState} from "react";
import RecommendedCardSkeleton from "./RecommendedCardSkeleton";
import useLoad from "./useLoad";
import cx from "classnames";
import removeDuplicateDataByTitle from "@utils/removeDuplicateDataByTitle";
import AnimeNoDataBySection from "@components/Anime/AnimeNoDataBySection";
import {IoChevronDown, IoChevronUp} from "react-icons/io5";

type AnimeCardsContainerProps = {
  data: AnimeData[];
  title: string;
};

const INITIAL_COUNT = 10;

const RecommendedAnimeToggle = ({data, title}: AnimeCardsContainerProps) => {
  const {load, setLoad} = useLoad();
  const [showAll, setShowAll] = useState(false);

  const filteredData = removeDuplicateDataByTitle(data);

  if (!data || data.length === 0) return <AnimeNoDataBySection />;

  const visibleData = showAll
    ? filteredData
    : filteredData.slice(0, INITIAL_COUNT);

  return (
    <>
      <div
        className={cx("flex flex-col mb-6 max-w-full", {
          hidden: !load,
          flex: load,
        })}
      >
        <h2 className="text-3xl font-thin text-white mb-5">{title}</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {visibleData.map((item, index) => (
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

        {filteredData.length > INITIAL_COUNT && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="mt-6 flex gap-4 self-start bg-white border px-7 py-2
             text-sm text-black hover:bg-gray-200 transition"
          >
            {showAll ? (
              <IoChevronUp className="text-xl" />
            ) : (
              <IoChevronDown className="text-xl" />
            )}
            <span>{showAll ? "See less" : "See all"}</span>
          </button>
        )}
      </div>

      <RecommendedCardSkeleton load={load} cards={INITIAL_COUNT} />
    </>
  );
};

export default RecommendedAnimeToggle;
