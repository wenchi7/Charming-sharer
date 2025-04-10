<template>
  <div class="flex justify-between items-center mt-4">
    <LogoView />
    <CreateBnt class="mr-16" />
  </div>

  <div class="flex flex-col items-center mt-10">
    <div
      class="text-2xl md:text-3xl tracking-widest font-bold font-serif bg-gradient-to-r from-emerald-400 to-blue-300 via-teal-200 w-2/3 h-14 flex justify-center items-center rounded-sm animate-pulse shadow-lg"
    >
      <h1>✨{{ authorName }}'s Beauty Story✨</h1>
    </div>
    <div class="mt-6 w-full">
      <PersonalPost :authorId="authorId" />
    </div>
  </div>
</template>

<script setup>
import LogoView from '@/view/LogoView.vue'
import CreateBnt from './CreateBnt.vue'
import PersonalPost from './PersonalPost.vue'
import { onMounted, ref } from 'vue'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/backend/firebase'
import { useRoute } from 'vue-router'
const route = useRoute()
const authorName = ref('')
const authorId = ref(route.params.id)

const fetchAuthorInfo = async () => {
  try {
    const userDoc = await getDoc(doc(db, 'users', authorId.value))
    if (userDoc.exists()) {
      authorName.value = userDoc.data().name || 'User'
      console.log(authorName)
    }
  } catch (error) {
    console.log('error author info: ', error)
  }
}

onMounted(() => {
  fetchAuthorInfo()
})
console.log(authorName.value)
</script>
