<template>
  <div>
    <div v-if="loading" class="flex justify-center items-center mt-48 flex-col gap-6">
      <svg
        class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <div class="mx-10 my-2" v-else-if="currentPagePosts.length > 0">
      <div class="container mx-auto mt-10">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div v-for="post in currentPagePosts" :key="post.id">
            <RouterLink :to="{ name: 'StoryView', params: { id: post.id } }">
              <div
                class="flex flex-row h-96 mx-auto rounded-3xl border-2 border-stone-800 bg-amber-50 p-6 m-2 md:flex-col cursor-pointer hover:scale-105"
              >
                <div class="w-full">
                  <div class="flex justify-center">
                    <img
                      v-if="post.imageUrl"
                      :src="post.imageUrl"
                      alt="post image"
                      class="w-60 h-52 md:w-48 lg:w-52 xl:w-60 my-1 rounded-lg object-cover border border-stone-950"
                    />
                  </div>
                  <div>
                    <p class="text-xl font-bold font-mono line-clamp-2 mt-4">{{ post.title }}</p>

                    <p class="mt-1 text-lg font-light line-clamp-2 text-neutral-600 font-mono">
                      {{ post.description }}
                    </p>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div v-if="totalPages > 1" class="flex justify-center mt-16 gap-6">
        <button
          class="hover:text-lg font-medium hover:text-red-500"
          @click="currentPage--"
          :disabled="currentPage === 1"
        >
          上一頁
        </button>
        <button class="tracking-widest text-lg cursor-auto">
          第{{ currentPage }}頁，共{{ totalPages }}頁
        </button>
        <button
          class="hover:text-lg hover:text-red-500 font-medium"
          @click="currentPage++"
          :disabled="currentPage === totalPages"
        >
          下一頁
        </button>
      </div>
    </div>
    <div v-else>
      <p>暫無文章</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watchEffect, computed, watch } from 'vue'
import { db } from '@/backend/firebase.js'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { useSearchStore } from '@/stores/useSearch'
import { useAuthStore } from '@/stores/authStore'
import { useRoute, useRouter } from 'vue-router'

const loading = ref(true)
const searchStore = useSearchStore()
const posts = ref([])
const authStore = useAuthStore
const currentPage = ref(1) // 當前頁數
const postsPerPage = 6 // 每頁顯示的文章數量
const route = useRoute()
const router = useRouter()

const fetchPosts = async () => {
  try {
    loading.value = true
    let q
    if (searchStore.searchQuery.trim()) {
      q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    } else {
      q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    }
    const querySnapshot = await getDocs(q)
    posts.value = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((post) => post.product.includes(searchStore.searchQuery))
    console.log(authStore.user.id)
  } catch (error) {
    console.error('error message', error)
  } finally {
    loading.value = false
  }
}

const totalPages = computed(() => {
  return Math.ceil(posts.value.length / postsPerPage)
})

const currentPagePosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return posts.value.slice(start, end)
})

//監聽query的page
watch(
  () => route.query.page,
  (newPage) => {
    if (newPage) {
      currentPage.value = parseInt(newPage)
    }
  },
)

watch(currentPage, (newPage) => {
  router.push({
    query: { ...route.query, page: newPage },
  })
})

onMounted(() => {
  if (route.query.page) {
    currentPage.value = parseInt(route.query.page)
  }
  fetchPosts()
})

watchEffect(() => {
  fetchPosts()
})
</script>
