import { getToken, removeToken, setToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    //   ??
    const { userId, pass } = userInfo
    return new Promise((resolve, reject) => {
    // 传参到 api

      login({ userId: userId, password: pass }).then(response => {
        const data = response
        commit('SET_TOKEN', data.token)
        // 存cookie
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //   // get user info
  //   getInfo ({ commit, state }) {
  //     return new Promise((resolve, reject) => {
  //       getInfo(state.token).then(response => {
  //         const { data } = response

  //         if (!data) {
  //           reject('Verification failed, please Login again.')
  //         }

  //         const { roles, name, avatar, introduction } = data

  //         // roles must be a non-empty array
  //         if (!roles || roles.length <= 0) {
  //           reject('getInfo: roles must be a non-null array!')
  //         }

  //         commit('SET_ROLES', roles)
  //         commit('SET_NAME', name)
  //         commit('SET_AVATAR', avatar)
  //         commit('SET_INTRODUCTION', introduction)
  //         resolve(data)
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },

  //   // user logout
  //   logout ({ commit, state, dispatch }) {
  //     return new Promise((resolve, reject) => {
  //       logout(state.token).then(() => {
  //         commit('SET_TOKEN', '')
  //         commit('SET_ROLES', [])
  //         removeToken()
  //         resetRouter()

  //         // reset visited views and cached views
  //         // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //         dispatch('tagsView/delAllViews', null, { root: true })

  //         resolve()
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },

  // remove token
  resetToken ({ commit }) {
    //   https://vuex.vuejs.org/zh/guide/actions.html
    // Promise 是action的返回函数 这样写 保证promise()中的代码执行完才返回
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }

  //   // dynamically modify permissions
  //   changeRoles ({ commit, dispatch }, role) {
  //     return new Promise(async resolve => {
  //       const token = role + '-token'

  //       commit('SET_TOKEN', token)
  //       setToken(token)

  //       const { roles } = await dispatch('getInfo')

  //       resetRouter()

  //       // generate accessible routes map based on roles
  //       const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

  //       // dynamically add accessible routes
  //       router.addRoutes(accessRoutes)

  //       // reset visited views and cached views
  //       dispatch('tagsView/delAllViews', null, { root: true })

//       resolve()
//     })
//   }
}

export default {
//   namespaced: true, //应该是分模块避免同名 用的
  state,
  mutations,
  actions
}
