import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/before'
  },
  {
    path : '/before',
    component : () => import('@/views/BeforePage.vue')
  },
  {
    path : '/welcome',
    component : () => import('@/views/WelcomePage.vue')
  },
  {
    path : '/invite',
    component : () => import('@/views/InvitePage.vue')
  },
  {
    path : '/home',
    component : () => import('@/views/HomePage.vue')
  },
  {
    path : '/bad',
    component : () => import('@/views/BadPage.vue')
  },
  {
    path : '/after',
    component : () => import('@/views/AfterPage.vue')
  },
  {
    path : '/notifs',
    component : () => import('@/views/NotifPage.vue')
  },
  {
    path : '/test',
    component : () => import('@/views/TestPage.vue')
  },
  {
    path : '/param',
    component : () => import('@/views/ParamPage.vue')
  },
  {
    path : '/mon_profil',
    component : () => import('@/views/MyProfilPage.vue')
  },
  {
    path : '/abon',
    component : () => import('@/views/AbonPage.vue')
  },
  {
    path : '/profil/:id',
    component : () => import('@/views/NProfilPage.vue')
  },
  {
    path : '/room/:id',
    component : () => import('@/views/RoomPage.vue')
  },
  {
    path : '/nroom/:id',
    component : () => import('@/views/RoomNoPage.vue')
  },
  {
    path : '/res/:id',
    component : () => import('@/views/NewResPage.vue')
  },
  {
    path : '/great',
    component : () => import('@/views/GreatPage.vue')
  },
  {
    path : '/lov',
    component : () => import('@/views/LovPages.vue')
  },
  {
    path : '/chat',
    component : () => import('@/views/ChatPage.vue')
  },
  {
    path : '/loves',
    component : () => import('@/views/LovesPage.vue')
  },
  {
    path : '/login',
    component : () => import('@/views/LoginPage.vue')
  },
  {
    path : '/register',
    component : () => import('@/views/RegisterPage.vue')
  },
  {
    path: '/af/:id',
    component: () => import('@/views/AfPage.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'lov',
        component: () => import('@/views/LovPages.vue')
      },
      {
        path: 'com',
        component: () => import('@/views/ComPage.vue')
      },
      {
        path: 'chat',
        component: () => import('@/views/ChatPage.vue')
      },
      {
        path : 'mon_profil',
        component : () => import('@/views/MyProfilPage.vue')
      },
      {
        path : 'param',
        component : () => import('@/views/ParamPage.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
