import { onAuthStateChanged, getAuth } from "firebase/auth";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth',{
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    isAuthReady: false,
  }),
  actions: {
    initAuth() {
      const auth = getAuth()
      onAuthStateChanged(auth,(user) => {
        if(user) {
          this.user = {
            id: user.id,
            email: user.email,
            displayName:user.displayName,
          }
          sessionStorage.setItem('user',JSON.stringify(this.user))
        }else {
          this.user = null
          sessionStorage.removeItem('user') // 若登出則清除
        }
        this.isAuthReady = true
      })
    },
    setUser(user) {
      this.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.user = null
      sessionStorage.removeItem('user')
    },
  }
})
