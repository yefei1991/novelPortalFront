import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/firstMes',
      name: 'firstMes',
      component: () => import('@/components/firstMes')
    },
    {
      path: '/secondMes',
      name: 'secondMes',
      component: () => import('@/components/secondMes')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/components/Test')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('@/components/BookList')
    }
  ]
})
