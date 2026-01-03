import {useState} from "react";

const useDetailsAnimeContent = () => {
  const [expanded, setExpanded] = useState(false);
  const [load, setLoad] = useState(false);

  return {
    expanded,
    setExpanded,
    load,
    setLoad,
  };
};

export default useDetailsAnimeContent;
