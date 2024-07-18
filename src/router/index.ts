import { createRouter, createWebHistory } from 'vue-router';
import RootPage from '@/pages/RootPage.vue';
import LoginPage from '@/pages/Login.vue';
import Administrative from '@/components/sidebar/users/Administrative.vue'
import { useAuthStore } from '@/stores/store';



const routes = [
  {
    path: '/',
    redirect: '/login', // Redirige a /login por defecto
  },
  {
    path: '/root',
    name: 'rootPage',
    component: RootPage,
    meta: { requiresAuth: true },
    children: [
      {
          path: 'administrative', // Elimina la barra inicial para rutas hijas
          name: '/root/administrative',
          component: () => import('@/components/sidebar/users/Administrative.vue'),
      },
      // {
      //     // path: 'users', // Elimina la barra inicial para rutas hijas
      //     // name: 'users',
      //     // component: () => import('../components/view/users/users.vue'),
      // },
  ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore: any = useAuthStore()
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!authStore.loggedIn) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
