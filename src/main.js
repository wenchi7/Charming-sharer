import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'
const app = createApp(App)
//確保pinia完成初始化
const pinia = createPinia()
app.use(pinia)
const authStore = useAuthStore()
authStore.initAuth()
app.use(router)

app.mount('#app')
