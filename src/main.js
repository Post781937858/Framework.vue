import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'jquery'
// import 'signalr'
import './assets/theme/style/theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import 'font-awesome/scss/font-awesome.scss'
import websocket from './store/websocketStore'

Vue.prototype.$echarts = echarts
// Vue.prototype.$ = $
Vue.config.productionTip = true
Vue.prototype.$websocket = websocket
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
