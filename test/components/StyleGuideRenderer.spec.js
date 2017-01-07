import React from 'react'
import { shallow } from 'enzyme'
import SnapguidistStyleGuideRenderer from '../../src/components/StyleGuideRenderer'

jest.mock(
  'react-styleguidist/src/rsg-components/StyleGuide/StyleGuideRenderer',
  () => {
    const StyleGuideRenderer = () => null
    return StyleGuideRenderer
  }
)

jest.mock(
  '../../src/context/snapguidistContextFactory',
  () => () => ({
    clear: jest.fn(),
    listen: jest.fn(),
    runTest: jest.fn(),
  })
)

const props = {
  code: 'code',
  evalInContext: () => {},
  index: 1,
  name: 'name',
}

test('passes the props to StyleGuideRenderer', () => {
  const wrapper = shallow(<SnapguidistStyleGuideRenderer {...props} />)

  expect(wrapper.find('StyleGuideRenderer').props()).toEqual(props)
})

test('generates the context', () => {
  const wrapper = shallow(<SnapguidistStyleGuideRenderer {...props} />)
  const context = wrapper.instance().getChildContext()
  const { clear, listen, runTest } = context.snapguidist

  expect(Object.keys(context.snapguidist).length).toBe(3)

  expect(clear).toBeDefined()
  expect(typeof clear).toBe('function')

  expect(listen).toBeDefined()
  expect(typeof listen).toBe('function')

  expect(runTest).toBeDefined()
  expect(typeof runTest).toBe('function')
})
