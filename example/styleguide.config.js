const path = require('path')

/* eslint-disable */
let snapguidist
if (process.env.SNAPGUIDIST_MODE === 'dev') {
  snapguidist = require(path.join(process.cwd(), 'src', 'index'))
} else {
  snapguidist = require('snapguidist')
}
/* eslint-enable */


module.exports = snapguidist({
  title: 'Snapguidist Styleguide',

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
