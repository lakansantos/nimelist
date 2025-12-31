import {Anime} from "@app-types/anime";
import {extractYear} from "@utils/dates";
import Image from "next/image";
import React from "react";
import {MdBookmark, MdBookmarkBorder} from "react-icons/md";
import useSave, {SavedAnime} from "@hooks/useSave";

const TrendingAnimeCard = ({
  item,
  setLoad,
}: {
  item: Anime;
  setLoad: (load: boolean) => void;
}) => {
  const {titles, ageRating, startDate, canonicalTitle, coverImage} =
    item.attributes;

  const saveItem: SavedAnime = {
    id: item.id,
    title: titles.en_us ?? canonicalTitle ?? titles.en_jp ?? "",
    year: startDate,
    image: coverImage,
  };

  const {isSaved, onSave} = useSave(saveItem);

  return (
    <a
      href={item.id}
      className="relative h-[200px] min-w-[400px] w-[400px] rounded-lg overflow-hidden cursor-pointer"
    >
      {/* Image wrapper */}
      <div className="relative h-full w-full transition-transform duration-300 hover:scale-110">
        <Image
          priority
          fill
          sizes="400px"
          src={coverImage.original}
          alt={`${titles.en} image`}
          className="object-cover rounded-lg"
          onLoad={() => setLoad(true)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 hover:opacity-0" />
      </div>

      {/* Save button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onSave();
        }}
        className="absolute top-3 right-3 z-30 text-white hover:text-yellow-400 p-1 rounded-full bg-black/40 backdrop-blur-sm"
      >
        {isSaved ? (
          <MdBookmark className="text-3xl" />
        ) : (
          <MdBookmarkBorder className="text-3xl" />
        )}
      </button>

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

export default TrendingAnimeCard;
