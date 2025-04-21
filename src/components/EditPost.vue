<template>
  <LogoView />
  <div class="create-view flex justify-center mt-10">
    <div class="text-center bg-pink-200 w-9/12 min-h-auto rounded-xl mb-10 pb-10">
      <div class="m-10 flex items-center">
        <form class="flex w-full flex-col gap-4 relative" @submit.prevent="edit">
          <div class="flex w-full">
            <label
              for="post-title"
              class="text-2xl font-medium md:text-3xl px-6 w-48 text-left flex-grow"
              >Title :
            </label>
            <input
              v-model="post.title"
              type="text"
              id="post-title"
              maxlength="30"
              class="py-3 px-2 placeholder:px-2 rounded-lg flex w-full"
              placeholder="Your title(30字以內)"
              required
            />
          </div>

          <div class="flex w-full">
            <label
              for="product-name"
              class="text-xl font-semibold px-6 w-48 md:text-2xl flex-grow text-left"
              >Product :
            </label>
            <input
              v-model="post.product"
              type="text"
              id="product-name"
              class="py-3 px-2 placeholder:px-2 rounded-lg w-full"
              placeholder="輸入完整產品名稱"
              required
            />
          </div>
          <div class="my-5">
            <!-- 有image.url才顯示圖片,:src="O"讓O控制照片來源，讓圖片動態變化 -->
            <input type="file" @change="handleFileChange" ref="photo" />
            <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="w-72 mx-auto mt-10" />
            <input
              v-if="imageUrl"
              type="button"
              value="取消照片選取"
              @click="cancelPhoto"
              class="border border-stone-950 rounded-lg cursor-pointer px-3 py-1 mt-4 hover:bg-red-600 bg-red-500 text-white"
            />
          </div>

          <div class="flex flex-col gap-4 w-full md:flex-row">
            <label
              for="post-content"
              class="text-xl font-semibold px-6 w-48 md:text-2xl flex-grow text-left"
              >description:</label
            >
            <textarea
              v-model="post.description"
              name="post-content"
              id="post-content"
              placeholder="Your beauty story ✨"
              class="p-3 rounded-lg w-full min-h-64 overflow-y-scroll"
              required
            ></textarea>
          </div>

          <div class="flex justify-end absolute right-0 -bottom-14">
            <button type="button" @click="cancelEdit" class="border border-gray-900 px-2 py-1 rounded bg-amber-200 hover:bg-amber-300 cursor-pointer disabled:bg-gray-400 mr-8 ">取消</button>
            <button
              type="submit"
              :disabled="photoIsLoading "
              class="border border-gray-900 px-2 py-1 rounded bg-red-400 hover:bg-red-500 cursor-pointer disabled:bg-gray-400"
            >完成</button>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/backend/firebase';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import LogoView from '@/view/LogoView.vue';

const router = useRouter()
const route = useRoute()
const imageUrl = ref(null)
const photo = ref(null)
const photoIsLoading = ref(false)
const post = ref({
  title: '',
  product: '',
  description: '',
  imageUrl: '',
    }
  )


const handleFileChange = (event) => {
  const selectedFile = event.target.files[0]
  if(selectedFile){
    const reader = new FileReader()
    reader.onload = () => {
      imageUrl.value = reader.result
    }
    reader.readAsDataURL(selectedFile)
    post.value.imageUrl = '';
  }

}



const fetchPost = async () => {
  const docRef = doc(db, 'posts', route.params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    post.value = docSnap.data();
    imageUrl.value = post.value.imageUrl;
  }
};



const edit = async () => {
  const postId = route.params.id
  const postRef = doc(db,'posts', postId)
  try {
    let uploadImageUrl = post.value.imageUrl
    if(photo.value.files[0] ){
      uploadImageUrl= await uploadImage(photo.value.files[0])
    if(!uploadImageUrl){
      alert('上傳失敗，請再試一次')
      return
    }
  }
    await updateDoc(postRef,{
      title:post.value.title,
      product: post.value.product,
      description: post.value.description,
      imageUrl: uploadImageUrl,
    })
    alert('更新成功！')
    router.push({ name:'home' })
  }catch(error){
    alert('更新失敗')
    console.log(error.message)
  }
}

const uploadImage = async(file)=> {
//不然就創建一個FormData物件並追加資料
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
  formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

  photoIsLoading.value = true
 //使用axios發送post請求並等待結果
  try {

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
    )
    return response.data.secure_url
  } catch (error) {
    console.error('Upload failed:', error.message)
    return null
  }
  }



const cancelPhoto = () => {
  if (photo.value) {
    photo.value.value = '';
  }
  imageUrl.value = null;
  post.value.imageUrl = '';
}

const cancelEdit = () => {
  post.value = { ...post.value }
  imageUrl.value = post.value.imageUrl;
  router.back()
}
onMounted(fetchPost)
</script>
