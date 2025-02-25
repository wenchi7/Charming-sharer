<template>
  <div class="flex justify-center mt-10 text-4xl font-mono">
    <h1>註冊帳號</h1>
  </div>
  <div class="flex justify-center font-mono">
    <form
      @submit.prevent="userRegistration"
      class="flex flex-col gap-10 mt-10 bg-blue-300 w-96 justify-center items-end pr-5 py-10 rounded-lg"
    >
      <div class="m-1 text-lg">
        <label for="name">使用者名字：</label>
        <input
          type="text"
          id="name"
          v-model="user.name"
          placeholder="輸入暱稱"
          class="placeholder:text-sm pl-2"
        />
      </div>
      <div class="m-1 text-lg">
        <label for="email">信箱：</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          placeholder="請輸入Email"
          class="placeholder:text-sm pl-2"
        />
      </div>
      <div class="m-1 text-lg">
        <label for="password">密碼：</label>
        <input
          type="password"
          id="password"
          v-model="user.password"
          placeholder="請輸入密碼"
          class="placeholder:text-sm pl-2"
        />
      </div>
      <button type="submit" class="w-32 p-2 rounded-lg bg-yellow-200">註冊</button>
    </form>
  </div>
</template>

<script setup>
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({
  name: '',
  email: '',
  password: '',
})

const userRegistration = async () => {
  try {
    const firebaseAuth = getAuth()
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      user.value.email,
      user.value.password,
    )
    await updateProfile(res.user, {
      displayName: user.value.name,
    })
    router.push('/')
  } catch (error) {
    console.error(error.message)

    alert('註冊發生錯誤！')
  }
}
</script>
