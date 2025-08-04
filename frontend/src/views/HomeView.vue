<script setup lang="ts">
import FilterBtn from '@/components/shared/Buttons/FilterBtn.vue';
import TravelGrid from '@/components/shared/Card/TravelGrid.vue';
import TextInput from '@/components/shared/Inputs/TextInput.vue';
import Navbar from '@/components/shared/Navbar/Navbar.vue';
import { useUserStore } from '@/stores/userStore';
import type { TravelData } from '@/types/Travel';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore()
const { t } = useI18n()
const searchValue = ref("")
const typeValue = ref("all")
const filerValue = ref("")

const travels = ref<TravelData[]>([])

const filteredTravels = computed(() => {
  let result = travels.value.filter((travel) => {
    const matchesSearch = !searchValue.value ||
      travel.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      travel.destination.toLowerCase().includes(searchValue.value.toLowerCase())

    const matchesType = typeValue.value === 'all' || travel.type === typeValue.value
    const matchsFav = filerValue.value != "fav" || (userStore.currentUser?.liked.includes(travel._id) ?? false)

    return matchesSearch && matchesType && matchsFav
  })

  if(filerValue.value == "asc") {
    result = [...result].sort((a,b) => a.price - b.price)
  }else if(filerValue.value == "des") {
    result = [...result].sort((a,b) => b.price - a.price)
  }

  return result
})

onMounted(async () => {
  const resTravel = await axios.get(`http://localhost:3000/travel`)
  travels.value = resTravel.data
})

</script>

<template>
  <main class="flex flex-col">
    <Navbar />
    <div class="flex flex-col flex-grow items-center justify-center text-black">
      <div class="w-6/8 h-full flex flex-col">
        <h1 class="font-bold mt-6 text-2xl">{{ t("ourTravels") }}</h1>
        <div class="flex justify-between mt-3 items-center">
          <div class="flex">
            <TextInput v-model="searchValue" :placeholder="t('search')" type="search"/>
            <select v-model="typeValue" name="type" class="ml-3 h-full text-left pr-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-black">
              <option value="all">{{ t('allType') }}</option>
              <option value="inclusive">{{ t('allInclusive') }}</option>
              <option value="backpack">{{ t('backpack') }}</option>
            </select>
          </div>
          <div class="flex gap-3">
            <FilterBtn v-if="userStore.currentUser" @click="filerValue = 'fav'" :class="filerValue == 'fav' ? 'bg-[var(--cyan)] text-white' : ''">
              {{ t('favorite') }}
            </FilterBtn>
            <FilterBtn @click="filerValue = 'asc'" :class="filerValue == 'asc' ? 'bg-[var(--cyan)] text-white' : ''">
              {{ t('ascPrice') }}
            </FilterBtn>
            <FilterBtn @click="filerValue = 'des'" :class="filerValue == 'des' ? 'bg-[var(--cyan)] text-white' : ''">
              {{ t('desPrice') }}
            </FilterBtn>
          </div>
        </div>
        <div class="mt-6 flex-grow">
          <TravelGrid :travel="filteredTravels"/>
        </div>
      </div>
    </div>
  </main>
</template>

