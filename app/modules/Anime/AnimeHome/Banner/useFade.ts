import {Anime} from "@app-types/anime";
import {useEffect, useState} from "react";

const useFade = (filteredData: Anime[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev >= filteredData.length - 1 ? 0 : prev + 1
        );
        setFade(true); // fade-in the next image
      }, 500); // small delay for fade-out effect
    }, 7000);

    return () => clearInterval(intervalId);
  }, [filteredData.length]);

  // Trigger fade-in on initial render
  useEffect(() => {
    setFade(true);
  }, []);

  return {
    fade,
    setFade,
    currentIndex,
    setCurrentIndex,
    load,
    setLoad,
  };
};

export default useFade;
