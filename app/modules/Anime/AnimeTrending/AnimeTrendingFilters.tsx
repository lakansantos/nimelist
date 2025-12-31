import {NAV_ANIME_FILTER_TYPES} from "@app-types/animeFilters";
import classNames from "classnames";

type AnimeTrendingFilter = (typeof NAV_ANIME_FILTER_TYPES)[number]["value"];

type AnimeTrendingFiltersProps = {
  current: AnimeTrendingFilter;
  handleSelect: (value: AnimeTrendingFilter) => void;
  dataLength: number;
};

const AnimeTrendingFilters = ({
  current,
  handleSelect,
  dataLength,
}: AnimeTrendingFiltersProps) => {
  return (
    <div className="flex flex-row mb-5 pl-2 gap-3">
      {NAV_ANIME_FILTER_TYPES.map((item) => {
        const selected = item.value === current;

        return (
          <button
            key={item.value}
            className={classNames(
              "px-4 py-1.5 rounded-full text-sm transition",
              {
                "bg-white text-black": selected,
                "text-white/60 hover:text-white": !selected,
              }
            )}
            onClick={() => handleSelect(item.value)}
          >
            {item.label} {selected && <span>{`(${dataLength})`}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default AnimeTrendingFilters;
