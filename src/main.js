import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import echarts from 'echarts'
import api from './constants/API.appkey'
import './plugins/element.js'
import './assets/css/global.less'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
Vue.prototype.api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
