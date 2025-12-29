import {Anime} from "@app-types/anime";
import {extractYear} from "@utils/dates";
import Image from "next/image";
import React from "react";

const TrendingAnimeCard = ({
  item,
  setLoad,
}: {
  item: Anime;
  setLoad: (load: boolean) => void;
}) => {
  const {titles, ageRating, startDate, canonicalTitle, coverImage} =
    item.attributes;
  return (
    <div className="relative h-[200px] min-w-[400px] w-[400px] object-cover rounded-lg">
      <Image
        priority
        fill
        sizes="400px"
        src={coverImage.original}
        alt={`${titles.en} image`}
        className="h-[200px] min-w-[400px] w-[400px] object-cover rounded-lg"
        onLoad={() => setLoad(true)}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Text content */}
      <div className="relative z-20 h-full flex flex-col justify-end items-start p-5">
        <p className="text-sm text-white max-w-4xl">
          {extractYear(startDate)} · {ageRating}
        </p>
        <p className="md:text-2xl text-white">
          {titles.en_us ?? canonicalTitle ?? titles.en_jp}
        </p>
      </div>
    </div>
  );
};

export default TrendingAnimeCard;
