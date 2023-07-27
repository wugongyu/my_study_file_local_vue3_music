<template>
  <div class="song-item hover-bg-view" :class="{'active': active}">
    <el-image class="aspect-square w-10 flex-shrink-0" :src="song.al?.picUrl + '?param=80y80'" />
    <div class="ml-2 text-xs w-1 h-10 flex flex-1">
      <div class="flex">
        <div class="truncate">{{ song.name }}</div>
        <IconPark
          v-if="song.mv > 0" 
          class="ml-2 text-orange-400 cursor-pointer" 
          size="16" 
          :icon="Youtube" 
          @click="handleToSeeMv"
        />
      </div>
      <div class="truncate">{{ song.ar?.first().name }}</div>
    </div>
    <div class="flex-shrink-0 ml-5 flex items-center justify-end">
      <div class="truncate">
        <small>{{  useFormatDuring(song.dt / 1000) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Youtube } from '@icon-park/vue-next';
import { useRouter } from 'vue-router';
import { Song } from '@/models/song';
import IconPark from '@/components/common/IconPark.vue';
import { useFormatDuring } from '@/utils/number';
import { pagesNameTypeMap } from '@/router/pages';

defineProps<{
  song: Song,
  active: boolean,
}>();

const router = useRouter();

const handleToSeeMv = () => {
  router.push({ name: pagesNameTypeMap.mvDetail, query: { id: Song.mv } });
}
</script>

<style lang="scss" scoped>
.song-item {
  @apply flex p-2.5 border-b border-b-stone-50 dark:border-b-stone-800;
}
.active {
  @apply border-l-2 border-l-emerald-400 text-emerald-400;
}
</style>