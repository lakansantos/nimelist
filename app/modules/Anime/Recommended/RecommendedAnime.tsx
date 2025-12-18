"use client";
import {AnimeData} from "@app-types/topAnimeData";
import Image from "next/image";
import React from "react";

type AnimeCardsContainerProps = {
  data: AnimeData[];
  title: string;
};

const RecommendedAnime = ({data, title}: AnimeCardsContainerProps) => {
  return (
    <div className="min-h-[200px] flex flex-col  max-w-full">
      <h2 className="text-3xl text-white mb-5">{title}</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 w-full">
        {data.map((item) => (
          <div key={item.mal_id} className="d-block">
            <Image
              width={300}
              height={400}
              priority
              className="h-[400px] min-w-[300px] w-[400px] object-cover rounded-lg"
              src={item.entry[0].images.jpg.large_image_url}
              alt={`${item.entry[0].title} cover`}
            />
            <p>{item.entry[0].title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedAnime;
