"use client";
import Image from "next/image";
import React from "react";
import {useDetails} from "./DetailsContext";
import {PiImageBroken} from "react-icons/pi";
import useDetailsBannerLoad from "./useDetailsBannerLoad";
import classNames from "classnames";

const DetailsBanner = () => {
  const {anime} = useDetails();
  const {load, setLoad} = useDetailsBannerLoad();

  if (!anime) return null;
  const {coverImage} = anime.attributes;

  return (
    <div className="relative w-full overflow-hidden h-[25vh] md:h-[35vh] border-b-2 border-white/60">
      {coverImage ? (
        <>
          <div
            className={classNames("", {
              "opacity-100": load,
              "opacity-0": !load,
            })}
          >
            {/* Background image */}
            <Image
              src={coverImage.original}
              alt="Banner"
              fill
              priority
              sizes="100vw"
              onLoad={() => setLoad(true)}
              className="object-cover object-center scale-105 saturate-125 contrast-110"
            />
            {/* Color overlay (anime glow) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-orange-500/20" />
          </div>
          {/* Banner Skeleton */}
          <div
            className={classNames(
              "absolute inset-0 bg-gray-800 rounded-md animate-pulse z-9",
              {
                "opacity-100": !load,
                hidden: load,
              }
            )}
          />
        </>
      ) : (
        <div className="self-center h-full flex justify-center items-center gap-2 flex-col z-20">
          <PiImageBroken className="text-5xl" />
          <span>No cover image</span>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
