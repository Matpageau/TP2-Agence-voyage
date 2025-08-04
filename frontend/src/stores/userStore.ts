import type { UserData } from "@/types/User"
import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore('user', () => {
  const currentUser = ref<UserData | null>(null)
  const isFetching = ref(false)
  let fetchPromise: Promise<void> | null = null

  const fetchUser = async () => {    
    if (currentUser.value) return
    if (isFetching.value && fetchPromise) return fetchPromise

    isFetching.value = true
    fetchPromise = axios
      .get<UserData>('http://localhost:3000/user/me', { withCredentials: true })
      .then(res => {
        currentUser.value = res.data
      })
      .catch(() => {
        currentUser.value = null
      })
      .finally(() => {
        isFetching.value = false
        fetchPromise = null
      })

    return fetchPromise
  }

  return {
    currentUser,
    fetchUser
  }
})