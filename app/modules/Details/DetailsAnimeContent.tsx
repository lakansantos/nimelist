"use client";

import Image from "next/image";
import {useState} from "react";
import {
  FaHeart,
  FaChartLine,
  FaListUl,
  FaClock,
  FaCalendarAlt,
  FaUserShield,
} from "react-icons/fa";
import {MdBookmark, MdBookmarkBorder} from "react-icons/md";

import {useDetails} from "./DetailsContext";
import DetailsGenre from "./DetailsGenre";
import {dateFormat} from "@utils/dates";
import {ANIME_FILTER_TYPES} from "@app-types/animeFilters";
import useSave from "@hooks/useSave";

const MAX_CHARS = 300;

const DetailsAnimeContent = () => {
  const {anime, genres} = useDetails();
  const [expanded, setExpanded] = useState(false);

  const {
    averageRating,
    episodeLength,
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
    showType,
    youtubeVideoId,
    posterImage,
    coverImage,
  } = anime?.attributes || {};

  // -----------------------------
  // Safe derived values
  // -----------------------------
  const safeSynopsis = synopsis ?? "";
  const isLong = safeSynopsis.length > MAX_CHARS;

  const displayedText = expanded
    ? safeSynopsis
    : safeSynopsis.slice(0, MAX_CHARS) + (isLong ? "..." : "");

  const animeTitle = titles?.en || canonicalTitle || "Untitled";

  const isMovie = showType === ANIME_FILTER_TYPES["movie"];

  let durationText = "-";
  if (episodeLength) {
    durationText =
      episodeCount === 1 && isMovie
        ? `${episodeLength} minutes`
        : `${episodeLength} min/ep`;
  }

  // -----------------------------
  // Details list
  // -----------------------------
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
      value: episodeCount ?? "Unknown",
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
      value: durationText,
      icon: <FaClock className="text-orange-400" />,
    },
    {
      label: "Age rating",
      value: ageRating
        ? `${ageRating}${ageRatingGuide ? ` (${ageRatingGuide})` : ""}`
        : "-",
      icon: <FaUserShield className="text-red-400" />,
    },
  ];

  // -----------------------------
  // Save logic
  // -----------------------------
  const savedItemDetails = {
    title: canonicalTitle,
    id: anime?.id,
    year: startDate,
    image: coverImage,
  };

  const {isSaved, onSave} = useSave(savedItemDetails);

  return (
    <div className="main-container min-h-[50vh] flex-col-reverse flex md:flex-row p-5">
      {/* LEFT CONTAINER */}
      <div className="relative w-full md:w-[300px]">
        <div className="static md:absolute top-[-20%] p-5 h-[700px] w-full bg-default_light flex flex-col">
          <div className="relative h-[200px] w-full mb-2">
            <Image
              src={posterImage?.original || "/placeholder.jpg"}
              fill
              alt={`${animeTitle} poster`}
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-5 flex-1 mt-2">
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

            <button
              onClick={onSave}
              className="bg-sky-800 text-white flex justify-center items-center w-full gap-2 p-3 hover:bg-sky-700 transition"
            >
              {isSaved ? (
                <MdBookmark className="text-2xl" />
              ) : (
                <MdBookmarkBorder className="text-2xl" />
              )}
              {isSaved ? "Saved" : "Add to List"}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT CONTAINER */}
      <div className="flex-1 flex flex-col gap-4 p-5">
        <h2 className="text-4xl text-orange-400">{animeTitle}</h2>

        {/* Synopsis */}
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

        {/* Trailer */}
        {youtubeVideoId && (
          <div>
            <h3 className="text-gray-400 text-2xl">Trailer</h3>
            <div className="border-b my-2 border-gray-500/50" />
            <iframe
              className="w-full lg:w-1/2"
              height="315"
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsAnimeContent;
