<script setup lang="ts">
import TrashIcon from '@/components/icons/TrashIcon.vue';
import type { UserData } from '@/types/User';
import axios from 'axios';
import { ref, watch } from 'vue';

const emit = defineEmits<{
  (e: 'delete'): void
}>()

const props = defineProps<{
  user: UserData
}>()

const handleDeleteUser = async () => {
  try {
    await axios.delete(`http://localhost:3000/users/${props.user._id}`)

    emit('delete')
  } catch (error) {
    console.error(error)
  }
}

const handleRoleChange = async (role: string) => {  
  try {
    await axios.patch(`http://localhost:3000/users/role/${props.user._id}`, {role: role})
  } catch (error) {
    console.error(error)
  }
}

const role = ref<'user' | 'manager' | 'admin'>(props.user.role || 'user')

watch(role, (newRole) => {  
  handleRoleChange(newRole)
})

</script>

<template>
  <div class="flex justify-between border border-neutral-200 rounded p-2">
    <p>{{ props.user.username }}</p>
    <div class="flex items-center">
      <select v-model="role" name="role" id="roleSel" class="h-full border border-neutral-200 w-fit">
        <option value="user">User</option>
        <option value="manager">Gestionnaire</option>
        <option v-if="props.user.role == 'admin'" value="admin">Admin</option>
      </select>
      <p class="mx-20">{{ props.user.createdAt.split('T')[0] }}</p>
      <TrashIcon class="cursor-pointer" :onClick="handleDeleteUser"/>
    </div>
  </div>
</template>