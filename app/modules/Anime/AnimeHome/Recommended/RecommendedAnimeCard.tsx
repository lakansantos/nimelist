import {AnimeData} from "@app-types/topAnimeData";
import Image from "next/image";
import React from "react";

const RecommendedAnimeCard = ({
  item,
  setLoad,
}: {
  item: AnimeData;
  setLoad: (load: boolean) => void;
}) => {
  return (
    <a href={`/recommended/${item.entry[0].mal_id}`} className="w-full">
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
  );
};

export default RecommendedAnimeCard;
