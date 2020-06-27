import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/loginPost1',
    method: 'post',
    data
  })
};
export function getUserInfo () {
  return request({
    url: '/hos/v1/sys/user',
    method: 'get'
  })
}
export function updateUserInfo (data) {
  return request({
    url: '/hos/v1/sys/user',
    method: 'put',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}
export function deleteUser (data) {
  return request({
    url: '/hos/v1/sys/user',
    method: 'delete',
    params: data
  })
}
export function createUser (data) {
  return request({
    url: '/hos/v1/sys/user',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: data
  })
}

// 'Content-Type':'application/json'
