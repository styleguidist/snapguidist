[![npm version](https://badge.fury.io/js/snapguidist.svg)](https://badge.fury.io/js/snapguidist)
[![Build Status](https://travis-ci.org/styleguidist/snapguidist.svg?branch=master)](https://travis-ci.org/styleguidist/snapguidist)

<img alt="Preview" src="logo.png" width="450px" height="166px" />

[Jest](https://github.com/facebook/jest) Snapshot Testing for [React Styleguidist](https://github.com/styleguidist/react-styleguidist).

## Demo

![Demo](demo.gif)

## Getting Started

To add `snapguidist` to your `react-styleguidist` configuration, follow these steps:

1. install the package using yarn or npm:

  ```bash
  yarn add --dev snapguidist
  ```

2. enhance the webpack configuration in `styleguide.config.js`:

  ```diff
   const loaders = require('loaders');
  +const snapguidist = require('snapguidist');
  -module.exports = {
  +module.exports = snapguidist({
    components: 'src/components/**/[A-Z]*.js',
    defaultExample: true,
    webpackConfig: {
      module: {
        loaders: loaders.all,
      },
    },
  -};
  +});
  ```

## Example

To run the example, install the dependencies and start it:

```bash
cd example
yarn install
yarn start
```

## Development

> Any contribution to `snapguidist` is highly appreciated.

Run the following command from the root folder to enable the *hot-reload*:

```bash
yarn build:watch & yarn start
```

### Credits

Logo by [@SaraVieira](https://github.com/SaraVieira)
