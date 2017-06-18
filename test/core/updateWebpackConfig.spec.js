import path from 'path'
import updateWebpackConfig from '../../src/core/updateWebpackConfig'

jest.mock(
  'webpack',
  () => ({
    DefinePlugin(data) { return { definitions: data } },
  })
)

const libFolder = path.join(__dirname, '..', '..')
const styleLoaders = '!!style-loader!css-loader!'

test('enhances the webpack configuration', () => {
  const webpackConfig = {
    entry: [],
    plugins: [],
    resolve: { alias: {} },
  }
  const serverInfo = 'serverInfo'
  const expected = {
    entry: [
      `${styleLoaders}codemirror/lib/codemirror.css`,
      `${styleLoaders}rsg-codemirror-theme.css`,
      `${styleLoaders}${libFolder}/src/styles.css`,
    ],

    plugins: [{
      definitions: {
        'process.env.SNAPGUIDIST': '"serverInfo"',
      },
    }],

    resolve: {
      alias: {
        'rsg-components/Playground/PlaygroundRenderer': 'react-styleguidist/lib/rsg-components/Playground/PlaygroundRenderer',
        'rsg-components/Playground': `${libFolder}/src/components/Playground`,
        'rsg-components/Preview': `${libFolder}/src/components/Preview`,
      },
    },
  }

  expect(updateWebpackConfig(webpackConfig, null, serverInfo)).toEqual(expected)
})
