<template>
  <div class="flex h-96">
    <div
      class="absolute h-96 w-32 bg-cyan-600 transition-transform duration-300 rounded-r-lg shadow-[4px_4px_4px_gray]"
      :class="{ 'md:translate-x-0': isSideBarOpen, '-translate-x-[120px]': !isSideBarOpen }"
    >
      <button
        v-if="!isSideBarOpen"
        @click="tragleSideBar(true)"
        class="absolute right-0 -mr-10 mt-16 h-10 w-10 cursor-pointer rounded-r-lg bg-cyan-600 text-xl text-white hover:text-black shadow-[2px_2px_4px_gray]"
      >
        ▶︎
      </button>
      <button
        v-else
        @click="tragleSideBar(false)"
        class="absolute right-0 -mr-10 mt-16 h-10 w-10 cursor-pointer rounded-r-lg bg-cyan-600 text-xl text-white hover:text-black shadow-[2px_2px_4px_gray]"
      >
        ◀︎
      </button>
      <div class="flex flex-col text-center gap-14 mt-12 text-lg">
        <a href="/home" class="text-white hover:text-red-500 cursor-pointer">首頁</a>
        <p class="text-white hover:text-red-500 cursor-pointer">保養版</p>
        <p class="text-white hover:text-red-500 cursor-pointer">化妝版</p>
        <p class="text-white hover:text-red-500 cursor-pointer">Log out</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const isSideBarOpen = ref(false)
const tragleSideBar = (flag) => {
  isSideBarOpen.value = flag
}
</script>
