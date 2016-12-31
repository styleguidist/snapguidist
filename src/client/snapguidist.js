import path from 'path'
import webpack from 'webpack'

export default function snapguidist(webpackConfig) {
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
    },
  )

  // webpackConfig.resolve.modulesDirectories.push('./node_modules')

  webpackConfig.entry.push(path.join(__dirname, 'styles.css'))

  webpackConfig.resolve.alias['rsg-components/Playground/PlaygroundRenderer'] = path.join(__dirname, 'PlaygroundRenderer')
  webpackConfig.resolve.alias['rsg-components/Preview'] = path.join(__dirname, 'Preview')

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.SNAPGUIDIST': JSON.stringify(__dirname),
  }))

  return webpackConfig
}
