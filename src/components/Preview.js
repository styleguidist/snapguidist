import React, { Component, PropTypes } from 'react'
import Preview from 'react-styleguidist/src/rsg-components/Preview'
import { snapguidistShape } from '../context'
import Test from './Test'

class SnapguidistPreview extends Component {

  constructor(props) {
    super(props)

    this.state = { response: null }

    this.runTest = this.runTest.bind(this)
    this.forceUpdateTest = this.runTest.bind(this, true)
    this.evalInContext = this.evalInContext.bind(this)
    this.handleSnapshotResponse = this.handleSnapshotResponse.bind(this)
  }

  componentWillMount() {
    const {
      snapguidist = {},
    } = this.context

    this.forgetSnapguidist = snapguidist.listen(this.handleSnapshotResponse)
  }

  componentDidMount() {
    this.runTest()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.runTest()
    }
  }

  componentWillUnmount() {
    this.forgetSnapguidist()
  }

  evalInContext(code) {
    const result = this.props.evalInContext(code)

    const wrapper = (state, setState, callback) => {
      this.example = result(state, setState, callback)
      return this.example
    }

    return wrapper
  }

  handleSnapshotResponse({ name, response } = {}) {
    if (this.context.name === name) {
      this.setState({ response, isFetching: false })
    }
  }

  runTest(update) {
    this.setState({ isFetching: true })

    this.context.snapguidist.runTest(this.context.name, this.example, update)
  }

  render() {
    const {
      isFetching,
      response,
    } = this.state

    return (
      <div>
        <Preview {...this.props} evalInContext={this.evalInContext} />
        <Test
          isFetching={isFetching}
          onClick={this.forceUpdateTest}
          response={response}
        />
      </div>
    )
  }
}

SnapguidistPreview.propTypes = {
  code: PropTypes.string.isRequired,
  evalInContext: PropTypes.func.isRequired,
}

SnapguidistPreview.contextTypes = {
  name: PropTypes.string.isRequired,
  snapguidist: snapguidistShape,
}

export default SnapguidistPreview
