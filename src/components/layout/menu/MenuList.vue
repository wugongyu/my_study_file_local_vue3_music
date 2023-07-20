<template>
  <ElScrollbar>
    <div class="mt-10 pl-6 pr-6 space-y-1.5" v-for="menuItem in menus">
      <div class="menu-title text-main">{{ menuItem.name }}</div>
      <div
        class="menu-item hover-bg-main text-main"
        v-for="subMenuItem in menuItem.menus"
        :key="subMenuItem.key"
        :class="{ 'active': currentMenuKey === subMenuItem.key }"
        @click="clickHandler(subMenuItem)"
      >
        <IconPark :icon="subMenuItem.icon" size="18" :theme="subMenuItem.theme" />
        <span class="ml-1">{{ subMenuItem.name }}</span>
      </div>

    </div>
  </ElScrollbar>

</template>

<script setup lang="ts">
import IconPark from "@/components/common/IconPark.vue";
import { useMenu } from './useMenu';

const { menus, currentMenuKey, clickHandler } = useMenu();
</script>

<style lang="scss" scoped>
.menu-title {
  @apply text-xs pl-4 pr-4 pb-2;
}

.menu-item {
  @apply text-sm pl-4 pr-4 pt-1.5 pb-1.5 rounded cursor-pointer transition-colors flex items-center;
}

.active{
  @apply bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-50 cursor-default;
}


</style>