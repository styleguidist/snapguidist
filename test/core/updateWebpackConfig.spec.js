import path from 'path'
import updateWebpackConfig from '../../src/core/updateWebpackConfig'

jest.mock(
  'webpack',
  () => ({
    DefinePlugin(data) { return { definitions: data } },
  })
)

const srcFolder = path.join(__dirname, '..', '..')

test('enhances the webpack configuration', () => {
  const webpackConfig = {
    entry: [],
    resolve: { alias: {} },
    module: { loaders: [] },
    plugins: [],
  }
  const serverInfo = 'serverInfo'
  const expected = {
    entry: [`${srcFolder}/src/styles.css`],

    module: {
      loaders: [{
        include: `${srcFolder}/src`,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
        test: /\.jsx?$/,
      }, {
        include: `${srcFolder}/src`,
        loaders: ['style', 'css'],
        test: /\.css$/,
      }],
    },

    plugins: [{
      definitions: {
        'process.env.SNAPGUIDIST': '"serverInfo"',
      },
    }],

    resolve: {
      alias: {
        'rsg-components/Playground/PlaygroundRenderer': `${srcFolder}/src/components/PlaygroundRenderer`,
        'rsg-components/Preview': `${srcFolder}/src/components/Preview`,
      },
    },
  }

  expect(updateWebpackConfig(webpackConfig, null, serverInfo)).toEqual(expected)
})
