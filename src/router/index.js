import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/hello/Hello'
import Login from '@/views/login/Login'
import InputForm from '@/components/InputForm'
import Trader from '@/views/trader/Trader'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/inputForm',
      name: 'InputForm',
      component: InputForm
    },
    {
      path: '/trader',
      name: 'Trader',
      component: Trader
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     let token = localStorage.getItem('Authorization')
//     console.log('11' + token)
//
//     if (token === null || token === '') {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })

export default router
