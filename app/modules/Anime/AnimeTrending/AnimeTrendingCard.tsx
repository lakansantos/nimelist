import {Anime} from "@app-types/anime";
import {extractYear} from "@utils/dates";
import Image from "next/image";
import React from "react";

const AnimeTrendingCard = ({
  item,
  setLoad,
}: {
  item: Anime;
  setLoad: (load: boolean) => void;
}) => {
  const {titles, ageRating, startDate, canonicalTitle, coverImage} =
    item.attributes;

  return (
    <a
      href={item.id}
      className="relative h-[200px] min-w-[400px] w-full overflow-hidden"
    >
      {/* Image wrapper */}
      <div className="relative w-full h-full  transition-transform duration-300 hover:scale-110">
        <Image
          priority
          fill
          sizes="(max-width: 640px) 100vw, 300px"
          src={coverImage.original}
          alt={`${titles.en} image`}
          className="object-cover cursor-pointer scale-100 hover:scale-110 transition-transform duration-300"
          onLoad={() => setLoad(true)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 hover:opacity-0" />
      </div>

      {/* Text content */}
      <div className="absolute bottom-0 left-0 z-20 p-5 w-full flex flex-col justify-end items-start pointer-events-none">
        <p className="text-sm text-white max-w-4xl">
          {extractYear(startDate)} · {ageRating}
        </p>
        <p className="md:text-2xl text-white font-semibold">
          {titles.en_us ?? canonicalTitle ?? titles.en_jp}
        </p>
      </div>
    </a>
  );
};

export default AnimeTrendingCard;
