import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Code from '../../src/components/Code'

const props = {
  diff: false,
  label: 'label',
  value: 'value',
}
const context = { config: { highlightTheme: 'theme' } }

test('works with jsx', () => {
  const wrapper = shallow(<Code {...props} />, { context })

  expect(toJSON(wrapper)).toMatchSnapshot()
})

test('works with diff', () => {
  const wrapper = shallow(<Code {...props} diff />, { context })

  expect(toJSON(wrapper)).toMatchSnapshot()
})
