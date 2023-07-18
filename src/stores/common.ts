import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Banner } from '@/models/banner';
import { useBanners } from '@/services/api';
export const useCommonStore = defineStore('common', () => {
  const banners = ref<Banner[]>([]);
  const getBanners =async () => {
    if(banners.value.length) return;
    banners.value = await useBanners();
  }
  return {
    banners,
    getBanners,
  }
})