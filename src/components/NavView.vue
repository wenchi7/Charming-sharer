<template>
  <div>
    <nav class="flex justify-between">
      <div class="flex flex-col w-60 my-4 text-center text-4xl font-bold leading-[1.15]">
        <p class="rotate-[-2deg]">CHARMING</p>
        <p class="rotate-[-10deg] translate-x-4 tracking-widest">SHARER</p>
      </div>
      <div class="flex flex-col-reverse items-center mt-3 p-4 md:flex-row">
        <div class="flex">
          <div
            class="create-bnt flex justify-center items-center border-2 w-28 h-12 lg:w-32 rounded-xl border-gray-900 text-md text-black cursor-pointer bg-amber-300 ml-auto"
            @click="goToCreatePost"
          >
            <button class="mr-2 font-mono font-medium">CREATE</button>
            <svg
              class="feather feather-edit"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
        </div>
        <div class="flex mx-4 p-4">
          <input
            type="text"
            class="w-52 h-8 lg:w-60 rounded-l placeholder:p-4 placeholder:text-gray-500 border border-black"
            placeholder="請輸入關鍵字"
          />
          <button type="submit" class="bg-black text-white w-10 h-8 rounded ml-2">搜尋</button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goToCreatePost = () => {
  router.push('/create-post')
}
</script>
