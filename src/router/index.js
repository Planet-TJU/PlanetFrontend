import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: () => import("@/views/Welcome")
    },
    {
      path: '/Welcome',
      name: 'Welcome',
      component: () => import("@/views/Welcome")
    },
    {
      path: '/Homepage',
      name: 'Homepage',
      component: () => import("@/views/Homepage")
    }
  ]
})
