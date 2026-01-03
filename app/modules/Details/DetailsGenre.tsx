import {Genres} from "@app-types/anime";
import React from "react";

const DetailsGenre = ({data}: {data?: Genres[] | null}) => {
  if (!data || data.length === 0) {
    return;
  }
  return (
    <ul className="flex gap-2 flex-wrap mt-2 justify-">
      {data.map((item) => {
        const {id, attributes} = item;
        return (
          <li key={id} className="border min-w-[50px] text-center p-1 text-xs">
            {attributes.name}
          </li>
        );
      })}
    </ul>
  );
};

export default DetailsGenre;
