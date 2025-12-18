"use client";
import {Anime} from "@app-types/anime";
import Image from "next/image";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi";
import TrendingScrollerButton from "./TrendingScrollerButton";
import useTrendingScroll from "./useTrendingScroll";

type AnimeCardsContainerProps = {
  data: Anime[];
  title: string;
};

const TrendingAnime = ({data, title}: AnimeCardsContainerProps) => {
  const {clicked, maxScroll, scroll, containerRef, handleScroll} =
    useTrendingScroll();

  return (
    <div className="min-h-[200px] flex flex-col  min-h-[200px] max-w-full">
      <h2 className="text-3xl text-white mb-5">{title}</h2>

      <div className="relative group">
        {clicked && scroll > 0 ? (
          <TrendingScrollerButton
            onClick={() => handleScroll("left")}
            direction="left"
            visible={scroll > 0}
          >
            <HiOutlineChevronLeft style={{fontSize: "30px", float: "left"}} />
          </TrendingScrollerButton>
        ) : null}

        {maxScroll !== undefined && scroll < maxScroll && (
          <TrendingScrollerButton
            onClick={() => handleScroll("right")}
            direction="right"
          >
            <HiOutlineChevronRight style={{fontSize: 30}} />
          </TrendingScrollerButton>
        )}
        <div
          ref={containerRef}
          className="cards-container overflow-auto flex flex-row gap-3 scroll-smooth"
        >
          {data.map((item) => (
            <Image
              key={item.id}
              height={250}
              width={450}
              priority={true}
              className="h-[200px] min-w-[400px] w-[400px] object-cover rounded-lg"
              src={item.attributes.coverImage.original}
              alt={`${item.attributes.titles.en} image`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingAnime;
