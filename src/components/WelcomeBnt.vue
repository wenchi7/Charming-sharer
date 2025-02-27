<template>
  <div v-if="showButton" class="first-page">
    <div class="flex flex-col justify-center my-80 mx-auto items-center w-60 rounded-3xl">
      <span
        class="absolute top-1/3 text-9xl font-bold font-serif tracking-widest bg-gradient-to-r from-red-900 to-blue-300 via-pink-500 bg-clip-text text-transparent text-shadow animate-pulse"
        >Charming</span
      >
      <LogIn />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import LogIn from './auth/LogIn.vue'

const showButton = ref(true)
</script>
<style>
.first-page {
  background-color: #d89bc0;
}
</style>
