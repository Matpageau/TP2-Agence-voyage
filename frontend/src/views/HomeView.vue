<script setup lang="ts">
import InfoBanner from '@/components/shared/Banner/InfoBanner.vue';
import BoldButton from '@/components/shared/Buttons/BoldButton.vue';
import FilterBtn from '@/components/shared/Buttons/FilterBtn.vue';
import TravelGrid from '@/components/shared/Card/TravelGrid.vue';
import TextInput from '@/components/shared/Inputs/TextInput.vue';
import NavbarComp from '@/components/shared/Navbar/NavbarComp.vue';
import { useUserStore } from '@/stores/userStore';
import type { TravelData } from '@/types/Travel';
import axios, { AxiosError } from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { t } = useI18n()

const bannerMessage = computed(() => {
  if (route.query.message === 'saved') {
    return t('SAVED')
  }
  return ''
})
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
    const matchsFav = filerValue.value != "fav" || (userStore.currentUser?.liked.includes(travel._id ?? "") ?? false)

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
  try {
    const resTravel = await axios.get(`http://localhost:3000/travels`)
    travels.value = resTravel.data
  } catch (error) {
    const err = error as AxiosError<{ code?: string }>
    console.error(err)
  }

  if (route.query.message) {
    setTimeout(() => {
      router.replace({ path: '/', query: {} })
    }, 3000)
  }
})

const setFilterValue = (val: string) => {
  if(filerValue.value == val) {
    filerValue.value = ""
  }else{
    filerValue.value = val
  } 
}

</script>

<template>
  <main class="flex flex-col">
    <NavbarComp />
    <InfoBanner v-if="bannerMessage" :text="bannerMessage"/>
    <div class="flex flex-col flex-grow items-center justify-center text-black">
      <div class="w-6/8 h-full flex flex-col">
        <h1 class="font-bold mt-6 text-2xl">{{ t("ourTravels") }}</h1>
        <BoldButton 
          v-if="userStore.currentUser?.role == 'manager' || userStore.currentUser?.role == 'admin'"
          class="bg-[var(--cyan)] hover:bg-[var(--cyan_hover)] text-white w-fit mt-2"
          :href="`/admin/travel/create`"
          @click="null"
        >
          {{ t('create') }}
        </BoldButton>
        <div class="flex justify-between mt-2 items-center">
          <div class="flex w-1/3">
            <TextInput v-model="searchValue" :placeholder="t('search')" type="search"/>
            <select v-model="typeValue" name="type" class="ml-3 h-full text-left pr-10 p-2 border border-gray-300 rounded-md focus:ring focus:ring-black">
              <option value="all">{{ t('allType') }}</option>
              <option value="inclusive">{{ t('allInclusive') }}</option>
              <option value="backpack">{{ t('backpack') }}</option>
            </select>
          </div>
          <div class="flex gap-3">
            <FilterBtn v-if="userStore.currentUser && userStore.currentUser.role == 'user'" @click="setFilterValue('fav')" :class="filerValue == 'fav' ? 'bg-[var(--cyan)] text-white' : ''">
              {{ t('favorite') }}
            </FilterBtn>
            <FilterBtn @click="setFilterValue('asc')" :class="filerValue == 'asc' ? 'bg-[var(--cyan)] text-white' : ''">
              {{ t('ascPrice') }}
            </FilterBtn>
            <FilterBtn @click="setFilterValue('des')" :class="filerValue == 'des' ? 'bg-[var(--cyan)] text-white' : ''">
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

