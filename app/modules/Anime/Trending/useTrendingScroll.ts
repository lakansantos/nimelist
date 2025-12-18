import {useEffect, useRef, useState} from "react";

const useTrendingScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [clicked, setClicked] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);
  const [scroll, setScroll] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let newScroll = container.scrollLeft;

    if (direction === "left") {
      newScroll = Math.max(newScroll - 750, 0);
    } else {
      newScroll = Math.min(
        newScroll + 750,
        container.scrollWidth - container.clientWidth
      );
    }

    container.scrollTo({left: newScroll, behavior: "smooth"});
    setScroll(newScroll);
    setClicked(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setMaxScroll(container.scrollWidth - container.clientWidth);

    const onScroll = () => setScroll(container.scrollLeft);
    container.addEventListener("scroll", onScroll);

    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return {
    clicked,
    maxScroll,
    scroll,
    containerRef,
    handleScroll,
    setScroll,
    setMaxScroll,
  };
};

export default useTrendingScroll;
