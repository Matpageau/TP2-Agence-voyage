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
    class="cursor-pointer py-2 px-10 rounded-xl font-bold text-lg transition-colors disabled:cursor-not-allowed disabled:bg-[var(--cyan)]/50"
    @click="emit('click')"
    :disabled="props.disabled ?? false"
  >
    <slot></slot>
  </button>
</template>  