import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('components/main/main_home'),
      // component: MainHome,
      children: [
        {
          path: 'home',
          component: () => import('components/home/home')
        },
        {
          path: 'memberDetail',
          component: () => import('components/member-detail/member-detail')
        },
        {
          path: 'news',
          component: () => import('components/news/news')
        },
        {
          path: 'newsDetail',
          component: () => import('components/news/news-detail')
        },
        {
          path: 'historys',
          component: () => import('components/history/historys')
        },
        {
          path: 'historyDetail',
          component: () => import('components/history/history-detail')
        },
        {
          path: 'mAnchor',
          // component: MAnchor
          component: () => import('components/m-anchor/m-anchor')
        },
        {
          path: 'about',
          // component: MAnchor
          component: () => import('components/about/about')
        },
        {
          path: 'moreAdvisers',
          // component: MAnchor
          component: () => import('components/moreAdvisers/watch')
        }
      ]
    },
    {
      path: '/',
      component: {
        render (c) { return c('router-view') }
      },
      children: []
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
