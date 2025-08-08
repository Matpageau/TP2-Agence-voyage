<script setup lang="ts">
import BoldButton from '@/components/shared/Buttons/BoldButton.vue';
import TextInput from '@/components/shared/Inputs/TextInput.vue';
import NavbarComp from '@/components/shared/Navbar/NavbarComp.vue';
import axios, { AxiosError } from "axios"
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

const errorMsg = ref("")

const { t } = useI18n()

watch([loginUsername, loginPassword, registerUsername, registerPassword, registerPasswordConfirm], () => {
  errorMsg.value = ""  
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
  } catch (error) {
    const err = error as AxiosError<{ code?: string }>
    errorMsg.value = err.response?.data?.code ?? "UNKNOWN_ERROR"
    console.error(err)
  }
}

const handleRegister = async () => {
  if(registerPassword.value != registerPasswordConfirm.value) {
    return errorMsg.value = "PASSWORD_NOT_MATCH"
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
  } catch (error) {
    const err = error as AxiosError<{ code?: string }>
    errorMsg.value = err.response?.data?.code ?? "UNKNOWN_ERROR"
    console.error(err)
  }
}

</script>

<template>
  <main class="flex flex-col">
    <NavbarComp :user="null"/>
      <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform flex flex-col md:flex-row border-4 border-[var(--marine)] w-1/2 rounded-2xl">
        <div class="bg-[var(--marine)] w-full md:w-1/2 p-2 md:p-10">
          <h1 class="font-bold text-2xl md:text-6xl text-center">{{ t("login") }}</h1>
          <div class="flex flex-col gap-4 mt-5 lg:mt-20">
            <TextInput 
              :error="errorMsg === 'USER_NOT_FOUND' ? t('userNotFound') : ''"
              v-model="loginUsername"
              :placeholder="t('username')"
            />
            <TextInput 
              :error="errorMsg === 'INVALID_PASSWORD' ? t('invalidPassword') : ''"
              v-model="loginPassword" 
              :placeholder="t('password')"
              type="password"
            />
          </div>
          <div class="flex justify-center w-full mt-5 lg:mt-30">
            <BoldButton class="bg-[var(--cyan)] hover:bg-[var(--cyan_hover)] disabled:bg-[var(--cyan)]/50" @click="handleLogin" :disabled="!loginUsername || !loginPassword">
              {{ t("login") }}
            </BoldButton>
          </div>
        </div>
        <div class="w-full md:w-1/2 p-2 md:p-10">
          <h1 class="font-bold text-2xl md:text-6xl text-[var(--marine)] text-center">{{ t("register") }}</h1>
          <div class="flex flex-col gap-4 mt-5 lg:mt-20">
            <TextInput
              :error="errorMsg === 'USERNAME_TAKEN' ? t('usernameAlreadyTaken') : ''"
              v-model="registerUsername" 
              :placeholder="t('username')"
            />
            <TextInput
              :error="errorMsg === 'PASSWORD_NOT_MATCH' ? t('passwordNotMatch') : ''"
              v-model="registerPassword"
              :placeholder="t('password')"
              type="password"
            />
            <TextInput 
              :error="errorMsg === 'PASSWORD_NOT_MATCH' ? t('passwordNotMatch') : ''"
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
  </main>
</template>