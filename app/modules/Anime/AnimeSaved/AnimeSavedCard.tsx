import React from "react";
import Image from "next/image";
import {MdDelete} from "react-icons/md";
import {SavedAnime} from "@app-types/savedAnime";
import {dateFormat} from "@utils/dates";

type Props = {
  item: SavedAnime;
  onRemove: (id: string) => void;
};

const AnimeSavedCard = ({item, onRemove}: Props) => {
  return (
    <a
      href={`/${item.id}`}
      className="relative h-[200px] md:min-w-[400px] w-full overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-full w-full">
        <Image
          fill
          src={item.image.original}
          alt={item.title}
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 group-hover:opacity-0" />
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
      <div className="absolute bottom-0 left-0 z-20 w-full p-5 flex flex-col justify-end items-start pointer-events-none">
        <p className="text-sm text-white">
          {dateFormat(item.year as string, "MMMM DD, YYYY")}
        </p>
        <p className="text-white w-full whitespace-wrap">{item.title}</p>
      </div>
    </a>
  );
};

export default AnimeSavedCard;
