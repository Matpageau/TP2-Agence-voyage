<script setup lang="ts">
import TravelCardCart from '@/components/shared/Card/TravelCardCart.vue';
import NavbarComp from '@/components/shared/Navbar/NavbarComp.vue';
import { useUserStore } from '@/stores/userStore';
import type { TravelData } from '@/types/Travel';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const userStore = useUserStore()

const cartItems = ref<TravelData[]>([])

onMounted(async () => {
  try {
    const travelRes = await axios.get(`http://localhost:3000/travels`)

    if(travelRes.data) {
      const cartTravels = travelRes.data.find((travel: TravelData) => userStore.currentUser?.cart.some(trav => trav.travelId == travel._id))
      cartItems.value = cartTravels
    }
  } catch (error) {
    const err = error as AxiosError<{ code?: string }>
    console.error(err)
  }
})
</script>

<template>
  <main class="flex flex-col">
    <NavbarComp />
    <div class="flex flex-col flex-grow items-center justify-center text-black">
      <div class="w-6/8 h-full flex flex-col">
        <h1 class="font-bold mt-6 text-2xl">Votre panier</h1>
        <div class="flex">
          <div class="w-1/2">
            <TravelCardCart 
              v-for="travel in cartItems"
              :key="travel._id"
              :travel="travel"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>