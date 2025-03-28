<template>
  <div>
    <p class="text-white hover:text-red-500 cursor-pointer" @click="handleLogout">Log out</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.logOut()
    router.push('/')
    alert('已登出！')
  } catch (error) {
    alert('登出失敗！請稍後再試！')
    console.error(error)
  }
}
</script>
