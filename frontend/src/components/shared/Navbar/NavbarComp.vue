<script setup lang="ts">
import ShoppingCart from '@/components/icons/ShoppingCart.vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import BaseModal from '@/components/Modal/BaseModal.vue';
import FilterBtn from '../Buttons/FilterBtn.vue';
import axios from 'axios';

const router = useRouter()
const userStore = useUserStore()

const { locale, t } = useI18n()

const isModalOpen = ref<boolean>(false)

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

const isAdmin = () => {
  return userStore.currentUser?.role == 'admin' || userStore.currentUser?.role == 'manager'
}

const logoutPrompt = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closePrompt = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const logoutUser = () => {
  document.body.style.overflow = ''
  isModalOpen.value = false
  axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
  router.push('/')
}
</script>

<template>
  <nav class="flex items-center bg-[var(--marine)] h-[70px] justify-between">
    <div class="flex">
      <BaseModal 
        v-if="isModalOpen"
        class="text-black absolute top-0"
        @close="isModalOpen = false"
      >
        <b>{{ t('confirm_logout') }}</b>
        <div class="flex justify-center mt-6">
          <FilterBtn @click="logoutUser" class="text-white bg-[var(--cyan)] hover:bg-[var(--cyan_hover)]">{{ t('yes') }}</FilterBtn>
          <FilterBtn @click="closePrompt" class="ml-3 text-white bg-[var(--rouge)] hover:bg-[var(--rouge_hover)]">{{ t('no') }}</FilterBtn>
        </div>
      </BaseModal>
      <h1 class="font-bold ml-3 hidden md:block">Plan B Voyages</h1>
      <div class="flex ml-5 md:ml-20 gap-10">
        <a href="/">{{ t('travel') }}</a>
        <a v-if="isAdmin() && userStore.isReady " href="/admin">Admin</a>
      </div>
    </div>
    <div class="flex mr-3 gap-3">
      <a v-if="userStore.currentUser && userStore.isReady" class="hover:cursor-pointer" @click="logoutPrompt">{{ userStore.currentUser.username }}</a>
      <a v-else href="/login">{{ t('login') }}</a>
      <div class="flex gap-1">
        <p 
          class="cursor-pointer" 
          :class="locale === 'fr' ? 'text-yellow-500 font-bold' : ''" 
          @click="handleLangChange('fr')"
        >FR</p>
        <div class="h-full bg-white w-[1px]"></div>
        <p 
          class="cursor-pointer" 
          :class="locale === 'en' ? 'text-yellow-500 font-bold' : ''" 
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