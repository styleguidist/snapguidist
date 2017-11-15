'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var path = require('path');
var webpack = require('webpack');

var libFolder = path.join(__dirname, '..');
var componentPath = function componentPath(component) {
  return path.join(libFolder, 'components', component);
};
var stylesPath = function stylesPath(style) {
  return path.join(libFolder, style);
};
var styleLoaders = '!!style-loader!css-loader!';

var PLAYGROUND_RENDERER = 'rsg-components/Playground/PlaygroundRenderer';
var PLAYGROUND = 'rsg-components/Playground';
var PREVIEW = 'rsg-components/Preview';

var updateWebpackConfig = function updateWebpackConfig(webpackConfig, env, serverInfo) {
  var _Object$assign;

  webpackConfig.entry.push(styleLoaders + 'codemirror/lib/codemirror.css', styleLoaders + 'rsg-codemirror-theme.css', '' + styleLoaders + stylesPath('styles.css'));

  webpackConfig.resolve.alias = Object.assign((_Object$assign = {}, _defineProperty(_Object$assign, PLAYGROUND_RENDERER, 'react-styleguidist/lib/rsg-components/Playground/PlaygroundRenderer'), _defineProperty(_Object$assign, PLAYGROUND, componentPath('Playground')), _defineProperty(_Object$assign, PREVIEW, componentPath('Preview')), _Object$assign), webpackConfig.resolve.alias);

  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.SNAPGUIDIST': JSON.stringify(serverInfo)
  }));

  return webpackConfig;
};

module.exports = updateWebpackConfig;