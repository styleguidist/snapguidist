import React from 'react'
import PropTypes from 'prop-types'

const Button = props => <button type="button">{props.text}</button>

Button.propTypes = {
  text: PropTypes.string,
}

export default Button
