import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  const setUser = (userData) => {
    user.value = userData
  }
  const clearUser = () => {
    user.value = null
  }
  const auth = getAuth()
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser)
    } else {
      clearUser
    }
  })
  return { user, setUser, clearUser }
})
