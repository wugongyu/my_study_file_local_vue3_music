<template>
  <div class="flex justify-end items-center gap-x-2.5">
    <span class="text-xs">
      {{ useFormatDuring(currentTime) }} / {{ useFormatDuring(duration) }}
    </span>
    <IconPark :icon="TextMessage" size="18" :stroke-width="3" class="hover-text" title="lyrics" ></IconPark>
    <div class="flex items-center hover-text" @click="showPlayList = true">
      <IconPark :icon="MusicList" size="18" :stroke-width="3" class="hover-text" title="playlist" ></IconPark>
      <span class="text-xs">{{ playListCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MusicList, TextMessage } from '@icon-park/vue-next';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import IconPark from '@/components/common/IconPark.vue';
import { useFormatDuring } from '@/utils/number';

const { currentTime, duration, showPlayList, playListCount } = storeToRefs(usePlayerStore());
</script>

<style></style>