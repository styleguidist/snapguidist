import React from 'react'
import { shallow } from 'enzyme'
import SnapguidistPlayground from '../../src/components/Playground'

jest.mock(
  'react-styleguidist/lib/rsg-components/Playground',
  () => {
    const Playground = () => null
    return Playground
  }
)

const props = {
  code: 'code',
  evalInContext: () => {},
  index: 1,
  name: 'name',
}

test('passes the props to Playground', () => {
  const wrapper = shallow(<SnapguidistPlayground {...props} />)

  expect(wrapper.find('Playground').props()).toEqual(props)
})

test('generates the context', () => {
  const wrapper = shallow(<SnapguidistPlayground {...props} />)
  const expected = { name: `${props.name}-${props.index}` }

  expect(wrapper.instance().getChildContext()).toEqual(expected)
})
