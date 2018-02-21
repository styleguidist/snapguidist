import React from 'react'
import PropTypes from 'prop-types'
import Codemirror from 'react-codemirror2'

require('codemirror/mode/diff/diff')
require('codemirror/mode/jsx/jsx')

const Code = (props, context) => {
  // As of react-styleguidist v6.2.0, highlightTheme is deprecated.
  const highlightTheme = context.config.highlightTheme ||
    context.config.editorConfig.highlightTheme

  const options = {
    mode: props.diff ? 'diff' : 'jsx',
    theme: highlightTheme,
  }

  return (
    <div>
      <div className="snapguidist__label">{props.label}</div>
      <div className="snapguidist__code">
        <Codemirror value={props.value} options={options} />
      </div>
    </div>
  )
}

Code.propTypes = {
  diff: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
}

Code.contextTypes = {
  config: PropTypes.object.isRequired,
}

export default Code
