<template>
  <div class="flex items-center justify-center gap-x-3">
    <IconPark 
      class="hover-text" 
      :icon="loopTypeIcon"
      size="20" 
      :stroke-width="3" 
      @click="toggleLoopType"></IconPark>
    <IconPark class="hover-text" :icon="GoStart" size="28" theme="filled" @click="prev"></IconPark>
    <IconPark class="hover-text text-emerald-400" size="45" theme="filled" :icon="isPause ? PauseOne : Play" @click="togglePlay"></IconPark>
    <IconPark class="hover-text" size="28" :icon="GoEnd" @click="next"></IconPark>
    <el-popover placement="top" width="50px">
      <template #reference>
        <IconPark class="hover-text" size="20" :stroke-width="3" :icon="VolumeSmall"></IconPark>
      </template>
      <PlayerVolumeSlider />
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { GoEnd, GoStart, PauseOne, Play, VolumeSmall } from '@icon-park/vue-next';
import { storeToRefs } from 'pinia';
import IconPark from '@/components/common/IconPark.vue';
import PlayerVolumeSlider from './PlayerVolumeSlider.vue';
import { usePlayerStore } from '@/stores/player';

const { loopTypeIcon, isPause } = storeToRefs(usePlayerStore());
const { toggleLoopType, prev, next, togglePlay } = usePlayerStore();
</script>

<style></style>