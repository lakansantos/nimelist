"use client";
import {Anime} from "@app-types/anime";
import Image from "next/image";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi";
import TrendingScrollerButton from "./TrendingScrollerButton";
import useTrendingScroll from "./useTrendingScroll";
import {extractYear} from "@utils/dates";
import useLoad from "./useLoad";
import TrendingCardSkeleton from "./TrendingCardSkeleton";
import cx from "classnames";
import AnimeNoDataBySection from "@components/Anime/AnimeNoDataBySection";

type AnimeCardsContainerProps = {
  data: Anime[];
  title: string;
};

const TrendingAnime = ({data, title}: AnimeCardsContainerProps) => {
  const {clicked, maxScroll, scroll, containerRef, handleScroll} =
    useTrendingScroll();
  const {load, setLoad} = useLoad();

  if (data.length === 0 || !data) return <AnimeNoDataBySection />;

  return (
    <div className="relative min-h-[200px] flex flex-col max-w-full">
      <h2 className="text-3xl text-white font-thin mb-5">{title}</h2>

      <div className="relative group">
        {clicked && scroll > 0 && (
          <TrendingScrollerButton
            onClick={() => handleScroll("left")}
            direction="left"
            visible={scroll > 0}
          >
            <HiOutlineChevronLeft style={{fontSize: 30}} />
          </TrendingScrollerButton>
        )}

        {/* Right Arrow */}
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
          className={cx(
            "cards-container flex flex-row gap-3 overflow-auto scroll-smooth transition-opacity duration-500",
            {
              "opacity-100": load,
              "opacity-0": !load,
            }
          )}
        >
          {data.map((item) => {
            const {titles, ageRating, startDate, canonicalTitle, coverImage} =
              item.attributes;
            return (
              <div
                key={item.id}
                className="relative h-[200px] min-w-[400px] w-[400px] object-cover rounded-lg"
              >
                <Image
                  priority
                  fill
                  sizes="400px"
                  src={coverImage.original}
                  alt={`${titles.en} image`}
                  className="h-[200px] min-w-[400px] w-[400px] object-cover rounded-lg"
                  onLoad={() => setLoad(true)}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 z-10" />

                {/* Text content */}
                <div className="relative z-20 h-full flex flex-col justify-end items-start p-5">
                  <p className="text-sm text-white max-w-4xl">
                    {extractYear(startDate)} · {ageRating}
                  </p>
                  <p className="md:text-2xl text-white">
                    {titles.en_us ?? canonicalTitle ?? titles.en_jp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {!load && (
          <div className="absolute inset-0 z-30">
            <TrendingCardSkeleton cards={5} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingAnime;
