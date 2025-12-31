"use client";

import {AnimeData} from "@app-types/topAnimeData";
import Image from "next/image";
import React from "react";
import {MdBookmark, MdBookmarkBorder} from "react-icons/md";
import useRecommendationSave, {
  RecommendedSavedAnime,
} from "./useRecommendationSave";

const RecommendedAnimeCard = ({
  item,
  setLoad,
}: {
  item: AnimeData;
  setLoad: (load: boolean) => void;
}) => {
  const saveItem: RecommendedSavedAnime = {
    id: item.entry[0].mal_id,
    title: item.entry[0].title,
    image: item.entry[0].images.jpg.large_image_url,
  };

  const {isSaved, onSave} = useRecommendationSave(saveItem);

  return (
    <div className="relative group w-full">
      <a href={`/recommended/${item.entry[0].mal_id}`} className="w-full block">
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            priority
            onLoad={() => setLoad(true)}
            src={item.entry[0].images.jpg.large_image_url}
            alt={`${item.entry[0].title} cover`}
            className="object-cover cursor-pointer scale-100 hover:scale-110 transition-transform duration-300"
          />
        </div>
        <p className="mt-2 text-white text-sm overflow-hidden whitespace-nowrap text-ellipsis leading-snug">
          {item.entry[0].title}
        </p>
      </a>

      {/* Save icon */}
      <button
        type="button"
        className="absolute top-3 right-3 z-30 bg-black/40 p-2 rounded-full text-white hover:text-yellow-400"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSave();
        }}
      >
        {isSaved ? <MdBookmark size={24} /> : <MdBookmarkBorder size={24} />}
      </button>
    </div>
  );
};

export default RecommendedAnimeCard;
