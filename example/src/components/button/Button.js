import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ text }) => <button>{text}</button>

Button.propTypes = {
  text: PropTypes.string,
}

export default Button
