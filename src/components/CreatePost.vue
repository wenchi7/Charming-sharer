<template>
  <div class="create-view flex justify-center mt-10">
    <div class="text-center bg-pink-200 w-9/12 min-h-auto rounded-xl mb-10 pb-10">
      <div class="m-10 flex items-center">
        <form class="flex w-full flex-col gap-4 relative" @submit.prevent="create">
          <div class="flex w-full">
            <label
              for="post-title"
              class="text-2xl font-medium md:text-3xl px-6 w-48 text-left flex-grow"
              >Title :
            </label>
            <input
              v-model="title"
              type="text"
              id="post-title"
              class="py-3 px-2 placeholder:px-2 rounded-lg flex w-full"
              placeholder="Your title(10字以內)"
              maxlength="10"
              required
            />
          </div>

          <div class="flex w-full">
            <label
              for="product-name"
              class="text-xl font-semibold px-6 w-48 md:text-2xl flex-grow text-left"
              >Prodact :
            </label>
            <input
              v-model="product"
              type="text"
              id="product-name"
              class="py-3 px-2 placeholder:px-2 rounded-lg w-full"
              placeholder="Product name"
              required
            />
          </div>
          <div class="my-5">
            <!-- 有image.url才顯示圖片,:src="O"讓O控制照片來源，讓圖片動態變化 -->
            <input type="file" @change="uploadImage" ref="photo" />
            <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="w-72 mx-auto mt-10" />
            <input
              v-if="imageUrl"
              type="button"
              value="取消照片選取"
              @click="canclephoto"
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
              v-model="description"
              name="post-content"
              id="post-content"
              class="p-3 rounded-lg w-full min-h-64 overflow-y-scroll"
              required
            ></textarea>
          </div>

          <div class="flex justify-end absolute right-0 -bottom-14">
            <input
              type="submit"
              value="share"
              class="border border-gray-900 px-2 py-1 rounded bg-amber-200 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { db } from '@/backend/firebase.js'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'vue-router'
const title = ref('')
const product = ref('')
const description = ref('')
const imageUrl = ref('')
const router = useRouter()
const photo = ref(null)
const uploadImage = async (event) => {
  // event.target指的是input type=file的元素,files是檔案的陣列，event.target.files[0]是要拿這個input裡的檔案列的第1個
  const file = event.target.files[0]
  console.log(event.target.files)
  if (!file) return
  //如果沒有選擇任何檔案就結束函數
  //不然就創建一個FormData物件並追加資料
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'wenchi_preset')
  formData.append('cloud_name', 'dvzkvj8cs')
  //使用axios發送post請求並等待結果
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dvzkvj8cs/image/upload`,
      formData,
    )
    console.log(response.data.secure_url)
    imageUrl.value = response.data.secure_url
  } catch (error) {
    console.error('Upload failed:', error.message)
  }
}

const create = async () => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      title: title.value,
      product: product.value,
      description: description.value,
      imageUrl: imageUrl.value,
      createdAt: serverTimestamp(),
    })
    console.log(docRef.id)
    router.push('/home')
  } catch (e) {
    console.error('error message', e)
  } finally {
    title.value = ''
    product.value = ''
    description.value = ''
    imageUrl.value = ''
  }
}

const canclephoto = () => {
  imageUrl.value = null
  photo.value.value = ''
}
</script>
