import {Anime} from "@app-types/anime";
import useSave from "@hooks/useSave";
import {extractYear} from "@utils/dates";
import Image from "next/image";
import React, {useState} from "react";

import {MdBookmarkBorder, MdBookmark} from "react-icons/md";

const AnimeTrendingCard = ({
  item,
  setLoad,
}: {
  item: Anime;
  setLoad: (load: boolean) => void;
}) => {
  const {titles, ageRating, startDate, canonicalTitle, coverImage} =
    item.attributes;

  const savedItemDetails = {
    title: canonicalTitle,
    id: item.id,
    year: startDate,
    image: coverImage,
  };
  const {isSaved, onSave} = useSave(savedItemDetails);
  return (
    <a
      href={item.id}
      className="group relative h-[200px] min-w-[400px] w-full overflow-hidden"
    >
      {/* Image wrapper */}
      <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-110">
        <Image
          priority
          fill
          sizes="(max-width: 640px) 100vw, 300px"
          src={coverImage.original}
          alt={`${titles.en} image`}
          className="object-cover transition-transform duration-300"
          onLoad={() => setLoad(true)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-0" />
      </div>

      <button
        type="button"
        className="
          absolute top-3 right-3 z-30
          scale-90
          transition-all duration-200
          pointer-events-auto
          text-white hover:text-yellow-400
        "
        onClick={(e) => {
          e.preventDefault(); // prevent <a> navigation
          e.stopPropagation();
          onSave();
        }}
      >
        {isSaved ? (
          <MdBookmark className="text-4xl" />
        ) : (
          <MdBookmarkBorder className="text-4xl" />
        )}
      </button>

      {/* Text content */}
      <div className="absolute bottom-0 left-0 z-20 p-5 w-full flex flex-col pointer-events-none">
        <p className="text-sm text-white">
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
