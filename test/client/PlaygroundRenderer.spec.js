import React from 'react'
import { shallow } from 'enzyme'
import SnapguidistPlaygroundRenderer from '../../src/client/PlaygroundRenderer'

jest.mock(
  'react-styleguidist/src/rsg-components/Playground/PlaygroundRenderer',
  () => {
    const PlaygroundRenderer = () => null
    return PlaygroundRenderer
  },
)

const props = {
  code: 'code',
  evalInContext: () => {},
  index: 1,
  name: 'name',
}

test('passes the props to PlaygroundRenderer', () => {
  const wrapper = shallow(<SnapguidistPlaygroundRenderer {...props} />)

  expect(wrapper.find('PlaygroundRenderer').props()).toEqual(props)
})

test('generates the context', () => {
  const wrapper = shallow(<SnapguidistPlaygroundRenderer {...props} />)
  const expected = { name: `${props.name}-${props.index}` }

  expect(wrapper.instance().getChildContext()).toEqual(expected)
})
