import React from 'react'
import { shallow, mount } from 'enzyme'
import SnapguidistPreview from '../../src/components/Preview'

jest.mock(
  'react-styleguidist/src/rsg-components/Preview',
  () => {
    const Preview = () => null
    return Preview
  }
)

const props = { code: 'code', evalInContext: () => {} }

let executeRunTest = true
const runTest = jest.fn(() => {
  if (!executeRunTest) {
    return {
      isQueuing: false,
      response: { pass: true },
    }
  }
  return { isQueuing: true }
})
const getOptions = snapguidist => ({
  context: {
    name: 'name',
    snapguidist: Object.assign({
      runTest,
      listen: () => () => {},
    }, snapguidist),
  },
})

beforeEach(() => runTest.mockClear())

test('passes the code to Preview', () => {
  const options = getOptions()
  const wrapper = shallow(<SnapguidistPreview {...props} />, options)

  expect(wrapper.find('Preview').prop('code')).toEqual(props.code)
})

test('wraps evalInContext and stores the example', () => {
  const example = 'example'
  const evalInContext = () => () => example
  const options = getOptions()
  const wrapper = shallow(<SnapguidistPreview {...props} evalInContext={evalInContext} />, options)
  const exampleComponent = wrapper.instance().evalInContext()
  exampleComponent()

  expect(wrapper.instance().example).toBe(example)
})

test('passes isQueuing to Test', () => {
  const options = getOptions()
  const wrapper = shallow(<SnapguidistPreview {...props} />, options)
  const isQueuing = true
  wrapper.setState({ isQueuing })

  expect(wrapper.find('Test').prop('isQueuing')).toEqual(isQueuing)
})

test('fires the api call with the update flag', () => {
  const options = getOptions()
  const wrapper = shallow(<SnapguidistPreview {...props} />, options)
  wrapper.find('Test').simulate('click')

  expect(runTest).toHaveBeenCalledWith(options.context.name, undefined, true)
})

test('should set isQueuing to true when the test is executed', () => {
  const options = getOptions()
  const wrapper = mount(<SnapguidistPreview {...props} />, options)
  expect(wrapper.state('isQueuing')).toBeTruthy()
})

test('should set isQueuing to false when the test is not executed', () => {
  const origFailRunTest = executeRunTest
  executeRunTest = false

  const options = getOptions()
  const wrapper = mount(<SnapguidistPreview {...props} />, options)
  expect(wrapper.state('isQueuing')).toBeFalsy()

  executeRunTest = origFailRunTest
})

test('should update `state.response` when the test is not executed', () => {
  const origFailRunTest = executeRunTest
  executeRunTest = false

  const options = getOptions()
  const wrapper = mount(<SnapguidistPreview {...props} />, options)
  expect(wrapper.state('response')).toMatchObject({ pass: true })

  executeRunTest = origFailRunTest
})

test('fires the api call on didMount', () => {
  const options = getOptions()
  mount(<SnapguidistPreview {...props} />, options)

  expect(runTest).toHaveBeenCalledWith(options.context.name, undefined, undefined)
})

test('fires the api call on didUpdate, when code changes', () => {
  const options = getOptions()
  const wrapper = mount(<SnapguidistPreview {...props} />, options)
  runTest.mockClear()
  wrapper.setProps({ code: 'c0d3' })

  expect(runTest).toHaveBeenCalledWith(options.context.name, undefined, undefined)
})

test('does not fire the api call on didUpdate, when code is the same', () => {
  const options = getOptions()
  const wrapper = mount(<SnapguidistPreview {...props} />, options)
  runTest.mockClear()
  wrapper.setProps(props)

  expect(runTest).not.toHaveBeenCalledWith()
})

test('should passes the response to Test', () => {
  let listener
  const options = getOptions({
    listen: (lst) => {
      listener = lst
      return () => {}
    },
  })
  const wrapper = mount(<SnapguidistPreview {...props} />, options)

  const response = { pass: true }
  listener({ name: 'name', response })

  expect(wrapper.find('Test').prop('response')).toBe(response)
})

test('should unregister context listener on componentWillUnmount', () => {
  const unregister = jest.fn()
  const options = getOptions({
    listen: () => unregister,
  })
  const wrapper = mount(<SnapguidistPreview {...props} />, options)
  wrapper.unmount()

  expect(unregister).toHaveBeenCalled()
})

