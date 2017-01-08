const updateWebpackConfig = require('./core/updateWebpackConfig')
const configureServer = require('./core/configureServer')

const SNAPGUIDIST_DEFAULTS = {
  concurrentTests: 3,
}

function snapguidist(options = SNAPGUIDIST_DEFAULTS) {
  return (config = {}) => {
    const snapguidistOptions = Object.assign({}, options, {
      serverInfo: {
        host: config.serverHost || 'localhost',
        port: config.serverPort || 3000,
      },
    })

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
