<template>
  <div>
    <form
      action=""
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
import { useUserStore } from '@/stores/userStore'
const user = ref({
  email: '',
  password: '',
})

const router = useRouter()
const userStore = useUserStore()

const userLogIn = async () => {
  const auth = getAuth()
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.value.email,
      user.value.password,
    )
    userStore.setUser(userCredential.user)
    router.push({ name: 'home' })
  } catch (error) {
    alert('錯了喔!!')
    console.log(error)
  }
}
const goToRegister = () => {
  router.push('/register')
}
</script>
