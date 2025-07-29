import { i18n } from '@/plugins/LocalePlugin';
import { store } from '@/plugins/StorePlugin';
import { TOKEN_NAME } from '@/settings';
import { useAuthStore } from '@/store/auth';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

// 根据不同的环境设置不同的路由模式
const routerMode = import.meta.env.MODE === 'production' ? createWebHistory() : createWebHashHistory()

const router = createRouter({
  history: routerMode,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home/index.vue'),
      meta: {
        title: i18n.global.t('home.title'),
        requiresAuth: true
      }
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue'),
      meta: {
        title: i18n.global.t('login.title')
      }
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.title
  
  const authStore = useAuthStore(store)
  // 检查路由是否需要登录
  if (to.meta.requiresAuth) {
    // 检查用户是否已登录
    const isAuthenticated = authStore[TOKEN_NAME]
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      // 如果用户未登录，重定向到登录页面
      return { path: '/login', query: { redirect: to.fullPath } }
    }
  }
})

export default router
