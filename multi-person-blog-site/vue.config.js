module.exports = {
  configureWebpack: {
    resolve: {
      /* 配置别名 */
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    },
  },
  lintOnSave: false
}