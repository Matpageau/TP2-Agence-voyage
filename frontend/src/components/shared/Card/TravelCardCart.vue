<script setup lang="ts">
import type { TravelData } from '@/types/Travel';
import { DateTime } from 'luxon';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BoldButton from '../Buttons/BoldButton.vue';
import type { AxiosError } from 'axios';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';

const { t, n } = useI18n()
const userStore = useUserStore()

const props = defineProps<{
  travel: TravelData
  quantity: number
}>()

const handleRemove = async () => {
  try {
    await axios.patch(`http://localhost:3000/users/cart/${userStore.currentUser?._id}`, {
      action: 'remove',
      travelId: props.travel._id
    })

    userStore.fetchUser(true)
  } catch (error) {
    const err = error as AxiosError<{ code?: string }>
    console.error(err)
  }
}

const travelDurationInDays = computed(() => {
  const arrial = DateTime.fromISO(props.travel.arrival_date)
  const departure = DateTime.fromISO(props.travel.departure_date)

  if(!arrial.isValid || !departure.isValid) return 0

  return arrial.diff(departure, 'days').days
})
</script>

<template>
  <div class="flex h-[150px] overflow-hidden rounded-md border border-neutral-200 shadow">
    <div class="relative w-1/3 shrink-0">
      <img :src="props.travel.img_url" alt="" class="w-full h-full object-cover">
      <h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold text-center text-nowrap">{{ props.travel.destination }}</h1>
    </div>
    <div class="p-1 w-full flex flex-col justify-between">
      <div>
        <h1 class="text-2xl font-bold">{{ props.travel.title }}</h1>
        <p v-if="travelDurationInDays" class="">{{ t("days", Math.round(travelDurationInDays)) }}</p>
      </div>
      <div class="flex flex-col items-end">
        <div class="flex items-center">
          <p>{{ props.quantity + ' X' }}</p>
          <h1 class="ml-3 text-3xl font-bold text-[var(--cyan)]">
            {{ n(Number(props.travel.price || 0), 'currency') }}
          </h1>
        </div>
        <BoldButton 
          class="bg-[var(--rouge)] hover:bg-[var(--rouge_hover)]"
          @click="handleRemove"
        >
          Retirer
        </BoldButton>
      </div>
    </div>
  </div>
</template>