<template>
  <el-popover
    popper-style="max-width: auto; padding: 0;"
    v-model:visible="showSearchView"
    width="300px"
  >
    <template #reference>
      <el-input
        placeholder="music、mv、list"
        :prefix-icon="Search"
        clearable
        @input="handleInput"
        v-model="searchKeyword"
        @focus="showSearchView = true"
        @focusout="showSearchView = false"
      ></el-input>
    </template>
    <div class="h-96">
      <el-scrollbar>
        <div class="pb-2.5">
          <div v-if="showHot">
            <div class="pt-2 pb-1.5 px-2.5">Hot Search</div>
            <div
              v-for="(item, index) in hotSearchList" 
              :key="item.searchWord"
              class="py-2.5 px-2.5 hover-text cursor-pointer flex justify-between items-center text-xs"
              @click="clickHotWord(item.searchWord)"
            >
              <div>
                <span class="mr-1">{{ index + 1 }}</span>
                <span>{{ item.searchWord }}</span>
              </div>
              <div class="text-red-300 text-xs">{{ item.score.numberFormat() }}</div>
            </div>
          </div>
          <SearchSuggest v-else />
        </div>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { useSearchStore }  from '@/stores/search';
import { Search } from '@icon-park/vue-next';
import type { SearchHotDetail } from '@/models/search';
import { storeToRefs } from 'pinia';
import { debounce } from 'lodash';
import { onMounted, ref } from 'vue';
import { useSearchHotDetail } from '@/services/api';
import SearchSuggest from './SearchSuggest.vue';

const { showSearchView, searchKeyword, showHot } = storeToRefs(useSearchStore());
const { getSuggestData } = useSearchStore();
const handleInput = debounce((val: string | number) => getSuggestData(), 500, { maxWait: 1000});

const hotSearchList = ref<SearchHotDetail[]>([]);
onMounted(async() => {
  hotSearchList.value = await useSearchHotDetail();
});

const clickHotWord = (word: string) => {
  searchKeyword.value = word;
  getSuggestData();
  showSearchView.value = true;
}
</script>

<style lang="scss" scoped>
</style>