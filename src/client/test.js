import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Test extends Component {

  isPass() {
    return this.props.response && this.props.response.pass
  }

  isFail() {
    return this.props.response && !this.props.response.pass
  }

  render() {
    const className = classnames(
      'snapguidist__test',
      { 'snapguidist__test--pass': this.isPass() },
      { 'snapguidist__test--fail': this.isFail() },
    )

    return (
      <div className={className}>
        {this.isFail() &&
          <button
            className="snapguidist__button"
            disabled={this.props.isFetching}
            onClick={this.props.onClick}
          >
            Update
          </button>
        }
      </div>
    )
  }

}

Test.propTypes = {
  isFetching: PropTypes.bool,
  onClick: PropTypes.func,
  response: PropTypes.object,
}

export default Test
