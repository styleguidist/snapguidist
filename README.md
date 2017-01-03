[![npm version](https://badge.fury.io/js/snapguidist.svg)](https://badge.fury.io/js/snapguidist) [![Build Status](https://travis-ci.org/MicheleBertoli/snapguidist.svg?branch=master)](https://travis-ci.org/MicheleBertoli/snapguidist)

# Snapguidist
Snapshot testing for [React Styleguidist](https://github.com/styleguidist/react-styleguidist).

# Demo

![Demo](demo.gif)

# Getting Started

To add **snapguidist** to your `react-styleguidist` configuration follow these steps:

1. install the package using yarn or npm:

  ```bash
  yarn add --dev snapguidist
  ```

2. enhance the webpack configuration of `styleguide.config.js`:

    ```javascript
    const path = require('path')
    const snapguidist = require('snapguidist')

    module.exports = snapguidist({

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
    })
    ```

## Caveats

This is the first release of `snapguidist`, if you encounter any issue please report it to us!

**snapguidist** needs to override some `rsg` components of `react-styleguidist`, currently you can't override them yourself. The components are:
 * rsg-components/Playground/PlaygroundRenderer
 * rsg-components/Preview

We are already working with [@sapegin](https://github.com/sapegin/), the author of `react-styleguist`, to resolve this issue.

# Example

To run the example install its dependencies and start it:

```bash
cd example/
yarn install
yarn start
```
# Snapguidist Development

If you want contribute to `snapguidist` the example can be started with *hot-reload* enabled for a better Developer Experience, to do it just run:

```bash
yarn start
```

