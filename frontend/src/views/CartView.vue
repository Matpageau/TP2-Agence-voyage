@ -1,47 +1,59 @@
<script setup lang="ts">
import BoldButton from '@/components/shared/Buttons/BoldButton.vue';
import TravelCardCart from '@/components/shared/Card/TravelCardCart.vue';
import TextInput from '@/components/shared/Inputs/TextInput.vue';
import NavbarComp from '@/components/shared/Navbar/NavbarComp.vue';
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
import type { TravelData } from '@/types/Travel';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const userStore = useUserStore()
const { t, n } = useI18n()

const cartItems = ref<{travel: TravelData, quantity: number}[]>([])

const firstName = ref("")
const email = ref("")
const adress = ref("")
const tel = ref("")
const cardNumber = ref("")
const expDate = ref("")
const CVC = ref("")
const totalAmount = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (item.travel.price || 0) * item.quantity
  }, 0)
})


const fetchTravels = async () => {
  try {
    const travelRes = await axios.get(`http://localhost:3000/travels`)

    if(travelRes.data) {      
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

const handlePaiement = () => {
  if(firstName.value && email.value && adress.value && tel.value && cardNumber.value && expDate.value && CVC.value) {
    if(userStore.currentUser?.cart) {
      userStore.currentUser.cart = []
    }

    axios.patch(`http://localhost:3000/users/clear-cart/${userStore.currentUser?._id}`)

    router.push({
      path: '/',
      query: {
        message: 'succesPaiement'
      }
    })
  }
}

onMounted(async () => {
  fetchTravels()
})
</script>

<template>
  <main class="flex flex-col h-screen overflow-hidden">
    <NavbarComp class="fixed w-full"/>
    <div class="flex flex-col h-full pt-[70px] items-center justify-center text-black">
      <div class="w-full p-3 md:w-6/8 h-full flex flex-col">
        <h1 class="font-bold mt-6 text-2xl">{{ t('yourCart') }}</h1>
        <div class="flex gap-6 flex-grow min-h-0 my-10">
          <div class="flex-1 overflow-y-auto">
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
          <div class="flex flex-col w-1/2 border border-neutral-200 rounded-xl p-5">
            <div class="flex flex-col gap-3">
              <div>
                <label for="firstname">{{ t('firstname') }}</label>
                <TextInput 
                  id="firstname"
                  v-model="firstName"
                  type="text"
                />
              </div>
              <div>
                <label for="email">Email</label>
                <TextInput 
                  id="email"
                  v-model="email"
                  type="email"
                />
              </div>
              <div>
                <label for="adrs">{{ t('adress') }}</label>
                <TextInput 
                  id="adrs"
                  v-model="adress"
                  type="text"
                />
              </div>
              <div>
                <label for="tel">{{ t('cellphone') }}</label>
                <TextInput 
                  id="tel"
                  v-model="tel"
                  type="tel"
                />
              </div>
            </div>
            <div class="h-[1px] bg-black my-10"></div>
            <div class="flex flex-col gap-3">
              <div>
                <label for="card">{{ t('cardNum') }}</label>
                <TextInput 
                  id="card"
                  v-model="cardNumber"
                  type="text"
                />
              </div>
              <div class="flex justify-between gap-5">
                <div class="w-full">
                  <label for="tel">{{ t('expiration') }}</label>
                  <TextInput 
                    id="exp"
                    v-model="expDate"
                    type="text"
                  />
                </div>
                <div class="w-full">
                  <label for="cvc">CVC</label>
                  <TextInput 
                    id="cvc"
                    v-model="CVC"
                    type="tel"
                  />
                </div>
              </div>
            </div>
            <div class="h-[1px] bg-black my-10"></div>
            <div class="flex justify-between">
              <h1 class="text-3xl font-bold">{{ 'Total: ' +  n(Number(totalAmount || 0), 'currency')}}</h1>
              <BoldButton 
                class="text-white bg-[var(--cyan)] hover:bg-[var(--cyan_hover)]"
                @click="handlePaiement"
              >
                {{ t('pay') }}
              </BoldButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>