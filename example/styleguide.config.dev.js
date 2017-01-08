const path = require('path')
const snapguidist = require(path.join(__dirname, '..', 'src', 'index'))

const config = {
  concurrentTests: 4,
}
module.exports = snapguidist(config)({
  title: '[dev] Snapguidist Styleguide',

  components: 'src/components/**/[A-Z]*.js',

  updateWebpackConfig(webpackConfig) {
    webpackConfig.devtool = 'source-map'

    const sourceFolder = path.resolve(__dirname, 'src')
    webpackConfig.module.loaders.push({
      test: /\.jsx?$/,
      include: sourceFolder,
      loader: 'babel',
    })

    return webpackConfig
  },
})
