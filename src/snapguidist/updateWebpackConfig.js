import path from 'path'
import webpack from 'webpack'

const componentPath = component => path.join(__dirname, '..', 'components', component)
const stylesPath = style => path.join(__dirname, '..', style)

export const PLAYGROUND_RENDERER = 'rsg-components/Playground/PlaygroundRenderer'
export const PLAYGROUND_PREVIEW = 'rsg-components/Preview'

export default function updateWebpackConfig(webpackConfig, env, serverInfo) {
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

  webpackConfig.entry.push(stylesPath('styles.css'))

  Object.assign(webpackConfig.resolve.alias, {
    [PLAYGROUND_RENDERER]: componentPath('PlaygroundRenderer'),
    [PLAYGROUND_PREVIEW]: componentPath('Preview'),
  })

  const plugin = new webpack.DefinePlugin({
    'process.env.SNAPGUIDIST': JSON.stringify(serverInfo),
  })
  webpackConfig.plugins.push(plugin)

  return webpackConfig
}
