import React from "react";
import { fetchTechnics } from "../../api/data";
import { ContextCart } from "../../pages/_app";

const useTechnics = () => {
  const { technics, technicsDispatch } = React.useContext(ContextCart);

  React.useEffect(async () => {
    const { data } = await fetchTechnics();
    technicsDispatch({ type: "set", payload: data });
  }, []);

  return technics;
};

export default useTechnics;
