<script setup lang="ts">
import TripGrid from '@/components/shared/Card/TripGrid.vue';
import Navbar from '@/components/shared/Navbar/Navbar.vue';
import type { TripData } from '@/types/Trip';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const trips = ref<TripData[]>([
  {
    _id: "trip_001",
    title: "Aventure au Pérou",
    description: "Un voyage inoubliable à travers les Andes, le Machu Picchu et la culture péruvienne.",
    destination: "Pérou",
    price: 2568,
    img_url: "https://media.istockphoto.com/id/479900992/photo/lama-and-machu-picchu.jpg?s=612x612&w=0&k=20&c=yaYLXBJ6OAgfnBbaU4SofEGtusKfpZHv5BeIa_4pqv4=",
    poi_ids: ["poi_1001", "poi_1002", "poi_1003"],
    departure_date: "2025-08-15T10:00:00.000Z",
    arrival_date: "2025-08-29T18:00:00.000Z",
    departure_city: "Montréal",
    arrival_city: "Lima",
    type: "backpack"
  },
  {
    _id: "trip_001",
    title: "Aventure au Pérou",
    description: "Un voyage inoubliable à travers les Andes, le Machu Picchu et la culture péruvienne.",
    destination: "Pérou",
    price: 2568,
    img_url: "https://media.istockphoto.com/id/479900992/photo/lama-and-machu-picchu.jpg?s=612x612&w=0&k=20&c=yaYLXBJ6OAgfnBbaU4SofEGtusKfpZHv5BeIa_4pqv4=",
    poi_ids: ["poi_1001", "poi_1002", "poi_1003"],
    departure_date: "2025-08-15T10:00:00.000Z",
    arrival_date: "2025-08-29T18:00:00.000Z",
    departure_city: "Montréal",
    arrival_city: "Lima",
    type: "backpack"
  },
  {
    _id: "trip_001",
    title: "Aventure au Pérou",
    description: "Un voyage inoubliable à travers les Andes, le Machu Picchu et la culture péruvienne.",
    destination: "Pérou",
    price: 2568,
    img_url: "https://media.istockphoto.com/id/479900992/photo/lama-and-machu-picchu.jpg?s=612x612&w=0&k=20&c=yaYLXBJ6OAgfnBbaU4SofEGtusKfpZHv5BeIa_4pqv4=",
    poi_ids: ["poi_1001", "poi_1002", "poi_1003"],
    departure_date: "2025-08-15T10:00:00.000Z",
    arrival_date: "2025-08-29T18:00:00.000Z",
    departure_city: "Montréal",
    arrival_city: "Lima",
    type: "backpack"
  },
  {
    _id: "trip_001",
    title: "Aventure au Pérou",
    description: "Un voyage inoubliable à travers les Andes, le Machu Picchu et la culture péruvienne.",
    destination: "Pérou",
    price: 2568,
    img_url: "https://media.istockphoto.com/id/479900992/photo/lama-and-machu-picchu.jpg?s=612x612&w=0&k=20&c=yaYLXBJ6OAgfnBbaU4SofEGtusKfpZHv5BeIa_4pqv4=",
    poi_ids: ["poi_1001", "poi_1002", "poi_1003"],
    departure_date: "2025-08-15T10:00:00.000Z",
    arrival_date: "2025-08-29T18:00:00.000Z",
    departure_city: "Montréal",
    arrival_city: "Lima",
    type: "backpack"
  }
])

onMounted(() => {

})

</script>

<template>
  <main class="flex flex-col">
    <Navbar :user="null"/>
    <div class="flex flex-col flex-grow items-center justify-center text-black">
      <div class="w-6/8 h-full flex flex-col">
        <h1 class="font-bold mt-6 text-2xl">{{ t("ourTrips") }}</h1>
        <div class="mt-6 flex-grow">
          <TripGrid :trips="trips"/>
        </div>
      </div>
    </div>
  </main>
</template>

