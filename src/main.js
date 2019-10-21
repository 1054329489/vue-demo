// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Mock from './mock/index'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$http = axios
/* eslint-disable */
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
