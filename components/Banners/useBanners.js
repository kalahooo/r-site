import React from "react";
import { fetchBanners } from "../../api/data";
import { ContextCart } from "../../pages/_app";

const useBanners = () => {
  const { banners, bannersDispatch } = React.useContext(ContextCart);

  React.useEffect(async () => {
    const { data } = await fetchBanners();
    bannersDispatch({ type: "set", payload: data });
  }, []);

  return banners;
};

export default useBanners;
