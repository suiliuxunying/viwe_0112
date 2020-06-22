import { Loading } from 'element-ui'
// 时间戳转换
export function switchDate (secs) {
  var t = new Date(secs)
  var year = t.getFullYear()
  var month = t.getMonth() + 1
  if (month < 10) { month = '0' + month }
  var date = t.getDate()
  if (date < 10) { date = '0' + date }
  var hour = t.getHours()
  if (hour < 10) { hour = '0' + hour }
  var minute = t.getMinutes()
  if (minute < 10) { minute = '0' + minute }
  var second = t.getSeconds()
  if (second < 10) { second = '0' + second }
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
};
// 删除数组元素
export function remove (array, val) {
  var index = array.indexOf(val)
  if (index > -1) {
    array.splice(index, 1)
  }
  // console.log(array)
  return array
};
// 全局等待
export function loadingRun (message) {
  const loadingInstance = Loading.service({
  // target：,
    lock: true,
    text: message,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  return loadingInstance
};
// 判断字符串结尾
export function stringifEnd (mainString, endString) {
  var d = mainString.length - endString.length
  // lastIndexOf 长传中子最后一次出现子串的位置
  return (d >= 0 && mainString.lastIndexOf(endString) === d)
};
// 判断文件类型
export const fileType = ['image', 'txt', 'excel', 'word', 'pdf', 'ppt', 'video', 'radio', 'other']
export function getFileType (fileName) {
  // 后缀获取
  let suffix = ''
  // 获取类型结果
  let result = ''
  try {
    const flieArr = fileName.split('.')
    suffix = flieArr[flieArr.length - 1]
  } catch (err) {
    suffix = ''
  }
  // fileName无后缀返回 false
  if (!suffix) { return false }
  suffix = suffix.toLocaleLowerCase()
  // 图片格式
  const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
  // 进行图片匹配
  result = imglist.find(item => item === suffix)
  if (result) {
    return 'image'
  }
  // 匹配txt
  const txtlist = ['txt']
  result = txtlist.find(item => item === suffix)
  if (result) {
    return 'txt'
  }
  // 匹配 excel
  const excelist = ['xls', 'xlsx']
  result = excelist.find(item => item === suffix)
  if (result) {
    return 'excel'
  }
  // 匹配 word
  const wordlist = ['doc', 'docx']
  result = wordlist.find(item => item === suffix)
  if (result) {
    return 'word'
  }
  // 匹配 pdf
  const pdflist = ['pdf']
  result = pdflist.find(item => item === suffix)
  if (result) {
    return 'pdf'
  }
  // 匹配 ppt
  const pptlist = ['ppt', 'pptx']
  result = pptlist.find(item => item === suffix)
  if (result) {
    return 'ppt'
  }
  // 匹配 视频
  const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v']
  result = videolist.find(item => item === suffix)
  if (result) {
    return 'video'
  }
  // 匹配 音频
  const radiolist = ['mp3', 'wav', 'wmv', 'm4a']
  result = radiolist.find(item => item === suffix)
  if (result) {
    return 'radio'
  }
  // 其他 文件类型
  return 'other'
}
