const path = require('path')
const snapguidist = require('../dist/snapguidist').default

module.exports = {
  title: 'My Great Style Guide',

  components: './src/**/*.js',

  updateWebpackConfig(webpackConfig) {
    webpackConfig.resolve.modulesDirectories = ['./example/node_modules', './node_modules']
    return snapguidist(webpackConfig)
  },

}
