<template>
  <div class="flex justify-between items-center mt-4">
    <LogoView />
    <CreateBnt class="mr-16" />
  </div>

  <div class="flex flex-col items-center mt-10">
    <div
      class="text-2xl md:text-3xl tracking-widest font-bold font-serif bg-gradient-to-r from-emerald-400 to-blue-300 via-teal-200 w-2/3 h-14 flex justify-center items-center rounded-sm animate-pulse shadow-lg"
    >
      <h1>✨{{ currentUserName }}'s Beauty Story✨</h1>
    </div>
    <div class="mt-6 w-full">
      <PersonalPost :authorId="currentUserId" />
    </div>
  </div>

  <div class="mt-20">
    <DeleteAuth v-if="showDeleteBnt" />
  </div>
</template>

<script setup>
import PersonalPost from '@/components/PersonalPost.vue'
import { useAuthStore } from '@/stores/authStore'
import { computed, onMounted, ref } from 'vue'
import LogoView from './LogoView.vue'
import CreateBnt from '@/components/CreateBnt.vue'
import DeleteAuth from '@/components/auth/DeleteAuth.vue'
const authStore = useAuthStore()
const currentUserName = authStore.user?.displayName
const currentUserId = computed(() => authStore.user?.id)
const showDeleteBnt = ref(false)

onMounted(() => {
  setTimeout(() => {
    showDeleteBnt.value = true
  }, 2000)
})
</script>
