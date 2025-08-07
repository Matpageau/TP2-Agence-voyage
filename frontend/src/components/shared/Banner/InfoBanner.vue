<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="flex items-center justify-center h-[50px] bg-[var(--green)]">
    <p class="text-black font-semibold text-2xl">{{ props.text }}</p>
  </div>
</template>