<script setup lang="ts">
import Navbar from '@/components/shared/Navbar/Navbar.vue';
import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

const userStore = useUserStore()

onMounted(async () => {
  
})

</script>

<template>
  <main class="flex flex-col">
    <Navbar />
    <div class="flex flex-col flex-grow items-center justify-center text-black">
      
    </div>
  </main>
</template>

