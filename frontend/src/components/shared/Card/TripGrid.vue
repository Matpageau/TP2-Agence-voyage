<script setup lang="ts">
import TripCard from '@/components/shared/Card/TripCard.vue';
import type { TripData } from '@/types/Trip';

const props = defineProps<{
  trips: TripData[]
}>()
console.log(props.trips);

</script>

<template>
  <div class="grid grid-cols-3 h-full gap-3">
    <TripCard 
      v-for="trip in props.trips"
      :key="trip._id"
      :trip="trip"
    />
  </div>
</template>