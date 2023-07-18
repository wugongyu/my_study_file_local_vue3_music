import type { Banner } from "@/models/banner";
import http from "./http";


export async function useBanners() {
  const { banners } = await http.get<{ banners: Banner[] }>('/banner', { type: 1 });
  return banners;
}