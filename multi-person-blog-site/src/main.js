import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import "./utils/elementUI"
import './assets/iconfont/iconfont.css'
import mavonEditor from 'mavon-editor' // 引入markdown 所有组件
import 'mavon-editor/dist/css/index.css';
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

Vue.use(mavonEditor) // markdown  挂在到全局

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
