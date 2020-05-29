import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/loginPost1',
    method: 'post',
    data
  })
}
// 'Content-Type':'application/json'
