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
    <div className="flex flex-col max-w-full">
      <h2 className="text-3xl font-thin text-white mb-5">{title}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {data.map((item) => (
          <div key={item.mal_id} className="w-full">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                priority
                src={item.entry[0].images.jpg.large_image_url}
                alt={`${item.entry[0].title} cover`}
                className="object-cover"
              />
            </div>

            <p className="mt-2 text-white text-sm">{item.entry[0].title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedAnime;
