<template>
  <div class="flex justify-center items-center">
    <div v-if="isLoading" class="flex justify-center items-center mt-48 flex-col gap-6">
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
    <div class="mx-10 my-2 w-full" v-else-if="posts.length > 0">
      <div class="container mt-10">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div v-for="post in posts" :key="post.id">
            <RouterLink
              :to="{ name: 'StoryView', params: { id: post.id }, query: { from: 'my-story' } }"
            >
              <div
                class="flex flex-row h-96 mx-auto rounded-3xl border-2 border-stone-800 bg-amber-50 p-6 m-2 md:flex-col cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out w-full"
              >
                <div class="w-full">
                  <div class="flex justify-center flex-col items-center">
                    <img
                      :src="post.imageUrl"
                      :alt="post.title"
                      class="w-60 h-52 md:w-48 lg:w-52 xl:w-60 my-1 rounded-lg object-cover border border-stone-950"
                    />

                    <div>
                      <div class="w-full text-center">
                        <p class="text-xl font-bold font-mono line-clamp-2 mt-6">
                          {{ post.title }}
                        </p>
                      </div>
                      <p class="mt-1 text-lg font-light line-clamp-2 text-neutral-600 font-mono">
                        {{ post.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>暫無貼文</p>
    </div>
  </div>
</template>

<script setup>
import { collection, orderBy, where, query, getDocs } from 'firebase/firestore'
import { ref, defineProps, onMounted } from 'vue'
import { db } from '@/backend/firebase'
const isLoading = ref(false)
const posts = ref([])

const props = defineProps({
  authorId: {
    type: String,
    required: true,
  },
})
const fetchPersonalPost = async () => {
  try {
    isLoading.value = true
    const postRef = collection(db, 'posts')

    const allPostsSnapshot = await getDocs(collection(db, 'posts'))
    console.log(
      'All posts in database:',
      allPostsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })),
    )

    console.log('current user id:', props.authorId)
    const q = query(postRef, where('authorId', '==', props.authorId), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    console.log('Query snapshot size:', querySnapshot.size)
    posts.value = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      console.log('Post data:', data) // 添加這行
      return {
        id: doc.id,
        ...data,
      }
    })
    console.log('Final posts array:', posts.value)
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchPersonalPost()
})
</script>
