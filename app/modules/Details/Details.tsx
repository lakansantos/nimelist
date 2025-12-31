import {Anime, Genres} from "@app-types/anime";
import React from "react";
import DetailsGenre from "./DetailsGenre";

type DetailProps = {data?: Anime | null; genreData?: Genres[] | null};
const Details = ({data, genreData}: DetailProps) => {
  if (data === null || !data) {
    return "No data";
  }
  const {attributes} = data;

  const {canonicalTitle} = attributes;

  return (
    <div className="relative min-h-[calc(100vh-10%)] bg-default_blue text-white p-5 flex md:flex-row flex-col gap-5">
      {canonicalTitle}
      <DetailsGenre data={genreData} />
    </div>
  );
};

export default Details;
