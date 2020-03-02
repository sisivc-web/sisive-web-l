
var path = require('path')

module.exports = {
  devServer: {
    port: 9011,
    // autoOpenBrowser: true,
    // assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    proxy: {
      '/sisivc': {
        target: 'http://116.62.103.169:9527/sisivc',
        changeOrigin: true,
        pathRewrite: {
          '^/sisivc': ''
        }
      },
      '/getip': {
        target: 'http://chaxun.1616.net/s.php?type=ip&output=json',
        changeOrigin: true,
        pathRewrite: {
          '^/getip': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        'common': path.join(__dirname, 'src/common'),
        'components': path.join(__dirname, 'src/components'),
        'base': path.join(__dirname, 'src/base'),
        'api': path.join(__dirname, 'src/api'),
        'apx': path.join(__dirname, 'src/apx'),
        'static': path.join(__dirname, 'static')
      }
    }
  }
}
