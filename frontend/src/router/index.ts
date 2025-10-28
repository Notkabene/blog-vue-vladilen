import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
