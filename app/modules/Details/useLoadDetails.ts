import {useState} from "react";

const useLoadDetails = () => {
  const [load, setLoad] = useState(false);

  return {load, setLoad};
};

export default useLoadDetails;
