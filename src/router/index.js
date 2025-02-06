import { createRouter, createWebHistory } from 'vue-router'
import CreatePost from '@/components/CreatePost.vue'
import HomeView from '@/components/HomeView.vue'
import WelcomeBnt from '@/components/WelcomeBnt.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: WelcomeBnt },
    { path: '/home', component: HomeView },
    { path: '/create-post', component: CreatePost },
  ],
})

export default router
