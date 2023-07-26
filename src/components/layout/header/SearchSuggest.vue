<template>
  <div v-if="suggestData" v-for="order in suggestData.order">
    <div class="search-suggest-data-title">{{ getTitle(order) }}</div>
    <!-- songs -->
    <div 
      v-if="order === nameMap.songs.key"
      class="search-suggest-data-item hover-bg-main " 
      v-for="item in suggestData.songs"
      :key="item.id"
      @click="handlePlayMusic(item.id)"
    >
      <span class="text-emerald-500">{{ item.name }}</span>
      <span class="pl-1"> - {{ item.artists ? item.artists.first()?.name : '' }}</span>
    </div>
    <!-- albums -->
    <div 
      v-if="order === nameMap.albums.key"
      class="search-suggest-data-item hover-bg-main" 
      v-for="item in suggestData.albums"
      :key="item.id"
      @click="handleRouterPush(nameMap.albums.routeKey, item.id)"
    >
      <span class="item-name">{{ item.name }}</span>
      <span class="pl-1"> - {{ item.artist.name }}</span>
    </div>

    <!-- artists -->
    <div 
      v-if="order === nameMap.artists.key"
      class="search-suggest-data-item hover-bg-main search-suggest-data-item-flex" 
      v-for="item in suggestData.artists"
      :key="item.id"
      @click="handleRouterPush(nameMap.artists?.routeKey, item.id)"
    >
      <el-avatar size="small" :src="item.coverImgUrl" />
      <span class="item-name">{{ item.name }}</span>
    </div>

    <!-- playlists -->
    <div 
      v-if="order === nameMap.playlists.key"
      class="search-suggest-data-item search-suggest-data-item-flex" 
      v-for="item in suggestData.playlists"
      :key="item.id"
      @click="handleRouterPush(nameMap.playlists.routeKey, item.id)"
    >
      <el-avatar size="small" :src="item.coverImgUrl" />
      <span class="item-name item-name-flex">{{ item.name }}</span>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { useSearchStore }  from '@/stores/search';
import { usePlayerStore } from '@/stores/player';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
interface NameMapItem {
  key: string;
  title: string;
  cnTitle: string;
  routeKey?: string;
}

const nameMap: Record<string, NameMapItem> = {
  songs: { key: 'songs', title: 'songs', cnTitle: 'danqu' },
  albums: { key: 'albums', title: 'albums', cnTitle: 'zhuanji', routeKey: 'album' },
  artists: { key: 'artists', title: 'artists', cnTitle: 'geshou', routeKey: 'artistDetail' },
  playlists: { key: 'playlists', title: 'playlists', cnTitle: 'gedan', routeKey: 'playlist' },
};

const { suggestData, showSearchView } = storeToRefs(useSearchStore());
const router = useRouter();
const { play } = usePlayerStore();

const handlePlayMusic = (id: number) => {
  play(id);
}

const getTitle = (name: string) => {
  return (nameMap[name] && nameMap[name].title) || name;
}

const handleRouterPush = (name?: string, id?: number) => {
  router.push({ name, query: { id } }).then(() => {
    showSearchView.value = false;
  })
}
</script>

<style lang="scss" scoped>
.search-suggest-data-title {
  @apply pt-2 pb-1.5 px-2.5;
}
.search-suggest-data-item {
  @apply py-1.5 px-2.5 text-xs cursor-pointer;
  .item-name {
    @apply text-emerald-500 ml-2
  }
  .item-name-flex {
    @apply flex-1 w-1;
  }
}
.search-suggest-data-item-flex {
  @apply flex items-center;
}
</style>