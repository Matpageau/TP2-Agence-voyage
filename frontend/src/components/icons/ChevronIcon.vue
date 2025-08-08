<script setup lang="ts">

const props = defineProps<{
  direction?: string
  active: boolean
}>()

const emit = defineEmits<{
  (e: 'change-page', value: string): void
}>()

const handleClick = (dir: string) => {
  emit('change-page', dir)
}
</script>

<template>
  <svg v-if="props.direction === 'left'" @click="handleClick('down')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" :class="props.active ? 'hover:cursor-pointer hover:text-neutral-400' : 'opacity-[0.3]'">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
  <svg v-else xmlns="http://www.w3.org/2000/svg" @click="handleClick('up')" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" :class="props.active ? 'hover:cursor-pointer hover:text-neutral-400' : 'opacity-[0.3]'">
    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
</template>