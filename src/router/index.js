import { createRouter, createWebHashHistory } from 'vue-router'
import * as jose from "jose";

// Función para verificar el token de autenticación
function isAuthenticated() {
  const token = localStorage.getItem('token'); // Suponiendo que el token está almacenado en el localStorage
  // Verificar si el token existe y es válido (puedes implementar tu lógica de validación aquí)
  return !!token; // Devuelve true si el token existe, de lo contrario devuelve false
}
// Función para obtener el rol del usuario desde el token
function getUserRole() {
  const token = localStorage.getItem('token'); // Suponiendo que el token está almacenado en el localStorage
  // Decodificar el token y extraer el rol del usuario (puedes implementar tu lógica de decodificación aquí)
  // Por ejemplo, si el token es JWT:
  const decodedToken = jose.decodeJwt(token);
  return decodedToken.role; // Devuelve el rol del usuario
}

// Guardia de navegación para verificar la autenticación y los roles de usuario
const authGuard = (to, from, next) => {
  if (to.path !== '/login' && !isAuthenticated()) {
    // Si el usuario intenta acceder a una ruta protegida y no está autenticado, redirígelo a la página de inicio de sesión
    next('/login');
  } else if (to.meta.roles && !to.meta.roles.includes(getUserRole())) {
    // Si el usuario no tiene el rol necesario para acceder a la ruta, redirígelo a la página de inicio
    next('/');
  } else {
    // Si el usuario está autenticado y tiene el rol necesario, permite el acceso a la ruta
    next();
  }
};
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
    component: () => import( '../modules/mercado/pages/Guia.vue'),
    beforeEnter: authGuard,
    meta: {
      roles: ['ADMINISTRADOR', 'COMERCIANTE'] // Roles permitidos para acceder a esta ruta
    }
  },
  {
    path: '/busquedaAD',
    component: () => import( '../modules/mercado/pages/BusquedaAD.vue'),
    beforeEnter: authGuard,
    meta: {
      roles: ['ADMINISTRADOR'] // Roles permitidos para acceder a esta ruta
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
