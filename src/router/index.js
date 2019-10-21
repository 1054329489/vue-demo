import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/hello/Hello'
import Login from '@/views/login/Login'
import InputForm from '@/components/InputForm'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
