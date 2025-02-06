<template>
  <div class="create-view flex justify-center mt-10">
    <div class="text-center bg-pink-200 w-9/12 min-h-auto rounded-xl mb-10 pb-10">
      <div class="m-10 flex items-center">
        <form class="flex w-full flex-col gap-4 relative">
          <div class="flex w-full">
            <label
              for="post-title"
              class="text-2xl font-medium md:text-3xl px-6 w-48 text-left flex-grow"
              >Title :
            </label>
            <input
              type="text"
              id="post-title"
              class="py-3 px-2 placeholder:px-2 rounded-lg flex w-full"
              placeholder="Your title"
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
              type="text"
              id="product-name"
              class="py-3 px-2 placeholder:px-2 rounded-lg w-full"
              placeholder="Product name"
              required
            />
          </div>

          <div class="flex flex-col gap-4 w-full md:flex-row">
            <label
              for="post-content"
              class="text-xl font-semibold px-6 w-48 md:text-2xl flex-grow text-left"
              >description:</label
            >
            <textarea
              name="post-content"
              id="post-content"
              class="p-3 rounded-lg w-full min-h-64 overflow-y-scroll"
              required
            ></textarea>
          </div>

          <div>
            <input type="file" @change="uploadImage" />
            <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" />
          </div>

          <div class="flex justify-end absolute right-0 -bottom-14">
            <input
              type="submit"
              value="share"
              class="border border-gray-900 px-2 py-1 rounded bg-amber-300"
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

const imageUrl = ref('')
const uploadImage = async (event) => {
  const file = event.target.files[0]
  console.log(event.target.files)

  if (!file) return

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'wenchi_preset')
  formData.append('cloud_name', 'dvzkvj8cs')
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dvzkvj8cs/image/upload`,
      formData,
    )
    console.log(response.data.secure_url)
    imageUrl.value = response.data.secure_url
  } catch (error) {
    console.error('Upload failed:', error.response ? error.response.data : error.message)
  }
}
</script>
