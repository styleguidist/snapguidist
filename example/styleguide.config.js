const snapguidist = require('../dist/index').default

module.exports = snapguidist({
  title: 'My Great Style Guide',

  components: './src/**/*.js',

  updateWebpackConfig(webpackConfig) {
    webpackConfig.devtool = 'source-map'
    webpackConfig.resolve.modulesDirectories = ['./example/node_modules', './node_modules']
    return webpackConfig
  },

})
