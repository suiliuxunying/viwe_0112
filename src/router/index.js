import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Login from '@/user/Login.vue'
import View from '../components/View.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/a',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/View',
      name: 'View',
      component: View,
      children: [
        {
          path: 'Login',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
})
