const path = require('path')
const webpack = require('webpack')

const srcFolder = path.join(__dirname, '..')
const componentPath = component => path.join(srcFolder, 'components', component)
const stylesPath = style => path.join(srcFolder, style)

const PLAYGROUND_RENDERER = 'rsg-components/Playground/PlaygroundRenderer'
const PLAYGROUND_PREVIEW = 'rsg-components/Preview'

function updateWebpackConfig(webpackConfig, env, serverInfo) {
  webpackConfig.module.loaders.push(
    {
      test: /\.jsx?$/,
      include: srcFolder,
      loader: 'babel',
      query: {
        presets: [
          'babel-preset-es2015',
          'babel-preset-react',
          'babel-preset-stage-0',
        ],
      },
    },
    {
      test: /\.css$/,
      include: srcFolder,
      loaders: ['style', 'css'],
    }
  )

  // TODO: should be avoided to add style.css as last item in `entry`?
  webpackConfig.entry.push(stylesPath('styles.css'))

  Object.assign(webpackConfig.resolve.alias, {
    [PLAYGROUND_RENDERER]: componentPath('PlaygroundRenderer'),
    [PLAYGROUND_PREVIEW]: componentPath('Preview'),
  })

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.SNAPGUIDIST': JSON.stringify(serverInfo),
  }))

  return webpackConfig
}

module.exports = updateWebpackConfig
