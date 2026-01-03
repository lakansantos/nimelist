"use client";
import {Anime} from "@app-types/anime";
import Image from "next/image";
import React from "react";
import useLoadDetails from "./useLoadDetails";

const DetailsBanner = ({data}: {data: Anime}) => {
  const {coverImage} = data.attributes;

  const {load, setLoad} = useLoadDetails();

  console.log("load", load);

  return (
    <div
      className="
  relative w-full overflow-hidden
  h-[25vh]
  sm:h-[35vh]
  md:h-[55vh]
"
    >
      {/* Background image */}
      <Image
        src={coverImage.original}
        alt="Banner"
        fill
        onLoad={() => setLoad(true)}
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
