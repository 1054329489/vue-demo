// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
// import Mock from './mock/index'
import axios from 'axios'
import store from './store/index'

// axios.defaults.baseURL = 'http://localhost:8080/tps'
axios.defaults.baseURL = 'https://simple-tps.caoyu.online/tps'
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$http = axios
Vue.prototype.$ajax = axios
Vue.prototype.$axios = axios

/* eslint-disable */
import locale from 'element-ui/lib/locale/lang/en'




Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// Add a request interceptor
axios.interceptors.request.use(config => {
//if token exist, add
  if(store.state.token){
    config.headers.common['token']=store.state.token.token
  }

  return config;
}, error => {
// if error
  return Promise.reject(error);
});

// http response interceptors
axios.interceptors.response.use(
  response => {

    return response;
  },
  error => {

    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('delToken');
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)
  });

