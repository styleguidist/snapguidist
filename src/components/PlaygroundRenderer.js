import React, { Component, PropTypes } from 'react'
import PlaygroundRenderer from 'react-styleguidist/src/rsg-components/Playground/PlaygroundRenderer'

class SnapguidistPlaygroundRenderer extends Component {

  getChildContext() {
    return {
      name: `${this.props.name}-${this.props.index}`,
    }
  }

  render() {
    return <PlaygroundRenderer {...this.props} />
  }

}

SnapguidistPlaygroundRenderer.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

SnapguidistPlaygroundRenderer.childContextTypes = {
  name: PropTypes.string.isRequired,
}

export default SnapguidistPlaygroundRenderer
