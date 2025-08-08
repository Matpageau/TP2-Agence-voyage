<script setup lang="ts">
import ChevronIcon from '@/components/icons/ChevronIcon.vue';
</script>

<template>
  <div class="flex items-center gap-5">
    <ChevronIcon direction="left" />
    <div class="grid grid-cols-5 items-center gap-4 text-lg">
      <p>1</p>
      <p>2</p>
      <p>...</p>
      <p>9</p>
      <p>10</p>
    </div>
    <ChevronIcon />
  </div>
</template>