"use client";

import React from "react";
import DetailsBanner from "./DetailsBanner";
import DetailsContent from "./DetailsContent";
import {useDetails} from "./DetailsContext";

const Details = () => {
  const {anime} = useDetails();

  if (!anime) {
    return <div>No data</div>;
  }

  return (
    <div className="relative min-h-screen h-fit bg-default_blue text-white flex md:flex-row flex-col gap-5">
      <div className="w-full flex flex-col">
        <DetailsBanner />
        <DetailsContent />
      </div>
    </div>
  );
};

export default Details;
