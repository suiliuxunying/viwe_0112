module.exports = {
  // 关闭eslint规范
  // lintOnSave:false,
  devServer: {
    port: 8090,
    proxy: {
      '/api': {
        target: 'http://localhost:9090/file_service', // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': '' // rewrite path
        }
      }
    }
  }
}
