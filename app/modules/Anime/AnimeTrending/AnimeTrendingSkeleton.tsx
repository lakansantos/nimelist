import React from "react";
import cx from "classnames";

const AnimeTrendingSkeleton = ({
  load,
  cards = 10,
}: {
  load: boolean;
  cards: number;
}) => {
  return (
    <div
      className={cx("flex flex-col max-w-full animate-pulse", {
        flex: !load,
        hidden: load,
      })}
    >
      {/* Title skeleton */}
      <div className="h-8 w-56 bg-gray-700 rounded mb-5" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {Array.from({length: cards}).map((_, i) => (
          <div key={i} className="w-full">
            {/* Image placeholder */}
            <div className="relative w-full h-[400px] rounded-lg bg-gray-800 overflow-hidden">
              {/* Optional dark overlay for depth */}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Title placeholder */}
            <div className="mt-2 h-4 w-3/4 bg-gray-600 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeTrendingSkeleton;
