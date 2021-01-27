import React from "react";
import { fetchCatalog } from "../../api/data";
import { ContextCart } from "../../pages/_app";

const useCatalog = () => {
  const { catalog, catalogDispatch } = React.useContext(ContextCart);

  React.useEffect(async () => {
    const { data } = await fetchCatalog();
    catalogDispatch({ type: "set", payload: data });
  }, []);

  return catalog;
};

export default useCatalog;
