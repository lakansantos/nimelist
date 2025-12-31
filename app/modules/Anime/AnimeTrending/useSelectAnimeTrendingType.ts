import {NAV_ANIME_FILTER_TYPES} from "@app-types/animeFilters";
import {useState} from "react";

type AnimeTrendingFilter = (typeof NAV_ANIME_FILTER_TYPES)[number]["value"];
const useSelectAnimeTrendingType = () => {
  const [current, setCurrent] = useState<AnimeTrendingFilter>("all");

  const handleSelect = (type: AnimeTrendingFilter) => setCurrent(type);

  return {
    current,
    setCurrent,
    handleSelect,
  };
};

export default useSelectAnimeTrendingType;
