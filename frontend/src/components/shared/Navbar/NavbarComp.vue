<script setup lang="ts">
import ShoppingCart from '@/components/icons/ShoppingCart.vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter()
const userStore = useUserStore()

const { locale, t } = useI18n()

const numberCart = computed(() => {
  return userStore.currentUser?.cart?.reduce((acc, item) => acc + item.quantity, 0) ?? 0
})

const handleLangChange = (lang: "fr" | "en") => {
    locale.value = lang
    document.cookie = `lang=${lang}; path=/; max-age=31536000`
}

const handleOpenCart = () => {
  router.push("cart")
}

</script>

<template>
  <nav class="flex items-center bg-[var(--marine)] h-[70px] justify-between">
    <div class="flex">
      <h1 class="font-bold ml-3">Plan B Voyages</h1>
      <div class="flex ml-20 gap-10">
        <a href="/">{{ t('travel') }}</a>
        <a v-if="userStore.currentUser && userStore.currentUser?.role != 'user' && userStore.isReady " href="/admin">Admin</a>
      </div>
    </div>
    <div class="flex mr-3 gap-3">
      <a v-if="userStore.currentUser" href="">{{ userStore.currentUser.username }}</a>
      <a v-else href="/login">{{ "Login" }}</a>
      <div class="flex gap-1">
        <p 
          class="cursor-pointer"
          @click="handleLangChange('fr')"
        >FR</p>
        <div class="h-full bg-white w-[1px]"></div>
        <p 
          class="cursor-pointer"
          @click="handleLangChange('en')"
        >EN</p>
      </div>
      <div class="relative inline-block">
        <ShoppingCart class="cursor-pointer text-2xl" :onClick="handleOpenCart"/>
        <span class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {{ numberCart }}
        </span>
      </div>
    </div>
  </nav>
</template>