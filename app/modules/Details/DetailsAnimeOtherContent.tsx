"use client";
import {ANIME_FILTER_TYPES, ANIME_STATUS_TYPE} from "@app-types/animeFilters";
import {useDetails} from "./DetailsContext";
import {dateFormat} from "@utils/dates";

const DetailsAnimeOtherContent = () => {
  const {anime} = useDetails();

  if (!anime) return;

  const {
    titles,
    status,
    nextRelease,
    episodeCount,
    showType,
    totalLength: duration,
  } = anime.attributes;

  const durationText =
    duration && episodeCount
      ? `${duration / episodeCount} min/ep`
      : duration
      ? `${duration} minutes`
      : "N/A";

  const animeInfo = [
    {label: "Japanese Title", value: titles.ja_jp},
    {label: "Status", value: ANIME_STATUS_TYPE[status]},
    {label: "Type", value: ANIME_FILTER_TYPES[showType]},
    {
      label: "Next Episode",
      value: nextRelease ? dateFormat(nextRelease) : "N/A",
    },
    {label: "Total Duration", value: durationText},
  ];
  return (
    <div className="other-details-container h-fit w-full p-10">
      <h3>Other Details</h3>
      <div className="border-b my-2 border-gray-500/50" />
      <div className="grid grid-cols-3 gap-3">
        {animeInfo.map(({label, value}) => (
          <div key={label} className="border-b border-white/10 pb-2">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-sm font-semibold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsAnimeOtherContent;
