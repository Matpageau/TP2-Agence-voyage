<script setup lang="ts">
import BaseModal from '@/components/Modal/BaseModal.vue';
import FilterBtn from '@/components/shared/Buttons/FilterBtn.vue';
import TravelCard from '@/components/shared/Card/TravelCard.vue';
import TextInput from '@/components/shared/Inputs/TextInput.vue';
import Navbar from '@/components/shared/Navbar/Navbar.vue';
import router from '@/router';
import type { TravelData } from '@/types/Travel';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n()

const isModalOpen = ref(false)
const errorMsg = ref()

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

const handleSave = async () => {
  try {
    if(travelId) {
      const resSave = await axios.patch(`http://localhost:3000/travels/${travelId}`)
  
      if(resSave.data) {
        router.push('/')
      }
    }else {
      const resSave = await axios.post(`http://localhost:3000/travels`)

      if(resSave.data) {
        router.push('/')
      }
    }
  } catch (error: any) {
    errorMsg.value = error.response.data.code || "UNKNOWN_ERROR"
    console.error(error)
  }
}

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
    <BaseModal 
      v-if="isModalOpen"
      class="text-black"
      @close="isModalOpen = false"
    >
      <b>Annuler les changements ?</b>
      <div class="flex justify-center mt-6">
        <FilterBtn @click="router.push('/')" class="text-white bg-[var(--rouge)] hover:bg-[var(--rouge_hover)]">{{ t('yes') }}</FilterBtn>
        <FilterBtn @click="isModalOpen = false" class="ml-3 text-white bg-[var(--cyan)] hover:bg-[var(--cyan_hover)]">{{ t('no') }}</FilterBtn>
      </div>
    </BaseModal>
    <Navbar />
    <div class="flex flex-col flex-grow items-center justify-center text-black">
      <div class="flex w-full mt-10 px-50">
        <div class="flex flex-col items-end w-2/3">
          <form action="" class="flex flex-col gap-3 w-full">
            <div>
              <label for="tle">Titre</label>
              <TextInput 
                id="tle" v-model="title" 
                type="text"
                :error="errorMsg === 'INVALID_TITLE' ? t('INVALID_TITLE') : ''"
              />
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
          <div class="w-fit mt-6">
            <FilterBtn @click="isModalOpen = true" class="ml-3 bg-[var(--rouge)] hover:bg-[var(--rouge_hover)] text-white">{{ t('cancel') }}</FilterBtn>
            <FilterBtn @click="handleSave" class="ml-3 bg-[var(--cyan)] hover:bg-[var(--cyan_hover)] text-white">{{ t('save') }}</FilterBtn>
          </div>
        </div>
        <div class="flex w-1/3 justify-end">
          <div class="w-1/3 min-w-[400px]">
            <TravelCard
              :travel="travel"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>