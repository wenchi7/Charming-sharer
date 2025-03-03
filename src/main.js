import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import router from './router'
import { db } from './backend/firebase'
import { useAuthStore } from './stores/authStore'
const app = createApp(App)
db
app.use(createPinia())
const authStore = useAuthStore()
authStore.initAuth()
app.use(router)

app.mount('#app')
