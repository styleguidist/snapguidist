[![Build Status](https://travis-ci.org/MicheleBertoli/snapguidist.svg?branch=master)](https://travis-ci.org/MicheleBertoli/snapguidist)

# Snapguidist
Snapshot testing for [React Styleguidist](https://github.com/styleguidist/react-styleguidist).

# Demo

![Demo](demo.gif)

# Getting Started

:warning: This package is a proof of concept.

However, if you are brave enough and want to give it a try, follow these steps:

1. install the package using yarn or npm:

  ```bash
  yarn add --dev snapguidist
  ```

2. add the script to the `package.json`:

  ```json
    "scripts": {
      "snapguidist": "snapguidist"
    }
  ```

3. add the webpack configuration to the `styleguide.config.js`:

  ```javascript
    if (env === 'development') {
      webpackConfig.module.loaders.push({
        test: /\.css$/,
        include: path.resolve(__dirname, 'node_modules/snapguidist'),
        loaders: ['style', 'css'],
      })
      webpackConfig.entry.push('snapguidist/dist/styles.css')

      webpackConfig.resolve.alias['rsg-components/Playground/PlaygroundRenderer'] = 'snapguidist/dist/PlaygroundRenderer'
      webpackConfig.resolve.alias['rsg-components/Preview'] = 'snapguidist/dist/Preview'
    }
  ```
