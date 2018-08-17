[![Build Status](https://travis-ci.org/styleguidist/snapguidist.svg?branch=master)](https://travis-ci.org/styleguidist/snapguidist)
[![NPM version](https://img.shields.io/npm/v/snapguidist.svg)](https://www.npmjs.com/package/snapguidist)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

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
  +const snapguidist = require('snapguidist');
  -module.exports = {
  +module.exports = snapguidist({
    components: 'src/components/**/[A-Z]*.js',
    defaultExample: true,
    webpackConfig: {
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
          },
        ],
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

## Migrate to v4

In v4, snapshots have been renamed to `.sg` (as opposed to `.snap`) to avoid conflicts with Jest, and improve compatibility with [create-react-app](https://github.com/facebook/create-react-app).
Once upgraded to v4, please run `yarn test -u` to remove the old snapshots (new ones will be automatically generated on the next run)
or, the following commands, to keep them:
```sh
cd .snapguidist/__snapshots/
for old in *.snap; do git mv $old `basename $old .snap`.sg; done
```

## Development

> Any contribution to `snapguidist` is highly appreciated.

Run the following command from the root folder to enable the *hot-reload*:

```bash
yarn build:watch & yarn start
```

### Credits

Logo by [@SaraVieira](https://github.com/SaraVieira)
