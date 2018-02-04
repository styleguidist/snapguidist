const path = require('path')
const snapguidist = require('snapguidist')

module.exports = snapguidist({
  title: 'Snapguidist Styleguide',

  components: 'src/components/**/[A-Z]*.js',

  webpackConfig: {
    module: {
      loaders: [{
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      }],
    },
  },
})
