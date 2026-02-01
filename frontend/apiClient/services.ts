import { api } from "./api";
import { ServiceQueryParams } from "@/lib/types/service";


export const getAllServices = async (params?: ServiceQueryParams) => {
  const res = await api.get("/api/services", {
    params,
  });

  return res.data;
};