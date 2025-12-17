import React from "react";

type AnimeCardsContainerProps = {
  orientation: "vertical" | "horizontal";
  title: string;
};
const AnimeCardsContainer = ({
  orientation,
  title,
}: AnimeCardsContainerProps) => {
  return (
    <div className="min-h-[200px] border">
      <h2>{title}</h2>
    </div>
  );
};

export default AnimeCardsContainer;
