import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Notifications from '@/views/Notifications.vue'
import Faq from '@/views/Faq.vue'
import Contact from '@/views/Contact.vue'
import Access from '@/views/Access.vue'
import NotificationDetail from '../views/NotificationDetail.vue'  

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/notifications', name: 'Notifications', component: Notifications },
  { path: '/notifications/:id', name: 'NotificationDetail', component: NotificationDetail },
  { path: '/faq', name: 'Faq', component: Faq },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/access', name: 'Access', component: Access },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
