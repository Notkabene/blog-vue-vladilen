import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/users',
    component: () => import('../views/UsersView.vue')
  },
  {
    path: '/post',
    component: () => import('../views/NewArticleView.vue')
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
