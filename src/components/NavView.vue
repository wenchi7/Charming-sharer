<template>
  <div>
    <nav class="flex justify-between mt-2">
      <LogoView />
      <div class="flex flex-col-reverse items-center mt-3 p-4 md:flex-row">
        <CreateBnt />
        <!-- 搜尋欄位 -->
        <div class="flex mx-4 p-4">
          <input
            v-model="searchQuery"
            type="text"
            class="w-52 h-8 lg:w-60 rounded-l placeholder:text-gray-500 border border-black p-2"
            placeholder="請輸入產品名稱"
            @keyup.enter="search"
          />
          <button type="submit" class="bg-black text-white w-10 h-8 rounded ml-2" @click="search">
            搜尋
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useSearchStore } from '@/stores/useSearch'
import LogoView from '@/view/LogoView.vue'
import CreateBnt from './CreateBnt.vue'

const searchStore = useSearchStore()
const searchQuery = ref(searchStore.searchQuery)

const search = () => {
  searchStore.setSearchQuery(searchQuery.value)
}
</script>
