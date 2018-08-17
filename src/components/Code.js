import React from 'react'
import PropTypes from 'prop-types'
import { UnControlled as CodeMirror } from 'react-codemirror2'

require('codemirror/mode/diff/diff')
require('codemirror/mode/jsx/jsx')

const Code = (props, context) => {
  const highlightTheme = context.config.highlightTheme
    || context.config.editorConfig.theme

  const options = {
    mode: props.diff ? 'diff' : 'jsx',
    theme: highlightTheme || 'default',
  }

  return (
    <div>
      <div className="snapguidist__label">{props.label}</div>
      <div className="snapguidist__code">
        <CodeMirror value={props.value} options={options} />
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
