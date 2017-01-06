const updateWebpackConfig = require('./core/updateWebpackConfig')
const configureServer = require('./core/configureServer')

const SNAPGUIDIST_DEFAULTS = {
  concurrentTests: 3,
  serverHost: 'localhost',
  serverPort: 3000,
}

function snapguidist(options) {
  return (config) => {
    const { serverHost, serverPort } = config
    const snapguidistOptions = Object.assign({}, SNAPGUIDIST_DEFAULTS, options)

    if (serverHost) {
      snapguidistOptions.serverHost = serverHost
    }

    if (serverPort) {
      snapguidistOptions.serverPort = serverPort
    }

    const {
      updateWebpackConfig: _updateWebpackConfig,
      configureServer: _configureServer,
    } = config

    return Object.assign(config,
      {
        updateWebpackConfig(webpackConfig, env) {
          let final = updateWebpackConfig(webpackConfig, env, snapguidistOptions)
          if (_updateWebpackConfig) {
            final = _updateWebpackConfig(final, env)
          }
          return final
        },

        configureServer(app, env) {
          configureServer(app, env)
          if (_configureServer) {
            _configureServer(app, env)
          }
        },
      }
    )
  }
}

module.exports = snapguidist
