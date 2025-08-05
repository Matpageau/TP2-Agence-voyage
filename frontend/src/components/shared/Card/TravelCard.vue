<script setup lang="ts">
import type { TravelData } from '@/types/Travel';
import { useI18n } from 'vue-i18n';
import { DateTime } from 'luxon';
import BoldButton from '../Buttons/BoldButton.vue';
import Heart from '@/components/icons/Heart.vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore';
import { computed } from 'vue';

const userStore = useUserStore()
const { locale, t, n } = useI18n()

const props = defineProps<{
  travel: TravelData
}>()

const isLiked = computed(() =>
  userStore.currentUser?.liked.includes(props.travel._id) ?? false
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
    console.error(error)
  }
}

const tavelDurationInDays = DateTime
  .fromISO(props.travel.arrival_date)
  .diff(DateTime.fromISO(props.travel.departure_date), ['days'])
  .days
</script>

<template>
  <div class="flex flex-col w-full border-1 border-neutral-300 h-[500px] rounded-xl overflow-hidden">
    <div class="relative h-1/2">
      <img :src="props.travel.img_url" alt="travel img" class="w-full h-full object-cover">
      <h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold text-center">{{ props.travel.destination }}</h1>
    </div>
    <div class="flex flex-col justify-between p-2 flex-grow">
      <div class="flex justify-between">
        <div class="w-full">
          <h2 class="text-3xl font-bold">{{ props.travel.title }}</h2>
          <p class="w-2/3 text-sm">{{ props.travel.description }}</p>
        </div>
        <div class="w-1/2 justify-end text-end">
          <h1 class="font-bold">{{ props.travel.type == "backpack" ? t("inclusive") : t("backpack") }}</h1>
          <p><b>{{ props.travel.poi_ids.length}}</b> {{ t("pois", props.travel.poi_ids.length) }}</p>
        </div>
      </div>
      <div class="flex justify-between items-end">
        <div>
          <p>{{ DateTime.fromISO(props.travel.departure_date).setLocale(locale).toFormat("DDD") }}</p>
          <p>{{ t("days", Math.round(tavelDurationInDays)) }}</p>
        </div>
        <div class="flex flex-col items-end">
          <h1 class="text-3xl font-bold text-[var(--cyan)]">{{ n(props.travel.price, 'currency') }}</h1>
          <div class="flex h-fit">
            <div class="h-full w-[44px]">
              <Heart v-if="userStore.currentUser" class="h-full aspect-square cursor-pointer" :onclick="handleLikeButton" :class="[isLiked ? 'fill-red-600 stroke-1 stroke-red-600' : '', 'transition-colors']"/>
            </div>
            <BoldButton
              v-if="userStore.currentUser?.role == 'admin'"
              class="bg-[var(--orange)] hover:bg-[var(--orange_hover)]"
              :href="`/admin/travel/${travel._id}`"
            >
              {{ t("edit") }}
            </BoldButton>
            <BoldButton
              v-else
              class="bg-[var(--orange)] hover:bg-[var(--orange_hover)]"
              @click="null"
            >
              {{ t("book") }}
            </BoldButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>