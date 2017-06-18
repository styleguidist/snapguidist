import React from 'react'
import { shallow, mount } from 'enzyme'
import SnapguidistPreview from '../../src/components/Preview'
import api from '../../src/api'

window.requestAnimationFrame = fn => fn()

jest.mock(
  'react-styleguidist/lib/rsg-components/Preview',
  () => {
    const Preview = () => null
    return Preview
  }
)

jest.mock(
  '../../src/api',
  () => ({ runTest: jest.fn(() => ({ then: callback => callback({ pass: true }) })) })
)

const props = { code: 'code', evalInContext: () => {} }
const options = { context: { name: 'name' } }

beforeEach(() => api.runTest.mockClear())

test('passes the code to Preview', () => {
  const wrapper = shallow(<SnapguidistPreview {...props} />, options)

  expect(wrapper.find('Preview').prop('code')).toEqual(props.code)
})

test('wraps evalInContext and stores the example', () => {
  const example = 'example'
  const evalInContext = () => () => example
  const wrapper = shallow(<SnapguidistPreview {...props} evalInContext={evalInContext} />, options)
  const exampleComponent = wrapper.instance().evalInContext()
  exampleComponent()

  expect(wrapper.instance().example).toBe(example)
})

test('passes isFetching to Test', () => {
  const wrapper = shallow(<SnapguidistPreview {...props} />, options)
  const isFetching = true
  wrapper.setState({ isFetching })

  expect(wrapper.find('Test').prop('isFetching')).toEqual(isFetching)
})

test('fires the api call with the update flag', () => {
  const wrapper = shallow(<SnapguidistPreview {...props} />, options)
  wrapper.find('Test').simulate('click')

  expect(api.runTest).toHaveBeenCalledWith(options.context.name, undefined, true)
})

test('fires the api call on didMount', () => {
  mount(<SnapguidistPreview {...props} />, options)

  expect(api.runTest).toHaveBeenCalledWith(options.context.name, undefined, undefined)
})

test('fires the api call on didUpdate, when code changes', () => {
  const wrapper = mount(<SnapguidistPreview {...props} />, options)
  api.runTest.mockClear()
  wrapper.setProps({ code: 'c0d3' })

  expect(api.runTest).toHaveBeenCalledWith(options.context.name, undefined, undefined)
})

test('does not fire the api call on didUpdate, when code is the same', () => {
  const wrapper = mount(<SnapguidistPreview {...props} />, options)
  api.runTest.mockClear()
  wrapper.setProps(props)

  expect(api.runTest).not.toHaveBeenCalledWith()
})

test('passes the response to Test', () => {
  const wrapper = mount(<SnapguidistPreview {...props} />, options)

  expect(wrapper.find('Test').prop('response')).toEqual({ pass: true })
})
