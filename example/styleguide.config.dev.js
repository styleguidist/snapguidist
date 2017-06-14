const path = require('path')
const snapguidist = require(path.join(__dirname, '..', 'lib', 'index'))

module.exports = snapguidist({
  title: '[dev] Snapguidist Styleguide',

  components: 'src/components/**/[A-Z]*.js',

  webpackConfig: {
    devtool: 'source-map',

    module: {
      loaders: [{
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel',
      }],
    },
  },
})
