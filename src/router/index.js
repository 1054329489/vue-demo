import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/hello/Hello'
import Login from '@/views/login/Login'
import Sales from '@/components/InputForm'
import PendingLeg from '@/views/trader/Trader'
import MatchedLeg from '@/views/trader/MatchedLeg'
import NavMenu from "@/components/NavMenu";

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
      name: 'NavMenu',
      component: NavMenu,
      children: [
        {
          path: '/pendingLeg',
          name: 'PendingLeg',
          component: PendingLeg
        },
        {
          path: '/matchedLeg',
          name: 'matchedLeg',
          component: MatchedLeg
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sales',
      name: 'Sales',
      component: Sales
    },
    {
      path: '/matchedLeg',
      name: 'matchedLeg',
      component: MatchedLeg
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if(to.path==='/sales'){
//     next()
//   }else if (to.path === '/login') {
//     next()
//   } else {
//     let token = localStorage.getItem('token')
//     if (token === null || token === ''|| token === undefined) {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })

export default router
