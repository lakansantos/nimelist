import React from "react";
import cx from "classnames";
import AnimeSavedBanner from "./AnimeSavedBanner";
import AnimeSavedCard from "./AnimeSavedCard";
import AnimeNoData from "@components/Anime/AnimeNoData";
import useSavedList from "@modules/Anime/AnimeSaved/useSavedList";

const AnimeSaved = () => {
  const {saved: savedData, remove} = useSavedList();

  const isDataEmpty = !savedData || savedData.length === 0;

  const sortedData = savedData.toReversed();

  return (
    <section className="w-full">
      <AnimeSavedBanner />
      {isDataEmpty ? (
        <AnimeNoData />
      ) : (
        <>
          {/* Saved Anime */}
          {!isDataEmpty && (
            <div className="mt-6">
              <div className="flex flex-col mb-6 max-w-full">
                <div
                  className={cx(
                    "grid grid-cols-[repeat(auto-fit,minmax(auto,1fr))] gap-4 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] ",
                    {
                      "lg:grid-cols-[repeat(auto-fit,minmax(400px,400px))]":
                        sortedData.length <= 3,
                    }
                  )}
                >
                  {sortedData.map((item, index) => (
                    <AnimeSavedCard
                      item={item}
                      key={`${index}-${item.id}`}
                      onRemove={remove}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AnimeSaved;
