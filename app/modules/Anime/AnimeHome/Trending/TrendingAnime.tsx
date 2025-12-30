"use client";
import {Anime} from "@app-types/anime";
import {HiOutlineChevronLeft, HiOutlineChevronRight} from "react-icons/hi";
import TrendingScrollerButton from "./TrendingScrollerButton";
import useTrendingScroll from "./useTrendingScroll";
import useLoad from "./useLoad";
import TrendingCardSkeleton from "./TrendingCardSkeleton";
import cx from "classnames";
import AnimeNoDataBySection from "@components/Anime/AnimeNoDataBySection";
import TrendingAnimeCard from "./TrendingAnimeCard";

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
            return (
              <TrendingAnimeCard item={item} key={item.id} setLoad={setLoad} />
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
