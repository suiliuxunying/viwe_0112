import Vue from 'vue'
import App from './App.vue'
// router使用第一行（当然这是个文件）
import router from './router/index'
// element使用的前两行
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// axios使用的三行
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
// element使用第三行
Vue.use(ElementUI)
new Vue({
  // router使用第二行
  router,
  render: h => h(App)
}).$mount('#app')
