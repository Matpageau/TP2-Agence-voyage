import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import { useUserStore } from '@/stores/userStore'
import EditView from '@/views/EditView.vue'

const requireAdmin = async (to: any, from: any, next: NavigationGuardNext) => {
  const userStore = useUserStore()
  if (!userStore.currentUser) {
    await userStore.fetchUser(true)
  }

  if (userStore.currentUser?.role == 'user') {
    return next({ name: 'login' })
  }

  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/login",
      name: 'login',
      component: LoginView,
    },
    {
      path: "/admin",
      name: 'admin',
      component: AdminView,
      beforeEnter: requireAdmin
    },
    {
      path: "/admin/travel/create",
      name: 'create-travel',
      component: EditView,
      beforeEnter: requireAdmin
    },
    {
      path: "/admin/travel/:travelId",
      name: 'edit-travel',
      component: EditView,
      beforeEnter: requireAdmin
    }
  ],
})

export default router
