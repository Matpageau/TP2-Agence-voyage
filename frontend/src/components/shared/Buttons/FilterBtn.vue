<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()

const props = defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <button 
    class="cursor-pointer px-1 md:px-3 lg:px-5 w-full md:w-fit rounded-full border border-neutral-300 transition-colors disabled:cursor-not-allowed"
    @click="emit('click')"
    :disabled="props.disabled ?? false"
  >
    <slot></slot>
  </button>
</template>  