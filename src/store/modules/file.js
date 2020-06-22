
import { data, getAllParents, rankTime, getChildrenById, deleteItemById, getCheckedFileFromBuffer, clock } from '../data'
import { getListObject, listObjectByPrefix, getObject, deleteObject, getBucketList, getObjectlistdir, createBucket, deleteBucket, updateBucket } from '../../api/file'
import { switchDate } from '../../utils/utils'
const state = {
  data: data,
  currentListId: 0, // 当前文件的id
  checkedBuffer: { length: 0 }, // 当前选中的文件，以及选中的个数
  currentListBuffer: [],
  moveTargetId: 0,
  view: 'thumbnail',
  rank: 'name',
  checkAll: false,
  type: 'folder',

  bucketList: [],
  objectListDir: [],
  routes: [],
  isBucketDir: true,
  listObject: {},
  listObjectByPrefix: {}
}
const mutations = {
  SET_isBucketDir: (state, abool) => {
    // console.log('SET_isBucketDir:' + abool)
    state.isBucketDir = abool
  },
  SET_bucketList: (state, bucketList) => {
    bucketList.forEach(bucket => {
      bucket.createTime = switchDate(bucket.createTime)
    })
    state.bucketList = bucketList
    // console.log(state)
  },
  SET_objectListDir: (state, fileDir) => {
    fileDir.objectList.forEach(dir => {
      dir.lastModifyTime = switchDate(dir.lastModifyTime)
    })
    state.objectListDir = fileDir.objectList
    // console.log(state)
  },
  PUSH_route: (state, route) => {
    state.routes.push(route)
    // console.log(state.routes)
  },
  POP_route: (state, dir) => {
    if (dir === '') state.routes = []
    else {
      while (state.routes[state.routes.length - 1].query.dir !== dir) {
        state.routes.pop()
      }
    }
    // console.log(state.routes)
  },
  SET_listObjectByPrefix: (state, listObjectByPrefix) => {
    state.listObjectByPrefix = listObjectByPrefix
  },
  SET_listObject: (state, listObject) => {
    state.listObject = listObject
  }

}
const getters = {
  breakcrumb (state) {
    const data = getAllParents(state.data, state.currentListId)
    return data
  },
  currentListBufferR (state) { // 当前文件下所有的子文件
    const data = state.currentListBuffer
    if (state.rank === 'name') {
      // 按中文首字符的拼音进行排序
      data.sort(function (a, b) {
        return a.name[0].localeCompare(b.name[0], 'zh')
      })
    } else if (state.rank === 'time') {
      rankTime(data)
    }
    return data
  }
}

const actions = {
  listObjectByPrefix ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { dir, bucket, startKey, prefix } = data
      // 传参到 api
      listObjectByPrefix(
        {
          dir: dir,
          bucket: bucket,
          startKey: startKey,
          prefix: prefix
        }
      ).then(response => {
        // const data = response
        // console.log(response)
        commit('SET_listObjectByPrefix', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getListObject ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { dir, bucket, endKey, startKey } = data
      // 传参到 api
      getListObject({
        dir: dir,
        bucket: bucket,
        endKey: endKey,
        startKey: startKey
      }).then(response => {
        // const data = response
        // console.log(response)
        commit('SET_listObject', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getBucket ({ commit }) {
    return new Promise((resolve, reject) => {
      // 传参到 api
      getBucketList().then(response => {
        // console.log(response)
        commit('SET_bucketList', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateBucket ({ commit }) {
    return new Promise((resolve, reject) => {
      // 传参到 api
      updateBucket().then(response => {
        // const data = response
        commit('SET_bucketList', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteBucket ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { bucket } = data
      // 传参到 api
      deleteBucket({ bucket: bucket }).then(response => {
        // const data = response
        resolve(response.message)
      }).catch(error => {
        reject(error)
      })
    })
  },
  createBucket ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { bucket, detail } = data
      // 传参到 api
      const formData = new FormData()
      formData.append('bucket', bucket)
      formData.append('detail', detail)
      createBucket(formData).then(response => {
        // const data = response
        resolve(response.message)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getObjectlistdir ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { dir, bucket } = data
      // 传参到 api
      getObjectlistdir({ dir: dir, bucket: bucket }).then(response => {
        // const data = response
        // console.log(response)
        commit('SET_objectListDir', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteObject ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { key, bucket } = data
      // 传参到 api
      deleteObject({ key: key, bucket: bucket }).then(response => {
        // const data = response
        // console.log(response)
        resolve(response.message)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getObject ({ commit }, data) {
    return new Promise((resolve, reject) => {
      const { key, bucket, name } = data
      // 传参到 api
      getObject({ key: key, bucket: bucket }).then(response => {
        // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
        // IE10以上支持blob但是依然不支持download
        const content = response
        const blob = new Blob([content])// 构造一个blob对象来处理数据
        const fileName = name
        if (window.navigator.msSaveOrOpenBlob) { // msSaveOrOpenBlob方法返回bool值
          navigator.msSaveBlob(blob, fileName)// 本地保存
        } else {
          var link = document.createElement('a')// a标签下载
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
        resolve('success')
      }).catch(error => {
        reject(error)
      })
    })
  },

  changeData (state, payload) {
    const newData = payload.newData
    newData.name = payload.newName
    state.data[payload.id] = newData
  },
  changeView (state, payload) {
    state.view = payload.view
  },
  changeRank (state, payload) {
    state.rank = payload.rank
  },
  changeCurrentListId (state, payload) {
    state.currentListId = payload.id
  },
  changeCurrentListBuffer (state) {
    const type = state.type
    let data = Object.values(state.data)
    if (type === 'folder') {
      data = getChildrenById(state.data, state.currentListId)
    } else if (type === '文档') {
      data = data.filter(item => {
        return item.type === 'text'
      })
    } else if (type === '图片') {
      data = data.filter(item => {
        return item.type === 'image'
      })
    } else if (type === '视频') {
      data = data.filter(item => {
        return item.type === 'video'
      })
    } else if (type === '音乐') {
      data = data.filter(item => {
        return item.type === 'music'
      })
    }
    state.currentListBuffer = data
  },
  changeChecked (state, payload) {
    const id = payload.id
    state.currentListBuffer = state.currentListBuffer.map((item) => {
      if (item.id === payload.id) {
        item.checked = !item.checked
        if (item.checked) {
          state.checkedBuffer[id] = item
          state.checkedBuffer.length++
        } else {
          delete state.checkedBuffer[id]
          state.checkedBuffer.length--
        }
      }
      return item
    })
    if (state.checkedBuffer.length === state.currentListBuffer.length) {
      state.checkAll = true
    } else {
      state.checkAll = false
    }
  },
  changeCheckedAll (state, payload) {
    function checkHandle (checked) {
      if (checked) {
        state.checkAll = false
        state.checkedBuffer = { length: 0 }
        state.currentListBuffer = state.currentListBuffer.map((item) => {
          item.checked = false
          return item
        })
      } else {
        state.checkAll = true
        state.checkedBuffer = { length: 0 }
        state.currentListBuffer = state.currentListBuffer.map((item) => {
          item.checked = true
          state.checkedBuffer[item.id] = item
          state.checkedBuffer.length++
          return item
        })
      }
    }
    if (payload) {
      checkHandle(!payload.checkAll)
    } else {
      checkHandle(state.checkAll)
    }
  },
  changeEdit (state, payload) {
    state.currentListBuffer = state.currentListBuffer.map((item) => {
      if (item.id === payload.id * 1) {
        item.edit = !item.edit
      }
      return item
    })
  },
  changeName (state, payload) {
    // console.log(payload)
    state.data[payload.id].name = payload.newName
  },
  deleteDate (state) {
    const data = getCheckedFileFromBuffer(state.checkedBuffer)
    const len = data.length
    for (let i = 0; i < len; i++) {
      const item = data[i]
      const fileId = item.id
      deleteItemById(state.data, fileId)
    }
  },
  addNewFolder (state, payload) {
    const newData = {
      id: payload.id,
      pId: state.currentListId,
      time: clock(),
      name: '新建文件夹',
      size: '--',
      type: 'folder',
      checked: true,
      edit: false
    }
    state.checkedBuffer[payload.id] = newData
    state.checkedBuffer.length++
    state.currentListBuffer.push(newData)
  },
  moveTarget (state, payload) {
    state.data[payload.id].pId = payload.targetId
  },
  changeMenu (state, payload) {
    state.type = payload.type
  }
}
export default {
  //   namespaced: true, //应该是分模块避免同名 用的
  state,
  getters,
  mutations,
  actions
}
