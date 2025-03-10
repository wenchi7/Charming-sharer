import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { defineStore } from "pinia";

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
  }
})
