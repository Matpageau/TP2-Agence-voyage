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
  const resTravel = await axios.get(`http://localhost:3000/travels`)
  travels.value = resTravel.data
})

</script>

<template>
  <main class="flex flex-col">
    <Navbar />
    <div class="flex flex-col flex-grow items-center justify-center text-black">
      
    </div>
  </main>
</template>

