import React, { Component, PropTypes } from 'react'
import renderer from 'react-test-renderer'
import Preview from 'react-styleguidist/src/rsg-components/Preview'
import Test from './test'

class SnapguidistPreview extends Component {

  constructor(props) {
    super(props)

    this.state = { response: null }

    this.runTest = this.runTest.bind(this)
    this.evalInContext = this.evalInContext.bind(this)
  }

  componentDidMount() {
    this.runTest()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.code !== this.props.code) {
      this.runTest()
    }
  }

  runTest(update) {
    this.setState({ isFetching: true })

    fetch('http://localhost:3001', {
      method: update ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.context.name,
        tree: renderer.create(this.example).toJSON(),
      }),
    })
    .then(response => response.json())
    .then(response => this.setState({ response, isFetching: false }))
  }

  evalInContext(code) {
    const result = this.props.evalInContext(code)

    const wrapper = (state, setState, callback) => {
      this.example = result(state, setState, callback)

      return this.example
    }

    return wrapper
  }

  render() {
    return (
      <div>
        <Preview {...this.props} evalInContext={this.evalInContext} />
        <Test
          isFetching={this.state.isFetching}
          onClick={() => this.runTest(true)}
          response={this.state.response}
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
}

export default SnapguidistPreview
