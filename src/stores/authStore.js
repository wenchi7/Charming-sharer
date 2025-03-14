import { onAuthStateChanged, getAuth, signOut,reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { defineStore } from "pinia";
import { db } from "@/backend/firebase";
import { doc, deleteDoc} from "firebase/firestore";
export const useAuthStore = defineStore('auth',{
  state: () => ({
    user: JSON.parse(sessionStorage.getItem("authUser")) || null,
    isAuthReady: false,
  }),
  actions: {
    initAuth() {
      const auth = getAuth()
      onAuthStateChanged(auth,(user) => {
        if(user) {
          this.user = {
            id: user.uid,
            email: user.email,
            displayName:user.displayName || '使用者',
          }
          sessionStorage.setItem('authUser',JSON.stringify(this.user))
        }else {
          this.user = null
          sessionStorage.removeItem('authUser') // 若登出則清除
        }
        this.isAuthReady = true
      })
    },
    setUser(user) {
      this.user = user
      sessionStorage.setItem('authUser', JSON.stringify(user))
    },
    async logout() {
      try {
        const auth = getAuth();
        const userName = this.user?.displayName || '未知user'

          await signOut(auth);
          sessionStorage.removeItem('authUser');
          this.user = null
        console.log('登出成功',userName)
      } catch(error) {
        console.error('登出失敗', error)
      }
    },

async deleteAccount() {
  try {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      // 這裡需要讓用戶輸入密碼來進行重新驗證
      const password = prompt('請輸入您的密碼以確認刪除帳號') // 可以自定義密碼輸入方式

      if (password) {
        const credential = EmailAuthProvider.credential(user.email, password)

        // 進行重新驗證
        await reauthenticateWithCredential(user, credential)

        // 如果重新驗證成功，則刪除帳號
        const userDocRef = doc(db,'users',user.uid)
        await deleteDoc(userDocRef)
        console.log('用戶資料已從 Firestore 刪除')
        await user.delete()
        sessionStorage.clear() // 清除 sessionStorage
        console.log('帳號已被刪除')
      } else {
        console.log('密碼未輸入，操作取消')
      }
    } else {
      console.log('用戶未登入')
    }
  } catch (error) {
    console.error('帳號刪除失敗:', error.message)
  }
}
  }
})

