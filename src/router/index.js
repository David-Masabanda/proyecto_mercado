import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/login'

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
  },
  {
    path: '/guia',
    component: () => import( '../modules/mercado/pages/Guia.vue')
  },
  {
    path: '/busquedaAD',
    component: () => import( '../modules/mercado/pages/BusquedaAD.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
