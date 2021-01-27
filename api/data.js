import { axiosInstance } from "../utils/axios";

export const fetchCatalog = () => axiosInstance.get("/api/v1/app/allitems");

export const fetchCart = (data) =>
  axiosInstance.post("/api/v2/app/order/cart", data);

export const fetchBanners = () => axiosInstance.get("/api/v1/app/banners");

export const fetchTechnics = () =>
  axiosInstance.get("/api/v1/app/technics/all");

export const fetchLastOrderInfo = () =>
  axiosInstance.post("/api/v1/app/profile/currentorder");
