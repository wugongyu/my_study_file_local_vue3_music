import type { SearchSuggest } from "@/models/search";
import { useSearchSuggest } from "@/services/api";
import { defineStore } from "pinia";

export const useSearchStore = defineStore('search', {
  state() {
    return {
      showSearchView: false,
      searchKeyword: '',
      suggestData: {} as SearchSuggest,
    };
  },
  getters: {
    showHot: state => state.searchKeyword === '',
  },
  actions: {
    async getSuggestData() {
      this.suggestData = await useSearchSuggest(this.searchKeyword);
    }
  },
})