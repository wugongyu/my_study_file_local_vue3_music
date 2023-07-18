<template>
  <Swiper
    slides-per-group-auto
    slides-per-view="auto"
    :navigation="true"
    :grab-cursor="true"
  >
    <SwiperSlide v-for="item in banners" :key="item.bannerId">
      <img :src="item.pic" class="banner-image" @click="onClick(item)" />
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import type { Banner } from '@/models/banner';
import { useCommonStore } from '@/stores/common';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { onMounted, toRefs } from 'vue';

const { banners } = toRefs(useCommonStore());
const { getBanners } = useCommonStore();
onMounted(async() => {
  await getBanners();
});
const onClick = (banner: Banner) => {
  console.log(banner);
}
</script>

<style lang="scss" scoped>
  .swiper {
    @apply -mx-2.5;
    .swiper-slide {
      @apply w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-2.5
    }
  }

  .banner-image {
    @apply rounded-lg cursor-pointer transition-all object-cover;
    @apply hover:shadow hover:opacity-80;
  }
</style>