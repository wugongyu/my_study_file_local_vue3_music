<template>
  <div class="flex justify-between items-center drag h-14">
    <div class="flex items-center pl-5">
      <IconPark :icon="Left" :size="iconSize" :stroke-width="2" class="icon-button" @click="router.back()"></IconPark>
      <IconPark :icon="Right" :size="iconSize" :stroke-width="2" class="icon-button"></IconPark>
      <div class="search no-drag ml-2">
        <SearchPop />
      </div>
    </div>
    <div class="flex items-center mr-5">
      <UserInfo />
      <IconPark :icon="Mail" :stroke-width="2" class="icon-button"></IconPark>
      <IconPark :icon="Platte" :stroke-width="2" class="icon-button" @click="changeThemeMode"></IconPark>
      <IconPark :icon="HamburgerButton" :stroke-width="2" class="icon-button"></IconPark>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Left, Right, Mail, Platte, HamburgerButton } from '@icon-park/vue-next';
import IconPark from "@/components/common/IconPark.vue";
import UserInfo from "./UserInfo.vue";
import SearchPop from "./SearchPop.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const iconSize = 22;
const router = useRouter();
const mode = ref(false);

const changeThemeMode = () => {
  window.document.documentElement.setAttribute('date-theme', mode.value ? 'dark' : 'light' );
  mode.value = !mode.value;
}

</script>

<style lang="scss">
.search {
  @apply text-xs;
  :deep(.el-input__inner) {
    @apply rounded-full text-xs bg-slate-100 dark:bg-stone-900;
  }
}
.icon-button {
  @apply p-2 cursor-pointer;
  @apply hover:text-emerald-400;
}
</style>