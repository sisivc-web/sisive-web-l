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
          // component: Home
        },
        {
          path: 'memberDetail',
          // component: MemberDetail
          component: () => import('components/member-detail/member-detail')
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
