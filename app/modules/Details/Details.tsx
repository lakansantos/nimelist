import {Anime} from "@app-types/anime";
import React from "react";

const Details = ({data}: {data?: Anime | null}) => {
  if (data === null || !data) {
    return "No data";
  }
  const {attributes} = data;

  const {canonicalTitle} = attributes;
  return (
    <div className="relative min-h-[calc(100vh-10%)] bg-default_blue text-white p-5 flex md:flex-row flex-col gap-5">
      {canonicalTitle}
    </div>
  );
};

export default Details;
