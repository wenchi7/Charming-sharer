<template>
  <div class="border border-black bg-red-500 cursor-pointer w-32 mt-16 mx-auto text-center rounded-lg py-2">
    <button @click="deleteAccount">刪除帳號</button>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore()

const deleteAccount = () => {
  authStore.deleteAccount()
}

</script>
