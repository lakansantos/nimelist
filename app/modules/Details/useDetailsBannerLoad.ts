import {useState} from "react";

const useDetailsBannerLoad = () => {
  const [load, setLoad] = useState(false);

  return {load, setLoad};
};

export default useDetailsBannerLoad;
