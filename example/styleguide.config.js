const path = require('path')

module.exports = {
  title: 'My Great Style Guide',

  components: './src/**/*.js',

  updateWebpackConfig(webpackConfig) {
    webpackConfig.module.loaders.push(
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-react',
          ].map(require.resolve),
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style', 'css'],
      }
    )

    webpackConfig.resolve.modulesDirectories = ['./example/node_modules', './node_modules']

    webpackConfig.entry.push(path.join(__dirname, '../src/client/styles.css'))

    webpackConfig.resolve.alias['rsg-components/Playground/PlaygroundRenderer'] = path.join(__dirname, '../src/client/PlaygroundRenderer')
    webpackConfig.resolve.alias['rsg-components/Preview'] = path.join(__dirname, '../src/client/Preview')

    return webpackConfig
  },

}
