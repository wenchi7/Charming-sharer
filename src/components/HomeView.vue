<template>
  <div class="mx-10 my-8">
    <div class="container mx-auto mt-10">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div v-for="post in posts" :key="post.id">
          <div
            class="flex flex-row h-96 rounded-3xl border-4 border-black bg-amber-50 p-6 m-2 md:flex-col cursor-pointer"
          >
            <div>
              <img
                v-if="post.imageUrl"
                :src="post.imageUrl"
                alt="post image"
                class="w-60 h-52 md:w-48 lg:w-52 xl:w-60 my-1 rounded-lg object-cover border border-stone-950 "
              />
              <div>
                <p class="text-2xl font-bold font-mono">{{ post.title }}</p>

                <p class="mt-2 text-lg font-light line-clamp-2 after:content-['...'] text-neutral-600 font-mono">
                  {{ post.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { db } from '@/backend/firebase.js'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { useSearchStore } from '@/stores/useSearch'

const searchStore = useSearchStore()
const posts = ref([])

const fetchPosts = async () => {
  try {
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
  }
}

onMounted(fetchPosts)

watchEffect(() => {
  fetchPosts()
  })
</script>

<style></style>
