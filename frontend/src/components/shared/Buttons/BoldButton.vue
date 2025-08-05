<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()

const props = defineProps<{
  href?: string
  disabled?: boolean
}>()
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :href="props.href"
    class="cursor-pointer py-2 px-10 rounded-xl font-bold text-lg transition-colors disabled:cursor-not-allowed"
    @click="emit('click')"
    :disabled="props.disabled ?? false"
  >
    <slot></slot>
  </component>
</template>  