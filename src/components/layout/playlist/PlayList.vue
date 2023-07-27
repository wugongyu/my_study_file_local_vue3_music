<template>
  <el-drawer v-model="showPlayList" :with-header="false" size="320px" custom-class="play-list">
    <div class="h-screen flex flex-col">
      <div class="flex-shrink-0 p-2.5">
        <div class="text-xl">Play List</div>
        <div class="text-xs mt-1 flex justify-between items-center">
          <span>total {{ playListCount }} songs</span>
          <div class="text-dc flex items-center hover-text" @click="clearPlayList">
            <IconPark :icon="Delete"></IconPark>
            <span class="mt-0.5">Clear</span>
          </div>
        </div>
      </div>
      <div class="flex-1 overflow-hidden">
        <el-scrollbar>
          <PlayListSongItem v-for="song in playList" :key="song.id" :song="song" :active="song.id === id" @dblclick="play(song.id)"  />
        </el-scrollbar>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { Delete } from '@icon-park/vue-next';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import IconPark from '@/components/common/IconPark.vue';
import PlayListSongItem from './PlayListSongItem.vue';

const { showPlayList, playList, playListCount, id } = storeToRefs(usePlayerStore());
const { play, clearPlayList } = usePlayerStore();
</script>

<style lang="scss">
.play-list {
  .el-drawer__body {
    padding: 0;
  }
}
</style>