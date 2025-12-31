"use client";

import React from "react";
import Image from "next/image";
import {MdDelete} from "react-icons/md";
import {RecommendedSavedAnime} from "../AnimeHome/Recommended/useRecommendationSave";

interface Props {
  item: RecommendedSavedAnime;
  onRemove: (id: string) => void;
}

const AnimeSavedRecommendationCard = ({item, onRemove}: Props) => {
  return (
    <div className="relative group w-[400px] ">
      <a href={`/recommended/${item.id}`} className="w-full block">
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
          <Image
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            src={item.image}
            alt={item.title}
            className="object-cover cursor-pointer scale-100 hover:scale-110 transition-transform duration-300"
          />
        </div>
        <p className="mt-2 text-white text-sm overflow-hidden whitespace-nowrap text-ellipsis leading-snug">
          {item.title}
        </p>
      </a>

      {/* Save / Remove icon */}
      <button
        type="button"
        className="absolute top-3 right-3 z-30 bg-black/40 p-2 rounded-full text-white hover:text-yellow-400"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(item.id as string);
        }}
      >
        <MdDelete size={24} />
      </button>
    </div>
  );
};

export default AnimeSavedRecommendationCard;
