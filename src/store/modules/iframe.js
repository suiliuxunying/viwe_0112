export default {
  state: {
    iframeUrl: '', // 嵌套页面路由路径
    params: {
      ositem: 'vm0'
    }
  },
  getters: {
  },
  mutations: {
    setIFrameUrl (state, iframeUrl) { // 设置iframeUrl
      state.iframeUrl = iframeUrl
    }
  },
  actions: {
  }
}
