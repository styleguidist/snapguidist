import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Playground from 'react-styleguidist/lib/rsg-components/Playground/Playground'

class SnapguidistPlayground extends Component {
  getChildContext() {
    return {
      name: `${this.props.name}-${this.props.index}`,
    }
  }

  render() {
    return <Playground {...this.props} />
  }
}

SnapguidistPlayground.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}

SnapguidistPlayground.childContextTypes = {
  name: PropTypes.string.isRequired,
}

export default SnapguidistPlayground
