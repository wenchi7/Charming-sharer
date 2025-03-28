<template>
  <div class="cursor-pointer mt-16 mx-auto text-center rounded-lg py-2 text-cyan-700">
    <button @click="deleteAccount" class="underline underline-offset-4">
      不想繼續分享美麗故事了嗎？...刪除帳號...
    </button>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/authStore'
const authStore = useAuthStore()

const deleteAccount = () => {
  authStore.deleteAccount()
}
</script>
