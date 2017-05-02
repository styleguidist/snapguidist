import React, { Component, PropTypes } from 'react'
import Preview from 'react-styleguidist/src/rsg-components/Preview'
import { snapguidistShape } from '../queue'
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
    const { snapguidist } = this.context

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

  handleSnapshotResponse(responsesMap = {}) {
    const { name } = this.context
    const response = responsesMap[name]
    if (response) {
      this.setState({ response, isQueuing: false })
    }
  }

  runTest(update) {
    const {
      name,
      snapguidist: { runTest },
    } = this.context

    const {
      isQueuing: prevIsQueuing,
      respnse: prevResponse,
    } = this.state

    const { isQueuing, response } = runTest(name, this.example, update)

    if (prevIsQueuing !== isQueuing || prevResponse !== response) {
      this.setState({ isQueuing, response })
    }
  }

  render() {
    const {
      isQueuing,
      response,
    } = this.state

    return (
      <div>
        <Preview {...this.props} evalInContext={this.evalInContext} />
        <Test
          isQueuing={isQueuing}
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
