import { createRouter, createWebHistory } from 'vue-router'
import CreatePost from '@/components/CreatePost.vue'
import HomeView from '@/components/HomeView.vue'
import WelcomeBnt from '@/components/WelcomeBnt.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: WelcomeBnt, meta: { requiresSideBar: false, requiresAuth: false } },
    { path: '/home', component: HomeView, meta: { requiresSideBar: true, requiresAuth: true } },
    {
      path: '/create-post',
      component: CreatePost,
      meta: { requiresSideBar: true, requiresAuth: true },
    },
  ],
})
// let isAuthenticated = false
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next('/') // 未登入時，重導回 Welcome 頁面
//   } else {
//     next() // 允許訪問
//   }
// })

export default router
