import Image from "next/image";
import React from "react";

const AnimeNoData = () => {
  return (
    <div className="min-h-[200px] flex flex-col justify-center items-center ">
      <Image
        width={100}
        height={100}
        priority
        src={"/kitten.png"}
        alt="kitten question mark image"
      />
      Looks like there’s nothing here yet...{" "}
    </div>
  );
};

export default AnimeNoData;
