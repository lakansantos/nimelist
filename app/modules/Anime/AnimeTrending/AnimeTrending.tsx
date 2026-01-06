import React from "react";
import AnimeTrendingBanner from "./AnimeTrendingBanner";
import {AnimeResponse} from "@app-types/anime";
import cx from "classnames";

import useLoad from "./useLoad";
import AnimeTrendingCard from "./AnimeTrendingCard";
import AnimeTrendingSkeleton from "./AnimeTrendingSkeleton";
import AnimeTrendingFilters from "./AnimeTrendingFilters";
import useSelectAnimeTrendingType from "./useSelectAnimeTrendingType";
import {ANIME_FILTER_TYPES} from "@app-types/animeFilters";
import AnimeNoData from "@components/Anime/AnimeNoData";

const INITIAL_COUNT = 10;

const AnimeTrending = ({data}: {data: AnimeResponse}) => {
  const {load, setLoad} = useLoad();
  const {current, handleSelect} = useSelectAnimeTrendingType();

  const filteredData =
    current !== ANIME_FILTER_TYPES["all"]
      ? data.filter((item) => {
          return (
            item.attributes.showType === current &&
            Boolean(item.attributes.coverImage)
          );
        })
      : data.filter((item) => Boolean(item.attributes.coverImage));

  const isDataEmpty = data.length === 0 || !data;
  return (
    <section className="w-full">
      <AnimeTrendingBanner />
      {isDataEmpty ? (
        <div className="mt-3">
          <AnimeNoData />
        </div>
      ) : (
        <>
          {/* Section title below banner */}
          <div className="mt-6">
            <>
              <AnimeTrendingFilters
                current={current}
                handleSelect={handleSelect}
                dataLength={filteredData.length}
              />
              <div
                className={cx("flex flex-col mb-6 max-w-full", {
                  hidden: !load,
                  flex: load,
                })}
              >
                <div
                  className={cx(
                    "grid grid-cols-[repeat(auto-fit,minmax(auto,1fr))] gap-4 lg:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]",
                    {
                      "lg:grid-cols-[repeat(auto-fit,minmax(400px,400px))]":
                        filteredData.length <= 3,
                    }
                  )}
                >
                  {filteredData.map((item, index) => (
                    <AnimeTrendingCard
                      item={item}
                      setLoad={setLoad}
                      key={`${index}-${item.id}`}
                    />
                  ))}
                </div>
              </div>

              <AnimeTrendingSkeleton load={load} cards={INITIAL_COUNT} />
            </>
          </div>
        </>
      )}
    </section>
  );
};

export default AnimeTrending;
