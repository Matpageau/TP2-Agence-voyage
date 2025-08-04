<script setup lang="ts">
  import { useUserStore } from '@/stores/userStore';
import { onMounted } from 'vue';

  const userStore = useUserStore()
  onMounted(async () => {
    await userStore.fetchUser()
  })
</script>

<template>
  <RouterView />
</template>