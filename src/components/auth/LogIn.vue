<template>
  <div>
    <form
      class="flex flex-col justify-center items-center gap-8 w-60 h-auto"
      @submit.prevent="userLogIn"
    >
      <input v-model="user.email" type="email" placeholder="請輸入email" class="rounded-md p-2" />
      <input
        v-model="user.password"
        type="password"
        placeholder="請輸入password"
        class="rounded-md p-2"
      />
      <div class="flex gap-10">
        <button
          type="button"
          @click="goToRegister"
          class="w-28 bg-blue-300 rounded-md p-2 border border-gray-900 hover:bg-teal-500"
        >
          註冊
        </button>

        <button
          type="submit"
          class="w-28 bg-blue-300 rounded-md p-2 border border-gray-900 hover:bg-blue-500"
        >
          LogIn
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const user = ref({
  email: '',
  password: '',
})

const router = useRouter()
const authStore = useAuthStore()

const userLogIn = async () => {
  const auth = getAuth()

  try {
    const res = await signInWithEmailAndPassword(auth, user.value.email, user.value.password)

    const loggedInUser = {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName || '使用者',
    }

    authStore.setUser(loggedInUser) // 更新 Pinia 狀態並存入 localStorage
    router.push({ name: 'home' })
    authStore.initAuth()

    alert(`Welcome, ${res.user.displayName}`)
    user.value.password = ''

    // 檢查是否有儲存
  } catch (error) {
    alert('登入失敗！請檢查帳號密碼')
    console.log(error)
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>
