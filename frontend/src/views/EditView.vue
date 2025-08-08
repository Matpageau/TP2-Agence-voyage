<script setup lang="ts">
import BaseModal from '@/components/Modal/BaseModal.vue';
import FilterBtn from '@/components/shared/Buttons/FilterBtn.vue';
import TravelCard from '@/components/shared/Card/TravelCard.vue';
import TextInput from '@/components/shared/Inputs/TextInput.vue';
import NavbarComp from '@/components/shared/Navbar/NavbarComp.vue';
import router from '@/router';
import type { TravelData } from '@/types/Travel';
import axios, { AxiosError } from 'axios';
import { computed, onMounted, ref, watch } from 'vue';
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

watch([title, description, type, destination, poi, price, departure_date, arrival_date, imageUrl], () => {
  errorMsg.value = ""  
})

const handleSave = async () => {
  try {
    if(travelId) {
      const resSave = await axios.put(`http://localhost:3000/travels/${travelId}`, travel.value)
  
      if(resSave.data) {
        router.push({
          path: '/',
          query: {
            message: 'saved'
          }
        })
      }
    }else {
      const resSave = await axios.post(`http://localhost:3000/travels`, travel.value)

      if(resSave.data) {
        router.push({
          path: '/',
          query: {
            message: 'saved'
          }
        })
      }
    }
  } catch (error) {
    const err = error as AxiosError<{ code?: string }>
    errorMsg.value = err.response?.data?.code ?? "UNKNOWN_ERROR"
    console.error(err)
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
  }
})
</script>

<template>
  <main class="flex flex-col h-screen">
    <BaseModal 
      v-if="isModalOpen"
      class="text-black"
      @close="isModalOpen = false"
    >
      <b>{{ t('cancel_change') }}</b>
      <div class="flex justify-center mt-6">
        <FilterBtn @click="router.push('/')" class="text-white bg-[var(--rouge)] hover:bg-[var(--rouge_hover)]">{{ t('yes') }}</FilterBtn>
        <FilterBtn @click="isModalOpen = false" class="ml-3 text-white bg-[var(--cyan)] hover:bg-[var(--cyan_hover)]">{{ t('no') }}</FilterBtn>
      </div>
    </BaseModal>
    <NavbarComp />
    <div class="flex flex-col flex-grow items-center text-black">
      <div class="flex w-full p-3 md:w-6/8 mt-5 gap-5">
        <div class="flex-2">
          <h1 class="font-bold mt-6 text-2xl">{{ t('edit_travel') }}</h1>
          <div class="flex flex-col items-end mt-3">
            <form action="" class="flex flex-col gap-3 w-full">
              <div>
                <label for="tle">{{ t('title') }}</label>
                <TextInput 
                  id="tle" 
                  v-model="title" 
                  type="text"
                  :error="errorMsg === 'INVALID_TITLE' ? t('INVALID_TITLE') : ''"
                />
              </div>
              <div class="flex flex-col">
                <label for="desc">{{ t('description') }}</label>
                <textarea
                  id="desc"
                  v-model="description" name="" 
                  :class="['w-full !h-[120px] bg-white text-black p-2 rounded-md border border-gray-300 resize-none', {'border-red-500': errorMsg == 'INVALID_DESCRIPTION'}]"
                >
                </textarea>
                <span
                  v-if="errorMsg == 'INVALID_DESCRIPTION'"
                  class="text-red-600 text-sm mt-1 min-h-[1.25rem]" 
                  aria-live="polite"
                >
                  {{ 'INVALID_DESCRIPTION' }}
                </span>
              </div>
              <div class="flex flex-col">
                <label for="type">{{ t('type') }}</label>
                <select v-model="type" name="type-select" id="type" class="h-full text-left p-2 border border-gray-300 rounded-md focus:ring focus:ring-black">
                  <option value="inclusive">{{ t('allInclusive') }}</option>
                  <option value="backpack">{{ t('backpack') }}</option>
                </select>
              </div>
              <div>
                <label for="des">{{ t('destination') }}</label>
                <TextInput
                  id="des"
                  v-model="destination"
                  type="text"
                  :error="errorMsg === 'INVALID_DESTINATION' ? t('INVALID_DESTINATION') : ''"
                />
              </div>
              <div>
                <label for="pois">{{ t('poi') }}</label>
                <TextInput 
                  id="pois"
                  v-model="poi"
                  type="number"
                  :min="0"
                  :error="errorMsg === 'INVALID_POI' ? t('INVALID_POI') : ''"
                />
              </div>
              <div>
                <label for="pri">{{ t('price') }}</label>
                <TextInput 
                  id="pri"
                  v-model="price"
                  type="number"
                  :min="0"
                  :error="errorMsg === 'INVALID_PRICE' ? t('INVALID_PRICE') : ''"
                />
              </div>
              <div class="flex gap-3">
                <div class="w-1/2">
                  <label for="ddate">{{ t('dep_date') }}</label>
                  <TextInput 
                    id="ddate"
                    v-model="departure_date"
                    type="date"
                    :error="errorMsg === 'INVALID_DEP_DATE' ? t('INVALID_DEP_DATE') : ''"
                  />
                </div>
                <div class="flex-grow">
                  <label for="adate">{{ t('arr_date') }}</label>
                  <TextInput 
                    id="adate"
                    v-model="arrival_date"
                    type="date"
                    :error="errorMsg === 'INVALID_ARR_DATE' ? t('INVALID_ARR_DATE') : ''"
                  />
                </div>
              </div>
              <div>
                <label for="iUrl">{{ t('img_url') }}</label>
                <TextInput
                  id="iUrl"
                  v-model="imageUrl"
                  type="text"
                  :error="errorMsg === 'INVALID_URL' ? t('INVALID_URL') : ''"
                />
              </div>
            </form>
            <div class="flex w-fit mt-6">
              <FilterBtn @click="isModalOpen = true" class="ml-3 bg-[var(--rouge)] hover:bg-[var(--rouge_hover)] text-white">{{ t('cancel') }}</FilterBtn>
              <FilterBtn @click="handleSave" class="ml-3 bg-[var(--cyan)] hover:bg-[var(--cyan_hover)] text-white">{{ t('save') }}</FilterBtn>
            </div>
          </div>
        </div>
        <div class="hidden lg:flex flex-1 w-fit justify-end">
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