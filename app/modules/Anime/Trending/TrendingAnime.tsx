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

type AnimeCardsContainerProps = {
  data: Anime[];
  title: string;
};

const TrendingAnime = ({data, title}: AnimeCardsContainerProps) => {
  const {clicked, maxScroll, scroll, containerRef, handleScroll} =
    useTrendingScroll();

  const {load, setLoad} = useLoad();

  return (
    <>
      <div
        className={cx("min-h-[200px] flex flex-col  min-h-[200px] max-w-full", {
          flex: load,
          hidden: !load,
        })}
      >
        <h2 className="text-3xl text-white font-thin mb-5">{title}</h2>

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
            {data.map((item) => {
              const {titles, ageRating, startDate, canonicalTitle} =
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
                    onLoad={() => setLoad(true)}
                    src={item.attributes.coverImage.original}
                    alt={`${item.attributes.titles.en} image`}
                    className="h-[200px] min-w-[400px] w-[400px] object-cover rounded-lg"
                  />
                  {/* Optional dark overlay */}
                  <div className="absolute inset-0 bg-black/50 z-10" />

                  {/* Text content */}
                  <div className="relative z-20 h-full flex items-start p-5 justify-end flex flex-col">
                    <p className="text-sm text-white max-w-4xl">
                      {extractYear(startDate)} · {ageRating}
                    </p>
                    <p className=" md:text-2xl text-white">
                      {titles.en_us ??
                        canonicalTitle ??
                        titles.en_us ??
                        titles.en_jp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <TrendingCardSkeleton cards={5} load={load} />
    </>
  );
};

export default TrendingAnime;
