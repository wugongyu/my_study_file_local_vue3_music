<template>
  <Component
    :is="icon"
    :theme="theme"
    :size="size"
    :spin="spin"
    :strokeLinecap="strokeLinecap"
    :strokeLinejoin="strokeLinejoin"
    :strokeWidth="strokeWidth"
  ></Component>
</template>

<script setup lang="ts">
import type { Icon } from '@icon-park/vue-next/lib/runtime';

defineProps<{
  icon: Icon,
  theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color',
  size?: number | string,
  spin?: boolean,
  strokeLinecap?: 'butt' | 'round' | 'square',
  strokeLinejoin?: 'miter' | 'round' | 'bevel',
  strokeWidth?: number,
}>()
</script>
