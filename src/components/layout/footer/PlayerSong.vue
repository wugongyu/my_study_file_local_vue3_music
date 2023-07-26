<template>
  <div class="flex player-song">
    <img :src="song.al?.picUrl || OpticalDisk" alt="" class="w-11 h-11 rounded" />
    <div class="ml-2 text-xs flex flex-col justify-between">
      <div class="w-52 2xl:w-96 cursor-pointer truncate">
        <div class="flex">
          <div
            class="bg-red-500 text-xs text-white rounded px-0.5 scale-75"
            v-if="songUrl.freeTrialInfo?.end > 0"
          >TRY</div>
          <span>{{ song.name || 'FREE MUSIC'  }}</span>
          <span class="ml-2 text-dc">{{ song.ar?.first().name || 'SmallRuralDog' }}</span>
        </div>
      </div>
      <div class="flex gap-x-3 text-main">
        <IconPark class="text-slate-400 hover-text" :icon="Like" :size="18" :stroke-width="3"></IconPark>
        <IconPark class="text-slate-400 hover-text" :icon="DownTwo" :size="18" :stroke-width="3"></IconPark>
        <IconPark class="text-slate-400 hover-text" :icon="MoreTwo" :size="18" :stroke-width="3"></IconPark>
        <el-badge :value="1000" :max="99" class="badge">
          <IconPark class="text-slate-400 hover-text" :icon="Comment" :size="18" :stroke-width="3"></IconPark>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { Comment, DownTwo, Like, MoreTwo } from '@icon-park/vue-next';
import IconPark from '@/components/common/IconPark.vue';
import { usePlayerStore } from '@/stores/player';
import { OpticalDisk } from '@/assets/img';

const { song, songUrl } = toRefs(usePlayerStore());
</script>

<style lang="scss" scoped>
.player-song {
  .badge {
    .el-badge__content {
      @apply scale-75 left-1 bg-stone-100 text-slate-500 bg-opacity-80 right-auto;
      @apply dark:bg-stone-900;
    }
  }
}
</style>