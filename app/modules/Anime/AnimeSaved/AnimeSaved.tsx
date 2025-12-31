import React from "react";
import cx from "classnames";
import AnimeSavedBanner from "./AnimeSavedBanner";
import AnimeSavedCard from "./AnimeSavedCard";
import AnimeSavedRecommendationCard from "./AnimeSavedRecommendationCard";
import AnimeNoData from "@components/Anime/AnimeNoData";
import useSavedList from "@modules/Anime/AnimeSaved/useSavedList";
import useRecommendationSave from "../AnimeHome/Recommended/useRecommendationSave";

const AnimeSaved = () => {
  const {saved: savedData, remove} = useSavedList();
  const {saved: savedRecommendations, remove: onRemoveSavedRecommendations} =
    useRecommendationSave();
  const isDataEmpty = !savedData || savedData.length === 0;
  const isRecEmpty = !savedRecommendations || savedRecommendations.length === 0;

  return (
    <section className="w-full">
      <AnimeSavedBanner />

      {/* Saved Anime */}
      {isDataEmpty ? (
        <div className="mt-3">
          <AnimeNoData />
        </div>
      ) : (
        <div className="mt-6">
          <div className="flex flex-col mb-6 max-w-full">
            <div
              className={cx(
                "grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4",
                {
                  "lg:grid-cols-[repeat(auto-fit,minmax(400px,400px))]":
                    savedData.length <= 3,
                }
              )}
            >
              {savedData.map((item, index) => (
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
      {/* Saved Recommendations */}
      {!isRecEmpty && (
        <div className="mt-10">
          <h2 className="text-white text-xl font-semibold mb-4">
            Saved Recommendations
          </h2>

          <div className="flex flex-col mb-6 max-w-full">
            <div
              className={cx(
                "grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4",
                {
                  "lg:grid-cols-[repeat(auto-fit,minmax(400px,400px))]":
                    savedRecommendations.length <= 3,
                }
              )}
            >
              {savedRecommendations.map((item, index) => (
                <AnimeSavedRecommendationCard
                  key={`${index}-${item.id}`}
                  item={item}
                  onRemove={onRemoveSavedRecommendations}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AnimeSaved;
