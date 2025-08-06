<script setup lang="ts">
import BoldButton from '@/components/shared/Buttons/BoldButton.vue';
import TextInput from '@/components/shared/Inputs/TextInput.vue';
import Navbar from '@/components/shared/Navbar/Navbar.vue';
import axios from "axios"
import router from '@/router';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()

const loginUsername = ref("")
const loginPassword = ref("")

const registerUsername = ref("")
const registerPassword = ref("")
const registerPasswordConfirm = ref("")

const error = ref("")

const { t } = useI18n()

watch([loginUsername, loginPassword, registerUsername, registerPassword, registerPasswordConfirm], () => {
  error.value = ""  
})

const handleLogin = async () => {
  const payload = {
    username: loginUsername.value,
    password: loginPassword.value
  }

  try {
    const res = await axios.post(`http://localhost:3000/login`, payload, {withCredentials: true})
    
    if(res.data) {
      await userStore.fetchUser(true)
      router.push("/")
    }
  } catch (err: any) {
    error.value = err.response.data.code || "UNKNOWN_ERROR"
    console.error(error)
  }
}

const handleRegister = async () => {
  if(registerPassword.value != registerPasswordConfirm.value) {
    return error.value = "PASSWORD_NOT_MATCH"
  }

  const payload = {
    username: registerUsername.value,
    password: registerPassword.value
  }

  try {
    const res = await axios.post(`http://localhost:3000/signup`, payload)

    if(res.data) {
      loginUsername.value = registerUsername.value
      loginPassword.value = registerPassword.value

      await handleLogin()
    }
  } catch (err: any) {
    error.value = err.response.data.code || "UNKNOWN_ERROR"
    console.error(error)
  }
}

</script>

<template>
  <main class="flex flex-col h-screen">
    <Navbar :user="null"/>
    <div class="flex w-screen h-full justify-center items-center">
      <div class="flex border-4 border-[var(--marine)] w-1/2 rounded-2xl">
        <div class="bg-[var(--marine)] w-1/2 p-10">
          <h1 class="font-bold text-6xl text-center">{{ t("login") }}</h1>
          <div class="flex flex-col gap-4 mt-20">
            <TextInput 
              :error="error === 'USER_NOT_FOUND' ? t('userNotFound') : ''"
              v-model="loginUsername"
              :placeholder="t('username')"
            />
            <TextInput 
              :error="error === 'INVALID_PASSWORD' ? t('invalidPassword') : ''"
              v-model="loginPassword" 
              :placeholder="t('password')"
              type="password"
            />
          </div>
          <div class="flex justify-center w-full mt-30">
            <BoldButton class="bg-[var(--cyan)] hover:bg-[var(--cyan_hover)] disabled:bg-[var(--cyan)]/50" @click="handleLogin" :disabled="!loginUsername || !loginPassword">
              {{ t("login") }}
            </BoldButton>
          </div>
        </div>
        <div class="w-1/2 p-10">
          <h1 class="font-bold text-6xl text-[var(--marine)] text-center">{{ t("register") }}</h1>
          <div class="flex flex-col gap-4 mt-20">
            <TextInput
              :error="error === 'USERNAME_TAKEN' ? t('usernameAlreadyTaken') : ''"
              v-model="registerUsername" 
              :placeholder="t('username')"
            />
            <TextInput
              :error="error === 'PASSWORD_NOT_MATCH' ? t('passwordNotMatch') : ''"
              v-model="registerPassword"
              :placeholder="t('password')"
              type="password"
            />
            <TextInput 
              :error="error === 'PASSWORD_NOT_MATCH' ? t('passwordNotMatch') : ''"
              v-model="registerPasswordConfirm"
              :placeholder="t('confirmPassword')"
              type="password"
            />
          </div>
          <div class="flex justify-center w-full mt-12">
            <BoldButton class="bg-[var(--cyan)] hover:bg-[var(--cyan_hover)] disabled:bg-[var(--cyan)]/50" @click="handleRegister" :disabled="!registerUsername || !registerPassword || !registerPasswordConfirm">
              {{ t("register")}}
            </BoldButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>