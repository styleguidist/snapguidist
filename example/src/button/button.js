import React, { PropTypes } from 'react'

const Button = ({ text }) => <button>{text}</button>

Button.propTypes = {
  text: PropTypes.string,
}

export default Button
