import request from '@/utils/request'

export function createBucket (data) {
  return request({
    url: '/hos/v1/bucket',
    method: 'post',
    data
  })
}
export function deleteBucket (data) {
  return request({
    url: '/hos/v1/bucket',
    method: 'delete',
    data
  })
}
export function updateBucket (data) {
  return request({
    url: '/hos/v1/bucket',
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
    data
  })
}
export function getObject () {
  return request({
    url: '/hos/v1/object/content',
    method: 'get'

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
