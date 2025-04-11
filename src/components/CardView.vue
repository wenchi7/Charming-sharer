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
    <div class="mx-10 my-2" v-else-if="posts.length > 0">
      <div class="container mx-auto mt-10">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div v-for="post in posts" :key="post.id">
            <RouterLink :to="{ name: 'StoryView', params: { id: post.id } }">
              <div
                class="flex flex-row h-96 mx-auto rounded-3xl border-2 border-orange-200 hover:border-orange-600 bg-orange-100 p-6 m-2 md:flex-col cursor-pointer hover:scale-105"
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
      <!-- 沒有更多文章提示 -->
      <div v-if="!hasMore" class="text-center mt-16 text-cyan-700">沒有更多文章摟！</div>
    </div>

    <div v-else class="flex justify-center items-center mt-44 text-xl">
      <p>目前無相關文章！</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, onUnmounted, nextTick } from 'vue'
import { db } from '@/backend/firebase.js'
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore'
import { useSearchStore } from '@/stores/useSearch'

const loading = ref(true)
const searchStore = useSearchStore()
const posts = ref([])
const lastVisible = ref(null)
const hasMore = ref(true)
const postsPerPage = 9
const isLoadingMore = ref(false)

// 檢查是否滾動到底部
const checkScroll = async () => {
  // 如果正在加載或沒有更多文章，直接返回
  if (loading.value || isLoadingMore.value || !hasMore.value) return

  const scrollHeight = document.scrollingElement.scrollHeight
  const scrollTop = document.scrollingElement.scrollTop
  const clientHeight = document.scrollingElement.clientHeight

  // 當滾動到距離底部 100px 時觸發加載
  if (scrollHeight - scrollTop - clientHeight < 200) {
    isLoadingMore.value = true // 設置加載標記
    console.log('觸發加載更多')
    await fetchPosts(true)
    isLoadingMore.value = false // 重置加載標記
  }
}
const fetchPosts = async (isLoadMore = false) => {
  try {
    if (!isLoadMore) {
      loading.value = true
      posts.value = []
      lastVisible.value = null
      hasMore.value = true
    }
    if (searchStore.searchQuery.trim() && !isLoadMore) {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const allPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        const filteredPosts = allPosts.filter((post) => {
          const productName = (post.product || '').toLowerCase()
          const title = (post.title || '').toLowerCase()
          return (
            productName.includes(searchStore.searchQuery.toLowerCase()) ||
            title.includes(searchStore.searchQuery.toLowerCase())
          )
        })

        posts.value = filteredPosts
        hasMore.value = false
      } else {
        hasMore.value = false
      }
    } else {
      // 正常的分頁加載邏輯
      let q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(postsPerPage))

      if (lastVisible.value) {
        console.log('使用 startAfter 加載更多文章:', lastVisible.value.id)
        q = query(q, startAfter(lastVisible.value))
      }

      const querySnapshot = await getDocs(q)
      console.log(querySnapshot)
      if (!querySnapshot.empty) {
        lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1] ?? lastVisible.value
        hasMore.value = querySnapshot.docs.length === postsPerPage

        const newPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))

        const existingPostIds = new Set(posts.value.map((post) => post.id))
        const uniquePosts = newPosts.filter((post) => !existingPostIds.has(post.id))
        posts.value = [...posts.value, ...uniquePosts]
      } else {
        hasMore.value = false
      }
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    loading.value = false
    await nextTick()
    console.log(' 更新後的 lastVisible:', lastVisible.value ? lastVisible.value.id : 'NULL')
  }
}

// 監聽query的page
watch(
  () => searchStore.searchQuery,
  () => {
    // 重置狀態並重新加載
    posts.value = []
    lastVisible.value = null
    hasMore.value = true
    fetchPosts()
  },
  { immediate: true },
)

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>
