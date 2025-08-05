import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import { useUserStore } from '@/stores/userStore'
import EditView from '@/views/EditView.vue'

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
      beforeEnter: async (to, from, next) => {
        const userStore = useUserStore()
        if(!userStore.currentUser) {
          await userStore.fetchUser(true)
        }

        if(userStore.currentUser?.role !== 'admin') {
          return next({name: 'login'})
        }

        next()
      },
      children: [ 
        {
          path: "/travelId",
          name: "edittravel",
          component: EditView
        }
      ]
    }
  ],
})

export default router
