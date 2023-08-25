import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/tutorial',
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '智能摄像头300w',
        show: true,
      },
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      meta: {
        title: '使用教程',
        show: true,
      },
      component: () => import('@/views/tutorial/index.vue')
    },
    {
      path: '/appinfo',
      name: 'appinfo',
      meta: {
        title: '查询底座App信息',
        show: true,
      },
      component: () => import('@/views/appinfo/index.vue')
    },
    {
      path: '/network',
      name: 'network',
      meta: {
        title: '查询底座App网络状态',
        show: true,
      },
      component: () => import('@/views/network/index.vue')
    },
    {
      path: '/appstorage',
      name: 'appstorage',
      meta: {
        title: 'App本地存储',
        show: true,
      },
      component: () => import('@/views/appstorage/index.vue')
    },
    {
      path: '/nativepage',
      name: 'nativepage',
      meta: {
        title: '打开底座页面',
        show: true,
      },
      component: () => import('@/views/nativepage/index.vue')
    },
    {
      path: '/resource',
      name: 'resource',
      meta: {
        title: '打开资源页面',
        show: true,
      },
      component: () => import('@/views/reourceInfo/index.vue')
    },
    {
      path: '/preriod',
      name: 'preriod',
      meta: {
        title: '设置保存期限',
        show: true,
      },
      component: () => import('@/views/preriod/index.vue')
    },
  ]
})

export default router
