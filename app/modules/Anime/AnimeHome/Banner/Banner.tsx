"use client";

import {Anime} from "@app-types/anime";
import cx from "classnames";
import Image from "next/image";
import React from "react";
import {IoIosInformationCircleOutline} from "react-icons/io";
import useFade from "./useFade";
import {extractYear} from "@utils/dates";
import {MdLocalMovies} from "react-icons/md";
import classNames from "classnames";
import BannerSkeleton from "./BannerSkeleton";
import {useRouter} from "next/navigation";

const types = {
  TV: "Series",
  movie: "Movie",
};

const Banner = ({data}: {data: Anime[]}) => {
  const filteredData = data.filter(
    (item) => item.attributes?.coverImage != null
  );

  const {currentIndex, fade, load, setLoad} = useFade(filteredData);

  const router = useRouter();

  if (data.length === 0) {
    return;
  }

  const {
    coverImage,
    titles,
    description,
    canonicalTitle,
    startDate,
    episodeCount,
    showType,
  } = filteredData[currentIndex].attributes;

  const type = types[showType];

  return (
    <>
      <div
        className={classNames("relative h-[55vh] overflow-hidden rounded-lg", {
          hidden: !load,
          flex: load,
        })}
      >
        <Image
          key={currentIndex} // forces remount
          src={coverImage.original}
          alt="Banner"
          fill
          sizes="400px"
          onLoad={() => setLoad(true)}
          className={cx(
            "object-cover transition-opacity duration-1000 ease-out",
            {
              "opacity-100": fade,
              "opacity-0": !fade,
            }
          )}
          priority
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Fade bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[32px] z-20 bg-gradient-to-t from-default_blue to-transparent" />

        {/* Text content */}
        <div
          className={cx(
            "relative z-30 h-full w-full flex flex-col justify-end pb-[40px] md:lg:pb-[70px] items-start p-5 transition-opacity duration-1000 ease-out",
            {
              "opacity-100": fade,
              "opacity-0": !fade,
            }
          )}
        >
          <div className="text-5xl md:text-7xl text-white max-w-[100%] lg:max-w-[50%] h-fit">
            <p className="overflow-hidden whitespace-nowrap text-ellipsis leading-snug">
              {" "}
              {titles.en ?? canonicalTitle ?? titles.en_us ?? titles.ja_jp}
            </p>
          </div>
          <div className="text-2sm mb-2 inline-flex items-center font-thin text-white max-w-full md:max-w-[50%] gap-2">
            <span>{extractYear(startDate)}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <MdLocalMovies className="inline align-middle" /> {type}
            </span>
            <span>·</span>
            <span>
              {episodeCount} {episodeCount === 1 ? "episode" : "episodes"}
            </span>
          </div>

          <p className="text-4xl md:text-2xl font-thin text-white max-w-full md:max-w-[50%] line-clamp-4">
            {description}
          </p>

          <div className="mt-5">
            <button
              className="bg-white text-black px-5 py-2 w-fit flex flex-row justify-center items-center gap-2"
              aria-label="More information about this anime"
              onClick={() => router.push(`/${filteredData[currentIndex].id}`)}
            >
              <IoIosInformationCircleOutline className="text-3xl" />{" "}
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>

      <BannerSkeleton load={load} />
    </>
  );
};

export default Banner;
