const path = require('path')
const snapguidist = require(path.join(__dirname, '..', 'src', 'index'))

module.exports = snapguidist({
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
