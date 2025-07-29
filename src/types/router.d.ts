import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 网页标题
     */
    title: string;
    /**
     * 路由是否需要登录
     */
    requiresAuth?: boolean;
  }
}