import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/hello/Hello'
import Login from '@/views/user/login'
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
      name: Login.name,
      path: '/user/login',
      component: Login,
      meta: {
        "auth": false
      }
    },
    {
      path: '/inputForm',
      name: 'InputForm',
      component: InputForm
    }
  ]
})
