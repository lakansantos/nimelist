import React from "react";
import Image from "next/image";
import {MdDelete} from "react-icons/md";
import {SavedAnime} from "@app-types/savedAnime";

type Props = {
  item: SavedAnime;
  onRemove: (id: string) => void;
};

const AnimeSavedCard = ({item, onRemove}: Props) => {
  return (
    <a
      href={`/${item.id}`}
      className="relative h-[200px] min-w-[400px] w-full overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-full w-full">
        <Image
          fill
          src={item.image.original}
          alt={item.title}
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:opacity-0" />
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(item.id);
        }}
        className="absolute top-3 right-3 z-30 text-white hover:text-red-500 p-1 rounded-full bg-black/40 backdrop-blur-sm"
      >
        <MdDelete className="text-3xl" />
      </button>

      {/* Text */}
      <div className="absolute bottom-0 left-0 z-20 p-5 flex flex-col justify-end items-start pointer-events-none">
        <p className="text-sm text-white">{item.year}</p>
        <p className="md:text-2xl text-white font-semibold">{item.title}</p>
      </div>
    </a>
  );
};

export default AnimeSavedCard;
