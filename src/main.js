import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import router from './router'
import { db } from './backend/firebase'
const app = createApp(App)

db
app.use(createPinia())
app.use(router)

app.mount('#app')
