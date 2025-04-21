<template>
  <div  class="first-page">
    <div class="flex flex-col justify-center mt-96 mx-auto items-center w-60  rounded-3xl ">
      <span
        class="absolute top-1/4 text-9xl font-bold font-serif tracking-widest bg-gradient-to-r from-red-900 to-blue-300 via-pink-500 bg-clip-text text-transparent text-shadow animate-pulse scale-75 md:scale-100"
        >Charming</span
      >
      <LogIn />
    </div>
  </div>
</template>
<script setup>
import LogIn from './auth/LogIn.vue'
</script>
<style>
.first-page {
  background-color: #d89bc0;
}
</style>
