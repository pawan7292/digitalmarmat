import { api } from "./api";
import { ServiceQueryParams } from "@/lib/types/service";

export const getAllProducts = async (params?: ServiceQueryParams) => {
  const res = await api.get("/api/products", {
    params,
  });

  return res.data;
};
