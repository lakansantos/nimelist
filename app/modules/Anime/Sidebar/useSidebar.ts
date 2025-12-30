import {useEffect, useState} from "react";

const useSidebar = () => {
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
      const media = window.matchMedia("(min-width: 768px)");

      const listener = () => setIsDesktop(media.matches);
      listener();

      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, []);

    return isDesktop;
  };

  return {
    isDesktop: useIsDesktop(),
    current,
    setCurrent,
    mounted,
  };
};

export default useSidebar;
