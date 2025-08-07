<script setup lang="ts">
import type { TravelData } from '@/types/Travel';
import { useI18n } from 'vue-i18n';
import { DateTime } from 'luxon';
import BoldButton from '../Buttons/BoldButton.vue';
import Heart from '@/components/icons/Heart.vue';
import axios, { AxiosError } from 'axios';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';
import defaultImage from '@/assets/img/placeholder-image.png'

const userStore = useUserStore()
const { locale, t, n } = useI18n()

const props = defineProps<{
  travel: TravelData
}>()

const isLiked = computed(() =>
  userStore.currentUser?.liked.includes(props.travel._id ?? "") ?? false
)

const handleLikeButton = async () => {  
  try {
    const action = isLiked.value ? 'dislike' : 'like'
    await axios.patch(`http://localhost:3000/users/${userStore.currentUser?._id}`, {
      action,
      travelId: props.travel._id
    })

    await userStore.fetchUser(true)
    
  } catch (error) {
    const err = error as AxiosError<{ code?: string }>
    console.error(err)
  }
}

const handleBookButton = async () => {
  try {
    await axios.patch(`http://localhost:3000/users/cart/${userStore.currentUser?._id}`, {
      action: 'add',
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
  <div class="flex flex-col w-full border-1 border-neutral-300 h-[500px] rounded-xl overflow-hidden">
    <div class="relative h-1/2">
      <img :src="props.travel.img_url && props.travel.img_url.trim() !== '' ? props.travel.img_url : defaultImage" alt="travel img" class="w-full h-full object-cover" />
      <h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold text-center text-nowrap">{{ props.travel.destination }}</h1>
    </div>
    <div class="flex flex-col justify-between p-2 flex-grow">
      <div class="flex justify-between">
        <div class="w-full">
          <h2 class="text-3xl font-bold">{{ props.travel.title }}</h2>
          <p class="w-2/3 text-sm">{{ props.travel.description }}</p>
        </div>
        <div class="w-1/2 justify-end text-end">
          <h1 class="font-bold">{{ props.travel.type == "backpack" ? t("backpack") : t("inclusive") }}</h1>
          <p><b>{{ props.travel.poi }}</b> {{ t("pois", props.travel.poi) }}</p>
        </div>
      </div>
      <div class="flex justify-between items-end">
        <div>
          <p v-if="props.travel.departure_date">{{ DateTime.fromISO(props.travel.departure_date).setLocale(locale).toFormat("DDD") }}</p>
          <p v-if="travelDurationInDays">{{ t("days", Math.round(travelDurationInDays)) }}</p>
        </div>
        <div class="flex flex-col items-end">
          <h1 class="text-3xl font-bold text-[var(--cyan)]">
            {{ n(Number(props.travel.price || 0), 'currency') }}
          </h1>
          <div class="flex h-fit">
            <div class="h-full w-[44px]">
              <Heart v-if="userStore.currentUser && userStore.currentUser.role == 'user'" class="h-full aspect-square cursor-pointer" :onclick="handleLikeButton" :class="[isLiked ? 'fill-red-600 stroke-1 stroke-red-600' : '', 'transition-colors']"/>
            </div>
            <BoldButton
              v-if="userStore.currentUser?.role == 'admin' || userStore.currentUser?.role == 'manager'"
              class="bg-[var(--orange)] hover:bg-[var(--orange_hover)]"
              :href="travel._id ? `/admin/travel/${travel._id}` : undefined"
              :disabled="true"
            >
              {{ t("edit") }}
            </BoldButton>
            <BoldButton
              v-else
              class="bg-[var(--orange)] hover:bg-[var(--orange_hover)]"
              @click="handleBookButton"
            >
              {{ t("book") }}
            </BoldButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>