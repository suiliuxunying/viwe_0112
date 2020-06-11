import request from '@/utils/request'

export function createBucket (data) {
  return request({
    url: '/hos/v1/bucket',
    method: 'post',
    // 不知道有没有用
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}
export function deleteBucket (data) {
  return request({
    url: '/hos/v1/bucket',
    method: 'delete',
    params: data
  })
}
export function updateBucket (data) {
  return request({
    url: '/hos/v1/bucket',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'put',
    data
  })
}

export function getBucket () {
  return request({
    url: '/hos/v1/bucket',
    method: 'get'

  })
}

export function getBucketList () {
  return request({
    url: '/hos/v1/bucket/list',
    method: 'get'
  })
}

export function putObject (data) {
  return request({
    url: '/hos/v1/object',
    method: 'post',
    data
  })
}
export function deleteObject (data) {
  return request({
    url: '/hos/v1/object',
    method: 'delete',
    params: data
  })
}
export function getObject (data) {
  return request({
    url: '/hos/v1/object/content',
    method: 'get',
    responseType: 'arraybuffer', // 否则下载后不能打开（除了txt）
    params: data
  })
}
export function getObjectlistdir (data) {
  return request({
    url: '/hos/v1/object/list/dir',
    method: 'get',
    params: data

  })
}
export function getObjectList () {
  return request({
    url: '/hos/v1/object/list',
    method: 'get'

  })
}
// 总结，概要 summary
export function getSummary () {
  return request({
    url: '/hos/v1/object/info',
    method: 'get'

  })
}

export function listObjectByPrefix () {
  return request({
    url: '/hos/v1/object/list/prefix',
    method: 'get'

  })
}
