<template>
  <div v-if="totalPages > 1" class="flex justify-center mt-16 gap-6">
    <button
      class="hover:text-lg font-medium hover:text-red-500"
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      上一頁
    </button>
    <span class="tracking-widest text-lg cursor-auto">
      第 {{ currentPage }} 頁，共 {{ totalPages }} 頁
    </span>
    <button
      class="hover:text-lg hover:text-red-500 font-medium"
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      下一頁
    </button>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const currentPage = defineModel('currentPage')
const { totalPages } = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

//頁碼變化處裡
const handlePageChange = (newPage) => {
  currentPage.value = newPage
  router.push({
    query: { ...route.query, page: newPage },
  })
}

watch(
  () => route.query.page,
  (newPage) => {
    if (newPage) {
      currentPage.value = parseInt(newPage)
    }
  },
)
</script>

<!-- 沒有用到之後把他收起來可以用在其他地方 -->
