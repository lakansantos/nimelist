"use client";
import Image from "next/image";
import {
  FaHeart,
  FaChartLine,
  FaListUl,
  FaClock,
  FaCalendarAlt,
  FaUserShield,
} from "react-icons/fa";

import {useDetails} from "./DetailsContext";
import DetailsGenre from "./DetailsGenre";
import {dateFormat} from "@utils/dates";
import {MdBookmarkBorder} from "react-icons/md";
import {useState} from "react";

const MAX_CHARS = 300;

const DetailsAnimeContent = () => {
  const {anime, genres} = useDetails();

  const {
    averageRating,
    totalLength: duration,
    episodeCount,
    ratingRank,
    ageRating,
    ageRatingGuide,
    startDate,
    endDate,
    status,
    canonicalTitle,
    titles,
    synopsis,
    youtubeVideoId,
  } = anime?.attributes || {};

  const [expanded, setExpanded] = useState(false);

  const detailsContent = [
    {
      label: "Rating",
      value: averageRating ? `${averageRating}%` : "-",
      icon: <FaHeart className="text-yellow-400" />,
    },
    {
      label: "Rank",
      value: ratingRank ? `#${ratingRank}` : "-",
      icon: <FaChartLine className="text-emerald-400" />,
    },
    {
      label: "Episodes",
      value: episodeCount || "Unknown",
      icon: <FaListUl className="text-sky-400" />,
    },
    {
      label: "Aired",
      value: `${dateFormat(startDate || "")} - ${
        status === "current" ? "Ongoing" : dateFormat(endDate || "")
      }`,
      icon: <FaCalendarAlt className="text-purple-400" />,
    },
    {
      label: "Duration",
      value:
        duration && episodeCount
          ? `${duration / episodeCount} min/ep`
          : `${duration} minutes`,
      icon: <FaClock className="text-orange-400" />,
    },
    {
      label: "Age rating",
      value: `${ageRating} ${ageRatingGuide ? `(${ageRatingGuide})` : ""} `,
      icon: <FaUserShield className="text-red-400" />,
    },
  ];

  if (!anime) return;

  const isLong = synopsis && synopsis?.length > MAX_CHARS;
  const displayedText = expanded
    ? synopsis
    : synopsis?.slice(0, MAX_CHARS) + (isLong ? "..." : "");

  const animeTitle = titles?.en ? titles.en : canonicalTitle;
  return (
    <div className="main-container min-h-[50vh] flex-col-reverse flex md:flex-row p-5">
      <div className="relative container-1 w-full md:w-[300px]">
        <div className="static flex flex-col top-[-20%] p-5 h-[700px] w-full bg-default_light md:absolute">
          <div className="image-container relative h-[200px] w-full">
            <Image
              src={anime.attributes.posterImage.original}
              fill
              alt={`${anime.attributes.canonicalTitle} image`}
              className="object-cover"
            />
          </div>
          <div className="details-container flex flex-col gap-5 flex-1 mt-2">
            {detailsContent.map(({label, value, icon}) => (
              <div key={label} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{icon}</span>
                  <span className="font-medium text-sm">{label}:</span>
                  <span className="text-gray-300 text-sm">{value}</span>
                </div>

                <div className="border-b border-gray-500/50" />
              </div>
            ))}

            <DetailsGenre data={genres} />
            <div>
              <button className="bg-sky-800 text-white flex justify-center items-center w-full gap-2 p-3">
                <MdBookmarkBorder className="text-4xl" /> Add to List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Container */}

      <div className="flex-1 flex flex-col gap-2 p-5">
        <div>
          <h2 className="text-4xl text-orange-400">{animeTitle}</h2>
        </div>
        <div className="min-h-[275px]">
          <h3 className="text-gray-400 text-2xl">Synopsis</h3>
          <div className="border-b my-2 border-gray-500/50" />

          <p className="text-gray-300 leading-relaxed">{displayedText}</p>

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-sky-400 hover:text-sky-300 transition-colors"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}

          <div className="border-b mt-2 border-gray-500/50" />
        </div>
        <div>
          <h3 className="text-gray-400 text-2xl">Trailer</h3>
          <div className="border-b my-2 border-gray-500/50" />
          <iframe
            className="w-full lg:w-1/2"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DetailsAnimeContent;
