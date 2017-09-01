import React from 'react'
import PropTypes from 'prop-types'
import CodeMirror from 'react-codemirror2'
import 'codemirror/mode/diff/diff'
import 'codemirror/mode/jsx/jsx'

const Code = (props, context) => {
  const options = {
    mode: props.diff ? 'diff' : 'jsx',
    theme: context.config.highlightTheme,
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
