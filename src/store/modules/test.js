const state = {
  name: 'teststore 少华'
}
// getters直接导出失败还在在getters.js里面写吧
// const getters = {
//   nameString (state) {
//     return `${state.test.name} `
//   }
// }
const mutations = {
  //   SET_TOKEN: (state, token) => {
  //     state.token = token
  //   },
  //   SET_INTRODUCTION: (state, introduction) => {
  //     state.introduction = introduction
  //   },
  //   SET_NAME: (state, name) => {
  //     state.name = name
  //   },
  //   SET_AVATAR: (state, avatar) => {
  //     state.avatar = avatar
  //   },
  //   SET_ROLES: (state, roles) => {
  //     state.roles = roles
  //   }
}

const actions = {
  //   // user login
  //   login ({ commit }, userInfo) {
  //     const { username, password } = userInfo
  //     return new Promise((resolve, reject) => {
  //       login({ username: username.trim(), password: password }).then(response => {
  //         const { data } = response
  //         commit('SET_TOKEN', data.token)
  //         setToken(data.token)
  //         resolve()
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },

}

export default {
  //   namespaced: true, //应该是分模块避免同名 用的
  state,
  //   getters,
  mutations,
  actions
}
