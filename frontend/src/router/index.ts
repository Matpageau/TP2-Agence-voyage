import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import { useUserStore } from '@/stores/userStore'
import EditView from '@/views/EditView.vue'
import CartView from '@/views/CartView.vue'

const requireAdmin = async (to: unknown, from: unknown, next: NavigationGuardNext) => {
  const userStore = useUserStore()
  if (!userStore.currentUser) {
    await userStore.fetchUser(true)
  }
  
  console.log(userStore.currentUser?.role);
  
<<<<<<< Updated upstream
 if (!userStore.currentUser || userStore.currentUser?.role == 'user') {
=======
  if (!userStore.currentUser || userStore.currentUser?.role == 'user') {
>>>>>>> Stashed changes
    return next({ name: 'home' })
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
      path: "/cart",
      name: 'cart',
      component: CartView,
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
