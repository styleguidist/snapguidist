[![npm version](https://badge.fury.io/js/snapguidist.svg)](https://badge.fury.io/js/snapguidist) [![Build Status](https://travis-ci.org/MicheleBertoli/snapguidist.svg?branch=master)](https://travis-ci.org/MicheleBertoli/snapguidist)

# Snapguidist
Snapshot testing for [React Styleguidist](https://github.com/styleguidist/react-styleguidist).

# Demo

![Demo](demo.gif)

# Getting Started

To add `snapguidist` to your `react-styleguidist` configuration, follow these steps:

1. install the package using yarn or npm:

  ```bash
  yarn add --dev snapguidist
  ```

2. enhance the webpack configuration in `styleguide.config.js`:

    ```diff
     const path = require('path')
    +const snapguidist = require('snapguidist')

    -module.exports = {
    +module.exports = snapguidist({
      title: 'Snapguidist Styleguide',

      components: 'src/components/**/[A-Z]*.js',

      updateWebpackConfig(webpackConfig) {
        const sourceFolder = path.resolve(__dirname, 'src')
        webpackConfig.module.loaders.push({
          test: /\.jsx?$/,
          include: sourceFolder,
          loader: 'babel',
        })

        return webpackConfig
      },
    -}
    +})
    ```

## Caveats

This is the first release of `snapguidist`, should you experience any issue please let us know.

The package overrides a few `rsg` components from `react-styleguidist`:

 * `rsg-components/Playground/PlaygroundRenderer`
 * `rsg-components/Preview`

Therefore, you won't be able to override them again in your project.

We are working with [@sapegin](https://github.com/sapegin/) (the author of `react-styleguist`) to find a [solution](https://github.com/styleguidist/react-styleguidist/issues/354).

# Example

To run the example, install the dependencies and start it:

```bash
cd example
yarn install
yarn start
```

# Development

If you want contribute to `snapguidist`, start the example from the root folder to enable the *hot-reload*:

```bash
yarn start
```
