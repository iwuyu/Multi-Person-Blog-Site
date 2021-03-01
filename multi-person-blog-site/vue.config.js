module.exports = {
  configureWebpack: {
    resolve: {
      /* 配置别名 */
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'utils': '@/utils',
        'network': '@/network',
        'views': '@/views',
      }
    },
  },
  lintOnSave: false,
  devServer: {
    proxy: {
      '/socket.io': {
        target: 'http://192.168.31.31:8081.', //代理的服务地址
        ws:true,
        changeOrigin: true, // needed for virtual hosted sites
        logLevel: 'debug'
        
      }
    }
  }
}