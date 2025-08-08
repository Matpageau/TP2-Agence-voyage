<script setup lang="ts">
import ChevronIcon from '@/components/icons/ChevronIcon.vue';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: number //Selected Page
  travelCount: number
  totalPages: number
}>()

const activeLeftChevron = computed(() => {
  return props.modelValue !== 1
})

const activeRightChevron = computed(() => {
  return props.totalPages > props.modelValue
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change-page', value: string): void
}>()

const selectPageByNum = (page: number) => {
  emit('update:modelValue', page)
}

const changePage = (dir: string) => {
  emit('change-page', dir)
}
</script>

<template>
  <div class="flex w-fit justify-between items-center gap-1 md:gap-3 lg:gap-5">
    <ChevronIcon direction="left" @change-page="changePage" :active="activeLeftChevron" />
    <div class="flex gap-4 text-xl">
      <button 
        v-for="page in props.totalPages"
        :key="page" 
        @click="selectPageByNum(page)" 
        :class="page === props.modelValue ? 'font-bold' : 'hover:cursor-pointer hover:text-neutral-400'"
        >{{ page }}</button>
    </div>
    <ChevronIcon @change-page="changePage" :active="activeRightChevron" />
  </div>
</template>