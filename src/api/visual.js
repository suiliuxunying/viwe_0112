import request from '@/utils/request'

export function makeCurve (data) {
  return request({
    url: '/sDataMakeCurve',
    method: 'post',
    data
  })
}
export function getFileName (data) {
  return request({
    url: '/getFileName',
    method: 'post',
    data
  })
}
export function getKeyValue (data) {
  return request({
    url: '/getKeyValue',
    method: 'post',
    data
  })
}
// realtime
export function realTime (data) {
  return request({
    url: '/sDataRealTime',
    method: 'post',
    data
  })
}
