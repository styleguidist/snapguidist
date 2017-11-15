'use strict';

var updateWebpackConfig = require('./core/updateWebpackConfig');
var _configureServer2 = require('./core/configureServer');

function snapguidist() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var serverInfo = {
    host: config.serverHost || 'localhost',
    port: config.serverPort || 6060
  };

  var _updateWebpackConfig = config.dangerouslyUpdateWebpackConfig,
      _configureServer = config.configureServer;


  return Object.assign(config, {
    dangerouslyUpdateWebpackConfig: function dangerouslyUpdateWebpackConfig(webpackConfig, env) {
      var final = updateWebpackConfig(webpackConfig, env, serverInfo);
      if (_updateWebpackConfig) {
        final = _updateWebpackConfig(final, env);
      }
      return final;
    },
    configureServer: function configureServer(app, env) {
      _configureServer2(app, env);
      if (_configureServer) {
        _configureServer(app, env);
      }
    }
  });
}

module.exports = snapguidist;