  <!-- 文章頁面 -->
<template>
  <LogoView />
  <div
    class="relative flex flex-col mx-10 my-16  shadow-2xl rounded-lg justify-center items-end bg-amber-100 "
  >
    <RouterLink :to="{ name: 'home' }">
      <span
        v-if="post"
        class="absolute top-4 right-4 border rounded-[50%] w-8 h-8 flex justify-center pb-1 items-center bg-red-600 text-black border-black text-2xl hover:scale-110"
        >x</span
      >
    </RouterLink>
    <div v-if="post" class="mt-5 p-10 flex flex-col justify-center items-center w-full">
      <h1 class="text-3xl mb-5 font-bold sm:text-4xl">{{ post.title }}</h1>
      <div v-if="post.createdAt" class="flex self-end text-sm text-gray-500 italic">{{formatDate(post.createdAt)}}發佈</div>
      <div class=" border-t-1 border-red-300 w mb-7"></div>

        <img
          v-if="post.imageUrl"
          :src="post.imageUrl"
          alt="product image"
          class="w-8/12 flex sm:mr-5 shadow-lg md:w-6/12 lg:w-4/12  duration-500 ease-in-out"
          :style="{transform: isClickImage ? 'scale(2)' : 'scale(1)' }"
          @click="toggleImageSize"
        />
        <p v-if="post.description" class="mt-10 mb-5 w-full px-1 leading-9 break-words text-lg indent-9">{{ post.description }}</p>
      </div>
      <div class="mt-14" v-if="post">
        <div v-if="isAuthor"
             class="absolute right-10 bottom-5 flex items-center">
              <RouterLink :to="{ name:'EditPost' } "
               class="bg-red-400 mr-6 px-2 py-1 rounded-md border border-stone-700 hover:bg-red-600 cursor-pointer" >編輯
              </RouterLink>
              <button type="button" @click="confirmDelete" class="bg-red-400 mr-6 px-2 py-1 rounded-md border border-stone-700 hover:bg-red-600 cursor-pointer" >刪除</button>
        </div>

        <div class="absolute right-10 bottom-16 flex items-center">
          <p class=" mr-4 italic text-stone-700">觀看次數 :</p>
          <p class=" mr-10 italic text-stone-700">{{ post.viewer }}</p>
          <p class=" italic text-stone-700 ">Charming Sharer: {{ post.creater }}</p>
        </div>
      </div>
      </div>

</template>

<script setup>
import { db } from '@/backend/firebase'
import { ref, onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc,increment,updateDoc,deleteDoc} from 'firebase/firestore'
import LogoView from './LogoView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()
const post = ref(null)
const isClickImage = ref(false)
const isAuthor = ref(false)
const authStore = useAuthStore()


const fetchPost = async () => {
  const docRef = doc(db, 'posts', route.params.id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    post.value = docSnap.data()
    if(post.value.viewer === undefined) {
      post.value.viewer = 0
    }
    await updateDoc(docRef,{
      viewer: increment(1)
    }
    )
   isAuthor.value = authStore.user.id && post.value && authStore.user.id === post.value.authorId;
console.log(post.value.imageUrl)
      //測試作者與登入者是否相同
      // console.log(authStore.user.id)
      // console.log(post.value.authorId)
  } else {
    console.log('文章不存在')
  }
}

const toggleImageSize = () => {
  isClickImage.value = ! isClickImage.value
}

const formatDate = (timestamp) => {
  const date = timestamp.toDate()
  const options = {year:'numeric', month:'numeric', day:'numeric'}
  return date.toLocaleDateString('zh-TW', options)
}

const confirmDelete = async () => {
  const isConfirm = confirm('確定要刪除此文章嗎？')


  if(!isConfirm) return;
  try {
    await deleteDoc(doc(db, 'posts', route.params.id))
    alert('文章已刪除')
    router.push({ name: 'home' })
  }catch(error){
    console.log(error.message)
  }
}




onMounted(fetchPost)  // 先獲取文章資料
</script>

<style scoped>
/* 調整分隔線寬度 */
.border-t-1 {
  border-top-width: 1px; /* 更細的分隔線 */
  width: 100%; /* 確保分隔線寬度佔滿容器 */
}
.transition-transform {
  transition: transform 0.5s ease-in-out;
}
</style>
