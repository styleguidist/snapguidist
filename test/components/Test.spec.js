import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Test from '../../src/components/Test'

const props = {
  isFetching: false,
  onClick: () => {},
  response: {
    actual: 'actual',
    count: 0,
    expected: 'expected',
    pass: false,
  },
}

test('works when pass', () => {
  const component = renderer.create(<Test {...props} response={{ pass: true }} />)
  const tree = component.toJSON()

  expect(tree).toMatchSnapshot()
})

test('works when fail, with diff', () => {
  const wrapper = shallow(<Test {...props} />)

  expect(toJSON(wrapper)).toMatchSnapshot()
})

test('works when fail, without diff)', () => {
  const wrapper = shallow(<Test {...props} response={{ diff: 'diff' }} />)

  expect(toJSON(wrapper)).toMatchSnapshot()
})

test('works when is fetching', () => {
  const wrapper = shallow(<Test {...props} isFetching />)

  expect(toJSON(wrapper)).toMatchSnapshot()
})

test('works on update', () => {
  const onClick = jest.fn()
  const wrapper = shallow(<Test {...props} onClick={onClick} />)
  wrapper.find('button').at(0).simulate('click')

  expect(onClick).toHaveBeenCalled()
  expect(toJSON(wrapper)).toMatchSnapshot()
})

test('works on toggle', () => {
  const wrapper = shallow(<Test {...props} />)
  wrapper.find('button').at(1).simulate('click')

  expect(toJSON(wrapper)).toMatchSnapshot()
})

