import React, { Component, PropTypes } from 'react'
import renderer from 'react-test-renderer'
import Preview from 'react-styleguidist/src/rsg-components/Preview'

class SnapguidistPreview extends Component {

  constructor(props) {
    super(props)

    this.state = { response: null }

    this.evalInContext = this.evalInContext.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  evalInContext(code) {
    const result = this.props.evalInContext(code)

    const wrapper = (state, setState, callback) => {
      this.example = result(state, setState, callback)

      return this.example
    }

    return wrapper
  }

  handleClick() {
    fetch('http://localhost:3001', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.context.name,
        tree: renderer.create(this.example).toJSON(),
      }),
    })
    .then(response => response.json())
    .then(response => this.setState({ response }))
  }

  render() {
    return (
      <div>
        <Preview {...this.props} evalInContext={this.evalInContext} />
        <button onClick={this.handleClick}>Test</button>
        {this.state.response &&
          <div>{this.state.response.pass ? '😻' : '😿'}</div>
        }
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
