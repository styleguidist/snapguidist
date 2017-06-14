const path = require('path')
const webpack = require('webpack')

const libFolder = path.join(__dirname, '..')
const componentPath = component => path.join(libFolder, 'components', component)
const stylesPath = style => path.join(libFolder, style)
const styleLoaders = '!!style-loader!css-loader!'

const PLAYGROUND_RENDERER = 'rsg-components/Playground/PlaygroundRenderer'
const PLAYGROUND = 'rsg-components/Playground'
const PREVIEW = 'rsg-components/Preview'

const updateWebpackConfig = (webpackConfig, env, serverInfo) => {
  webpackConfig.entry.push(
    `${styleLoaders}codemirror/lib/codemirror.css`,
    `${styleLoaders}rsg-codemirror-theme.css`,
    `${styleLoaders}${stylesPath('styles.css')}`
  )

  webpackConfig.resolve.alias = Object.assign({
    [PLAYGROUND_RENDERER]: 'react-styleguidist/lib/rsg-components/Playground/PlaygroundRenderer',
    [PLAYGROUND]: componentPath('Playground'),
    [PREVIEW]: componentPath('Preview'),
  }, webpackConfig.resolve.alias)

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.SNAPGUIDIST': JSON.stringify(serverInfo),
  }))

  return webpackConfig
}

module.exports = updateWebpackConfig
