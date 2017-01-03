const path = require('path')
const webpack = require('webpack')

let base = path.join(process.cwd(), 'node_modules', 'snapguidist')
if (process.env.SNAPGUIDIST_MODE === 'dev') {
  base = process.cwd()
}
const componentPath = component => path.join(base, 'src', 'components', component)
const stylesPath = style => path.join(base, 'src', style)

const PLAYGROUND_RENDERER = 'rsg-components/Playground/PlaygroundRenderer'
const PLAYGROUND_PREVIEW = 'rsg-components/Preview'

function updateWebpackConfig(webpackConfig, env, serverInfo) {
  const includePaths = [
    path.join(base, 'src'),
  ]

  webpackConfig.module.loaders.push(
    {
      test: /\.jsx?$/,
      include: includePaths,
      loader: 'babel',
      query: {
        presets: [
          'babel-preset-es2015',
          'babel-preset-react',
          'babel-preset-stage-0',
        ].map(require.resolve),
      },
    },
    {
      test: /\.css$/,
      include: includePaths,
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
