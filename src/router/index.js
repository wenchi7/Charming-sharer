import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/view/HomeView.vue'
import WelcomeBnt from '@/components/WelcomeBnt.vue'
import { useAuthStore } from '@/stores/authStore'

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
      name: 'createpost',
      component: () => import('@/components/CreatePost.vue'),
      meta: { requiresSideBar: true, requiresAuth: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/auth/RegisterAdmin.vue'),
      meta: { requiresSideBar: true, requiresAuth: false },
    },
    {
      path: '/post/:id',
      name: 'StoryView',
      component: () => import('@/view/StoryView.vue'),
      meta: { requiresSideBar: true, requiresAuth: true },
    },
    {
      path: '/editpost/:id',
      name: 'EditPost',
      component: () => import('@/components/EditPost.vue'),
      meta: { requiresSideBar: true, requiresAuth: true },
    },
    {
      path: '/my-story',
      name: 'MyStory',
      component: () => import('@/view/MyStory.vue'),
      meta: { requiresSideBar: true, requiresAuth: true },
    },
    {
      path: '/users/:id/story',
      name: 'UsersStory',
      component: () => import('@/components/UsersStory.vue'),
      meta: { requiresSideBar: true, requiresAuth: true },
    },
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

export default router
