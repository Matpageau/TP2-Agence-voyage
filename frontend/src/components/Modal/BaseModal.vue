<script setup lang="ts">
import XIcon from '@/components/icons/XIcon.vue';

const emit = defineEmits<{
  (e: "close"): void
}>()

</script>

<template>
  <div class="flex absolute w-screen h-screen justify-center items-center z-20 bg-[#00000085]">
    <div class="h-fit w-fit">
      <div class="flex relative flex-col bg-white h-full rounded p-2">
        <XIcon class="absolute cursor-pointer self-end mb-2" @click="emit('close')"/>
        <div class="px-10 py-5">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>