import { getToken, removeToken, setToken } from '@/utils/auth'
import { login, getUserInfo, updateUserInfo, deleteUser, createUser } from '@/api/user'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: {}
}

const mutations = {
  SET_userInfo: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_userInfo2: (state, detail) => {
    state.userInfo.detail = detail
  },
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
    //   调用设置参数的函数
    commit('SET_NAME', userInfo.userId)
    // login.vue中的命名
    const { userId, pass } = userInfo
    return new Promise((resolve, reject) => {
      // 传参到 api  //需要接收的命名
      login({ username: userId, password: pass }).then(response => {
        const data = response
        // console.log(response)
        commit('SET_TOKEN', data.token)
        // 存cookie
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      // 传参到 api  //需要接收的命名
      getUserInfo().then(response => {
        const data = response.data
        // console.log(response)
        commit('SET_userInfo', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateUserInfo ({ commit }, userInfo) {
    const { password, detail } = userInfo
    return new Promise((resolve, reject) => {
      // 传参到 api  //需要接收的命名
      // console.log(password + detail)//没问题
      const formData = new FormData()
      formData.append('password', password)
      formData.append('detail', detail)
      updateUserInfo(formData).then(response => {
        // 密码后台加密了，没有用到 就先不换了
        commit('SET_userInfo2', detail)
        resolve(response.message)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteUser ({ commit }, userInfo) {
    const { userId } = userInfo
    return new Promise((resolve, reject) => {
      // 传参到 api  //需要接收的命名
      deleteUser({ userId: userId }).then(response => {
        // 存cookie
        resolve(response.message)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  createUser ({ commit }, userInfo) {
    const { userName, password, detail, role, email } = userInfo
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('password', password)
      formData.append('userName', userName)
      formData.append('detail', detail)
      formData.append('role', role)
      formData.append('email', email)
      // 传参到 api  //需要接收的命名
      createUser(formData).then(response => {
        // 存cookie
        resolve(response.data)
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
      resolve('退出成功！')
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
