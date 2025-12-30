import {useEffect, useState} from "react";

const useSidebarScroll = () => {
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    const handleShow = () => {
      if (window.scrollY > 70) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };
    window.addEventListener("scroll", handleShow);
    return () => window.removeEventListener("scroll", handleShow);
  }, []);

  return {showNav};
};

export default useSidebarScroll;
