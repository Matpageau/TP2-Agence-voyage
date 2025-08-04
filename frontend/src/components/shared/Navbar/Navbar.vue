<script setup lang="ts">
import ShoppingCart from '@/components/icons/ShoppingCart.vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()

const { locale, t } = useI18n()

const handleLangChange = (lang: "fr" | "en") => {
    locale.value = lang
    document.cookie = `lang=${lang}; path=/; max-age=31536000`
}
</script>

<template>
  <nav class="flex items-center bg-[var(--marine)] h-[70px] justify-between">
    <div class="flex">
      <h1 class="font-bold ml-3">Plan B Voyages</h1>
      <div class="flex ml-20 gap-10">
        <a href="/" @click="">{{ t('travel') }}</a>
        <a v-if="userStore.currentUser?.role == 'admin' " href="/admin" @click="">Admin</a>
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
      <ShoppingCart class="cursor-pointer"/>
    </div>
  </nav>
</template>