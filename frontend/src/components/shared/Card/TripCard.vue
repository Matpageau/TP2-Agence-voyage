<script setup lang="ts">
import type { TripData } from '@/types/Trip';
import { useI18n } from 'vue-i18n';
import { DateTime } from 'luxon';
import BoldButton from '../Buttons/BoldButton.vue';
import Heart from '@/components/icons/Heart.vue';

const { locale, t, n } = useI18n()

const props = defineProps<{
  trip: TripData
}>()

const tripDurationInDays = DateTime
  .fromISO(props.trip.arrival_date)
  .diff(DateTime.fromISO(props.trip.departure_date), ['days'])
  .days
</script>

<template>
  <div class="flex flex-col w-full border-1 border-neutral-300 h-[500px] rounded-xl overflow-hidden">
    <div class="relative h-1/2">
      <img :src="props.trip.img_url" alt="trip img" class="w-full h-full object-cover">
      <h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold text-center">{{ props.trip.destination }}</h1>
    </div>
    <div class="flex flex-col justify-between p-2 flex-grow">
      <div class="flex justify-between">
        <div class="w-full">
          <h2 class="text-3xl font-bold">{{ props.trip.title }}</h2>
          <p class="w-2/3 text-sm">{{ props.trip.description }}</p>
        </div>
        <div class="w-1/2 justify-end text-end">
          <h1 class="font-bold">{{ props.trip.type == "backpack" ? t("inclusive") : t("backpack") }}</h1>
          <p><b>{{ props.trip.poi_ids.length}}</b> {{ t("pois", props.trip.poi_ids.length) }}</p>
        </div>
      </div>
      <div class="flex justify-between items-end">
        <div>
          <p>{{ DateTime.fromISO(props.trip.departure_date).setLocale(locale).toFormat("DDD") }}</p>
          <p>{{ t("days", Math.round(tripDurationInDays)) }}</p>
        </div>
        <div class="flex flex-col items-end">
          <h1 class="text-3xl font-bold text-[var(--cyan)]">{{ n(props.trip.price, 'currency') }}</h1>
          <div class="flex h-fit">
            <div class="h-full w-[44px]">
              <Heart class="h-full aspect-square cursor-pointer" :onclick="() => null"/>
            </div>
            <BoldButton class="bg-[var(--orange)] hover:bg-[var(--orange_hover)]" @click="null">
              {{ t("book") }}
            </BoldButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>