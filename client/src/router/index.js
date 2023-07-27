import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import DetailPage from '../views/DetailPage.vue'
import FavoritePage from '../views/FavoritePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/cuisines/:id',
      name: 'detail',
      component: DetailPage
    },
    {
      path: '/favorites',
      name: 'favorite',
      component: FavoritePage
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (localStorage.access_token && (to.name === 'login' || to.name === 'register') ) {
    next('/');
  } else if (to.name === 'favorite' && !localStorage.access_token) {
    next('/');
  } else {
    next();
  }
});

export default router
