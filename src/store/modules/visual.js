// import {  removeToken, setToken } from '@/utils/auth'
import { switchDate } from '../../utils/utils'
import { makeCurve, getFileName, getKeyValue, realTime } from '@/api/visual'
const state = {
  // 曲线相关
  curveData: [],
  // 选项
  keyValueList: { 默认值: 'storageTankUpperTemperature' },
  fileNameList: [],
  // realtime相关
  item: { },
  oldItem: {},
  itemlist: {
    len: 0

  }
}

const mutations = {
  SET_CurveData: (state, curveData) => {
    state.curveData = curveData
  },
  set_keyValueList: (state, keyValueList) => {
    state.keyValueList = keyValueList
  },
  set_fileNameList: (state, fileNameList) => {
    state.fileNameList = fileNameList
  },
  set_item: (state, data) => {
    state.item = data
    // 每次来一个数据就更新itemlist 存最新的200条数据 数组的形式
    state.itemlist.len += 1
    for (const key in data) {
      if (key in state.itemlist) {
        if (key === 'timestamp') {
          state.itemlist[key].push(switchDate(data[key]))
        } else { state.itemlist[key].push(data[key]) }
        if (state.itemlist[key].length > 200) {
          // 删除第一个
          state.itemlist[key].splice(0, 1)
        }
      } else {
        if (key === 'timestamp') {
          state.itemlist[key] = [switchDate(data[key])]
        } else {
          state.itemlist[key] = [data[key]]
        }
      }
    }
  },
  set_oldItem: (state, data) => {
    state.oldItem = data
  }
}

const actions = {
  makeCurve ({ commit }, data) {
    //  解析？应该是为了更好的和后端进行对接才多了这一步处理数据
    const { fileName, step, keyValue } = data
    return new Promise((resolve, reject) => {
    // 传参到 api
      // makeCurve({ path: 'C:/Users/10703/Desktop/' + fileName, step: step, keyValue: keyValue }).then(response => {
      makeCurve({ path: '/appdata/fileservice/' + fileName, step: step, keyValue: keyValue }).then(response => {
        // 返回的数据存入store
        const data = response
        // console.log('makeCurve:')
        // console.log(data)
        commit('SET_CurveData', data.list)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getFileName ({ commit }, data) {
    return new Promise((resolve, reject) => {
    // 传参到 api
      getFileName(data).then(response => {
        // 返回的数据存入store
        const data = response
        // console.log(data)
        commit('set_fileNameList', data.fileNameList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getKeyValue ({ commit }, data) {
    return new Promise((resolve, reject) => {
    // 传参到 api
      getKeyValue(data).then(response => {
        // 返回的数据存入store
        const data = response
        // console.log(data)
        commit('set_keyValueList', data.keyValueList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  realTime ({ commit }, data) {
    const { item, interval } = data
    return new Promise((resolve, reject) => {
      // 传参到 api
      realTime({ item: item, interval: interval }).then(response => {
        // 返回的数据存入store
        const data = response
        // console.log(data)
        // console.log('store:')
        // console.log(this)
        commit('set_oldItem', this.state.visual.item)
        commit('set_item', data.item)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
//   namespaced: true, //应该是分模块避免同名 用的
  state,
  mutations,
  actions
}
