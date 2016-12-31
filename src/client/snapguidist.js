import path from 'path'

const PLAYGROUND_RENDERER = 'rsg-components/Playground/PlaygroundRenderer'
const PLAYGROUND_PREVIEW = 'rsg-components/Preview'

const componentPath = component => path.join(__dirname, 'components', component)
const stylesPath = component => path.join(__dirname, 'styles', component)

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

  webpackConfig.entry.push(stylesPath('styles.css'))

  Object.assign(webpackConfig.resolve.alias, {
    [PLAYGROUND_RENDERER]: componentPath('PlaygroundRenderer'),
    [PLAYGROUND_PREVIEW]: componentPath('Preview'),
  })

  return webpackConfig
}
