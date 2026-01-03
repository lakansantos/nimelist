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

const DetailsAnimeContent = () => {
  const {anime, genres} = useDetails();

  console.log(genres, "genres");

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
  } = anime?.attributes || {};

  const detailsContent = [
    {
      label: "Rating",
      value: `${averageRating}%`,
      icon: <FaHeart className="text-yellow-400" />,
    },
    {
      label: "Rank",
      value: `#${ratingRank}`,
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
      value: `${ageRating} (${ageRatingGuide})`,
      icon: <FaUserShield className="text-red-400" />,
    },
  ];

  if (!anime) return;
  return (
    <div className="main-container min-h-[50vh] flex flex-row p-5">
      <div className="relative container-1 w-[200px] md:w-[300px]">
        <div className="absolute flex flex-col top-[-20%] p-5 h-[500px] w-full bg-default_light">
          <div className="image-container relative h-[175px] w-full">
            <Image
              src={anime.attributes.posterImage.original}
              fill
              alt={`${anime.attributes.canonicalTitle} image`}
              className="object-cover"
            />
          </div>
          <div className="details-container flex flex-col gap-2 flex-1 mt-2">
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
          </div>
        </div>
      </div>
      <div className="container-2 flex-1">container 2</div>
    </div>
  );
};

export default DetailsAnimeContent;
