import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Login from '@/user/Login.vue'
import View from '../components/View.vue'
import Main from '../components/Main'
import MainPage from '../visual/MainPage.vue'
import RealTime from '../visual/components/RealTime.vue'
import MakeCurve from '../visual/components/MakeCurve'
import User from '../user/UserMain'
import FileHome from '../file/FileMain'
// import { getToken } from '../utils/auth'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      // 其实应该到主页，但是还没有主页 也没有token认证
      path: '/',
      redirect: '/View/Login'
    },
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
        },
        {
          path: 'Main',
          name: 'Main',
          component: Main,
          children: [
            {
              path: 'MainPage',
              name: 'MainPage',
              component: MainPage
            },
            {
              path: 'User',
              name: 'User',
              component: User
            },
            {
              path: 'RealTime',
              name: 'RealTime',
              component: RealTime
            },
            {
              path: 'MakeCurve',
              name: 'MakeCurve',
              component: MakeCurve
            },
            {
              path: 'FileHome',
              name: 'FileHome',
              component: FileHome
            }]
        },
        {
          path: 'MainPage',
          name: 'MainPage',
          component: MainPage
        }
      ]
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   // console.log(to.path)
//   if (to.path !== '/View/Login') {
//     console.log(getToken())
//     if (getToken() === null) {
//       return next({ path: '/View/Login' })
//     }
//   }
//   next()
// })
export default router
