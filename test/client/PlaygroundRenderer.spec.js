import React from 'react'
import { shallow } from 'enzyme'
import SnapguidistPlaygroundRenderer from '../../src/client/PlaygroundRenderer'

jest.mock('react-styleguidist/src/rsg-components/Playground/PlaygroundRenderer', () => () => null)

const props = {
  code: 'code',
  evalInContext: () => {},
  index: 1,
  name: 'name',
}

test('passes the props to PlaygroundRenderer', () => {
  const wrapper = shallow(
    <SnapguidistPlaygroundRenderer {...props} />,
  )

  expect(wrapper.props()).toEqual(props)
})

test('passes the context to PlaygroundRenderer', () => {
  const wrapper = shallow(
    <SnapguidistPlaygroundRenderer {...props} />,
  )
  const instance = wrapper.instance()
  const expected = { name: `${props.name}-${props.index}` }


  expect(instance.getChildContext()).toEqual(expected)
})
