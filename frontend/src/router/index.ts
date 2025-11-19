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
    path: '/registration',
    component: () => import('../views/RegistrationView.vue')
  },
  {
    path: '/users',
    component: () => import('../views/UsersView.vue')
  },
  {
    path: '/post/',
    component: () => import('../views/NewArticleView.vue')
  },
  {
    path: '/post/:id',
    component: () => import('../views/ArticleView.vue')
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
