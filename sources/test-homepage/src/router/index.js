import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Notifications from '@/views/Notifications.vue'
import Faq from '@/views/Faq.vue'
import Contact from '@/views/Contact.vue'
import Access from '@/views/Access.vue'
import NotificationDetail from '../views/NotificationDetail.vue'  
import DogList from '@/views/DogList.vue'
import DogDetail from '@/views/DogDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/notifications', name: 'Notifications', component: Notifications },
  { path: '/notifications/:id', name: 'NotificationDetail', component: NotificationDetail },
  { path: '/doglist', name: 'DogList', component: DogList },
  { path: '/dogs/:id', name: 'DogDetail', component: DogDetail},
  { path: '/faq', name: 'Faq', component: Faq },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/access', name: 'Access', component: Access },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // savedPosition がある場合（ブラウザの「戻る」「進む」ボタンなど）
    if (savedPosition) {
      return savedPosition;
    } else {
      // それ以外の場合（新しいページに遷移した場合）はトップにスクロール
      // スムーズなスクロールを希望する場合は behavior: 'smooth' を追加
      return { top: 0, left: 0 };
    }
  },
})

export default router