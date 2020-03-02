import Vue from 'vue'
import App from './App.vue'
// 4.store使用第一行
import store from './store/index'
// 1.router使用第一行（当然这是个文件）
import router from './router/index'
// 2.element使用的前两行
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 3.axios使用的三行
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
// element使用第三行
Vue.use(ElementUI)
new Vue({
  // 1.router使用第二行
  router,
  // 4.store 使用的二行
  store,
  render: h => h(App)
}).$mount('#app')
