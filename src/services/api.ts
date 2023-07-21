import type { Banner } from "@/models/banner";
import type { SearchHotDetail, SearchSuggest } from "@/models/search";
import type { UserProfile } from "@/models/user";
import http from "./http";

/**
 * banner
 * */ 
export async function useBanners() {
  const { banners } = await http.get<{ banners: Banner[] }>('/banner', { type: 1 });
  return banners;
}

/**
 * user
 * */ 

export async function useLogin(params: { phone: string, password: string }) {
  return await http.get<{
    code: number,
    cookie: string,
    token: string,
  }>("login/cellphone", params);
}

export async function useLoginStatus() {
  return await http.get<{
    data: {
        code: number,
        profile: UserProfile
    },
  }>('login/status');
}

/**
 * search
*/
export async function useSearchSuggest(keywords: string) {
  const {result} = await http.get<{ result: SearchSuggest }>('search/suggest', {keywords});
    return result;
}

export async function useSearchHotDetail() {
  const {data} = await http.get<{ data: SearchHotDetail[] }>('search/hot/detail');
  return data;
}