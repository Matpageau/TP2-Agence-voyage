<script setup lang="ts">
import UserCard from '@/components/shared/Card/UserCard.vue'
import NavbarComp from '@/components/shared/Navbar/NavbarComp.vue';
import type { UserData } from '@/types/User';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const userList = ref<UserData[]>([])

const fetchUsers = async () => {
  try {
    const usersRes = await axios.get("http://localhost:3000/users")
    
    if(usersRes.data) {
      userList.value = usersRes.data
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <main class="flex flex-col">
    <NavbarComp />
    <div class="flex flex-col flex-grow items-center justify-center text-black">
      <div class="w-full p-3 md:w-6/8 h-full flex flex-col">
        <h1 class="font-bold mt-6 text-2xl">{{ t('editUsers') }}</h1>
        <div class="flex flex-col mnt-5 border border-neutral-200 rounded-md px-3 md:px-10 py-5 gap-3">
          <UserCard 
            v-for="user in userList"
            :key="user._id"
            :user="user"
            @delete="fetchUsers"
          />
        </div>
      </div>
    </div>
  </main>
</template>

