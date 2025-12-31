import {Genres} from "@app-types/anime";
import React from "react";

const DetailsGenre = ({data}: {data?: Genres[] | null}) => {
  if (!data || data.length === 0) {
    return;
  }
  return (
    <ul>
      {data.map((item) => {
        const {id, attributes} = item;
        return <li key={id}>{attributes.name}</li>;
      })}
    </ul>
  );
};

export default DetailsGenre;
