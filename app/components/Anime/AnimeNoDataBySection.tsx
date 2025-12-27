import {CgSmileMouthOpen} from "react-icons/cg";

import React from "react";

const AnimeNoDataBySection = () => {
  return (
    <div className="min-h-[200px] flex flex-row gap-2  justify-start items-start">
      <CgSmileMouthOpen className="w-[40px] h-[40px]" />
      <p className="flex justiy-center items-center h-[40px] ">
        {" "}
        Looks like there’s nothing here yet...{" "}
      </p>
    </div>
  );
};

export default AnimeNoDataBySection;
