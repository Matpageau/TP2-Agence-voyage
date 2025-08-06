<script setup lang="ts">
import TravelCard from '@/components/shared/Card/TravelCard.vue';
import TextInput from '@/components/shared/Inputs/TextInput.vue';
import Navbar from '@/components/shared/Navbar/Navbar.vue';
import type { TravelData } from '@/types/Travel';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n()

const title = ref("")
const description = ref("")
const type = ref<'backpack' | 'inclusive'>('inclusive')
const destination = ref("")
const poi = ref(0)
const price = ref<number>(0)
const departure_date = ref("")
const arrival_date = ref("")
const imageUrl = ref("")


const route = useRoute()
const travelId = route.params.travelId as string

const travel = computed<TravelData>(() => ({
  title: title.value,
  description: description.value,
  destination: destination.value,
  arrival_date: arrival_date.value,
  departure_date: departure_date.value,
  poi: poi.value,
  price: price.value,
  type: type.value,
  img_url: imageUrl.value
}))

onMounted(async () => {
  if(travelId) {
    const resTravel = await axios.get<TravelData>(`http://localhost:3000/travels/${travelId}`)
    const travelData = resTravel.data

    title.value = travelData.title
    description.value = travelData.description
    type.value = travelData.type
    destination.value = travelData.destination
    poi.value = travelData.poi
    price.value = travelData.price
    departure_date.value = travelData.departure_date.split("T")[0]
    arrival_date.value = travelData.arrival_date.split("T")[0]
    imageUrl.value = travelData.img_url

    console.log(travelData);
    
  }
})
</script>

<template>
  <main class="flex flex-col">
    <Navbar />
    <div class="flex flex-col flex-grow items-center justify-center text-black">
      <div class="flex w-full mt-10">
        <div class="flex justify-center w-2/3">
          <form action="" class="flex flex-col gap-3 w-2/3">
            <div>
              <label for="tle">Titre</label>
              <TextInput id="tle" v-model="title" type="text"/>
            </div>
            <div class="flex flex-col">
              <label for="desc">Description</label>
              <textarea v-model="description" name="" id="desc" class="w-full !h-[120px] bg-white text-black p-2 rounded-md border border-gray-300 resize-none"></textarea>
            </div>
            <div class="flex flex-col">
              <label for="type">Type</label>
              <select v-model="type" name="type-select" id="type" class="h-full text-left p-2 border border-gray-300 rounded-md focus:ring focus:ring-black">
                <option value="inclusive">{{ t('allInclusive') }}</option>
                <option value="backpack">{{ t('backpack') }}</option>
              </select>
            </div>
            <div>
              <label for="des">Destination</label>
              <TextInput id="des" v-model="destination" type="text"/>
            </div>
            <div>
              <label for="pois">Points d'intérets</label>
              <TextInput id="pois" v-model="poi" type="number" :min="0"/>
            </div>
            <div>
              <label for="pri">Price</label>
              <TextInput id="pri" v-model="price" type="number" :min="0"/>
            </div>
            <div class="flex gap-3">
              <div class="w-1/2">
                <label for="ddate">Date de départ</label>
                <TextInput id="ddate" v-model="departure_date" type="date"/>
              </div>
              <div class="flex-grow">
                <label for="adate">Date d'arrivée</label>
                <TextInput id="adate" v-model="arrival_date" type="date"/>
              </div>
            </div>
            <div>
              <label for="iUrl">Image URL</label>
              <TextInput id="iUrl" v-model="imageUrl" type="text"/>
            </div>
          </form>
        </div>
        <div class="flex w-1/2 justify-center">
          <div class="w-1/2 min-w-[400px]">
            <TravelCard 
              :travel="travel"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>