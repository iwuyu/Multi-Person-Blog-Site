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
  lintOnSave: false
}