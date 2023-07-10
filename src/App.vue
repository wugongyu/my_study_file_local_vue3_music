<template>
  <RouterView v-if="isInit"></RouterView>
  <Host v-else></Host>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import Host from './Host.vue';
import { useHostStore } from '@/stores/host';

const { isInit } = toRefs(useHostStore());


</script>

<style lang="scss"></style>