import {AnimeData} from "@app-types/topAnimeData";
import {useEffect, useState} from "react";

const useRecommendedInfiniteScroll = (
  filteredData: AnimeData[],
  INITIAL_COUNT: number,
  LOAD_INCREMENT: number
) => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const fullHeight = document.documentElement.scrollHeight;

    // Load more when near bottom (100px buffer)
    if (scrollTop + windowHeight >= fullHeight - 100) {
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_INCREMENT, filteredData.length)
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData.length]);

  return {
    visibleCount,
  };
};

export default useRecommendedInfiniteScroll;
