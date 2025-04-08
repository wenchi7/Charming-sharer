<template>
  <div class="flex h-96">
    <div
      class="absolute h-96 w-32 bg-sky-600 transition-transform duration-300 rounded-r-lg shadow-[4px_4px_4px_gray]"
      :class="{ 'md:translate-x-0': isSideBarOpen, '-translate-x-[120px]': !isSideBarOpen }"
    >
      <button
        v-if="!isSideBarOpen"
        @click="tragleSideBar(true)"
        class="absolute right-0 -mr-10 mt-16 h-10 w-10 cursor-pointer rounded-r-lg bg-sky-600 text-xl text-white hover:text-black shadow-[2px_2px_4px_gray]"
      >
        ▶︎
      </button>
      <button
        v-else
        @click="tragleSideBar(false)"
        class="absolute right-0 -mr-10 mt-16 h-10 w-10 cursor-pointer rounded-r-lg bg-sky-600 text-xl text-white hover:text-black shadow-[2px_2px_4px_gray]"
      >
        ◀︎
      </button>
      <div class="flex flex-col text-left gap-24 mt-12 ml-6 text-xl">
        <router-link
          to="/home"
          @click="handleClick"
          class="text-white hover:text-red-500 cursor-pointer"
          >首頁</router-link
        >
        <RouterLink :to="{ name: 'MyStory' }" class="text-white hover:text-red-500 cursor-pointer">
          My Story
        </RouterLink>
        <LogOut />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import LogOut from '@/components/auth/LogOut.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const handleClick = () => {
  if (router.currentRoute.value.name === 'home') {
    window.location.reload()
  }
}
// router.go(0) 會嘗試重新加載當前頁面，但會保留 URL 中的所有查詢參數
// 當 URL 中包含 page 參數時，Vue Router 會認為這是一個新的路由狀態，而不是簡單的頁面重新加載
// 這導致了路由系統的衝突，因為它試圖在保持查詢參數的同時重新加載頁面

const isSideBarOpen = ref(false)
const tragleSideBar = (flag) => {
  isSideBarOpen.value = flag
}
</script>
