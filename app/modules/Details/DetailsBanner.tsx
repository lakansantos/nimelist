"use client";
import Image from "next/image";
import React from "react";
import {useDetails} from "./DetailsContext";
import {PiImageBroken} from "react-icons/pi";

const DetailsBanner = () => {
  const {anime} = useDetails();

  if (!anime) return null;
  const {coverImage} = anime.attributes;

  return (
    <div
      className="
  relative w-full overflow-hidden
  h-[25vh]
  md:h-[35vh]
  border-b-2
  border-white/60
"
    >
      {coverImage ? (
        <>
          {/* Background image */}
          <Image
            src={coverImage.original}
            alt="Banner"
            fill
            priority
            sizes="100vw"
            className="
    object-cover object-center
    scale-105
    saturate-125 contrast-110
  "
          />
          {/* Color overlay (anime glow) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-orange-500/20" />{" "}
        </>
      ) : (
        <div className="self-center h-full flex justify-center items-center gap-2 flex-col">
          <PiImageBroken className="text-5xl" /> <span> No cover image</span>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
