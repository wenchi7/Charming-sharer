<template>
  <NavView />
  <div v-if="loading" class="flex justify-center items-center mt-48 flex-col gap-6">
    <svg
      class="-ml-1 mr-3 h-5 w-5 animate-spin text-white "
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
  <div class="mx-10 my-2" v-else>
    <div class="container mx-auto mt-10">
      <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div v-for="post in posts" :key="post.id">
          <RouterLink :to="{ name: 'StoryView', params: {id: post.id} }">
            <div
              class="flex flex-row h-96 mx-auto rounded-3xl border-2 border-stone-800 bg-amber-50 p-6 m-2 md:flex-col cursor-pointer hover:scale-105 "
            >
              <div class="w-full">
                <div class="flex justify-center">
                <img
                  v-if="post.imageUrl"
                  :src="post.imageUrl"
                  alt="post image"
                  class="w-60 h-52 md:w-48 lg:w-52 xl:w-60 my-1 rounded-lg object-cover border border-stone-950 "
                />
              </div>
                <div>
                  <p class="text-xl font-bold font-mono line-clamp-2  mt-4">{{ post.title }}</p>

                  <p class="mt-2 text-lg font-light line-clamp-2  text-neutral-600 font-mono">
                    {{ post.description }}
                  </p>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <DeleteAuth />
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { db } from '@/backend/firebase.js'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { useSearchStore } from '@/stores/useSearch'
import NavView from '@/components/NavView.vue'
import DeleteAuth from '@/components/auth/DeleteAuth.vue'
const loading = ref(true)
const searchStore = useSearchStore()
const posts = ref([])

const user = sessionStorage.getItem('userLoggedIn');  // 檢查是否有 'userLoggedIn' 資料
if (user) {
  console.log('使用者已登入', user);
} else {
  console.log('使用者未登入');
}

const fetchPosts = async () => {
  try {
    loading.value = true
    let q
    if (searchStore.searchQuery.trim()) {
      q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
      )
    } else {
      q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    }
    const querySnapshot = await getDocs(q)
    posts.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter(post => post.product.includes(searchStore.searchQuery
    ))
  } catch (error) {
    console.error('error message', error)
  }finally{
    loading.value = false
  }
}

onMounted(()=>{
  fetchPosts()
})

watchEffect(() => {
  fetchPosts()
  })
</script>

<style></style>
