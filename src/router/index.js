import { createRouter, createWebHistory } from 'vue-router'
import CreatePost from '@/components/CreatePost.vue'
import HomeView from '@/view/HomeView.vue'
import WelcomeBnt from '@/components/WelcomeBnt.vue'

import { useAuthStore } from '@/stores/authStore'
import RegisterAdmin from '@/components/auth/RegisterAdmin.vue'
import StoryView from '@/view/StoryView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: WelcomeBnt, meta: { requiresSideBar: false, requiresAuth: false } },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresSideBar: true, requiresAuth: true },
    },
    {
      path: '/create-post',
      component: CreatePost,
      meta: { requiresSideBar: true, requiresAuth: true },
    },
    {
      path: '/register',
      component: RegisterAdmin,
      meta: { requiresSideBar: false, requiresAuth: false },
    },
    {
      path:'/post/:id',
      name:'StoryView',
      component: StoryView,
      meta: { requiresSideBar: true, requiresAuth: true },
    }
  ],
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.user) {
    next('/')
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   const user = getAuth().currentUser
//   if (to.meta.requiresAuth && !user) {
//     next('/') // 未登入的情況下重定向
//   } else {
//     next() // 允許進入該頁面
//   }
// })

export default router
