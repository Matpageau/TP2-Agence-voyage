<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

const props = defineProps<{
  modelValue: string
  placeholder?: string
  error?: string
  type?: InputTypeHTMLAttribute
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col w-full">
    <input
      :type="props.type ?? 'text'"
      :placeholder="props.placeholder"
      class="w-full bg-white text-black p-2 rounded-md border border-gray-300"
      :class="{ 'border-red-500': props.error }"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span
      v-if="error"
      class="text-red-600 text-sm mt-1 min-h-[1.25rem]" 
      aria-live="polite"
    >
      {{ props.error || '\u00A0' }}
    </span>
  </div>
</template>
