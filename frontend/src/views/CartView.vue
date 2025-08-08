@ -1,47 +1,59 @@
<script setup lang="ts">
import TravelCardCart from '@/components/shared/Card/TravelCardCart.vue';
import NavbarComp from '@/components/shared/Navbar/NavbarComp.vue';
import { useUserStore } from '@/stores/userStore';
import type { TravelData } from '@/types/Travel';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const userStore = useUserStore()

const cartItems = ref<{travel: TravelData, quantity: number}[]>([])

const fetchTravels = async () => {
  try {
    const travelRes = await axios.get(`http://localhost:3000/travels`)

    if(travelRes.data) {
      console.log(travelRes.data.travels);
      
      const cartTravels = travelRes.data.travels.filter((travel: TravelData) => 
        userStore.currentUser?.cart.some(trav => trav.travelId == travel._id)
      )
      .map((travel: TravelData) => {
        const cartItems = userStore.currentUser?.cart.find((item) => item.travelId == travel._id)
        return {
          travel,
          quantity: cartItems?.quantity || 1
        }
      })
      cartItems.value = cartTravels
    }
  } catch (error) {
    const err = error as AxiosError<{ code?: string }>
    console.error(err)
  }
}

onMounted(async () => {
  fetchTravels()
})
</script>

<template>
  <main class="flex flex-col">
    <NavbarComp />
    <div class="flex flex-col h-full items-center justify-center text-black">
      <div class="w-6/8 h-full flex flex-col">
        <h1 class="font-bold mt-6 text-2xl">Votre panier</h1>
        <div class="flex gap-6 flex-grow min-h-0">
          <div class="flex-1 overflow-y-auto mt-10">
            <div class="flex flex-col gap-3">
              <TravelCardCart 
                v-for="item in cartItems"
                :key="item.travel._id"
                :travel="item.travel"
                :quantity="item.quantity"
                @delete="fetchTravels"
              />
            </div>
          </div>
          <div class="w-1/2 bg-[var(--cyan)] rounded-xl">

          </div>
        </div>
      </div>
    </div>
  </main>
</template>