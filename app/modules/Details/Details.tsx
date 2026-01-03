import React from "react";
import DetailsBanner from "./DetailsBanner";
import DetailsContent from "./DetailsContent";

const Details = () => {
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
