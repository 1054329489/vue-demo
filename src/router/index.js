import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/hello/Hello'
import Login from '@/views/login/Login'
import InputForm from '@/components/InputForm'
import Trader from '@/views/trader/Trader'
import MatchedLeg from '@/views/trader/MatchedLeg'
import Nav from '@/components/NavMenu'
import NavMenu from "../components/NavMenu";

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
          path: '/trader',
          name: 'Trader',
          component: Trader
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

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('token')
    console.log(token)
    if (token === null || token === '') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
