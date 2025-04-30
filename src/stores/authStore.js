import {
  onAuthStateChanged,
  getAuth,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth'
import { defineStore } from 'pinia'
import { db } from '@/backend/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthReady = ref(false)
  const auth = getAuth()

  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('authUser')
    user.value = storedUser ? JSON.parse(storedUser) : null
  }

  //onAuthStateChanged用來初始化user認證狀態和監控變化

  const initAuth = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || '使用者',
        }
        localStorage.setItem('authUser', JSON.stringify(user.value))
      } else {
        user.value = null
        localStorage.removeItem('authUser') // 若登出則清除
      }
      isAuthReady.value = true
    })
  }
  const setUser = (userData) => {
    user.value = userData
    localStorage.setItem('authUser', JSON.stringify(userData))
  }

  const logOut = async () => {
    try {
      const userName = user.value?.displayName || '未知user'
      await signOut(auth)
      localStorage.removeItem('authUser')
      user.value = null
      console.log('登出成功', userName)
    } catch (error) {
      console.error('登出失敗', error)
    }
  }

  const deleteAccount = async () => {
    try {
      const currentUser = auth.currentUser

      if (currentUser) {
        // 這裡需要讓用戶輸入密碼來進行重新驗證
        const password = prompt('請輸入您的密碼以確認刪除帳號') // 可以自定義密碼輸入方式

        if (password) {
          const credential = EmailAuthProvider.credential(currentUser.email, password)

          // 進行重新驗證
          await reauthenticateWithCredential(currentUser, credential)

          // 如果重新驗證成功，則刪除帳號
          const userDocRef = doc(db, 'users', currentUser.uid)
          await deleteDoc(userDocRef)
          await currentUser.delete()
          localStorage.clear() // 清除 localStorage
          alert('帳號已被刪除')
        } else {
          alert('密碼未輸入，操作取消')
        }
      } else {
        alert('用戶未登入')
      }
    } catch (error) {
      alert('帳號刪除失敗，請稍後再重試')
      console.error('帳號刪除失敗:', error.message)
    }
  }
  watch(
    user,
    (newUser) => {
      if (newUser) {
        localStorage.setItem('authUser', JSON.stringify(newUser))
      } else {
        localStorage.removeItem('authUser')
      }
    },
    { deep: true },
  )
  return { user, isAuthReady, initAuth, setUser, logOut, deleteAccount }
})
