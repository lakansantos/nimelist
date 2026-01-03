"use client";
import Image from "next/image";
import React from "react";
import {useDetails} from "./DetailsContext";

const DetailsBanner = () => {
  const {anime} = useDetails();

  if (!anime) return null;
  const {coverImage} = anime.attributes;

  return (
    <div
      className="
  relative w-full overflow-hidden
  h-[25vh]
  sm:h-[35vh]
  md:h-[55vh]
  border-b-2
  border-white/60
"
    >
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
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-orange-500/20" />
    </div>
  );
};

export default DetailsBanner;
