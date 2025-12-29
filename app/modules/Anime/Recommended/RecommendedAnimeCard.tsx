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
    <div className="w-full">
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
  );
};

export default RecommendedAnimeCard;
