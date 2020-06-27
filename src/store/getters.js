
const getters = {
  // sidebar: state => state.app.sidebar,
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,

  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // introduction: state => state.user.introduction,
  // roles: state => state.user.roles,
  // permission_routes: state => state.permission.routes,
  // errorLogs: state => state.errorLog.logs
  nameString: state => state.test.name + '111',
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,

  bucketList: state => state.file.bucketList,
  objectListDir: state => state.file.objectListDir,
  routes: state => state.file.routes,
  isBucketDir: (state) => state.file.isBucketDir,
  listObject: (state) => state.file.listObject,
  listObjectByPrefix: (state) => state.file.listObjectByPrefix
}
export default getters
