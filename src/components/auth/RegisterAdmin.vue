<template>
  <div class="flex justify-center mt-10 text-4xl font-mono">
    <h1>註冊帳號</h1>
  </div>
  <div class="flex justify-center font-mono">
    <form
      @submit.prevent="userRegistration"
      class="flex flex-col gap-10 mt-10 bg-blue-300 w-96 justify-center items-end pr-5 py-10 rounded-lg"
    >
      <div class="m-1 text-lg">
        <label for="name">使用者名字：</label>
        <input
        required
          type="string"
          id="name"
          v-model="user.name"
          placeholder="輸入暱稱"
          class="placeholder:text-sm pl-2"
        />
      </div>
      <div class="m-1 text-lg">
        <label for="email">信箱：</label>
        <input
        required
          type="email"
          id="email"
          v-model="user.email"
          placeholder="請輸入Email"
          class="placeholder:text-sm pl-2"
        />
      </div>
      <div class="m-1 text-lg">
        <label for="password">密碼：</label>
        <input
        required
          type="password"
          id="password"
          v-model="user.password"
          placeholder="請輸入密碼(大於6字)"
          class="placeholder:text-sm pl-2"
        />
      </div>
      <button type="submit" class="w-32 p-2 rounded-lg bg-yellow-200">註冊</button>
    </form>
  </div>
</template>

<script setup>
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db } from '@/backend/firebase'
import { collection,query, where, getDocs, setDoc, doc } from 'firebase/firestore'
const router = useRouter()
const user = ref({
  name: '',
  email: '',
  password: '',
})

const userRegistration = async () => {
  try {
    if (user.value.password.length < 6) {
      alert('密碼長度必須大於6個字元')
      return
    }
    try{
    const userRef = collection(db, 'users')
    const q = query(userRef, where('name', '==', user.value.name.trim()))
    const querySnapshot = await getDocs(q)

    if(!querySnapshot.empty){
      alert('使用者名稱已被使用，請選擇其他名稱')
      return
    }
  }catch(error){
    console.error(error.message)
  }

    const firebaseAuth = getAuth()
    const res = await createUserWithEmailAndPassword(
      firebaseAuth,
      user.value.email,
      user.value.password,
    )
    await updateProfile(res.user, {
      displayName: user.value.name,
    })

    const userDocRef = doc(db, 'users', res.user.uid)
    await setDoc(userDocRef,{
      name: user.value.name,
      email: user.value.email,
    })
alert('註冊完成！')
    router.push('/')
  } catch (error) {
    if(error.code === 'auth/email-already-in-use') {
      alert ('此信箱已被註冊過，請嘗試其他帳號')
    }else if(error.code === 'auth/invalid-email'){
      alert('email格式錯誤')
    }else {
      alert('註冊失敗請重新註冊！請檢查密碼是否小於6字')
    }
  }
}
</script>
