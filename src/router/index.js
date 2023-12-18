import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/inicio'

  },
  {
    path: '/login',
    component: () => import('../modules/mercado/pages/Login.vue'),

  },
  {
    path: '/registro',
    component: () => import( '../modules/mercado/pages/Registro.vue')
  },
  {
    path: '/inicio',
    component: () => import( '../modules/mercado/pages/Inicio.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
