<script setup lang="ts">
import TravelCard from '@/components/shared/Card/TravelCard.vue';
import type { TravelData } from '@/types/Travel';

const props = defineProps<{
  travel: TravelData[]
}>()

</script>

<template>
  <div id="travelsContainer" class="grid grid-cols-3 h-full gap-3">
    <TravelCard 
      v-for="travel in props.travel"
      :key="travel._id"
      :travel="travel"
    />
  </div>
</template>

<style scoped>
@media (max-width: 1200px) {
  #travelsContainer {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 850px) {
  #travelsContainer {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>