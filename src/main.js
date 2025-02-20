import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import App from './App.vue'
import router from './router'
import { setupFirebase } from './backend/firebbase'
const app = createApp(App)

setupFirebase
app.use(createPinia())
app.use(router)

app.mount('#app')
